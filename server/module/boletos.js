const Connection = require('../helpers/connect/connect.js');

class Boletos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }

    /**
     * This function is responsible for buying tickets for a movie.
     * It connects to a MongoDB database, retrieves movie and user data,
     * and allows the user to select a movie and seat to purchase a ticket.
     * It then creates a ticket document in the database, updates the occupied seats,
     * and creates a payment document.
     *
     * @param {Array} params - Array containing movie_id, proyeccion_id, numAsiento, letraAsiento, metodoPago.
     * @returns {Promise<void>}
     */
    async buyTickets(ticketData) {
        let client;
        try {
            client = await this.connection.connect();
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');
            const salasColection = db.collection('salas');
            const asientosProyectionColection = db.collection('asientosProyection');
            const usuariosColection = db.collection('usuarios');
            const boletosColection = db.collection('boletos');
            const pagosColection = db.collection('pagos');
    
            // Desestructuración de los parámetros dentro de la función
            const [movie_id, proyeccion_id, asientos, metodoPago] = ticketData;
    
            const ultimoBoletoRegistrado = await boletosColection.findOne({}, { sort: { _id: -1 } });
            const nombre = process.env.MONGO_USER;
            const password = process.env.MONGO_PASSWORD;
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre },
                    { password: password }
                ]
            }).toArray();
    
            if (usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
                return;
            }
    
            const usuarioRol = usuario[0].rol;
            const usuarioId = usuario[0].id;
    
            let selectedMovie = await peliculasColection.findOne({ id: movie_id });
            if (selectedMovie) {
                let proyections = selectedMovie.proyecciones;
    
                for (let proyection of proyections) {
                    if (proyection.id === proyeccion_id) {
                        let sala_id = proyection.sala;
                        let sala = await salasColection.findOne({ _id: sala_id });
                        if (sala) {
                            let capacidad = sala.capacidad;
                            const documentoExistente = await asientosProyectionColection.find({
                                $and: [
                                    { id_pelicula: movie_id },
                                    { id_proyection: proyeccion_id }
                                ]
                            }).toArray();
    
                            if (documentoExistente.length > 0) {
                                if (documentoExistente[0].occupiedSeats.length >= capacidad) {
                                    console.log("La sala está llena.");
                                    break;
                                }
                            }
    
                            // Procesar cada asiento individualmente
                            for (let asiento of asientos) {
                                const [numAsiento, letraAsiento] = asiento;
                                const letraAsientoUpper = letraAsiento.toUpperCase();
    
                                const asientoExiste = sala.asientos.some(a => a.numero === numAsiento && a.fila === letraAsientoUpper);
                                if (asientoExiste) {
                                    if (documentoExistente.length <= 0) {
                                        await asientosProyectionColection.insertOne({
                                            id_pelicula: movie_id,
                                            id_proyection: proyeccion_id,
                                            occupiedSeats: [`${numAsiento}${letraAsientoUpper}`]
                                        });
                                    } else if (documentoExistente.length > 0) {
                                        const existingSeats = documentoExistente[0].occupiedSeats;
                                        const newSeat = `${numAsiento}${letraAsientoUpper}`;
    
                                        if (existingSeats.includes(newSeat)) {
                                            console.log(`El asiento ${newSeat} ya está ocupado.`);
                                            continue;
                                        } else {
                                            await asientosProyectionColection.updateOne(
                                                { _id: documentoExistente[0]._id },
                                                { $addToSet: { occupiedSeats: newSeat } }
                                            );
                                        }
                                    }
    
                                    const precioBase = 10.50;
                                    const descuento = usuarioRol === "vip" ? 10 : 0;
                                    const precioTotal = precioBase - (precioBase * descuento / 100);
    
                                    const boleto = await boletosColection.insertOne({
                                        "id": ultimoBoletoRegistrado.id + 1,
                                        "pelicula_id": movie_id,
                                        "proyeccion_id": proyeccion_id,
                                        "usuario_id": usuarioId,
                                        "asiento": {
                                            "numero": numAsiento,
                                            "fila": letraAsientoUpper
                                        },
                                        "precio_total": precioTotal,
                                        "descuento_aplicado": descuento,
                                        "fecha_compra": new Date()
                                    });
                                    console.log(boleto);
    
                                    const ultimoPagoRegistrado = await pagosColection.findOne({}, { sort: { _id: -1 } });
                                    await pagosColection.insertOne({
                                        "id": ultimoPagoRegistrado.id + 1,
                                        "usuario_id": usuarioId,
                                        "boleto_id": ultimoBoletoRegistrado.id + 1,
                                        "monto": precioTotal,
                                        "estado": "pendiente"
                                    });
                                } else {
                                    console.log(`El asiento ${numAsiento}${letraAsientoUpper} no está disponible`);
                                }
                            }
                        } else {
                            console.log("No se encontró la sala con el ID proporcionado.");
                        }
                    }
                }
            } else {
                console.log("No se encontró la película con el ID proporcionado.");
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * This function retrieves and displays the tickets purchased by a specific user.
     * It connects to a MongoDB database, retrieves user data, and fetches the corresponding boletos.
     *
     * @param {Array} params - Array containing nombre and password.
     * @returns {Promise<void>}
     *
     * @throws Will throw an error if there is a problem connecting to the MongoDB database or retrieving data.
     *
     */
    async findTicketsByUser([nombre, password]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');  
            const usuariosColection = db.collection('usuarios');
            const boletosColection = db.collection('boletos');
            
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre },
                    { password: password }
                ]
            }).toArray();

            if (usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
                return;
            }

            const usuarioId = usuario[0].id;
            const boletos = await boletosColection.find({ usuario_id: usuarioId }).toArray();
            console.log(boletos);
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}

module.exports = Boletos;
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
        console.log(ticketData);
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
            let { movieId, projectionId, seats, paymentMethod } = ticketData;
            movieId = parseInt(movieId);
            projectionId = parseInt(projectionId);
            const asientoStrings = seats.split(',');

            // Convierte el array de strings en un array de objetos
            const asientos = asientoStrings.map(asiento => {
            const letraAsiento = asiento.charAt(0); // Obtiene la letra del asiento
            const numAsiento = parseInt(asiento.slice(1), 10); // Obtiene el número del asiento
            
            return {
                letraAsiento,
                numAsiento
            };
            });
            console.log(asientos);
            const ultimoBoletoRegistrado = await boletosColection.findOne({}, { sort: { _id: -1 } });
            const nombre = process.env.MONGO_USER;
            const password = process.env.MONGO_PASSWORD;
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre },
                    { password: password }
                ]
            }).toArray();
            console.log(nombre, password);
            if (usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
                return;
            }
    
            const usuarioRol = usuario[0].rol;
            const usuarioId = usuario[0].id;
            let selectedMovie = await peliculasColection.findOne({ id: movieId });
            
            if (selectedMovie) {
                let proyections = selectedMovie.proyecciones;
    
                for (let proyection of proyections) {
                    if (proyection.id === projectionId) {
                        let sala_id = proyection.sala;
                        let sala = await salasColection.findOne({ _id: sala_id });
                        if (sala) {
                            let capacidad = sala.capacidad;
                            const documentoExistente = await asientosProyectionColection.find({
                                $and: [
                                    { id_pelicula: movieId },
                                    { id_proyection: projectionId }
                                ]
                            }).toArray();
    
                            if (documentoExistente.length > 0) {
                                if (documentoExistente[0].occupiedSeats.length >= capacidad) {
                                    console.log("La sala está llena.");
                                    break;
                                }
                            }
                            
                            // Procesar cada asiento individualmente
                            console.log(movieId, projectionId);
                            const asientoExiste = await asientosProyectionColection.findOne({ $and: [{ id_pelicula: movieId},{ id_proyection: projectionId }]});
                            console.log(asientoExiste)
                            if (asientoExiste) {
                                // El documento existe, actualizamos
                                const asientosOcupados = asientoExiste.occupiedSeats || [];
                                const asientosNuevos = [];
                                const asientosYaOcupados = [];

                                for (const asiento of asientos) {
                                    const nuevoAsiento = `${asiento.numAsiento}${asiento.letraAsiento.toUpperCase()}`;
                                    if (!asientosOcupados.includes(nuevoAsiento)) {
                                        asientosNuevos.push(nuevoAsiento);
                                    } else {
                                        asientosYaOcupados.push(nuevoAsiento);
                                    }
                                }

                                if (asientosNuevos.length > 0) {
                                    await asientosProyectionColection.updateOne(
                                        { _id: asientoExiste._id },
                                        { $addToSet: { occupiedSeats: { $each: asientosNuevos } } }
                                    );
                                }

                                if (asientosYaOcupados.length > 0) {
                                    console.log(`Los siguientes asientos ya están ocupados: ${asientosYaOcupados.join(', ')}`);
                                }
                            } else {
                                // El documento no existe, lo creamos
                                const asientosNuevos = asientos.map(asiento => `${asiento.numAsiento}${asiento.letraAsiento.toUpperCase()}`);
                                
                                await asientosProyectionColection.insertOne({
                                    id_pelicula: movieId,
                                    id_proyection: projectionId,
                                    occupiedSeats: asientosNuevos
                                });
                            }
                            for (let asiento of asientos) {
                                console.log(asiento)
                                let {numAsiento, letraAsiento} = asiento;
                                const letraAsientoUpper = letraAsiento.toUpperCase()
    
                                    const precioBase = 10.50;
                                    const descuento = usuarioRol === "vip" ? 10 : 0;
                                    const precioTotal = precioBase - (precioBase * descuento / 100);
    
                                    const boleto = await boletosColection.insertOne({
                                        "id": ultimoBoletoRegistrado.id + 1,
                                        "pelicula_id": movieId,
                                        "proyeccion_id": projectionId,
                                        "usuario_id": usuarioId,
                                        "asiento": {
                                            "numero": numAsiento,
                                            "fila": letraAsientoUpper
                                        },
                                        "precio_total": precioTotal,
                                        "descuento_aplicado": descuento,
                                        "fecha_compra": new Date()
                                    });
                                    
                                    const ultimoPagoRegistrado = await pagosColection.findOne({}, { sort: { _id: -1 } });
                                    await pagosColection.insertOne({
                                        "id": ultimoPagoRegistrado.id + 1,
                                        "usuario_id": usuarioId,
                                        "boleto_id": ultimoBoletoRegistrado.id + 1,
                                        "monto": precioTotal,
                                        "estado": "pendiente"
                                    });
                                    return boleto
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
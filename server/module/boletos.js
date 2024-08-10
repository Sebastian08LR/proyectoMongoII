import Connection from '../../../server/db/connect/connect.js';

export class Boletos {
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
    async buyTickets([movie_id, proyeccion_id, numAsiento, letraAsiento, metodoPago]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  
            const salasColection = db.collection('salas');
            const asientosProyectionColection = db.collection('asientosProyection');
            const usuariosColection = db.collection('usuarios');
            const boletosColection = db.collection('boletos');
            const pagosColection = db.collection('pagos');
            
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
                            
                            letraAsiento = letraAsiento.toUpperCase();
                           
                            const asientoExiste = sala.asientos.some(asiento => asiento.numero === numAsiento && asiento.fila === letraAsiento);   
                            if (asientoExiste) {
                                if (documentoExistente.length <= 0) {
                                    await asientosProyectionColection.insertOne({
                                        id_pelicula: movie_id,
                                        id_proyection: proyeccion_id,
                                        occupiedSeats: [`${numAsiento}${letraAsiento}`]
                                    });
                                } else if (documentoExistente.length > 0) {
                                    const existingSeats = documentoExistente[0].occupiedSeats;
                                    const newSeat = `${numAsiento}${letraAsiento}`;
                                
                                    if (existingSeats.includes(newSeat)) {
                                        console.log(`El asiento ${newSeat} ya está ocupado.`);
                                    } else {
                                        await asientosProyectionColection.updateOne(
                                            { _id: documentoExistente[0]._id },
                                            { $addToSet: { occupiedSeats: newSeat } }
                                        );
                                    }
                                }

                               
                                
                                if (usuarioRol === "vip") {
                                    const boleto = await boletosColection.insertOne({
                                        "pelicula_id": movie_id,
                                        "proyeccion_id": proyeccion_id,
                                        "usuario_id": usuarioId,
                                        "asiento": {
                                            "numero": numAsiento, 
                                            "fila": letraAsiento
                                        },
                                        "precio_total": 10.50,
                                        "descuento_aplicado": 10,
                                        "fecha_compra": new Date()
                                    });
                                    console.log(boleto);
                                           
                                } else if (usuarioRol === "estandar" || usuarioRol === "administrador") {
                                    const boleto = await boletosColection.insertOne({
                                        "id": ultimoBoletoRegistrado.id + 1,
                                        "pelicula_id": movie_id,
                                        "proyeccion_id": proyeccion_id,
                                        "usuario_id": usuarioId,
                                        "asiento": {
                                            "numero": numAsiento, 
                                            "fila": letraAsiento
                                        },
                                        "precio_total": 10.50,
                                        "descuento_aplicado": 0,
                                        "fecha_compra": new Date()
                                    });
                                    console.log(boleto);         
                                }
                                const ultimoPagoRegistrado = await pagosColection.findOne({}, { sort: { _id: -1 } });
                                await pagosColection.insertOne({
                                    "id": ultimoPagoRegistrado.id + 1,
                                    "usuario_id": usuarioId,
                                    "boleto_id": ultimoBoletoRegistrado.id + 1,
                                    "monto": 10.50,
                                    "metodo_pago": metodoPago,
                                    "estado": "pendiente"
                                });
                            } else if (!asientoExiste) {
                                console.log("El asiento que ingresó no está disponible");
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
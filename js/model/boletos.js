import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
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
     * @returns {Promise<void>}
     */
    async buyTickets() {
        function buscarEstadoAsiento(asientos, numero, fila) {
            const asiento = asientos.find(a => a.numero === numero && a.fila === fila);
            return asiento ? asiento.estado : null;
        }
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const salasColection = db.collection('salas')
            const asientosProyectionColection = db.collection('asientosProyection')
            const usuariosColection = db.collection('usuarios')
            const boletosColection = db.collection('boletos')
            const pagosColection = db.collection('pagos')
            const peliculas = await peliculasColection.find().toArray();
            const input = new Menu();
            const ultimoBoletoRegistrado = await boletosColection.findOne({}, { sort: { _id: -1 } });
            let increment = 1;
            
            
            const nombre = "Juan Pérez"
            const password = "k9P3x"
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre},
                    { password: password }
                ]
                }).toArray();
            if (usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
                return;
            }
            const usuarioRol = usuario[0].rol
            const usuarioId = usuario[0].id
            for (let movie of peliculas) {
                console.log(`------------------------------\n${increment++}. ${movie.titulo}`);
            }

            let movie_id = 4
            let selectedMovie = await peliculasColection.findOne({ id: movie_id });

            if (selectedMovie) {
                let proyections = selectedMovie.proyecciones;
                console.log(proyections);
                let proyeccion_id = 18
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
                            if(documentoExistente.length > 0) { 
                                if(documentoExistente[0].occupiedSeats.length >= capacidad){
                                    console.log("La sala está llena.");
                                    break;
                                }else if(documentoExistente[0].occupiedSeats.length < capacidad){
                                    console.log('Asientos:');
                                    console.log(sala.asientos);
                                }
                            }else if(documentoExistente.length === 0){
                                    console.log('Asientos:');
                                    console.log(sala.asientos);
                            }
                            let numAsiento;
                            let letraAsiento;
                            numAsiento = 3
                            letraAsiento = "C"
                            letraAsiento = letraAsiento.toUpperCase();
                            const metodoPago = "Tarjeta Crédito"
                            // Verificar si el asiento ingresado existe en la sala asignada a la funcion
                            const asientoExiste = sala.asientos.some(asiento => asiento.numero === numAsiento && asiento.fila === letraAsiento);    
                            if(asientoExiste){

                                // agregar el asiento comprado a la funcion
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
                                        console.log(`El asiento ${newSeat} ha sido añadido.`);
                                    }
                                }

                                // crear el boleto correspondiente
                                if(usuarioRol === "vip"){
                                    await boletosColection.insertOne({
                                            "pelicula_id": movie_id,
                                            "proyeccion_id": proyeccion_id,
                                            "usuario_id": usuarioId,
                                            "asiento": {
                                                "numero": numAsiento, 
                                                "fila":  letraAsiento
                                            },
                                            "precio_total": 10.50,
                                            "descuento_aplicado": 10,
                                            "fecha_compra": new Date()
                                        })
                                    console.log("Su boleto es:")
                                    console.log(`
    //-----------------------------//
        "pelicula_id": ${movie_id}
        "proyeccion_id": ${proyeccion_id}
        "usuario_id": ${usuarioId}
        "asiento": {
            "numero": ${numAsiento} 
            "fila":  ${letraAsiento}
        },
        "precio_total": 10.50,
        "descuento_aplicado": 10%,
    //-----------------------------//
                                        `)        
                                }else if(usuarioRol === "estandar"){
                                    await boletosColection.insertOne({
                                        "id": ultimoBoletoRegistrado.id + 1,
                                        "pelicula_id": movie_id,
                                        "proyeccion_id": proyeccion_id,
                                        "usuario_id": usuarioId,
                                        "asiento": {
                                            "numero": numAsiento, 
                                            "fila":  letraAsiento
                                        },
                                        "precio_total": 10.50,
                                        "descuento_aplicado": 0,
                                        "fecha_compra": new Date()
                                    })
                                    console.log("Su boleto es:")
                                    console.log(`
    //-----------------------------//
        "pelicula_id": ${movie_id}
        "proyeccion_id": ${proyeccion_id}
        "usuario_id": ${usuarioId}
        "asiento": {
            "numero": ${numAsiento} 
            "fila":  ${letraAsiento}
        },
        "precio_total": 10.50,
        "descuento_aplicado": 0,
    //-----------------------------//
                                        `)         
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
                            }else if(!asientoExiste){
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
     * @async
     * @function findTicketsByUser
     * @returns {Promise<void>}
     *
     * @throws Will throw an error if there is a problem connecting to the MongoDB database or retrieving data.
     *
     */
    async findTicketsByUser() {
        function buscarEstadoAsiento(asientos, numero, fila) {
            const asiento = asientos.find(a => a.numero === numero && a.fila === fila);
            return asiento ? asiento.estado : null;
        }
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const salasColection = db.collection('salas')
            const asientosProyectionColection = db.collection('asientosProyection')
            const usuariosColection = db.collection('usuarios')
            const boletosColection = db.collection('boletos')
            const peliculas = await peliculasColection.find().toArray();
            const input = new Menu();
            let increment = 1;

            const nombre = "Juan Pérez"
            const password = "k9P3x"
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre},
                    { password: password }
                ]
                }).toArray();
            const usuarioId = usuario[0].id
            const boletos = await boletosColection.find({ usuario_id: usuarioId }).toArray();
            console.log(`Boletos de: ${nombre}`);
            console.log(boletos);
            await input.getInput()
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}
import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
export class Pagos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }

    /**
 * Manages payments for a movie theater system.
 * This function connects to MongoDB, retrieves user and payment data, and allows users to manage their payments.
 *
 * @returns {Promise<void>}
 */
async paymentManagement() {
    // Helper function to find the state of a seat in a movie theater.
    function buscarEstadoAsiento(asientos, numero, fila) {
        const asiento = asientos.find(a => a.numero === numero && a.fila === fila);
        return asiento ? asiento.estado : null;
    }

    try {
        // Connect to MongoDB
        const db = await this.connection.connect();

        // Get collections from MongoDB
        const peliculasColection = db.collection('peliculas');
        const usuariosColection = db.collection('usuarios');
        const boletosColection = db.collection('boletos');
        const pagosColection = db.collection('pagos');

        // Retrieve movie data
        const peliculas = await peliculasColection.find().toArray();

        // Create a new instance of Menu
        const input = new Menu();

        // Initialize counter
        let increment = 1;

        // Prompt user for username and password
        const nombre = "Juan Pérez"
        const password = "k9P3x"

        // Validate user credentials
        const usuario = await usuariosColection.find({
            $and: [
                { nombre: nombre },
                { password: password }
            ]
        }).toArray();

        // Get user ID
        const usuario_id = usuario[0].id;

        // Retrieve pending payments for the user
        const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

        // If there are pending payments, display them and allow the user to pay
        if (pagosPendientes.length > 0) {
            const recipe = [1,2]
            // Initialize an array to store IDs of tickets not found in the pending payments
            const idsNoEncontrados = [];

            // Update the state of the selected tickets to "completado"
            for (const id of recipe) {
                const result = await pagosColection.updateOne(
                    { id: id, estado: "pendiente" },
                    { $set: { estado: "completado" } }
                );

                // If no ticket with the given ID was found, add it to the array
                if (result.matchedCount === 0) {
                    idsNoEncontrados.push(id);
                }
            }

            // Display success message if all tickets were paid
            if (idsNoEncontrados.length === 0) {
                console.log("Todos los pagos se completaron correctamente");
            }

            // Display IDs of tickets not found in the pending payments
            if (idsNoEncontrados.length > 0) {
                console.log("Los siguientes IDs no se encontraron en los pagos pendientes:", idsNoEncontrados);
            }
        }

        // If there are no pending payments, display a message
        if (pagosPendientes.length === 0) {
            console.log("No hay pagos pendientes");
            console.log("press any key to continue");
            await input.getInput();
            return;
        }
    } catch (error) {
        // Log error message and rethrow the error
        console.error('Error al conectar o obtener datos de MongoDB:', error);
        throw error;
    } finally {
        // Close the MongoDB connection
        await this.connection.close();
    }
}
    /**
 * Retrieves and displays uncompleted payments for a user.
 * This function connects to MongoDB, retrieves user and payment data, and displays the pending payments for the user.
 *
 * @returns {Promise<void>}
 */
async uncompletedPayments() {
    // Helper function to find the state of a seat in a movie theater.
    function buscarEstadoAsiento(asientos, numero, fila) {
        const asiento = asientos.find(a => a.numero === numero && a.fila === fila);
        return asiento ? asiento.estado : null;
    }

    try {
        // Connect to MongoDB
        const db = await this.connection.connect();

        // Get collections from MongoDB
        const peliculasColection = db.collection('peliculas');
        const usuariosColection = db.collection('usuarios');
        const boletosColection = db.collection('boletos');
        const pagosColection = db.collection('pagos');
        // Create a new instance of Menu
        const input = new Menu();

        // Initialize counter
        let increment = 1;

        // credentials for the user authentication
        const nombre = "Juan Pérez"
        const password = "k9P3x"

        // Validate user credentials
        const usuario = await usuariosColection.find({
            $and: [
                { nombre: nombre },
                { password: password }
            ]
        }).toArray();

        // If user credentials are valid, retrieve pending payments for the user
        if (usuario.length > 0) {
            const usuario_id = usuario[0].id;
            const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

            // If there are pending payments, display them
            if (pagosPendientes.length > 0) {
                console.log(pagosPendientes);
            }

            // If there are no pending payments, display a message
            if (pagosPendientes.length === 0) {
                console.log("No hay pagos pendientes");
                console.log("press any key to continue");
                await input.getInput();
                return;
            }
        }

        // If user credentials are invalid, display a message
        else if (usuario.length === 0) {
            console.log("Usuario o contraseña incorrectos");
            console.log("press any key to continue");
            await input.getInput();
            return;
        }
    } catch (error) {
        // Log error message and rethrow the error
        console.error('Error al conectar o obtener datos de MongoDB:', error);
        throw error;
    } finally {
        // Close the MongoDB connection
        await this.connection.close();
    }
}   
    /**
    * Retrieves and displays completed payments for a user.
    * This function connects to MongoDB, retrieves user and payment data, and displays the completed payments for the user.
    *
    * @returns {Promise<void>}
    */
    async completedPayments() {
        function buscarEstadoAsiento(asientos, numero, fila) {
            const asiento = asientos.find(a => a.numero === numero && a.fila === fila);
            return asiento ? asiento.estado : null;
        }
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const usuariosColection = db.collection('usuarios')
            const boletosColection = db.collection('boletos')
            const pagosColection = db.collection('pagos')
            const input = new Menu();
            let increment = 1;

            const nombre = "Juan Pérez"
            const password = "k9P3x"
            console.log(nombre);
            console.log(password);
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre},
                    { password: password }
                ]
                }).toArray();
           const usuario_id = usuario[0].id
           const pagosCompleted = await pagosColection.find({ $and: [{usuario_id: usuario_id}, {estado: "completado"}]}).toArray();
            if (pagosCompleted.length > 0) {
                console.log(pagosCompleted);
                console.log("press any key to continue")
                    await input.getInput()
                    return;
            }
            if(pagosCompleted.length === 0) {
                console.log("No hay pagos completados")
                console.log("press any key to continue")
                await input.getInput()
                return;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}
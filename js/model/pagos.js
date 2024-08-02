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
async paymentManagement(usuario_id, recipe) {
    let client;
    try {
        client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
        // Conectarse a la base de datos admin
        const adminDb = client.db('admin');
        
        const db = client.db('cineCampus');
        const usuariosColection = db.collection('usuarios');
        const boletosColection = db.collection('boletos');
        const pagosColection = db.collection('pagos');
        

        const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

        // If there are pending payments, display them and allow the user to pay
        if (pagosPendientes.length > 0) {
            // const recipe = [1,2]
            // Initialize an array to store IDs of tickets not found in the pending payments
            const idsNoEncontrados = [];

            // Update the state of the selected tickets to "completado"
            for (const id of recipe) {
                const result = await pagosColection.updateOne(
                    { id: id, estado: "pendiente" },
                    { $set: { estado: "completado" } }
                );
                console.log(result)

                // If no ticket with the given ID was found, add it to the array
                if (result.matchedCount === 0) {
                    idsNoEncontrados.push(id);
                }
            }


            // Display IDs of tickets not found in the pending payments
            if (idsNoEncontrados.length > 0) {
                console.log("Los siguientes IDs no se encontraron en los pagos pendientes:", idsNoEncontrados);
            }
        }

        // If there are no pending payments, display a message
        if (pagosPendientes.length === 0) {
            console.log("No hay pagos pendientes");
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
async uncompletedPayments(usuario_id) {
    let client;
    try {
        client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
        // Conectarse a la base de datos admin
        const adminDb = client.db('admin');
        
        const db = client.db('cineCampus');
        const usuariosColection = db.collection('usuarios');
        const boletosColection = db.collection('boletos');
        const pagosColection = db.collection('pagos');
        const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

            // If there are pending payments, display them
            if (pagosPendientes.length > 0) {
                console.log(pagosPendientes);
            }

            // If there are no pending payments, display a message
            if (pagosPendientes.length === 0) {
                console.log("No hay pagos pendientes");
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
    async completedPayments(usuario_id) {
        let client;
    try {
        client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
        // Conectarse a la base de datos admin
        const adminDb = client.db('admin');
        
        const db = client.db('cineCampus');
        const usuariosColection = db.collection('usuarios');
        const boletosColection = db.collection('boletos');
        const pagosColection = db.collection('pagos');
        const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "completado" }] }).toArray();

            // If there are pending payments, display them
            if (pagosPendientes.length > 0) {
                console.log(pagosPendientes);
            }

            // If there are no pending payments, display a message
            if (pagosPendientes.length === 0) {
                console.log("No hay pagos completados");
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
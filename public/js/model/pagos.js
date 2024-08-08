import Connection from '../../db/connect/connect.js';

export class Pagos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }

    /**
     * Manages payments for a movie theater system.
     * This function connects to MongoDB, retrieves user and payment data, and allows users to manage their payments.
     *
     * @param {Array} params - Array containing usuario_id and recipe.
     * @returns {Promise<void>}
     */
    async paymentManagement([usuario_id, recipe]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const pagosColection = db.collection('pagos');

            const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

            if (pagosPendientes.length > 0) {
                const idsNoEncontrados = [];

                for (const id of recipe) {
                    const result = await pagosColection.updateOne(
                        { id: id, estado: "pendiente" },
                        { $set: { estado: "completado" } }
                    );
                    console.log(result);

                    if (result.matchedCount === 0) {
                        idsNoEncontrados.push(id);
                    }
                }

                if (idsNoEncontrados.length > 0) {
                    console.log("Los siguientes IDs no se encontraron en los pagos pendientes:", idsNoEncontrados);
                }
            }

            if (pagosPendientes.length === 0) {
                console.log("No hay pagos pendientes");
                return;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Retrieves and displays uncompleted payments for a user.
     * This function connects to MongoDB, retrieves user and payment data, and displays the pending payments for the user.
     *
     * @param {Array} params - Array containing usuario_id.
     * @returns {Promise<void>}
     */
    async uncompletedPayments([usuario_id]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const pagosColection = db.collection('pagos');
            const pagosPendientes = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "pendiente" }] }).toArray();

            if (pagosPendientes.length > 0) {
                console.log(pagosPendientes);
            }

            if (pagosPendientes.length === 0) {
                console.log("No hay pagos pendientes");
                return;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Retrieves and displays completed payments for a user.
     * This function connects to MongoDB, retrieves user and payment data, and displays the completed payments for the user.
     *
     * @param {Array} params - Array containing usuario_id.
     * @returns {Promise<void>}
     */
    async completedPayments([usuario_id]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const pagosColection = db.collection('pagos');
            const pagosCompletados = await pagosColection.find({ $and: [{ usuario_id: usuario_id }, { estado: "completado" }] }).toArray();

            if (pagosCompletados.length > 0) {
                console.log(pagosCompletados);
            }

            if (pagosCompletados.length === 0) {
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

import Connection from '../../db/connect/connect.js';
export class Boletos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }
    async GetAllCollections() {
        try {
            const db = await this.connection.connect()
            const collectionsCursor = await db.listCollections().toArray();

            console.log('Connected to MongoDB');
            console.log('Collections from database:');

            collectionsCursor.forEach(collection => {
                console.log(` - ${collection.name}`);
            });
        }
        catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
    
}

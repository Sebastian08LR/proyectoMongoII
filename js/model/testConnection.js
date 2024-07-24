import Connection from '../../db/connect/connect.js';

export async function testConnection() {
    const connection = new Connection();

    try {
        const db = await connection.connect();
        const collectionsCursor = await db.listCollections().toArray();

        console.log('Connected to MongoDB');
        console.log('Collections from database:');

        collectionsCursor.forEach(collection => {
            console.log(` - ${collection.name}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await connection.close();
        return 'Test connection successful';
    }
}
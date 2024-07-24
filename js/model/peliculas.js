import Connection from '../../db/connect/connect.js';
export class Pelicula {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }
    async getMovieNames() {
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const peliculas = await peliculasColection.find().toArray();
            let increment = 1
            for(let movie of peliculas){

                console.log(`
                    ------------------------------

                    ${increment}. ${movie.titulo}

                    ------------------------------
                    `);
                increment = increment + 1;
            }     
        }
        catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}
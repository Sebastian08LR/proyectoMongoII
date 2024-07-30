import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
export class Pelicula {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }
    /**
     * Retrieves and displays the names of all movies in the database.
     *
     * @returns {void}
     * @throws Will throw an error if there is a problem connecting to the database or retrieving data.
     */
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
    /**
     * Retrieves and displays detailed information about a movie selected by the user.
     *
     * @returns {Promise<void>}
     * @throws Will throw an error if there is a problem connecting to the database or retrieving data.
     */
    async getMovieInfo(){
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const input = new Menu()
            //Mostrar todas las peliculas para que el usuario seleccione un id de una pelicula existente
            const peliculas = await peliculasColection.find().toArray()
            for(let movie of peliculas){
                console.log(`${movie.id}. ${movie.titulo}`)
            }
            let movie_id = await input.getInput()
            movie_id = Number(movie_id)
            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );
            if(!pelicula){
                console.log('No se encontró la pelicula con el id seleccionado.')
                return;
            }
            else{
                console.log(pelicula);
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
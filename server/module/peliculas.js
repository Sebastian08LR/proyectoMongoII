const Connection = require('../helpers/connect/connect.js');
const { MongoClient, ObjectId } = require('mongodb');

class Pelicula {
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
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  
            const peliculas = await peliculasColection.find({}, { projection: { titulo: 1, id: 1, _id: 0 } }).toArray();
            return peliculas  
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Retrieves and displays detailed information about a movie selected by the user.
     *
     * @param {Array} params - Array containing the movie_id.
     * @returns {Promise<void>}
     * @throws Will throw an error if there is a problem connecting to the database or retrieving data.
     */
    async getMovieInfo(movieId) {
        const movie_id = parseInt(movieId.id);
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  
            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );
            if (!pelicula) {
                console.log('No se encontró la pelicula con el id seleccionado.');
                return;
            } else {
                console.log(pelicula);
                return pelicula
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Retrieves and displays the projections of a movie selected by the user.
     *
     * @param {Array} params - Array containing the movie_id.
     * @returns {Promise<void>}
     * @throws Will throw an error if there is a problem connecting to the database or retrieving data.
     */
    async getMovieProyections(movieId) {
        const movie_id = parseInt(movieId.id);
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  

            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );
            if (!pelicula) {
                console.log('No se encontró la pelicula con el id seleccionado.');
                return;
            } else {
                const proyecciones = pelicula.proyecciones;
                console.log(proyecciones);
                return proyecciones;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Retrieves and displays the available seats for a specific projection of a movie.
     *
     * @param {Array} params - Array containing the movie_id and projection_id.
     * @returns {Promise<void>}
     * @throws Will throw an error if there is a problem connecting to the database or retrieving data.
     */
    async getMovieAvaliableSeats(movieInfo) {
        const movie_id = parseInt(movieInfo.movieId);
        const proyection_id = parseInt(movieInfo.functionId);
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  
            const salasColection = db.collection('salas');
            const asientosProyectionColection = db.collection('asientosProyection');

            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );

            const proyecciones = pelicula.proyecciones;
            let sala_id; 
            for (let proyection of proyecciones) {
                if (proyection.id === proyection_id) {
                    sala_id = proyection.sala;
                }
            }

            const sala = await salasColection.findOne({ _id: sala_id });
            const occupiedSeats = await asientosProyectionColection.find({ 
                $and: [{ id_pelicula: movie_id }, { id_proyection: proyection_id }]
            }).toArray();

            if (occupiedSeats.length === 0) {
                return sala.asientos
            } else {
                let occupiedSeatsSet = new Set(occupiedSeats[0].occupiedSeats);
                let availableSeats = [];

                for (let seat of sala.asientos) {
                    const seatInAsientos = `${seat.numero}${seat.fila}`;
                    if (!occupiedSeatsSet.has(seatInAsientos)) {
                        availableSeats.push(seat);
                    }
                }
                return availableSeats;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    /**
     * Adds a new projection to a specific movie.
     *
     * @param {Array} params - Array containing the movieId and newProjection.
     * @returns {Promise<void>}
     * @throws Will throw an error if there is a problem connecting to the database or updating data.
     */
    async addProjectionToMovie([movieId, newProjection]) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');  
    
            const movie = await peliculasColection.findOne({ id: movieId });
    
            if (!movie) {
                throw new Error('Película no encontrada');
            }
    
            const lastProjection = movie.proyecciones[movie.proyecciones.length - 1];
            const newId = lastProjection ? lastProjection.id + 1 : 1;
    
            const newProjectionWithId = {
                ...newProjection,
                id: newId
            };
    
            const updateResult = await peliculasColection.updateOne(
                { id: movieId },
                { $push: { proyecciones: newProjectionWithId } }
            );
    
            if (updateResult.modifiedCount === 1) {
                return console.log(updateResult);
            } else {
                return console.log(updateResult);
            }
        } catch (error) {
            console.error('Error al agregar la proyección:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}

module.exports = Pelicula;
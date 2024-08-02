import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
import { MongoClient, ObjectId } from 'mongodb';
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
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            // Conectarse a la base de datos admin
            const adminDb = client.db('admin');
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas')  
            const peliculas = await peliculasColection.find({}, { projection: { titulo: 1, id: 1, _id: 0 } }).toArray();
            console.log("Peliculas", peliculas);  
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
    async getMovieInfo(movie_id){
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            // Conectarse a la base de datos admin
            const adminDb = client.db('admin');
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas')  

            //Mostrar todas las peliculas para que el usuario seleccione un id de una pelicula existente
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

    async getMovieProyections(movie_id){
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            // Conectarse a la base de datos admin
            const adminDb = client.db('admin');
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas')  
            const salasColection = db.collection('salas')

            //Mostrar todas las peliculas para que el usuario seleccione un id de una pelicula existente
            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );
            if(!pelicula){
                console.log('No se encontró la pelicula con el id seleccionado.')
                return;
            }
            else{
                const proyecciones = pelicula.proyecciones
                console.log(pelicula.proyecciones);
                return proyecciones
            }
        }
        catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }

    async getMovieAvaliableSeats(movie_id, proyection_id){
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            // Conectarse a la base de datos admin
            const adminDb = client.db('admin');
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas')  
            const salasColection = db.collection('salas')
            const asientosProyectionColection = db.collection('asientosProyection')


            const pelicula = await peliculasColection.findOne(
                { id: movie_id },
                { projection: { _id: 0, id: 0 } }
            );
            const proyecciones = pelicula.proyecciones
            let sala_id; 
            for ( let proyection of proyecciones ){
                if(proyection.id === proyection_id){
                    sala_id = proyection.sala
                }
            }
    
            const sala = await salasColection.findOne({ _id: sala_id });
            const occupiedSeats = await asientosProyectionColection.find({ $and: [{ id_pelicula: movie_id}, { id_proyection: proyection_id }]}).toArray();
            if ( occupiedSeats.length === 0){
                console.log(sala.asientos)
            }
            else{
                let occupiedSeatsSet = new Set(occupiedSeats[0].occupiedSeats);
                let availableSeats = [];

                for (let seat of sala.asientos) {
                    const seatInAsientos = `${seat.numero}${seat.fila}`;
                    if (!occupiedSeatsSet.has(seatInAsientos)) {
                        availableSeats.push(seat);
                    }
                }

            console.log(availableSeats);
            }
        }
        catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
    async addProjectionToMovie(movieId, newProjection) {
        let client;
        try {
            // Conexión a la base de datos
            client = await this.connection.connect();
            const db = client.db('cineCampus');
            const peliculasColection = db.collection('peliculas');
    
            // Buscar la película por id
            const movie = await peliculasColection.findOne({ id: movieId });
    
            if (!movie) {
                throw new Error('Película no encontrada');
            }
    
            // Encontrar el último id de proyección y asignar uno nuevo
            const lastProjection = movie.proyecciones[movie.proyecciones.length - 1];
            const newId = lastProjection ? lastProjection.id + 1 : 1;
    
            // Crear la nueva proyección con el nuevo id
            const newProjectionWithId = {
                ...newProjection,
                id: newId
            };
    
            // Actualizar la película con la nueva proyección
            const updateResult = await peliculasColection.updateOne(
                { id: movieId },
                { $push: { proyecciones: newProjectionWithId } }
            );
    
            if (updateResult.modifiedCount === 1) {
                console.log('Proyección añadida exitosamente');
            } else {
                console.log('No se pudo añadir la proyección');
            }
        } catch (error) {
            console.error('Error al agregar la proyección:', error);
            throw error;
        } finally {
            if (client) {
                await this.connection.close();
            }
        }
    }
}

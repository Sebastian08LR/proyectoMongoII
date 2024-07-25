import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
export class Boletos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }
    async buyTickets() {
        try {
            const db = await this.connection.connect()
            const peliculasColection = db.collection('peliculas')  
            const salasColection = db.collection('salas')
            const peliculas = await peliculasColection.find().toArray();
            const input = new Menu()     
            let increment = 1
            for(let movie of peliculas){
                console.log(`------------------------------
 ${increment++}. ${movie.titulo}
                `);
            }
            let movie_id = await input.getInput()
            movie_id = Number(movie_id)
            let selectedMovie = await peliculasColection.find({id: movie_id}).toArray();
            if(selectedMovie){
                let proyections = selectedMovie[0].proyecciones 
                console.log(proyections)
                let proyeccion_id = await input.getInput()
                proyeccion_id = Number(proyeccion_id)
                for(let proyection of proyections){
                    if(proyection.id === proyeccion_id){
                        console.log('Proyeccion seleccionada:')
                        let sala_id = proyection.sala
                        console.log(sala_id)
                        let sala = await salasColection.find({_id: sala_id}).toArray();
                        console.log(sala)
                    }
                }

                
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
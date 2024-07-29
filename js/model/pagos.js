import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
export class Pagos {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }

    async paymentManagement() {
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
            const peliculas = await peliculasColection.find().toArray();
            const input = new Menu();
            let increment = 1;

            console.log("Usuario: ");
            const nombre = await input.getInput()
            console.log("Contraseña: ");
            const password = await input.getInput()
            console.log(nombre);
            console.log(password);
            const usuario = await usuariosColection.find({
                $and: [
                    { nombre: nombre},
                    { password: password }
                ]
                }).toArray();
           const usuario_id = usuario[0].id
           const pagosPendientes = await pagosColection.find({ $and: [{usuario_id: usuario_id}, {estado: "pendiente"}]}).toArray();
           console.log(pagosPendientes)
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
}
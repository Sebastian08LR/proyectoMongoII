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
           if (pagosPendientes.length > 0) {
            console.log(pagosPendientes)
            console.log("Ingrese el ID De los boletos que va a pagar:")
            const recipe = await input.getInput()
            console.log(recipe);
            const idsBoletos = recipe.split(',').map(Number);
            
            const idsNoEncontrados = [];
            
            for (const id of idsBoletos) {
                const result = await pagosColection.updateOne(
                    { id: id, estado: "pendiente" },
                    { $set: { estado: "completado" } }
                );
        
                if (result.matchedCount === 0) {
                    idsNoEncontrados.push(id);
                }
            }
            if(idsNoEncontrados.length === 0) {
                console.log("Todos los pagos se completaron correctamente");
            }
            if (idsNoEncontrados.length > 0) {
                console.log("Los siguientes IDs no se encontraron en los pagos pendientes:", idsNoEncontrados);
            }
        }
            if(pagosPendientes.length === 0) {
                console.log("No hay pagos pendientes")
                console.log("press any key to continue")
                await input.getInput()
                return;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
    async uncompletedPayments() {
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
            if (usuario.length > 0) {
                const usuario_id = usuario[0].id
                const pagosPendientes = await pagosColection.find({ $and: [{usuario_id: usuario_id}, {estado: "pendiente"}]}).toArray();
                 if (pagosPendientes.length > 0) {
                 console.log(pagosPendientes)
                 }
                 if(pagosPendientes.length === 0) {
                     console.log("No hay pagos pendientes")
                     console.log("press any key to continue")
                     await input.getInput()
                     return;
                 }
            }
            else if(usuario.length === 0){
                 console.log("Usuario o contraseña incorrectos")
                 console.log("press any key to continue")
                 await input.getInput()
                 return;
            }
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            await this.connection.close();
        }
    }
    async completedPayments() {
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
           const pagosCompleted = await pagosColection.find({ $and: [{usuario_id: usuario_id}, {estado: "completado"}]}).toArray();
            if (pagosCompleted.length > 0) {
                console.log(pagosCompleted);
                console.log("press any key to continue")
                    await input.getInput()
                    return;
            }
            if(pagosCompleted.length === 0) {
                console.log("No hay pagos completados")
                console.log("press any key to continue")
                await input.getInput()
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
import Connection from '../../db/connect/connect.js';
import Menu from './menu.js';
export class Usuarios {
    constructor(username, password) {
        this.connection = new Connection(username, password);
    }
    /**
     * This function is responsible for creating a new user in the MongoDB database.
     * It checks if the user is an admin and then prompts for new user details.
     * If the new user's role is 'VIP', it also requires a VIP card number.
     * The function logs the result of the user creation process.
     *
     * @returns {Promise<void>}
     */
    async createUser() {
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
            const LastUserRegister = await usuariosColection.findOne({}, { sort: { _id: -1 } });
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
            if(usuario.length > 0) {
                const usuario_rol = usuario[0].rol
                if(usuario_rol === "administrador"){
                    console.log("Bienvenido administrador");
                    console.log("Ingrese el nombre del nuevo usuario:")
                    const newUserName = await input.getInput()
                    console.log("Ingrese la contraseña del nuevo usuario:")
                    const newUserPassword = await input.getInput()
                    console.log("Ingrese el rol del nuevo usuario (administrador o usuario o vip):")
                    const newUserRole = await input.getInput()
                    console.log("Ingrese el email del nuevo usuario");
                    const newUserEmail = await input.getInput()
                    if(newUserRole.toLowerCase() === "vip"){
                        console.log("Ingrese el numero de la tarjeta VIP: ")
                        const newUserVipCardNumber = await input.getInput()
                        const newUserVIP = await usuariosColection.insertOne({
                            "id": LastUserRegister.id + 1,
                            "nombre": newUserName,
                            "email": newUserEmail,
                            "rol": newUserRole,
                            "tarjeta_vip": {
                                "numero": newUserVipCardNumber,
                                "estado": "activo"
                            },
                            "password":  newUserPassword

                        })
                        console.log("Usuario creado exitosamente");
                        console.log(newUserVIP)
                    }else if(newUserRole.toLowerCase() !== "vip"){
                        const newUser = await usuariosColection.insertOne({
                            "id": LastUserRegister.id + 1,
                            "nombre": newUserName,
                            "email": newUserEmail,
                            "rol": newUserRole,
                            "tarjeta_vip": null,
                            "password":  newUserPassword
                        })
                        console.log("Usuario creado exitosamente");
                        console.log(newUser)
                    }
                }else if(usuario_rol !== "administrador"){
                    console.log("para realizar esta operacion se necesita de un Usuario Administrador");
                }

            }else if(usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
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
     * This function is responsible for listing all users in the MongoDB database.
     * It requires the user to be logged in as an admin.
     * The function prompts for user credentials, checks if the user is an admin,
     * and then retrieves all user names from the database.
     *
     * @returns {Promise<void>}
     */
    async listAllUsers() {
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
            const LastUserRegister = await usuariosColection.findOne({}, { sort: { _id: -1 } });
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
            if(usuario.length > 0) {
                const usuario_rol = usuario[0].rol
                if(usuario_rol === "administrador"){
                    console.log("USUARIOS");
                    const projection = { _id: 0, nombre: 1 };
                    const usuarios = await usuariosColection.find({}, { projection }).toArray();
                    console.log(usuarios);
                }else if(usuario_rol !== "administrador"){
                    console.log("para realizar esta operacion se necesita de un Usuario Administrador");
                }

            }else if(usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
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
     * This function retrieves user details from the MongoDB database.
     * It requires the user to be logged in as an admin.
     * The function prompts for user credentials, checks if the user is an admin,
     * and then retrieves the details of a specific user based on their ID.
     *
     * @returns {Promise<void>}
     */
    async getUserDetails() {
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
            const LastUserRegister = await usuariosColection.findOne({}, { sort: { _id: -1 } });
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
            if(usuario.length > 0) {
                const usuario_rol = usuario[0].rol
                if(usuario_rol === "administrador"){
                    console.log("USUARIOS");
                    const projection = { _id: 0, nombre: 1, id: 1 };
                    const usuarios = await usuariosColection.find({}, { projection }).toArray();
                    console.log(usuarios);
                    console.log("Ingrese el ID del usuario para ver sus detalles:");
                    const userId = await input.getInput()
                    const userDetails = await usuariosColection.findOne({ id: parseInt(userId) });
                    console.log(userDetails);
                }else if(usuario_rol !== "administrador"){
                    console.log("para realizar esta operacion se necesita de un Usuario Administrador");
                }

            }else if(usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
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
     * This function is responsible for updating the role of a user in the MongoDB database.
     * It requires the user to be logged in as an admin.
     * The function prompts for user credentials, checks if the user is an admin,
     * retrieves the details of a specific user based on their ID, and updates their role.
     *
     * @returns {Promise<void>}
     */
    async updateUserRol() {
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
            const LastUserRegister = await usuariosColection.findOne({}, { sort: { _id: -1 } });
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
            if(usuario.length > 0) {
                const usuario_rol = usuario[0].rol
                if(usuario_rol === "administrador"){
                    console.log("USUARIOS");
                    const projection = { _id: 0, nombre: 1, id: 1 };
                    const usuarios = await usuariosColection.find({}, { projection }).toArray();
                    console.log(usuarios);
                    console.log("Ingrese el ID del usuario para ver sus detalles:");
                    const userId = await input.getInput()
                    try {
                        console.log("Ingrese el Nuevo rol para el usuario:")
                        const newRole = await input.getInput()
                        const updatedUser = await usuariosColection.updateOne({ id: parseInt(userId) }, { $set: { rol: newRole } });
                        console.log("Rol actualizado correctamente");
                        console.log(updatedUser);
                    } catch (error) {
                        console.error('Error al actualizar el rol del usuario:', error);
                    }

                    
                }else if(usuario_rol !== "administrador"){
                    console.log("para realizar esta operacion se necesita de un Usuario Administrador");
                }

            }else if(usuario.length === 0) {
                console.log("Usuario o contraseña incorrectos");
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
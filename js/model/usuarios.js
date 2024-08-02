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
    async createUser(userName, password , rol, email , tarjeta_vip) {
        try {
            // Conectar a la base de datos admin
            const db = await this.connection.connect();
            const adminDb = db.db('admin'); // Conectarse a la base de datos admin
    
            // Definir el rol del nuevo usuario
            let userRole;
            if (rol === "administrador") {
                userRole = [{ role: 'root', db: 'admin' }];
            } else if (rol === "estandar") {
                userRole = [{ role: 'usuarioStandard', db: 'admin' }];
                tarjeta_vip = null;
            } else if(rol === "vip"){
                userRole = [{ role: 'usuarioStandard', db: 'admin' }];
            }else {
                throw new Error("Rol no reconocido");
            }
    
            // Crear un nuevo usuario en la base de datos admin
            const newUser = {
                user: userName,
                pwd: password,
                roles: userRole
            };
    
            const result = await adminDb.command({
                createUser: newUser.user,
                pwd: newUser.pwd,
                roles: newUser.roles
            });
    
            console.log('Usuario creado en la base de datos admin:', result);
    
            // Insertar el nuevo usuario en la colección 'usuarios' dentro de la base de datos 'cineCampus'
            const cineCampusDb = db.db('cineCampus'); // Conectar a la base de datos cineCampus
            const usuariosColection = cineCampusDb.collection('usuarios');
            const LastUserRegister = await usuariosColection.findOne({}, { sort: { _id: -1 } });
            const userDocument = {
                id: LastUserRegister.id +1,
                nombre: userName,
                email: email,
                rol: rol,
                tarjeta_vip: tarjeta_vip // Usar null si tarjeta_vip no está definida
            };
    
            const insertResult = await usuariosColection.insertOne(userDocument);
            console.log('Usuario insertado en la colección usuarios:', insertResult);
    
        } catch (error) {
            console.error('Error al crear el usuario o insertarlo en la base de datos:', error);
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
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
            const db = client.db('cineCampus'); // Conectarse a la base de datos cineCampus
            const adminDb = client.db('admin');
            const usuariosColection = db.collection('usuarios'); // Accede a la colección 'usuarios'
            
            // Encuentra todos los documentos en la colección
            const usuarios = await usuariosColection.find({}, { projection: { nombre: 1, id: 1 } }).toArray();
            
            console.log('Usuarios encontrados en la base de datos:', usuarios);
            return usuarios; // Devuelve la lista de usuarios
    
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            if (client) {
                await this.connection.close(); // Asegúrate de cerrar la conexión
            }
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
    async updateUserRol(userName, newRole) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
    
            // Conectarse a la base de datos admin
            const adminDb = client.db('admin');
            
            // Actualiza el rol del usuario en la base de datos admin
            const result = await adminDb.command({
                updateUser: userName,
                roles: [{ role: newRole, db: 'admin' }]
            });
    
            console.log('Rol actualizado en la base de datos admin:', result);
    
            // Conectarse a la base de datos cineCampus
            const cineCampusDb = client.db('cineCampus');
            const usuariosColection = cineCampusDb.collection('usuarios');
            
            // Actualiza el rol del usuario en la colección usuarios
            const updateResult = await usuariosColection.updateOne(
                { nombre: userName }, // Filtro para encontrar al usuario
                { $set: { rol: newRole } } // Actualización del campo 'rol'
            );
    
            console.log('Rol actualizado en la colección usuarios:', updateResult);
    
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
            throw error;
        } finally {
            if (client) {
                await this.connection.close(); // Asegúrate de cerrar la conexión
            }
        }
    }
    
    async getUserDetails(user_id) {
        let client;
        try {
            client = await this.connection.connect(); // Obtiene el cliente MongoDB
            const db = client.db('cineCampus'); // Conectarse a la base de datos cineCampus
            const adminDb = client.db('admin');
            const usuariosColection = db.collection('usuarios'); // Accede a la colección 'usuarios'
            
            // Encuentra todos los documentos en la colección
            const usuarioDetails = await usuariosColection.find({ id: user_id}).toArray();
            
            console.log(usuarioDetails);
    
        } catch (error) {
            console.error('Error al conectar o obtener datos de MongoDB:', error);
            throw error;
        } finally {
            if (client) {
                await this.connection.close(); // Asegúrate de cerrar la conexión
            }
        }
    }
}
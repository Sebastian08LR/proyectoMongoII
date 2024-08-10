
import { Pelicula } from "./js/module/peliculas.js";
import { Usuarios } from "./js/module/usuarios.js";
import { Boletos } from "./js/module/boletos.js";
import { Pagos } from "./js/module/pagos.js";
import { MongoClient, ObjectId } from 'mongodb';
const pelicula = new Pelicula();

// Get movie names
// 
pelicula.getMovieNames()

// Get movie info
//pelicula.getMovieInfo([2]);

// Get movie projections
//pelicula.getMovieProyections([2]);

// Get available seats
//pelicula.getMovieAvaliableSeats([2, 10]);

// Add projection to movie
/* pelicula.addProjectionToMovie([
  3, 
  { 
    fecha: new Date('2024-08-02T00:00:00.000Z'), 
    hora: '22:30', 
    sala: new ObjectId('000000000000000000000001') 
  }
]); */

const usuarios = new Usuarios();
// Create user
//usuarios.createUser(["JuanL", "123", "administrador", "karen123@gmail.com", null]);

// List all users
// usuarios.listAllUsers()

// Get user details
//usuarios.getUserDetails([5]);

// Update user role
//usuarios.updateUserRol(["Sebastian", "usuarioStandard"]);


const boleto = new Boletos();

// Buy tickets
//boleto.buyTickets([2, 10, 1, "B", "Efectivo"]);

// Find tickets by user
//boleto.findTicketsByUser(["Sebastian", "123"]);

const pago = new Pagos();

// Uncompleted payments
//pago.uncompletedPayments([3]);

// Payment management
//pago.paymentManagement([3, [2]]);

// Completed payments
//pago.completedPayments([1]);


// Uso de cada uno de los apartados de los modulos

// MODULO DE PELICULAS
/* 
    1. Listar peliculas
   
    Listará todos los nombres de las peliculas disponibles
        //pelicula.getMovieNames()

    2. Pelicula INFO
       Listará toda la información de una pelicula específica(Se ingresa el id(INT) de la pelicula la cual se quier mostrar la información)
        //pelicula.getMovieInfo(2)
    3. Proyecciones
       Listará todas las proyecciones de una pelicula seleccionada por el usuario (Se ingresa el id de la pelicula)
        //pelicula.getMovieProyections(2);
    4. Asientos Disponibles
       Listará todos los asientos disponibles para una pelicula seleccionada por el usuario (Se ingresa el id de la pelicula y el numero de asientos)
        //pelicula.getMovieAvaliableSeats(2, 10);
    
    5. Proyecciones
        Añade una nueva proyeccion a la pelicula seleccionada mediante el id de la pelicula (INT), Mediante un array que contiene la informacion de la nueva proyeccion de la siguiente forma
        {fecha: new Date('2024-08-02T00:00:00.000Z'), hora: '22:30', sala: new ObjectId('000000000000000000000001')}
        //pelicula.addProjectionToMovie(3, {fecha: new Date('2024-08-02T00:00:00.000Z'), hora: '22:30', sala: new ObjectId('000000000000000000000001')})
        NOTA: esta funccion unicamente puede ser realizada por un usuario administrador
    Usuarios que puenden ejecutar estas funciones

    USUARIO ADMINISTRADOR
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''

        MONGO_USER = 'Andres'
        MONGO_PASSWORD = '789456'

    ```

    USUARIOS ESTANDAR
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''

        MONGO_USER = 'Sebastian'
        MONGO_PASSWORD = '123'

    ```

*/

// MODULO DE USUARIOS
/* 
    1. Crear Usuario
        Mediante varios Inputs, se recolecta la información necesaria para la creacion de un nuevo Usuario
        nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
        datos de ingreso: ("nombre del usuario (STRING)", "contrseña del usuario (STRING)", "rol del usuario (STRING)", "email del usuario (STRING)", "informacion de la tarjeta vip(array con los siguientes campos { numero: number, estado : "activa"})")
        nota: la tarjeta vip no es obligatoria, en caso de no ingresarla, colocar null
        //usuarios.createUser("Karen", "123", "administrador", "karen123@gmail.com", null)

    2. Listar Usuarios
        Lista todos los nombres de los usuarios registrados
        nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
        //usuarios.listAllUsers();
    3. Detalles de Usuario
        Muestra todos los detalles de un usuario específico seleccionado por el usuario (Se ingresa el id del usuario)
        nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
        //usuarios.getUserDetails(5);

    4. Actualizar Rol de Usuario
        Permite actualizar el rol de un usuario seleccionado(Se ingresa el id del usuario), Se pide ingresar el nuevo rol que tendrá el usuario y este es asignado al mismo
        //usuarios.updateUserRol("Sebastian", "usuarioStandard");

    Usuarios que puenden ejecutar estas funciones

    USUARIO ADMINISTRADOR
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''

        MONGO_USER = 'Andres'
        MONGO_PASSWORD = '789456'

    ```
*/

// MODULO DE BOLETAS
/* 
    1. Comprar boletas
      Permite al usuario comprar boletas para una pelicula seleccionada por el usuario (Se ingresa el id de la pelicula) y  número y fila de la boleta que desee comprar
      Nota: Si el Usuario desde el cual se está realizando la compra tiene rol VIP se le asigna un descuento al momento de generar el pago
       //boleto.buyTickets(2, 10, 1, "B", "Efectivo");
    
    2. Boletos De Usuario
        Permite al usuario ver todos sus boletas compradas/reservadas
        //boleto.findTicketsByUser("Sebastian", "123");
    
    Usuarios que puenden ejecutar estas funciones
    
    USUARIO ADMINISTRADOR
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''

        MONGO_USER = 'Andres'
        MONGO_PASSWORD = '789456'

    ```
    USUARIO ESTANDAR

    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''
        MONGO_USER = 'Sebastian'
        MONGO_PASSWORD = '123'

    ```
*/

// MODULO DE PAGOS
/* 
    1. Pagar Boletas
       Permite al usuario pagar las boletas que ha comprado/reservado en el modulo de BOLETAS, Se pide ingresar el metodo de pago y seleccionar la boleta que desea pagar(se muestran unicametne aquellas que no han sido pagadas aún)
       //pago.paymentManagement(3, [2]);
    
    2. Pagos pendientes de Usuario
       Muestra los pagos en estado "pendiente" para el usuario ingresado, se ingresa el id del usuario (INT)
       //pago.uncompletedPayments(3);
    
    3. Pagos realizados de Usuarios
       Muestra los pagos en estado "realizado" para el usuario ingresado, se ingresa el id del usuario (INT) 
       //pago.completedPayments(1);

    Usuarios que puenden ejecutar estas funciones
    
    USUARIO ADMINISTRADOR
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''

        MONGO_USER = 'Andres'
        MONGO_PASSWORD = '789456'

    ```
    USUARIO ESTANDAR
    
    ```
        MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
        DB_NAME = ''
        MONGO_USER = 'Sebastian'
        MONGO_PASSWORD = '123'

    ```
*/
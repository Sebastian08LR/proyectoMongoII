import  Menu  from "./js/model/menu.js";

const menu = new Menu();
menu.run();

// Uso de cada uno de los apartados de los modulos

// MODULO DE PELICULAS
/* 
    1. Listar peliculas
        Listará todos los nombres de las peliculas disponibles

    2. Pelicula INFO
        Listará toda la información de una pelicula específica seleccionada por el usuario (Se ingresa el id de la pelicula)

    0. Salir
        Saldrá del modulo de peliculas
*/

// MODULO DE USUARIOS
/* 
    1. Crear Usuario
        Mediante varios Inputs, se recolecta la información necesaria para la creacion de un nuevo Usuario
        nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
    2. Listar Usuarios
        Lista todos los nombres de los usuarios registrados
        nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
    3. Detalles de Usuario
       Muestra todos los detalles de un usuario específico seleccionado por el usuario (Se ingresa el id del usuario)
       nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
    4. Actualizar Rol de Usuario
       Permite actualizar el rol de un usuario seleccionado(Se ingresa el id del usuario), Se pide ingresar el nuevo rol que tendrá el usuario y este es asignado al mismo
       nota: Unicamente un usuario con rol de administrador podrá entrar a este apartado
    0. Salir
*/

// MODULO DE BOLETAS
/* 
    1. Comprar boletas
      Permite al usuario comprar boletas para una pelicula seleccionada por el usuario (Se ingresa el id de la pelicula) y  número y fila de la boleta que desee comprar
      Nota: Si el Usuario desde el cual se está realizando la compra tiene rol VIP se le asigna un descuento al momento de generar el pago
    2. Boletos De Usuario
        Permite al usuario ver todos sus boletas compradas/reservadas
*/

// MODULO DE PAGOS
/* 
    1. Pagar Boletas
       Permite al usuario pagar las boletas que ha comprado/reservado en el modulo de BOLETAS, Se pide ingresar el metodo de pago y seleccionar la boleta que desea pagar(se muestran unicametne aquellas que no han sido pagadas aún)
    2. Pagos pendientes de Usuario
       Muestra los pagos en estado "pendiente" para el usuario ingresado
    3. Pagos realizados de Usuarios
       Muestra los pagos en estado "realizado" para el usuario ingresado
*/
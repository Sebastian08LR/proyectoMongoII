import readline from 'readline';
import Connection from '../../db/connect/connect.js';
import { Boletos } from './boletos.js';
import { Pelicula } from './peliculas.js';
import { Pagos } from './pagos.js';
import { Usuarios } from './usuarios.js';
export default class Menu {
  constructor(username, password) {
    this.options = [
      "Peliculas",
      "Usuarios",
      "Boletas",
      "Pagos"
    ];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
      this.connection = new Connection(username, password);
  }

  displayMenu() {
    console.log("=== Menú Principal ===");
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    console.log("0. Salir");
    console.log("=====================");
  }

  getInput(prompt = '') {
    return new Promise((resolve) => {
      this.rl.question(prompt, (choice) => {
        resolve(choice);
      });
    });
  }
  async run() {
    let choice;
    do {
      this.displayMenu();
      console.log("Ingrese una opcion:")
      choice = await this.getInput();
      
      switch(choice) {
        case "1": 
          const peliculas = new Pelicula();
          let choice2;
          do {
            console.log(`
              PELICULAS MODULE
              
              1. Listar Peliculas
              2. Pelicula INFO
              0. salir
              
                          `);
            choice2 = await this.getInput();
            switch(choice2) {
              case "1":
                await peliculas.getMovieNames();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "2":
                await peliculas.getMovieInfo();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "0":
                console.log("Saliendo del módulo de Películas");
                break;
              default:
                console.log("Opción no válida. Por favor, intente de nuevo.");
                break;
            }
          } while (choice2 !== "0");
          break;  
        case "2":
          const usuario = new Usuarios();
          let choice3;
          do {
            console.log(`
              USUARIOS MODULE
              
              1. Crear Usuario
              2. Listar Usuarios
              3. Detalles de Usuario
              4. Actualizar Rol de Usuario
              0. salir
              
                          `);
            choice3 = await this.getInput();
            switch(choice3) {
              case "1":
                await usuario.createUser();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "2":
                await usuario.listAllUsers();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "3":
                await usuario.getUserDetails();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "4":
                await usuario.updateUserRol();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "0":
                console.log("Saliendo del módulo de Usuarios");
                break;
              default:
                console.log("Opción no válida. Por favor, intente de nuevo.");
                break;
            }
          } while (choice3 !== "0");
          break; 
        case "3":
          const boleteria = new Boletos();
          do{
            console.log(`
      BOLETOS MODULE
      
      1. Comprar boletas
      2. Boletos De Usuario
      0. Salir
      
                  `);
            let crud;
            console.log("Ingrese una opccion:"  )
            crud = await this.getInput();
            switch(crud) {
              case "1":
                await boleteria.buyTickets();
                break;
              case "2":
                await boleteria.findTicketsByUser();
                break;
              case "0":
                console.log("Saliendo del módulo de Boletos");
                break;
              default:
                console.log("Opción no válida. Por favor, intente de nuevo.");
                break;
            }
            break;  
          } while (crud !== "0")
        case "4":
          const pagos = new Pagos();
          do{
            console.log(`
      PAGOS MODULE
      
      1. Pagar boletas
      2. Pagos pendientes de Usuario
      3. Pagos realizados de Usuarios
      0. Salir
      
                  `);
            let crud;
            console.log("Ingrese una opccion:"  )
            crud = await this.getInput();
            switch(crud) {
              case "1":
                await pagos.paymentManagement();
                break;
              case "2":
                await pagos.uncompletedPayments();
                break;
              case "3":
                await pagos.completedPayments();
                break;
              case "0":
                  console.log("Saliendo del módulo de Pagos");
                  break;
              default:
                console.log("Opción no válida. Por favor, intente de nuevo.");
                break;
            }
            break; 
          } while (crud !== "0")
          break;
        case "0":
          console.log("Saliendo de CineCampus");
          this.rl.close();
          break;
        default:
          console.log("Opción no válida. Por favor, intente de nuevo.");
      }
    } while (choice !== "0");
  }
}
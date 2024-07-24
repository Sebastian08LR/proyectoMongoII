import readline from 'readline';
import Connection from '../../db/connect/connect.js';
import { Boletos } from './boletos.js';
import { Pelicula } from './peliculas.js';
export default class Menu {
  constructor(username, password) {
    this.options = [
      "Salas",
      "Peliculas",
      "Funciones",
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

  getInput() {
    return new Promise((resolve) => {
      this.rl.question('Select an option: ', (choice) => {
        resolve(choice);
      });
    });
  }

  async run() {
    let choice;
    do {
      this.displayMenu();
      choice = await this.getInput();
      
      switch(choice) {
        case "1":
          break;
        case "2":
          const peliculas = new Pelicula();
          console.log(`
            PELICULAS MODULE
            
            1. Listar Peliculas
            0. salir
            
                        `);

            let choice;
            choice = await this.getInput();
            switch(choice) {
              case "1":
                await peliculas.getMovieNames();
                console.log("press any key to continue")
                await this.getInput();
                break;
              case "0":
                  break;
              default:
                  console.log("Opción no válida. Por favor, intente de nuevo.");
                  break;

            }
          break;
        case "3":
          console.log("Has seleccionado Funciones");
          break;
        case "4":
          console.log("Has seleccionado Usuarios");
          break;
        case "5":
            const collections = new Boletos();
            console.log(`
    BOLETOS MODULE
    
    1. Comprar boletas
    2. Cancelar compra
    
                `);
            let crud;
            crud = await this.getInput();
            switch(crud) {
                case "1":
                    await collections.GetAllCollections();
                    break;
                case "2":
                    await collections.CancelTickets();
                    break;
                default:
                    console.log("Opción no válida. Por favor, intente de nuevo.");
                    break;
            }
        case "6":
          console.log("Has seleccionado Pagos");
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
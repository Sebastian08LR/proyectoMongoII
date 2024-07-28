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
          break;
        case "2": 
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
          break;  // Añade este break para salir del case "2" del switch principal
        case "3":
          console.log("Has seleccionado Funciones");
          break;
        case "4":
          console.log("Has seleccionado Usuarios");
          break;
        case "5":
          const boleteria = new Boletos();
          console.log(`
    BOLETOS MODULE
    
    1. Comprar boletas
    2. Cancelar compra
    
                `);
          let crud;
          console.log("Ingrese una opccion:"  )
          crud = await this.getInput();
          switch(crud) {
            case "1":
              await boleteria.buyTickets();
              break;
            case "2":
              await boleteria.CancelTickets();
              break;
            default:
              console.log("Opción no válida. Por favor, intente de nuevo.");
              break;
          }
          break;  // Añade este break para salir del case "5" del switch principal
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
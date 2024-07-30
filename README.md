### Proyecto CineCampus

###### Desarrollador: Juan Sebastian Latorre Ruiz

---


CineCampus es una aplicación web para la gestión de una experiencia cinematográfica completa. Permite a los usuarios seleccionar películas, comprar boletos, asignar asientos y disfrutar de opciones de descuento para tarjetas VIP.

### Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Sebastian08LR/proyectoMongoII
   ```

2. **Instalar las dependencias**:

   Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta:

   ```bash
   npm i
   ```

### Uso

Ubíquese en el archivo main y descomente la función que quiera realizar, cambie los datos requeridos si es posible o deje los de ejemplo.

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
   npm run dev
```

Esto iniciará el servidor en `main.js` y ejecutara la función descomentada.

### Configuración

La aplicación utiliza [dotenv](https://www.npmjs.com/package/dotenv) para gestionar variables de entorno. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno que se encuentran en el archivo `.envTemplate` para la correcta función de la base de datos y la conexión. Por ejemplo:

```plaintext
MONGO_URI = 'mongodb://monorail.proxy.rlwy.net:55970/'
DB_NAME = 'cineCampus'

MONGO_USER = 'mongo'
MONGO_PASSWORD = 'xabdHniAGwYDdcTIFVTBJDVtXaKRlMrP'
```

### Dependencias

- **dotenv**: `^16.4.5`
  - Utilizado para gestionar variables de entorno de manera sencilla y segura.
  - [Documentación de dotenv](https://www.npmjs.com/package/dotenv)

- **mongodb**: `^6.8.0`
  - Proporciona una interfaz para interactuar con la base de datos MongoDB.
  - [Documentación de mongodb](https://www.npmjs.com/package/mongodb)
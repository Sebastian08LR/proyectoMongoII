### Proyecto CineCampus

###### Desarrollador: Juan Sebastian Latorre Ruiz

---

# CineCampus GUIA DE USO

Este proyecto es una aplicación web de gestión de reservas de cine que utiliza Vue.js en el frontend y Express.js en el backend. Está dividido en dos partes: el frontend para la interfaz de usuario y el backend para la API y el servidor.

## Estructura del Proyecto

- **Frontend**: Desarrollado con Vue.js y Vite.
- **Backend**: Desarrollado con Express.js y APIs para gestionar los datos.

## Tecnologías Utilizadas

### Frontend

- **Vue.js**: ^3.4.35
- **Vue Router**: ^4.4.3
- **Pinia**: ^2.2.1
- **Swiper**: ^11.1.9
- **Vite**: ^5.4.0

### Backend

- **Express.js**: ^4.19.2
- **MongoDB/Mongoose**: ^6.8.0 / ^8.5.1
- **Express Validator**: ^7.1.0
- **CORS**: ^2.8.5
- **dotenv**: ^16.4.5

## Configuración del Proyecto

### Frontend

1. Clona el repositorio e ingresa a la carpeta del frontend:

   ```bash
   cd front-end/vue
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Para ejecutar el entorno de desarrollo:

   ```bash
   npm run vite
   ```

4. Para crear una versión de producción:

   ```bash
   npm run build
   ```

5. Para previsualizar la versión de producción:

   ```bash
   npm run preview
   ```

### Backend

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura las variables de entorno en un archivo `.env`:

   ```
   MONGO_URI = 'mongodb://junction.proxy.rlwy.net:47682'
   DB_NAME = ''

   MONGO_USER = 'Sebastian'
   MONGO_PASSWORD = '123'

   PORT='3001' 
   HOST="localhost"
   EXPRESS_STATIC="public"
   ```

3. Para ejecutar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

## Uso de la Aplicación

1. **Inicio**: El frontend proporciona una interfaz para que los usuarios seleccionen y reserven asientos en el cine.
2. **Gestión de Reservas**: A través de la API, puedes gestionar las reservas, consultar funciones y asientos disponibles.
3. **Base de Datos**: Se utiliza MongoDB para almacenar la información de las funciones, asientos y reservas.

## Estructura de Carpetas

- **frontend/**: Contiene el código Vue.js y la configuración de Vite.
- **backend/**: Contiene el servidor Express.js y la configuración de la API.

## Scripts Útiles

- **Frontend**:
  - `npm run vite`: Ejecuta el servidor de desarrollo.

- **Backend**:
  - `npm run dev`: Ejecuta el servidor Express en modo desarrollo.

Este README proporciona una guía básica sobre cómo configurar y usar la aplicación, además de detallar las tecnologías y scripts disponibles en ambos entornos, frontend y backend.
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
MONGO_URI = 'mongodb://viaduct.proxy.rlwy.net:58329/'
DB_NAME = 'cineCampus'

MONGO_USER = 'Carlos'
MONGO_PASSWORD = '789456'
```

### Dependencias

- **dotenv**: `^16.4.5`
  - Utilizado para gestionar variables de entorno de manera sencilla y segura.
  - [Documentación de dotenv](https://www.npmjs.com/package/dotenv)

- **mongodb**: `^6.8.0`
  - Proporciona una interfaz para interactuar con la base de datos MongoDB.
  - [Documentación de mongodb](https://www.npmjs.com/package/mongodb)


### Roles y Usuarios

**ROLES**
   ```javaScript
   db.createRole(
   {
      role: "adminCineCampus",
      privileges: [
         {
         resource: { db: "", collection: "" },
         actions: ["find", "insert", "update", "remove"]
         },
         {
         resource: { db: "", collection: "system.users" },
         actions: ["find", "insert", "update", "remove"]
         },
         {
         resource: { db: "", collection: "system.roles" },
         actions: ["find", "insert", "update", "remove"]
         },
         {
         resource: { db: "", collection: "" },
         actions: ["createRole", "dropRole", "grantRole", "revokeRole", "createUser", "dropUser", "createDatabase", "find", "createCollection", "dropCollection", "dbStats", "collStats", "listCollections" ]
         }
      ],
      roles: []
   }
   )
   ```
   **Roles de la base de datos**
   - adminCineCampus
   - usuarioStandard

**USUARIOS**
   ```JavaScript
      db.createUser(
   {
      user: "UserName",
      pwd: "789456",
      roles: [
         { role: "adminCineCampus", db: "" }
      ]
   }
   )
   ```

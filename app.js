const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const appPelicula = require('./server/router/peliculas.routes');
app.get('/movies', function (req, res) {
    res.sendFile(path.join(__dirname, `${process.env.EXPRESS_STATIC}`, 'views', 'movies.html'));
})
app.use("/movies", appPelicula); // Si prefieres puedes usar app.use('/api', appPelicula) para definir un prefijo

// Maneja todas las rutas con el archivo 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

const { ObjectId } = require('mongodb');
const { query, body, param, validationResult } = require('express-validator');
const Pelicula = require('../module/peliculas');
const Boleto = require('../module/boletos'); 
const express = require('express');
const appPelicula = express.Router();

appPelicula.get('/api/v1', async (req, res) => {
    let obj = new Pelicula;
    res.send(await obj.getMovieNames())
})

appPelicula.get('/api/v2', [query("id").notEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Envie el _id de una pelicula existente" });
    }
    let obj = new Pelicula;
    res.send(await obj.getMovieInfo(req.query))
})

appPelicula.get('/api/v3', [query("movieId").notEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Envie el _id de una pelicula existente" });
    }
    let obj = new Pelicula;
    res.send(await obj.getMovieProyections(req.query))
})

appPelicula.get('/api/v4', [
    query("movieId").notEmpty().withMessage("El ID de la película es requerido"),
    query("functionId").notEmpty().withMessage("El ID de la función es requerido")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Pelicula();
    res.send(await obj.getMovieAvaliableSeats(req.query));
});

appPelicula.get('/api/v5', async (req, res) => {
    let obj = new Pelicula;
    res.send(await obj.getMoviesComingSoon())
})

appPelicula.get('api/v6',[
    query("movieId").notEmpty().withMessage("El ID de la película es requerido"),
    query("functionId").notEmpty().withMessage("El ID de la función es requerido"),
    query("seats").notEmpty().withMessage("el array con los asientos o asiento es requerido")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let obj = new Boleto();
    res.send(await obj.buyTickets(req.query));
}
)
module.exports = appPelicula;
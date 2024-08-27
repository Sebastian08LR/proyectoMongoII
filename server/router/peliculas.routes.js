const { ObjectId } = require('mongodb');
const { query, body, param, validationResult } = require('express-validator');
const Pelicula = require('../module/peliculas');
const Boleto = require('../module/boletos'); 
const express = require('express');
const appPelicula = express.Router();
let obj2 = new Boleto;

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

appPelicula.get('/api/v4/buyTickets', [
    query("movieId").notEmpty().withMessage("El ID de la película es requerido"),
    query("projectionId").notEmpty().withMessage("El ID de la proyección es requerido"),
    query("seats")
        .custom(value => {
            // Convertir la cadena en un array
            const seats = value.split(',');
            // Validar que cada asiento tenga un formato válido (ej: "C2")
            return seats.every(seat => /^[A-F][0-9]+$/.test(seat));
        })
        .withMessage("Formato inválido para los asientos"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let objBoleto = new Boleto;
    try {
        res.send(await objBoleto.buyTickets(req.query));
    } catch (error) {
        res.status(500).json({ error: "Error al comprar los boletos", details: error.message });
    }
});
module.exports = appPelicula;
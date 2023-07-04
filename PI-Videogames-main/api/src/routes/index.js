require('dotenv').config
const { Router } = require('express');
const router = Router();
const path = require('path')
const express = require('express')

//Importo todos los routers;
// const videogames = require('./videogames');
const genres = require('./genres');
const videogames = require('./videogames')
const imagePath = path.join(__dirname, 'uploads');
router.use('/uploads', express.static(imagePath));
//Configuro todos los routers
router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;
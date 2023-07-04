require('dotenv').config();
const axios = require('axios')
const {API_KEY} = process.env
const { Router } = require('express')
const router = Router()
const { Genre } = require('../db')

router.get('/', async (req, res) => {
    try {
        const genresDb = await Genre.findAll()
        if (genresDb.length) return res.json(genresDb)

        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = response.data.results.map(result => { return { id: result.id, name: result.name, image_background: result.image_background } })
        genres.forEach(async (genre) => {
            await Genre.findOrCreate({
                where: genre
            })
        })
        res.status(201)
        res.json(genres)
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
})

module.exports = router
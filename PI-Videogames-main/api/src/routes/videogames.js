require('dotenv').config();
const { API_KEY, API_HOST } = process.env;
const { Router } = require('express');
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/routes/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
const router = Router();
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  let { name, page } = req.query;
  if (name) {
    name = name.toLowerCase();
  }
  try {
    if (name) {
      let videogamesDb = [];
      if (!page) {
        videogamesDb = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: Genre,
        });
      }

      if (videogamesDb.length > 0) {
        videogamesDb = videogamesDb.map((el) => ({
          ...el.toJSON(),
          genres: el.genres.map((g) => g.name),
        }));
      }

      let response = {};
      if (!page) {
        response = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        );
      } else {
        response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&search=${name}`
        );
      }
      const gamesApi = response.data.results.map((game) => {
        let { id, name, description, platforms, released: releaseDate, rating, genres, background_image } = game;
        genres = genres.map((genre) => genre.name);
        platforms = platforms.map((platform) => platform.platform.name).join(', ');
        return { id, name, description, platforms, releaseDate, rating, genres, background_image };
      });
      const videogames = videogamesDb.concat(gamesApi);
      res.json(videogames);
    } else {
      if (page) {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        const gamesApi = response.data.results.map((game) => {
          let { id, name, description, platforms, released: releaseDate, rating, genres, background_image } = game;
          genres = genres.map((genre) => genre.name);
          platforms = platforms.map((platform) => platform.platform.name).join(', ');
          return { id, name, description, platforms, releaseDate, rating, genres, background_image };
        });
        res.json(gamesApi);
      } else {
        let videogamesDb = await Videogame.findAll({
          include: Genre,
        });
        if (videogamesDb.length > 0) {
          videogamesDb = videogamesDb.map((el) => ({
            ...el.toJSON(),
            genres: el.genres.map((g) => g.name),
          }));
        }
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const gamesApi = response.data.results.map((game) => {
          let { id, name, description, platforms, released: releaseDate, rating, genres, background_image } = game;
          genres = genres.map((genre) => genre.name);
          platforms = platforms.map((platform) => platform.platform.name).join(', ');
          return { id, name, description, platforms, releaseDate, rating, genres, background_image };
        });
        res.json(videogamesDb.concat(gamesApi));
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;

  if (idVideogame.includes('-')) {
    try {
      const videogameDb = await Videogame.findOne({
        where: {
          id: idVideogame,
        },
        include: Genre,
      });
      if (videogameDb) {
        const { id, name, background_image, description, releaseDate, rating, platforms, genres } = videogameDb.toJSON();
        const genresArray = genres.map((g) => ({ id: g.id, name: g.name }));
        res.json({
          id,
          name,
          background_image,
          description,
          releaseDate,
          rating,
          platforms,
          genres: genresArray,
        });
      } else {
        res.status(404).json({ error: 'Videogame not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
      const { id, name, background_image, genres, description, released: releaseDate, rating, platforms } =
        response.data;
      const genresArray = genres.map((g) => ({ id: g.id, name: g.name }));
      const platformsList = platforms.map((p) => p.platform.name).join(', ');
      res.json({
        id,
        name,
        background_image,
        genres: genresArray,
        description,
        releaseDate,
        rating,
        platforms: platformsList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
});

router.post('/', upload.single('background_image'), async (req, res) => {
  const { name, description, releaseDate, rating, genres, platforms } = req.body;

  try {
    const gameCreated = await Videogame.create({
      name,
      description,
      releaseDate,
      rating,
      platforms,
      background_image: `http://${API_HOST}/uploads/${req.file.filename}`,
    });

    for (const genreObj of genres) {
      const { name } = genreObj;
      const [genre] = await Genre.findOrCreate({ where: { name } });
      await gameCreated.addGenre(genre);
    }

    res.send('Created Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;


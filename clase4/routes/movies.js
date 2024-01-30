import { Router } from "express";
import { validateMovie, partialValidation } from '../schemas/movie.js';
import { createRequire } from 'node:module';
import { MovieModel } from "../Models/movie.js";

const require = createRequire(import.meta.url);
export const moviesRoute = Router();

moviesRoute.get('/', async (req, res) => {
  const { genre } = req.query;
  const movies = await MovieModel.getAll({ genre });
  res.json(movies);
});

moviesRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getId({ id: id });
  res.json(movie);
});

moviesRoute.post('/', async (req, res) => {
  const validate = validateMovie(req.body);
  if (validate.error) {
    res.status(400).json({ error: JSON.parse(validate.error.message) });
  };
  const newMovie = await MovieModel.create({ input: validate.data });
  res.status(201).json(newMovie);
});

moviesRoute.patch('/:id', async (req, res) => {
  const result = partialValidation(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const { id } = req.params;
  const updateMovie = await MovieModel.update({ id: id, input: result.data });
  return res.json(updateMovie);
});

moviesRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.delete({ id });
  if (movie) {
    return res.json({ message: "Movie deleted." });
  } else {
    return res.json({ message: "Movie not exist." });
  };
});



import express, { json } from 'express';
import { randomUUID } from 'node:crypto';
import { validateMovie, partialValidation } from './schemas/movie.js';
// forma futura
// import movies from './movies.json' with{ type: 'json' };

// forma creando un require o puedes usar el fs con readFile
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const movies = require('./movies.json');

const app = express();
const PORT = process.env.PORT ?? 3000;
const ACCEPTED_ORIGIN = [
  'http://localhost:8080',
  'http://movies.com'
]
app.disable('x-powered-by');

app.use(json());

app.get('/movies', (req, res) => {
  //Arreglo de problema con el cors
  const origin = req.header('origin');
  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  };

  const { genre } = req.query;
  if (genre) {
    const filterMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
    res.json(filterMovies);
  };
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post('/movies', (req, res) => {
  const validate = validateMovie(req.body);
  if (validate.error) {
    res.status(400).json({ error: JSON.parse(validate.error.message) });
  };

  const newMovie = {
    id: randomUUID(),
    ...validate.data
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const result = partialValidation(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  };

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.delete('movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = findIndex(movie => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found." });
  };

  movies.splice(movieIndex, 1);
  return res.json({ message: "Movie deleted." });
});

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  };
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listo en http://localhost:${PORT}`);
});

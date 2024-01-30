import express, { json } from 'express';
import { moviesRoute } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware);

app.use('/movies', moviesRoute);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server listo en http://localhost:${PORT}`);
});

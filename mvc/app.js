import express, { json } from "express";
import { moviesRouter } from './Routes/moviesRouter.js';
import { corsMiddleware } from './Middlewares/cors.js';

const app = express();
app.use(json());
// app.use(corsMiddleware);
app.disable('x-powered-by');

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});

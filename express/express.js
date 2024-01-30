const express = require('express');
const ditto = require('./pokemon/ditto.json');
const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
// mi propio middleware
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next();
//   if (req.headers['Content-Type'] !== 'application/json') return next();
//   let body = '';
//   req.on('data', chunk => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     const data = JSON.parse(body);
//     req.body = data;
//     next();
//   });

// });

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi Pagina</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon/add', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('<h1>Pagina no encontrada.</h1>')
})

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});

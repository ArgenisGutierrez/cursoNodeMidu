const http = require('node:http');
const fs = require('node:fs');
const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('Bienvenido a mi pagina de inicio');
  } else if (req.url === '/imagen') {
    fs.readFile('./imagen.png', (err, img) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>500 Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'image/png');
        res.end(img);
      }
    });
  };
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log(`Servidor listo en http://localhost:3000`);
});

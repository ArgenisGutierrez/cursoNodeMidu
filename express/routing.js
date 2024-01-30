const http = require('node:http');
const dittoJson = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>Pagina de inicio</h1>');
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json;');
          res.end(JSON.stringify(dittoJson));
          break;

        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>Error 404</h1>');
          break;
      }

      break;
    case 'POST':
      switch (url) {
        case '/pokemon/add':
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
          });
          break;

        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>Error 404</h1>');
          break;
      }
      break
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log('Server en http://localhost:3000');
})

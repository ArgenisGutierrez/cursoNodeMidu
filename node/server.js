const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('request recibida');
  res.end('hola');
})

server.listen(0, () => {
  console.log(`Server listo en http://localhost:${server.address().port}`);
})

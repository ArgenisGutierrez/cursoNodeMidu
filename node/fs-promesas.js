const fs = require('node:fs/promises');

console.log('leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf8')
  .then(text => {
    console.log(text);
  });

console.log('leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf8')
  .then(text => {
    console.log(text);
  });

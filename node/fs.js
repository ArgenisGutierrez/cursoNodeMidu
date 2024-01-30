const fs = require('node:fs');

// const {promisify} = require('node:util');  <-- implementar promesas en modulos que no tienen
// const readFilePromise = promisify(fs.readFile);
// fs.readFilePromise('./archivo.txt','utf8')
// .then(text=>{
//     console.log(text)
//   });

console.log('leyendo el primer archivo');
fs.readFile('./archivo.txt','utf8',(err,text)=>{
  console.log(text);
});

console.log('leyendo el segundo archivo');
fs.readFile('./archivo2.txt','utf8',(err,text)=>{
  console.log(text);
});

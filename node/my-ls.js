const fs = require('node:fs');

fs.readdir('.',(err,files)=>{
  if (err) {
    console.error('Error al cargar los archivos');
    return;
  }

  files.forEach(file=>{
    console.log(file);
  });
});

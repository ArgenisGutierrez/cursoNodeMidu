console.log(process.argv)

//control de salida del proceso 0 bien 1 un error
// process.exit(1)

// eventos del proceso
process.on('exit',()=>{
  //limpiar los recursos
});

//te da el directorio desde donde se ejecuta el proceso
console.log(process.cwd());

//variables de entorno ARFHEL=hola node process.js
console.log(process.env.ARFHEL)

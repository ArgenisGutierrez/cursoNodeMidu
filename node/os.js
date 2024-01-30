const os = require('node:os');
console.log('Info de la maquina');
console.log(os.platform());
console.log('version de so',os.release());
console.log('arquitectura',os.arch());
console.log('cpus',os.cpus());
console.log('momoria libre',os.freemem())
console.log('memoria total',os.totalmem()/102);
console.log('uptime',os.uptime()/60/60);

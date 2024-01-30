const net = require('node:net');

function findAvailablePort(dirPort) {
  return new Promise((resolve, reject) => {
    resolve(0);
  });
}

module.exports = {
  findAvailablePort,
}

const fs = require('node:fs/promises');
const path = require('node:path');
const picocolors = require('picocolors');

const folder = process.argv[2] ?? '.';

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(picocolors.red(`No se pudo leer el directorio ${folder}`));
    process.exit(1);
  };

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error('Error al cargar los stats');
      process.exit(1);
    }
    const fileSize = stats.size;
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileModified = stats.mtime.toLocaleString();

    return `${picocolors.cyan(fileType)} ${picocolors.blue(file.padEnd(30))} ${picocolors.green(fileSize.toString().padStart(10))} ${picocolors.red(fileModified)}`
  });

  const filesInfo = await Promise.all(filesPromises);

  filesInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder);

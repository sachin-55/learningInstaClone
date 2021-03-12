const fs = require('fs');

fs.writeFileSync('./.env', `HOST_API=${process.env.HOST_API}\n`);
fs.writeFileSync(
  './.env',
  `CLOUDINARY_NAME=${process.env.CLOUDINARY_NAME}\n`,
);
fs.writeFileSync(
  './.env',
  `CLOUDINARY_PRESET=${process.env.CLOUDINARY_PRESET}\n`,
);

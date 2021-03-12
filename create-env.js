const fs = require('fs');

fs.writeFileSync('./.env', `HOST_API=${process.env.HOST_API}`);
fs.writeFileSync(
  './.env',
  `CLOUDINARY_NAME=${process.env.CLOUDINARY_NAME}`,
);
fs.writeFileSync(
  './.env',
  `CLOUDINARY_PRESET=${process.env.CLOUDINARY_PRESET}`,
);

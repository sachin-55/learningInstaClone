const fs = require('fs');

fs.writeFileSync(
  './.env',
  `HOST_API_URL=${process.env.HOST_API_URL}\n`,
);

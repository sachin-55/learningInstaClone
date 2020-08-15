const fs = require('fs');

fs.writeFileSync('./.env', `HOST_API=${process.env.HOST_API}`);

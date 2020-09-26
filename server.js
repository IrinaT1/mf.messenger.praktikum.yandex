import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./dist'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

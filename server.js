const express = require('express');

const app = express();
const PORT = 4000;

//app.use(express.static('./static'));

app.use(express.static('./public'));
app.use('/src', express.static(`${__dirname}/src/`));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

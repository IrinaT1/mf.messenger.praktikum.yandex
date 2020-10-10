const express = require('express');

console.log(`process.env.PORT = ${process.env.PORT}`);

const app = express();
app.use(express.static('./dist'));

app.listen(process.env.PORT || 4000, function () {
    console.log(`Example app listening on port ${process.env.PORT || 4000}!`);
});

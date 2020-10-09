import express, { static } from 'express';

const app = express();
const PORT = 4000;

app.use(static('./dist'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

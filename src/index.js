const express = require('express');
const cors = require('cors');
const { wordsRouter } = require('./routers/words');

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.use('/words', wordsRouter);

app.get('/*', (req, res) => res.status(404).send('Not Found'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routers/index');
const { setStartTime } = require('./middleware/useTime');
const { setResponse } = require('./middleware/useResponse');
const { useEncoding } = require('./middleware/useEncoding');

const app = express();
app.use(cors());
app.use(setStartTime);
app.use(useEncoding)
const port = 3000;

app.get('/', (_req, res) => res.json({ message: 'Wrong Route, Buddy!, go to /api' }));

app.use('/api', indexRouter);

app.use(setResponse)

app.get('/*', (_req, res) => res.status(404).json({ err: 'Not Found' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const indexRouter = require('./routers/index');
const port = process.env.PORT || 3000;

const { setStartTime } = require('./middleware/useTime');
const { setResponse } = require('./middleware/useResponse');
const { useEncoding } = require('./middleware/useEncoding');

const app = express();
app.use(cors());
app.use(setStartTime);
app.use(useEncoding)

const server = require('http').createServer(app);
// const io = require('socket.io')(server, { cors: { origin: '*' } });

app.get('/', (_req, res) => res.json({ message: 'Wrong Route, Buddy!, go to /api' }));

app.use('/api', indexRouter);

app.use(setResponse)

app.get('/*', (_req, res) => res.status(404).json({ err: 'Not Found' }));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
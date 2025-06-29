import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes/router.js';

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Inincio do back')
})

server.use('/api', router);

export { server }
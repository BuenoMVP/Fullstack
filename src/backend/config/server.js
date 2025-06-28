import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Pagina inicial da api')
})

export { server }
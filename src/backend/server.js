import { createServer } from 'http';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.VITE_BACKEND_PORT || 8080;

const server = createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write("Pagina inicial do backend");
    res.end();
})

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})
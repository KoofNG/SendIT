import { http } from 'http';
import { dotEnv } from 'dotenv';

const env = dotEnv.config();
const server = http.createServer((req,res) => {
    res.end('Server created!');
})

server.listen(process.env.PORT);
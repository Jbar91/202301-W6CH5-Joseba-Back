import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 2332;

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log('Te cucho mi loco en el ' + PORT);
});

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const configs = {
  caminho: 'build', //Aqui será definido a pasta de saída onde contém o index.html e os outros arquivos.
  forcarHTTPS: false, //Defina para true se desejar que o redirecionamento para HTTPS seja forçado (é necessário certificado SSL ativo)
  port: process.env.PORT || 3000,
};

const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static(configs.caminho)); //Serve os outros arquivos, como CSSs, Javascripts, Imagens etc.
io.on('connection', (socket) => {
  socket.broadcast.on('sendMessage enter', function (msg) {
    io.emit('sendMessage client', msg);
    console.log(msg);
  });
  socket.broadcast.on('sendMessage server', function (msg) {
    io.emit('sendMessage client', msg);
    console.log(msg);
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

const getApiAndEmit = 'TODO';

server.listen(configs.port, () =>
  console.log(`Listening on port ${configs.port}`),
);

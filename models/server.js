const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('./socket');

class Server {
    constructor() { 
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server);
    }

    middlewares() {
        //Desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configuracionSockets() {
        new Socket(this.io);
    }

    execute() {
        //Inicializar middlewares
        this.middlewares();

        //Configurar sockets
        this.configuracionSockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

 module.exports = Server;
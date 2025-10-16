const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('./socket');

class Server {
    constructor() { 
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true
            },
            allowEIO3: true,
            transports: ['websocket', 'polling']
        });
    }

    middlewares() {
        //Desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        // Health check route for Railway
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        // Basic route
        this.app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });
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
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`Socket.io configured with CORS: *`);
        });
    }
}

 module.exports = Server;
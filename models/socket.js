class Socket {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', (socket) => { 
            console.log('Cliente conectado:', socket.id);
            
            socket.on('mensaje-cliente', (data) => {
                console.log('Mensaje recibido:', data);
                
                this.io.emit('mensaje-from-server', {
                    msg: `${data.message}`,
                    fecha: new Date()
                });
            });

            socket.on('disconnect', () => {
                console.log('Cliente desconectado:', socket.id);
            });
        });
    }
}


module.exports = Socket;
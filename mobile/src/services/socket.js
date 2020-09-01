import socketio from 'socket.io-client'

const socket = socketio('http://10.1.1.104:3333', {
    autoConnect: false
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction)
}

socket.on('connect', () => {
    console.log('Socket connected')
})

socket.on('connect_error', error => {
    console.log(error)
})

function connect(latitude, longitude, techs){
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();
}

function disconnect(){
    if(socket.connected){
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}
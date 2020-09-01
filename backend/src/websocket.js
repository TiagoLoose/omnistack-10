const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io;
const connections = []

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id)
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs)
        })
    })

    console.log('Socket on')
}

exports.findConnections = function (coordinates, techs){
    return connections.filter( conn => {
        return calculateDistance(coordinates, conn.coordinates) < 10 &&
                techs.some( item => conn.techs.includes(item) )
     })
}

exports.sendMessage = function(to, message, data){
    to.forEach( conn => {
        io.to(conn.id).emit(message, data);
    })
}
const App = require("express");
const cors = require("cors");
const Http = require("http").createServer(App);
const SocketIO = require("socket.io")(Http, {
    cors: true,
    origins: ["*"]
});

const PORT = process.env.PORT || 3000;

Http.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
});


SocketIO.on("connection", socket => {
    console.log("a new user connected");
    socket.on('joinGame', ({gameId}) => {
        socket.join(gameId);
        console.log('player' + gameId + ' ' + 'joined the room');
        socket.to(gameId).emit('joinGame', 'A new player joined');
    });
});

/*---------------- Previous try out with gameCanvas

let position = {
    x: 200,
    y: 200
};

SocketIO.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch (data) {
            case "left":
                position.x -= 5;
                SocketIO.emit("position", position);
                break;
            case "right":
                position.x += 5;
                SocketIO.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                SocketIO.emit("position", position);
                break;
            case "down":
                position.y += 5;
                SocketIO.emit("position", position);
                break;
        }
    });
});
*/
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
function generate(matLen, gr, grEat, pred, worm, hole, hum) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < worm; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < hole; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < hum; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 228
        }
    }
    return matrix
}

matrix = generate(200, 67, 45, 15, 22, 100, 45)

io.sockets.emit("Send matrix", matrix)

grassArr = []
grassEaterArr = []
PredatorArr = []
WormArr = []
HoleArr = []
HumanArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Worm = require("./worm")
Human = require("./human")
Hole = require("./hole")

function fillMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Worm(x, y)
                WormArr.push(gr)
            }
            else if (matrix[y][x] == 5) {
                let gr = new Hole(x, y)
                HoleArr.push(gr)
            }
            else if (matrix[y][x] == 228) {
                let gr = new Human(x, y)
                HumanArr.push(gr)
            }
        }
    }

    io.sockets.emit("Send matrix", matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].eat()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].eat()
    }
    for (let i in WormArr) {
        WormArr[i].mul()
    }
    for (let i in HumanArr) {
        HumanArr[i].move()
    }
    io.sockets.emit("Send matrix",matrix)
}
setInterval(game,1000)
io.on("connection", function(socket){
    fillMatrix(matrix)
})
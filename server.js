weath = "summer"
matrix = []
grassArr = []
grassEaterArr = []
PredatorArr = []
WormArr = []
HoleArr = []
HumanArr = []

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

matrix = generate(80,20,20,20,20,5,10)

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit("weather", weath)
}
setInterval(weather, 20000)

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Worm = require("./worm")
Human = require("./human")
Hole = require("./hole")

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

}

function game() {
    if (weather !== "winter") {
        for (var i in grassArr) {
            grassArr[i].eat()
        }
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
    sendData = {
        matrix: matrix,
        grassValue: grassArr.length,
        grassEaterValue: grassEaterArr.length,
        predatorValue: PredatorArr.length,
        wormValue: WormArr.length,
        humanValue: HumanArr.length,
        holeValue: HoleArr.length,
        weather: weath
    }

    io.sockets.emit("data", sendData)
}
setInterval(game, 1000)
io.on("connection", function (socket) {
    fillMatrix(matrix)
    socket.on("kill", kill)
    socket.on("regen", regen)
})
function kill() {
    grassArr = []
    grassEaterArr = []
    PredatorArr = []
    WormArr = []
    HumanArr = []
    HoleArr = []
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = []
        for (let j = 0; j < matrix.length; j++) {
            matrix[i][j] = 0
        }
    }
}
function regen() {
    matrix = generate(80,20,20,20,20,5,10)
}


//stats
let stats = {}

setInterval(function(){
    stats.grass = grassArr.length
    stats.grassEater = grassEaterArr.length
    stats.predator = PredatorArr.length
    stats.worm = WormArr.length
    stats.human = HumanArr.length
    fs.writeFile("statistics.json", JSON.stringify(stats), function(){})
}, 60000);
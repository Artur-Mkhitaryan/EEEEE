var socket = io();
side = 5


function setup() {
    createCanvas(200 * side,200 * side);
    background('#ffffff');

}


function drav(matrix) {
    noStroke()
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#ffffff");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#ff924f");
            }
            else if (matrix[y][x] == 5) {
                fill("#000000");
            }
            else if (matrix[y][x] == 228) {
                fill(Math.floor(Math.random()* 255),Math.floor(Math.random()* 255),Math.floor(Math.random()* 255));
            }

            rect(x * side, y * side, side, side);
        }
    }

}
setInterval(
    function(){
        socket.on("Send matrix",drav)
    },1000
)
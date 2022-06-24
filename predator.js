let Creature = require("./creature")

module.exports = class Predator extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 29;
    }
    getNewCoordinates() {
        return super.getNewCoordinates;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY);
            PredatorArr.push(newPredator);
            this.energy = 29
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
        var emptyCells5 = this.chooseCell(5);
        var newCell5 = emptyCells5[Math.round(Math.random() * emptyCells5.length)];
        if (newCell5 && this.energy >= 0) {
            this.die();
        } else
            if (newCell && this.energy >= 0) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
            } else {
                this.die()
            }
    }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
        var emptyCells2 = this.chooseCell(4);
        var newCell2 = emptyCells2[Math.round(Math.random() * emptyCells2.length)];
        if (newCell) {
            this.energy += 2
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (newCell2) {
            this.energy++
            var newX = newCell2[0];
            var newY = newCell2[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in WormArr) {
                if (newX == WormArr[i].x && newY == WormArr[i].y) {
                    WormArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }
}

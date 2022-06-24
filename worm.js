let Creature = require("./creature")

module.exports = class Worm extends Creature {
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

        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newWorm = new Worm(newX, newY);
            WormArr.push(newWorm);
            this.multiply = 0
        } else {
            this.move()
        }
    }

    move() {
        this.multiply++
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];
        var emptyCells5 = this.chooseCell(5);
        var newCell5 = emptyCells5[Math.round(Math.random() * emptyCells5.length)];
        if (newCell5) {
            this.die();
        }
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in WormArr) {
            if (this.x == WormArr[i].x && this.y == WormArr[i].y) {
                WormArr.splice(i, 1);
                break;
            }
        }
    }
}
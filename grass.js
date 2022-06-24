let Creature = require("./creature")

module.exports = class Grass extends Creature {
        chooseCell(character) {
        var found = [];
        // console.log(this.directions);
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
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 14) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
    eat() {
        this.multiply++;
        var emptyCells = this.chooseCell(4);
        var newCell = emptyCells[Math.round(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
            for (var i in WormArr) {
                if (newX == WormArr[i].x && newY == WormArr[i].y) {
                    WormArr.splice(i, 1);
                    break;
                }
            }

        }
         else if (!newCell) {
            this.mul()
        }

    }
}

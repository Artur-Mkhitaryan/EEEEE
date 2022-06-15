class Human extends Creature {
    constructor(x, y) {
        super(x, y);
        this.cooldown = 10;
        this.energy = 10;
    }
    chooseCell(character) {
        super.getNewCoordinates()
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

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = random(emptyCells1);
        var emptyCells2 = this.chooseCell(2);
        var newCell2 = random(emptyCells2);
        var emptyCells3 = this.chooseCell(3);
        var newCell3 = random(emptyCells3);
        var emptyCells4 = this.chooseCell(4);
        var newCell4 = random(emptyCells4);
        var emptyCells5 = this.chooseCell(5);
        var newCell5 = random(emptyCells5);

        this.cooldown--
        if (this.energy <= 0){
            this.die();
        } else
        if (newCell3 && this.cooldown <= 0) {
            var newX = newCell3[0];
            var newY = newCell3[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
            this.cooldown = 5;
            this.energy+=2
        } else
            if (newCell2 && this.cooldown <= 0) {
                var newX = newCell2[0];
                var newY = newCell2[1];
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.cooldown = 4;
                this.energy++
            } else
                if (newCell4 && this.cooldown <= 0) {
                    var newX = newCell4[0];
                    var newY = newCell4[1];
                    matrix[newY][newX] = matrix[this.y][this.x]
                    matrix[this.y][this.x] = 0
                    this.x = newX
                    this.y = newY
                    for (var i in WormArr) {
                        if (newX == WormArr[i].x && newY == WormArr[i].y) {
                            WormArr.splice(i, 1);
                            break;
                        }
                    }
                    this.cooldown = 3;
                } else
                    if (newCell1 && this.cooldown <= 0) {
                        var newX = newCell1[0];
                        var newY = newCell1[1];
                        matrix[newY][newX] = matrix[this.y][this.x]
                        matrix[this.y][this.x] = 0
                        this.x = newX
                        this.y = newY
                        for (var i in grassArr) {
                            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                        this.cooldown = 3;
                        this.energy-=2
                    } else
                    if (newCell && this.cooldown <= 0) {
                        var newX = newCell[0];
                        var newY = newCell[1];
                        matrix[newY][newX] = matrix[this.y][this.x]
                        matrix[this.y][this.x] = 0
                        this.x = newX
                        this.y = newY

                        this.cooldown = 1;
                        this.energy
                    }
                    else
                    if (newCell5 && this.cooldown <= 0) {
                        this.die();
                    }
}
    die(){
        matrix[this.y][this.x] = 0
        for (var i in HumanArr) {
            if (this.x == HumanArr[i].x && this.y == HumanArr[i].y) {
                HumanArr.splice(i, 1);
                break;
            }
        }

    }
}

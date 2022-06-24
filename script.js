    var socket = io();
function setup() {
    let weath = "summer"
    let side = 10

    var matrix = []
    let grassValueElement = document.getElementById("grassValue")
    let grassEaterValueElement = document.getElementById("grassEaterValue")
    let predatorValueElement = document.getElementById("predatorValue")
    let wormValueElement = document.getElementById("wormValue")
    let humanValueElement = document.getElementById("humanValue")
    let holeValueElement = document.getElementById("holeValue")
    let weatherElement = document.getElementById("weather")
    let killButtonElement = document.getElementById("killButton")

    socket.on("data", drav)
    socket.on("weather", function (data) {
        weath = data
    })


    function drav(data) {

        matrix = data.matrix
        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#ffffff');
        grassValueElement.innerText = "Խոտը (կանաչ) բազմանում է և ուտում է որդերին։ Հիմա կա " + data.grassValue + " խոտ։"
        grassEaterValueElement.innerText = "Խոտակերը (դեղին) ուտում է խոտ։ Շատ խոտ ուտելիս նա բազմանում է, իսկ երկար ժամանակ խոտ չուտելու դեպքում՝ մահանում է։ Հիմա կա " + data.grassEaterValue + " խոտակեր։"
        predatorValueElement.innerText = "Գիշատիչը (կարմիր) ուտում է խոտակերներին։ Շատ խոտակեր ուտելիս նա բազմանում է, իսկ երկար ժամանակ խոտակեր չուտելու դեպքում՝ մահանում է։ Հիմա կա " + data.predatorValue + " գիշատիչ։"
        wormValueElement.innerText = "Որդ (մարմնագույն) ուղղակի բաղմանում է և որոշների կեր է հանդիսանում։ Հիմա կա " + data.wormValue + " որդ։"
        humanValueElement.innerText = "Մարդ (անընդհատ փոխում է գույնը) գրեթե ոչ մեկից չի մահանում և ոչնչացնում է ամեն ինչ իր ճանապարհին😈: Հիմա կա " + data.humanValue + " մարդ։"
        holeValueElement.innerText = "Փոս (սև) ուղղակի գոյություն ունի և նրա մեջ ընկնում են կենդանիներ և մարդիկ։ Հիմա կա " + data.holeValue + " փոս։"
        if (data.weather == "winter") {
            weatherElement.innerText = "Ձմեռ"
        } else
        if (data.weather == "spring") {
            weatherElement.innerText = "Գարուն"
        } else
        if (data.weather == "summer") {
            weatherElement.innerText = "Ամառ"
        } else
        if (data.weather == "autumn") {
            weatherElement.innerText = "Աշուն"
        }

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 1) {
                    stroke("black")
                    strokeWeight(2)
                    if (weath == "winter") {
                        fill("#ffe985")
                    }
                    else if (weath == "spring") {
                        fill("#89fc72")
                    }
                    else if (weath == "summer") {
                        fill('#2c9117')
                    }
                    if (weath == "autumn") {
                        fill('#f0d656')
                    }
                    // fill("green")
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 0) {
                    noStroke()
                    fill("#ffffff")
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 2) {
                    stroke("black")
                    strokeWeight(2)
                    fill("#ffff00")
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 3) {
                    stroke("black")
                    strokeWeight(2)
                    fill("red");
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 4) {
                    stroke("black")
                    strokeWeight(2)
                    fill("#ff924f");
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 5) {
                    stroke("#666666")
                    strokeWeight(2)
                    fill("#000000");
                    rect(x * side, y * side, side, side);

                }
                else if (matrix[y][x] == 228) {
                    stroke("black")
                    strokeWeight(2)
                    fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
                    rect(x * side, y * side, side, side);

                }


            }
        }
    }
}
function kill(){
    let killButtonElement = document.getElementById("killButton")

    socket.emit("kill")
    killButtonElement.innerText = "Բոլորն սպանված են)"
    setInterval(function(){killButtonElement.innerText = "Սպանել բոլորին"},1000);
}
function regen(){
    let regenButtonElement = document.getElementById("regenButton")

    socket.emit("regen")
    regenButtonElement.innerText = "Վայելեք)"
    setInterval(function(){regenButtonElement.innerText = "Նոր խաղ"},1000);
}
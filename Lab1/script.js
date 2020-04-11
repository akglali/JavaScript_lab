canvasControl()
let topleft = true;
let topright = true;
let visible = true;
let colors_positive = ['green', 'blue', 'yellow', 'pink', 'lightgray']
let colors_negative = ['red', 'darkblue', 'orange', 'purple', 'black']
let random = 0
let prev;

// controlling canvas events
function canvasControl() {
    $(function() {
        var canvas = document.getElementById("myCanvas");
        const time = document.querySelector(".date_time");

        // controlling mouse clicks
        canvas.addEventListener('click', function(e) {
            console.log('Xpos: ' + e.clientX + 'Ypos : ' + e.clientY)
            if (e.clientX < 200 && e.clientY < 200 && e.clientX > 0 && e.clientY > 0) {
                if (topleft == false) {
                    topleft = true;
                } else {
                    topleft = false;
                }
            }
            if (e.clientX > 200 && e.clientY < 200 && e.clientX < 500 && e.clientY > 0) {
                do {
                    random = Math.floor(Math.random() * 5)
                } while (prev == random)
                prev = random;
                console.log('random number of color-pair: ' + random)
                if (topright == false) {
                    topright = true;
                } else {
                    topright = false;
                }
            }
            console.log('topright: ' + topright)
            console.log('topleft: ' + topleft)
        });

        // controlling key arguments
        document.addEventListener('keypress', function(e) {
            if (e.keyCode == 32) { // space key code
                console.log('keyCode :' + e.keyCode)
                console.log('pressed space')
                if (topleft == false) {
                    topleft = true;
                } else {
                    topleft = false;
                }
            }
            if (e.keyCode == 13) {
                console.log('keyCode :' + e.keyCode)
                console.log('pressed enter')
                do {
                    random = Math.floor(Math.random() * 5)
                } while (prev == random)
                prev = random;
                console.log('random : ' + random)
                if (topright == false) {
                    topright = true;
                } else {
                    topright = false;
                }
            }

            if (e.keyCode == 104 || e.keyCode == 72) {
                console.log('keyCode :' + e.keyCode)
                console.log('pressed H')
                dateAnimation();

                function dateAnimation(event) {
                    console.log('visibility: ' + !visible)
                    if (visible) {
                        time.style.opacity = '0';
                        visible = false;
                        console.log('hidden')
                    } else {
                        time.style.opacity = '1';
                        visible = true;
                        console.log('visible')
                    }
                }
            }
            console.log('topright: ' + topright)
            console.log('topleft: ' + topleft)
        });
    });
}

// showing date on the screen
function showDate() {
    $(function() {
        const time = document.querySelector(".date_time");
        var str = "";
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        str += year + "-" + month + "-" + day;

        // showing date

        time.style.textAlign = 'center';
        time.innerHTML = str;

        time.addEventListener('click', dateAnimation);

        function dateAnimation(event) {
            console.log('visibility: ' + !visible)
            if (visible) {
                time.style.opacity = '0';
                visible = false;
                console.log('hidden')
            } else {
                time.style.opacity = '1';
                visible = true;
                console.log('visible')
            }
        }

    });
}

// showing chart on the canvas
function showChart() {
    var now = new Date();
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    console.log(hour + ":" + minutes + ":" + seconds)



    $(function() {
        let x = 60;
        let y = 240;
        let dia = 25;
        let c_begining = 0;
        let c_end = 2 * Math.PI;

        let space = 60;

        // finding which box will be colored
        function findCircles(id, bcd) {
            if (bcd.includes(id)) {
                topright == true ? canvas_ctx.fillStyle = colors_positive[random] : canvas_ctx.fillStyle = colors_positive[random];
                canvas_ctx.fill();
            } else {
                topright == true ? canvas_ctx.fillStyle = colors_negative[random] : canvas_ctx.fillStyle = colors_negative[random];
                canvas_ctx.fill();
            }
        }

        var canvas = document.getElementById("myCanvas");
        var canvas_ctx = canvas.getContext("2d");
        canvas_ctx.clearRect(0, 0, 500, 300);

        // hours - first column

        parsedHourFirstColumn = parseInt(hour.toString()[0])
        bcd_hour_first = findBcd(parsedHourFirstColumn);

        canvas_ctx.beginPath();
        topleft == true ? canvas_ctx.arc(x, y, dia, c_begining, c_end) : canvas_ctx.rect(x - dia, y - dia, dia * 2, dia * 2)
        findCircles(1, bcd_hour_first)
        canvas_ctx.stroke();

        canvas_ctx.beginPath();
        topleft == true ? canvas_ctx.arc(x, y - space, dia, c_begining, c_end) : canvas_ctx.rect(x - dia, y - dia - space, dia * 2, dia * 2)
        findCircles(2, bcd_hour_first)
        canvas_ctx.stroke();

        // hours - second column

        parsedHourSecondColumn = parseInt(hour.toString()[1])
        bcd_hour_second = findBcd(parsedHourSecondColumn);

        for (let i = 0; i < 4; i++) {
            canvas_ctx.beginPath();
            topleft == true ? canvas_ctx.arc(x + space, y - space * i, dia, c_begining, c_end) : canvas_ctx.rect(x - dia + space, y - dia - space * i, dia * 2, dia * 2)
            findCircles(i + 1, bcd_hour_second)
            canvas_ctx.stroke();
        }


        // minutes - first column
        parsedMinutesFirstColumn = parseInt(minutes.toString()[0])
        bcd_minute_first = findBcd(parsedMinutesFirstColumn)

        for (let i = 0; i < 3; i++) {
            canvas_ctx.beginPath();
            topleft == true ? canvas_ctx.arc(x + space * 2.5, y - space * i, dia, c_begining, c_end) : canvas_ctx.rect(x - dia + space * 2.5, y - dia - space * i, dia * 2, dia * 2)
            findCircles(i + 1, bcd_minute_first)
            canvas_ctx.stroke();
        }

        // minutes - second column
        parsedMinutesSecondColumn = parseInt(minutes.toString()[1])
        bcd_minute_second = findBcd(parsedMinutesSecondColumn)

        for (let i = 0; i < 4; i++) {
            canvas_ctx.beginPath();
            topleft == true ? canvas_ctx.arc(x + space * 3.5, y - space * i, dia, c_begining, c_end) : canvas_ctx.rect(x - dia + space * 3.5, y - dia - space * i, dia * 2, dia * 2)
            findCircles(i + 1, bcd_minute_second)
            canvas_ctx.stroke();
        }

        // seconds - first column
        parsedSecondsFirstColumn = parseInt(seconds.toString()[0])
        bcd_second_first = findBcd(parsedSecondsFirstColumn)

        for (let i = 0; i < 3; i++) {
            canvas_ctx.beginPath();
            topleft == true ? canvas_ctx.arc(x + space * 5, y - space * i, dia, c_begining, c_end) : canvas_ctx.rect(x - dia + space * 5, y - dia - space * i, dia * 2, dia * 2)
            findCircles(i + 1, bcd_second_first)
            canvas_ctx.stroke();
        }

        // seconds - second column
        parsedSecondsSecondColumn = parseInt(seconds.toString()[1])
        bcd_second_second = findBcd(parsedSecondsSecondColumn)

        for (let i = 0; i < 4; i++) {
            canvas_ctx.beginPath();
            topleft == true ? canvas_ctx.arc(x + space * 6, y - space * i, dia, c_begining, c_end) : canvas_ctx.rect(x - dia + space * 6, y - dia - space * i, dia * 2, dia * 2)
            findCircles(i + 1, bcd_second_second)
            canvas_ctx.stroke();
        }
    });
}


// finding which box to chose
function findBcd(number) {
    if (number > 8) {
        return [1, 4]
    }
    if (number == 8) {
        return [4]
    }
    if (number < 8) {
        if (number == 4) {
            return [3]
        }
        if (number == 2) {
            return [2]
        }
        if (number == 1) {
            return [1]
        } else {
            if (number == 7) {
                return [3, 2, 1]
            }
            if (number == 6) {
                return [3, 2]
            }
            if (number == 5) {
                return [3, 1]
            }
            if (number == 3) {
                return [2, 1]
            }
            if (number == 0) {
                return [];
            }
        }
    }
}

const inHour = 1000 * 60 * 60;
setInterval(showChart, 1000);
setInterval(showDate(), inHour);
class Ball {

    constructor(x, y, rad, phase) {
        this.x = x;
        this.y = y;
        this.main_y = y;
        this.rad = rad;
        this.opacity = 1.0;
        this.l = 800; // wavelength
        this.freq = 1/50;
        this.omega = (2 * Math.PI * this.freq);
        this.phase = (2 * Math.PI * this.x) / this.l + phase;

        this.wave2 = false;

        this.amp = 30; //amplitude

        this.j_ind = 0;
        this.time = 0;

    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        if (!this.wave2) {
            context.fillStyle = `rgba(231, 137, 57, ${this.opacity})`;
        } else {
            context.fillStyle = `rgba(40, 237, 57, ${this.opacity})`;
        } 
        
        context.fill();
        context.closePath();
    }

    update(time_diff) {

        this.time += time_diff/100;
        this.disp  =  this.amp * Math.sin(this.omega * this.time - this.phase);
        this.y = this.disp + this.main_y;

        
        // range 0 to 7
        // radius varies with phase, and phase varies with x position ( fixed phase)

        this.rad =  3.5 +  3.5 * Math.sin(this.omega * this.time - this.phase);

        this.opacity = this.rad/7;


    }

}

var canvas = document.getElementById("canvas-main");
var context = canvas.getContext("2d");
var x = 30;
var y = 200;
var balls = [];

// single row
// vary phase in column
// wavelength = 20 * 20 = 400
for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {
        var phase = j * Math.PI/20;
        var ball = new Ball(x + 20*i, y + 20 * j, 8, phase);
        balls.push(ball);

    }
}

y = 290; // four times amplitude difference
var phase_diff =   Math.PI;
for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {

        var phase = j * Math.PI/20 + phase_diff;
        var ball = new Ball(x + 20*i, y + 20 * j, 8, phase);
        ball.j_ind = j;
        balls.push(ball);
    }
}


var time_1 = new Date();
var time_2 = new Date();
function mainLoop() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = "#033A49";
    context.fillRect(0, 0, canvas.width, canvas.height);
    time_2 = new Date();
    var tdiff = time_2 - time_1;

    for (let ball of balls) {
        ball.update(tdiff);
        ball.draw(context);
    }

    time_1 = time_2;

}

setInterval(mainLoop, 20);
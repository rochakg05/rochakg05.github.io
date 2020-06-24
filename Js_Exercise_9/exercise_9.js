var box_height = 300;
var box_width = 300;
var ball_size = 50;


function createContainer(height, width) {
    var container = document.createElement("div");
    container.setAttribute("id", "container");
    container.style.height = height + "px";
    container.style.width = width + "px";
    container.style.margin = "auto";
    container.style.border = 1 + "px solid black";
    container.style.position = "relative";

    document.body.appendChild(container);

    return container;
}

function drawBall(size) {
    var ball = document.createElement("div");
    ball.style.height = size + "px";
    ball.style.width = size + "px";
    ball.style.position = "relative";
    ball.style.backgroundColor = "blue";
    ball.style.borderRadius = "50%";

    container.appendChild(ball);

    return ball;
}

function plot(x, y) {
    ball = drawBall(ball_size);
    ball.style.top = x + "px";
    ball.style.left = y + "px";
}
var container = createContainer(box_height, box_width);

var ball1 = plot(0, 150);

setInterval(function () {
    if (box_height - ball_size === parseInt(ball.style.top)) {
        direction = -1;
    } else if (parseInt(ball.style.top) === 0) {
        direction = 1;
    }
    ball.style.top = parseFloat(ball.style.top) + direction + "px";
}, 5);
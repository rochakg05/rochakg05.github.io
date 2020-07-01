var canvas = document.getElementById("canvas-main");
var context = canvas.getContext("2d");

var score_canvas = document.getElementById("canvas-score");
var score_context = score_canvas.getContext("2d");



var lane_1 = new Lane(30, 0);
var lanes = [lane_1];
var bullets = [];


for (var i = 1; i < 3; i++) {
    var lane = new Lane( lane_1.pos_x + lane_1.image.width * i , lane_1.pos_y );
    lanes.push(lane);
}

for (var i = 0; i < lanes.length - 1; i++) {
    lanes[i].border_right = true;
}

// main car, second(middle) lane
var myCar = new Car(1, lanes);
myCar.pos_y = canvas.height - 150;

var enemTracker = new EnemTracker(lanes, canvas);

var score = 0;

//-------- Event handling --

function handleKeyDown(event) {
    if (event.keyCode == 37) {
        score += myCar.moveLeft(enemTracker.enem_cars);
    }
    if (event.keyCode == 39) {
        score += myCar.moveRight(enemTracker.enem_cars);
    }
    
    if (event.keyCode == 32) {
        myCar.shoot(bullets);

    }
}

document.addEventListener("keydown", handleKeyDown);
var timer = null;

function mainLoop() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    score_context.clearRect(0, 0, score_canvas.width, score_canvas.height);


    for (let car of enemTracker.enem_cars) {

        // increase speed of game gradually
        car.vel_y += SPEED_INCREMENT;

        if (myCar.checkCollide(car)) {
            alert(`GAME OVER!\nFinal Score: ${score}`);
            clearInterval(timer);
            return;
        }

        for (let bull of bullets) {
            if (car.checkBulletCollide(bull)) {
                car.health -= 1;

                var ind = bullets.indexOf(bull);
                bullets.splice(ind, 1);
            }

        }

        

        if (car.health <= 0) {
            var ind = enemTracker.enem_cars.indexOf(car);
            enemTracker.enem_cars.splice(ind, 1);

        }
        
    }
    
    for (let item of enemTracker.items) {
        item.update();
    }


    for (let item of enemTracker.items) {
        item.vel_y += SPEED_INCREMENT;
        myCar.handleItemCollide(item);

    }
    
    myCar.update();
    enemTracker.update(myCar); 

    for (let car of enemTracker.enem_cars) {
        car.update();
    }
    enemTracker.cleanUp(canvas);
    
    for (let lane of lanes) {
        lane.draw(context);
    }

    for (let lane of lanes) {
        lane.drawBorderLeft(context);
        lane.drawBorderRight(context);
    }
    myCar.draw(context);

    for (let car of enemTracker.enem_cars) {
        car.draw(context);
    }

    for (let item of enemTracker.items) {
        item.draw(context);
    }

    for (let bullet of bullets) {
        bullet.update();
        bullet.draw(context);

        if (bullet.pos_y <= 0) {
            var ind = bullets.indexOf(bullet);
            bullets.splice(ind, 1);
        }
    }

    // speeed up frequency of cars' appearance
    enemTracker.time_1 -= SPEED_INCREMENT;
    enemTracker.time_2 -= SPEED_INCREMENT;


    // draw score
    score_context.fillStyle = "blue";
    score_context.font = "bold 16px Arial";
    score_context.fillText(`Score: ${score}`, 5, 15);
    score_context.fillText(`Ammo: ${myCar.ammo}`, 400, 15);
}

function startGame() {
    enemTracker.start();
    timer = setInterval(mainLoop, 10);

    document.getElementById("start-but").style.display = "none";
}

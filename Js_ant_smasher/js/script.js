
var DEFAULT_VEL = 5;

    class Ball {
        constructor(x, y, x_vel, y_vel, radius, color, img_path) {
            this.x = x;
            this.y = y;
            this.x_vel = x_vel;
            this.y_vel = y_vel;
            this.radius = radius;
            this.color = color;
            this.main_vel = 5;

            // create image element
            this.img_path = img_path;
            this.image = document.createElement("img");
            this.image.src = "img/ant.png";



            this.drawable = true;
        }

        ballRemove() {
            this.drawable = false; 
        }

        // check collision
        // if two ants are touching,
        // distance between centers = sum of radii
        checkCollide(otherBall) {

            // if I am not drawable, no collision took place;
            if (!this.drawable || !otherBall.drawable) {
                return false;
            }

            var radSum, dist;
            var diffX, diffY;

            diffX = this.x - otherBall.x;
            diffY = this.y - otherBall.y;
            
            radSum =  this.radius + otherBall.radius;
            dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            
            //0.2 is an aribitrary epsilion value to prevent circles from intersecting
            return dist <= radSum;
        }

        checkPointCollide(x, y) {

            var diffX = this.x - x;
            var diffY = this.y - y;

            var dist = Math.sqrt(diffX * diffX + diffY * diffY);

            return dist <= this.radius;

        }

        setDirection(angleDegrees) {

            var angleRadians = (Math.PI/ 180) * angleDegrees;

            this.y_vel = Math.sin(angleRadians) * this.main_vel;
            this.x_vel = Math.cos(angleRadians) * this.main_vel;

        }

        reverseDirection() {
           
            this.y_vel = -this.y_vel;
            this.x_vel = -this.x_vel;

            // random fluctuations
            this.x_vel += Math.random()/5;
            this.y_vel += Math.random()/5;
        }

        update() {
            // canvas boundary check
            // since this.x and this.y represent the center, we will account for
            // that also
            if (this.y + this.radius + this.y_vel >= canvas.height || this.y - this.radius + this.y_vel <= 0) {
                this.y_vel = -this.y_vel;

            }

            if (this.x + this.radius + this.x_vel >= canvas.width || this.x - this.radius + this.x_vel <= 0) {
                this.x_vel = -this.x_vel;
            }

            this.y += this.y_vel;
            this.x += this.x_vel;

        }

        draw(context) {

            if (this.drawable) {
                
                var w = this.image.width;
                var h = this.image.height;
                
                // place image in center of circle
                context.drawImage(this.image, this.x - w/2, this.y - h/2);
                

                
            }
        }


    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var canvas = document.getElementById("myCanvas"); 
    var ctx = canvas.getContext("2d");
    

    // create balls randomly
    var randomBalls = [];
    for (var i = 0; i < 7; i++) {

        var rand_x = getRandomInteger(10, canvas.width);
        var rand_y = getRandomInteger(7, canvas.height);
        var rand_direction = getRandomInteger(30, 300);
        //var rand_radius = getRandomInteger(15, 25);
        var rand_radius = 40;
        var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);
        
        // velocity decreases according to weight
        var random_vel =  35/rand_radius;

        var ball = new Ball(rand_x, rand_y, -1, -1, rand_radius, rand_color, "ant.png");
        ball.main_vel = random_vel;
        ball.setDirection(rand_direction);

        randomBalls.push(ball);
    }

    function handleClick(event) {

        var mouse_x = event.clientX;
        var mouse_y = event.clientY;
    
        //get pos relative to canvas
        var rect = canvas.getBoundingClientRect();
        mouse_x -= rect.left;
        mouse_y -= rect.top;
                
                ctx.beginPath();
                ctx.arc(mouse_x, mouse_y, 10, 0, Math.PI*2);
                ctx.fillStyle= '#00FF00';
                ctx.fill()
                ctx.closePath();

        for (var i = 0; i < randomBalls.length; i++) {
            if (randomBalls[i].drawable && randomBalls[i].checkPointCollide(mouse_x, mouse_y)) {
                randomBalls[i].ballRemove();
            }
        }


    }

    canvas.addEventListener('click', handleClick, true);


    function mainLoop() {
        
        // check all possible combinations without repeptition
        // (1, 2, 3, 4, 5) x (1,2,3,4,5) = 12 13 14 15 23 24 25 34 35 45

        for (var i = 0; i < randomBalls.length; i++) {
            
            for (var j = i + 1; j < randomBalls.length; j++) {
                
                var ballOne = randomBalls[i];
                var ballTwo = randomBalls[j];

                if (ballOne == ballTwo) {  continue; }
                if (ballOne.checkCollide(ballTwo)) {
                    ballOne.reverseDirection();
                    ballTwo.reverseDirection();
                }
            }
        }

 
        for (var i = 0; i < randomBalls.length; i++) {
            randomBalls[i].update()
        }

        // clear before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        for (var i = 0; i < randomBalls.length; i++) {
            randomBalls[i].draw(ctx);
        }

    }

setInterval(mainLoop, 10);

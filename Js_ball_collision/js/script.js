var DEFAULT_VEL = 5;

    class Ball {
        constructor(x, y, x_vel, y_vel, radius, color) {
            this.x = x;
            this.y = y;
            this.x_vel = x_vel;
            this.y_vel = y_vel;
            this.radius = radius;
            this.color = color;
            this.main_vel = 5;
        }

        // check collision
        // if two circles are touching,
        // distance between centers = sum of radii
        checkCollide(otherBall) {

            var radSum, dist;
            var diffX, diffY;

            diffX = this.x - otherBall.x;
            diffY = this.y - otherBall.y;
            
            radSum =  this.radius + otherBall.radius;
            dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            
            return dist <= radSum;
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
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            context.fillStyle = this.color;
            context.fill()
            context.closePath();
        }


    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var canvas = document.getElementById("myCanvas"); 
    var ctx = canvas.getContext("2d");
    
    /*
    var ball_1 = new Ball(canvas.width/2, canvas.height - 50, 0, 5, 10,
        "#0095DD");

    var ball_2 = new Ball( canvas.width/2, canvas.height - 50 , 0, 5, 15, "#5F47DD");

    ball_2.setDirection(25);

    */

    // create balls randomly
    var randomBalls = [];
    for (var i = 0; i < 7; i++) {

        var rand_x = getRandomInteger(10, canvas.width);
        var rand_y = getRandomInteger(7, canvas.height);
        var rand_direction = getRandomInteger(30, 300);
        var rand_radius = getRandomInteger(8, 25);
        var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);
        
        // velocity decreases according to weight
        var random_vel =  35/rand_radius;

        var ball = new Ball(rand_x, rand_y, -1, -1, rand_radius, rand_color);
        ball.main_vel = random_vel;
        ball.setDirection(rand_direction);

        randomBalls.push(ball);
    }


    function mainLoop() {
        
        /*
        ball_1.update();
        ball_2.update();
        */
        
        for (var i = 0; i < randomBalls.length; i++) {
            randomBalls[i].update()
        }
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


        // clear before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        for (var i = 0; i < randomBalls.length; i++) {
            randomBalls[i].draw(ctx);
        }

    }

    setInterval(mainLoop, 10);
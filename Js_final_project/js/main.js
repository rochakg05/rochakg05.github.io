var filenames = [1].map( (num) => `frame-${num}.png` );
var canvas = document.getElementById("chief-canvas");
var context = canvas.getContext('2d');


var level_text = "EMPTY";

// background image
var bg = new Image();
bg.src = "res/bg.jpg";
var error = false;

var inter_main = null; 


var space_released = false;
var left_held = false;
var right_held = false;

function keyDownHandler(event) {
   if (event.keyCode == 32) {
        space_released = false;
   }
   
   
   if (event.keyCode == 37) {
        left_held = true;
   }
   
   if (event.keyCode == 39) {
        right_held = true;
   }
   
}

function keyUpHandler(event) {
    if (event.keyCode == 32) {
        space_released = true;
    }
    
    
    if (event.keyCode == 37) {
        left_held = false;
   }
   
   if (event.keyCode == 39) {
        right_held = false;
   } 
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);





function level1() {

    // rebind
    level_text = "Level 1"; 
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 3; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(1400, 0, "res/finish.png");
    
    GRAVITY = 16;      // heavy gravity
    FORCE_UP = 2;
    

    start(1, cam, ball, hoops_list, finishLine);

}

 


function level2() {

    // rebind
    level_text = "Swishes"; 
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(2100, 0, "res/finish.png");
    
    start(2, cam, ball, hoops_list, finishLine);

}


function level3() {

    // rebind
    level_text = "Low Gravity"; 
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 3; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(1400, 0, "res/finish.png");
    
    GRAVITY = 8;      // low gravity
    FORCE_UP = 8;
    

    start(3, cam, ball, hoops_list, finishLine);

}

function level4() {

    // rebind
    level_text = "Speed Up"; 
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(1400, 0, "res/finish.png");

           
    
    start(2, cam, ball, hoops_list, finishLine);

}

function level10() {

    // rebind
    level_text = "Challenge 10"; 
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, "res/hoop-back.png", "res/hoop-front.png");


        hoop.moving = true;
        hoop.vel_y = HOOP_Y_VEL;
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(2100, 0, "res/finish.png");
    
    start(10, cam, ball, hoops_list, finishLine);

}




/* 

function level3() {

        //tight level

    
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 10; i++) {
        var hoop = new Hoop(200 + i * 160 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    
    document.getElementById('myCanvas').height = 600;                   //Lesser the screen boundary.
    document.getElementById('myCanvas').width = window.innerWidth;
    
    start(cam, ball, hoops_list);

}

*/


function start(level, cam, ball, hoops_list, finishLine) {


    var finished = false;

    function mainLoop() {

        if (space_released) {
            ball.lift();
            space_released = false;
        }
        

        // LEVEL FINISHED
        if (finishLine.checkFinished(ball)) {
            
            if (level == 2) {
                // count number of swishes
                var num_swishes = hoops_list.filter( (hoop) => hoop.swished ).length;
                if (num_swishes == 5) {
                    alert("CHALLENGE 2: 5 SWISHES COMPLETED!");
                } else {
                    alert("CHALLENGE 2 unsuccessful");
                }
            }

            alert("CHALLENGE FINISHED");
            finished = true;
        }

        //speed up
        if (space_released){
            ball.lift();
            if (level==4){
                ball.vel_x += 0.3 ;
            }
        }
            space_released = false;
        
        
        

        // apply camera
        cam.update();
        cam.applyCamera(ball);
        cam.applyCamera(finishLine);
        for (let hoop of hoops_list) {
            cam.applyCamera(hoop);
        }


        for (let hoop of hoops_list) {

            hoop.update(ball)
            if (!hoop.passed) {
                if (hoop.checkIfBallPassed(ball)) {
                    hoop.passed = true;
                }
            } else if (hoop.passed){ //for clarity 
                if (!hoop.hoop_exit) {
                    alert("FAILURE");
                } 
               
            }
        }
        
        for (let hoop of hoops_list) {
            if (!hoop.hoop_entry) {
                if ( ball.rect.checkCollide(hoop.rect) ) {
                    if (ball.vel_y > 0) {
                        hoop.hoop_entry = true;
                    }
                }
            } else {
                // for this hoop, this.hoop_entry is already true 
                if (!ball.rect.checkCollide(hoop.rect)) {
                    hoop.hoop_exit = true;

                }
            }
        }
        
        if (error) {
            alert("ERROR");
        }

        
        context.drawImage(bg, 0, 0, canvas.width, canvas.height);

        for (let hoop of hoops_list) {
            hoop.drawBack(context);
        }
        
        
        /*
        if (right_held) {
            ball.vel_x = SCROLL_SPEED;
        } else if (left_held) {
            ball.vel_x = -SCROLL_SPEED;
        } else {
            ball.vel_x = 0;
        }
        */
        ball.update(hoops_list);
        
        
        
        for (let hoop of hoops_list) {
            hoop.drawFront(context);
            hoop.drawRect(context);
        }

        finishLine.draw(canvas, context);
        
        context.fillStyle = "orange";
        context.font = "bold 16px Arial";
        context.fillText(`Level: ${level_text}`, 10, 25);
    }

    inter_main = setInterval(mainLoop, 16);

}

function GameOver() {
    // clear hoop list;
    // reset player position
}

level10();


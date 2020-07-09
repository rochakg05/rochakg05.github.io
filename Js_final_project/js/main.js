var filenames = [1].map( (num) => `frame-${num}.png` );
var canvas = document.getElementById("chief-canvas");
var context = canvas.getContext('2d');


var hoops_list = [];
for (var i = 0; i < 10; i++) {
    var hoop = new Hoop(200 + i * 160 , 200, "res/hoop-back.png", "res/hoop-front.png");
    hoops_list.push(hoop);
}

// background image
var bg = new Image();
bg.src = "res/bg.jpg";
var error = false;

var inter_main = null; 


var space_held = false;
var left_held = false;
var right_held = false;

function keyDownHandler(event) {
   if (event.keyCode == 32) {
        space_held = true;
   }
   
   /*
   if (event.keyCode == 37) {
        left_held = true;
   }
   
   if (event.keyCode == 39) {
        right_held = true;
   }
   */
}

function keyUpHandler(event) {
    if (event.keyCode == 32) {
        space_held = false;
    }
    
    /*
    if (event.keyCode == 37) {
        left_held = false;
   }
   
   if (event.keyCode == 39) {
        right_held = false;
   } */
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);



function level1() {

    // rebind
    
    ball = new Ball(canvas.width/3, 50, "res/ball_anim/", filenames, context);
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 10; i++) {
        var hoop = new Hoop(200 + i * 160 , 200, "res/hoop-back.png", "res/hoop-front.png");
        hoops_list.push(hoop);
    }
    

    
    start(cam, ball, hoops_list);

}



function start(cam, ball, hoops_list) {
   
    function mainLoop() {

        if (space_held) {
            ball.lift();
        }
        
        

        // apply camera
        cam.update();
        cam.applyCamera(ball);
        for (let hoop of hoops_list) {
            cam.applyCamera(hoop);
        }
        for (let hoop of hoops_list) {

            hoop.update()
            if (!hoop.passed) {
                if (hoop.checkIfBallPassed(ball)) {
                    hoop.passed = true;
                }
            } else {
                if (!hoop.hoop_exit) {
                    //alert("FAILURE");
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
    }

    inter_main = setInterval(mainLoop, 16);

}

function GameOver() {
    // clear hoop list;
    // reset player position
}
level1();


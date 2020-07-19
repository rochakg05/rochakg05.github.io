var filenames = [1].map( (num) => `frame-${num}.png` );
var canvas = document.getElementById("chief-canvas");
var context = canvas.getContext('2d');




//pre-load images; share image objects
var hoop_hort_back_img = new Image();
var hoop_hort_front_img = new Image();
var hoop_vert_back_img = new Image();
var hoop_vert_front_img = new Image();
var hoop_tilt_back_img = new Image();
var hoop_tilt_front_img = new Image();
hoop_hort_back_img.src = "res/hoop-back.png";
hoop_hort_front_img.src = "res/hoop-front.png";
hoop_vert_back_img.src = "res/hoop-left.png";
hoop_vert_front_img.src = "res/hoop-right.png";
hoop_tilt_back_img.src = "res/hoop-rot-back.png";
hoop_tilt_front_img.src = "res/hoop-rot-front.png"
var level_text = "EMPTY";

// background image
var bg = new Image();
bg.src = "res/bg.jpg";
var hop_audio = new Audio("res/hop.wav");
var bounce_audio = new Audio("res/bounce.mp3");
var error = false;

var inter_main = null; 
var flipped = false;

var space_released = false;
var gameOverButton = new Button(canvas.width/3, canvas.height/2, "Tap to continue", restartGame);

function keyDownHandler(event) {
   if (event.keyCode == 32) {
        space_released = false;
   }
   
}

function keyUpHandler(event) {
    if (event.keyCode == 32) {
        space_released = true;
    }
    

}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


var img_path = "res/ball_anim/";
var img_paths = filenames.map( (fname) => img_path + fname );
var image_elems = []

for (let path of this.img_paths) {

    var img_elem = document.createElement("img");
    img_elem.src = path;
    img_elem.style.border = "1px solid black"; 

    image_elems.push(img_elem);
}

var ball = new Ball(canvas.width/3, 50,  image_elems, context);
image_elems[image_elems.length-1].onload = menuScreen;


function level0() {
    // rebind
    level_text = "Normal Endless Play"; 



    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 3; i++) {
        var hoop = new Hoop(400 + i * 220 , 200, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(-500, -400, "res/finish.png");  // hide this
    
    ball.start();
    start(0, cam, ball, hoops_list, finishLine);

}

function level1() {

    // rebind
    level_text = "Pass all hoops"; 

    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , 200,  hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");
    

    start(1, cam, ball, hoops_list, finishLine);

}

 


function level2() {

    // rebind
    level_text = "Exactly 5 swishes"; 

    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");

    start(2, cam, ball, hoops_list, finishLine);
    
}

function level3() {

    // rebind
    level_text = "Strong Wings"; 
    ball.force_y += 2;
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");

    start(3, cam, ball, hoops_list, finishLine);
    
}

function level4() {

    // rebind
    level_text = "High Gravity"; 
    GRAVITY += 5;

    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");
    

    start(4, cam, ball, hoops_list, finishLine);
}

function level5() {
    // PATIENCE, tilted hoops
    
    level_text = "Patience"; 

    ball.vel_x = ball.vel_x/3;  // half speed
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 8; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new TiltedHoop(500 + i * rand_y , rand_y, hoop_tilt_back_img, hoop_tilt_front_img);
        hoop.moving = true;
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");

    start(5, cam, ball, hoops_list, finishLine);
    
}

function level6() {

    // rebind
    level_text = "Low Gravity"; 
    GRAVITY -= 6;

    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");

   start(6, cam, ball, hoops_list, finishLine);
    
}

function level7() {

    
    level_text = "Tight level"; 

    ball.vel_x = ball.vel_x/2;  // half speed
    ball.pos_y = 100;
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 5; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");
    // call when loaded
 
    start(7, cam, ball, hoops_list, finishLine);
  

}

function level8() {

    // rebind
    level_text = "Speed up";
    ball.vel_x += 5;
    ball.start();
    

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 20; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");

   start(8, cam, ball, hoops_list, finishLine);
    
}
function level9() {
    // VERTICAL HOOPS
    
    level_text = "Don’t rush in"; 

    ball.vel_x *= 2;
    ball.start();

    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 9; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new VerticalHoop(500 + i * 330 , rand_y, hoop_vert_back_img, hoop_vert_front_img);
        hoops_list.push(hoop);
    }
    
    var finishLine = new FinishLine(hoops_list[hoops_list.length-1].pos_x + 300, 0, "res/finish.png");
    

    start(9, cam, ball, hoops_list, finishLine);
    
}



function level10() {

    // rebind
    level_text = "Moving Hoops"; 


    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 15; i++) {
        var rand_y = Math.random() * 200 + 100; // 100 to 300
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);

        hoop.moving = true;
        hoop.vel_y = HOOP_Y_VEL;
        hoops_list.push(hoop);
    }
    ball.start();
    
    var finishLine = new FinishLine(15*220 + 800, 0, "res/finish.png");

    start(10, cam, ball, hoops_list, finishLine);
    
}

function level11() {

    // rebind
    level_text = "Mirror level"; 


    var cam = new Camera(ball, canvas);
    var hoops_list = [];
    for (var i = 0; i < 15; i++) {
        var rand_y = Math.random() * 150 + 200; // 2001to 350
        var hoop = new Hoop(400 + i * 220 , rand_y, hoop_hort_back_img, hoop_hort_front_img);

        hoops_list.push(hoop);
    }
    ball.start();
    
    var finishLine = new FinishLine(15*220 + 800, 0, "res/finish.png");
    flipped = true;
    start(11, cam, ball, hoops_list, finishLine);
    
}




function start(level, cam, ball, hoops_list, finishLine) {
    
    
    var ground = new Ground(50, canvas);
    


    var top_barrier = new Ground(canvas.height, canvas);
    top_barrier.height = 50; top_barrier.rect.h = 50;
    var bot_barrier = new Ground(50, canvas);
    
    // tight level
    if (level == 7) {
        top_barrier.height = 100; top_barrier.rect.h = 100;
        bot_barrier.y = canvas.height - 100;
        bot_barrier.rect.y = bot_barrier.y;
        bot_barrier.height = 200;
        bot_barrier.rect.h = 200;
    }
    
        // draw everything flipped
    if (flipped) {

        // get midpoint relative to ball

        context.translate(canvas.width, 0); 
        context.scale(-1, 1);
    }
        
    

    
    var generator = new Generator();
    var generator_timer = Math.random()*(TIME_MAX - TIME_MIN) + TIME_MIN;    
 
    function applyGenerator() {

       generator_timer = Math.random()*(TIME_MAX - TIME_MIN) + TIME_MIN;    
       var last_x = hoops_list[hoops_list.length-1].pos_x;
       hoops_list.push(generator.generate(ball.pos_x, canvas, last_x));
       setTimeout(applyGenerator, generator_timer);
    }
    
    function clickHandler(event) {
      	const rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        
        if (flipped) {
            x = canvas.width - x;

        }

        if (gameOverButton.buttonClicked(x, y)) {
            gameOverButton.enabled = false;
            gameOverButton.callback();
        }
    }
    canvas.addEventListener("mousedown", clickHandler);
    
    var finished = false;
    // redundant var finish_checked = false;
    var challenge_successful = false;
    var failure = false;
    var gameEnded = false;

    var num_swishes = 0;
    var swish_chain = 0;
    var finishedText = new BlinkText(500, 100, "Challenge Succcessful", 54, 140, 96);
    var previous_hoop = null; // use this to break or make combo chains of swishes
  
    var score = 0;
    var score_text = "";
    var disp_text = "";
    var disp_text_alpha = 0;
    var disp_text_x = 0;
    var disp_text_y = 0;
    
    function fadeOut(text, x, y) {
        disp_text = text;
        disp_text_alpha = 1;
        disp_text_x = x;
        disp_text_y = y;
    }
    

    if (level == 0) {
        setTimeout(applyGenerator, generator_timer);
    }
    function mainLoop() {

        if (space_released) {
        
            if (ball.lift()) {
                hop_audio.currentTime = 0;      //immediately start from the beginning
                hop_audio.play();
            }

            //dont rush in 
            if (level == 9 && ball.jump_enabled) {

                ball.vel_x += 0.2;
            }
            space_released = false;
        }
        

        // LEVEL FINISHED
        if (finishLine.checkFinished(ball) && !finished) {
            
            finished = true;
            ball.jump_enabled = false;
            challenge_successful = true;
            finishedText.enable();
            // check if challenge successful
            if (level == 2) {
                if (num_swishes !== 5) {
                    challenge_successful = false;
                }
            }
            
            if (failure) {
                challenge_successful = false;
            }
            

            if (!challenge_successful) {
                finishedText.text = "Challenge failed!";
            }

 
        }
        
        
        // handling finishing a level


        gameEnded = finished || failure;

        
        
        //check collision with ground
        if (ball.checkGroundCollide(ground)) {

            if (ball.handleGroundCollision()) {
                bounce_audio.currentTime = 0;
                bounce_audio.play();
            }

        }

        
        if (swish_chain >= 2) {
            ball.flaming = true;
            ball.flame_level = swish_chain - 2; // color of fire
        } else {
            ball.flaming = false;
        }


        

        // apply camera
        cam.update();
        cam.applyCamera(ball);
        cam.applyCamera(finishLine);
        cam.applyCamera(ground);
        for (let hoop of hoops_list) {
            cam.applyCamera(hoop);
        }
        
        
        for (let hoop of hoops_list) {

            hoop.update(ball)
            if (!hoop.passed) {
                if (hoop.checkIfBallPassed(ball)) {
                    hoop.passed = true;
                    score += 1;
                }
            } else if (hoop.passed){ //for clarity 
                if ( !hoop.hoop_entry || !hoop.hoop_exit) {
                    //alert("FAILURE");
                    failure = true;

                } 
               
            }
        }
        
        for (let hoop of hoops_list) {
            var current_hoop = hoop;
            if (!hoop.hoop_entry) {
                if ( ball.rect.checkCollide(hoop.rect) ) {
                
                    if (hoop.type == "HORT" || hoop.type == "TILT") {
                        if (ball.vel_y > 0) {
                        
                            hoop.hoop_entry = true;
                       
                        }
                    } else {
                        //vertical hoops
                        if (ball.vel_x >= 0) {
                            hoop.hoop_entry = true;
                        }
                    
                    }
                }
            } else {
                // for this hoop, this.hoop_entry is already true 
                if (!ball.rect.checkCollide(hoop.rect)) {

                    
                    // for hort hoops, ball needs to be below the collision rect
                    if ( (hoop.type == "HORT" || hoop.type == "TILT")&& ball.rect.y >= (hoop.rect.y + hoop.rect.h) ) {
                        hoop.hoop_exit = true;
                    }
                    if (hoop.type != "HORT" && hoop.type != "TILT") {
                        hoop.hoop_exit = true;
                    }
                        
                    // The ball has exited. If swished is still true, display the graphic
                    if (hoop.swished && !hoop.display_done) {
                        var text = "SWISH";
                        num_swishes += 1;

                        if (previous_hoop && previous_hoop.swished) {
                            
                            swish_chain += 1;
                            text += swish_chain == 1? "" : " X" + swish_chain;
                            previous_hoop = null;
                        } else {
                            swish_chain = 1;
                        }
                       
                        fadeOut(text, 200, 100);
                        hoop.display_done = true;

                    }  else if (!hoop.passed && !hoop.swished) {
                        swish_chain = 0;
                    }
                      
                    
                }
            }
            previous_hoop = current_hoop;
        }
        
        if (failure) {
            fadeOut("FAILURE", 200, 100);
            ball.jump_enabled = false;
        }
        

        context.drawImage(bg, 0, 0, canvas.width, canvas.height);

        for (let hoop of hoops_list) {
            hoop.drawBack(context);
        }
        
        finishLine.draw(canvas, context);
        
        ball.update(hoops_list, ground); //draw also included
        ground.update(ball);
        ground.draw(context);
        
        for (let hoop of hoops_list) {
            hoop.drawFront(context);
            hoop.drawRect(context);
        }
        

        if (ball.rect.checkCollide(top_barrier.rect) || ball.rect.checkCollide(bot_barrier.rect)) {
            failure = true;
        }
        top_barrier.draw(context);
        bot_barrier.draw(context);
        if (level == 7) {
            top_barrier.drawBlack(context);
            bot_barrier.drawBlack(context);
        }
        

        
        context.fillStyle = "orange";
        context.font = "bold 16px Arial";
        context.fillText(`Level: ${level_text}`, 10, 25);
        if (level == 0) {
            context.fillText(`Score: ${score}`, 10, 45);
        }
        if (disp_text_alpha > 0) {
            
            //alert("DRAW");
            context.fillStyle = "rgba(187, 26, 65, " + disp_text_alpha + ")";
            context.font = "italic bold 24pt Arial";
            context.fillText(disp_text, disp_text_x, disp_text_y);
            disp_text_alpha -= 0.02; // decrease opacity (fade out)
        
        } 
        
        finishedText.draw(context);

        
        if (gameEnded) {
            gameOverButton.enabled = true;
            if (ball.vel_x === 0) {
                gameOverButton.draw(context);
             }
        }
 
       
    }

    inter_main = setInterval(mainLoop, 16);

}



var but_list = [];


function menuScreen() {

    //var inter = setInterval(menuScreen, 100);
    if (but_list.length == 0) {
        but_list.push(new Button(60, 50, "Endless Run", level0));
        but_list.push(new Button(250, 50, "PassAllHoops", level1));
        but_list.push(new Button(250, 120, "5 Swishes", level2));
        but_list.push(new Button(250, 190, "Strong Wings", level3));
        but_list.push(new Button(250, 260, "Heavy Gravity", level4));
        but_list.push(new Button(250, 330, "Patience", level5));
        but_list.push(new Button(250, 400, "Low Gravity", level6));
        but_list.push(new Button(250, 470, "Tight Level", level7));
        but_list.push(new Button(450, 50, "Speed Up", level8));
        but_list.push(new Button(450, 120, "Don't Rush In", level9));
        but_list.push(new Button(450, 190, "Moving Hoops", level10));
        but_list.push(new Button(650, 50, "Mirror", level11));
    }
    but_list[0].textcolor = "red";
    but_list[but_list.length-1].textcolor = "#510B7F";
    
    function clickHandler(event) {
      	const rect = canvas.getBoundingClientRect();
	    const x = event.clientX - rect.left;
	    const y = event.clientY - rect.top;

    
        for (let but of but_list) {
            if (but.buttonClicked(x, y)) {
                //clearInterval(inter);
                //alert("CLICKED");
                // if not done, we get random clicks
                //but.enabled = false;
                but_list.map( (but) => { but.enabled = false; });
                but.callback();
            }
        }
	
    }
    canvas.addEventListener("mousedown", clickHandler);
    
   
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let but of but_list) {
        but.draw(context);
    }
  
}


function restartGame() {

    clearInterval(inter_main);
    ball.reset();

    but_list.map( (but) => { but.enabled = true; });
    if (flipped) {
        flipped = false;
        context.setTransform(1, 0, 0, 1, 0, 0);
        //context.translate(0, 0);
        //context.scale(-1, 1);
    }
    menuScreen();
}
menuScreen();

//level2();
//level4();
//level6();
//level7();
//level9();
//level10();
//level5();




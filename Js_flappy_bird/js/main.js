var filenames = [1, 2, 3, 4].map( (num) => `frame-${num}.png` );
var canvas = document.getElementById("chief-canvas");
var context = canvas.getContext('2d');

var b = new Bird(300, 50, "res/bird_anim/", filenames, context);
var handler = new Handler(canvas);
// background image
var bg = new Image();
bg.src = "res/bg.jpg";

var inter_main = null; 

var score = 0; 
var scoreList = [];

var space_held = false;

function keyDownHandler(event) {
   if (event.keyCode == 32) {
        space_held = true;
   }
}

function keyUpHandler(event) {
    if (event.keyCode == 32) {
        space_held = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


function preStart() {
    var inter = null; 
    var but = new Button(canvas.width/2, canvas.height/2, "START");

    
    function clickHandler(event) {
      	const rect = canvas.getBoundingClientRect();
	    const x = event.clientX - rect.left;
	    const y = event.clientY - rect.top;


        if (but.buttonClicked(x, y)) {
            clearInterval(inter);
            but.enabled = false;
            start();
        }
	
    }
    
    canvas.addEventListener("mousedown", clickHandler);
    

    function preLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        but.draw(context);
        
        context.fillStyle = "#89510C";
        context.font = "italic 28px Arial";
        context.fillText("FLAPPY BIRD", canvas.width/2, canvas.height/5);

    }
    inter = setInterval(preLoop, 100);
}


function start() {

    // rebind
    b = new Bird(300, 50, "res/bird_anim/", filenames, context);
    handler = new Handler(canvas);
    
    b.start();
    handler.start();
    score = 0;
    
    function mainLoop() {

        if (space_held) {
            b.lift();
        }

        handler.update();

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bg, 0, 0, canvas.width, canvas.height);
        b.update();
        // ground touched, gameover
        if (b.touchedGround(canvas)) {
            clearInterval(inter_main);
            gameOver();
        }

        // check score & collision
        // increase by one if the right side of a 'gap rect' of a pipe pair
        // passes us by
        for (let pipe of handler.pipes) {
            if (!pipe.passed) {

                if (pipe.rect_gap.x + pipe.img_width < b.pos_x) {
                    pipe.passed = true;
                    score += 1;
                }
            }

            if (b.rect.checkCollide(pipe.rect1) || b.rect.checkCollide(pipe.rect2)) {
                clearInterval(inter_main);
                gameOver();

            }
        }

        for (let pipe of handler.pipes) {
            pipe.update();
            pipe.draw(context);
        }


        handler.cleanup();

        //draw score
        context.fillStyle = "orange";
        context.font = "bold 20px Arial";
        context.fillText(`Score: ${score}`, 10, 20);


    }

    inter_main = setInterval(mainLoop, 100);
}

function gameOver()
{
    scoreList.push(score);
    var high_score = Math.max.apply(null, scoreList);

    var inter = null; 
    var but = new Button(canvas.width/2, canvas.height/2, "RESTART");

    
    function clickHandler(event) {
      	const rect = canvas.getBoundingClientRect();
	    const x = event.clientX - rect.left;
	    const y = event.clientY - rect.top;

        

        if (but.buttonClicked(x, y)) {
            clearInterval(inter);
            // if not done, we get random clicks
            but.enabled = false;
            preStart();
        }
	
    }

    canvas.addEventListener("mousedown", clickHandler);
    

    function postLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";
        context.font = "bold 28px Arial";
        context.fillText("GAME OVER", canvas.width/2, canvas.height/5);

        context.fillStyle = "yellow";
        context.fillText(`Your Score: ${score}`, canvas.width/2, canvas.height/5 + 30);

        context.fillStyle = "orange";

        context.fillText(`High Score: ${high_score}`, canvas.width/2, canvas.height/5 + 60);

        but.draw(context);

    }
    
    inter = setInterval(postLoop, 100);

}


preStart();

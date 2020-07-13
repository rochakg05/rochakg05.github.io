class Hoop {

    constructor(x, y, img_back_path, img_front_path) {

        this.context = context;
        
        this.orig_y = y;
        this.pos_x = x
        this.pos_y = y;
        this.vel_y = 0;
        this.moving = false;

        this.img_back = new Image();
        this.img_front = new Image();
        this.img_back.src = img_back_path;
        this.img_front.src = img_front_path;  
        
        // 292 x 32
        // 50 x  
        this.back_width = 140;

        this.back_height = (this.back_width / this.img_back.width) * this.img_back.height;
        this.front_height = (this.back_width / this.img_back.width) * this.img_front.height;
        this.offset = 25;
        this.rect = new Rect(this.pos_x + this.offset, this.pos_y + 10, this.back_width-50,  this.front_height);
        this.offset_r = this.offset + this.rect.w;
        this.rect_l = new Rect(this.pos_x , this.pos_y + 10, this.offset,  this.front_height);
        this.rect_r = new Rect(this.pos_x , this.pos_y + 10, this.offset,  this.front_height);
  
        this.rect.color = "#f23fed";
        
        this.hoop_entry = false;
        this.hoop_exit = false;
        this.passed = false;
        this.swished = true;
        

    }
    
    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect_l.camera_delta = x_delta;
        this.rect_r.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;                
    }
    
    update(ball) {

        if (this.moving) {

            this.pos_y += this.vel_y;

            if (Math.abs(this.pos_y - this.orig_y) >= HOOP_AMPLITUDE) {
                this.vel_y = -this.vel_y;
            }


        }
        // Check for swish

        /*
        if (!this.hoop_exit && this.swished) {
            if( this.checkBallRingCollide(ball) ) {
                this.swished = false;
                alert("NO SWISH FOR YOU!");
            }
        }
        */

        //this.pos_x -= SCROLL_SPEED;
        this.rect.x = this.pos_x  + this.offset;
        this.rect_l.x = this.pos_x;
        this.rect_r.x = this.pos_x + this.offset_r;

        this.rect.y = this.pos_y;
        this.rect_l.y = this.pos_y + 10;
        this.rect_r.y = this.pos_y + 10;
    }
    
    checkBallRingCollide(ball) {

        // need bounds here
        // We gave the ball a clearance of 5 units to 'look ahead' for collisions
        // We account for that here
        // to up and right for left right, up and left for right ring
        return  ball.rect.checkCollideClearance(this.rect_l, 6, 0, 6) || ball.rect.checkCollideClearance(this.rect_r, 6, 6, 0);

    }


    
    checkIfBallPassed(ball) {
        if (this.pos_x + this.back_width < ball.pos_x) {
            return true;
        }
        
    
        return false;

    }

    computeSwished(ball) {
        this.swished = !(ball.rect.checkCollide(this.rect_l)) && !(ball.rect.checkCollide(this.rect_r));
    }
    
    drawRect(context) {
        if (DEBUG_MODE) {
           this.rect.draw(context); 
           this.rect_l.draw(context); 
           this.rect_r.draw(context); 
        }
    }

    drawBack(context) {
        context.drawImage(this.img_back, this.pos_x + this.camera_delta, this.pos_y, this.back_width, this.back_height);
         
    }
    
    drawFront(context) {
        context.drawImage(this.img_front, this.pos_x + this.camera_delta, this.pos_y + this.back_height, this.back_width, this.front_height);
      
   
    }


}

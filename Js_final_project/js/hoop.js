class Hoop {

    constructor(x, y, img_back_object, img_front_object) {

        this.context = context;
        this.type = "HORT"
        this.solid = true; // after passing through, the hoop disappears
        
        this.camera_delta = 0;
        this.dirty = false;     // if passed out of view of camera, dirty, no need to consider for updates
        
        this.alpha = 1;
        
        this.pos_x = x
        this.pos_y = y;
        this.vel_y = 0;
        this.moving = false;

        this.orig_y = y;
        this.lim_upper = 100;
        this.lim_lower = 400;

        this.img_back = img_back_object
        this.img_front = img_front_object

        
         
        this.back_width = 120;

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
        this.display_done = false;  // done dislpaying the 'swish' text
        

    }
    
    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect_l.camera_delta = x_delta;
        this.rect_r.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;                
    }
    
    update(ball) {
    
        //slowly fade away passed hoop
        if (this.hoop_exit) {
            this.alpha -= ALPHA_RATE;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.solid = false;
            }
        }
        if (this.moving) {

            this.pos_y += this.vel_y;
                
            
            if (this.pos_y >= this.lim_lower || this.pos_y <= this.lim_upper) {
                this.vel_y = -this.vel_y;
            }


        }
        // Check for swish


        //this.pos_x -= SCROLL_SPEED;
        this.rect.x = this.pos_x  + this.offset;
        this.rect_l.x = this.pos_x;
        this.rect_r.x = this.pos_x + this.offset_r;

        this.rect.y = this.pos_y;
        this.rect_l.y = this.pos_y + 10;
        this.rect_r.y = this.pos_y + 10;
    
        if (!this.swished) {
            this.rect.color = "orange";
        }

    }
    
    checkBallRingCollide(ball) {

        // need bounds here
        // We gave the ball a clearance of 5 units to 'look ahead' for collisions
        // We account for that here
        // to up and right for left right, up and left for right ring
        if (!this.solid) { return false; }
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
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_back, this.pos_x + this.camera_delta, this.pos_y, this.back_width, this.back_height);
        context.globalAlpha = 1;
         
    }
    
    drawFront(context) {
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_front, this.pos_x + this.camera_delta, this.pos_y + this.back_height, this.back_width, this.front_height);
        context.globalAlpha = 1;
   
    }


}

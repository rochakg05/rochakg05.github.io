class VerticalHoop {

    constructor(x, y, img_back_obj, img_front_obj) {

        this.context = context;
        this.type = "VERT"
        this.solid = true; // after passing through, the hoop disappears
        
        this.alpha = 1;
        this.pos_x = x
        this.pos_y = y;
        this.vel_y = 0;
        this.moving = false;

        this.orig_y = y;


        this.img_back = img_back_obj;
        this.img_front = img_front_obj;

        
        // 292 x 32
        // 50 x  
        this.left_height = 120;

        this.left_width = (this.left_height / this.img_back.height) * this.img_back.width;
        this.right_height = (this.left_width / this.img_back.width) * this.img_front.height;
        this.offset = 25;
        this.rect = new Rect(this.pos_x + this.offset, this.pos_y + this.offset, this.left_width,  this.right_height - 50);
        this.offset_r = this.offset + this.rect.w;
        
        // rect upper
        this.rect_l = new Rect(this.pos_x , this.pos_y, this.left_width * 2,  this.offset);
        //rect lower
        this.rect_r = new Rect(this.pos_x , this.rect.y + this.rect.h, this.left_width * 2, this.offset);
  
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
      
        this.rect.x = this.pos_x  + this.offset;
        this.rect_l.x = this.pos_x;
        this.rect_r.x = this.pos_x 
        
        this.rect.y = this.pos_y + this.offset;
        this.rect_l.y = this.pos_y  
        this.rect_r.y = this.rect.y + this.rect.h;
        
        if (!this.swished) {
            this.rect.color = "orange";
        }

        
    }
    
    checkBallRingCollide(ball) {
         if (!this.solid) { return false; }
        return  ball.rect.checkCollideClearance(this.rect_l, 6, 0, 6) || ball.rect.checkCollideClearance(this.rect_r, 6, 6, 0);

    }


   
    checkIfBallPassed(ball) {
        if (this.rect.x + this.rect.w < ball.pos_x) {
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
    
    // left
    drawBack(context) {
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_back, this.pos_x + this.camera_delta, this.pos_y, this.left_width, this.left_height);
        context.globalAlpha = 1;
         
    }
    
    //right
    drawFront(context) {
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_front, this.pos_x + this.left_width +  this.camera_delta, this.pos_y , this.left_width, this.right_height);
        context.globalAlpha = 1;      
   
    }


}

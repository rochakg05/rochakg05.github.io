class Hoop {

    constructor(x, y, img_back_path, img_front_path) {

        this.context = context;
       
        this.pos_x = x
        this.pos_y = y;

        this.img_back = new Image();
        this.img_front = new Image();
        this.img_back.src = img_back_path;
        this.img_front.src = img_front_path;  
        
        // 292 x 32
        // 50 x  
        this.back_width = 100;

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
        

    }
    
    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect_l.camera_delta = x_delta;
        this.rect_r.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;                
    }
    
    update() {
        //this.pos_x -= SCROLL_SPEED;
        this.rect.x = this.pos_x  + this.offset;
        this.rect_l.x = this.pos_x;
        this.rect_r.x = this.pos_x + this.offset_r;
    }
    
    checkBallRingCollide(ball) {
        return ball.rect.checkCollide(this.rect_l) || ball.rect.checkCollide(this.rect_r);

    }

    
    checkIfBallPassed(ball) {
        if (this.pos_x + this.back_width < ball.pos_x) {
            return true;
        }
        
    
        return false;

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

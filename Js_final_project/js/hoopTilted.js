class TiltedHoop {

    constructor(x, y, img_back_img, img_front_img) {

        this.context = context;
        this.type = "TILT"
        this.solid = true; // after passing through, the hoop disappears
                
        this.tilt_angle = TILT_ANGLE;
        this.vel = TILTED_HOOP_VEL;
        
        this.camera_delta = 0;
        this.dirty = false;     // if passed out of view of camera, dirty, no need to consider for updates
        
        this.alpha = 1;
        this.pos_x = x
        this.pos_y = y;
        this.orig_x = x;
        this.orig_y = y;
        this.vel_y = 0;
        this.moving = false;

        //calculate endpoints
        this.hypotenuse = TILTED_HOOP_AMPLITUDE;
        this.endpoint_dx =  this.hypotenuse * Math.cos(this.tilt_angle);
        this.endpoint_dy =  this.hypotenuse * Math.sin(this.tilt_angle);

        

        this.img_back = img_back_img;
        this.img_front = img_front_img;

        
        // 292 x 32
        // 50 x  
        this.back_width = 140;

        this.back_height = (this.back_width / this.img_back.width) * this.img_back.height;
        this.front_height = (this.back_width / this.img_back.width) * this.img_front.height;
        this.image_actual_diff = 17;
        this.offset = 25;
        this.rect = new Rect(this.pos_x + this.offset, this.pos_y + 10 + this.image_actual_diff, this.back_width-50,  this.front_height-this.offset);
        this.offset_r = this.offset + this.rect.w;
        this.rect_l = new Rect(this.pos_x , this.pos_y + 10 + this.image_actual_diff, this.offset,  this.front_height/2);
        this.rect_r = new Rect(this.pos_x , this.pos_y + 10 , this.offset,  this.front_height/2);
  
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

        if (this.moving) {
            //calculate new pos

            var delta_y = Math.sin(this.tilt_angle) * this.vel;
            var delta_x = Math.cos(this.tilt_angle) * this.vel;

            this.pos_y += delta_y;
            this.pos_x += delta_x;
            
            var dx = (this.orig_x - this.pos_x);
            var dy = (this.orig_y - this.pos_y);
            var dist = Math.sqrt(dx*dx + dy*dy);

            if (dist >= TILTED_HOOP_AMPLITUDE) {

                this.vel = -this.vel;   // reverse velocity
            }


        }
        // Check for swish

        if (this.hoop_exit) {
            this.alpha -= ALPHA_RATE;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.solid = false;
            }
        }

        //this.pos_x -= SCROLL_SPEED;
        this.rect.x = this.pos_x  + this.offset;
        this.rect_l.x = this.pos_x;
        this.rect_r.x = this.pos_x + this.offset_r;

        this.rect.y = this.pos_y + this.image_actual_diff;
        this.rect_l.y = this.pos_y + 10 + this.image_actual_diff;
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
           
           //also draw the path line if moving]
           
           if (this.moving) {
            context.beginPath();
            context.moveTo(this.pos_x - this.endpoint_dx, this.pos_y + this.endpoint_dy);
            context.lineTo(this.pos_x + this.endpoint_dx, this.pos_y - this.endpoint_dy);
            context.fill();
           }
           
        }
    }

    drawBack(context) {
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_back, this.pos_x + this.camera_delta, this.pos_y, this.back_width, this.back_height);
        context.globalAlpha = 1;
    }
    
    drawFront(context) {
        context.globalAlpha = this.alpha;
        context.drawImage(this.img_front, this.pos_x + this.camera_delta, this.pos_y + this.back_height - this.image_actual_diff, this.back_width, this.front_height);
        context.globalAlpha = 1;
   
    }


}

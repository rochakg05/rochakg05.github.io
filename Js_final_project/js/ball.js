class Ball {

    constructor(x, y, image_elems, context) {

        this.context = context;
        
        this.image_elems = image_elems;
        this.current_index = -1;
        this.current_image = null;  // set by animation
        
        this.rot_angle = 0;


        this.pos_x = x
        this.pos_y = y;
        this.vel_x = SCROLL_SPEED;
        this.vel_y = 0;

        this.force_y = FORCE_UP;
        this.jump_enabled = true;       // to implement failure when a hoop is missed
        this.img_width = 36;
        this.img_height = this.img_width * this.image_elems[0].height / this.image_elems[0].width;
        this.anim_speed = 200;
        
        this.rect = new Rect(this.pos_x, this.pos_y, this.img_width, this.img_height);
        this.time_1 = null;
        this.time_2 = null;
        
        this.camera_delta = 0;
        
        this.ground_impulse = 0;        // momentum, for bouncing when striking the ground
        this.ground_initial_strike = false;

    }

    start() {
        this.time_1 = new Date();
    }
    
    reset(canvas) {
        this.pos_x = canvas.width/3;
        this.pos_y = 50;
    }
    
    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;
    }

    touchedGround(canvas) {
        return this.pos_y + this.img_height > canvas.height;
    }

    createImages() {

        for (let path of this.img_paths) {
            // note: could also use Image()
            var img_elem = document.createElement("img");
            img_elem.src = path;
            img_elem.style.border = "1px solid black"; 

            this.image_elems.push(img_elem);
        }


    }

    animate() {

        this.current_index += 1;

        if (this.current_index == this.image_elems.length) {
            this.current_index = 0;
        }

        this.current_image = this.image_elems[this.current_index];


        setTimeout(this.animate.bind(this), this.anim_speed);
    }
    
    rollAnimate(context) {
        this.rot_angle += 0.1
        setTimeout(this.rollAnimate.bind(this), 30);
    }
    
    checkXBlocked(hoops) {
        
        var ret_val = false;
        var x_dir = 5;
        if (this.vel_x < 0) {
            x_dir = -5;
        }
        
        this.rect.x += x_dir;
        
        for (let hoop of hoops) {
            if (hoop.checkBallRingCollide(this)) {
                ret_val = true;
                
                if (!hoop.hoop_exit) {
                    hoop.swished = false;
                }
                break;
            }
        }
        
       this.rect.x -= x_dir;
       return ret_val;
    }
    
    checkYBlocked(hoops) {
        
        var ret_val = false;
        var y_dir = 5;
        if (this.vel_y < 0) {
            y_dir = -5;
        }
        
        this.rect.y += y_dir;
        
        for (let hoop of hoops) {
            if (hoop.checkBallRingCollide(this)) {
                ret_val = true;

                // collides -> set swish to false
                if (!hoop.hoop_exit) {
                    hoop.swished = false
                }
                // move along with hoop to give illusion of solidity
                this.pos_y += hoop.vel_y;
                this.rect.y += hoop.vel_y;

                this.vel_y = 0;
                break;
            }
        }
        
       this.rect.y -= y_dir;
       return ret_val;
    }
    
    
    
    move(hoops) {
        
        if (!this.checkXBlocked(hoops)) {
            this.pos_x += this.vel_x;
            this.rect.x = this.pos_x;
        } 

        
        if (!this.checkYBlocked(hoops)) {
            this.pos_y += this.vel_y;
            this.rect.y = this.pos_y;
        } 
        
                //this.pos_x += this.vel_x;
    }
    
    
    applyGravity(ground) {
        var y_dir = 3;
        var ret_val = true;
        
        this.rect.y += y_dir;
        if (this.rect.checkCollide(ground.rect)) {
            ret_val = false;
        }
        this.rect.y -= y_dir;
        
        return ret_val;
    }

    lift() {
        if (this.jump_enabled) {
            /*
            //Don't allow jumping if already ascending
            if (this.vel_y > 0) {
                this.vel_y = -this.force_y;
                return true;
            }
            */
                this.vel_y = -this.force_y;
                return true;
        }
        return false;   // couldn't jump (for audio)
    }
   
   checkGroundCollide(ground) {
        var ret_val = false;
     
        this.rect.y += 3;
        if (this.rect.checkCollide(ground.rect)) {
            ret_val = true;
        }
        this.rect.y -= 3;
        
        return ret_val;
   }
   
   handleGroundCollision() {
      var ret_val = false; //for souynd
     if (!this.ground_initial_strike) {
        this.ground_impulse = this.vel_y * 0.8;
        this.vel_y = 0;


        this.ground_initial_strike = false;
        //this.rollAnimate();
     }
     
     if (this.ground_impulse > 1/8) {
        ret_val = true;
        this.vel_y -= this.ground_impulse;
        this.ground_impulse -= this.ground_impulse/8;
     } 
     
     return ret_val;
     /*else {
        this.vel_x -= 0.01;
        if (this.vel_x <= 0) {
            this.vel_x = 0;
        }
     }
     */
   }
    

    update(hoop_haru, ground) {
        //jump is disable only if the player has failed
        if (!this.jump_enabled) {
            this.vel_x -= 0.005;
            if (this.vel_x <= 0) {
                this.vel_x = 0;
            }
        }
        this.time_2 = new Date();
        var elapsed_millisec = this.time_2 - this.time_1;
        
        
        if (this.applyGravity(ground)) {
            this.vel_y +=  GRAVITY * elapsed_millisec/1000; // v = u + at 
        }
    
        this.move(hoop_haru);
        this.animate();
        


        this.context.drawImage(
            this.current_image, this.pos_x + this.camera_delta, this.pos_y, this.img_width, this.img_height);

        
        this.time_1 = this.time_2;
        
        if (DEBUG_MODE) {
            this.rect.draw(this.context);
        }
    }



}

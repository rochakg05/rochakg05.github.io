class Ball {

    constructor(x, y, image, context) {

        this.context = context;
        
        this.image_elems = [];//image_elems;
        this.current_index = -1;
        
        this.current_image = image;
        
        this.rot_angle = 0;


        this.pos_x = x
        this.pos_y = y;
        this.orig_pos_x = x;
        this.orig_pos_y = y;
        this.vel_x = SCROLL_SPEED;
        this.vel_y = 0;

        this.force_y = FORCE_UP;
        this.jump_enabled = true;       // to implement failure when a hoop is missed
        this.img_width = 36;
        this.img_height = this.img_width * this.current_image.height / this.current_image.width;
        this.anim_speed = 200;
        
        this.rect = new Rect(this.pos_x, this.pos_y, this.img_width, this.img_height);
        this.time_1 = null;
        this.time_2 = null;
        
        this.camera_delta = 0;
        
        this.ground_impulse = 0;        // momentum, for bouncing when striking the ground
        this.ground_initial_strike = false;
        
        this.flaming = false;
        this.flame_level = 1;
        this.particles = [];

    }

    start() {
        this.time_1 = new Date();
    }
    
    reset() {
        this.vel_x = SCROLL_SPEED;
        this.vel_y = 0;
        this.ground_initial_strike = false;
        this.ground_impulse = 0; 
        this.camera_delta = 0;
        this.force_y = FORCE_UP;
        this.jump_enabled = true;  
        this.flaming = false;
        this.flame_level = 1;
        this.particles = [];
        
        this.pos_x = this.orig_pos_x;
        this.pos_y = this.orig_pos_y;
        this.rect.x = this.pos_x;
        this.rect.y = this.pos_y;
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
      var ret_val = false; 
     if (!this.ground_initial_strike) {
        this.ground_impulse = this.vel_y * 0.8;
        this.vel_y = 0;


        this.ground_initial_strike = false;
        
     }
     
     if (this.ground_impulse > 1/8) {
        ret_val = true;
        this.vel_y -= this.ground_impulse;
        this.ground_impulse -= this.ground_impulse/8;
     } 
     
     return ret_val;
     
   }
   
   deccelerate() {
        this.vel_x -= this.vel_x/80;
        if (this.vel_x <= 1/16) {
            this.vel_x = 0;
        }
   }
   
   drawFire(context) {
        var i;
        var max = 60;
        
        var r = 260;
        var g = 50;
        
        if (this.flame_level === 1) {
            r = 20;
            g = 20;
        } else if (this.flame_level === 2) {
            r = 255;
            g = 255;
        } else if (this.flame_level >= 3) {
            r = 260;
            g = 50;
        } else if (this.flame_level >= 4) {
            r = 270;
            g = 120;
        }

          for (i=0; i<this.particles.length; i++) {
            
            //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
            context.fillStyle = "rgba("+(r-(this.particles[i].life*2))+","+((this.particles[i].life*2)+g)+","+(this.particles[i].life*2)+","+(((max-this.particles[i].life)/max)*0.4)+")";
            
            context.beginPath();
            //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
            context.arc(this.camera_delta + this.particles[i].x,this.particles[i].y,(max-this.particles[i].life)/max*(PSIZE/2)+(PSIZE/2),0,2*Math.PI);
            context.fill();
            
            //Move the particle based on its horizontal and vertical speeds
            this.particles[i].x+=this.particles[i].xs;
            this.particles[i].y+=this.particles[i].ys;
            
            this.particles[i].life++;
            //If the particle has lived longer than we are allowing, remove it from the array.
            if (this.particles[i].life >= max) {
              this.particles.splice(i, 1);
              i--;
            }
        }
   }
    

    update(hoop_haru, ground) {
        //jump is disable only if the player has failed
        if (!this.jump_enabled) {
            this.deccelerate();
   
        }
        this.time_2 = new Date();
        var elapsed_millisec = this.time_2 - this.time_1;
        
        
        if (this.applyGravity(ground)) {
            this.vel_y +=  GRAVITY * elapsed_millisec/1000; // v = u + at 
        }
    
        this.move(hoop_haru);
        
        
        
        // flame handling 
        if (this.flaming) {
              for (var i=0; i<2; i++) {
                //Adds a particle at the mouse position, with random horizontal and vertical speeds
                var p = new Particle(this.pos_x, this.pos_y, (Math.random()*2*PSPEED-PSPEED)/2, 0-Math.random()*2*PSPEED);
                this.particles.push(p);
            }
            this.drawFire(context);
        } else {
            this.particles = [];    // remove old particles
        }
        
        
        
        

        this.context.drawImage(
            this.current_image, this.pos_x + this.camera_delta, this.pos_y, this.img_width, this.img_height);

        
        this.time_1 = this.time_2;
        
        if (DEBUG_MODE) {
            this.rect.draw(this.context);
        }
    }


}

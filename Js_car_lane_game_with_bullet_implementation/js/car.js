class Car {
    
    constructor(lane_index, lanes) {
        this.lane_index = lane_index;
        this.lanes_array = lanes;
        this.cur_lane = this.lanes_array[this.lane_index];

        this.pos_x = -1;
        this.pos_y = this.cur_lane.pos_y;
        
        this.setPosFromLane();
        

        this.vel_y = 0;
        
        this.image = new Image();
        this.image.src = PATH_CAR_YELLOW_IMG;
        this.img_width = CAR_WIDTH;
        this.img_height = (this.img_width / this.image.width) * this.image.height;

        this.collide_rect = new Rect(this.pos_x, this.pos_y, this.img_width, this.img_height);
        this.debug_draw = false;

        this.health = 2;
        this.ammo = 20;


    }

    setPosFromLane() {
        this.pos_x = this.cur_lane.pos_x + this.cur_lane.image.width/2;
        //this.pos_y = this.cur_lane.pos_y;

    }

    setLane(lane_index) {
        this.lane_index = lane_index;
        this.cur_lane = this.lanes_array[this.lane_index];
    }

    checkCollide(otherCar) {

        var rect1 = this.collide_rect;
        var rect2 = otherCar.collide_rect;

        var cond1 = rect1.x < rect2.x + rect2.w;
        var cond2 = rect1.x + rect1.w > rect2.x;
        var cond3 = rect1.y < rect2.y + rect2.h;
        var cond4 = rect1.y + rect1.h > rect2.y;

        return cond1 && cond2 && cond3 && cond4;
    }

    checkBulletCollide(bullet) {

        var y_car_bot = this.pos_y + this.img_height;
        var y_bullet = bullet.pos_y + bullet.radius;

        var cond1 = y_bullet <= y_car_bot; 
        var cond2 =  (bullet.pos_x > this.pos_x && bullet.pos_x < this.pos_x + this.img_width);

        return cond1 && cond2;
    }

    handleItemCollide(item) {
        if (this.checkCollide(item))  {
            console.log(`collide with ${item.type}`);
            
            if (item.type === "ammo") {
                this.ammo += 100;
                item.marked = true;
            }
        }

    }

    shoot(bullet_list) {

        if (this.ammo <= 0) {
            return;
        }
        
        //if (this.can_shoot) {
        var b = new Bullet(this.pos_x + this.img_width/2, this.pos_y, CAR_SPEED + 5);
        bullet_list.push(b);
        this.ammo -= 1;

        //}
    }

    moveLeft(enem_cars) {

        var old_ind = this.lane_index;

        this.lane_index -= 1;
        if (this.lane_index == -1) {
            this.lane_index = 0;
        }

        this.setLane(this.lane_index);
        this.setPosFromLane();

        if (old_ind == this.lane_index) {
            return 0;
        }
        return this.calculateScoreIncrement(enem_cars, old_ind);
    }

    moveRight(enem_cars) {
        
        var old_ind = this.lane_index;
        
        this.lane_index += 1;
        if (this.lane_index == this.lanes_array.length) {
            this.lane_index = this.lanes_array.length-1;
        }

        this.setLane(this.lane_index);
        this.setPosFromLane();

        if (old_ind == this.lane_index) {
            return 0;
        }

        return this.calculateScoreIncrement(enem_cars, old_ind);

    }
    
    // increase score if there was a car in the old lane
    calculateScoreIncrement(enem_cars, old_lane_index) {

        var same_lane_cars = enem_cars.filter( car => car.lane_index == old_lane_index );

        if (same_lane_cars.length == 0) {
            return 0;
        }

        // choose the first car;
        // in the future, choose closest car in same lane ( may have multiple enemy cars )
        var nearest = same_lane_cars[0]; 
        var factor = 1 / (this.pos_y - nearest.pos_y);

        return factor.toFixed(5) * SCORE_INC;
    }

    update() {
        this.pos_y +=  this.vel_y;

        this.collide_rect.x = this.pos_x;
        this.collide_rect.y = this.pos_y;
    }

    draw(context) {

        context.drawImage(this.image, this.pos_x, this.pos_y,
            this.img_width, this.img_height);
        
       
        if (this.debug_draw) {
            this.collide_rect.draw(context);
        }
        
    }

}

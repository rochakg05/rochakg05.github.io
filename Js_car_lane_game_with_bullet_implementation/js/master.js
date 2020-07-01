class EnemTracker {
    constructor(lanes_array, canvas) {
        this.lanes_array = lanes_array;
        this.canvas = canvas;

        this.enem_cars = [];
        this.items = [];
        this.image_paths = [PATH_CAR_RED_REV_IMG, PATH_CAR_YELLOW_REV_IMG, PATH_CAR_BLUE_REV_IMG];

        
    
        this.ammo_generated = false;

        this.time_1 = 1000;
        this.time_2 = 4000;

    }

    start() {
        var num = Math.random() * 1000 + 1000; 
        setTimeout(this.generateRandomEnem.bind(this), num);

    }

    cleanUp(canvas) {

        // check if car is outside bounds
        for (let car of this.enem_cars) {
            
            if (car.pos_y > canvas.height) {
                var ind = this.enem_cars.indexOf(car);
                delete this.enem_cars[ind];
                this.enem_cars.splice(ind, 1);
            }
        }


        for (let item of this.items) {
            if (item.marked || item.pos_y > canvas.height) {
                var ind = this.items.indexOf(item);
                delete this.items[ind];
                this.items.splice(ind, 1);

            }
        }


    }

    areLanesFull() {
        
        var lane_car_count = [];
        for (var i = 0; i < this.lanes_array.length; i++) {
            lane_car_count.push(0);
        }

        for (let car of this.enem_cars) {
            lane_car_count[car.lane_index] += 1;
        }

        for (var i = 0; i < lane_car_count.length; i++) {
            if (lane_car_count[i] == 0) {
                return false;
            }
        }

        return true;   
    }

    update(playerCar) {
        if (playerCar.ammo == 0) {

            if (!this.ammo_generated) {
                this.ammo_generated = true;
                var num = Math.random() * 9000 + 3000;
                setTimeout(this.generateAmmoBox.bind(this), num);
            }
        } else {
            this.ammo_generated = false;
        }

    }

    generateAmmoBox() {

        // if already exists, quit
        if (this.items.length >= 1) {
            return;
        }



        var random_ind = Math.floor(Math.random() * this.lanes_array.length);
        var random_lane = this.lanes_array[random_ind];

        var x = random_lane.pos_x + random_lane.image.width/2;
        var y = random_lane.pos_y;
        var item = new Item(x, y, "ammo", "res/ammo_small.png");
        item.vel_y = CAR_SPEED;

        this.items.push(item);

        this.ammo_generated = false;

    }

    generateRandomEnem() {

        // quit if only one empty lane left
        if (this.areLanesFull()) {
            return;
        }

        console.log(this.lanes_array);
        console.log(this.enem_cars);
        console.log(this.image_paths);
        
        var random_ind = Math.floor(Math.random() * this.lanes_array.length);
        var random_lane = this.lanes_array[random_ind];
        var random_img = this.image_paths[ Math.floor(Math.random() * this.image_paths.length) ];

        var new_car = new  Car(random_ind, this.lanes_array);
        new_car.image.src = random_img;

        new_car.vel_y = CAR_SPEED;

        this.enem_cars.push(new_car);
        
        var num = Math.random() * this.time_2 + this.time_1;
        setTimeout(this.generateRandomEnem.bind(this), num);

    }

}

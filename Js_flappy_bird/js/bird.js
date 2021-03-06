class Bird {

    constructor(x, y, img_path, img_filenames, context) {
        this.img_paths = img_filenames.map( (fname) => img_path + fname );
        this.context = context;
        
        this.image_elems = []
        this.current_index = -1;
        this.current_image = null;  // set by animation

        this.createImages();

        this.pos_x = x
        this.pos_y = y;
        this.vel_x = 5;
        this.vel_y = 0;

        this.force_y = FORCE_UP;
        this.img_width = 50;
        this.img_height = this.img_width * this.image_elems[0].height / this.image_elems[0].width;
        this.anim_speed = 200;
        
        this.rect = new Rect(this.pos_x, this.pos_y, this.img_width, this.img_height);
        this.time_1 = null;
        this.time_2 = null;
    }

    start() {
        this.time_1 = new Date();
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

    move() {
        this.pos_y += this.vel_y;
        this.rect.y = this.pos_y;

                //this.pos_x += this.vel_x;
    }

    lift() {
        this.vel_y = -this.force_y;
    }

    update() {
        this.time_2 = new Date();
        var elapsed_millisec = this.time_2 - this.time_1;
        this.vel_y +=  GRAVITY * elapsed_millisec/1000; // v = u + at 


        this.move();
        this.animate();
        this.context.drawImage(
            this.current_image, this.pos_x, this.pos_y, this.img_width, this.img_height);

        this.time_1 = this.time_2;
        
        if (DEBUG_MODE) {
            this.rect.draw(this.context);
        }
    }



}

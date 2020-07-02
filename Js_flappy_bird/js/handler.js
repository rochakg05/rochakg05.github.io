class Handler {

    constructor(canvas) {
        this.canvas = canvas;
        this.pipes = [];

        this.time_1 = null;
        this.time_2 = null;
        this.random_interval = null;
    }

    start() {
        this.time_1 = new Date();
        this.random_interval = Math.random() * 3000 + 1000;
    }

    cleanup() {
        for (let pair of this.pipes) {
            if (pair.pos_x + pair.img_width < 0) {
                var index = this.pipes.indexOf(pair);
                this.pipes.splice(index, 1);

            }

        }
    }

    update() {

        this.time_2 = new Date();

        if (this.time_2 - this.time_1 >= this.random_interval) {
            // random y between -200 and 0
            var random_y = Math.floor( Math.random() * (-220) + 0);

            //random gap 
            var random_gap = Math.floor( Math.random() * (GAP_MAX - GAP_MIN) + GAP_MIN);

            var pipe = new PipePair(this.canvas.width + 10, random_y, random_gap);
            this.pipes.push(pipe);
            
            this.time_1 = this.time_2;
            this.random_interval = Math.random() * 3000 + 2000;
        }

    }


}

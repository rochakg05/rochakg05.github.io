class Generator {
    
    constructor() {
    
        this.min_y = 150;
        this.max_y = 400;
    }
    
    generate(ball_x, canvas, last_x) {
        

        var random_y = Math.random() * (this.max_y - this.min_y) + this.min_y;
        var random_x = last_x + Math.random() * 120 + 200;   // 200 to 250
        return new Hoop(random_x, random_y, hoop_hort_back_img, hoop_hort_front_img);
    }



}

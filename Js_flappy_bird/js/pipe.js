class PipePair {
    constructor(pos_x, pos_y, gap) {

        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.x_vel = SCROLL_SPEED;
        this.gap = gap;
        this.image_top = new Image();
        this.image_top.src = "res/pipe_down.png";
        this.image_bot = new Image();
        this.image_bot.src = "res/pipe_up.png";
        
        this.img_width = PIPE_WIDTH;
        this.img_height = ( PIPE_WIDTH / this.image_top.width) * this.image_top.height;

        this.rect1 = new Rect(this.pos_x, this.pos_y, this.img_width, this.img_height);
        this.rect2 = new Rect(this.pos_x, this.pos_y + this.img_height + gap, this.img_width, this.img_height);
        this.rect2.color = 'red';

        this.rect_gap = new Rect(this.pos_x, this.pos_y + this.img_height, this.img_width, this.gap);
        this.rect_gap.color = 'blue';


        this.passed = false;    // not passed by the bird
    }

    update() {
        this.pos_x -= SCROLL_SPEED;
        this.rect1.x = this.pos_x;
        this.rect2.x = this.pos_x;
        this.rect_gap.x = this.pos_x;

    }


    draw(context) {
        context.drawImage(this.image_top, this.pos_x, this.pos_y, this.img_width, this.img_height);
        context.drawImage(this.image_bot, this.pos_x, this.pos_y + this.img_height + this.gap, this.img_width, this.img_height);

        if (DEBUG_MODE) {
            this.rect1.draw(context);
            this.rect2.draw(context);
            this.rect_gap.draw(context);
        }
    }

}

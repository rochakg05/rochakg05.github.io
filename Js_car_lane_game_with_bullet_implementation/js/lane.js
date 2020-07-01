class Lane {
    constructor(pos_x, pos_y) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.image = new Image();
        this.image.src = PATH_LANE_IMG;

        this.sep_image = new Image();
        this.sep_image.src = PATH_SEP_IMG;

        this.border_left = false;
        this.border_right = false;
    }

    draw(context) {
        context.drawImage(this.image, this.pos_x, this.pos_y);
    }

    drawBorderRight(context) {

        if (this.border_right) {
            context.drawImage(this.sep_image, this.pos_x + this.image.width, this.pos_y);
        }
    }

    drawBorderLeft(context) {

        if (this.border_left) {
            context.drawImage(this.sep_image, this.pos_x, this.pos_y);
        }

    }

}

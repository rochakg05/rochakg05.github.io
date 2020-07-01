class Item {
    
    constructor(pos_x, pos_y, type, img_path) {
        this.pos_x  = pos_x;
        this.pos_y = pos_y;
        this.vel_y = 0;
        this.type = type;
        this.img_path = img_path;

        this.image = new Image();
        this.image.src = this.img_path;
        this.collide_rect = new Rect(pos_x, pos_y, this.image.width, this.image.height);

        this.marked = false; // marked for removal
    }

    update() {
        this.pos_y += this.vel_y;
        this.collide_rect.x = this.pos_x;
        this.collide_rect.y = this.pos_y;
    }

    draw(context) {
        context.drawImage(this.image, this.pos_x, this.pos_y);

        //this.collide_rect.draw(context);
    }


}

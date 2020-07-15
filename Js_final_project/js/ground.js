class Ground {
    
    constructor(y_offset, canvas) {
        this.y_offset = y_offset;
        this.pos_x = 0;
        this.pos_y = canvas.height - y_offset;
        this.width = canvas.width;
        this.height = y_offset;
        
        this.camera_delta = 0;

        this.rect = new Rect(this.pos_x, this.pos_y, this.width, this.height);
    }

    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;
    }
    update(ball) {
        this.pos_x = ball.pos_x - canvas.width/CAMERA_FRACTION;
        this.rect.x = this.pos_x;
    }
    
    drawBlack(context) {
        context.fillStyle = "black";
        context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }
    draw(context) {
        this.rect.draw(context);
    }


}

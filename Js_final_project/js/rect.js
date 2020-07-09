class Rect {
    
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = 'green';
        this.camera_delta = 0;
    }

    checkCollide(otherRect) {

        var rect1 = this;
        var rect2 = otherRect;

        var cond1 = rect1.x < rect2.x + rect2.w;
        var cond2 = rect1.x + rect1.w > rect2.x;
        var cond3 = rect1.y < rect2.y + rect2.h;
        var cond4 = rect1.y + rect1.h > rect2.y;

        return cond1 && cond2 && cond3 && cond4;
    }
    


    draw(context) {
        context.strokeStyle = this.color;
        context.strokeRect(this.x + this.camera_delta, this.y, this.w, this.h);
    }

}

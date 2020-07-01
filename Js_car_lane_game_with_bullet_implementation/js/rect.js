class Rect {
    constructor(x, y, w, h) {
        // x, y is top left corner
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = "#00FF00";
    }

    draw(context) {
        context.strokeStyle = this.color;
        context.strokeRect(this.x, this.y, this.w, this.h);
    }

}



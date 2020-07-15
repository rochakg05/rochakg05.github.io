class Button {
    constructor(pos_x, pos_y, text, callback) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.text = text;
        this.callback = callback;

        this.w = 150;
        this.h = 50;
        this.enabled = true;
    }

    buttonClicked(norm_x, norm_y) {

        if (!this.enabled) {
            return false;
        }
        // mouse pos relative to canvas topleft 
        
        var cond1 = norm_x > this.pos_x;
        var cond2 = norm_x < this.pos_x + this.w;
        var cond3 = norm_y > this.pos_y;
        var cond4 = norm_y < this.pos_y + this.h

        return cond1 && cond2 && cond3 && cond4;
    }

    draw(context) {
        context.fillStyle = "blue";
        context.fillRect(this.pos_x, this.pos_y, this.w, this.h);

        context.fillStyle = "red";
        context.font = "bold 14px Arial";
        context.fillText(this.text, this.pos_x +  this.w/4, this.pos_y + this.h/2);

    }

}

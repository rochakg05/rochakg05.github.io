class Button {
    constructor(pos_x, pos_y, text, callback) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.text = text;
        this.callback = callback;

        this.w = 150;
        this.h = 50;
        this.enabled = true;
        this.gradient = null;

        this.textcolor = "green";
        
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
        if (this.gradient == null) {
            this.gradient = context.createLinearGradient(this.pos_x, this.pos_y, this.pos_x + this.w, this.pos_y + this.h);
            this.gradient.addColorStop(0, '#2A94D5');
            this.gradient.addColorStop(1, '#1A6899');
        }
        context.fillStyle = this.gradient;//"blue";
        context.fillRect(this.pos_x, this.pos_y, this.w, this.h);

        context.fillStyle = this.textcolor;
        context.font = "bold 14px Arial";
        context.fillText(this.text, this.pos_x +  this.w/5, this.pos_y + this.h/2);

    }

}

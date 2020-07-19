class BlinkText {
    
    constructor(x, y, text, r, g, b) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.r = r; this.g = g; this.b = b;
        this.alpha = 0;
        this.alpha_dir = 1;
        this.enabled = false;
        
    }
    
    enable() {
        this.enabled = true;
    }
    draw(context) {
    
        if (!this.enabled) {
            return;
        }
        
        if (this.alpha < 0 || this.alpha > 1) {
            this.alpha_dir = -this.alpha_dir;
        }

        
        context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
        context.font = "italic bold 24pt Arial";
        context.fillText(this.text, this.x, this.y);
        this.alpha += this.alpha_dir * 0.05; // decrease opacity (fade out)
    
    } 
    
}

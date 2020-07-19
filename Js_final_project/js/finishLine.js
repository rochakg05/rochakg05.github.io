class FinishLine {

    constructor(x, y, img_path) {

       
        this.pos_x = x
        this.pos_y = y;
        
        this.image = new Image();
        this.image.src = img_path;
        
         
        this.img_width = 80;
        this.img_height = (this.img_width/ this.image.width) * this.image.height;
        this.rect = new Rect(this.pos_x , this.pos_y , this.img_width,  this.img_height);
        this.rect.color = "orange";
        
    }

    checkFinished(player) {
        return player.rect.checkCollide(this.rect);
    }
    
    cameraShift(x_delta) {
        this.camera_delta = x_delta;
        this.rect.camera_delta = x_delta;                
    }
    
    
    draw(canvas, context) {
        // repeat finish line image as needed to fill up whole height
        var numHeightsNeeded = Math.ceil(canvas.height / this.img_height);
        var offset = 0;
        for (var i = 0; i < numHeightsNeeded; i++) {
            context.drawImage(this.image, this.pos_x + this.camera_delta, offset + this.pos_y, this.img_width, this.img_height);
            offset += this.img_height;
        }
        this.rect.h = this.img_height + offset;
        
        this.rect.draw(context);
        
   
    }


}

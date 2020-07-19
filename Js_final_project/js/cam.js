class Camera {
    
    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;
        this.shift_x = 0;
        this.threshold = canvas.width/CAMERA_FRACTION;
    }
    
    update() {
    
        var cond = (this.player.pos_x < this.threshold);

        if (cond) {
            return;
        }

        this.shift_x +=  -this.player.vel_x;
    }
    
    applyCamera(object) {

        object.cameraShift(this.shift_x);
    }
    
    

}

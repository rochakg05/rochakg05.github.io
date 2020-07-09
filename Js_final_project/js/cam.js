class Camera {
    
    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;
        this.shift_x = 0;
    }
    
    update() {
        //console.log(this.player.pos_x);
        var cond = (this.player.pos_x < canvas.width/3);

        if (cond) {
            return;
        }

        this.shift_x +=  -this.player.vel_x;
    }
    
    applyCamera(object) {

        object.cameraShift(this.shift_x);
    }
    
    

}

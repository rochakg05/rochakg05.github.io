class Bullet {

    constructor(pos_x, pos_y, speed) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.radius = 10;
        this.vel_y = speed;
    }

    update() {
        this.pos_y -= this.vel_y;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos_x, this.pos_y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

}

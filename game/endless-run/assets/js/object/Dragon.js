// Draw Dragon object.

class Dragon{
    constructor(){
        this.img = new Image();
        this.img.src = 'assets/img/dragon.png';

        this.y = 150;
        this.x = 80;
        this.size = 130;

        // Sprite frame setting
        this.shiftX = 0;
        this.shiftY = 0;
        this.currentFrame = 0;
        this.totalFrame = 6;
        this.frame = 0;
    }

    update(){
        // Dragon slide down due to gravity
        this.y += GRAVITY;
        if(this.y >= 400){
            this.y = 400;
        }else if(this.y <= 40){
            this.y = 40;
        }

        if(this.frame % 3 == 0){
            this.shiftX += 256;
            this.currentFrame++;

            if(this.currentFrame == this.totalFrame){
                this.shiftX = 0;
                this.currentFrame = 0;

                if(this.shiftY == 0){
                    this.shiftY = 256;
                }else{
                    this.shiftY = 0;
                }
            }
        }
        this.frame++;
    }

    draw(){
        this.update();

        ctx.beginPath();
        ctx.drawImage(this.img, this.shiftX, this.shiftY, 256, 256, this.x, this.y, 130, 130);
        ctx.closePath();
    }
}
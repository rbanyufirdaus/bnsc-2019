//Draw Coin Objecr
class Coin{
    constructor(){
        this.img = new Image();
        this.img.src = 'assets/img/spinning_coin_gold.png';

        this.shiftX = 0;
        this.shiftY = 0;
        this.currentFrame = 0;
        this.totalFrame = 8;
        this.frame = 0;

        this.list = [];

        this.colRow = 3;
        this.gap = 35;

    }

    generate(startX, startY){
        this.list = [];

        for(let i = 0; i < this.colRow; i++){
            for(let j = 0; j < this.colRow; j++){
                this.list.push({
                    x : startX + (this.gap * j),
                    y : startY + (this.gap * i)
                });
            }
        }
    }

    update(){
        for(let i = 0; i < this.list.length; i++){
            this.list[i].x -= SPEED.bgFront;
        }

        if(this.frame % 3 == 0){
            this.shiftX += 32;
            this.currentFrame++;

            if(this.currentFrame == this.totalFrame){
                this.shiftX = 0;
                this.currentFrame = 0;
            }
        }
        this.frame++;
    }

    draw(){
        this.update();

        ctx.beginPath();
        for(let i = 0; i < this.list.length; i++) {
            ctx.drawImage(this.img, this.shiftX, this.shiftY, 32, 32, this.list[i].x, this.list[i].y, 27, 27);
        }
        ctx.closePath();
    }
}
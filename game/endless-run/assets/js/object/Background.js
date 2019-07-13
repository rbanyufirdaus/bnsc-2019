class Background{
    constructor(speed, imgStr){
        this.img = [];
        for(let i = 0; i < imgStr.length; i++){
            this.img[i] = new Image();
            this.img[i].src = imgStr[i];
        }

        this.speed = speed;
        this.limit = this.img.length;

        this.x = 0;

        this.list = [
            { x : 0, y : 0},
            { x : WIDTH, y : 0},
            { x : WIDTH*2, y : 0},
            { x : WIDTH*3, y : 0}
        ];
    }

    update(){
        for(let i = 0; i < this.img.length; i++){
            this.list[i].x -= this.speed;
            if(this.list[i].x < - (WIDTH*2) && this.limit == 3){
                this.reset();
            }else if(this.list[i].x < - (WIDTH*3) && this.limit == 4){
                this.reset();
            }
        }
    }

    draw(){
        this.update();

        ctx.beginPath();
        for(let i = 0; i < this.img.length; i++){
            ctx.drawImage(this.img[i], this.list[i].x, this.list[i].y, WIDTH, HEIGHT);
        }
        ctx.closePath();
    }

    reset(){
        this.list = [
            { x : 0, y : 0},
            { x : WIDTH, y : 0},
            { x : WIDTH*2, y : 0},
            { x : WIDTH*3, y : 0}
        ];
    }


}
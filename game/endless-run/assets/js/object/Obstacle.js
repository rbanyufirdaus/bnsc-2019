//Draw Obstacle Object
class Obstacle{
    constructor(){
        this.list = [];

        this.height = 130;
        this.width = 66;
        this.gap = 35;
    }

    generate(x, top){
        let image = new Image();
        let imgSrc = [];

        if(top){
            imgSrc = ['assets/img/obstacle/obs_top_A.png', 'assets/img/obstacle/obs_top_B.png'];
            image.src = imgSrc[Math.floor(Math.random() * 2)];

            this.list.push({
                x : x,
                y: 40,
                touched : false,
                img : image
            });
        }else{
            imgSrc = ['assets/img/obstacle/obs_btm_A.png', 'assets/img/obstacle/obs_btm_B.png'];
            image.src = imgSrc[Math.floor(Math.random() * 2)];

            this.list.push({
                x : x,
                y: HEIGHT - 280,
                touched : false,
                img : image
            });
        }
    }

    update(){
        for(let i = 0; i < this.list.length; i++){
            this.list[i].x -= SPEED.bgFront;

            if(this.list[i].x <= 0){
                this.list.splice(i, 1);
            }
        }
    }

    draw(){
        this.update();

        ctx.beginPath();
        for(let i = 0; i < this.list.length; i++) {
            ctx.drawImage(this.list[i].img, this.list[i].x, this.list[i].y, 66, 160);
        }
        ctx.closePath();
    }
}
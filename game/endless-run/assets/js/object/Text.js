// Draw Text
class Text{
    constructor(x, y, text){
        this.x = x;
        this.y = y;

        this.text = text;
    }

    update(text){
        this.text = text;
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = "#fff";
        ctx.font = "25px Arial";
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}
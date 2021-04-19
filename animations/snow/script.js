const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let snowflakes = [], showColor = true;
const showColorChange = () => {
	showColor = !showColor;
};
addEventListener("click", showColorChange);
addEventListener("touchend", showColorChange);
class Snowflake {
	constructor (canvas, ctx, showColor = false) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.size = Math.random()*3;
		this.y = -this.size;
		this.x = Math.random()*this.canvas.width;
		this.showColor = showColor;
		if (this.showColor) this.rgb = [255/2, 255/2, 255/2];
		else this.rgb = [255, 255, 255];
	}
	move () {
		this.size += this.random(1);
		this.y += this.random(3, 0);
		this.x += this.random(2);
		if (this.showColor) {
			for (let i = 0;i < this.rgb.length;i++) {
				this.rgb[i] += this.random(50);
				if (this.rgb[i] < 0) this.rgb[i] = 0;
				else if (this.rgb[i] > 255) this.rgb[i] = 255;
			}
		}else {
			this.rgb = [255, 255, 255];
		}
		if (this.y > this.canvas.height+this.size) this.y = -this.size;

		if (this.size < 0) this.size = -this.size;
		if (this.size > 2) this.size = 2;
	}
	draw () {
		this.ctx.beginPath();
		this.ctx.fillStyle = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
		this.ctx.strokeStyle = `rgb(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]})`;
		this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
		this.ctx.fill();
	}
	random (num1 = 1, num2 = num1/2) {
		return Math.random()*num1*2-num2*2;
	}
}
setInterval(() => {
	for (let i = 0; i < Math.floor(Math.random()*10);i++) {
		if (!(snowflakes.length > 1000 || snowflakes.length > canvas.width*canvas.height/100)) snowflakes.push(new Snowflake(canvas, ctx));
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let snowflake of snowflakes) {
		snowflake.showColor = showColor;
		snowflake.move();
		snowflake.draw();
	}
	if (canvas.width != innerWidth) canvas.width = innerWidth;
	if (canvas.height != innerHeight) canvas.height = innerHeight;
}, 60);
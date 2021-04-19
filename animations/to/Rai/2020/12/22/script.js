Element.prototype.fadeOut = function (ms = 10, start = null) {
	this.style.opacity = start == null ? 1 : start;
	const i = setInterval(() => {
		if (this.style.opacity > 0) this.style.opacity -= 0.01;
		else clearInterval(i);
	}, ms);
}
Element.prototype.fadeIn = function (ms = 10, start = null) {
	this.style.opacity = start == null ? 0 : start;
	const i = setInterval(() => {
		if (this.style.opacity < 1) this.style.opacity += 0.01;
		else clearInterval(i);
	}, ms);
}
const start = () => {
	document.body.requestFullscreen();
	document.getElementById("start").fadeOut(10, 1);
	setTimeout(() => {
		document.getElementById("start").style.zIndex = "0";
		let i = 0, startedI = false;
		setInterval(() => {
			document.querySelector("#animation h1").style.background = `linear-gradient(to right, white 0%, black ${i}%)`;
			if (i >= 30 && !startedI) {
				startedI = true;
				let i2 = 0, startedI2 = false;
				setInterval(() => {
					document.getElementById("rai").style.background = `linear-gradient(to right, white 0%, black ${i2}%)`;
					i2++;
					if (i2 >= 100 && !startedI2) {
						startedI2 = true;
						let i3 = 0;
						setInterval(() => {
							document.getElementById("from").style.background = `linear-gradient(to right, white 0%, black ${i3}%)`;
							i3++;
						}, 50);
					}
				}, 50);
			}
			i++;
		}, 50);
		class Snowflake {
			constructor (canvas, ctx) {
				this.canvas = canvas;
				this.ctx = ctx;
				this.size = Math.random()*3;
				this.y = -this.size;
				// this.y = 0;
				this.x = Math.random()*this.canvas.width;
				this.rgb = [255/2, 255/2, 255/2];
			}
			move () {
				this.size += this.random(1);
				this.y += this.random(3, 0);
				this.x += this.random(2);
				for (let i = 0;i < this.rgb.length;i++) {
					this.rgb[i] += this.random(50);
					if (this.rgb[i] < 0) this.rgb[i] = 0;
					else if (this.rgb[i] > 255) this.rgb[i] = 255;
				}
				if (this.y > this.canvas.height+this.size) this.y = -this.size;

				if (this.size < 0) this.size = -this.size;
				if (this.size > 3) this.size = 3;
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
		const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		let snowflakes = [];
		setInterval(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0;i < Math.random()*10;i++) {
				if (!(snowflakes.length > canvas.height*canvas.width/100 || snowflakes.length > 1000)) snowflakes.push(new Snowflake(canvas, ctx));
			}
			for (let snowflake of snowflakes) {
				snowflake.move();
				snowflake.draw();
			}
		}, 30);
	}, 10*100);
}
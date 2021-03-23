const pong = c => {
	class State {
		constructor (canvas, ctx, balls = [], players = [], colorSchemeDark, done = false, playing = true) {
			this.canvas = canvas;
			this.ctx = ctx;
			this.balls = balls;
			this.players = players;
			this.colorSchemeDark = colorSchemeDark;
			this.done = done;
			this.playing = playing;
		}
		next () {
			if (!this.done) {
				const next = new State(this.canvas, this.ctx, this.balls, this.players, this.colorSchemeDark, this.done, this.playing);
				for (const ball of next.balls) {
					ball.colorSchemeDark = next.colorSchemeDark;

					ball.move();

					const player1 = next.players[0];
					const player2 = next.players[1];
					// Check if ball is touching paddle
					if (ball.x <= player1.x+player1.w && ball.x >= player1.x && ball.y >= player1.y-player1.h/2 && ball.y <= player1.y+player1.h/2 || ball.x >= player2.x-player2.w && ball.x <= player2.x && ball.y >= player2.y-player2.h/2 && ball.y <= player2.y+player2.h/2) {
						ball.xv = -ball.xv;
						ball.x = ball.x < next.canvas.width/2 ? player1.x+player1.w : player2.x-player2.w;
					}

					// Check to see if ball scored
					if (ball.x <= next.players[0].x) {
						next.players[1].score++;
						ball.x = next.canvas.width/2-ball.size;
						ball.y = next.canvas.height/2-ball.size;
						ball.xv = Ball.randomV();
						ball.yv = Ball.randomV();
					} else if (ball.x >= next.players[1].x) {
						next.players[0].score++;
						ball.x = next.canvas.width/2-ball.size;
						ball.y = next.canvas.height/2-ball.size;
						ball.xv = Ball.randomV();
						ball.yv = Ball.randomV();
					}
				}
				for (const player of next.players) {
					player.colorSchemeDark = next.colorSchemeDark;
					player.state = next;
					player.move();
				}
				next.players[1].x = canvas.width-canvas.width/100*5;

				return next;
			}
			return this;
		}
		
		draw () {
			// Background is canvas background-color
			
			// Dotted line in center
			this.ctx.fillStyle = this.colorSchemeDark ? "white" : "black";
			for (let i = -21.5; i < this.canvas.height; i+= 20) {
				this.ctx.fillRect(this.canvas.width/2-2.5, i, 5, 10);
			}

			// Draw ball
			for (const ball of this.balls) {
				ball.draw();
			}

			// Draw players
			for (const player of this.players) {
				player.draw();

				// Check to see if player has won
				if (player.score >= 10) return this.gameOver(player);
			}
		}
		gameOver (player) {
			document.getElementById("pause-text-inner").innerHTML = `You ${player.computer ? "lose." : "win!"}<br/>Score: ${this.players[0].score} - ${this.players[1].score}<br/><br/><p id="reload">Click/Tap to reload.</p>`;
			addEventListener("click", () => location.reload());
			addEventListener("touchend", () => location.reload());
			document.getElementById("pause-text").style.backgroundColor = bgColor;
			document.getElementById("pause-text").style.color = textColor;
			return this.done = true;
		}
	}
	class Ball {
		constructor(canvas, ctx, size, x, y, xv = 0, yv = 0, colorSchemeDark) {
			this.canvas = canvas;
			this.ctx = ctx;
			this.size = size || Math.min(this.canvas.width, this.canvas.height)/60;
			this.x = x || this.canvas.width/2-this.size/2;
			this.y = y || this.canvas.height/2-this.size/2;
			this.xv = xv;
			this.yv = yv;
			this.colorSchemeDark = colorSchemeDark;
		}
		move () {
			this.x += this.xv;
			this.y += this.yv;
			if (this.y <= 0 + this.size) {
				this.yv = -this.yv;
				this.y = 1 + this.size;
			}else if (this.y >= this.canvas.height - this.size) {
				this.yv = -this.yv;
				this.y = this.canvas.height - 1 - this.size;
			}
		}
		draw () {
			this.ctx.beginPath();
			this.ctx.fillStyle = textColor;
			this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
			this.ctx.fill();
		}
		static randomV () {
			return Math.max(5, Math.random()*20-10)*(Math.floor(Math.random()*2) ? -1 : 1);
		}
	}
	class Player {
		constructor (canvas, ctx, x, y = 0, speed, score = 0, state, colorSchemeDark, computer = false) {
			this.canvas = canvas;
			this.ctx = ctx;
			this.x = x;
			this.y = y;
			this.h = this.canvas.height/6;
			this.w = this.canvas.width/100;
			this.speed = speed || this.canvas.height/100*5;
			this.score = score;
			this.state = state;
			this.colorSchemeDark = colorSchemeDark;
			this.computer = computer;

			this.mouseAction = e => {
				if (this.y + this.canvas.width/50 < e.clientY - this.h/2) this.y += this.speed;
				else if (this.y - this.canvas.width/50 > e.clientY - this.h/2) this.y -= this.speed;
			}
			this.touchAction = e => {
				const touch = e.touches[0];
				if (this.y + this.canvas.width/50 < touch.clientY - this.h/2) this.y += this.speed;
				else if (this.y - this.canvas.width/50 > touch.clientY - this.h/2) this.y -= this.speed;
			}
			this.keyAction = e => {
				if (e.key == "w" || e.key == "ArrowUp") this.y -= this.speed;
				else if (e.key == "s" || e.key == "ArrowDown") this.y += this.speed;
			}
			if (!this.computer) {
				addEventListener("mousemove", this.mouseAction);
				addEventListener("touchstart", this.touchAction);
				addEventListener("touchmove", this.touchAction);
				addEventListener("keydown", this.keyAction);
			}
		}
		move () {
			if (this.computer) {
				const canvas = this.canvas, h = this.h;
				let closest = {x: 0, y: canvas.height/2-h/2};
				for (const ball of this.state.balls) {
					if (ball.x > closest.x) closest = ball;
				}
				if (closest.x > this.canvas.width/2 && Math.floor(Math.random()*4.5) == 0) {
					if (closest.y+this.speed < this.y) this.y -= this.speed;
					else if (closest.y-this.speed > this.y) this.y += this.speed;
				}
			}

			if (this.y-this.h/2 < 0) this.y = this.h/2;
			else if (this.y+this.h/2 > this.canvas.height) this.y = this.canvas.height - this.h/2;
		}
		draw () {
			this.ctx.fillStyle = textColor;
			this.ctx.fillRect(this.x < this.canvas.width/2 ? this.x : this.x - this.w, this.y-this.h/2, this.w, this.h);

			// Score
			this.ctx.font = `clamp(2.5vmax, calc(1rem*5), 15vmax) 'Major Mono Display'`;
			this.ctx.fillText(this.score, this.canvas.width/4*(this.x < this.canvas.width/2 ? 1 : 3), 100);
		}
	}
	const canvas = c, ctx = canvas.getContext("2d"), states = [];
	canvas.width = innerWidth;
	canvas.height = innerHeight - innerHeight/100*11;
	let state = new State(canvas, ctx, [new Ball(canvas, ctx, undefined, undefined, undefined, Ball.randomV(), Ball.randomV(), colorSchemeDark)], [new Player(canvas, ctx, canvas.width/100*5, canvas.height/2, canvas.height/100*5, undefined, undefined, colorSchemeDark, false), new Player(canvas, ctx, canvas.width-canvas.width/100*5, canvas.height/2, canvas.height/100*5, undefined, undefined, colorSchemeDark, true)], colorSchemeDark);

	const update = (newState) => {
		states.push(state);
		return state = newState;
	}

	const gameLoop = () => {
		// Resize Canvas
		canvas.width = innerWidth;
		canvas.height = innerHeight - innerHeight/100*11;

		// Clear Canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Color Scheme
		state.colorSchemeDark = colorSchemeDark;

		// Draw
		state.draw();

		// Update state
		update(state.next());
		
		// Loop
		if (state.playing) requestAnimationFrame(gameLoop);
	}
	// Start loop
	requestAnimationFrame(gameLoop);

	document.getElementById("game").addEventListener("click", () => {
		state.playing = !state.playing;
		if (state.playing) requestAnimationFrame(gameLoop);
		else alert("paused");
	});
	document.getElementById("game").addEventListener("focusout", () => {
		state.playing = false;
		document.getElementById("game").dispatchEvent(new Event("click"));
	});

	Object.defineProperty(window, "die", {
		get: () => {
			state.players[1].score = 10;
		}
	})
}
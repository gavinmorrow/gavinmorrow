const start = document.getElementById("start");
const bday = document.getElementById("bday");
const heart = document.getElementById("heart");
const love = document.getElementById("love");

addEventListener("scroll", () => {
	const px = pageYOffset;
	console.log(px);

	start.style.opacity = `${GR.math.clamp(0, 1-px/innerHeight, 1)}`;


	bday.style.opacity = `${GR.math.clamp(0, (px-innerHeight)/innerHeight, 1)}`;
	bday.querySelector("div").style.background = `linear-gradient(to right, black 0%, white ${GR.math.clamp(0, (px-innerHeight*2)/4, 600)}%`;

	heart.style.opacity = `${GR.math.clamp(0, (px-innerHeight*4)/innerHeight, 1)}`;
	heart.querySelector("svg").style.top = `${GR.math.clamp(0, (innerHeight-(px-innerHeight*4))/4, innerHeight)}px`;

	love.style.opacity = `${GR.math.clamp(0, (px-innerHeight*6)/innerHeight, 1)}`;	
});

dispatchEvent(new Event("scroll"));

addEventListener("click", () => document.documentElement.requestFullscreen());
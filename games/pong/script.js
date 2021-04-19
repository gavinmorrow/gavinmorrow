const play = document.getElementById("play");
play.addEventListener("click", () => {
	document.getElementById("start").style.opacity = "0";
	document.getElementById("game").style.opacity = "1";
	setTimeout(() => {
		document.getElementById("start").style.zIndex = "1";
		document.getElementById("game").style.zIndex = "2";
		pong(document.getElementById("canvas"));
	}, 1000);
});
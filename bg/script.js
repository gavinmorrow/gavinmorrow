const bg = document.getElementById("bgw");
let bgs = 20, light = true;
bg.style.backgroundSize = `${bgs}vmax ${bgs}vmax`;
addEventListener("mousemove", e => {
	bg.style.backgroundSize = `${bgs}vmax ${bgs}vmax`;
	bg.style.backgroundPosition = `calc(${e.clientX}px - ${bgs/2}vmax) calc(${e.clientY}px - ${bgs/2}vmax)`;
});

addEventListener("click", () => {
	if (light = !light) {
		document.body.style.backgroundColor = "black";
		document.getElementById("bg").style.backgroundImage = `url('data:image/svg+xml;UTF-8,<?xml version="1.0" standalone="no"?> <svg width="110" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg"> <rect width="100" height="100" style="fill: black;"></rect></svg>')`;
	}
	else {
		document.body.style.backgroundColor = "white";
		document.getElementById("bg").style.backgroundImage = `url('data:image/svg+xml;UTF-8,<?xml version="1.0" standalone="no"?> <svg width="110" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg"> <rect width="100" height="100" style="fill: white;"></rect></svg>')`;
	}
});

addEventListener("resize", () => document.getElementById("bg").style.backgroundImage = `url('data:image/svg+xml;UTF-8,<?xml version="1.0" standalone="no"?> <svg width="${Math.max(innerWidth,innerHeight)/14.4+10}" height="${Math.max(innerWidth,innerHeight)/14.4+10}" version="1.1" xmlns="http://www.w3.org/2000/svg"> <rect width="${Math.max(innerWidth,innerHeight)/14.4}" height="${Math.max(innerWidth,innerHeight)/14.4}" style="fill: white;"></rect></svg>')`);
dispatchEvent(new Event("resize"));
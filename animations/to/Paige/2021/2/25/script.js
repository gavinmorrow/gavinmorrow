const start = document.getElementById("start"), card = document.getElementById("card");
const setToMid = elem => {
	elem.style.top = `${(innerHeight - elem.offsetHeight) / 2}px`;
	elem.style.left = `${(innerWidth - elem.offsetWidth) / 2}px`;
}
const main = () => {
	const gradient = document.getElementById("gradient-text"), cake = document.getElementById("cake");
	addEventListener("resize", () => setToMid(gradient));
	dispatchEvent(new Event("resize"));

	let i = 0;
	const interval = setInterval(() => {
		gradient.style.background = `linear-gradient(to right, black 0%, white ${i++}%)`;
		if (i > 300) {
			clearInterval(interval);
			cake.style.opacity = "1";
			setTimeout(() => {
				cake.style.opacity = "0";
				gradient.innerHTML = "Your Friend, Gavin";
				i = 0;
				gradient.style.background = `linear-gradient(to right, black 0%, white 0%)`;
				setTimeout(() => {
					const interval2 = setInterval(() => {
						gradient.style.background = `linear-gradient(to right, black 0%, white ${i++}%)`;
						if (i > 300) setTimeout((() => {
							card.style.opacity = "0";
							return () => location.reload(clearInterval(interval2))
						})(), 1000);
					}, 30);
				}, 5000);
			}, 5000);
		}
	}, 30);
};

addEventListener("resize", () => setToMid(start));
dispatchEvent(new Event("resize"));
start.addEventListener("click", () => {
	start.style.opacity = "0";
	start.style.zIndex = "0";
	card.style.opacity = "1";
	setTimeout(() => {
		main();
	}, 1000);
});
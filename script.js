import UI from "https://gavinmorrow.github.io/EasyJS/1/ui/main.js";

const {colorScheme, changeFavicon} = UI;

const parallaxImgs = document.body.querySelectorAll(".parallax-img");
const handleScroll = () => {
	const top = scrollY;
	for (const img of parallaxImgs) {
		img.style.top = `calc(0px - ${top}px * (var(--speed) - 1) + var(--top))`;
	}
};
handleScroll();
addEventListener("scroll", handleScroll);
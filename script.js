import UI from "https://gavinmorrow.github.io/EasyJS/1/ui/main.js";

const {colorScheme, changeFavicon} = UI;

const parallaxImgs = document.body.querySelectorAll(".parallax-img");
const handleScroll = () => {
	for (const img of parallaxImgs) {
		if (Number(getComputedStyle(img).top.split("px")[0]) <= innerHeight) img.style.top = `calc(0px - ${scrollY}px * (var(--speed) - 1) + var(--top))`;
	}
};
handleScroll();
addEventListener("scroll", handleScroll);
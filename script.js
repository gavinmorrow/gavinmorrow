import UI from "https://gavinmorrow.github.io/EasyJS/1/ui/main.js";

const {colorScheme, changeFavicon} = UI;

const parallaxImgs = document.body.querySelectorAll(".parallax-img");
for (const img of parallaxImgs) {
	const observer = new IntersectionObserver(entries => {
		for (const entry of entries) {
			if (entry.isIntersecting) entry.target.setAttribute("data-visible", "");
			else entry.target.removeAttribute("data-visible");
		}
	}, { root: document.body });
	observer.observe(img);
}

let lastScrollEvent = Date.now();
const handleScroll = () => {
	if (Date.now() >= lastScrollEvent + 0) {
		for (const img of parallaxImgs) {

			if (Number(getComputedStyle(img).top.split("px")[0]) <= innerHeight && img.getAttribute("data-visible") == "") img.style.top = `calc(0px - ${document.body.scrollTop}px * (var(--speed) - 1) + var(--top))`;
		}
		lastScrollEvent = Date.now();
	}
};
handleScroll();
document.body.addEventListener("scroll", handleScroll);
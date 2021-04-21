import UI from "https://gavinmorrow.github.io/EasyJS/1/ui/main.js";

const {colorScheme, changeFavicon} = UI;

let lastScrollEvent = Date.now();
addEventListener("scroll", () => {
	if (Date.now() >= lastScrollEvent + 10) {
		const top = pageYOffset;
		for (const img of document.body.querySelectorAll(".parallax-img")) {
			
		}

		lastScrollEvent = Date.now();
	}
})
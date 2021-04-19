const main = document.getElementById("main");

const dataReset = (elem, landscape) => {
	elem.className = elem.className.replace(/ [lp]-size/g, "");
	elem.className += ` ${landscape ? "l" : "p"}-size`;
	elem.parentElement.style.flexDirection = landscape ? "row" : "column";
};
HTMLElement.prototype.dataReset = function () { dataReset(this, innerWidth >= innerHeight) };

addEventListener("resize", () => {
	for (const elem of main.querySelectorAll(".page .img, .page .text")) {
		elem.dataReset();
	}
});
dispatchEvent(new Event("resize"));

const target = main;
const options = {
	childList: true,
	subtree: true,
};
const callback = (record, observer) => {
	console.log(record, observer);

	for (const mutation of record) {
		if (mutation.target.className.includes("img")) {
			mutation.target.dataReset(innerWidth >= innerHeight);
		}
	}
};
const observer = new MutationObserver(callback);
observer.observe(target, options);

const interval = 100;
let lastMS = Date.now()-interval;

addEventListener("scroll", () => {
	if (Date.now()-interval >= lastMS) {
		const setPage = (i, pages) => {
			for (const page of pages) {
				page.style.opacity = "";
				page.style.zIndex = "";

				if (pages.indexOf(page) < i) page.style.setProperty("--size", 0.75);
				else if (pages.indexOf(page) > i) page.style.setProperty("--size", 1.75);
			}

			const page = pages[i];
			page.style.opacity = "1";
			page.style.zIndex = "1";
			page.style.setProperty("--size", 1);
		}

		const pages = [], top = pageYOffset;
		for (const page of main.querySelectorAll(".page")) {
			pages.push(page);
		}

		for (let i = 0; i < pages.length; i++) {
			const px = innerHeight;
			if (top >= px*i && top < px*(i+1)) {
				setPage(i, pages);
			}
		}
		lastMS = Date.now();
	}
});
dispatchEvent(new Event("scroll"));
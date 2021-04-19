(() => {
	const wrapper = document.createElement("div");
	const nav = document.createElement("nav");
	const arrow = document.createElement("button");
	const style = document.createElement("link");

	localStorage.open = localStorage.open == undefined ? "1" : localStorage.open;

	// Up Arrow: ▲
	// Down Arrow: ▼

	wrapper.id = "nav-wrapper";
	nav.id = "nav-nav";
	arrow.id = "nav-arrow";

	wrapper.appendChild(nav);
	wrapper.appendChild(arrow);
	document.body.appendChild(wrapper);
	document.head.appendChild(style);

	// Set style properties
	style.rel = "stylesheet";
	style.href = "http://gavinmorrow.com/nav/new.css";

	// Set nav properties
	const pages = [
		{
			title: '<img src="/favicon.svg">',
			url: "/",
		},
		{
			title: 'Home',
			url: "/",
		},
		{
			title: 'Animations',
			url: "/animations/",
		},
		{
			title: 'Images',
			url: "/imgs/",
		},
		{
			title: 'Games',
			url: "/games/",
		},
	]
	for (const page of pages) {
		const title = page.title;
		const url = page.url;
		const a = document.createElement("a");
		a.href = url;
		a.innerHTML = title;
		a.className += " nav-a";
		nav.appendChild(a);
		
		a.addEventListener("focus", () => align(localStorage.open = true));
	}

	// Set arrow properties
	arrow.innerHTML = "▼";
	
	const align = () => {
		const deg = localStorage.open ? "180" : "0";
		arrow.style.transform = `rotateY(${deg}deg) rotateZ(${deg}deg)`;
		wrapper.style.top = localStorage.open ? "0" : `-${nav.offsetHeight}px`;
	};

	arrow.addEventListener("click", () => {
		localStorage.open = !localStorage.open ? "1" : "";
		align();
		arrow.blur();
	});
	addEventListener("resize", align);

	setInterval(() => dispatchEvent(new Event("resize")), 100);
	
	addEventListener("click", e => {
		const element = e.target;
		if (!(element == wrapper || wrapper.contains(element))) align(localStorage.open = "");
	});
	let lastScroll = pageYOffset;
	addEventListener("scroll", () => {
		if (pageYOffset > lastScroll) align(localStorage.open = "");
		else if (pageYOffset < lastScroll) align(localStorage.open = "1");
		lastScroll = pageYOffset;
	});
})();
for (let page of document.querySelectorAll("[data-page]")) {
	page.setAttribute("data-font-family", "'Comfortaa', monospace");
	page.setAttribute("data-min-height", "89vh");
	page.setAttribute("data-threshold", "0.1");
}

(async () => {
	const imgJSON = await fetch("/imgs/imgs.json", { cache: "no-store" }).then(json => {
		if (json.ok) return json.json();
		else throw new Error("Couldn't get JSON\n", json);
	});
	const imgs = imgJSON.imgs;
	for (let img of imgs) {
		const pic = document.createElement("pic");
		pic.innerHTML = `
			<div class="name">
				<div class="img-a" href="/imgs${img.url}">${img.name}</div>
			</div>
		`;
		pic.setAttribute("tabindex", "0");
		pic.style.backgroundImage = `url(/imgs${img.url})`;
		pic.style.backgroundColor = img.background;
		pic.addEventListener("mouseover", () => pic.style.boxShadow = `0 0 1em 1em ${img.shadow || "var(--GR-text-color)"}`);
		pic.addEventListener("mouseout", () => pic.style.boxShadow = `0 0 1em 1em transparent`);
		pic.addEventListener("click", () => open(pic.style.backgroundImage.split("url(\"")[1].split("\")")[0]));
		pic.addEventListener("tap", () => pic.dispatchEvent(new Event("click")));
		pic.addEventListener("keypress", event => {
			if (event.key == "Enter" || event.key == " " || event.key == "space" || event.key == "spacebar") pic.dispatchEvent(new Event("click"));
		})
		document.getElementById("imgs").appendChild(pic);
	}
})();
const products = [/*"GR JS library", */"animations", "images", "games"], productSelect = document.querySelector(`#product-select`);
let i = 0;
const productsToggle = (i) => {
	let next = products[i % products.length], last = products[(i - 1) % products.length];
	document.querySelector(`#product-select option[value='${next}']`).setAttribute("selected", "");
	document.querySelector(`#product-select option[value='${last}']`).removeAttribute("selected");
	// if (i%products.length == 0) next = "gr";
	document.getElementById("go").onclick = () => open(`/${next.toLowerCase()}`, "_blank");
	return i;
}
const interval = setInterval(() => productsToggle(++i), 2500);

productSelect.addEventListener("click", () => {
	clearInterval(interval);
	document.getElementById("go").onclick = () => open(`/${productSelect.value.toLowerCase()}`, "_blank");
});

document.getElementById("go").onclick = () => location.reload(scrollTo(0, 0));

for (let page of document.querySelectorAll("section[data-page]")) {
	page.setAttribute("data-min-height", "89vh");
	page.setAttribute("data-font-family", "righteous");
	page.setAttribute("data-threshold", "0.7");
}

if (innerWidth >= innerHeight) console.log(document.getElementById("snow").style.height = getComputedStyle(document.getElementById("snow")).height.split("px")[0]*2);
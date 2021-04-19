const escapeHtml = (unsafe) => {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

const r = document.getElementById("r"), main = document.getElementById("main"), namei = document.getElementById("name"), form = document.getElementById("form"), update = () => {
	fetch("txt.txt", {"cache": "no-cache"}).then(r => {
		// Only get txt if you have it (not if 404)
		if (r.ok) return r.text();
	}).then(r => {
		// Reset main
		main.innerHTML = "";
		// For each line, add a <p> that has the line
		for (const line of r.split("\n")) {
			// Don't add line if line is empty
			if (line.length == 0) continue;
			main.innerHTML += `<p>${escapeHtml(line)}</p>`;
		}
		
		// Make sure main has some content
		if (main.innerHTML.length == 0) main.innerHTML = "No messages… Why not add the first one?";
	});
};
namei.value = localStorage.name || "";
r.addEventListener("click", update);
// Auto update
setInterval(update, 1000);

form.addEventListener("submit", e => {
	// Form validation
	const niv = namei.value, miv = document.getElementById("message").value;
	if (niv.length == 0 || miv.length == 0) {
		alert("You have to fill out all the inputs.");
		// Stop form submission
		return e.preventDefault();
	}
	localStorage.name = niv;
});
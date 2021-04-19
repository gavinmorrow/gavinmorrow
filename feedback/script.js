for (const input of document.querySelectorAll("input[type='input'], textarea")) {
	input.value = "";
}
document.getElementById("ua").value = navigator.userAgent;
document.getElementById("url").value = parent.location.href.split("http://gavinmorrow.com/")[1];
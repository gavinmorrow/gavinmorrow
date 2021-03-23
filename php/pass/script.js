(async () => {
	// while (await fetch(`pass.php?pass=${prompt("What is the password?")}`).then(r => r.text()) != "1") {}
	// document.body.style.display = "block";
	localStorage.endIf = false;
	if (localStorage.allowed !== "false") {
		var i;
		for (i = 0; i < 5; i++) {
			if (await fetch(`pass.php?pass=${prompt("What is the password?")}`).then(r => r.text()) == "1") {
				document.body.style.display = "block";
				localStorage.endIf = true;
				break;
			}
		}
		if (localStorage.endIf == "false") {
			localStorage.allowed = false;
			document.body.innerHTML = "<h1>Sorry, the account is locked.</h1>";
			document.body.style.display = "block";
		}
	}
	else {
		document.body.innerHTML = "<h1>Sorry, the account is locked.</h1>";
		localStorage.allowed = false;
		document.body.innerHTML = "<h1>Sorry, the account is locked.</h1>";
		document.body.style.display = "block";
	}
})();
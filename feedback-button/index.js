const div = document.createElement("div");
div.innerHTML = `
	<script src="/gr/color-scheme/"></script>
	<style>
		@import "https://fonts.googleapis.com/css?family=Comfortaa&display=swap";
		#feedback {
			--font: clamp(1rem, 2em, 3vmax);
			position: fixed;
			bottom: calc(var(--font) / 2);
			left: calc(var(--font) / 2);
			font: var(--font) comfortaa, Arial;
			border-radius: var(--font);
			border: 1px solid var(--GR-text-color);
			width: var(--font);
			height: var(--font);
			z-index: 100000000000000;
			padding: calc(var(--font) * 0.9);
			background-color: rgba(255, 255, 255, 0.75);
			box-sizing: border-box;
			
			display: flex;
			justify-content: center;
			align-items: center;


			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			cursor: inherit;

			transition: box-shadow 1s;
			outline: transparent;
		}
		#feedback div {
			margin: auto;
			padding: 0;
		}

		#feedback-form {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: -1000000000000000;
			opacity: 0;
			transition: opacity 0.5s;
		}
		#feedback-form iframe {
			width: 90vw;
			height: calc(100vh / 10 * 9);
			margin: calc(100vh / 10 / 2) 5vw;
			border: none;
			border-radius: 1vmax;
		}

		@media (prefers-color-scheme: dark) {
			#feedback {
				background-color: rgba(0, 0, 0, 0.75);
			}
			#feedback-form {
				background-color: rgba(255, 255, 255, 0.5);
			}
		}
		#feedback:hover, #feedback:focus {
			box-shadow: 0 0 1em 0 var(--GR-text-color);
		}
	</style>
	<div id="feedback-form" data-hidden>
		<iframe src="/feedback/"></iframe>
	</div>
	<button id="feedback" tabindex="0"><div>?</div></button>
`;
document.body.appendChild(div);
document.getElementById("feedback").addEventListener("click", () => {
	if (document.getElementById("feedback-form").getAttribute("data-hidden") == "") {
		document.documentElement.style.overflow = "hidden";
		document.getElementById("feedback-form").style.zIndex = "1000000000000000";
		document.getElementById("feedback-form").style.opacity = "1";
		document.getElementById("feedback").style.zIndex = "1000000000000000";
		document.getElementById("feedback-form").removeAttribute("data-hidden");
	}else {
		document.documentElement.style.overflow = "";
		document.getElementById("feedback-form").style.zIndex = "-1000000000000000";
		document.getElementById("feedback-form").style.opacity = "0";
		document.getElementById("feedback-form").setAttribute("data-hidden", "");
	}
	document.getElementById("feedback").blur();
});
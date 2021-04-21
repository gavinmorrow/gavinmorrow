import UI from "https://gavinmorrow.github.io/EasyJS/1/ui/main.js";

const {colorScheme, changeFavicon} = UI;

colorScheme.set(false);
if (colorScheme.dark) changeFavicon(document.querySelector("link[rel='shortcut icon']"), "//google.com/favicon.ico");
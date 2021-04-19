<?php
$path = $_GET["path"];
function ati ($size) {
	global $path;
	return "<link rel=\"apple-touch-icon\" sizes=\"$size"."x$size\" href=\"$path/apple-touch-icon-$size"."x$size.png\">";
}
$links = ati(120) . ati(152) . ati(180);
echo "document.currentScript.outerHTML = '$links<link rel=\"icon\" href=\"$path/favicon.ico\">';";
?>
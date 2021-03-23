<?php
	$bug = $_GET["bug"];
	$url = $_GET["url"];
	$ua = $_GET["ua"] ?? "Unknown UA";
	$bug = htmlspecialchars($bug);
	$url = htmlspecialchars($url);
	$ua = htmlspecialchars($ua);
	$bug_file = fopen("/home/gavin_unitytheory/gavinmorrow.com/php/error/errors/index.html", "a");
	fwrite($bug_file, "$bug<br/><a href='http://gavinmorrow.com/$url'>http://gavinmorrow.com/$url</a><br/>$ua<hr>\n\n");
	die("<script>location.replace('/feedback/');</script>");
?>
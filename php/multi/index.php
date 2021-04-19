<?php
	$txt = $_POST["txt"];
	$name = $_POST["name"];
	$txtf = fopen("/home/gavin_unitytheory/gavinmorrow.com/multi/txt.txt", "a");
	if (strlen($txt) > 0 and strlen($name) > 0) fwrite($txtf, "$txt -$name\n");
	echo "<script>location.replace('/multi/');</script>";
	fclose($txtf);
?>
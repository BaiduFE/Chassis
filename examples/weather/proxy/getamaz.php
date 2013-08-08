<?php
	header('Content-Type:image/x-png');
	header('Access-Control-Allow-Origin:*');
	$url = $_GET[ 'url' ];
	
	echo(file_get_contents($url));
	
?>
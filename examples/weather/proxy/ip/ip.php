<?php
$callback = $_GET[ 'callback' ] ? trim($_GET[ 'callback' ]) : '';
function GetIP(){ 
	if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) {
		$ip = getenv("HTTP_CLIENT_IP"); 
	}else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) {
		$ip = getenv("HTTP_X_FORWARDED_FOR"); 
	}else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) {
		$ip = getenv("REMOTE_ADDR"); 
	}else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) {
		$ip = $_SERVER['REMOTE_ADDR']; 
	}else {
		$ip = "unknown"; 
	}
	
	$ip = split(",",$ip);
	
	return($ip[0]); 
}

function getIPInfo( $ip ){
	
	$url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=".$ip;
	
	return json_decode(file_get_contents($url));
	//$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}'; 
	//var_dump(json_decode($json)); 
	
}

$ip = GetIP();
$ipInfo = getIPInfo( $ip );

include("geoipcity.inc");
include("geoipregionvars.php");

$gi = geoip_open("GeoLiteCity.dat",GEOIP_STANDARD);

$record = geoip_record_by_addr($gi,$ip);

$result = array(
	'code'      => $record->country_code,
	'country'   => $ipInfo->country,
	'region'    => $record->region,
	'province'  => $ipInfo->province,
	'city'      => $ipInfo->city,
	'latitude'  => $record->latitude,
	'longitude' => $record->longitude,
	'isp'       => $ipInfo->isp,
	'ip'        => $ip,
	'name'      => $record->city.",".$record->country
);


geoip_close($gi);
header("Content-type: application/json");
if( $callback == ''){
	echo json_encode( $result );
}else{
	echo $callback . "(" . json_encode( $result ) . ")";
}


// https://api.forecast.io/forecast/7e480421b898229569419dd12587db27/39,116,1375632000

?>
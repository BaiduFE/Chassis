<?php
    $url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.plaza.getRecommendAlbum&format=json&limit=20&from=mixapp";
    echo file_get_contents($url);
?>
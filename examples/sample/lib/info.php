<?php
    $id = $_GET['id'];
    $url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.album.getAlbumInfo&format=json&album_id=$id&from=mixapp";
    echo file_get_contents($url);
?>
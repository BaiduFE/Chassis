<?php
/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/
 
 
 
/**
 * @file index.php
 *  
 **/
session_start();

define('APP_PATH','./hacknews/');
define('THINK_PATH','./ThinkPHP/');
define('APP_DEBUG',true);



include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

require './ThinkPHP/ThinkPHP.php';
/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
?>

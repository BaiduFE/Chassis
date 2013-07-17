<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2012 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
// $Id: Log.class.php 2791 2012-02-29 10:08:57Z liu21st $

/**
 +------------------------------------------------------------------------------
 * 日志处理类
 +------------------------------------------------------------------------------
 * @category   Think
 * @package  Think
 * @subpackage  Core
 * @author    liu21st <liu21st@gmail.com>
 * @version   $Id: Log.class.php 2791 2012-02-29 10:08:57Z liu21st $
 +------------------------------------------------------------------------------
 */
class Log {

    // 日志级别 从上到下，由低到高
    const EMERG   = 'EMERG';  // 严重错误: 导致系统崩溃无法使用
    const ALERT    = 'ALERT';  // 警戒性错误: 必须被立即修改的错误
    const CRIT      = 'CRIT';  // 临界值错误: 超过临界值的错误，例如一天24小时，而输入的是25小时这样
    const ERR       = 'ERR';  // 一般错误: 一般性错误
    const WARN    = 'WARN';  // 警告性错误: 需要发出警告的错误
    const NOTICE  = 'NOTIC';  // 通知: 程序可以运行但是还不够完美的错误
    const INFO     = 'INFO';  // 信息: 程序输出信息
    const DEBUG   = 'DEBUG';  // 调试: 调试信息
    const SQL       = 'SQL';  // SQL：SQL语句 注意只在调试模式开启时有效

    // 日志记录方式
    const SYSTEM = 0;
    const MAIL      = 1;
    const FILE       = 3;
    const SAPI      = 4;

    // 日志信息
    static $log =   array();

    // 日期格式
    static $format =  '[ c ]';

    //level map in bae
    static $level_map = array(
	self::EMERG   => 1,
	    self::ALERT    =>1,
    self::CRIT      => 1,
    self::ERR       =>1,
    self::WARN    =>2, 
    self::NOTICE  =>4, 
    self::INFO     =>8, 
    self::DEBUG   =>16, 
    self::SQL       =>16,
	);

    /**
     +----------------------------------------------------------
     * 记录日志 并且会过滤未经设置的级别
     +----------------------------------------------------------
     * @static
     * @access public
     +----------------------------------------------------------
     * @param string $message 日志信息
     * @param string $level  日志级别
     * @param boolean $record  是否强制记录
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    static function record($message,$level=self::ERR,$record=false) {
        if($record || strpos(C('LOG_LEVEL'),$level)) {
            $now = date(self::$format);
            self::$log[] =   "{$now} ".$_SERVER['REQUEST_URI']." | {$level}: {$message}\r\n";
        }
    }

    /**
     +----------------------------------------------------------
     * 日志保存
     +----------------------------------------------------------
     * @static
     * @access public
     +----------------------------------------------------------
     * @param integer $type 日志记录方式
     * @param string $destination  写入目标
     * @param string $extra 额外参数
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    static function OrigSave($type='',$destination='',$extra='') {
        $type = $type?$type:C('LOG_TYPE');
        if(self::FILE == $type) { // 文件方式记录日志信息
            if(empty($destination))
                $destination = LOG_PATH.date('y_m_d').'.log';
            //检测日志文件大小，超过配置大小则备份日志文件重新生成
            if(is_file($destination) && floor(C('LOG_FILE_SIZE')) <= filesize($destination) )
                  rename($destination,dirname($destination).'/'.time().'-'.basename($destination));
        }else{
            $destination   =   $destination?$destination:C('LOG_DEST');
            $extra   =  $extra?$extra:C('LOG_EXTRA');
        }
        error_log(implode('',self::$log), $type,$destination ,$extra);
        // 保存后清空日志缓存
        self::$log = array();
        //clearstatcache();
    }
   static function save($type='',$destination='',$extra='') {
	if ( defined('IS_BAE') && IS_BAE  ){
		return self::BaeSave($type,$destination,$extra);
	}
	return self::OrigSave($type,$destination,$extra);
   }
   static function BaeSave($type='',$destination='',$extra='') {
	$baeLog = BaeLog::getInstance();
        $type = $type?$type:C('LOG_TYPE');
	foreach (self::$log as $alog){

		//mail type
		if ( $type == self::MAIL ){
			self::SendByBaeMail($alog,$destination,$extra);
			continue;
		}
		preg_match('/\|(.*):/',$alog,$match);
		$bae_level = 2;
		if ( !isset($match[1]) ) {
			$baeLog->logWrite($bae_level,$alog);
			continue;
		}
		$level = trim($match[1]);
		if ( isset(self::$level_map[$level]) ){
			$bae_level = self::$level_map[$level];
		}
		$baeLog->logWrite($bae_level,$alog);
	}
        // 保存后清空日志缓存
        self::$log = array();
        //clearstatcache();
    }
    /**
     +----------------------------------------------------------
     * 日志直接写入
     +----------------------------------------------------------
     * @static
     * @access public
     +----------------------------------------------------------
     * @param string $message 日志信息
     * @param string $level  日志级别
     * @param integer $type 日志记录方式
     * @param string $destination  写入目标
     * @param string $extra 额外参数
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    static function origWrite($message,$level=self::ERR,$type='',$destination='',$extra='') {
        $now = date(self::$format);
        $type = $type?$type:C('LOG_TYPE');
        if(self::FILE == $type) { // 文件方式记录日志
            if(empty($destination))
                $destination = LOG_PATH.date('y_m_d').'.log';
            //检测日志文件大小，超过配置大小则备份日志文件重新生成
            if(is_file($destination) && floor(C('LOG_FILE_SIZE')) <= filesize($destination) )
                  rename($destination,dirname($destination).'/'.time().'-'.basename($destination));
        }else{
            $destination   =   $destination?$destination:C('LOG_DEST');
            $extra   =  $extra?$extra:C('LOG_EXTRA');
        }
        error_log("{$now} ".$_SERVER['REQUEST_URI']." | {$level}: {$message}\r\n", $type,$destination,$extra );
        //clearstatcache();
    }
    static function SendByBaeMail($msg,$destination ='',$extra='')
    {
	$quename = C('BAE_BCMS_QUEUE');
	if (empty($quename)){
		trigger_error("please set BAE_BCMS_QUEUE(bcms queue name)"); 
	}
	$bcms = new Bcms();
    	$destination   =   $destination?$destination:C('LOG_DEST');
	if ( !is_array($destination) ){
		$destination = array($destination);
	}
	$extra   =  $extra?$extra:C('LOG_EXTRA');
	$option = array();
	$p = '/(from)([ ]*):(.*)/i';
	preg_match($p,$extra,$match);
	if ( isset($match[3]) ){
	    $option = array(Bcms::FROM=>trim($match[3]));
	}    
	if ( ($ret = $bcms->mail($quename,$msg,json_encode($destination),$option)) === false)
		trigger_error("Send Mail Failed,bcms errmessage is :[".$bcms->errmsg()."] error no is [".$bcms->errno()."] dest[$destination] and option is:".var_export($option,true)." msg info[$msg]",E_USER_WARNING);
    }
    static function BaeWrite($message,$level=self::ERR,$type='',$destination='',$extra='') {
	$baeLog = BaeLog::getInstance();
        $now = date(self::$format);
	$bae_level = isset(self::$level_map[$level])?self::$level_map[$level]:2;
        $msg = "{$now} ".$_SERVER['REQUEST_URI']." | {$level}: {$message}\r\n";
        $type = $type?$type:C('LOG_TYPE');
        if(self::MAIL != $type) { // 非邮件
	    $baeLog->logWrite($bae_level,$alog);
        }else{
	    self::SendByBaeMail($msg,$destination,$extra);
        }
    }
    static function write($message,$level=self::ERR,$type='',$destination='',$extra='') {
	if( defined('IS_BAE') && IS_BAE){
		return self::BaeWrite($message,$level,$type,$destination,$extra);
	}else{
		return self::OrigWrite($message,$level,$type,$destination,$extra);
	}
    }
}

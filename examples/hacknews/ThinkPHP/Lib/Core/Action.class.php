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
// $Id: Action.class.php 2791 2012-02-29 10:08:57Z liu21st $

/**
 +------------------------------------------------------------------------------
 * ThinkPHP Action控制器基类 抽象类
 +------------------------------------------------------------------------------
 * @category   Think
 * @package  Think
 * @subpackage  Core
 * @author   liu21st <liu21st@gmail.com>
 * @version  $Id: Action.class.php 2791 2012-02-29 10:08:57Z liu21st $
 +------------------------------------------------------------------------------
 */
abstract class Action {

    // 视图实例对象
    protected $view   =  null;
    // 当前Action名称
    private $name =  '';

   /**
     +----------------------------------------------------------
     * 架构函数 取得模板对象实例
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     */
    public function __construct() {
        tag('action_begin');
        //实例化视图类
        $this->view       = Think::instance('View');
        //控制器初始化
        if(method_exists($this,'_initialize'))
            $this->_initialize();
    }

   /**
     +----------------------------------------------------------
     * 获取当前Action名称
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     */
    protected function getActionName() {
        if(empty($this->name)) {
            // 获取Action名称
            $this->name     =   substr(get_class($this),0,-6);
        }
        return $this->name;
    }

    /**
     +----------------------------------------------------------
     * 是否AJAX请求
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @return bool
     +----------------------------------------------------------
     */
    protected function isAjax() {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) ) {
            if('xmlhttprequest' == strtolower($_SERVER['HTTP_X_REQUESTED_WITH']))
                return true;
        }
        if(!empty($_POST[C('VAR_AJAX_SUBMIT')]) || !empty($_GET[C('VAR_AJAX_SUBMIT')]))
            // 判断Ajax方式提交
            return true;
        return false;
    }

    /**
     +----------------------------------------------------------
     * 模板显示
     * 调用内置的模板引擎显示方法，
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $templateFile 指定要调用的模板文件
     * 默认为空 由系统自动定位模板文件
     * @param string $charset 输出编码
     * @param string $contentType 输出类型
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function display($templateFile='',$charset='',$contentType='') {
        $this->view->display($templateFile,$charset,$contentType);
    }

    /**
     +----------------------------------------------------------
     *  获取输出页面内容
     * 调用内置的模板引擎fetch方法，
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $templateFile 指定要调用的模板文件
     * 默认为空 由系统自动定位模板文件
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    protected function fetch($templateFile='') {
        return $this->view->fetch($templateFile);
    }

    /**
     +----------------------------------------------------------
     *  创建静态页面
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @htmlfile 生成的静态文件名称
     * @htmlpath 生成的静态文件路径
     * @param string $templateFile 指定要调用的模板文件
     * 默认为空 由系统自动定位模板文件
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    protected function buildHtml($htmlfile='',$htmlpath='',$templateFile='') {
        $content = $this->fetch($templateFile);
        $htmlpath   = !empty($htmlpath)?$htmlpath:HTML_PATH;
        $htmlfile =  $htmlpath.$htmlfile.C('HTML_FILE_SUFFIX');
        if(!is_dir(dirname($htmlfile)))
            // 如果静态目录不存在 则创建
            mk_dir(dirname($htmlfile));
        if(false === file_put_contents($htmlfile,$content))
            throw_exception(L('_CACHE_WRITE_ERROR_').':'.$htmlfile);
        return $content;
    }

    /**
     +----------------------------------------------------------
     * 模板变量赋值
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param mixed $name 要显示的模板变量
     * @param mixed $value 变量的值
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function assign($name,$value='') {
        $this->view->assign($name,$value);
    }

    public function __set($name,$value) {
        $this->view->assign($name,$value);
    }

    /**
     +----------------------------------------------------------
     * 取得模板显示变量的值
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $name 模板显示变量
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    public function __get($name) {
        return $this->view->get($name);
    }

    /**
     +----------------------------------------------------------
     * 魔术方法 有不存在的操作的时候执行
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @param string $method 方法名
     * @param array $args 参数
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    public function __call($method,$args) {
        if( 0 === strcasecmp($method,ACTION_NAME)) {
            if(method_exists($this,'_empty')) {
                // 如果定义了_empty操作 则调用
                $this->_empty($method,$args);
            }elseif(file_exists_case(C('TEMPLATE_NAME'))){
                // 检查是否存在默认模版 如果有直接输出模版
                $this->display();
            }elseif(function_exists('__hack_action')) {
                // hack 方式定义扩展操作
                __hack_action();
            }elseif(APP_DEBUG) {
                // 抛出异常
                throw_exception(L('_ERROR_ACTION_').ACTION_NAME);
            }else{
                if(C('LOG_EXCEPTION_RECORD')) Log::write(L('_ERROR_ACTION_').ACTION_NAME);
                send_http_status(404);
                exit;
            }
        }else{
            switch(strtolower($method)) {
                // 判断提交方式
                case 'ispost':
                case 'isget':
                case 'ishead':
                case 'isdelete':
                case 'isput':
                    return strtolower($_SERVER['REQUEST_METHOD']) == strtolower(substr($method,2));
                // 获取变量 支持过滤和默认值 调用方式 $this->_post($key,$filter,$default);
                case '_get':      $input =& $_GET;break;
                case '_post':$input =& $_POST;break;
                case '_put': parse_str(file_get_contents('php://input'), $input);break;
                case '_request': $input =& $_REQUEST;break;
                case '_session': $input =& $_SESSION;break;
                case '_cookie':  $input =& $_COOKIE;break;
                case '_server':  $input =& $_SERVER;break;
                case '_globals':  $input =& $GLOBALS;break;
                default:
                    throw_exception(__CLASS__.':'.$method.L('_METHOD_NOT_EXIST_'));
            }
            if(isset($input[$args[0]])) { // 取值操作
                $data	 =	 $input[$args[0]];
                $fun  =  $args[1]?$args[1]:C('DEFAULT_FILTER');
                $data	 =	 $fun($data); // 参数过滤
            }else{ // 变量默认值
                $data	 =	 isset($args[2])?$args[2]:NULL;
            }
            return $data;
        }
    }

    /**
     +----------------------------------------------------------
     * 操作错误跳转的快捷方法
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $message 错误信息
     * @param string $jumpUrl 页面跳转地址
     * @param Boolean $ajax 是否为Ajax方式
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function error($message,$jumpUrl='',$ajax=false) {
        $this->dispatchJump($message,0,$jumpUrl,$ajax);
    }

    /**
     +----------------------------------------------------------
     * 操作成功跳转的快捷方法
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $message 提示信息
     * @param string $jumpUrl 页面跳转地址
     * @param Boolean $ajax 是否为Ajax方式
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function success($message,$jumpUrl='',$ajax=false) {
        $this->dispatchJump($message,1,$jumpUrl,$ajax);
    }

    /**
     +----------------------------------------------------------
     * Ajax方式返回数据到客户端
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param mixed $data 要返回的数据
     * @param String $info 提示信息
     * @param boolean $status 返回状态
     * @param String $status ajax返回类型 JSON XML
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function ajaxReturn($data,$info='',$status=1,$type='') {
        $result  =  array();
        $result['status']  =  $status;
        $result['info'] =  $info;
        $result['data'] = $data;
        //扩展ajax返回数据, 在Action中定义function ajaxAssign(&$result){} 方法 扩展ajax返回数据。
        if(method_exists($this,'ajaxAssign')) 
            $this->ajaxAssign($result);
        if(empty($type)) $type  =   C('DEFAULT_AJAX_RETURN');
        if(strtoupper($type)=='JSON') {
            // 返回JSON数据格式到客户端 包含状态信息
            header('Content-Type:text/html; charset=utf-8');
            exit(json_encode($result));
        }elseif(strtoupper($type)=='XML'){
            // 返回xml格式数据
            header('Content-Type:text/xml; charset=utf-8');
            exit(xml_encode($result));
        }elseif(strtoupper($type)=='EVAL'){
            // 返回可执行的js脚本
            header('Content-Type:text/html; charset=utf-8');
            exit($data);
        }else{
            // TODO 增加其它格式
        }
    }

    /**
     +----------------------------------------------------------
     * Action跳转(URL重定向） 支持指定模块和延时跳转
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $url 跳转的URL表达式
     * @param array $params 其它URL参数
     * @param integer $delay 延时跳转的时间 单位为秒
     * @param string $msg 跳转提示信息
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function redirect($url,$params=array(),$delay=0,$msg='') {
        $url    =   U($url,$params);
        redirect($url,$delay,$msg);
    }

    /**
     +----------------------------------------------------------
     * 默认跳转操作 支持错误导向和正确跳转
     * 调用模板显示 默认为public目录下面的success页面
     * 提示页面为可配置 支持模板标签
     +----------------------------------------------------------
     * @param string $message 提示信息
     * @param Boolean $status 状态
     * @param string $jumpUrl 页面跳转地址
     * @param Boolean $ajax 是否为Ajax方式
     +----------------------------------------------------------
     * @access private
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    private function dispatchJump($message,$status=1,$jumpUrl='',$ajax=false) {
        // 判断是否为AJAX返回
        if($ajax || $this->isAjax()) $this->ajaxReturn($ajax,$message,$status);
        if(!empty($jumpUrl)) $this->assign('jumpUrl',$jumpUrl);
        // 提示标题
        $this->assign('msgTitle',$status? L('_OPERATION_SUCCESS_') : L('_OPERATION_FAIL_'));
        //如果设置了关闭窗口，则提示完毕后自动关闭窗口
        if($this->view->get('closeWin'))    $this->assign('jumpUrl','javascript:window.close();');
        $this->assign('status',$status);   // 状态
        //保证输出不受静态缓存影响
        C('HTML_CACHE_ON',false);
        if($status) { //发送成功信息
            $this->assign('message',$message);// 提示信息
            // 成功操作后默认停留1秒
            if(!$this->view->get('waitSecond'))    $this->assign('waitSecond','1');
            // 默认操作成功自动返回操作前页面
            if(!$this->view->get('jumpUrl')) $this->assign("jumpUrl",$_SERVER["HTTP_REFERER"]);
            $this->display(C('TMPL_ACTION_SUCCESS'));
        }else{
            $this->assign('error',$message);// 提示信息
            //发生错误时候默认停留3秒
            if(!$this->view->get('waitSecond'))    $this->assign('waitSecond','3');
            // 默认发生错误的话自动返回上页
            if(!$this->view->get('jumpUrl')) $this->assign('jumpUrl',"javascript:history.back(-1);");
            $this->display(C('TMPL_ACTION_ERROR'));
            // 中止执行  避免出错后继续执行
            exit ;
        }
    }

   /**
     +----------------------------------------------------------
     * 析构方法
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     */
    public function __destruct() {
        // 保存日志
        if(C('LOG_RECORD')) Log::save();
        // 执行后续操作
        tag('action_end');
    }
}
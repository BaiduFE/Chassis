<?php
// +----------------------------------------------------------------------
// | TOPThink [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2010 http://topthink.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
// $Id: TokenBuildBehavior.class.php 2659 2012-01-23 15:04:24Z liu21st $

/**
 +------------------------------------------------------------------------------
 * 系统行为扩展 表单令牌生成
 +------------------------------------------------------------------------------
 */
class TokenBuildBehavior extends Behavior {
    // 行为参数定义
    protected $options   =  array(
        'TOKEN_ON'              => true,     // 开启令牌验证
        'TOKEN_NAME'            => '__hash__',    // 令牌验证的表单隐藏字段名称
        'TOKEN_TYPE'            => 'md5',   // 令牌验证哈希规则
        'TOKEN_RESET'               =>   true, // 令牌错误后是否重置
    );

    public function run(&$content){
        if(C('TOKEN_ON')) {
            if(strpos($content,'{__TOKEN__}')) {
                // 指定表单令牌隐藏域位置
                $content = str_replace('{__TOKEN__}',$this->buildToken(),$content);
            }elseif(preg_match('/<\/form(\s*)>/is',$content,$match)) {
                // 智能生成表单令牌隐藏域
                $content = str_replace($match[0],$this->buildToken().$match[0],$content);
            }
        }
    }

    // 创建表单令牌
    private function buildToken() {
        $tokenName   = C('TOKEN_NAME');
        $tokenType = C('TOKEN_TYPE');
        if(!isset($_SESSION[$tokenName])) {
            $_SESSION[$tokenName]  = array();
        }
        // 标识当前页面唯一性
        $tokenKey  =  md5($_SERVER['REQUEST_URI']);
        if(isset($_SESSION[$tokenName][$tokenKey])) {// 相同页面不重复生成session
            $tokenValue = $_SESSION[$tokenName][$tokenKey];
        }else{
            $tokenValue = $tokenType(microtime(TRUE));
            $_SESSION[$tokenName][$tokenKey]   =  $tokenValue;
        }
        // 执行一次额外动作防止远程非法提交
        if($action   =  C('TOKEN_ACTION')){
            $_SESSION[$action($tokenKey)] = true;
        }
        $token   =  '<input type="hidden" name="'.$tokenName.'" value="'.$tokenKey.'_'.$tokenValue.'" />';
        return $token;
    }
}
require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
require('gmu:dialog');
require('gmu:tab');
var iScroll = require('gmu:third-party/iscroll').iScroll;
/**
 * @file
 * @desc  登陆组件
 */
(function($, undefined) {
    /**
     * @class
     * @name      $.ui.login                                             is
     * @param     {Object}          options                      可配置的参数
     * @param     {Array}           options.dialogCfg            (可选)dialog配置
     * @param     {Number}          options.tabCfg               (可选)tab配置
     * @param     {Boolean}         options.loginCfg             (可选)普通登录配置
     * @param     {Boolean}         options.phoneLoginCfg        (可选)手机登录配置
     * @param     {Boolean}         options.isShow               (可选)默认是否显示
     */
    $.ui.create("login", {
        _data: {
            isShow: false,
            dialogCfg: {},
            tabCfg: {},
            authsiteCfg: {},
            loginCfg: {},
            phoneLoginCfg: {}
        },

        _create: function() {
            var me = this,
                dialogCfg = me.data("dialogCfg"),
                authsiteCfg = me.data("authsiteCfg"),
                dialog;

            if (!dialogCfg) { //登录框的dialog浮层不存在则直接返回
                return;
            }

            dialog = $.ui.dialog(dialogCfg.option);
            me.data({dialog: dialog});
            me.widget(dialog.widget()); //保存login的根元素
            $.isPlainObject(authsiteCfg) && $.isArray(authsiteCfg["authsiteCont"]) && me._createAuthsiteUI();
            me._createRegUI().trigger("create");
        },

        _init: function() {
            var me = this,
                dialog = me.data("dialog"),
                $dialogElem = dialog.widget(),
                tabCfg = me.data("tabCfg"),
                loginCfg = me.data("loginCfg"),
                phoneLoginCfg = me.data("phoneLoginCfg");

            me.data({
                loginFn: { //记录登录框的用户配置
                    loginReady: loginCfg.onReady,
                    loginInputError: loginCfg.onInputErr,
                    loginInputOk: loginCfg.onInputOk
                },
                pLoginFn: {
                    pLoginReady: phoneLoginCfg.onReady,
                    ploginInputError: phoneLoginCfg.onInputErr,
                    ploginInputOk: phoneLoginCfg.onInputOk
                }
            });

            me._initLoginCfg()._initDialogEvent();
            $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize', function(e) {
                me._eventHandler(e)
            });
            $dialogElem.on("touchstart", function(e) {
                me._eventHandler(e);
            });
            me.data({
                login: bdPass.api.login.init(loginCfg),
                phoneLoginCfg: bdPass.api.login.init(phoneLoginCfg),
                tab: tabCfg.el ? $.ui.tab(tabCfg.el, tabCfg.option) : $.ui.tab(tabCfg.option)
            });
            me.trigger("init");
        },

        /**
         * 初始化普通登录框和手机登录框的配置
         * @private
         */
        _initLoginCfg: function() {
            var me = this,
                loginCfg = me.data("loginCfg"),
                phoneLoginCfg = me.data("phoneLoginCfg"),
                loginFn = me.data("loginFn"),
                pLoginFn = me.data("pLoginFn");

            //扩展普通登录框的配置
            $.extend(loginCfg, {
                onReady: function() { //普通登录表单渲染完成
                    $.isFunction(loginFn["loginReady"]) && loginFn["loginReady"](arguments);
                    me._loginFormReady.apply(me, arguments);
                },
                onInputErr: function() { //输入框输入错误时
                    $.isFunction(loginFn["loginInputError"]) && loginFn["loginInputError"](arguments); //执行用户自定义的表单onReady事件
                    me._loginFormInputError.apply(me, arguments);
                },
                onInputOk: function() { //输入框输入正确时
                    $.isFunction(loginFn["loginInputOk"]) && loginFn["loginInputOk"](arguments); //执行用户自定义的表单onReady事件
                    me._loginFormInputOk.apply(me, arguments);
                }
            });

            //扩展手机登录框的配置
            $.extend(phoneLoginCfg, {
                onReady: function() { //手机登录表单渲染完成
                    $.isFunction(pLoginFn["pLoginReady"]) && pLoginFn["pLoginReady"](arguments); //执行用户自定义的表单onReady事件
                    me._loginFormReady.apply(me, arguments);
                },
                onInputErr: function() { //输入框输入错误时
                    $.isFunction(pLoginFn["ploginInputError"]) && pLoginFn["ploginInputError"](arguments); //执行用户自定义的表单onReady事件
                    me._loginFormInputError.apply(me, arguments);
                },
                onInputOk: function() { //输入框输入正确时
                    $.isFunction(pLoginFn["ploginInputOk"]) && pLoginFn["ploginInputOk"](arguments); //执行用户自定义的表单onReady事件
                    me._loginFormInputOk.apply(me, arguments);
                }
            });

            return me;
        },

        /**
         * 初始化dialog框事件
         * @private
         */
        _initDialogEvent: function() {
            var me = this,
                dialog = me.data("dialog"),
                $dialogElem = dialog.widget(),
                $closeBtn = $dialogElem.find(".ui-dialog-close");

            dialog.data("closeBtn") && $closeBtn.on("click", function(e) {
                me._eventHandler(e);
            });

            me.data('isShow') && me.show();

            return me;
        },

        /**
         * 登录的form加载完成onReady事件，对输入框绑定相关事件
         * @private
         */
        _loginFormReady: function(form) {
            var me = this,
                $iptsName = $(form).find(".pass_login_input"),
                $checkBox = $(form).find(".pass_login_input_rem");

            me._dealInputLabel(form);

            $iptsName.on("focus input blur", function(e) {
                me._eventHandler(e);
            });

            $checkBox.parent().on("tap", function() {
                $checkBox[0].checked = !$checkBox[0].checked;
            });
            return me;
        },

        /**
         * 登录框的input框输入错误事件
         * @private
         */
        _loginFormInputError: function() {
            var me = this,
                $input = $(arguments[0]),
                errorText = $input.next().html();
            if (me.data('noHideError') || $input.data('_hasError')) { // already has error.
                $input.css("border-color", "#cc0001");
                me.data('hideErrorTimer', $.later(function() {
                    me.data('hideErrorTimer', null);
                    me._dialogCenter();
                }), 50);
            } else {
                $input.next().html('');
                me.data('showErrorTimer', $.later(function() {
                    me.data('showErrorTimer', null);
                    $input.css("border-color", "#cc0001");
                    $input.next().html(errorText);
                    $input.data('_hasError', true);
                }, 100));

                me.data('hideErrorTimer', $.later(function() {
                    me.data('hideErrorTimer', null);
                    me.data('showErrorTimer') && clearTimeout(me.data('showErrorTimer'));
                    me.data('showErrorTimer', null);
                    me._dialogCenter();
                }), 50);
            }
            me.data('noHideError', false);
            return me;
        },

        /**
         * 登录框的input框输入错误事件
         * @private
         */
        _loginFormInputOk: function() {
            $(arguments[0]).css("border-color", "#979797");
            return this;
        },

        /**
         * 处理form中input框的placeholder和label的冒号
         * @private
         */
        _dealInputLabel: function(form) {
            var me = this,
                $allInputs = $(form).find(".pass_login_input");

            $allInputs.each(function(index, item) {
                me._fitInputLabel(item, item.className.split(" ")[1]);
            });
            return me;
        },

        /**
         * 针对具体的input和label处理
         * @private
         */
        _fitInputLabel: function(el, className) {
            var classPre = "pass_login_input_";
            if (className.indexOf(classPre) === -1) {
                return;
            }

            var $input = $(el),
                phText = "",
                labelText = "",
                type = className.substring(classPre.length);

            switch (type) {
            case "username":
                phText = "用户名/邮箱";
                labelText = $input.prev().html().replace("：", "");
                break;
            case "password":
                phText = "密码";
                labelText = $input.prev().html().replace("：", "");
                break;
            case "verifycode":
                phText = "验证码";
                labelText = $input.prev().html().replace("：", "");
                break;
            case "phoneNumber":
                phText = "手机号";
                labelText = $input.prev().html().replace("：", "");
                break
            }

            phText && $input.attr("placeholder", phText);
            labelText && $input.prev().html(labelText);
            return this;
        },

        /**
         * 创建注册事件的UI，原来登录框的dom中不包含此部分
         * @private
         */
        _createAuthsiteUI: function() {
            var me = this,
                authsiteCfg = me.data("authsiteCfg"),
                $scrollerWrap = me.data("dialog").widget().find(".contentHtml");

            /*$("head").append("<script type='text/javascript' src='http://passport.baidu.com/phoenix/account/jsapi'></script>");*/
            $("<div class='login-authsite'><span class='login-authsite-des'>使用合作网站账号登录</span></div>").appendTo($scrollerWrap);
            authsiteCfg["authsiteOption"]["target"] = $(".login-authsite")[0];
            authsiteCfg["authsiteOption"]["html"] = {
                'tsina': '新浪微博',
                'renren': '人人网'
            };
            baidu.phoenix.require(authsiteCfg["authsiteCont"], authsiteCfg["authsiteOption"]);
            return me;
        },

        /**
         * 创建注册事件的UI，原来登录框的dom中不包含此部分
         * @private
         */
        _createRegUI: function() {
            var me = this,
                $scrollerWrap = me.data("dialog").widget().find(".contentHtml");
            $("<div class='login-reg'><span class='login-reg-des'>还没有百度账户？</span><a class='login-reg-link' href='https://passport.baidu.com/v2/?reg' target='blank'>立即注册百度帐号</a></div>").appendTo($scrollerWrap);
            return me;
        },

        /**
         * 输入框focus时dialog框到顶部的事件
         * @private
         */
        _dialogGotop: function(e) {
            var me = this,
                $el = me.data("dialog").widget(),
                dialogMoveDis = 0,
                orientation;

            (window.orientation == 0 || window.orientation == 180) && (orientation = "vertical");
            (window.orientation == 90 || window.orientation == -90) && (orientation = "horizon");

            if (($.os.ios && orientation == "vertical") || ($.os.android && orientation == "horizon")) {
                document.body.scrollTop = 0;
                dialogMoveDis = window.pageYOffset;
            } else {
                dialogMoveDis = window.pageYOffset - $el.find(".ui-dialog-title")[0].clientHeight;
            }

            $el.css("top", dialogMoveDis + "px");

            e.target.focus();
            $.later(function() {
                e.target.value = "1";
                e.target.value = ""
            }, 500);
            me.data({
                focusInput: e.target,
                isDialogGoTop: true
            });
            return me;
        },

        /**
         * dialog框居中
         * @private
         */
        _dialogCenter: function() {
            var me = this,
                $win = $(window),
                $dialogElem = me.data("dialog").widget(),
                topDis = $win.height() / 2 - $dialogElem.height() / 2 + window.pageYOffset;

            $dialogElem.css({
                left: $win.width() / 2 - $dialogElem.width() / 2,
                top: $.os.ios ? topDis : topDis + (2 * $dialogElem.find(".ui-dialog-title")[0].clientHeight + 35)
            });

            me.data("isDialogGoTop", false);
            return me;
        },

        /**
         * 显示login，在mask模式下传入坐标无效
         * @function
         * @name    $.ui.login.show
         * @param   {String}      x     横坐标
         * @param   {String}      y     纵坐标
         */
        show: function(x, y) {
            var me = this,
                dialog = me.data('dialog'),
                $dialog = dialog.widget();

            $dialog.css('display', 'block');
            if (x == undefined) {
                x = $(window).width() / 2 - $dialog.width() / 2;
                y = $(window).height() / 2 - $dialog.height() / 2 + window.pageYOffset;
            }
            me.data({
                dialogW: $dialog.width(),
                dialogPosX: x,
                dialogPosY: y
            });
            dialog.show(x, y);
            return me;
        },

        /**
         * 隐藏login
         * @function
         * @name    $.ui.login.hide
         * @param   {Boolean}   destroy   是否删除
         */
        hide: function(destroy) {
            this.data("dialog").hide(destroy);
            return this;
        },

        /**
         * 关闭login
         * @function
         * @name   $.ui.login.close
         */
        close: function() {
            this.data("dialog").close();
        },

        /**
         * 事件处理中心
         * @private
         */
        _eventHandler: function(e) {
            var me = this,
                target;

            switch (e.type) {
            case "input":
                $(e.target).css({
                    "color": "#333333",
                    "border-color": "#377ac9"
                });
                break;
            case "touchstart":
                target = e.target;
                while (target.nodeType != 1) target = target.parentNode;
                if (
                target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'BUTTON' && target.tagName != 'A' && target.tagName != 'LI' && !$(target).closest('.ui-dialog-close').length) {
                    e.preventDefault();
                } else if (target.type == 'checkbox') {
                    e.preventDefault();
                }
                me.data('noHideError', true);
                break;
            case "focus":
                !me.data("isDialogGoTop") && me._dialogGotop(e);
                me.data('hideErrorTimer') && clearTimeout(me.data('hideErrorTimer'));
                me.data('hideErrorTimer', null);
                break;
            case "resize":
            case "orientationchange":
                var $win = $(window),
                    $dialogElem = me.data("dialog").widget();
                me.data("dialogPosX", $win.width() / 2 - me.data("dialogW") / 2);
                $.later(function() {
                    $dialogElem.css({
                        left: $win.width() / 2 - $dialogElem.width() / 2,
                        top: me.data("isDialogGoTop") ? window.pageYOffset : $win.height() / 2 - $dialogElem.height() / 2 + window.pageYOffset
                    });
                }, $.os.ios ? 400 : 300);
            }
        }
    });

    document.write('<script type="text/javascript" src="https://passport.baidu.com/v2/api/?getapi&class=login&tpl=pp&tangram=true"></script>');   //异步加载js  add by zmm
    document.write('<script type="text/javascript" src="http://passport.baidu.com/phoenix/account/jsapi"></script>');
})(Zepto);
exports = Zepto.ui.login;

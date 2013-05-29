require('gmu:uibase');
require('gmu:base');
/**
 * $.ui.control
 * @file 公共行为方法
 */

(function($, undefined) {
    $.ui.define('control', function(require) {
        var os = $.os,
            version = parseFloat(os.version),
            isDesktop = !version,
            isIos = os.ios,
            isAndroid = os.android,
            htcBug = /htc_sensation_z710e/i.test(navigator.userAgent),
            adapter = {};

        /**
         * 固定位置
         * @name     $.ui.control.fix
         * @param    {String || HTMLElement}      elem      选择器或elements
         * @param    {Object}                     options   设置属性
         */
        adapter.fix = function(elem, options) {
            var $elem = $(elem),
                elem = $elem.get(0),
                UA = navigator.userAgent,
                isUC = /Linux/i.test(UA) || ($.os.ios && (!/safari/i.test(UA) && !/qq/i.test(UA))),
                opts = $.extend({zIndex: 999}, options || {}),
                offset = options.bottom ? options.bottom*-1 : (options.top||0);

            if ((isDesktop || isIos && version >= 5) && !htcBug && !isUC) {
                $elem.css('position', 'fixed').css(opts);

                if (!elem.isFixed && $.browser.qq) {
                     $(document).on('scrollStop', function() { // modified by zmm, 在QQ上当pageOffsetY大于45时，top值会自动增加45，trace:FEBASE-368
                        $elem.css('top', Math.max(-45, -window.pageYOffset) + 'px');
                    });
                }

                elem.isFixed = true;
                return;
            }

            opts['position'] = 'absolute';
            $elem.css(opts);
            if (!elem.isFixed) {
                elem.isFixed = true;
                $(document).on('scrollStop', function(e) {
                    $elem.css('top',window.pageYOffset + (options.bottom ? window.innerHeight  - $elem.height() : 0) + offset + 'px')
                });
            }
        };

        /**
         * 元素置顶浮动
         * @name      $.ui.control.setFloat
         * @param     {String || HTMLElement}      elem      选择器或elements
         */
        adapter.setFloat = function(elem) {
            var $elem = $(elem),
                $copy = $elem.clone().css({
                    opacity: 0,
                    display: 'none'
                }).attr('id', ''),
                isFloat = false,
                touch = {},
                defaultPosition = $elem.css('position') || 'static',
                appear = function() {
                    adapter.fix($elem, {
                        x: 0,
                        y: 0
                    });
                    $copy.css('display', 'block');
                    isFloat = true;
                },
                disappear = function() {
                    $elem.css('position', defaultPosition);
                    $copy.css('display', 'none');
                    isFloat = false;
                },
                check = function(pos) {
                    var top = $copy.get(0).getBoundingClientRect().top || $elem.get(0).getBoundingClientRect().top,
                        pos = pos || 0 + top;

                    if(pos < 0 && !isFloat){
                        appear();
                    }else if(pos > 0 && isFloat){
                        disappear();
                    }
                };

            $elem.after($copy);

            $(document).on('touchstart', function(e){
                touch.y = e.touches[0].pageY;
            }).on('touchmove', function(e){
                var pos = e.touches[0].pageY - touch.y;
                touch.y = e.touches[0].pageY;
                check(pos);
            });

            $(window).on('scroll', function() {
                check();
            });
        };
        
        return adapter;
    });

})(Zepto);
exports = Zepto.ui;

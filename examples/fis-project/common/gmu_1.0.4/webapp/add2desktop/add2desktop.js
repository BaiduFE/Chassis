



/**
 * @fileOverview
 * @description add2desktop组件
 */

(function($, undefined) {
    /**
     * @description add2desktop组件
     * @class
     * @name     $.ui.add2desktop
     * @grammar  $.ui.add2desktop(el[,options])
     * @mode     render模式
     * @param    {selector|zepto}       el                     根元素选择器或者对象
     * @param    {Object}               options                参数
     * @param    {String}               options.icon           (必选)产品线ICON'S URL
     * @param    {selector}             options.container      (可选)渲染到哪个元素 || document.body
     * @return   this
     */
    $.ui.create('add2desktop', {
        _data: {
            icon: '../../add2desktop/icon.png'
        },

        _create: function() {
            var me = this,
                $elem = (me.widget() || me.widget($('<div></div>'))).addClass('ui-add2desktop').css('display', 'none'),
                container = $(me.data('container') || document.body),
                addicon = ($.os.ios && ($.os.version).substr(0, 3)) > 4.1 ? 'ui-add2desktop-new' : 'ui-add2desktop-old',
                tpl = '<div class="ui-add2desktop-shadowbox"></div><div class="ui-add2desktop-content"><div class="ui-add2desktop-type"><img src="' + me.data('icon') + '"/></div><div class="ui-add2desktop-text">先点击<span class="' + addicon + '"></span>，<br>再"添加至主屏幕"</div><a href="javascript:;" class="ui-add2desktop-close"><span class="ui-add2desktop-close-btn"></span></a>';

            if (!$elem.html(tpl).parent().length) $elem.appendTo(container);
            me.trigger('create');
        },

        _init: function() {
            var me = this,
                os = $.os,
                version = parseFloat(os.version),
                isDesktop = !version,
                isIos = os.ios,
                isAndorid = os.android,
                ua = navigator.userAgent,
                isUC = me.data('isUC', /Linux/i.test(ua) || ($.os.ios && (!/safari/i.test(ua) && !/qq/i.test(ua)))),
                _rotateEV = me.data('rotateEV', 'ortchange');

            $('.ui-add2desktop-close').on('tap', function(e) {
                me.hide();
                (e.originalEvent || e).preventDefault();
            });

            me.data('_winfun', function(e) {
                me._setpos();
            });

            $(window).on(_rotateEV + ' scrollStop', me.data('_winfun'));

            me.widget().css('position', me.data('useFixed', isDesktop || isIos && version >= 5 && !isUC || isAndorid) ? 'fixed' : 'absolute');
            $(function() {
                $.later(function() {
                    me.data('available', true);
                    me._setpos().trigger('init');
                }, 200)
            });
        },

        _setpos: function() {
            var me = this,
                $elem = me.widget();

            !me.data('useFixed') && $elem.css('top', window.pageYOffset + $(window).height() - 85);
            return me.trigger('setpos');
        },
        /**
         * @description 隐藏add2desktop
         * @function
         * @name $.ui.add2desktop.hide
         * @return {Object} this
         */
        hide: function() {
            var me = this;
            $.later(function(){
                me.widget().css({display: 'none', zIndex: -1, left: -9999});
                me.trigger('close');
            }, 20);
            return me;
        },
        /**
         * @description 显示add2desktop
         * @function
         * @name $.ui.add2desktop.show
         * @return {Object} this
         */
        show: function() {
            var me = this;

            if ( $.os.ios) {
                if(!me.data('available')){
                    $.later( $.bind(me.show, me), 20);
                    return me;
                }

                me.widget().css({display: 'block', opacity: 0}).animate({
                    opacity: 1
                }, {
                    duration: 100,
                    ease: 'ease-in',
                    complete: function() {
                        me.trigger('open');
                    }
                });
            }
            return me;
        },
        /**
         * @description 销毁add2desktop
         * @function
         * @name $.ui.add2desktop.destroy
         * @return {Object} null
         */
        destroy: function() {
            var me = this;
            $(window).off(me.data('rotateEV')+ ' scrollStop', me.data('_winfun'));
            $('.ui-add2desktop-close', me.widget()).off().remove();
            me.widget().html('');
            me._super();
        }

    }).attach('control.fix');

})(Zepto);



require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/**
 * $.ui.dialog
 * @fileOverview  对话框组件
 */
(function($, undefined) {
    /**
     * @class
     * @name     $.ui.dialog
     * @param    {Object}     options                参数
     * @param    {String}     options.content        (必选)内容
     * @param    {Selector}   options.container      (可选)父元素
     * @param    {Number}     options.width          (可选)宽度
     * @param    {Number}     options.height         (可选)高度
     * @param    {String}     options.cls            (可选)样式
     * @param    {String}     options.title          (可选)标题
     * @param    {Boolean}    options.mask           (可选)是否启用遮罩：true
     * @param    {Boolean}    options.scrollMove     (可选)是否允许滑动：false
     * @param    {Boolean}    options.closeBtn       (可选)是否显示关闭按钮：true
     * @param    {Event}      options.onclose        (可选)组件关闭时触发
     */
    $.ui.create('dialog', {
        _data: {
            width: 300,
            mask: true,
            closeBtn: true
        },

        _create: function() {
            var me = this,
                container = me.data('container') || document.body,
                $elem = (me.widget() || me.widget($('<div></div>'))).css({
                    width: me.data('width'),
                    height: me.data('height')
                }).addClass('ui-dialog');

            me.data('cls') && $elem.addClass(me.data('cls'));
            me.data('title') && me.data('titleElem', $('<div class="ui-dialog-title"><div class="titleText">' + me.data('title') + '</div></div>')).appendTo($elem);
            me.data('contentElem', $('<div class="ui-dialog-content"><div class="contentHtml">' + me.data('content') + '</div></div>')).appendTo($elem);
            me.data('closeBtn') && (me.data('titleElem') || me.data('contentElem')).append('<div class="ui-dialog-close">×</div>');
            me.data('maskElem', $('<div class="ui-mask"></div>')).appendTo(document.body);
            $elem.appendTo($(container));
            me.trigger('create');
        },

        _init: function() {
            var me = this,
                $elem = me.widget(),
                _eventHandler = $.bind(me._eventHandler, me),
                _rotateEV = 'onorientationchange' in window ? 'orientationchange' : 'resize';

            $elem.on('touchmove click', _eventHandler);
            $(window).on(_rotateEV, _eventHandler);
            me.data('maskElem').on('touchmove click', _eventHandler);

            me.on('destroy', function() {
                $elem.off('touchmove click', _eventHandler);
                $(window).off(_rotateEV, _eventHandler);
            });

            me.trigger('init');
        },

        /**
         * 事件管理函数
         * @private
         */
        _eventHandler: function(e) {
            var me = this,
                elem = e.target;

            if (!me.data('status')) return;

            switch (e.type) {
                case 'touchmove':
                    !me.data('scrollMove') && e.preventDefault();
                    break;
                case 'click':
                    if (elem.className == 'ui-dialog-close' || elem.nodeValue == '×') me.hide();
                    else if (elem.className == 'ui-mask') me.trigger('maskClick');
                    break;
                case 'orientationchange':
                case 'resize': 
                    $.later(function() {
                        me._resize(e);
                    }, $.os.ios ? 400 : 300);
                    break;

            }
        },

        /**
         * 调整mask尺寸
         * @private
         */
        _resize: function(e) {
            var me = this,
                $mask = me.data('maskElem'),
                root = document.body;

            if ($mask.css('display') == 'block') {
                $mask.css({
                    width:  root.clientWidth,
                    height: Math.max(root.scrollHeight, root.clientHeight)
                });
            }
            me.trigger('resize');
        },

        /**
         * 设置 || 获取title
         * @function
         * @name    $.ui.dialog.title
         * @param   {String}      value    标题
         */
        title: function(value) {
            var $title = this.data('titleElem').find('.titleText');

            if (value != undefined) {
                $title.html(value);
                this.trigger('resize');
            }

            return $title.html();
        },

        /**
         * 设置 || 获取content
         * @function
         * @name    $.ui.dialog.content
         * @param   {String}      value    内容
         */
        content: function(value) {
            var $content = this.data('contentElem').find('.contentHtml');

            if (value != undefined) {
                $content.html(value);
                this.trigger('resize');
            }
            
            return $content.html();
        },

        /**
         * dialog居中
         * @private
         */
        _center: function() {
            var me = this,
                $elem = me.widget(),
                $win = $(window);

            $elem.css({
                left: $win.width() / 2,
                top: $win.height() / 2 + window.pageYOffset,
                marginTop: -$elem.height() / 2,
                marginLeft: -$elem.width() / 2
            });

            me.on('resize', function() {
                $elem.css({
                    left: $win.width() / 2,
                    top: $win.height() / 2 + window.pageYOffset,
                });
            });

            return me;
        },

        /**
         * 显示dialog，在mask模式下传入坐标无效
         * @function
         * @name    $.ui.dialog.show
         * @param   {String}      x     横坐标
         * @param   {String}      y     纵坐标
         */
        show: function(x, y) {
            var me = this,
                $elem = me.widget(),
                root = document.body,
                pos = {left: x || 0, top: y || 0};

            $elem.css('display', 'block');
            if (me.data('mask')) {
                me.data('maskElem').css({
                    display: 'block',
                    width: Math.max(root.scrollWidth, root.clientWidth),
                    height: Math.max(root.scrollHeight, root.clientHeight)
                });
            }

            x == undefined ? me._center() : $elem.css(pos);
            return me;
        },

        /**
         * 隐藏dialog
         * @function
         * @name    $.ui.dialog.hide
         * @param   {Boolean}   destroy   是否销毁
         */
        hide: function(destroy) {
            var me = this;
            me.widget().css('display', 'none');
            me.data('maskElem').css('display', 'none');
            me.trigger('close');
            destroy && me.destroy();
            return me;
        },

        /**
         * 关闭dialog
         * @function
         * @name    $.ui.dialog.close
         */
        close: function() {
            this.hide(true);
        },

        /**
         * 销毁组件
         * @function
         * @name    $.ui.dialog.destroy
         */
        destroy: function() {
            var me = this;
            me.data('maskElem').off('touchmove tap').remove();
            me._super();
        }

    }).attach('control.fix');

})(Zepto);

exports = Zepto.ui.dialog;

require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/** 
 * $.ui.toscreen
 * @fileOverview  添加桌面组件
 */
(function($) {
    /*
     * @class
     * @name       $.ui.toscreen
     * @param      {string}     el           放置的元素（body）
     * @param      {Object}     options
     * @param      {string}     content      内容
     * @param      {string}     key          本地存储的key   默认:screen
     * @param      {string}     value        本地存储的value 默认:1
     */
    $.ui.create('toscreen', {
        _data: {
            content: '',
            key: 'screen',
            value: 1
        },

        _create: function() {
            var me = this,
                $elem = me.widget() || me.widget($('<div class="ui-toscreen" id="screenIcon"></div>')),
                container = me.data('container'),
                $container = me.data('container', $(me.data('container') || $(document.body))),
                storage = window.localStorage,
                $close = $('<span id="screenClose" class="screenClose">×</span>'),
                key = me.data('key');
            if (storage) {
                if (storage.getItem(key)) {
                    return me;
                }
            }

            $elem.append(me.data('content')).append($close);

            if (!(!container && $elem.parent().get(0))) {
                $container.append($elem).css("padding-top", "80px")
            }
            me.trigger('create');
            return me;
        },

        _init: function() {
            var me = this,
                $elem = me.widget(),
                $close = $('.screenClose', $elem),
                $container = me.data('container'),
                key = me.data('key');
            $close.on('click', function() {
                $(this).parent().remove();
                $container.css("padding-top", "");
                if (window.localStorage) {
                    window.localStorage.setItem(key, me.data('value'));
                }
            })
            me.trigger('init');
        },

        /*
         * 添加|删除历史记录
         * @function
         * @name $.ui.toscreen.histroy
         */
        history: function(key) {
            var storage = window.localStorage,
                me = this;
            if (storage) {
                if (key == undefined) storage.removeItem(me.data('key'), me.data('value'));
                if (!storage.getItem(key) && key == me.data('key')) storage.setItem(key, me.data('value'));
            }
        }
    });

})(Zepto);
exports = Zepto.ui.toscreen;

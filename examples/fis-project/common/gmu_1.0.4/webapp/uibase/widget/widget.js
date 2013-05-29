

/**
 * $.ui.widget
 * @fileOverview 组件基类
 */

(function($, undefined){

    $.ui.create('widget', function() {}, {
        
        /**
         * 组件构造器
         * @name   instance._createWidget
         */
        _createWidget: function(selector, options) {
            var me = this;

            if ($.isPlainObject(selector)) {
                options = selector || {};
                selector = undefined;
            }

            $.extend(me, {
                _element: selector && $(selector),
                _data: $.extend({status: true, plugins: {}}, me._data, options)
            });

            me._create();
            me._init();

            me.widget().on('touchstart touchend tap', function(e) { // global events
                (e['bubblesList'] || (e['bubblesList'] = [])).push(me);
            });
        },

        /**
         * 创建dom
         * @name  instance._create
         */
        _create: function() {},

        /**
         * 初始化组件
         * @name  instance._init
         */
        _init: function() {},

        /**
         * 销毁组件
         * @name  instance._destroy
         */
        destroy: function() {
            var me = this,
                $elem;

            $.each(me.data('plugins'), function(id, component) {
                component.destroy();
            });
            $elem = me.trigger('destroy').off().widget();
            $elem.find('*').off();
            $elem.off().remove();
            me.__proto__ = null;
            $.each(Object.keys ? Object.keys(me) : me, function(i, key){
                delete me[key];
            });
        },

        /**
         * 获取or设置属性
         * @name     instance.data
         * @param    {String}    key      参数名
         * @param    {Any}       value    参数值  
         */
        data: function(key, value){
            var _data = this._data;
            if ($.isPlainObject(key)) return $.extend(_data, key);
            else return value !== undefined ? _data[key] = value : _data[key]; 
        },

        /**
         * 获取根元素
         * @name   instance.widget 
         */
        widget: function(elem) {
            return this._element = elem || this._element;
        },

        /**
         * 获取or设置component
         * @name     instance.component
         * @param    {String}       id               component id
         * @param    {Function}     createFn         component factory  
         * @return   {Component}                     component instance
         */
        component: function(id, createFn) {
            var me = this,
                plugins = me.data('plugins');

            try {
                if ($.isFunction(createFn)) {
                    plugins[id] = createFn.apply(me);
                } else if (createFn !== undefined) {
                    if (plugins[id]) plugins[id].destroy();
                    delete plugins[id];
                }
            } catch (e) {}
            
            return plugins[id];
        },

        /**
         * 注册事件
         * @name     instance.on
         * @param    {String}      ev          事件名
         * @param    {Function}    callback    事件处理函数
         * @param    {Object}      context     上下文对象
         */
        on: function(ev, callback, context) {
            var me = this,
                ev = ev.toLowerCase(),
                calls = me._callbacks || (me._callbacks = {}),
                list = calls[ev] || (calls[ev] = []);

            list.push([callback, context]);

            return me;
        },

        /**
         * 注销事件
         * @name     instance.off
         * @param    {String}      ev          事件名
         * @param    {Function}    callback    事件处理函数
         */
        off: function(ev, callback) {
            var me = this, calls;

            if (!ev) {// 如果事件为空，移除该组件的所有事件的绑定函数
                me._callbacks = {};
            } else if (calls = me._callbacks) {
                ev = ev.toLowerCase();

                if (!callback) {// 如果callback为空，移除该事件的所有绑定函数
                    calls[ev] = [];
                } else {
                    var list = calls[ev];
                    if (!list) return me;
                    for (var i = 0, l = list.length; i < l; i++) {
                        if (list[i] && callback === list[i][0]) {
                            list[i] = null;
                            break;
                        }
                    }
                }
            }

            return me;
        },

        /**
         * 触发事件
         * @name     instance.trigger
         * @param    {String}      type             事件名
         * @param    {All}         arguments      需要传递的参数
         */
        trigger: function(type) {
            var me = this,
                type = type.toLowerCase(),
                handler = me.data('on' + type),
                args = $.slice(arguments, 1),
                list, calls, callback;

            // 先执行参数中的onevent
            handler && handler.apply(me, args);

            if (!type || !(calls = me._callbacks)) return me;

            if (list = calls[type]) {
                for (var i = 0, l = list.length; i < l; i++) {
                    callback = list[i];
                    callback[0].apply(callback[1] || me, args);
                }
            }

            return me;
        }

    });

        
    $(document).ready(function() {
        // auto-self init
        $(document).trigger('pageInit');
    });

})(Zepto);





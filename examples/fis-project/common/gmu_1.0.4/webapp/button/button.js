



/**
 * @fileOverview
 * @description button组件
 */

(function ($, undefined) {
    /**
     * @description button组件
     * @class
     * @name     $.ui.button
     * @grammar  $.ui.button(el[,options])
     * @param      {selector}       el                     (可选)根元素
     * @param      {Object}         options                参数
     * @param     {selector}       options.selector       (可选)根元素, 跟el一致
     * @param     {String}         options.skin           (可选)风格
     * @param     {String}         options.text           (可选)内容
     * @param     {String}         options.title          (可选)标题
     * @param     {String}         options.href           (可选)链接
     * @param     {selector}       options.container      (可选)渲染到哪个元素
     * @param     {Boolean}        options.disabled       (可选)禁用与否
     * @param     {Event}          options.onclick        (可选)组件dom点击时触发
     * @param     {Event}          options.oncreate       (可选)组件创建节点后执行
     * @param     {Event}          options.oninit         (可选)组件初始化后执行
     * @param     {Event}          options.onstatechange  (可选)当状态可用与不可用发生变化时触发
     */
    $.ui.create('button', {
        _data:{
            selector:  '',
            skin:  '',
            container:  '',
            disabled: false
        },

        _create: function () {
            var me = this,
                $el = this.widget(),
                selector = this.data('selector'),
                text = this.data('text'),
                href = this.data('href'),
                title = this.data('title'),
                container = this.data('container');

            me.widget($el = $el || selector && $(selector) || $('<a></a>'));
            text !== undefined && $el.html(text);
            container ||  $el.parent().length || (container = 'body');
            container && $el.appendTo(container);
            href !== undefined && $el.attr('href', href);
            title !== undefined && $el.attr('title', title);
            me.trigger('create');
        },

        _init: function () {
            var me = this,
                $el = me.widget(),
                skin = me.data('skin'),
                eventHandler = $.bind(me._eventHandler, me);

            $el.addClass('ui-button' + (skin ? ' ui-button-' + skin + '' : ''))
                .on('touchstart touchend click touchcancel',eventHandler);
            $(document).on('touchstart', eventHandler);
            me._setState(!this.data('disabled'), true, true);
            me.on('destroy', function(){
                $el.off( 'touchstart touchend tap touchcancel', eventHandler);
                $(document).off('touchstart', eventHandler);
            });
            me.trigger('init');
        },

        /**
         * 事件管理器
         * @private
         */
        _eventHandler: function(e){
            var me = this,
                type = e.type,
                currentTarget = e.currentTarget || e.srcElement,
                $el = me.widget(),
                skin = me.data('skin');

            switch (type) {
                case 'touchstart':
                case 'mousedown':
                    if(currentTarget==document){
                        (e._target ? $el.not(e._target) : $el)
                            .filter('.ui-button-hover').
                            removeClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                        return ;
                    }
                    if (me.data('disabled')) {
                        e.preventDefault();
                        return false;
                    }
                    $(currentTarget).addClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                    e._target = currentTarget;
                    break;
                case 'touchend':
                case 'mouseup':
                case 'touchcancel':
                    $(currentTarget).removeClass('ui-button-hover' + (skin ? ' ui-button-' + skin + '-hover' : ''));
                    break;
                case 'tap':
                case 'click':
                    if (me.data('disabled')) {
                        e.preventDefault();
                        return false;
                    }
                    me.trigger('click', e);
                    break;
            }
        },

        /**
         * 设置按钮状态，传入true，设置成可用，传入false设置成不可用
         * @param enable
         * @private
         */
        _setState: function(enable, force, notrigger){
            var me = this,
                preState = !me.data('disabled'),
                $el = me.widget(),
                skin = me.data('skin');

            if(force || enable != preState){
                $el[enable?'removeClass':'addClass']('ui-button-disabled' + (skin ? ' ui-button-' + skin + '-disabled' : ''));
                this.data('disabled', !enable);
                notrigger || me.trigger('stateChange', enable);
            }
            return me;
        },

        /**
         * @description 设置成可用状态
         * @function
         * @name $.ui.button.enable
         * @param {Boolean} force 设置成可用状态
         * @return {Object} this
         */
        enable: function (force) {
            return this._setState(true, force);
        },

        /**
         * @description 设置成不可用状态
         * @function
         * @name $.ui.button.disable
         * @param {Boolean} force 设置成不可用状态
         * @return {Object} this
         */
        disable: function (force) {
            return this._setState(false, force);
        },

        /**
         * @description 切换可用与不可用状态
         * @function
         * @name $.ui.button.toggleEnable
         * @return {Object} this
         */
        toggleEnable: function () {
            return this._setState(this.data('disabled'));
        }

    }).attach("control.fix");
})(Zepto);


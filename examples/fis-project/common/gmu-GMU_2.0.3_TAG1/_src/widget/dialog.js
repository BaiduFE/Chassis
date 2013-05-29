/**
 * @file 弹出框组件
 * @name Dialog
 * @desc 弹出框组件
 * @import core/zepto.ui.js, core/zepto.highlight.js
 */
(function($, undefined) {
    var actualSize = function(el){
            var clone = $(el).first().clone(), size ={};
            clone.css({
                position:'absolute !important',
                left:'-99999px',
                display:'block !important'
            }).appendTo(document.body);

            size['width'] = clone.width();
            size['height'] = clone.height();
            clone.remove();
            return size;
        },
        tpl = '<% if(mask){ %><div class="ui-mask"></div><% } %>' +
            '<div class="ui-dialog">'+
                '<% if(title){ %>'+'<div class="ui-dialog-title">'+
                    '<h3><%=title%></h3>'+
                    '<% if(closeBtn){ %><a class="ui-dialog-close white" title="关闭"><span class="ui-icon ui-icon-delete white"></span></a><% } %>'+
                '</div>'+
                '<% } else if(closeBtn){ %><a class="ui-dialog-close white" title="关闭"><span class="ui-icon ui-icon-delete white"></span></a><% } %>'+
                '<div class="ui-dialog-content"></div>'+
                '<% if(btns){ %>'+
                    '<div class="ui-dialog-btns">'+
                    '<% for(var i=0, length=btns.length; i<length; i++){var item = btns[i]; %>'+
                        '<a class="ui-btn ui-btn-<%=item.index%>" data-key="<%=item.key%>"><%=item.text%></a>'+
                    '<% } %>'+
                    '</div>'+
                '<% } %>' +
            '</div> ';

    /**
     * @name $.ui.dialog
     * @grammar $.ui.dialog(options) ⇒ instance
     * @grammar dialog(options) ⇒ self
     * @desc **Options**
     * - ''autoOpen'' {Boolean}: (可选，默认：true)初始化后是否自动弹出
     * - ''closeBtn'' {Boolean}: (可选，默认：true)是否显示关闭按钮
     * - ''mask'' {Boolean}: (可选，默认：true)是否有遮罩层
     * - ''scrollMove'' {Boolean}: (可选，默认：true)是否禁用掉scroll，在弹出的时候
     * - ''title'' {String}: (可选)弹出框标题
     * - ''content'' {String|Selector}: (render模式下必填)弹出框内容
     * - ''width'' {String|Number}: (可选，默认: 300)弹出框宽度
     * - ''height'' {String|Number}: (可选，默认: \'auto\')弹出框高度
     * - ''buttons'' {Object}: (可选) 用来设置弹出框底部按钮，传入的格式为{key1: fn1, key2, fn2}，key将作为按钮的文字，fn将作为按钮点击后的Handler
     * - ''events'' 所有[Trigger Events](#dialog_triggerevents)中提及的事件都可以在此设置Hander, 如init: function(e){}。
     *
     * **如果是setup模式，部分参数是直接从DOM上读取**
     * - ''title'' 从element的title属性中读取
     * - ''content'' 直接为element。
     *
     * **比如**
     * <code>//<div id="dialog" title="弹出框标题"></div>
     * console.log($('#dialog').dialog('data', 'title')); // => 弹出框标题
     * console.log($('#dialog').dialog('data', 'content')); // => #dialog(Zepto对象)
     * </code>
     *
     * **Demo**
     * <codepreview href="../gmu/_examples/widget/dialog/dialog.html">
     * ../gmu/_examples/widget/dialog/dialog.html
     * </codepreview>
     */
    $.ui.define('dialog', {
        _data: {
            autoOpen: true,
            buttons: null,
            closeBtn: true,
            mask: true,
            width: 300,
            height: 'auto',
            title: null,
            content: null,
            scrollMove: true,//是否禁用掉scroll，在弹出的时候
            container: null,
            maskClick: null
        },

        /**
         * @name getWrap
         * @grammar getWrap() ⇒ Zepto instance
         * @desc 获取最外层的节点。
         */
        getWrap: function(){
            return this._data._wrap;
        },

        _setup: function(){
            var data = this._data;
            data.content = data.content || this._el.show();
            data.title = data.title || this._el.attr('title');
        },

        _getContainer: function(){
            return $(document.body);
        },

        _init: function(){
            var me = this, data = me._data, btns, i= 0, eventHanlder = $.proxy(me._eventHandler, me), vars = {}, $all;

            data._container = me._getContainer();
            $.each(['mask', 'title', 'closeBtn'], function(){
                vars[this] = data[this] || '';
            });

            vars['btns'] = btns= [];
            data.buttons && $.each(data.buttons, function(key){
                btns.push({
                    index: ++i,
                    text: key,
                    key: key
                });
            });

            $all = $($.parseTpl(tpl, vars));
            data._wrap = $all.filter('.ui-dialog');
            data._mask = data.mask ? $all.not(data._wrap) : null;
            data._content = $('.ui-dialog-content', data._wrap);
            data._title = data.title ? $('.ui-dialog-title', data._wrap):null;
            data._close = data.closeBtn && $('.ui-dialog-close', data._wrap).highlight('ui-dialog-close-hover');
            me._el = me._el || data._content;

            me.title(data.title);
            me.content(data.content);

            btns.length && $('.ui-dialog-btns .ui-btn', data._wrap).highlight('ui-state-hover');

            data._wrap.css({
                width: data.width,
                height: data.height
            });

            $all.appendTo(data._container);

            //bind events
            $(window).on('ortchange', eventHanlder);
            data._wrap.on('click', eventHanlder);
            data._mask && data._mask.on('click', eventHanlder);

            data._pos = {
                x:'center',
                y:'center'
            };
            data.autoOpen && me.root().one('init', function(){me.open();});
        },

        _eventHandler: function(e){
            var me = this, match, wrap, data = me._data, fn;
            switch(e.type){
                case 'ortchange':
                    data._size = null;
                    this.refresh();
                    break;
                case 'touchmove':
                    data.scrollMove && e.preventDefault();
                    break;
                case 'click':
                    if(data._mask && ($.contains(data._mask[0], e.target) || data._mask[0] == e.target )){
                        return me.trigger('maskClick');
                    }
                    wrap = data._wrap.get(0);
                    if( (match = $(e.target).closest('.ui-dialog-close', wrap)) && match.length ){
                        me.close();
                    } else if( (match = $(e.target).closest('.ui-dialog-btns .ui-btn', wrap)) && match.length ) {
                        fn = data.buttons[match.attr('data-key')];
                        fn && fn.apply(me, arguments);
                    }
                    break;
            }
        },

        /**
         * @name position
         * @grammar position(x, y) ⇒ instance
         * @desc 用来设置弹出框的位置，如果不另外设置，组件默认为上下左右居中对齐。位置参数接受，数值，百分比，带单位的数值，或者'center'。
         * 如: 100， 100px, 100em, 10%, center;
         * @notice 暂时不支持 left, right, top, bottom.
         */
        position: function(x, y){
            var data = this._data;
            $.extend(data._pos, {x:x, y:y});
            return this.refresh();
        },

        _calculate: function(){
            var me = this, data = me._data, pos = data._pos, css, size, $win, root = document.body, result = {};

            if (data._mask) {
                result.mask = {
                    width:  root.clientWidth,
                    height: Math.max(root.scrollHeight, root.clientHeight)-1//不减1的话uc浏览器再旋转的时候不触发resize.
                }
            }
            css = {};
            size = data._size;
            if(pos.x =='center'){
                css.left = '50%';
                css.marginLeft = -size.width/2 +'px';
            } else {
                css.left = pos.x;
                css.marginLeft = '0';
            }
            if(pos.y =='center'){
                $win = $(window);
                css.top = $win.height() / 2 + window.pageYOffset;
                css.marginTop = -size.height/2 +'px';
            } else {
                css.top = pos.y;
                css.marginTop = '0';
            }
            result.wrap = css;
            return result;
        },

        /**
         * @name refresh
         * @grammar refresh() ⇒ instance
         * @desc 用来更新弹出框位置和mask大小。如父容器大小发生变化时，可能弹出框位置不对，可以外部调用refresh来修正。
         */
        refresh: function(){
            var me = this, data = me._data, ret;
            if(data._isOpen) {
                data._size = data._size || actualSize(data._wrap);
                ret = this._calculate();
                'mask' in ret && data._mask.css(ret.mask);
                data._wrap.css(ret.wrap);
            }
            return me;
        },

        /**
         * @name open
         * @grammar open() ⇒ instance
         * @grammar open(x, y) ⇒ instance
         * @desc 弹出弹出框，如果设置了位置，内部会数值转给[position](widget/dialog.js#position)来处理。
         */
        open: function(x, y){
            var data = this._data;
            data._isOpen = true;

            if(x!==undefined){
                this.position(x, y);
            } else {
                this.refresh();
            }

            data._wrap.css('display', 'block');
            data._mask && data._mask.css('display', 'block');

            $(document).on('touchmove', $.proxy(this._eventHandler, this));
            return this.trigger('open');
        },

        /**
         * @name close
         * @grammar close() ⇒ instance
         * @desc 关闭弹出框
         */
        close: function(){
            var eventData, data = this._data;

            eventData = $.Event('beforeClose');
            this.trigger(eventData);
            if(eventData.defaultPrevented)return this;

            data._isOpen = false;
            data._wrap.css('display', 'none');
            data._mask && data._mask.css('display', 'none');

            $(document).off('touchmove', this._eventHandler);
            return this.trigger('close');
        },

        /**
         * @name title
         * @grammar title([value]) ⇒ value
         * @desc 设置或者获取弹出框标题。value接受带html标签字符串
         * @example $('#dialog').dialog('title', '标题<span>xxx</span>');
         */
        title: function(value) {
            var data = this._data;
            if(value) {
                $('h3', data._title).html(data.title = value);
                data._close && data._close.appendTo(data._title);
            } else if(value !== undefined) {
                data._title && (data._title.remove(), data._title = null);
                data.title = value;
                data._close && data._close.appendTo(data._wrap);
            }
            return data.title;
        },

        /**
         * @name content
         * @grammar content([value]) ⇒ value
         * @desc 设置或者获取弹出框内容。value接受带html标签字符串和zepto对象。
         * @example
         * $('#dialog').dialog('content', '内容');
         * $('#dialog').dialog('content', '<div>内容</div>');
         * $('#dialog').dialog('content', $('#content'));
         */
        content: function(value) {
            var data = this._data;
            value!==undefined && data._content.empty().append(data.content = value);
            return data.content;
        },

        /**
         * @desc 销毁组件。
         * @name destroy
         * @grammar destroy()  ⇒ instance
         */
        destroy: function(){
            var data = this._data, _eventHander = this._eventHandler;
            $(window).off('ortchange', _eventHander);
            $(document).off('touchmove', _eventHander);
            data._wrap.off('click', _eventHander).remove();
            data._mask && data._mask.off('click', _eventHander).remove();
            data._close && data._close.highlight();
            return this.$super('destroy');
        }

        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         *
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
         * | open | event | 当弹出框弹出后触发 |
         * | beforeClose | event | 在弹出框关闭之前触发，可以通过e.preventDefault()来阻止 |
         * | close | event | 在弹出框关闭之后触发 |
         * | destory | event | 组件在销毁的时候触发 |
         */
    });
})(Zepto);
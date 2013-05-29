
/**
 * @file 页面切换组件
 * @name Pageswipe
 * @desc 切换页面内容和索引
 * @import core/zepto.extend.js, core/zepto.ui.js, core/zepto.iscroll.js,core/zepto.fix.js
 */


(function($, undefined) {
    /**
     * @name     $.ui.pageswipe
     * @grammar  $(el).pageswipe(options) ⇒ self
     * @desc **el**
     * css选择器, 或者zepto对象
     * **Options**
     * - ''toolbar'' {selector}: (可选) 要随页面左右滑动且位置属性为position：fixed的工具栏
     * - ''iconWidth'' {Number}: (可选，默认：50) 侧边栏按钮的宽度
     * - ''springBackDis'' {Number}: (可选，默认：15) 滑动较小时的回弹的阀值
     * **Demo**
     * <codepreview href="../gmu/_examples/widget/pageswipe/pageswipe.html">
     * ../gmu/_examples/widget/pageswipe/pageswipe.html
     * ../gmu/_examples/widget/pageswipe/pageswipe_demo.css
     * </codepreview>
     */
    
    $.ui.define('pageswipe', {
        _data:{
            toolbar:            '',
            iconWidth:          55,
            springBackDis:      15,
            _stamp:             0,
            _locked:            false,
            _isShow:            false
        },
        _create: function() {
            throw('Sorry, :(');
        },

        _setup: function(mode) {
            var me = this,
                root = me.root(),
                children = root.children('div');
            root.addClass('ui-pageswipe').append($('<div class="ui-pageswipe-wheel"></div>').append(children.first().addClass('ui-pageswipe-content')).append(children.last().addClass('ui-pageswipe-index')));
        },

        _init: function() {
            var me = this,
                root = me.root(),
                _width = root.width(),
                _end = _width - me.data('iconWidth'),
                _wheel = root.find('.ui-pageswipe-wheel'),
                _content = root.find('.ui-pageswipe-content'),
                _index = root.find('.ui-pageswipe-index'),
                _toolbar = $(me.data('toolbar')).fix({top:0}).find('div').get(0),
                _eventHandler = $.proxy(me._eventHandler, me);
            _index.width(_end);
            _wheel.on('touchstart touchmove touchend touchcancel', _eventHandler);
            $(window).on('ortchange', _eventHandler);
            _content.on('tap', _eventHandler);
            me.data({
                _wheel:         _wheel[0],
                _index:         _index[0],
                _width:         _width,
                _end:           _end,
                _toolbar:       _toolbar
            });
            me.on('destroy', function() {
                $(me.data('toolbar')).remove();
                $(window).off('ortchange', _eventHandler);
            });
            return me;
        },

        /**
         * 事件处理中心
         */
        _eventHandler: function(e) {
            var me = this;
            switch (e.type) {
                case 'touchmove':
                    me._touchMove(e);
                    break;
                case 'touchstart':
                    me._touchStart(e);
                    break;
                case 'touchcancel':
                case 'touchend':
                    me._touchEnd();
                    break;
                case 'tap':
                    me.data('_isShow') && me.hide();
                    break;
                case 'ortchange':
                    me._resize.call(me);
                    break;
            }
        },

        /**
         * touchStart事件处理
         */
        _touchStart: function(e) {
            var me = this,
                toolbar = me.data('_toolbar');
            me.data({
                top:        document.body.scrollTop,
                pageX:      e.touches[0].pageX,
                pageY:      e.touches[0].pageY,
                S:          false,      //isScrolling
                T:          false,      //isTested
                X:          0           //horizontal moved
            });
            me.data('_wheel').style.webkitTransitionDuration = '0ms';
            toolbar && (toolbar.style.webkitTransitionDuration = '0ms');
        },

        /**
         * touchMove事件处理
         */
        _touchMove: function(e) {
            var me = this,
                o = me._data,
                X =  e.touches[0].pageX - o.pageX,
                _isShow = o._isShow;
            if(!o.T) {
                var S = Math.abs(X) < Math.abs(e.touches[0].pageY - o.pageY);
                !S && !_isShow && X < 0 && (o._index.style.top = document.body.scrollTop + 'px');
                o.T = true;
                o.S = S;
            }
            if(!o.S) {
                e.preventDefault();
                X = o.X = _isShow ? (X > 0 ? X : 0) - o._end : (X < 0 ? X : 0);
                o._wheel.style.webkitTransform = 'translate3d(' + X + 'px,0,0)';
                o._toolbar && (o._toolbar.style.webkitTransform = 'translate3d(' + X + 'px,0,0)');
            } else o._isShow && e.preventDefault();
        },

        /**
         * touchEnd事件处理
         */
        _touchEnd: function() {
            var me = this,
                o = me._data,
                X = o.X,
                _end = o._end,
                s = o.springBackDis;
            if(o.T && !o.S) {
                if(!o._isShow) (X < -s && o.top === document.body.scrollTop) ? me.show() : X < 0 ? me.hide() : '';
                else X > s - _end ? me.hide() : (X > - _end && X < s - _end) ? me.show() : '';
            }
        },

        /**
         * 转屏事件处理
         */
        _resize: function() {
            var me = this, o = me._data,
                _width = o._width = me.root().width(),
                _end = o._end = _width - me.data('iconWidth');
            o._index.style.width = _end + 'px';
            me.hide();
            return me;
        },

        /**
         * @desc 显示右侧索引页
         * @name show
         * @grammar show() => self
         *  @example
         * //setup mode
         * $('#pageswipe').pageswipe('show');
         *
         * var demo = $('#pageswipe').pageswipe('this'); //组件实例
         * demo.show();
         */
        show: function() {
            var me = this,
                o = me._data;
            if(Date.now() - o._stamp > 40) {
                var cssText = '-webkit-transition:400ms;-webkit-transform:translate3d(-' + o._end + 'px,0,0);';
                o._wheel.style.cssText += cssText;
                o._toolbar && (o._toolbar.style.cssText += cssText);
                o._stamp = Date.now();
                o._isShow = true;
                me.trigger('show');
            }
            return me;
        },

        /**
         * @desc 隐藏右侧索引页
         * @name hide
         * @grammar hide() => self
         * @example
         * //setup mode
         * $('#pageswipe').pageswipe('hide');
         *
         * var demo = $('#pageswipe').pageswipe('this'); //组件实例
         * demo.hide();
         */
        hide: function() {
            var me = this,
                o = me._data;
            if(Date.now() - o._stamp > 40) {
                var cssText = '-webkit-transition:400ms;-webkit-transform:translate3d(0,0,0);';
                o._wheel.style.cssText += cssText;
                o._toolbar && (o._toolbar.style.cssText += cssText);
                o._stamp = Date.now();
                o._isShow = false;
                me.trigger('hide');
            }
            return me;
        },

        /**
         * @desc 切换右侧索引页的显隐状态
         * @name hide
         * @grammar hide() => self
         * @example
         * //setup mode
         * $('#pageswipe').pageswipe('toggle');
         *
         * var demo = $('#pageswipe').pageswipe('this'); //组件实例
         * demo.toggle();
         */
        toggle: function() {
            var me = this;
            if(!me.data('_isShow')){
                me.data('_index').style.top = document.body.scrollTop + 'px';
                me.show();
            } else me.hide();
            return me;
        }
        /**
         * @name Trigger Events
         * @theme event
         * @desc 组件内部触发的事件
         * ^ 名称 ^ 处理函数参数 ^ 描述 ^
         * | init | event | 组件初始化的时候触发 |
         * | afterScroll | event | 返回顶部后触发的事件 |
         * | show | event | 显示时触发的事件 |
         * | hide | event | 隐藏时触发的事件 |
         * | destory | event | 组件在销毁的时候触发 |
         */
    });

})(Zepto);

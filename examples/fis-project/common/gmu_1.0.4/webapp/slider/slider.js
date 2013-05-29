



/**
 * @file
 * @desc 图片轮播组件
 * @author renxuqiang@baidu.com
 */

(function ($, undefined) {
    /**
     * slider组件
     * @class
     * @name $.ui.slider
     * @grammar $.ui.slider(el [,options])
     * @param {selector|zepto} el 根元素
     * @param {Object} options 参数
     * @param {selector|zepto} options.container (可选)所创建实例的容器，根元素会被移动到该容器中(setup模式会忽略该参数)
     * @param {Boolean} options.setup (可选)是否使用setup模式: false
     * @param {Array} options.content (可选)内容
     * @param {Number} options.index (可选)起始播放序号: 0
     * @param {Boolean} options.imgInit (可选)初始加载几张图片: 2
     * @param {Boolean} options.imgZoom (可选)是否缩放图片: false
     * @param {Boolean} options.boundSpring (可选)播放到边界时是否回弹: false
     * @param {Boolean} options.springBack (可选)滑动较小时是否回弹: true
     * @param {Number} options.springBackDis (可选)滑动能够回弹的最大距离: 10
     * @param {Boolean} options.autoPlay (可选)是否自动播放: true
     * @param {Number} options.autoPlayTime (可选)自动播放的间隔: 5000ms
     * @param {Number} options.animationTime (可选)滑动动画时间: 300ms
     * @param {Boolean} options.showArr (可选)是否展示上一个下一个箭头: true
     * @param {Boolean} options.showDot (可选)是否展示页码: true
     * @param {Function} options.onclick (可选)点击页面时执行的函数
     * @param {Function} options.onslide (可选)开始切换页面时执行的函数，参数为滑动后的page页码
     * @param {Function} options.onslideend (可选)页面切换完成(滑动完成)时执行的函数，参数为滑动后的page页码
     */
    $.ui.create('slider', {
        _data:{
            container:              '',
            setup:                  false,
            content:                '',
            index:                  0,
            imgInit:                2,
            imgZoom:                false,
            boundSpring:            false,
            springBack:             true,
            springBackDis:          10,
            autoPlay:               true,
            autoPlayTime:           5000,
            animationTime:          400,
            showArr:                true,
            showDot:                true,
            onclick:                '',
            onslide:                '',
            onslideend:             '',
            _direction:             1,
            _dirCache:              1,
            _touchOver:             0
        },

        _create:function () {
            this._createUI()._loadImg();
        },

        _init:function () {
            var me = this,
                index = me.data('index'),
                instance = me.data('instance'),
                _eventHandler = $.bind(me._eventHandler, me);
            $(me.data('wheel')).on('touchstart touchmove touchend webkitTransitionEnd', _eventHandler);
            $(window).on('ortchange', _eventHandler);
            //上一张
            $('.ui-slider-pre', instance).on('tap', function () {
                me.pre();
            });
            //下一张
            $('.ui-slider-next', instance).on('tap', function () {
                me.next();
            });
            me.data('onclick') && me.widget().on('click', me.data('onclick'));
            index && me._slide(index, 0);
            me.data('autoPlay') && me._setInterval();
            me.on('destroy', function(){
                clearInterval(me.data('play'));
                $(window).off('ortchange', _eventHandler);
            })
        },

        /**
         * 创建界面
         * @private
         */
        _createUI:function () {
            var me = this, instance;
            if (!me.data('setup')) {
                instance = (me.widget() || me.widget($('<div></div>'))).addClass('ui-slider')[0];
                if (instance.parentNode) {
                    me.data('container') && $(me.data('container')).append(instance);
                } else{
                    $(me.data('container') || document.body).append(instance);
                }
                var i = 0, j, k = [], content = me.data('content');
                if(content.length == 1) me.data('showArr', false);
                instance.innerHTML = '<div class="ui-slider-wheel"><div class="ui-slider-group">' +
                    (function () {
                        for (; j = content[i]; i++) {
                            k.push('<div class="ui-slider-item"><a href="' + j.href + '"><img class="ui-slider-lazyload" lazyload="' +
                                j.pic + '"/></a><p class="ui-slider-items-bottom"><a href="' +
                                j.href + '"><img class="ui-slider-smallpic" src="' + j.smallpic + '" /></a><a href="' + j.href + '"><span class="ui-slider-title">' +
                                j.title + '</span></a><br /><span class="ui-slider-subTitle">' + j.subTitle + '</span></p></div>');
                        }
                        k.push(!me.data('boundSpring') ? '</div><div class="ui-slider-group">' + k.join('') + '</div></div>' : '</div></div>');
                        if (me.data('showDot')) {
                            k.push('<p class="ui-slider-items-dots">');
                            while (i--) k.push('<b></b>');
                            k.push('</p>');
                        }
                        me.data('showArr') && (k.push('<span class="ui-slider-pre"><b></b></span><span class="ui-slider-next"><b></b></span>'));
                        return k.join('');
                    }());
            } else {
                instance = me.widget().addClass('ui-slider')[0];
                if (!me.data('boundSpring')) {
                    $('.ui-slider-wheel', instance).append($('.ui-slider-group', instance).clone());
                }
            }

            //设置轮播条及元素宽度,设置选中dot
            var width = instance.offsetWidth,
                height = instance.offsetHeight,
                items = $('.ui-slider-item', instance).css('width', width + 'px').toArray(),
                length = items.length,
                wheel = $('.ui-slider-wheel', instance).css('width', width * length + 'px')[0],
                dots = $('.ui-slider-items-dots b', instance).toArray();
            me.data('showDot') && (dots[me.data('index')].className = 'ui-slider-dot-select');

            //缓存元素及属性
            me.data({
                instance:       instance,
                wheel:          wheel,
                items:          items,
                length:         length,
                width:          width,
                height:         height,
                dots:           dots
            });
            return me;
        },

        /**
         * 图片延迟加载&&绑定缩放事件
         * @private
         */
        _loadImg:function () {
            var me = this,
                instance = me.data('instance'),
                $allImgs = $('.ui-slider-lazyload', instance),
                lazyImgs = $('.ui-slider-lazyload', instance).toArray();
            if (me.data('imgZoom')) $allImgs.on('load', function () {
                var height = this.height,
                    width = this.width,
                    c_height = me.data('height'),
                    c_width = me.data('width'),
                    min_height, min_width,
                    style = this.style;
                if (height / c_height > width / c_width) {
                    min_height = Math.min(height, c_height);
                    style.height = min_height + 'px';
                    style.width = min_height / height * width + 'px';
                } else {
                    min_width = Math.min(width, c_width);
                    style.width = min_width + 'px';
                    style.height = min_width / width * height + 'px';
                }
                this.onload = null;
            });
            var allImgs = $allImgs.toArray();
            if (allImgs.length == 1 || allImgs.length == 2 && !me.data('boundSpring')) me.data('autoPlay', false);
            var i = 0, j = '', k = allImgs.length,
                l = me.data('imgInit') || allImgs.length;
            for (; i < l; i++) {
                j = allImgs[i];
                j && (j.src = j.getAttribute('lazyload'));
                if (!me.data('boundSpring')) {
                    j = allImgs[i + k / 2];
                    j && (j.src = j.getAttribute('lazyload'));
                }
                lazyImgs.shift();
            }
            var items = me.data('items'),
                length = me.data('length'),
                width = me.data('width');
            for(i = 0; i < length; i++) {
                j = items[i].style;
                j.webkitTransform = 'translate3d(' + i*width + 'px,0,0)';
                j.zIndex = 900 - i;
            }
            me.data({
                lazyImgs:lazyImgs,
                allImgs:allImgs
            });
            return me;
        },

        /**
         * 设置自动播放
         * @private
         */
        _setInterval:function () {
            var me = this, o = me._data,
                _direction = o._direction;
            if (!_direction || !o.autoPlay) return;
            clearInterval(o.play);
            o.play =  setInterval(function () {
                me._slide.call(me, o.index + _direction, true);
            }, o.autoPlayTime);
            return me;
        },

        /**
         * 轮播位置判断
         * @private
         */
        _slide:function (index, auto) {
            var me = this,
                o = me._data,
                length = o.length;
            if (-1 < index && index < length) {
                me._move(index);
                o._direction =  auto ? 0 : o._dirCache;
            } else if (index == length) {
                if (o.boundSpring) {
                    me._move(index - (auto ? 2 : 1));
                    o._direction = o._dirCache =  -1;
                } else {
                    me._move(length / 2 - 1, 0);
                    o._direction = o._dirCache =  1;
                    setTimeout(function () {me._move(length / 2)}, 20);
                }
            } else {
                if (o.boundSpring) {
                    me._move(index + (auto ? 2 : 1));
                } else {
                    me._move(length / 2, 0);
                    setTimeout(function () {me._move(length / 2 - 1)}, 20);
                }
                o._direction = o._dirCache =  1;
            }
            return me;
        },

        /**
         * 轮播方法
         * @private
         */
        _move:function (index, duration) {
            var o = this._data,
                style = o.wheel.style,
                dotIndex = o.boundSpring ? index : ((index > o.length / 2 - 1 ) ? index - o.length / 2 : index);
            if(duration === undefined) duration = o.animationTime;
            o.onslide && this.trigger('slide', dotIndex);
            //加载图片
            if (o.lazyImgs.length) {
                var j = o.lazyImgs.shift();
                j.src = j.getAttribute('lazyload');
                j = o.allImgs[index];
                j.src || (j.src = j.getAttribute('lazyload'));
            }
            if (o.showDot) {
                o.instance.getElementsByClassName('ui-slider-dot-select')[0].className = '';
                o.dots[dotIndex].className = 'ui-slider-dot-select';
            }
            o.index = index;
            style.webkitTransitionDuration = duration + 'ms';
            style.webkitTransform = 'translate3d(' + (-index * o.width) + 'px,0,0)';
        },

        /**
         * 事件管理函数
         * @private
         */
        _eventHandler:function (e) {
            var me = this;
            switch (e.type) {
                case 'touchstart':
                    me._touchStart(e);
                    break;
                case 'touchmove':
                    me._touchMove(e);
                    break;
                case 'touchend':
                    me._touchEnd();
                    break;
                case 'webkitTransitionEnd':
                    me._transitionEnd();
                    break;
                case 'ortchange':
                    me._resize.call(me);
                    break;
            }
        },

        /**
         * touchstart事件
         * @private
         */
        _touchStart:function (e) {
            var me = this;
            me.data({
                start:      {pageX:e.touches[0].pageX, pageY:e.touches[0].pageY},
                S:          false,      //isScrolling
                T:          false,      //isTested
                X:          0           //horizontal moved
            });
            me.data('wheel').style.webkitTransitionDuration = '0ms';
        },

        /**
         * touchmove事件
         * @private
         */
        _touchMove:function (e) {
            var o = this._data;
            var X = o.X = e.touches[0].pageX - o.start.pageX;
            if (!o.T) {
                if((new Date) - o._touchOver < 180) return;
                var index = o.index,
                    length = o.length,
                    S = Math.abs(X) < Math.abs(e.touches[0].pageY - o.start.pageY);
                if (!o.boundSpring) {
                    o.index = index > 0 && (index < length - 1) ? index
                            : (index == length - 1) && X < 0 ? length / 2 - 1
                            : index == 0 && X > 0 ? length / 2
                            : index;
                }
                if(!S) clearInterval(o.play);
                o.T = true;
                o.S = S;
            }
            if (!o.S) {
                e.preventDefault();
                o.wheel.style.webkitTransform = 'translate3d(' + (X - o.index * o.width) + 'px,0,0)';
            }
        },

        /**
         * touchend事件
         * @private
         */
        _touchEnd:function () {
            var me = this,
                o = me._data,
                X = o.X,
                distance = o.springBack ? o.springBackDis : 0;
            !o.S && me._slide(o.index + (X <= -distance ? 1 : (X > distance) ? -1 : 0), false);
            o._touchOver = Number(new Date);
        },

        /**
         * 滑动结束
         * @private
         */
        _transitionEnd:function () {
            var me = this;
            me._setInterval();
            if(me.data('onslideend')){
               var index = me.data('index'),
                   length = me.data('length');
               me.trigger('slideend', me.data('boundSpring') ? index : ((index > length / 2 - 1 ) ? index - length / 2 : index));
            }
            return me;
        },
        
        /**
         * 重设容器及子元素宽度
         * @private
         */
        _resize:function () {
            var me = this, o = me._data,
                style = o.wheel.style,
                width = o.width = o.instance.offsetWidth,
                length = o.length,
                items = o.items,
                i = 0, j;
            clearInterval(o.play);
            style.width = width * length + 'px';
            for(; i < length; i++) {
                j = items[i].style;
                j.width = width + 'px';
                j.webkitTransform = 'translate3d(' + i*width + 'px,0,0)';
            }
            style.webkitTransitionDuration = '0ms';
            style.webkitTransform = 'translate3d(' + -(o.index * width) + 'px,0,0)';
            o._direction = 1;
            me._setInterval();
            return me;
        },

        /**
         * 滚动到上一张【回弹模式中,在第一张时无动作】
         */
        pre:function () {
            var me = this;
            me._slide(me.data('index') - 1, false);
            return me;
        },

        /**
         * 滚动到下一张【回弹模式中,在最后一张时无动作】
         */
        next:function () {
            var me = this;
            me._slide(me.data('index') + 1, false);
            return me;
        },

        /**
         * 停止自动播放
         */
        stop:function () {
            var me = this;
            clearInterval(me.data('play'));
            me.data('autoPlay', false);
            return me;
        },

        /**
         * 恢复自动播放
         */
        resume:function () {
            var me = this;
            me.data('_direction',1);
            me.data('autoPlay', true);
            me._setInterval();
            return me;
        }
    });
})(Zepto);







/**
 * @fileOverview swipe
 * @description setup模式滑动组件
 */

(function($, undefined) {
    /**
     * @description     swipe
     * @class
     * @name            $.ui.swipe
     * @grammar         $.ui.swipe(el[,options])
     * @param           {selector}          el                          (必选) 根元素
     * @param           {Object}            options                     参数
     * @param           {Number}            options.index               (可选) 起始序号, 第一个为0, 默认为0
     * @param           {Number}            options.loadImgNum          (可选) 初始加载图片数量，0为全部加载，默认为2
     * @param           {Number}            options.duration            (可选) 滑动时间，单位为ms，默认为300
     * @param           {Boolean}           options.showDot             (可选) 是否显示序号圆点，默认为true
     * @param           {Boolean}           options.useDefaultTpl       (可选) 是否使用模板， 默认为false ,若设为true，需设置content参数
     * @param           {Array}             options.content             (可选) 自定义内容
     */
    $.ui.create('swipe', {
        _data: {
            index: 0,
            loadImgNum: 2,
            duration: 300,
            showDot: true,
            useDefaultTpl: false,
            content:''
        },
        _create: function() {
            this._setup();
        },
        _init:function(){
            var me = this,
                index = parseInt(me.data('index'));
            me._addHandler();
            //resize时重设宽度
            var _resize = $.bind(me._resize, me);
            $(window).on('ortchange', _resize);
            me.data('_resize', _resize);
            index &&(me.slide(index, 0));
        },

        //创建界面
        _setup: function() {
            var me = this,
                container = me.widget()[0];
            if(! container ) return;
            container.style.overflow = 'hidden';
            if(me.data('useDefaultTpl')) {
                var i = 0, j, k = '', content = me.data('content');
                container.innerHTML = '<div class="ui-swipe-wheel">' +
                    (function(){
                        for(;j = content[i]; i++) {
                            k += '<div class="ui-swipe-item"><div class="ui-swipe-top"><a href="' + j.titleLink +
                                '"><img class="ui-swipe-lazyload" lazyload="' + j.pic + '"src=""/></a><p class="ui-swipe-title">' + j.title + '</p></div><ul>' +
                                '<li><a href="' + j.link_1 + '">' + j.news_1 + '</a></li>' +
                                '<li><a href="' + j.link_2 + '">' + j.news_2 + '</a></li>' +
                                '<li><a href="' + j.link_3 + '">' + j.news_3 + '</a></li>' +
                                '<li><a href="' + j.link_4 + '">' + j.news_4 + '</a></li></ul></div>';
                        }
                        k += '</div>';
                        if(me.data('showDot')) {
                            k += '<div class="ui-swipe-dots">';
                            while(i--) k += "<b></b>";
                            k += '</div>';
                        }
                        return k;
                    }());
            }

            //图片延迟加载
            var loadImgNum = me.data('loadImgNum'),
                lazyImgs = $('.ui-swipe-lazyload',container).toArray(),
                l = loadImgNum || lazyImgs.length;
            i = 0; j = '';
            for(;i < l; i++){
                j = lazyImgs[0];
                j.src = j.getAttribute('lazyload');
                lazyImgs.shift();
            }

            //设置轮播条及元素宽度,设置选中dot
            var width = container.offsetWidth,
                items = $('.ui-swipe-item', container).css('width', width + 'px'),
                length = items.length,
                wheel = $('.ui-swipe-wheel', container).css('width', width*length + 'px'),
                dots = $('.ui-swipe-dots b', container);
            $(dots.get(me.data('index'))).addClass('ui-swipe-dot-select');

            //缓存元素及属性
            me.data({
                wheel: wheel,
                items: items,
                length: length,
                width: width,
                dots: dots,
                lazyImgs:lazyImgs
            });
            return me;
        },

        /**
         * @description 轮播方法
         * @function
         * @name $.ui.suggestion.slide
         * @param {Number} 索引
         * @param {String} 秒
         * @return {undefined}
         */
        slide: function(index, duration){
            var me = this,
                width = me.data('width'),
                style = me.data('wheel')[0].style,
                lazyImgs = me.data('lazyImgs'), j;
            //加载图片
            if(lazyImgs.length){
                j = lazyImgs[0];
                j.src = j.getAttribute('lazyload');
                lazyImgs.shift();
                me.data('lazyImgs',lazyImgs);
            }
            (duration == undefined) &&  (duration = me.data('duration'));
            style.webkitTransitionDuration = style.transitionDuration = duration + 'ms';
            style.webkitTransform = 'translate3d(' + -(index * width) + 'px,0,0)';
            me.data('index', index);
            var dots = me.data('dots');
            dots.removeClass('ui-swipe-dot-select');
            $(dots.get(index)).addClass('ui-swipe-dot-select');
            return me;
        },

        //添加事件监听
        _addHandler: function() {
            var me = this;
            me.data('wheel').on('touchstart',function(e){
                me.data('start', {pageX:e.touches[0].pageX, pageY:e.touches[0].pageY});
                me.data('S',false);
                me.data('T',false);
                me.data('deltaX', 0);
                me.data('wheel').css("-webkit-transition-duration",'0ms');
                e.stopPropagation();
                return me;
            }).on('touchmove', function(e){
                var start = me.data('start'),
                    deltaX = e.touches[0].pageX - start.pageX;
                me.data('deltaX',deltaX);
                if (!me.data('T')) {
                    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
                    me.data('S',Math.abs(deltaX) < Math.abs(e.touches[0].pageY - start.pageY));
                    me.data('T',true);
                }
                if (!me.data('S')) {
                    e.preventDefault();
                    var index = me.data('index'),
                        temp = deltaX / ( (!index && deltaX > 0 || index == me.data('length') - 1  && deltaX < 0 ) ?
                                          ( Math.abs(deltaX) / me.data('width') + 1 ) : 1 );
                    me.data('deltaX', temp);
                    me.data('wheel')[0].style.webkitTransform = 'translate3d(' + (temp - index * me.data('width')) + 'px,0,0)';
                    e.stopPropagation();
                }
            }).on('touchend', function(){
                var deltaX = me.data('deltaX'),
                    index = me.data('index'),
                    isValidSlide = Math.abs(deltaX) > 20 || Math.abs(deltaX) > me.data('width')/2,
                    isPastBounds = (!index && deltaX > 0) || (index == me.data('length') - 1 && deltaX < 0);
                me.slide( index + ( isValidSlide && !isPastBounds ? (deltaX < 0 ? 1 : -1) : 0 ), me.data('duration') );
                return me;
            });

        },
        _resize: function(){
            var me = this,
                width = me.widget()[0].offsetWidth;
            me.data('width',width);
            me.data('items').css('width', width + 'px');
            me.data('wheel').css('width', width * me.data('length') + 'px');
            me.slide(me.data('index'), 0);
            return me;
        },
        /**
         * @description 销毁组件
         * @function
         * @name $.ui.swipe.destroy
         */
        destroy: function() {
            var me = this;
            me.data('wheel').off();
            $(window).off('ortchange', me.data('_resize'));
            me._super();
        }
    }).attach("control.fix");
})(Zepto);


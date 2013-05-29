



/**
 * @fileOverview
 * @description carousel组件
 * @author maxingchi@baidu.com & guanshiliang@baidu.com
 */

(function($, undefined) {
    /**
     * @description     carousel组件
     * @class
     * @name            $.ui.carousel
     * @grammar         $.ui.carousel(el[,options])
     * @mode            render模式
     * @param           {selector|zepto}       el                       容器选择器或者对象
     * @param           {Object}               options                  参数
     * @param           {selector|zepto}       options.container        (必选)父元素 不能为body 需要设置高度 为了适应不同产品线的图片大小需求 容器高度由产品线确定
     * @param           {Boolean}              options.imgInit          (可选)初始显示几张，不支持loop及imgClip模式
     * @param           {Boolean}              options.imgClip          (可选)是否裁减图片
     * @param           {Array}                options.content          (可选)内容 包括href(点击图片进入的页面url(默认为javascript:;)),pic(图片地址 String),title(标题 String),subTitle(二级标题 String)
     * @param           {Boolean}              options.loop             (可选)是否循环(默认为false)
     * @param           {Boolean}              options.autoPlay         (可选)是否自动播放(默认为false)
     * @param           {Number}               options.autoPlayTime     (可选)自动播放的间隔(ms)(默认为5000)
     * @param           {Boolean}              options.springBack       (可选)滑动较小时是否回弹(默认为false)
     * @param           {Number}               options.springBackDis    (可选)滑动能够回弹的最大距离(px)(默认为50)
     * @param           {Boolean}              options.boundSpring      (可选)当设置非循环时滑动到第一页和最后一页是否有回弹效果(默认为true)
     * @param           {Boolean}              options.showArr          (可选)是否展示上一个下一个箭头(默认为true)
     * @param           {Number}               options.arrTop           (可选)箭头距离顶部的位置(px)(默认为37)
     * @param           {Boolean}              options.showDot          (可选)是否展示页码(默认为true)
     * @param           {Number}               options.animationTime    (可选)滑动动画时间(ms)(默认为300)
     * @param           {Boolean}              options.useDefaultTpl    (可选)是否使用默认模版(默认为true) 为true时必须设置content参数；为false时必须设置initTpl和num参数
     * @param           {Number}               options.num              (可选)轮播数目
     * @param           {Function}             options.initTpl          (可选)每一page的模版渲染 参数为当前page页码 返回值为html字符串
     * @param           {Function}             options.flipTpl          (可选)当每一page的dom结构相似 每次滑动只需要修改部分元素的内容或属性时为了提高页面性能 使用该函数 参数为当前page的父元素 无需返回值
     * @param           {Boolean}              options.forceInitTpl     (可选)是否每次渲染page时强制使用initTpl
     * @param           {Function}             options.onclick          (可选)点击页面时执行的函数 参数为当前page页码
     * @param           {Function}             options.onslide          (可选)开始切换页面时执行的函数 参数为滑动后的page页码
     * @param           {Function}             options.onslideEnd       (可选)页面切换完成(滑动完成)时执行的函数 参数为滑动后的page页码
     */
    $.ui.create('carousel', {
        _data: {
            num: 0,
            select: 0,
            imgClip: false,
            autoPlay: false,
            autoPlayTime: 5000,
            animationTime: 300,
            springBack: false,
            springBackDis: 50,
            boundSpring: true,
            loop: false,
            showDot: true,
            showArr: true,
            arrTop: 37,
            useDefaultTpl: true,
            initTpl: null,
            flipTpl: null,
            forceInitTpl: false,
            slideFn: null,
            slideEndFn: null
        },

        _create: function() {
            this._initProperty()._createUI()._initPage().trigger('create');
        },
		
        _init: function() {
            var me = this;
            me._eventHandler();
            if (me.select != 0 && me.select < me.num) me.slideTo(me.select);
            var _resize = $.bind(me._resize, me),
                EV = "onorientationchange" in window ? "orientationchange" : "resize";
            $(window).on(EV, _resize);
            me.data('_resize', _resize);
            me.trigger('init');
        },

		/**
         * 初始化属性
         * @private
         */
        _initProperty: function(){
            var me = this,
                $elem = me.widget();

            me.data({
                _index: 0,
                _cur: 0,
                _dir: 1,
                _autoplayInterval: null,
                _slideDis: 0
            });

            me.data("useDefaultTpl") && me.data("num", me.data("content").length); 
            me.data('num') == 1 && me.data({autoPlay: false, showDot: false, showArr: false});
            return me;
        },

        /**
         * 组件创建时渲染page
         * @private
         */
        _initPage: function(){
            var me = this,
                loop = me.data('loop'),
                num = me.data('num');

            if (num == 1) me._setItemData(0, 0, true);
            else {
                var minu = loop ? 1 : 0;
                for (var i = 0; i < 3; i++) {
                    me._setItemData(i, i - minu, true);
                }
            }
            return me;
        },

         /**
          * 绑定事件
          * @private
          */  
        _eventHandler: function() {
            var me = this,
                panel = me.data('_panel'),
                loop = me.data('loop'),
                autoPlay = me.data('autoPlay'),
                beg, end, dis, dis2, vLock, slide;

            $(panel).on('touchstart', function(e) {
                slide = false;
                me._setContainerWidth()._removePanelTransition();
                if (e.touches) beg = [e.touches[0].clientX, e.touches[0].clientY];
                me.removeAutoPlay();

            }).on('touchmove', function(e) {
                var cur = me.data('_cur'),
                    num = me.data('num'),
                    index = me.data('_index'),
                    containerWidth = me.data("_containerWidth");

                if (e.touches) {
                    end = [e.touches[0].clientX, e.touches[0].clientY];
                    dis = beg[0] - end[0];
                    dis2 = beg[1] - end[1];
                }

                if (!slide) {
                    slide = true;
                    vLock = Math.abs(dis2) < Math.abs(dis);
                    vLock ? e.preventDefault() : autoPlay && me.addAutoPlay();
                } else {
                    if (vLock) {
                        if ((!loop) && ((dis < 0 && cur == 0) || (dis >= 0 && cur == num - 1))) {
                            if (me.data('boundSpring')) {
                                me._setTranslate(panel, -(cur * containerWidth + dis / 2) + "px");
                            }
                        } else {
                            me._setTranslate(panel, -(index * containerWidth + dis) + "px");
                        }
                        e.preventDefault()
                    }
                }
            }).on('touchend', function(e) {
                var cur = me.data('_cur'),
                    num = me.data('num'),
                    index = me.data('_index'),
                    containerWidth = me.data("_containerWidth");
                autoPlay && me.addAutoPlay();
                if (!slide || !vLock) return;
                if (typeof dis != 'number') dis = 0;

                var percent = 1 - Math.abs(dis) / me.data('_containerWidth');
                me.data("_slideDis", dis);
                if ((!loop) && ((dis < 0 && cur == 0) || (dis >= 0 && cur == num - 1))) {
                    me.curr(1 - percent);
                    return;
                }

                if (me.data('springBack') && Math.abs(dis) < me.data('springBackDis')) {
                    me.curr(1 - percent);
                    return;
                }

                if (dis < 0) me.pre(percent);
                else if (dis > 0) me.nex(percent);
                else me.curr(1 - percent);

            }).on('webkitTransitionEnd', function(e) {
                beg = end = [];
                dis = dis2 = 0;
                me.trigger('slideEnd', me.data('_cur'));

            }).on('click', function(e) {
                autoPlay && me.addAutoPlay();
                me.trigger('click', me.data('_cur'));
            });
            autoPlay && me.addAutoPlay();
            return me;
        },
        _resize:function (e) {
            var me = this,
                panel = me.data('_panel'),
                delayTime = ($.os.android) ? 1000 : 0;
            setTimeout(function() {
                me._setContainerWidth();
                !$.os.ios && me._setTranslate(panel, (-me.data("_index")) * me.data('_containerWidth') + "px");
            }, delayTime);
        },
		/**
         * 创建UI
		 * @private
         */
        _createUI: function() {
            var me = this,
                $elem = me.widget(),
                num = me.data('num'),
                loop = me.data('loop'),
                $container = $(me.data("container") || document.body)[0],
                $panel, $itema, $itemb, $itemc;

            if (me.data('setup')) {
                var $items = $elem.find('.ui-carousel-item');
                $panel = $elem.find('.ui-carousel-wrap');
                $itema = $items.eq(0);
                $itemb = $items.eq(1);
                $itemc = $items.eq(2);
            } else {
                $panel = $('<div class="ui-carousel-wrap"></div>');
                $itema = $('<div class="ui-carousel-item"></div>');
                $itemb = $('<div class="ui-carousel-item"></div>');
                $itemc = $('<div class="ui-carousel-item"></div>');
            }

            $elem = $elem ? $elem.addClass('ui-carousel') : me.widget($('<div></div>')).addClass("ui-carousel");

            num < 3 && me.data('loop', false);
            me.data('loop') ? me._setTranslate($itema, "-100%")._setTranslate($itemb, "0%")._setTranslate($itemc, "100%") : me._setTranslate($itema, "0%")._setTranslate($itemb, "100%")._setTranslate($itemc, "200%");
            $elem.append($panel.append($itema).append($itemb).append($itemc));
            $container.appendChild(me.widget().get(0));

            if (me.data("useDefaultTpl") && me.data('forceInitTpl', true)) {
                var data = me.data('content'),
                    imgClip = me.data('imgClip'),
                    imgInit = me.data('imgInit');

                me.data("initTpl", function(i) {
                    var html = [];
                    html.push('<div class="ui-carousel-page"><a class="ui-carousel-link" href="' + (data[i].href || 'javascript:;') + '">');
                    if (imgClip) me._imgClip(data[i].pic, html, i)
                    else {
                        if (loop) html.push('<img class="ui-carousel-image" src="' + data[i].pic + '"/>');
                        else if (!loop && (!imgInit || i < imgInit || i > 2)) html.push('<img class="ui-carousel-image" src="' + data[i].pic + '"/>');
                        else html.push('<img class="ui-carousel-image" pre="' + data[i].pic + '"/>');
                    }    
                    if (data[i].title || data[i].subTitle) {
                        html.push('<div class="ui-carousel-info">');
                        data[i].title && html.push('<p class="ui-carousel-title1">' + data[i].title + '</p>');
                        data[i].subTitle && html.push('<p class="ui-carousel-title2">' + data[i].subTitle + '</p>');
                        html.push('</div>');
                    }
                    html.push('</a></div>');
                    return html.join('');
                });
            }

            if (me.data('showDot')) {
                var dots = me._createDots();
                me.data("_dot", new dots({
                    num: me.data('num')
                }));
                $container.appendChild(me.data("_dot").container);
            }

            if (me.data('showArr')) {
                var arrTop = me.data("arrTop");
                $larr = $('<a class="ui-carousel-lArr" style="top:' + arrTop + 'px"></a>');
                $rarr = $('<a class="ui-carousel-rArr" style="top:' + arrTop + 'px"></a>');
                $larr.on('click', function() {
                    me.pre();
                });
                $rarr.on('click', function() {
                    me.nex();
                });
                $container.appendChild($larr.get(0));
                $container.appendChild($rarr.get(0));
                me.data('$larr', $larr.get(0));
                me.data('$rarr', $rarr.get(0));
            }

            me.data('_container', me.widget().get(0));
            me.data('_panel', $panel.get(0));
            me.data('_items', [$itema.get(0), $itemb.get(0), $itemc.get(0)]);

            me.num < 3 && $itemc.css("display", "none");
            me.num < 2 && $itemb.css("display", "none");
            return me._setContainerWidth()._addPanelTransition();
        },

        /**
         * 图片裁减
         * @private
         */
        _imgClip: function(url, array, num){
            var me = this,
                img = new Image();
            img.src = url;
            array.push('<div class="ui-carousel-clip" data-clip="' + num + '"><img class="ui-carousel-image" src="' + url + '"/></div>');
            img.onload = function(){
                img.onload = null;
                var scale = img.width / img.height,
                    $elem = me.widget(),
                    $clip = $('[data-clip="' + num + '"]'),
                    $img = $clip.children('img'),
                    height = $elem.height(),
                    width = $elem.width(),
                    cmpScale = width / height;

                scale > cmpScale ? (img.height > height && $img.css({height: '100%', display: 'block'}).removeClass('ui-carousel-image')) : (img.width > width && $img.css({width: '100%', display: 'block'}).removeClass('ui-carousel-image'));      
            };
        },

		/**
         * 创建页码
		 * @private
         */
        _createDots: function() {
            var panelDots = function(opt) {
                    this.select = opt.selectIndex || 0;
                    this.num = opt.num;
                    this.container = null;
                    this.dots = [];
                    this.init();
            };

            panelDots.prototype = {
                init: function() {
                    this.initDom();
                },

                initDom: function() {
                    var $dotPanel = $('<div class="ui-carousel-dots"></div>');
                    for (var i = 0; i < this.num; i++) {
                        var $item = $('<div class="ui-carousel-dot"></div>');
                        i == this.select&& $item.addClass("ui-carousel-dot-select");
                        $dotPanel.append($item);
                        this.dots.push($item.get(0));
                    }
                    this.container = $dotPanel.get(0);
                },

                selectDot: function(i) {
                    if (i != this.select) {
                        $(this.dots[this.select]).removeClass("ui-carousel-dot-select");
                        $(this.dots[i]).addClass("ui-carousel-dot-select");
                        this.select = i;
                    }
                }
            };

            return panelDots;
        },

        /**
         * 为元素设置transform属性
         * @private
         */
        _setTranslate: function(el, x, y, z) {
            $(el).css("-webkit-transform", "translate3d(" + (x || 0) + "," + (y || 0) + "," + (z || 0) + ")");
            return this;
        },

        /**
         * 获取当前一page宽度
         * @private
         */
        _setContainerWidth: function() {
            var me = this;
            me.data("_containerWidth", $(me.data("_container")).width());
            return me;
        },

        /**
         * 为外围元素设置transition(手指滑动时需要关闭transition，否则会导致页面滑动时颤抖)
         * @private
         */
        _addPanelTransition: function(percent) {
            var me = this;
            if (typeof percent != 'number') percent = 1;
            $(me.data('_panel')).css({
                "-webkit-transition-duration": parseInt(percent * me.data('animationTime')) + 'ms',
                "-webkit-transition-timing-function": 'linear'
            });
            return me;
        },

        /**
         * 删除外围元素transition
         * @private
         */
        _removePanelTransition: function() {
            var me = this;
            $(me.data('_panel')).css({
                "-webkit-transition-duration": '',
                "-webkit-transition-timing-function": ''
            });
            return me;
        },

        /**
         * 获取滑动到第i张时每一page的transform值
         * @private
         */
        _getCurrentTrans: function(i) {
            var me = this,
                num = me.data('num');

            if (me.data('loop')) return [Math.floor((i + 2) / 3) * 3 - 1, Math.floor((i + 1) / 3) * 3, Math.floor(i / 3) * 3 + 1];
            if (i == 0 || num == 2) return [0, 1, 2];
            if (i == num - 1) i = num - 2;
            return [parseInt((i + 1) / 3) * 3, parseInt((i + 3) / 3) * 3 - 2, parseInt((i + 2) / 3) * 3 - 1];
        },

        /**
         * 获取滑动到第i张时所有page的序列
         * @private
         */
        _getCurSeq: function(i) {
            var me = this,
                num = me.data('num');

            if (me.loop) return [i % 3, (i + 1) % 3, (i + 2) % 3];
            if (i == 0) return [0, 1, 2];
            if (i == num - 1) i = num - 2;
            return [(i - 1) % 3, i % 3, (i + 1) % 3];
        },

		/**
		 * 设置滑到第i张时每一page的transfrom值
		 * @private
		 */
        _setItemPos: function(i, dir) {
            var me = this,
                items = me.data('_items'),
                panel = me.data('_panel'),
                p = me._getCurrentTrans(i),
                $img = $('.ui-carousel-image', me.widget()).eq(i);

            $img.attr('pre') && $img.attr('src', $img.attr('pre'));
            me._setTranslate(items[0], p[0] * 100 + "%")._setTranslate(items[1], p[1] * 100 + "%")._setTranslate(items[2], p[2] * 100 + "%");
            !$.os.ios ? me._setTranslate(panel, (-i) * me.data('_containerWidth') + "px") : me._setTranslate(panel, (-i * 100) + "%");
            return me;
        },

        /**
         * 获取滑到第i张时每一page时前后位置对应的data pos
         * @private
         */
        _getDataPos: function(i) {
            var me = this,
                j;

            if (me.data('loop')) {
                j = (i + 2) % 3;
                return j == 2 ? [2, 0] : [(j + 3) % 3, (j + 4) % 3];
            }
            if (i == 0) {
                return [-1, -1];
            } else if (i == 1) {
                return [-1, 0];
            } else {
                j = (i - 1) % 3;
                return j == 0 ? [2, 0] : [j - 1, j];
            }
        },

        /**
         * 设置滑到第i张时每一page时前后位置对应的data pos
         * @private
         */
        _setData: function(i, type) {
            var me = this;

            var p = me._getDataPos(i);
            if (p[type] !== -1) {
                me._setItemData(p[type], type == 0 ? i - 2 : i + 2);
            }
        },

        /**
         * 设置滑到第i张时每一page时所有位置对应的data pos(供slideTo)
         * @private
         */
        _setAllData: function(i) {
            var me = this,
                p = me._getCurSeq(i);

            if (me.data('loop')) {
                me._setItemData(p[0], i - 1)._setItemData(p[1], i)._setItemData(p[2], i + 1);
            } else {
                if (i == 0) {
                    me._setItemData(p[0], i)._setItemData(p[1], i + 1)._setItemData(p[2], i + 2);
                } else if (i == me.data('num') - 1) {
                    me._setItemData(p[0], i - 2)._setItemData(p[1], i - 1)._setItemData(p[2], i);
                } else {
                    me._setItemData(p[0], i - 1)._setItemData(p[1], i)._setItemData(p[2], i + 1);
                }
            }
            return me;
        },

        /**
         * 设置自动轮播
         * @private
         */
        _setAutoPlay: function() {
            var me = this,
                num = me.data('num'),
                cur = me.data('_cur');

            me._setContainerWidth();
            (cur >= num - 1) && me.data('_dir', -1);
            cur <= 0 && me.data('_dir', 1);
            return me.data('_dir') == 1 ? me.nex() : me.pre();
        },

        /**
         * 渲染page
         * @private
         */
        _setItemData: function(pos, i, init) {
            var me = this,
                loop = me.data('loop'),
                num = me.data('num'),
                forceInitTpl = me.data('forceInitTpl'),
                initTpl = me.data('initTpl'),
                flipTpl = me.data('flipTpl'),
                items = me.data('_items');

            i < 0 && (i += num * (parseInt(-i / num) + 1));
            i >= num && (i -= num * parseInt(i / num));
            if (init || forceInitTpl || typeof this.flipTpl != 'function') {
                items[pos].innerHTML = initTpl(i);
            } else {
                flipTpl.call(me, items[pos], i);
            }
            return me;
        },

        /**
         * @description 添加自动轮播
         * @function
         * @name $.ui.carousel.addAutoPlay
         * @return {Object} this
         */
        addAutoPlay: function() {
            var me = this;

            if (me.data('_autoplayInterval') === null) {
                me.data('_autoplayInterval', $.later(function() {
                    me._setAutoPlay();
                }, me.data('autoPlayTime'), true));
            }
            return me;
        },

        /**
         * @description 删除自动轮播
         * @function
         * @name $.ui.carousel.removeAutoPlay
         * @return {Object} this
         */
        removeAutoPlay: function() {
            var me = this;

            clearInterval(me.data('_autoplayInterval'));
            me.data('_autoplayInterval', null);
            return me;
        },

        /**
         * @description 向前滑一张
         * @function
         * @name $.ui.carousel.pre
         * @param {Number} per
         * @return {Object} this
         */
        pre: function(per) {
            var me = this,
                index, cur = me.data("_cur"),
                num = me.data("num"),
                loop = me.data("loop");

            if (cur <= 0 && !loop) return me;
            me._setData(me.data('_index'), 0);
            if (cur <= 0 && loop) {
                me.data("_cur", cur + num);
            }
            cur = me.data("_cur") - 1;
            me.data("_cur", cur);
            me.trigger('slide', cur);
            me.data('showDot') && me.data("_dot").selectDot(me.data("_cur"));

            index = me.data("_index") - 1;
            me.data("_index", index);
            me._addPanelTransition(per || 1);
            $.later(function() {me._setItemPos(index, -1);}, 0);
            return me;
        },

        /**
         * @description 向后滑一张
         * @function
         * @name $.ui.carousel.nex
         * @param {Number} per
         * @return {Object} this
         */
        nex: function(per) {
            var me = this,
                index, cur = me.data("_cur"),
                num = me.data("num"),
                loop = me.data("loop");

            if (cur >= num - 1 && !loop) return me;
            me._setData(me.data('_index'), 1);
            if (cur >= num - 1 && loop) me.data("_cur", cur - num);          
            cur = me.data("_cur");
            me.data("_cur", cur + 1);
            me.trigger('slide', me.data('_cur'));
            if (me.data('showDot')) me.data("_dot").selectDot(me.data("_cur"));
            me.data('_index', me.data("_index") + 1);
            me._addPanelTransition(per || 1);
            $.later(function() {me._setItemPos(me.data('_index'), 1);}, 0);
            return me;
        },

        /**
         * @description 滑动到当前位置(回弹效果)
         * @function
         * @name $.ui.carousel.curr
         * @param {Number} per
         * @return {Object} this
         */
        curr: function(per) {
            var me = this;
            me._addPanelTransition(per || 1);
            $.later(function() {me._setItemPos(me.data("_cur"));}, 0);
            return me;
        },


        /**
         * @description 滑动到第i张(无动画效果)
         * @function
         * @name $.ui.carousel.slideTo
         * @param {Number} i
         * @return {Object} this
         */
        slideTo: function(i) {
            var me = this,
                num = me.data('num');

            if (i < 0 || i >= num || i == me.data('_cur')) return me;
            me.data({_cur: i, _index: i});
            me._setAllData(i)._removePanelTransition()._setItemPos(i).trigger('slideFn', i);
            $.later(function() {me._addPanelTransition();}, 0);
            return me;
        },
        /**
         * @description 销毁组件
         * @function
         * @name $.ui.carousel.destroy
         */
        destroy: function() {
            var me = this,
                $container = $(me.data("container") || document.body)[0];
            clearInterval(me.data('_autoplayInterval'));
            me.data('_autoplayInterval', null);
            if (me.data('showArr')) {
            	$(me.data('$larr')).off();
            	$(me.data('$rarr')).off();
                $container.removeChild(me.data('$larr'));
                $container.removeChild(me.data('$rarr'));
            }
            me.data('showDot') && $container.removeChild(me.data("_dot").container);
            $(me.data('_panel')).off();
            $(window).off('onorientationchange' in window ? 'orientationchange' : 'resize', me.data('_resize'));
            me._super();
        }
    });

})(Zepto);



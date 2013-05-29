



/**
 * @file
 * @description gotop组件
 */

(function($, undefined) {
    /**
     * gotop组件
     * @class
     * @name $.ui.gotop
     * @grammar $.ui.gotop(el [,options])
     * @param {selector|zepto} el 父容器选择器或者对象
     * @param {Object} options 参数
     * @param {selector} options.container (可选)渲染到哪个元素: document.body
     * @param {selector} options.node (可选)返回到节点，如果不存在则返回到最顶部
     * @param {Boolean} options.useAnim (可选)返回顶部时是否使用动画: true
	 * @param {Object} options.afterScroll (可选)成功返回后执行的函数
     * @param {Object} options.touchendHandler (可选)当滚动完成后执行的，用来决定gotop是否显示，默认我们的插件是根据window.pageYOffset的值来的，但有时候可能是iscroll,这个时候需要传入自定义的方法来决定显示与隐藏
     */
    $.ui.create('gotop', {
        _data: {
            useAnim: true,
        	afterScroll: function() {},
            touchendHandler:function(){}
        },

        _create: function() {
            var me = this,
            	$el = me.widget(),
            	$container = $(me.data('container') || document.body);
		
			//设定默认el
            if($el == undefined) $el = me.widget($('<div class="ui-gotop"></div>'));
			!$el.hasClass('ui-gotop') && $el.addClass('ui-gotop');
			$el.html('<span>&nbsp;</span>');

			if (me.data('container') || !$el.parent().length) $el.appendTo($container);
            me.trigger('create').data('container', $container);
        },

        _init: function() {
            var me = this,
            	_eventHandler = $.bind(me._eventHandler, me);

            me.data('_eventHandler', _eventHandler);

            //modified by zmm，解决在android2.1上touch时间过长即为move的bug
            $.os.android && parseFloat($.os.version).toFixed(1) == 2.1 && $(document).on('touchstart', _eventHandler);
			$(document).on('touchmove mousewheel scrollStop', _eventHandler);
            $(window).on('scroll', _eventHandler);
            me.widget().on('click', _eventHandler);
            me.on("destroy", function () {                      //modified by zmm 添加destory事件
                me.widget().off("click", _eventHandler);
                $(document).off("touchmove touchend mousewheel scrollStop", _eventHandler);
                $(window).off('scroll', _eventHandler);
                $.os.android && parseFloat($.os.version).toFixed(1) == 2.1 && $(document).off('touchstart', _eventHandler);
            }).trigger('init');
        },

		/**
         * 显示滚动位置
		 * @private
         */
		_scrollTo: function() {
            var me = this,
                scrTop = window.pageYOffset,
                nodeTop = me.data('node') ? $(me.data('node')).offset().top : 0,
                timeId;

            if (!me.data('useAnim')) {
                window.scrollTo(0, nodeTop || 1);
                return me.hide().trigger('goTop');
            } else return me.hide().trigger('goTop', timeId = $.later(function() {
                if (nodeTop < scrTop) {
                    scrTop = scrTop - 100;
                    var y = scrTop - nodeTop < 100 ? nodeTop : scrTop;
                    window.scrollTo(0, y);
                } else clearInterval(timeId);
            }, 16, true));
		},

        /**
         * @description 显示gotop层
         * @function
         * @name $.ui.gotop.show
         * @return {Object} this
         */
        show: function(pos) {
            var me = this,
                $elem = me.widget();
            if (me.data('isShow') !== true) {
				$elem.css({
					'display': 'block',
					'visibility': 'visible'
				});
            	me.data('isShow', true);
            }
            $elem.css(pos || {});
			return me;
        },

        /**
         * @description 隐藏gotop层
         * @function
         * @name $.ui.gotop.hide
         * @return {Object} this
         */
        hide: function() {
            var me = this;
            if (me.data('isShow')) {
            	me.widget().css('display', 'none');
            	me.data('isShow', false);
            }
            return me;
        },

		/**
         * touchend事件处理
         * @private
         */
		_touchEndHandle: function(e) {
            if(this.data('touchendHandler') && this.data('touchendHandler').apply(this, [e])===false) return ;
			window.pageYOffset > $(window).height() ? this.show() : this.hide();
		},

		/**
         * touchmove事件处理
         * @private
         */
		_touchMoveHandle: function(e) {
            var me = this;

            if ($.os.android && parseFloat($.os.version).toFixed(1) == 2.1) {      //modified by zmm，解决在android2.1上touch时间过长即为move的bug
                me.data('moveY', e.touches[0].pageY);
                if (Math.abs(me.data('moveY') - me.data('startY')) < 30 && ($(e.target).hasClass('ui-gotop') || $(e.target).parent().hasClass('ui-gotop'))) {
                    $.later(function () {
                        me._scrollTo().hide().data('afterScroll') && me.data('afterScroll').apply(me);
                    }, 400);
                }else {
                    me.hide();
                }
            }else {
                me.hide();
            }
		},

		/**
         * 事件处理中心
         * @private
         */
        _eventHandler: function(e) {
			var me = this;
            switch (e.type) {
                case 'touchstart':    //modified by zmm，解决在android2.1上touch时间过长即为move的bug
                    me.data('startY', e.touches[0].pageY);
                    break;
                case 'touchmove':
                    clearTimeout(me.data('_touchended'));       //trance:
                    me.data('_touchended',setTimeout(function(){
                        me._touchEndHandle.call(me, e);
                    }, 300));
                    me._touchMoveHandle(e);
                    break;
                case 'click':
                    me._scrollTo().hide().data('afterScroll') && me.data('afterScroll').apply(this);
                    break;
                case 'scroll':
                    clearTimeout(me.data('_touchended'));
                    break;
				case 'mousewheel':
				case 'scrollStop':
					me._touchEndHandle(e);
					break;
			}
		},
        destroy:function(){
            var me = this;
            me.widget().off("click", me.data('_eventHandler'));
            $(document).off("touchmove mousewheel scrollStop", me.data('_eventHandler'));
            $.os.android && parseFloat($.os.version).toFixed(1) == 2.1 && $(document).off('touchstart', me.data('_eventHandler'));
            me._super();
        }

    }).attach('control.fix');

    $(document).on('pageInit', function() {
        // role: data-widget = gotop.
    });

})(Zepto);



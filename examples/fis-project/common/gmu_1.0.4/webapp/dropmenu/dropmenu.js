



/**
 * @file
 * @desc dropmenu组件
 */
(function($, undefined){
    /**
     * @desc       dropmenu组件
     * @class
     * @name       $.ui.dropmenu
     * @grammar    $.ui.dropmenu(el [,options])
     * @param      {HTMLElement}     el                         父元素
     * @param      {Object}     	 options             		参数
     * @param      {String}     	 options.content       		(必选)内容: [{text:'', callback:function(){}, className:''}]
     * @param      {String}          options.mode            	(可选)模式: selected
     * @param      {String}          options.offset            	(可选)下拉列表和上面button之间的距离: y=0
     * @param      {Boolean}     	 options.hasArrow    		(可选)是否显示箭头icon: false
     * @param      {HTMLElement}     options.container      	(可选)放置的父容器
     * @param      {String}    	     options.instanceId      	(可选)实例名称
     * @param      {Function}    	 options.callback           (可选)下拉列表点击事件回调函数
     * @param      {String}   		 options.position           (可选)排列方式: horizontal
     * @param      {String}   		 options.isScroll     	    (可选)是否滚动
     */
	$.ui.create('dropmenu', {
		_data: {
			content: [],
			container:'',
			mode: 'default',
			offset: 0,
			instanceId:'',
			hasArrow: false,
			position:'default',
			callback:'',
            isScroll:false
		},

		_create: function() {
			var me = this,
				instanceId = me.data('instanceId'),
				$container = $(me.data('container')||document.body),
				$widget = me.widget(),
				$el = $widget|| me.widget($('<div class="ui-dropmenu"></div>')),
				$arrow = me.data('arrow',$('<span class="ui-dropmenu-arrow"></span>')),
				$title = me.data('title',$('<span class="ui-dropmenu-title">'+me.data('content')[0].text+'</span>')),
				$button = me.data('button',$('<div class="ui-dropmenu-button"></div>')),
				$menu = me.data('menu',$('<div class="ui-dropmenu-content"></div>'));
			me.data('uiArrow',$('<span class="ui-dropmenu-content-arrow"></div>')).appendTo($menu);
			
			
			//如果el不存在，添加instanceId
			if(!$widget&&instanceId){
				$el.addClass(instanceId);
			}

			//渲染title
			$button.append($title);
			
			//渲染button,
			$el.css('position','relative').append($button);
			
			//渲染menu
			$el.append($menu);
			
			//将先menu隐藏
			$menu.css('visibility','hidden');
			
			//创建下拉列表
			me._createmenu();
			
			//渲染箭头
			if(me.data('hasArrow')){
				$button.append($arrow);
			}
			
			/*添加实例名称，同时渲染到container容器内
			 *当给定一个存在dom元素的时候，不做操作
			 */
			if(!$el.parent().get(0)){
				$el.appendTo($container);
			}
			
			//menu是否横排显示
			if(me.data('position')=='horizontal'){
				var $item = me.data('items');
				var items = $item.children();
				var str = 0;
				$item.addClass('horizontal');
				$.each($(items), function (index, item) {
                    str += $(item).offset().width;
                });
				$item.css({'float':'left'});
				$item.parent().css('width',str+'px');
				//设定滚动元素外层容器的高度
				if(me.data('isScroll')){
					$('.scrollBox',$menu).css('height',$item.offset().height+'px');
				}
			}
			//设定offset
			me._setOffset();
			
			//将visibility隐藏去掉
			$menu.css('visibility','visible');
			
			//默认菜单收起
			$menu.hide();
            
			me.trigger('create');
		},

		_init: function() {
			var me = this,
				$button = me.data('button'),
				$menu = me.data('menu'),
				$arrow = me.data('arrow'),
				$title = me.data('title'),
				data = me.data('content'),
				length = data.length,
				$item = me.data('items'),
				$items = $item.children(),
				callback = me.data('callback'),
				$el = me.widget();
			
			me.data('menuOffset',$menu.offset());
				
			//绑定button点击事件
			$button.on('touchstart',function(e){
                        if($arrow){
                            $arrow.toggleClass('ui-dropmenu-arrow-on')
                        }
                        //重置menu的offset
                        me.setOffset();
                        $menu.toggle();
                        me._resetScroll();
			});
			//绑定menu点击事件
			if(!me.data('isScroll'))
			$items.on('touchstart',function(e){
                setTimeout(function(){
                    me._menuEvent(e);
                },100);
            });

            var _eventHandler = $.bind(me._eventHandler, me);
			
			$(window).on('resize',_eventHandler);
			
			//点击外层容器menu消失
			$(document).on('touchstart',_eventHandler);

			if(me.data('isScroll')){
				$(document).on('DOMContentLoaded',_eventHandler);
			}
            me.on('destroy',function(){
                $(window).off('resize',_eventHandler);
                $(document).off('touchstart',_eventHandler);
                $(document).off('DOMContentLoaded',_eventHandler);
            });
			me.trigger('init');
		},

        /**
         * 事件中心
         * @private
         */
        _eventHandler: function(e){
            var me = this;
            switch (e.type) {
                case  'resize':
                    setTimeout(function(e){me.setOffset(e)},300);
                    break;
                case  'click':
                case  'touchstart':
                    me._isClose(e);
                    break;
                case 'DOMContentLoaded':
                    setTimeout(me.data('scroll'),200);
                    break;
            }
        },

        /**
         * 是否关闭
         * @private
         */
        _isClose: function(e) {
        	var me = this;
        	var bubblesList = e['bubblesList'];
        	if (!bubblesList || bubblesList.indexOf(me) == -1) {
        		me.hide();
        	}
        },

		/** 
		 * 创建menu
		 * @private
		 */
		_menuEvent: function(e) {
			var me = this,
				$target = $(e.target),
				index = me.data('index'),
				$title = me.data('title'),
				value = $title.html(),
				callback = me.data('callback'),
				mode = me.data('mode'),
				data = me.data('content'),
				length = data.length,
				$item = me.data('items'),
				$arrow = me.data('arrow'),
				$menu = me.data('menu'),
				$items = $item.children();

			$target = $target.closest('li');

			//添加配置项callback
			var i = $target.index();
			i = i < length - 1 ? i : length - 1;

			if (!data[i].callback) {
				if ($.isFunction(callback)) callback(i, $target, me);
			} else {
				data[i].callback(i, $target, me)
			}

			//mode=='selected'
			if (mode == 'selected') {
				$target.hide();

				$title.html($target.html());

				if (index == 0) {
					$items.first().html(value).show();
				} else {
					$($items.get(index)).show();
				}

				if ($arrow) {
					$arrow.toggleClass('ui-dropmenu-arrow-on')
				}
				$menu.hide();
				me.trigger('select');
			}
			me.data('index', $target.index());
		},
		

		_createmenu: function() {
			var me = this,
				data = me.data('content'),
				$menu = me.data('menu'),
				items = [],
				$items = me.data('items', $('<ul class="ui-dropmenu-items"></ul>'));
			$.each(data, function(index, item) {
				var className = data[index].className ? 'class="' + data[index].className + '"' : "";
				if (index > 0) items.push('<li ' + className + '>' + data[index].text + '</li>');
			});
			me.data('index', 0);
			me.data('length', items.length);
			//添加滚动对象
			if (me.data('isScroll')) {
				$menu.append('<div class="scrollBox"><div class="scroller"></div></div>');
				$('.scroller', $menu).append($items);
			} else {
				$menu.append($items);
			}
			$items.html('<li style="display:none;"></li>' + items.join(''));
		},
		

		_scroll: function() {
			var me = this,
				$menu = $('.scrollBox', me.data('menu')).get(0),
				hSroll = me.data('position') == 'horizontal' ? true : false,
				vScroll = me.data('position') != 'horizontal' ? true : false;

			var myScroll = new iScroll($menu, {
				hScroll: hSroll,
				vScroll: vScroll,
				onTouchEnd: function(e) {
					if (!this.moved && !this.absDistY) {
						me._menuEvent(e);
					}
				}
			});

			me.data('scroll', myScroll);
		},
		

        /**
         * @description 显示菜单
         * @function
         * @name $.ui.dropmenu.show
         * @return {Object} this
         */
		show: function() {
			var me = this,
				$arrow = me.data('arrow');
			me.setOffset();
			me.data('menu').show();
			if ($arrow) {
				$arrow.addClass('ui-dropmenu-arrow-on');
			}
			me._resetScroll();
			me.trigger('show');
			return me;
		},
		

        /**
         * @description 隐藏菜单
         * @function
         * @name $.ui.dropmenu.hide
         * @return {Object} this
         */
		hide: function() {
			var me = this,
				$arrow = me.data('arrow');
			me.data('menu').hide();
			if ($arrow) {
				$arrow.removeClass('ui-dropmenu-arrow-on');
			}
			me.trigger('hide');
			return me;
		},
		

		_setOffset: function(){
			var me = this,
				$menu = me.data('menu'),
				$arrow = me.data('uiArrow'),
				winW = document.body.clientWidth,
				curH = document.documentElement.clientHeight,
				bodyH = document.body.offsetHeight,
				winH = bodyH<curH?curH:bodyH,
				offset = me.data('offset'),
				offsetX = offset.x?offset.x:0,
				offsetY = offset.y?offset.y:offset;

			var offset = me.data('button').offset();
			var menuOffset = $menu.offset();

			$menu.css('top',(offset.height-1+offsetY)+'px');
			$arrow.css({'left':(menuOffset.width/2-6)+'px','top':'-7px'}).removeClass('ui-dropmenu-content-arrowbottom');
			$menu.css('left',(-(menuOffset.width-offset.width)/2+offsetX)+'px');

			//左边界判断
			if(offset.left<menuOffset.width/2){
				$menu.css('left',(0+offsetX)+'px');
				$arrow.css('left',(offset.width/2-6)+'px');
			}
			//右边界判断
			else if(winW-offset.width-offset.left<(menuOffset.width-offset.width)/2){
				$menu.css('left',(-(menuOffset.width-offset.width)+offsetX)+'px');
				$arrow.css('left',(menuOffset.width-offset.width/2-6)+'px');
			}
			//上边界判断
			if(winH-offset.height-offset.top-offsetY<menuOffset.height){
				$menu.css('top',-(menuOffset.height-1+offsetY)+'px');
				$arrow.css('top',(menuOffset.height-1)+'px').addClass('ui-dropmenu-content-arrowbottom');
			}
			me._resetScroll();
		},

		/** 
		 * 判断是否加载scroll或者是refresh
		 * @private
		 */
		_resetScroll: function() {
			var me = this;
			if (!me.data('scroll') && me.data('isScroll')) {
				me._scroll();
			} else if (me.data('scroll')) {
				me.data('scroll').refresh();
			}
		},
		

        /**
         * @description 重新计算offset
         * @function
         * @name $.ui.dropmenu.setOffset
         * @return {Object} null
         */
		setOffset: function() {
			var me = this,
				isShow = false,
				$menu = me.data('menu');
			//将菜单显示
			if ($menu.css('display') == 'none') {
				$menu.css('visibility', 'hidden').show();
				isShow = true;
			}
			me._setOffset();
			if (isShow) $menu.hide().css('visibility', 'visible');
		},
		

        /**
         * @description 销毁组件
         * @function
         * @name $.ui.dropmenu.destory
         */
        destroy: function () {
            var me = this;

            me.widget().off();

            if(me.data('scroll'))me.data('scroll').destroy();

            me._super();
        }
	});
	
})(Zepto);




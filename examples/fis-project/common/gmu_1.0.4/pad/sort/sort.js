require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
var iScroll = require('gmu:third-party/iscroll').iScroll;
/**
 * @fileOverview
 * @description sort组件
 */

(function($, undefined){
    /**
     * @description sort组件
     * @class
     * @name       $.ui.sort
     * @grammar    $.ui.sort(el[,options])
     * @param      {HTMLElement}           el                          父元素
     * @param      {Object}     			options             		参数
     * @param      {String}     			options.content       		(必选)内容   [{key:'',values:[text:'',value:'',className:'']}]
     * @param      {HTMLElement}    		options.container      		(可选)放置的父容器
     * @param      {Boolean}    			options.isShow      	    (可选)是否打开
     * @param      {Function}    			options.callback            (可选)下拉列表点击事件回调函数
     */
	$.ui.create('sort', {
		_data: {
			content: [],
			container:'',
			isShow: false,
            setup:false
		},

		_create: function() {
			var me = this,
				instanceId = me.data('instanceId'),
				$container = $(me.data('container')||document.body),
				$widget = me.widget() || me.widget($('<div class="ui-sort"></div>')),
                $sortList = $('<div class="sort-list-more"></div>'),
                $sortBar = $('<div class="sort-bar clearfix"></div>'),
                $sortButton = $('<div class="sort-list-button"><span class="sort-button open"></span></div>');

            if(me.data('setup')&&$widget.parent().get(0)){
                return me;
            }

            $widget.append($sortList).append($sortBar);

            //create bar
            $sortBar.append(me._createSortBar(me.data("content").def)).append($sortButton);

            //create list
            $sortList.append(me._createSortBar(me.data("content").more));

            if(!$widget.parent().get(0)){
                $widget.appendTo($container);
            }

            me.trigger('create');
		},

		_init: function() {
			var me = this,
                $el = me.widget();

                var eventHandler = $.bind(me._eventHandler, me);

                $('.sort-list',$el).on("touchstart",eventHandler);

                $('.sort-list-button',$el).on('click',function(e){me._close(e)});

            me._setSelect();

            $sortList = $('.sort-list-more',$el);

            me.data('moreList',$sortList.offset().height);

            if(!me.data('isShow')){
                me.hide();
            }
            else {
                var v = $sortList.get(0).style.webkitTransition;
                $sortList.get(0).style.webkitTransition = 'none';
                $sortList.css('height',me.data('moreList'));
                setTimeout(function(){
                    $sortList.get(0).style.webkitTransition = v;
                },100)
            }

			me.trigger('init');
		},
        /**
         * @description 关闭
         * @function
         * @private
         */
        _close: function(e){
            var me = this,
                $el = me.widget(),
                $more = $('.sort-list-more',$el);

            if($more.css('height')!='0px'){
                me.hide();
            }
            else {
                me.show();
            }
        },
        /**
         * @description 事件中心
         * @function
         * @private
         */
        _eventHandler:function(e){
            var me = this;
            switch (e.type) {
                case  'mousedown':
                case  'touchstart':
                    me._animation(e);
                    break;
            }
        },
        /**
         * @description 动画
         * @function
         * @private
         */
        _animation: function(e) {
           var me = this,
               $target = $(e.target).closest('li');

           if($target.length==0||$target.hasClass('ui-selected')){return false};

           var $parent = $target.closest('.sort-line'),
               offsetLeft = $parent.offset().left,
               $animation =  $parent.children().last(),
               left = $target.offset().left-1-offsetLeft,
               width = $target.offset().width,
               index = $target.index();

            $animation.css({
                width:index==0?width-2:width-1+'px',
                left:left==-1?0:left
            });

            if(!$target.hasClass('ui-selected')){
                var $parent = $target.parent();
                $('.ui-selected',$parent).removeClass('ui-selected');
                $target.addClass('ui-selected');
            }

            if(me.data('callback')){
                var value = me.getSortValue();
                var url = [];
                $.each(value,function(i,item){
                    url.push(item.key+'='+item.value);
                })
                me.data('callback')($target.index(),value,me,url.join('&'));
            }

            return $target;
        },
        /**
         * @description 创建bar
         * @function
         * @private
         */
        _createSortBar: function(data) {
            var me = this,
                content = data||[],
                html='';

            $.each(content,function(i,item){
                _html(item);
            })
            function _html(content){
                var a = [];
                html += '<div class="sort-list" data-key="'+content.key+'"><div class="sort-line"><ul>';
                $.each(content.values,function(i,item){
                    var  selected = (item.select!=undefined)?'class="ui-selected"':'';
                    a.push('<li '+selected+' data-value="'+item.value+'">'+item.text+'</li>');
                })
                html += a.join('')+'</ul><div class="ui-animation"></div></div></div>'
            }
            return html;
        },
        /**
         * @description 设定当前选中的背景
         * @function
         * @private
         */
        _setSelect: function(){
            var me = this,
                $widget = me.widget(),
                $selected = $('.ui-selected',$widget),
                $animation = $('.ui-animation',$widget);

            $.each($selected,function(i,item){
                item = $(item),
                    v = $animation.get(i).style.webkitTransition,
                    $parent = item.closest('.sort-line'),
                    left = item.index()==0?item.offset().left:item.offset().left-1;
                $animation.get(i).style.webkitTransition = 'none';
                $animation.eq(i).css({
                    width:item.index()==0?item.offset().width-2:item.offset().width-1+'px',
                    left:left-$parent.offset().left+'px'
                })
                setTimeout(function(){
                    $animation.get(i).style.webkitTransition = v;
                },100)
            })
        },
        /**
         * @description 获取当前选定的sort值
         * @function
         * @name $.ui.sort.getSortValue
         */
        getSortValue:function(){
			var me = this,
                $widget = me.widget();
                $selected = $('.ui-selected',$widget),
                $animation = $('.ui-animation',$widget),
                value = [];

            $.each($selected,function(i,item){
                item = $(item);
                value.push({
                    index:item.index(),
                    text:item.text(),
                    key:item.closest('.sort-list').data('key'),
                    value:item.data('value')
                })
            })
			return value;
		},

        /**
         * @description 设置当前选定的元素
         * @function
         * @private
         */
        setSortValue:function(value){

			var me = this,
                $widget = me.widget(),
                $selected = $('.ui-selected',$widget),
                $ulList = $('ul',$widget),
                value = $.isArray(value)?value:[];

            $.each($selected,function(i,item){
                item = $(item);
                if(item.index()!=value[i]&&value[i]!=-1){
                   item.removeClass('ui-selected');
                   $ulList.eq(i).children().eq(value[i]).addClass('ui-selected');
                }
            })
            me._setSelect();
			return me;
		},
        /**
         * @description 显示sort面板
         * @function
         * @name $.ui.sort.show
         */
		show: function(){
			var me = this,
                $el = me.widget(),
                $more = $('.sort-list-more',$el),
                $button = $('.sort-button',$el);

            me.trigger('beforeshow');
            $more.css('height',me.data('moreList')+'px');
            me.data('isShow',true);
            $button.toggleClass('open');
		},
        /**
         * @description 隐藏sort面板
         * @function
         * @name $.ui.sort.hide
         */
		hide: function(){
            var me = this,
                $el = me.widget(),
                $more = $('.sort-list-more',$el),
                $button = $('.sort-button',$el);

            me.trigger('beforehide');
            $more.css('height','0px');
            me.data('isShow',false);
            $button.toggleClass('open');
		}
	});
	
})(Zepto);


exports = Zepto.ui.sort;

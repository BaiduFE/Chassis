require('gmu:uibase');
require('gmu:base');
require('gmu:uibase/widget');
require('gmu:uibase/control');
/** 
 * $.ui.toolTips
 * @fileOverview  tip组件
 */
(function($){
 /*
  * @class
  * @name       $.ui.tooltip
  * @param      {string}      element            放置的元素（具有position属性）
  * @param      {Object}      options
  * @param      {string}      content            内容
  * @param      {string}      hook               位置
  * @param      {json}        offset             偏移量
  * @param      {Boolean}     autoHide           点击外面是否关闭
  * @param      {Boolean}     closeButton        配置关闭按钮
  * @param      {string}      instanceId         外观样式
  * @param      {string}      arrowOffset        箭头偏移量
  * @param      {Boolean}     arrowShow          是否显示箭头
  * @param      {string}      width              宽度
  * @param      {string}      height             高度
  * @param      {string}      smartPosition      是否开启智能位置检查功能
  * @param      {Boolean}     isFloat            是否浮动
  */
	$.ui.create('tooltips',{
		_data:{
			content:'',
			hook:'top',
			offset:{x:0,y:0},
            closeButton:true,
            autoHide:false,
			arrowShow:false,
            smartPosition:true,
            arrowOffset:0,
            isFloat:false
		},
		_create: function() {
			var me = this,
                $elem = me.widget()|| me.widget($('<div class="ui-tooltips-box"></div>')),
                $closeButton = $('<span class="ui-tooltips-close"></span>'),
                $arrow = me.data('arrow',$('<span class="ui-tooltips-arrow"></span>')),
                $container =  me.data('container',$(me.data('container'))||$(docuemnt.body)),
                content =  me.data('content');

            content = typeof content== 'string'?content:$(content).html()||$(content).val();

			if($container.css('position')!='absolute')$container.css('position','relative');

            if(me.data('instanceId'))$elem.addClass(me.data('instanceId'));

            $elem.css({'width':me.data('width'),'height':me.data('height')});

            //是否显示关闭按钮
            if(me.data('closeButton')){
                $closeButton.appendTo($elem).on("click",function(){
                    me.hide();
                    me.trigger('close');
                })
            };
            //是否要显示箭头
            if(me.data('arrowShow')){
                $arrow.appendTo($elem);
            };

            //渲染内容
            $elem.append(me.data('content',$('<div class="ui-tooltips-content">' + content + '</div>'))).css({'visibility':'hidden'}).appendTo($container);

            me._setPosition();

            $elem.css('visibility','visible');

			me.trigger('create');
			return me;
		},

		_init: function() {
			var me = this,
				$elem = me.widget();

            var _eventHandler = $.bind(me._eventHandler, me);

            $(window).on('resize', _eventHandler);

            $(document).on('touchstart',_eventHandler);

            $(window).on('scroll',_eventHandler);


            me.on('destroy',function(){
               $(window).off('resize',_eventHandler);
               $(document).off('touchstart',_eventHandler);
               $(window).off('scroll',_eventHandler);
            });

            me.trigger('init');
		},

        _eventHandler:function(e){
            var me = this;
            switch (e.type) {
                case  'resize':
                    me._setPosition(e);
                    break;
                case  'touchstart':
                    me._initFloat();
                    if(me.data('autoHide')){
                        me._autoHide(e);
                    }
                    break;
                case 'scroll':
                    me._onFloat();
                    break;
            }
        },

        _autoHide:function(e) {
            var me = this,
                bubblesList = e['bubblesList'];
            if(!bubblesList || bubblesList.indexOf(me) == -1){
                me.hide();
            }
        },

        _initFloat:function(){
            var me = this,
                $elem = me.widget();

            if(me.data('isFloat')&&!me.data('position')){
                me.data('offset',{'top':$elem.offset().top,'left':me.data('container').offset().left-$elem.offset().left});
                me.data('position',{'top':$elem.css('top'),'left':$elem.css('left')});
            }
        },

        _onFloat:function(){
            var me = this,
                $elem = me.widget();

            if(!me.data('isFloat')||!me.data('position')) return false;

            if(document.body.scrollTop>me.data('offset').top){
                if(me.data('arrow'))me.data('arrow').hide();
                $elem.css({'top':(document.body.scrollTop-me.data('container').offset().top)+'px'});
            }
            else{
                if(me.data('arrow')){
                    setTimeout(function(){
                        if(document.body.scrollTop<=me.data('offset').top){
                            if(me.data('arrow'))me.data('arrow').show();
                        }
                    },0)
                }
                $elem.css({'position':'absolute','top':me.data('position').top});
            }
        },

        /*
         * 设定tooltips position
         * @private
         */
        _setPosition:function(e){
            var me = this,
                $tar = me.data('container'),
                tarW = $tar.offset().width,
                tarH = $tar.offset().height,
                tarL = $tar.offset().left,
                tarT = $tar.offset().top,
                $el = me.widget(),
                elW = $el.offset().width,
                elH = $el.offset().height,
                elT = $el.offset().top,
                elL = $el.offset().left,
                x = me.data('offset').x,
                y = me.data('offset').y,
                winW = document.documentElement.clientWidth,
                curH = document.documentElement.clientHeight,
                bodyH = document.body.offsetHeight,
                winH = bodyH<curH?curH:bodyH,
                $arrow = me.data('arrow'),
                arrowW =  $arrow.offset().width,
                arrowH =  $arrow.offset().height,
                hook = me.data('hook'),
                offset = me.data('arrowOffset');

            //根据边界值翻转,如开启smartPosition
            //上边界
            if(me.data('smartPosition')){
                if(tarT<elH+arrowH+y&&hook=='top'){
                    hook= 'bottom';
                }
                //下边界
                else if(winH-tarT-tarH<elH+arrowH+y&&hook=='bottom'){
                    hook = 'top';
                }
                //左边界
                else if(tarL<elW+arrowH+y&&hook=='left'){
                    hook = 'right';
                }
                //右边界
                else if(winW-tarL-tarW<elW+arrowH+y&&hook=='right'){
                    hook = 'left';
                }
            }

            $arrow.removeClass('top bottom left right').addClass(hook);
            $arrow.css({'left':'','top':''});

            arrowW =  $arrow.offset().width;
            arrowH =  $arrow.offset().height;


            //渲染位置
            switch(hook){
                case 'left':
                    $el.css({'left':-(elW+arrowW+y)+'px','top':x+'px'});
                    $arrow.css({'top':(offset)+'px'});
                    break;
                case 'right':
                    $el.css({'left':(tarW+arrowW+y)+'px','top':x+'px'});
                    $arrow.css({'top':(offset)+'px'});
                    break;
                case 'top':
                    $el.css({'top':-(elH+arrowH+y)+'px','left':x+'px'});
                    $arrow.css({'left':offset+'px'});
                    break;
                case 'bottom':
                    $el.css({'top':(tarH+arrowH+y)+'px','left':x+'px'});
                    $arrow.css({'left':offset+'px'});
                    break;
            }

            if(!me.data('smartPosition')) return false;

            elW = $el.offset().width;
            elH = $el.offset().height;
            elT = $el.offset().top;
            elL = $el.offset().left;
            arrowW =  $arrow.offset().width;
            arrowH =  $arrow.offset().height;

            //resize，取消自适应
            //if(e&&e.type=='resize') return false;

            //根据边界位置，自适应
            if(elH>winH-elT-x&&hook!='top'){
                $el.css('top',(tarH-elH-x)+'px');
                $arrow.css('top',(elH-arrowH-2-offset)+'px');
            }
            else if(elW>winW-elL-x&&hook!='right'){
                $el.css('left',(tarW-elW-x)+'px');
                $arrow.css('left',(elW-arrowW-2-offset)+'px');
            }
            else if(elT<0&&hook!='top'){
                $el.css('top',x+'px');
                $arrow.css('top',offset+'px');
            }
            else if(elL<0&&hook!='left'){
                $el.css('left',x+'px');
                $arrow.css('left',offset+'px');
            }

        },

        /*
         * 更新tooltips内容
         * @function
         * @name   $.ui.tooltips.refresh
         * @param  {String}  str  内容字符串
         */
        refresh:function(str){
            var me = this,
                $content = me.data('content');

             me.trigger('beforeRefresh');
             $content.html(str);
             me._setPosition();
             me.trigger('afterRefresh');
        },

        /*
         * 显示tip
         * @function
         * @name   $.ui.tooltips.show
         */
        show:function(){
        	var me = this;
                $el = me.widget();
                $el.css('visibility','hidden').show();

                me._setPosition();
                $el.css('visibility','visible');
                me.trigger('show');
        	return me;
        },

        /*
         * 隐藏tip
         * @function
         * @name   $.ui.tooltips.hide
         */
        hide:function(){
        	var me = this;
        	me.widget().hide();
            me.trigger('hide');
        	return me;
        }
	}).attach('control.fix');

})(Zepto);

exports = Zepto.ui.tooltips;

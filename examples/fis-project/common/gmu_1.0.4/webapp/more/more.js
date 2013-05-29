



/**
 * @fileOverview
 * @author guanshiliang@baidu.com
 */

(function($, undefined) {
    /**
     * @description     more组件
     * @class
     * @name            $.ui.more
     * @grammar         $.ui.more(el[,options])
     * @mode            render模式、暂时不支持auto-init模式
     * @param           {selector|zepto}       el                      父容器选择器或者对象
     * @param           {Object}               options                 参数
     * @param           {Selector}             options.container       (可选)渲染到哪个元素 || document.body
     * @param           {Array}                options.content         (必选)内容
     * @param           {Number}               options.count           (可选)列数
     * @param           {Boolean}              options.isShow		   (可选)是否默认展开
     */
    $.ui.create('more', {
        _data:{
			container: "",
            content: [],
            count: 5,
            isShow: false
        },
        _create: function() {
            var me = this,
                $el = me.widget(),rowTpl=[],tpl=[],rowConts=[], i, 
                $container = $(me.data('container')|| document.body)[0], //只处理第一个元素
                conts=me.data('content').concat(), //数组引用 -- by gsl
                count=me.data('count'),
                width=parseInt(100/count);
			//判断链接数据合法性
			if(!$.isArray(conts) || conts.length < 1) return;

            while(conts.length>count){
                rowConts.push(conts.splice(0,count));
            }
            if(conts.length){
                rowConts.push(conts);
            }
			//设定默认el
            if($el == undefined) {
                $el = me.widget($('<div class="ui-more"></div>'));
            }  
			//$container = $(me.data('container')|| document.body)[0];
			
			if(!$el.hasClass('ui-more')) $el.addClass('ui-more');
            tpl.push('<div class="ui-more-arrow"></div>');

            rowConts.forEach(function (rowCont) {
                rowTpl=['<div class="ui-more-links">'];
                rowCont.forEach(function(cont,itemNum){
                    var style="width:"+width+"%;"+(itemNum==count-1?"-webkit-box-flex:1":""),
                        key = cont.key || "word";     //增加各产品线搜索的key值, modified by zmm
                    rowTpl.push('<a href="'+cont.url+'" class="ui-more-link" data-key="' + key + '" style="'+style+'"><span>'+cont.text+'</span></a>');
                });
                rowTpl.push("</div>");
                tpl.push(rowTpl.join(''));
            });
			
				
			$el.html(tpl.join(''));
				
			//.appendTo($container);
			
			if($el.parent().length && !me.data('container')){
                    //如果$elem有parent，且没有传入container，不需要appendTo
             } else {
				if (!$el.parent().length) $el.appendTo($container);
             }
            me.trigger('create');
        },

        _init: function() {
            var me = this,
                $el = me.widget();
            if(!me.data('isShow')) $el.hide();
            me.trigger('init');
        },

        /**
         * @description 显示more面板
         * @function
         * @name $.ui.more.show
         * @return {undefined}
         */
        show: function() {
            var me = this,
                $el = me.widget();
            me.data('isShow',true);
			$el.show();
			me.trigger('aftershow');
        },

        /**
         * @description 隐藏more面板
         * @function
         * @name $.ui.more.hide
         * @return {undefined}
         */
        hide: function() {
            var me = this,
               $el = me.widget();
            me.data('isShow','');
			$el.hide();
			me.trigger('afterhide');
        }

       

    });
})(Zepto);







/**
 * @fileOverview tonative
 * @description  跳转到native app组件
 */

(function($, undefined){
    /**
     * @description    tonative
     * @class
     * @name     $.ui.tonative
     * @grammar  $.ui.tonative(el[,options])
     * @param       {Object}     			options             		参数
     * @param      {String}     			options.url       		    (必选)协议url
     * @param      {String}              	options.storeUrl            (可选)跳转的storeUrl,ios可用
     * @param      {String}              	options.text            	(可选)提示信息，ios可用
     * @param      {String}              	options.title            	(可选)默认跳转按钮的标题
     */
	$.ui.create('tonative', {
		_data: {
            url: '',
            storeUrl : 'http://www.apple.com.cn/iphone/from-the-app-store/',
            text: '发现没有安装，是否去app store？',
            title:''
		},
		_create: function() {
            var me = this,
                widget = me.widget(),
                container = me.data('container');

            $el = me.widget() || me.widget($('<a class="ui-tonative">'+me.data('title')+'</a>'));
            $container = $(me.data('container') || document.body);

            if(!$el.parent().get(0)){
                $container.append($el);
            }
			me.trigger('create');
		},
		_init: function() {
            var me = this;

            me.widget().on('click',function(){me.tonative()});

			me.trigger('init');
		},
        /**
         * @description tonative方法
         * @function
         * @name $.ui.tonative.tonative
         * @return {undefined}
         */
        tonative: function(){
            var me = this,
                url = me.data('url'),
                storeUrl = me.data('storeUrl'),
                text = me.data('text');

            var a = +new Date;
            try {
                window.location = url;
            } catch (e) {
            }
            if($.os.ios){
                setTimeout(function () {
                    if (+new Date - a < 2000) {
                        if (window.confirm(text)) { // 文本信息可自定义
                            window.location = storeUrl // itunes地址可自定义
                        }
                    }
                }, 1000)
            }
        }
	});
	
})(Zepto);




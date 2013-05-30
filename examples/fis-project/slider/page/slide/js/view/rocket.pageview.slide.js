(function($){

rocket.pageview.slide = rocket.pageview.extend({

    el: '#slide_page'

    ,init: function(options){
        var me = this;

        // setup content子视图
        me.setup(new rocket.subview.slide_content(
            $.extend({}, options), 
            me
        ));
		
		me.registerEvents();
    }

    ,registerEvents: function(){
        var me = this, ec = me.root;

        me.$el.on('touchmove', function(e){
            e.preventDefault();
        });

        ec.on('keydown', me.onkeydown, me);

        ec.on('sidenav:increasefontsize', me.increaseFontSize, me);
        ec.on('sidenav:decreasefontsize', me.decreaseFontSize, me);
    }

    ,onkeydown: function(params){
        var me = this,
            key = params.key,
            shiftKey = params.shiftKey,
            ctrlKey = params.ctrlKey;
        
        // @note: 仅当活动子页面才响应
        if(me.root.isActive()){
            switch(key){
                // '+' key
                case 187:
                    me.increaseFontSize();
                    break;
                // '-' key
                case 189:
                    me.decreaseFontSize();
                    break;
            }
        }
    }

    ,increaseFontSize: function(){
        var me = this,
            fs = parseInt(me.$el.css('font-size')) + 2;

        me.$el.css('font-size', fs + 'px');
        
    }

    ,decreaseFontSize: function(){
        var me = this,
            fs = parseInt(me.$el.css('font-size')) - 2;

        me.$el.css('font-size', fs + 'px');
    }
	
	,onAfterPageIn : function(){
		this.$el.show();
	}

});

})(Zepto);

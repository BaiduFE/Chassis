(function($){

rocket.pageview.say = rocket.pageview.extend({

    el: '#say_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);
        
        
        me.setup('say_header',opt);
        me.setup('say_content',opt);
        
        
        
        /*
        me.setup(new rocket.subview.say_header(
            $.extend({}, options)
            ,me
        ));

        me.setup(new rocket.subview.say_content(
            $.extend({}, options)
            ,me
        ));
        */

    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);

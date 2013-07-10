(function($){

rocket.pageview.say = rocket.pageview.extend({

    el: '#say_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);
        
        
        me.append('say_header',opt);
        me.append('say_content',opt);
        
        
        
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

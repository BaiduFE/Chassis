(function($){

rocket.pageview.sayhello = rocket.pageview.extend({

    el: '#sayhello_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);
        
        me.prepend('say_header',opt);
        me.setup('sayhello_content',opt);
        
        /*
        me.setup(new rocket.subview.sayhello_header(
            $.extend({}, options)
            ,me
        ));

        me.setup(new rocket.subview.sayhello_content(
            $.extend({}, options)
            ,me
        ));
        */
        

    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);

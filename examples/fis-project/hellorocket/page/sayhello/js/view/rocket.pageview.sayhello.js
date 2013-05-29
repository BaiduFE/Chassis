(function($){

rocket.pageview.sayhello = rocket.pageview.extend({

    el: '#sayhello_page'

    ,init: function(options){
        var me = this;

        me.setup(new rocket.subview.sayhello_header(
            $.extend({}, options)
            ,me
        ));

        me.setup(new rocket.subview.sayhello_content(
            $.extend({}, options)
            ,me
        ));

    }

});

})(Zepto);

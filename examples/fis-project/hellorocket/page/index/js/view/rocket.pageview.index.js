(function($){

rocket.pageview.index = rocket.pageview.extend({

    el: '#index_page'

    ,init: function(options){
        var me = this;

        me.setup(new rocket.subview.index_header(
            $.extend({}, options)
            ,me
        ));

        me.setup(new rocket.subview.index_content(
            $.extend({}, options)
            ,me
        ));

    }

});

})(Zepto);

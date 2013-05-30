(function($){

rocket.pageview.outline = rocket.pageview.extend({

    el: '#outline_page'

    ,init: function(options){
        var me = this;

        me.setup(new rocket.subview.outline_content(
            $.extend({}, options)
            ,me
        ));
    }

    ,registerEvents: function(){
        var me = this,
            keydownLocking = false;

        $(document).on('keydown', function(e){

            if(!keydownLocking
                && me.$el.css('display') == 'block'){
                keydownLocking = true;

                me.trigger('keydown', {
                    key: e.which 
                    ,target: me
                });

                setTimeout(function(){
                    keydownLocking = false;
                }, 500);
            }

        });

        me.$el.on('touchmove', function(e){
            e.preventDefault();
        });

    }

});

})(Zepto);

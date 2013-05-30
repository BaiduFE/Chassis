(function($){
 
rocket.globalview.orientationrestrict = rocket.globalview.extend({
     
    el: '#orientationrestrict_globalview'

    ,init: function(options){
        var me = this;

        if(Math.abs(window.orientation) == 90){
            me.$el.show();
        }
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        $(window).on('orientationchange', function(e){
            if(Math.abs(window.orientation) == 90){
                me.$el.show();    
            }
            else{
                me.$el.hide();    
            }
        });
    }

});

 })(Zepto);


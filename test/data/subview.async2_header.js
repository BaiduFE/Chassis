(function($){

Chassis.SubView.async2_header = Chassis.SubView.extend({

    init: function(options){
        var me = this;
        ok(true);
        
        me.root.trigger( 'subViewLoaded' );
    }


});

})($);

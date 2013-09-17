(function($){

Chassis.SubView.async2_content = Chassis.SubView.extend({

    init: function(options){
        var me = this;
        
        ok( true );
        
        me.root.trigger( 'subViewLoaded' );
    }

});

})($);

(function($){

Chassis.SubView.reuse = Chassis.SubView.extend({

    init: function(options){
        var me = this;
        ok( true , 'SubView.reuse init success!' );

		me.root.trigger( 'subViewLoaded' );
    }


});

})($);

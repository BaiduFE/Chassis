    Chassis.PageView['async1'] = Chassis.PageView.extend( {
		init: function( opts ) {

			ok( true );
			Chassis.history.navigate( '#',{trigger:false} );
			Chassis.history.destroy();
        
			start();
		}
    } );
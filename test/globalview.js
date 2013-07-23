$(document).ready(function() {

	module('Chassis.GlobalView');
	
	
	asyncTest( 'constructor', 3, function() {
		var Router = Chassis.Router.extend( {
			routes: [ 'glvpagea1/:aid', 'glvpageb1/:bid' ]
		} );

		var rt = new Router();
		Chassis.history.start( {trigger:false} );
		
		var gView = new Chassis.GlobalView( {
			id: 'glvpagea1',
			className: 'glvpagea1'
		}, rt );
		
		
		equal( gView.$el[ 0 ].id, 'glvpagea1' );
		equal( gView.$el[ 0 ].className, 'glvpagea1' );
		
		//在PhantomJS中，这个比较会非常非常慢
		//equal( gView.router, rt );
		ok( gView.router === rt );
        
		Chassis.history.destroy();
		start();
	} );
	
	asyncTest( 'routechange event and getCurrentAction', 5, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'glvpagea2/:aid', 'glvpageb2/:bid' ]
		} );

		Chassis.PageView[ 'glvpagea2' ] = Chassis.PageView.extend( {} );
		Chassis.PageView[ 'glvpageb2' ] = Chassis.PageView.extend( {} );

		var gView = new Chassis.GlobalView( {
			id: 'glvpagea2',
			className: 'glvpagea2'
		}, new Router() );

		gView.on( 'routechange', function( opts ) {
			equal( opts.from, null );
			ok( opts.to === opts.views[ 'glvpagea2' ] );
			equal( opts.params.aid, 1 );
			ok( opts.views === gView.router.views );
			equal( gView.getCurrentAction(), 'glvpagea2' );

			start();
			Chassis.history.navigate( '', { trigger: false } );
			Chassis.history.destroy();
		} );
    
    
		Chassis.history.start();

		Chassis.history.navigate( 'glvpagea2/1' );

	} );
  
	asyncTest( 'triggerPageEvent', 4, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'glvpagea3/:aid', 'glvpageb3/:bid' ]
		} );

		Chassis.PageView[ 'glvpagea3' ] = Chassis.PageView.extend( {
			events: {
				'notice1 view': function( opts ) {
					equal( opts.signal, 1 );
				},
				'noticeall view': function( opts ) {
					equal( opts.signal, 3 );
				}
			}
		} );
		
		Chassis.PageView[ 'glvpageb3' ] = Chassis.PageView.extend( {
			events: {
				'notice2 view': function( opts ) {
					equal( opts.signal, 2 );
				},
				'noticeall view': function( opts ) {
					equal( opts.signal, 3 );
				}
			}
		} );

		var gView = new Chassis.GlobalView( {
			id: 'glvpagea3',
			className: 'glvpagea3'
		}, new Router() );

		gView.on( 'routechange', function( opts ) {
      
			if ( opts.from ) {

				gView.triggerPageEvent( 'glvpagea3', 'notice1', { signal: 1 } );
				gView.triggerPageEvent( 'glvpageb3', 'notice2', { signal: 2 } );
				gView.triggerPageEvent( 'glvpagea3,glvpageb3', 'noticeall', { signal: 3 } );

				start();
				Chassis.history.navigate( '', { trigger: false } );
				Chassis.history.destroy();

			}
		} );

		Chassis.history.start();

		Chassis.history.navigate( 'glvpagea3/1' );
		Chassis.history.navigate( 'glvpageb3/1' );

	} );
	
	

});

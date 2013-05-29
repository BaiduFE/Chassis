$(document).ready(function() {

  module('Chassis.GlobalView');

  test( 'constructor', 3, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pagea/:aid', 'pageb/:bid' ]
    } );

    var rt = new Router();

    var gView = new Chassis.GlobalView( {
      id: 'pagea',
      className: 'pagea'
    }, rt );

    equal( gView.$el[ 0 ].id, 'pagea' );
    equal( gView.$el[ 0 ].className, 'pagea' );
    equal( gView.router, rt );

    Chassis.history.destroy();

  } );

  
  asyncTest( 'routechange event and getCurrentAction', 5, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pagea/:aid', 'pageb/:bid' ]
    } );

    Chassis.PageView[ 'pagea' ] = Chassis.PageView.extend( {} );
    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {} );

    var gView = new Chassis.GlobalView( {
      id: 'pagea',
      className: 'pagea'
    }, new Router() );

    gView.on( 'routechange', function( opts ) {
      equal( opts.from, null );
      equal( opts.to, opts.views[ 'pagea' ] );
      equal( opts.params.aid, 1 );
      equal( opts.views, gView.router.views );
      equal( gView.getCurrentAction(), 'pagea' );

      start();
      Chassis.history.navigate( '', { trigger: false } );
      Chassis.history.destroy();
    } );

    Chassis.history.start();

    Chassis.history.navigate( 'pagea/1' );

  } );
  
  asyncTest( 'triggerPageEvent', 4, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pagea/:aid', 'pageb/:bid' ]
    } );

    Chassis.PageView[ 'pagea' ] = Chassis.PageView.extend( {
      events: {
        'notice1 view': function( opts ) {
          equal( opts.signal, 1 );
        },
        'noticeall view': function( opts ) {
          equal( opts.signal, 3 );
        }
      }
    } );
    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
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
      id: 'pagea',
      className: 'pagea'
    }, new Router() );

    gView.on( 'routechange', function( opts ) {
      
      if ( opts.from ) {

        gView.triggerPageEvent( 'pagea', 'notice1', { signal: 1 } );
        gView.triggerPageEvent( 'pageb', 'notice2', { signal: 2 } );
        gView.triggerPageEvent( 'pagea,pageb', 'noticeall', { signal: 3 } );

        start();
        Chassis.history.navigate( '', { trigger: false } );
        Chassis.history.destroy();

      }
    } );

    Chassis.history.start();

    Chassis.history.navigate( 'pagea/1' );
    Chassis.history.navigate( 'pageb/1' );

  } );

});

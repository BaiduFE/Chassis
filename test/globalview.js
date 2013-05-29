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

  } );

  
  asyncTest( 'routechange event', 1, function() {

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
      equal( opts.params.aid, 1 );
    } );

    Chassis.history.start();

    Chassis.history.navigate( 'pagea/1' );

  } );
  

});

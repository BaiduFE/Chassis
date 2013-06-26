$(document).ready(function() {
  module("Chassis.Router");

  /*
  test("test initialize", 1, function() {
    var Router,router;
    stop();

    Router = Chassis.Router.extend({
        initialize : function(){
            ok(true);
            
            Chassis.history.destroy();
            start();
        },
        routes : {}
    });
    
    router = new Router();
    Chassis.history.start( {trigger:false} );
  });
  

  test("test destroy", 2, function() {
    var Router,router;
    stop();

    Router = Chassis.Router.extend({

        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            ok(false, "hashchange handle has not be destroy");
            return false;
        }
        
    });
    
    router = new Router();

    Chassis.history.start();
    Chassis.history.navigate( 'index/2',{ trigger: false } );
    Chassis.history.navigate( '', { trigger: false } );
    
    Chassis.history.destroy();
    
    strictEqual(Chassis.History.start, false);
    strictEqual(Chassis.history.handler.length, 0);
    
    start();

  });

  test("test init with routes", 1, function() {
    stop();
    
    var Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function( id ){
            strictEqual( id, '2' );

            Chassis.history.navigate( '', { trigger: false } );
            Chassis.history.destroy();

            start();
        }
    });
    
    new Router();

    Chassis.history.start();
    
    Chassis.history.navigate( 'index/2' );

  });
  */
  
  
  test("test navigate with options true", 10, function() {
    var Router,router;
    stop();
    
    Router = Chassis.Router.extend({

        routes : {
            ':module/:action': 'dispatch1',
            ':module/:action/*': 'dispatch2',
            ':module/:action/*args': 'dispatch3',
            ':module/:action/:query/:state' : 'dispatch4'
        },

        dispatch1: function( module, action ) {
            
            strictEqual( module, 'search' );
            strictEqual( action, 'list' );
        },

        dispatch2: function( module, action ) {
            
            strictEqual( module, 'search' );
            strictEqual( action, 'list' );
        },

        dispatch3: function( module, action, args ) {
            
            strictEqual( module, 'search' );
            strictEqual( action, 'list' );

        },

        dispatch4: function( module, action, query, state) {
            
            strictEqual( module, 'search' );
            strictEqual( action, 'list' );
            strictEqual( query, 'foo=bar' );
            strictEqual( state, 'a=b' );

            Chassis.history.navigate( '' );
            Chassis.history.destroy();
            start();
        }
    });
    
    router = new Router();

    Chassis.history.start();
    
    Chassis.history.navigate( 'search/list' );  // dispatch2
    Chassis.history.navigate( 'search/list/' ); // dispath3
    Chassis.history.navigate( 'search/list/foo=bar' ); // dispatch3
    Chassis.history.navigate( 'search/list/foo=bar/a=b' ); // dispatch4

  });
  
  test("test navigate with options false", 0, function() {
    var Router,router;
    stop();
    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            
            ok(true);
            
            return false;
        }
    });
    
    router = new Router();

    Chassis.history.start( );
    
    Chassis.history.navigate( 'index/2',{ trigger: false } );
    Chassis.history.navigate( '',{ trigger: false } );
    Chassis.history.destroy();
    start();

  });
  
  test("test navigate without delay", 3, function() {
    var Router,router;
    stop();
    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index',
            'info/:id'  : 'info'
        },
        
        index : function(){
            
            ok(true);
            
            return false;
        },
        
        info : function(){
            
            ok(true);
            
            return false;
        }
    });
    
    router = new Router();

    Chassis.history.start();
    
    Chassis.history.navigate( 'index/2' );
    Chassis.history.navigate( 'info/3' );
    Chassis.history.navigate( 'index/4' );
    Chassis.history.navigate( '',{ trigger: false } );
    Chassis.history.destroy();
    start();

  });
 
});

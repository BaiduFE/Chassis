$(document).ready(function() {
  module("Chassis.Router");

  test("test init", 1, function() {
    var Router,router;
    stop();

    Router = Chassis.Router.extend({
        init : function(){
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

    Chassis.history.start( {trigger:false} );
    Chassis.history.navigate( 'index/2',{trigger:false} );
    Chassis.history.navigate( '', {trigger:false} );
    
    Chassis.history.destroy();
    
    strictEqual(Chassis.History.start, false);
    strictEqual(Chassis.history.handler.length, 0);
    
    start();

  });
  test("test init with object", 2, function() {
    var Router;
    stop();

    Router = {

        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            ok(false, "hashchange handle has not be destroy");
            return false;
        }
        
    };
    
    

    Chassis.history.start( {router : Router, trigger:false} );
    Chassis.history.navigate( 'index/2',{trigger:false} );
    Chassis.history.navigate( '', {trigger:false} );
    
    Chassis.history.destroy();
    
    strictEqual(Chassis.History.start, false);
    strictEqual(Chassis.history.handler.length, 0);
    
    start();

  });
  
  test("test init with routes", 2, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        
        init : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();

        }
    });
    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            strictEqual( this.Request.id, '2');
        }
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2' );

  });
  
  test("test navigate without arguments", 2, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        
        init : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();

        }
    });
    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            strictEqual( this.Request.id, '2');
        }
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2' );

  });
  
  test("test pageOrder when routes is array", 1, function() {
    var Router,router;
    stop();
    

    Router = Chassis.Router.extend({
        routes : [
            'index/:id',
            'info/:id'
        ]
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );

    deepEqual( router.pageOrder, ['index','info'] );
    
    Chassis.history.destroy();
    start();
    

  });

  test("test init for routers handle when return false;", 1, function() {
    var Router,router;
    stop();
    

    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();
            return false;
        }
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2' );

  });
  
  test("test navigate with options true", 1, function() {
    var Router,router;
    stop();
    

    
    Router = Chassis.Router.extend({
        routes : {
            'index/:id' : 'index'
        },
        
        index : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();
            return false;
        }
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2',{trigger:true} );

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

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2',{trigger:false} );
    
    delete Chassis.PageView.index;
    Chassis.history.navigate( '',{trigger:false} );
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

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2' );
    Chassis.history.navigate( 'info/3' );
    Chassis.history.navigate( 'index/4' );
    
    delete Chassis.PageView.index;
    Chassis.history.navigate( '',{trigger:false} );
    Chassis.history.destroy();
    start();

  });
  
  test("test init for hashchange when routes is array", 1, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        
        init : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();
        }
    });
    
    Router = Chassis.Router.extend({
        routes : ['index/:id']
    });
    
    router = new Router();

    Chassis.history.start( {trigger:false} );
    
    Chassis.history.navigate( 'index/2',{trigger:true} );

  });
  
  test("test pushState and root when routes is array", 1, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        init : function(){
            delete Chassis.PageView.index;
            ok(true);
            Chassis.history.navigate( '',{trigger:false} );
            Chassis.history.destroy();
            start();

        }
    });
    
    Router = Chassis.Router.extend({
         routes : ['index/:id']
    });
    
    router = new Router();
    
    Chassis.history.start({
        pushState : true,
        root : '/test/',
		trigger : false
    });
    
    Chassis.history.navigate( 'index/2' );  
    
  });
  
  
 
});

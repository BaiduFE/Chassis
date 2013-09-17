$(document).ready(function() {
	module("Chassis.Router");

	asyncTest("test init", 1, function() {
		var Router,router;

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
		
	} );
  
	asyncTest("test destroy", 2, function() {
		var Router,router;
		
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
	} );
	
	asyncTest("test init with object", 2, function() {
		var Router;

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

	} );
  
	asyncTest("test init with routes", 2, function() {
		var Router,router;
    
		Chassis.PageView.index = Chassis.PageView.extend({
        
			init : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();

			}
		} );
    
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

	} );
  
	asyncTest("test navigate without arguments", 2, function() {
		var Router,router;
    
		Chassis.PageView.index = Chassis.PageView.extend({
        
			init : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();

			}
		} );
    
		Router = Chassis.Router.extend({
			routes : {
				'index/:id' : 'index'
			},
        
			index : function(){
				strictEqual( this.Request.id, '2');
			}
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2' );

	} );
  
	test("test pageOrder when routes is array", 1, function() {
		var Router,router;

		Router = Chassis.Router.extend({
			routes : [
				'index/:id',
				'info/:id'
			]
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
	
		deepEqual( router.pageOrder, ['index','info'] );
    
		Chassis.history.destroy();
		
	} );
	
	
	asyncTest("test init for routers handle when return false;", 1, function() {
		var Router,router;

		Router = Chassis.Router.extend({
			routes : {
				'index/:id' : 'index'
			},
        
			index : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();
				return false;
			}
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2' );

	} );
  
	asyncTest("test navigate with options true", 1, function() {
		var Router,router;
    

    
		Router = Chassis.Router.extend({
			routes : {
				'index/:id' : 'index'
			},
        
			index : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();
				return false;
			}
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2',{trigger:true} );

	} );
  
	asyncTest("test navigate with options false", 0, function() {
		var Router,router;
    
		Router = Chassis.Router.extend({
			routes : {
				'index/:id' : 'index'
			},
        
			index : function(){
            
				ok(true);
            
				return false;
			}
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2',{trigger:false} );
    
		delete Chassis.PageView.index;
		Chassis.history.navigate( '',{trigger:false} );
		Chassis.history.destroy();
		start();

	} );
  
	asyncTest("test navigate without delay", 3, function() {
		var Router,router;
    
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
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2' );
		Chassis.history.navigate( 'info/3' );
		Chassis.history.navigate( 'index/4' );
    
		delete Chassis.PageView.index;
		Chassis.history.navigate( '',{trigger:false} );
		Chassis.history.destroy();
		start();

	} );
  
	asyncTest("test init for hashchange when routes is array", 1, function() {
		var Router,router;
    
		Chassis.PageView.index = Chassis.PageView.extend({
        
			init : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();
			}
		} );
    
		Router = Chassis.Router.extend({
			routes : ['index/:id']
		} );
    
		router = new Router();

		Chassis.history.start( {trigger:false} );
    
		Chassis.history.navigate( 'index/2',{trigger:true} );

	} );
  
	asyncTest("test pushState and root when routes is array", 1, function() {
		var Router,router;
    
		Chassis.PageView.index = Chassis.PageView.extend( {
			init : function(){
				
				ok(true);
				
				delete Chassis.PageView.index;
				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();

			}
		} );
    
		Router = Chassis.Router.extend({
			routes : ['index/:id']
		} );
    
		router = new Router();
    
		Chassis.history.start( {
			pushState : true,
			root : '/test/',
			trigger : false
		} );
    
		Chassis.history.navigate( 'index/2' );  
    
	} );
});

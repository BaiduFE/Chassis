$(document).ready(function() {

	var proxy = Chassis.Model.extend();


	module("Chassis.Model");

	asyncTest("init", 1, function() {
		var Model = Chassis.Model.extend({
			init: function() {
				this.one = 1;
			}
		});
    
		var model = new Model();

		equal(model.one, 1);
		
		start();
	});
   
	asyncTest("init with attributes and options", 1, function() {
		var Model = Chassis.Model.extend({
			init: function(attributes, options) {
				this.one = options.one;
			}
		});
		var model = new Model({}, {one: 1});
		equal(model.one, 1);
		start();
  });
  
	asyncTest("get attributes for defaults", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:100}});
		var model = new Model({});
		equal(model.get('a'), 100);
		start();
	});
  
	asyncTest("get attributes for new", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:1}});
		var model = new Model({a: 2});
		equal(model.get('a'), 2);
		start();
	});
  
	asyncTest("has attributes", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:1}});
		var model = new Model();
		equal(model.has('a'), true);
		start();
	});
  
	asyncTest("unset attributes", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:1}});
		var model = new Model({a: 2});
		model.unset('a');
		equal(model.get('a'), void 0);
		start();
  });
  
	asyncTest("clear attributes", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:1}});
		var model = new Model({a: 2});
		model.clear();
		equal(JSON.stringify(model.toJSON()), '{}');
		start();
	});
  
	asyncTest("clone model", 1, function() {
		var Model = Chassis.Model.extend({defaults:{a:1}});
		var model = new Model({a: 2});
		var clone = model.clone();
		equal(clone.get('a'), 2);
		start();
	});
  
	asyncTest("escape model attribute", 1, function() {
		var Model = Chassis.Model.extend({defaults:{}});
		var model = new Model({a:"<script>alert('xss')</script>"});
		equal(model.escape('a'), '&lt;script&gt;alert(&#x27xss&#x27)&lt;&#x2Fscript&gt;');
		start();
	});
  
	asyncTest("get previous attribute", 2, function() {
		var Model = Chassis.Model.extend({});
		var model = new Model({a:1});
		model.set('a',2);
		equal(model.previous('a'), 1);
		equal(model.previousAttributes()['a'], 1);
		start();
	});
  
	asyncTest("fetch success", 1, function() {
		var Model = Chassis.Model.extend({
			url : function(){
				return 'data/data.json';
			}
		});
		var model = new Model({a:1});
    
		model.on('change',function(){
			ok(true);
			start();
		});
		model.fetch();
    
	});
  
	asyncTest("parse fetch data", 1, function() {
		var Model = Chassis.Model.extend({
			url : function(){
				return 'data/data.json';
			},
        
			parse : function(resp){
				return {
					'rewrite' : 1
				}
			}
		});
		var model = new Model({a:1});
    
		model.on('change',function(){
			equal(model.get('rewrite'),1);
			start();
		});
		model.fetch();
    
	});
  
	asyncTest("validate data", 1, function() {
		var Model = Chassis.Model.extend({
			url : function(){
				return 'data/data.json';
			},
        
			parse : function(resp){
				return {
					'rewrite' : 1
				}
			},
        
			validate : function(attrs){
				return 'something is wrong!';
			}
		});
		var model = new Model({a:1});
    
		model.on('error',function(msg){
			equal(msg,'something is wrong!');
			start();
		});
		model.fetch();
    
	});
  
	asyncTest("fetch error", 1, function() {
		var Model = Chassis.Model.extend({
			url : function(){
				return 'data/notfound';
			}
		});
		var model = new Model({a:1});
    
		model.on('error',function(){
			ok(true);
			start();
		});
		model.fetch();
    
    
	});

});

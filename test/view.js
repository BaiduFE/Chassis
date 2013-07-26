$(document).ready(function() {

	var view;

	module('Chassis.View', {

		setup: function() {
			Chassis.load.config.ruler = function( pkg ){
				return '../test/data/' + pkg.replace(/\-/g,'.');
			};
        
			F.load = seajs.use;
    
			view = new Chassis.View({
				id        : 'test-view',
				className : 'test-view',
				other     : 'non-special-option'
			});
		}

	});

	asyncTest('async load pageview', 1, function(){
    
		var router = new Chassis.Router( {
			routes: [ 'async1/:id' ]
		} );
    
    

		Chassis.history.start();
		Chassis.history.navigate( 'async1/123' );
    
		

	});
  
	asyncTest('async load subview', 3, function(){
		Chassis.load.config.ruler = function( pkg ){
			return '../test/data/' + pkg.replace('-','.');
		};
    
		F.load = seajs.use;
		var router = new Chassis.Router( {
			routes: [ 'async2/:id' ]
		} );
    
    
		
		Chassis.history.start();
		Chassis.history.navigate( 'async2/123' );
    
		

	});
  
  
  
  
	//return;
  
  
	asyncTest('constructor', 3, function() {
		equal(view.el.id, 'test-view');
		equal(view.el.className, 'test-view');
		equal(view.el.other, undefined);
		
		start();
	});

  
	asyncTest('view.$', 1, function() {
		var view = new Chassis.View;
		view.setElement('<p><a><b>test</b></a></p>');
		strictEqual(view.$('a b').html(), 'test');
		
		start();
	});

  
	asyncTest('init', 1, function() {
		var View = Chassis.View.extend({
			init: function() {
				this.one = 1;
			}
		});

		strictEqual(new View().one, 1);
		
		start();
	});

  
	asyncTest('delegateEvents', 10, function() {
		var counter1 = 0, counter2 = 0;

		var view = new Chassis.View({el: '<p><a id="test"></a></p>'});
		view.increment = function(){ counter1++; };
		view.$el.on('click', function(){ counter2++; });

		var events = {'click #test': 'increment'};

		view.delegateEvents(events);
		view.$('#test').trigger('click');
		equal(counter1, 1);
		equal(counter2, 1);

		view.$('#test').trigger('click');
		equal(counter1, 2);
		equal(counter2, 2);

		view.delegateEvents(events);
		view.$('#test').trigger('click');
		equal(counter1, 4);
		equal(counter2, 3);

		events = {
		'click document': 'increment',
		'orientationchange window': 'increment',
		'change model': 'increment',
		'beforepagein view': 'increment'
		};

		view.model = new Chassis.Model();

		view.delegateEvents(events);

		$(document).trigger('click');
		equal(counter1, 5);

		$(window).trigger('orientationchange');
		equal(counter1, 6);

		view.model.trigger('change');
		equal(counter1, 7);

		view.trigger('beforepagein');
		equal(counter1, 8);
		
		start();

	});

	asyncTest('delegateEvents allows functions for callbacks', 3, function() {
		var view = new Chassis.View({el: '<p></p>'});
		view.counter = 0;

		var events = {
			click: function() {
				this.counter++;
			}
		};

		view.delegateEvents(events);
		view.$el.trigger('click');
		equal(view.counter, 1);

		view.$el.trigger('click');
		equal(view.counter, 2);

		view.delegateEvents(events);
		view.$el.trigger('click');
		equal(view.counter, 4);
		
		start();
	});



	asyncTest('undelegateEvents', 14, function() {
		var counter1 = 0, counter2 = 0;

		var view = new Chassis.View({el: '<p><a id="test"></a></p>'});
		view.increment = function(){ counter1++; };
		view.$el.on('click', function(){ counter2++; });

		var events = {'click #test': 'increment'};

		view.delegateEvents(events);
		view.$('#test').trigger('click');
		equal(counter1, 1);
		equal(counter2, 1);

		view.undelegateEvents();
		view.$('#test').trigger('click');
		equal(counter1, 1);
		equal(counter2, 2);

		view.delegateEvents(events);
		view.$('#test').trigger('click');
		equal(counter1, 2);
		equal(counter2, 3);

		events = {
			'click document': 'increment',
			'orientationchange window': 'increment',
			'change model': 'increment',
			'beforepagein view': 'increment'
		};

		view.model = new Chassis.Model();

		view.delegateEvents(events);

		$(document).trigger('click');
		equal(counter1, 3);

		$(window).trigger('orientationchange');
		equal(counter1, 4);

		view.model.trigger('change');
		equal(counter1, 5);

		view.trigger('beforepagein');
		equal(counter1, 6);

		view.undelegateEvents();

		$(document).trigger('click');
		equal(counter1, 6);

		$(window).trigger('orientationchange');
		equal(counter1, 6);

		view.model.trigger('change');
		equal(counter1, 6);

		view.trigger('beforepagein');
		equal(counter1, 6);
		
		start();

	});

	asyncTest('_ensureElement with DOM node el', 1, function() {
		var View = Chassis.View.extend({
			el: document.body
		});

		ok(new View().el === document.body);
		
		start();
	});

	asyncTest('_ensureElement with string el', 3, function() {
		var View = Chassis.View.extend({
			el: 'body'
		});
		strictEqual(new View().el, document.body);

		View = Chassis.View.extend({
			el: '#testElement > h1'
		});
		strictEqual(new View().el, $('#testElement > h1').get(0));

		View = Chassis.View.extend({
			el: '#nonexistent'
		});
		ok(!new View().el);
		
		start();
	});

  

	asyncTest('with attributes', 2, function() {
		var View = Chassis.View.extend({
			attributes: {
				id: 'id',
				'class': 'class'
			}
		});

		strictEqual(new View().el.className, 'class');
		strictEqual(new View().el.id, 'id');
		
		start();
	});

  

	asyncTest('multiple views per element', 3, function() {
		var count = 0;
		var $el = $('<p></p>');

		var View = Chassis.View.extend({
			el: $el,
			events: {
				click: function() {
					count++;
				}
			}
		});

		var view1 = new View;
		$el.trigger('click');
		equal(1, count);

		var view2 = new View;
		$el.trigger('click');
		equal(3, count);

		view1.delegateEvents();
		$el.trigger('click');
		equal(6, count);
		
		start();
	});

  


	asyncTest('setElement uses provided object.', 2, function() {
		var $el = $('body');

		var view = new Chassis.View({el: $el});
		ok(view.$el === $el);

		view.setElement($el = $($el));
		ok(view.$el === $el);
		
		start();
	});

	asyncTest('Undelegate before changing element.', 1, function() {
		var button1 = $('<button></button>');
		var button2 = $('<button></button>');

		var View = Chassis.View.extend({
			events: {
				click: function(e) {
					ok(view.el === e.target);
				}
			}
		});

		var view = new View({el: button1});
		view.setElement(button2);

		button1.trigger('click');
		button2.trigger('click');
		
		start();
	});

	asyncTest('Clone attributes object', 2, function() {
		var View = Chassis.View.extend({
			// 原型属性
			attributes: {foo: 'bar'}
		});

		var view1 = new View({id: 'foo'});
		strictEqual(view1.el.id, 'foo');

		var view2 = new View();
		ok(!view2.el.id);
		
		start();
	});

  

	asyncTest('views stopListening', 0, function() {
		var View = Chassis.View.extend({
			init: function() {
				this.listenTo(this.model, 'all x', function(){ ok(false); }, this);
			}
		});

		var view = new View({
			model: new Chassis.Model
		});

		view.stopListening();
		view.model.trigger('x');
		start();
	});

  

	asyncTest('events passed in options', 2, function() {
		var counter = 0;

		var View = Chassis.View.extend({
			el: '<p><a id="test"></a></p>',
			increment: function() {
				counter++;
			}
		});

		var view = new View({events:{'click #test':'increment'}});
		var view2 = new View({events:{'click #test':'increment'}});

		view.$('#test').trigger('click');
		view2.$('#test').trigger('click');
		equal(counter, 2);

		view.$('#test').trigger('click');
		view2.$('#test').trigger('click');
		equal(counter, 4);
		
		start();
	});

	asyncTest('hierarchical views', 6, function() {

		var View = Chassis.View.extend();

		var top = new View({
			el: '<div></div>',
			id: 'top'
		});

		var sub1 = new View({
			el: '<div></div>',
			id: 'sub1'
		});

		var sub2 = new View({
			el: '<div></div>',
			id: 'sub2'
		});

		var sub3 = new View({
			el: '<div></div>',
			id: 'sub3'
		});

		top.append( sub1 );
		top.prepend( sub2 );
		top.setup(sub3);

		ok( sub1.parent === top );
		ok( sub2.parent === top );
		ok( sub3.parent === top );

		var divs = top.$('div');

		ok( sub1.el === divs[1] );
		ok( sub2.el === divs[0] );
		ok(!top.$('#sub3').length);
		
		start();
    
	});

	asyncTest('destroy function and event', 2, function() {

		var View = Chassis.View.extend({
			el: '<p><a id="test"></a></p>',
			onDestroy: function(){
				ok(true);
			}
		});

		var view1 = new View({
			events: {
				'click #test': function(){
					counter++;
				}
			}
		});

		view1.destroy();

		ok(!this.$el);
		
		start();
	});

	asyncTest('page change events', 4, function(){
		var router = new Chassis.Router( {
			routes: [ 'list1/:id' ]
		} );

		Chassis.PageView['list1'] = Chassis.PageView.extend( {
			onBeforePageIn: function( opts ) {
				// ok(!opts.from);
				ok(opts.to === this);
				strictEqual(opts.params.id, '123');
			},
			onAfterPageIn: function( opts ) {
				// ok(!opts.from);
				ok(opts.to === this);
				strictEqual(opts.params.id, '123');
				

				Chassis.history.navigate( '',{trigger:false} );
				Chassis.history.destroy();
				start();
			}
		} );

		Chassis.history.start();
		Chassis.history.navigate( 'list1/123' );

	});

	asyncTest('page change events on subview', 2, function(){
		var router = new Chassis.Router( {
			routes: [ 'list2/:id' ]
		} );

		Chassis.PageView['list2'] = Chassis.PageView.extend( {
			init: function( opts ) {
				this.append( new SubView1( opts, this ) );
			}
		} );

		var SubView1 = Chassis.SubView.extend( {

			init: function ( opts ) {
				this.append( new SubView2( opts, this ) );
			}
		} );

		var SubView2 = Chassis.SubView.extend( {

			onBeforePageIn: function( e ) {
				
				ok( true );
			},

			onAfterPageIn: function( e ) {
				ok( true );

				
				Chassis.history.navigate( '',{trigger:false}  );
				Chassis.history.destroy();
				start();

			}
		} );

		Chassis.history.start();
		Chassis.history.navigate( 'list2/123' );

	});
	
	asyncTest('page auto recycle', 11, function(){
		var router = new Chassis.Router( {
			routes: [ 'm1/:id','m2/:id','m3/:id','m4/:id','m5/:id','m6/:id','m7/:id','m8/:id','m9/:id','m10/:id' ]
		} );
		
		var Counter = 0;
		
		var oldMaxView = Chassis.View.MaxPageView;
		
		Chassis.View.MaxPageView = 100;
		Chassis.PageView.AllPageView.length = 0;
		Chassis.PageView.m1 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				// 超过阀值就会重新创建实例,即被回收后重新实例化
				if (Counter === 11) {
					ok( true );
					
					Chassis.history.navigate( '',{trigger:false}  );
					Chassis.history.destroy();
					
					delete Chassis.PageView.m1;
					delete Chassis.PageView.m2;
					delete Chassis.PageView.m3;
					delete Chassis.PageView.m4;
					delete Chassis.PageView.m5;
					delete Chassis.PageView.m6;
					delete Chassis.PageView.m7;
					delete Chassis.PageView.m8;
					delete Chassis.PageView.m9;
					delete Chassis.PageView.m10;
					
					Chassis.View.MaxPageView = oldMaxView;
					start();
					return;
				}
				this.append( new SubView1( opts, this ) );
				this.append( new SubView2( opts, this ) );
				this.append( new SubView3( opts, this ) );
				
				ok( true );
				
				Chassis.history.navigate( 'm2/1' );
			}
			
		} );
		
		Chassis.PageView.m2 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm3/100' );
			}
		} );
		
		Chassis.PageView.m3 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm4/100' );
			}
		} );
		
		Chassis.PageView.m4 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm5/100' );
			}
		} );
		
		Chassis.PageView.m5 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm6/100' );
			}
		} );
		
		Chassis.PageView.m6 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm7/100' );
			}
		} );
		
		Chassis.PageView.m7 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm8/100' );
			}
		} );
		Chassis.PageView.m8 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm9/100' );
			}
		} );
		Chassis.PageView.m9 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm10/100' );
			}
		} );
		Chassis.PageView.m10 = Chassis.PageView.extend( {
			init: function( opts ) {
				Counter++;
				ok( true );
				Chassis.history.navigate( 'm1/100' );
			}
		} );

		var SubView1 = Chassis.SubView.extend( {} );
		var SubView2 = Chassis.SubView.extend( {} );
		var SubView3 = Chassis.SubView.extend( {} );



		Chassis.history.start();
		Chassis.history.navigate( 'm1/123' );

  });
  
  

});

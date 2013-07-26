$(document).ready(function() {

	module('Chassis.SubView', {

		setup : function() {
			Chassis.load.config.ruler = function( pkg ){
				return '../test/data/' + pkg.replace(/\-/g,'.');
			};
			
			F.load = seajs.use;

			if ( $( '#PageView' ).length === 0 ) {
				$('body').append('<div id="PageView"></div>');
			}
			
			if ( $( '#PageView2' ).length === 0 ) {
				$('body').append('<div id="PageView2"></div>');
			}
			if ( $( '#PageView3' ).length === 0 ) {
				$('body').append('<div id="PageView3"></div>');
			}
			
		}
	} );

	var PageView = Chassis.PageView;
	var SubView = Chassis.SubView;

	asyncTest('subview constructor arguments', 6, function() {
		
		var counter = 0;

		var View = Chassis.SubView.extend({
			init: function() {
				ok(true);
			},
			doCounter: function() {
				counter++;
			}
		});

		var sub1 = new View({
			el: '<div><button>BTN</button></div>',
			events: {'click button' : 'doCounter'}
		});

		var sub2 = new View({
			id: 'sub2'
		}, sub1);

		sub1.$('button').trigger('click');
		equal( counter, 1 );

		equal( sub2.$el[0].id, 'sub2' );

		ok(!sub1.parent);
		ok( sub2.parent === sub1 );
		
		start();
	});

	asyncTest( 'static methods', 3, function() {
		
		PageView.define( 'home', {
			id: 'home1',
			className: 'home2',
			init: function( opts ) {
				this.banner = SubView.create( 'home.banner', { id: 'banner1' }, this );
				this.append( this.banner );
			}
		} );

		SubView.define( 'home.banner', {
			className: 'banner'
		} );

		var homeView = PageView.create( 'home', { className: 'homeClass' }, 'home' );

		ok( SubView.get( 'home.banner' ) === SubView[ 'home.banner' ] );
		equal( homeView.$( '.banner' )[ 0 ].id, 'banner1' );
		ok( homeView.banner.parent === homeView );

		delete PageView[ 'home' ];
		delete SubView[ 'home.banner' ];
		
		start();

	} );

	asyncTest('subview page change events', 10, function(){
		
		var router = new Chassis.Router( {
			routes: [ 'subview/:id' ]
		} );

		Chassis.PageView.subview = Chassis.PageView.extend( {
			id: 'PageView',
			init: function () {
				this.append( new Chassis.SubView.Sub( {}, this ) );
				this.append( new Chassis.SubView.Sub2( {}, this ) );
			}
		} );

		Chassis.SubView.Sub = Chassis.SubView.extend({
			id: 'SubView',
			onBeforePageIn: function( opts ) {
				ok(opts.to === this.root);
				ok(opts.to === this.parent);
				strictEqual(opts.params.id, '123');
			},
			onAfterPageIn: function( opts ) {
				ok(opts.to === this.root);
				strictEqual(opts.params.id, '123');
			}
		});

		Chassis.SubView.Sub2 = Chassis.SubView.extend({
			id: 'SubView2',
			onBeforePageIn: function( opts ) {
				ok(opts.to === this.root);
				ok(opts.to === this.parent);
				strictEqual(opts.params.id, '123');
			},
			onAfterPageIn: function( opts ) {
				ok(opts.to === this.root);
				strictEqual(opts.params.id, '123');
				
				
				Chassis.history.navigate( '',{trigger:false}  );
				Chassis.history.destroy();
				delete Chassis.PageView.subview;
				delete Chassis.SubView.Sub;
				delete Chassis.SubView.Sub2;
				start();
			}
		});

		Chassis.history.start();
		Chassis.history.navigate( 'subview/123', { trigger: true } );

	} );

	asyncTest('subview page change events only trigger on targeted page', 1, function(){
		
		var router = new Chassis.Router( {
			routes: [ 'subview/:vid', 'subview2/:vid' ]
		} );

		Chassis.PageView['subview'] = Chassis.PageView.extend( {
			id: 'PageView',
			init: function () {
				this.append( new Chassis.SubView.Sub( {}, this ) );
			}
		} );

		Chassis.PageView['subview2'] = Chassis.PageView.extend( {
			id: 'PageView2',
			init: function () {
				this.append( new Chassis.SubView.Sub2( {}, this ) );
			}
		} );

		Chassis.SubView.Sub = Chassis.SubView.extend({
			id: 'SubView',
			onBeforePageIn: function( opts ) {
				ok(false);
			}
		});

		Chassis.SubView.Sub2 = Chassis.SubView.extend({
			id: 'SubView2',
			onBeforePageIn: function( opts ) {
				ok(true);
			}
		});

		Chassis.history.start();
		Chassis.history.navigate( 'subview2/123', { trigger: true } );

		
    
		Chassis.history.navigate( '',{trigger:false}  );
		Chassis.history.destroy();
		
		delete Chassis.PageView.subview;
		delete Chassis.PageView.subview2;
		delete Chassis.SubView.Sub;
		delete Chassis.SubView.Sub2;
		start();

	});
	
	asyncTest('subview async load,reuse and async render', 4, function(){
		Chassis.reset();
		var Router = Chassis.Router.extend( {
			routes: [ 'reuse1/:id','reuse2/:id','reuse3/:id' ]
		} );
		
		Chassis.PageView['reuse1'] = Chassis.PageView.extend( {
			id: 'PageView',
			init: function ( options ) {
				var me = this;
				ok( true, 'PageView.reuse1 init success!' );
				
				
				this.setup('reuse',options );
				
				this.renderAsyncSubView( 'reuse',function(){
					
					Chassis.history.navigate( 'reuse2/123'  );
					
				} );
				
			}
			
		} );
		
		Chassis.PageView['reuse2'] = Chassis.PageView.extend( {
			id: 'PageView2',
			init: function ( options ) {
				var me = this;
				ok( true, 'PageView.reuse2 init success!' );

				
				this.setup('reuse',options );
				
				this.renderAsyncSubView( 'reuse', function(){
					Chassis.history.navigate( 'reuse3/123'  );
				} );
				
			}
			
		} );
		Chassis.PageView['reuse3'] = Chassis.PageView.extend( {
			id: 'PageView3',
			init: function ( options ) {
				var me = this;
				ok( true , 'PageView.reuse3 init success!' );

				this.setup('reuse',options );
				

				
				this.renderAsyncSubView( 'reuse', function(){
					Chassis.history.navigate( '#',{trigger:false} );
					Chassis.history.destroy();
				
					
					
					delete Chassis.PageView.reuse1;
					delete Chassis.PageView.reuse2;
					delete Chassis.PageView.reuse3;
					delete Chassis.SubView.reuse;
					
					start();
					
				} );
			}
		} );
		
		
		new Router();
		
		Chassis.history.start();
		Chassis.history.navigate( 'reuse1/123' );
	} );
});

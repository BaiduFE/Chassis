$(document).ready(function() {

	module('Chassis.SubPageMgr', {

		setup: function() {}

	});

	asyncTest('constructor arguments mixin', 6, function() {
		var SubViewTab = Chassis.SubView.extend({
			init: function() {
				this.spm = new Chassis.SubPageMgr({
					owner: this,
					max: 4,
					klass: SubViewTabContent,
					dirFn: function() {}
				});
			}
		});

		var SubViewTabContent = Chassis.SubView.extend({});

		var svt = new SubViewTab(),
        spm = svt.spm;

		equal( spm.owner , svt );
		equal( spm.max, 4 );
		equal( spm.klass , SubViewTabContent );
		ok( Chassis.isFunction( spm.dirFn ) ); 
		ok( Chassis.isFunction( spm.dirFn ) );
		equal( spm.transition, 'slider' );
		
		start();

	});

	asyncTest( 'register && getBy', 6, function() {
		
		var SubViewTab = Chassis.SubView.extend( {
			init: function() {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: SubViewTabContent
				} );

				this.subpage = new this.spm.klass;
				this.spm.register( this.subpage );
				this.spm.register( this.subpage );
			}
		});

		var SubViewTabContent = Chassis.SubView.extend({});

		var svt = new SubViewTab(),
			spm = svt.spm;

		equal( spm.pagesList.length, 1 );
		equal( spm.pagesMap[ svt.subpage.cid ], svt.subpage );
		equal( svt.subpage.__order__, 0 );
		equal( spm.getBy( 'cid', svt.subpage.cid ) , svt.subpage );
		equal( spm.getBy( '__order__', svt.subpage.__order__ ), svt.subpage );
		equal( spm.getBy( '__order__', 123 ), null );
		
		start();

	} );


	asyncTest('getStamp', 1, function() {
		var data = {
			a: 1
		};

		var SubViewTab = Chassis.SubView.extend({
			init: function() {
				this.spm = new Chassis.SubPageMgr({
					owner: this,
					klass: SubViewTabContent
				});
			}
		});

		var SubViewTabContent = Chassis.SubView.extend({});

		var svt = new SubViewTab(),
			spm = svt.spm;

		strictEqual( spm.getStamp( data ), Chassis.$.param( data ) );
		
		start();
	} );

	asyncTest('calcDir', 3, function() {
		var data = {
			a: 1
		};

		var SubViewTab = Chassis.SubView.extend({
			init: function() {
				this.spm = new Chassis.SubPageMgr({
					owner: this,
					klass: SubViewTabContent
				});

				this.subpage1 = new this.spm.klass;
				this.subpage2 = new this.spm.klass;

				this.spm.register( this.subpage1 );
				this.spm.register( this.subpage2 );
			}
		});

		var SubViewTabContent = Chassis.SubView.extend({});

		var svt = new SubViewTab(),
			spm = svt.spm;

		equal( spm._calcDir( svt.subpage1, svt.subpage2 ), 1 );
		equal( spm._calcDir( svt.subpage2, svt.subpage1 ), 2 );
		equal( spm._calcDir( svt.abc, svt.subpage1 ), 0 );
		
		start();

	} );


	asyncTest( 'recycle', 11, function() {
    
		var SubViewTab = Chassis.SubView.extend( {
			init: function() {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					max: 2,
					klass: SubViewTabContent
				} );

				this.subpage1 = new this.spm.klass;
				this.subpage2 = new this.spm.klass;
				this.subpage3 = new this.spm.klass;
				this.subpage4 = new this.spm.klass;

				this.spm.register( this.subpage1 );
				this.spm.register( this.subpage2 );
				this.spm.register( this.subpage3 );
				this.spm.register( this.subpage4 );
			}
		});

		var SubViewTabContent = Chassis.SubView.extend({});

		var svt = new SubViewTab(),
			spm = svt.spm;

		equal( spm.pagesList.length, 4 );
		ok( spm.pagesList[ 0 ] === svt.subpage1 );
		ok( spm.pagesList[ 1 ] === svt.subpage2 );
		ok( spm.pagesList[ 2 ] === svt.subpage3 );
		ok( spm.pagesList[ 3 ] === svt.subpage4 );

		spm.recycle();

		equal( spm.pagesList.length, 2 );
		ok( spm.pagesList[ 0 ] === svt.subpage3 );
		ok( spm.pagesList[ 1 ] === svt.subpage4 );

		var subpage5 = new spm.klass;
		spm.current = svt.subpage3;

		spm.register( subpage5 );

		spm.recycle();

		equal( spm.pagesList.length, 2 );
		ok( spm.pagesList[ 0 ] === subpage5 );
		ok( spm.pagesList[ 1 ] === svt.subpage3 );
		
		start();

	} );


	
	asyncTest( 'auto create subview on switch', 1, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpagea1/:aid', 'spmpageb1/:bid' ]
		} );

		Chassis.PageView[ 'spmpagea1' ] = Chassis.PageView.extend( {
			id: 'spmpagea1'
		} );

		Chassis.PageView[ 'spmpageb1' ] = Chassis.PageView.extend( {
			id: 'spmpageb1',
			init: function( opts ) {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {
			init: function( opts ) {
				equal( opts.bid, 2 );
			}
		} );

		new Router();

		Chassis.history.start();
		Chassis.history.navigate( 'spmpagea1/1' );

		Chassis.history.navigate( 'spmpageb1/2' );

		// This invoke won't create subview again
		Chassis.history.navigate( 'spmpageb1/2' );

		

		Chassis.history.navigate( '', { trigger: false } );
		Chassis.history.destroy();
		start();

	} );
	
	asyncTest( 'custome animate function', 3, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpageb2/:bid' ]
		} );

		Chassis.PageView[ 'spmpageb2' ] = Chassis.PageView.extend( {
			id: 'spmpageb2',
			init: function( opts ) {

				var me = this;

				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView,
					transition: function( fromEl, toEl, dir, transitionEnd ) {
						ok( fromEl === me.spm.pagesList[ 0 ].$el );
						ok( toEl === me.spm.pagesList[ 1 ].$el );
						equal( dir, 1 );
					}
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {} );

		new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpageb2/2', { trigger: true } );

		Chassis.history.navigate( 'spmpageb2/3', { trigger: true } );

		

		Chassis.history.navigate( '', { trigger: false } );
		Chassis.history.destroy();
		start();
	} );
	
	
	asyncTest( 'custome dir function', 5, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpageb3/:bid' ]
		} );

		Chassis.PageView[ 'spmpageb3' ] = Chassis.PageView.extend( {
			id: 'spmpageb3',
			init: function( opts ) {

				var me = this;

				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView,
					dirFn: function( from, to ) {
						ok( from === me.spm.pagesList[ 0 ] );
						ok( to === me.spm.pagesList[ 1 ] );
						return 5;
					},
					transition: function( fromEl, toEl, dir, transitionEnd ) {
						ok( fromEl === me.spm.pagesList[ 0 ].$el );
						ok( toEl === me.spm.pagesList[ 1 ].$el );
						equal( dir, 5 );
					}
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {} );

		new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpageb3/2', { trigger: true } );

		Chassis.history.navigate( 'spmpageb3/3', { trigger: true } );

		

		Chassis.history.navigate( '', { trigger: false } );
		Chassis.history.destroy();
		start();
	} );

	asyncTest( 'swtich between subpages', 3, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpageb4/:bid' ]
		} );

		var counter = 0;

		Chassis.PageView[ 'spmpageb4' ] = Chassis.PageView.extend( {
			id: 'spmpageb4',
			init: function( opts ) {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {
			init: function( opts ) {
				counter++;

				ok( true );

				if ( counter === 3 ) {
					
					Chassis.history.navigate( '', { trigger: false } );
					Chassis.history.destroy();
					start();
				}
			}
		} );

		var switchRouter = new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpageb4/2', { trigger: true } );

		Chassis.history.navigate( 'spmpageb4/3', { trigger: true } );

		Chassis.history.navigate( 'spmpageb4/4', { trigger: true } );

	} );

	asyncTest( 'switch events on different pages', 10, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpagea5/:aid', 'spmpageb5/:bid' ]
		} );



		Chassis.PageView[ 'spmpagea5' ] = Chassis.PageView.extend( {} );

		Chassis.PageView[ 'spmpageb5' ] = Chassis.PageView.extend( {
			id: 'spmpageb5',
			init: function( opts ) {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {

			onBeforeSwitchIn: function( e ) {

				equal( e.from, null );
				ok( e.to === this );
				equal( e.params.from.action, 'spmpagea5' );
				equal( e.params.to.action, 'spmpageb5' );
				equal( e.params.params.bid, 2 );
			},

			onAfterSwitchIn: function( e ) {

				equal( e.from, null );
				ok( e.to === this );
				equal( e.params.from.action, 'spmpagea5' );
				equal( e.params.to.action, 'spmpageb5' );
				equal( e.params.params.bid, 2 );

				
				Chassis.history.navigate( '', { trigger: false } );
				Chassis.history.destroy();
				start();
			}
		} );

		var switchRouter = new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpagea5/1' );

		Chassis.history.navigate( 'spmpageb5/2' );

	} );

	asyncTest( 'switch events on the same page', 10, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpageb6/:bid' ]
		} );

		Chassis.PageView[ 'spmpageb6' ] = Chassis.PageView.extend( {
			id: 'spmpageb6',

			init: function( opts ) {
				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView
				} );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {

			className: 'spmpageb6',

			onBeforeSwitchIn: function( e ) {


				if ( e.from ) {

					ok( e.from instanceof spmpagebSubView  );
					ok( e.to === this );
					ok( e.params.from === e.params.to );
					equal( e.params.from.action, 'spmpageb6' );
					equal( e.params.params.bid, 2 );

				}
			},

			onAfterSwitchIn: function( e ) {

				if ( e.from ) {

					ok( e.from instanceof spmpagebSubView  );
					ok( e.to === this );
					ok( e.params.from === e.params.to );
					equal( e.params.from.action, 'spmpageb6' );
					equal( e.params.params.bid, 2 );

					
					Chassis.history.navigate( '', { trigger: false } );
					Chassis.history.destroy();
					start();
          
				}
			}
		} );

		var switchRouter = new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpageb6/1' );

		Chassis.history.navigate( 'spmpageb6/2' );

	} );

	
	asyncTest( 'switch events on subpage', 2, function() {

		var Router = Chassis.Router.extend( {
			routes: [ 'spmpageb7/:bid' ]
		} );

		Chassis.PageView[ 'spmpageb7' ] = Chassis.PageView.extend( {
			id: 'spmpageb7',

			init: function( opts ) {
				this.append( new spmpagebSubView( opts, this ) );
			}
		} );

		var spmpagebSubView = Chassis.SubView.extend( {

			init: function( opts ) {

				this.spm = new Chassis.SubPageMgr( {
					owner: this,
					klass: spmpagebSubView1
				} );
        
			}
		} );

		var spmpagebSubView1 = Chassis.SubView.extend( {

			onBeforeSwitchIn: function( e ) {
				ok( true );
			},

			onAfterSwitchIn: function( e ) {
				ok( true );

				
				Chassis.history.navigate( '', { trigger: false } );
				Chassis.history.destroy();
				start();
			}
		} );

		var switchRouter = new Router();

		Chassis.history.start();

		Chassis.history.navigate( 'spmpageb7/1' );

	} );

});

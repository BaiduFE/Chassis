$(document).ready(function() {

  module('Chassis.SubPageMgr', {

    setup: function() {
    }

  });

  test('constructor arguments mixin', 6, function() {
    
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

    equal( spm.owner, svt );
    equal( spm.max, 4 );
    equal( spm.klass, SubViewTabContent );
    ok( Chassis.isFunction( spm.dirFn ) ); 
    ok( Chassis.isFunction( spm.dirFn ) );
    equal( spm.transition, 'slider' );

  });

  test( 'register && getBy', 6, function() {
    
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
    equal( spm.getBy( 'cid', svt.subpage.cid ), svt.subpage );
    equal( spm.getBy( '__order__', svt.subpage.__order__ ), svt.subpage );
    equal( spm.getBy( '__order__', 123 ), null );

  } );


  test('getStamp', 1, function() {
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
  } );

  test('calcDir', 3, function() {
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

  } );


  test( 'recycle', 11, function() {
    
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
    equal( spm.pagesList[ 0 ], svt.subpage1 );
    equal( spm.pagesList[ 1 ], svt.subpage2 );
    equal( spm.pagesList[ 2 ], svt.subpage3 );
    equal( spm.pagesList[ 3 ], svt.subpage4 );

    spm.recycle();

    equal( spm.pagesList.length, 2 );
    equal( spm.pagesList[ 0 ], svt.subpage3 );
    equal( spm.pagesList[ 1 ], svt.subpage4 );

    var subpage5 = new spm.klass;
    spm.current = svt.subpage3;

    spm.register( subpage5 );

    spm.recycle();

    equal( spm.pagesList.length, 2 );
    equal( spm.pagesList[ 0 ], subpage5 );
    equal( spm.pagesList[ 1 ], svt.subpage3 );

  } );



  asyncTest( 'auto create subview on switch', 1, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pagea/:aid', 'pageb/:bid' ]
    } );

    Chassis.PageView[ 'pagea' ] = Chassis.PageView.extend( {
      id: 'pagea'
    } );

    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
      id: 'pageb',
      init: function( opts ) {
        this.spm = new Chassis.SubPageMgr( {
          owner: this,
          klass: PageBSubView
        } );
      }
    } );

    var PageBSubView = Chassis.SubView.extend( {
      init: function( opts ) {
        equal( opts.bid, 2 );
      }
    } );

    new Router();

    Chassis.history.start();
    Chassis.history.navigate( 'pagea/1', { trigger: true } );

    Chassis.history.navigate( 'pageb/2', { trigger: true } );

    // This invoke won't create subview again
    Chassis.history.navigate( 'pageb/2', { trigger: true } );

    start();

    Chassis.history.navigate( '' );
    Chassis.history.destroy();

  } );

  asyncTest( 'custome animate function', 3, function() {

      var Router = Chassis.Router.extend( {
        routes: [ 'pageb/:bid' ]
      } );

      Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
        id: 'pageb',
        init: function( opts ) {

          var me = this;

          this.spm = new Chassis.SubPageMgr( {
            owner: this,
            klass: PageBSubView,
            transition: function( from, to, dir, transitionEnd ) {
              equal( from, me.spm.pagesList[ 0 ] );
              equal( to, me.spm.pagesList[ 1 ] );
              equal( dir, 1 );
            }
          } );
        }
      } );

      var PageBSubView = Chassis.SubView.extend( {} );

      new Router();

      Chassis.history.start();

      Chassis.history.navigate( 'pageb/2', { trigger: true } );

      Chassis.history.navigate( 'pageb/3', { trigger: true } );

      start();

      Chassis.history.navigate( '' );
      Chassis.history.destroy();
  } );

  asyncTest( 'custome dir function', 5, function() {

      var Router = Chassis.Router.extend( {
        routes: [ 'pageb/:bid' ]
      } );

      Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
        id: 'pageb',
        init: function( opts ) {

          var me = this;

          this.spm = new Chassis.SubPageMgr( {
            owner: this,
            klass: PageBSubView,
            dirFn: function( from, to ) {
              equal( from, me.spm.pagesList[ 0 ] );
              equal( to, me.spm.pagesList[ 1 ] );
              return 5;
            },
            transition: function( from, to, dir, transitionEnd ) {
              equal( from, me.spm.pagesList[ 0 ] );
              equal( to, me.spm.pagesList[ 1 ] );
              equal( dir, 5 );
            }
          } );
        }
      } );

      var PageBSubView = Chassis.SubView.extend( {} );

      new Router();

      Chassis.history.start();

      Chassis.history.navigate( 'pageb/2', { trigger: true } );

      Chassis.history.navigate( 'pageb/3', { trigger: true } );

      start();

      Chassis.history.navigate( '' );
      Chassis.history.destroy();
  } );

  asyncTest( 'swtich between subpages', 3, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pageb/:bid' ]
    } );

    var counter = 0;

    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
      id: 'pageb',
      init: function( opts ) {
        this.spm = new Chassis.SubPageMgr( {
          owner: this,
          klass: PageBSubView
        } );
      }
    } );

    var PageBSubView = Chassis.SubView.extend( {
      init: function( opts ) {
        counter++;

        ok( true );

        if ( counter === 3 ) {
          start();
          Chassis.history.navigate( '' );
          Chassis.history.destroy();
        }
      }
    } );

    var switchRouter = new Router();

    Chassis.history.start();

    Chassis.history.navigate( 'pageb/2', { trigger: true } );

    Chassis.history.navigate( 'pageb/3', { trigger: true } );

    Chassis.history.navigate( 'pageb/4', { trigger: true } );

  } );

  asyncTest( 'switch events on different pages', 10, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pagea/:aid', 'pageb/:bid' ]
    } );

    var counter = 0;

    Chassis.PageView[ 'pagea' ] = Chassis.PageView.extend( {} );

    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
      id: 'pageb',
      init: function( opts ) {
        this.spm = new Chassis.SubPageMgr( {
          owner: this,
          klass: PageBSubView
        } );
      }
    } );

    var PageBSubView = Chassis.SubView.extend( {

      onBeforeSwitchIn: function( e ) {

        equal( e.from, null );
        equal( e.to, this );
        equal( e.params.from.action, 'pagea' );
        equal( e.params.to.action, 'pageb' );
        equal( e.params.params.bid, 2 );
      },

      onAfterSwitchIn: function( e ) {

        equal( e.from, null );
        equal( e.to, this );
        equal( e.params.from.action, 'pagea' );
        equal( e.params.to.action, 'pageb' );
        equal( e.params.params.bid, 2 );

        start();
        Chassis.history.navigate( '' );
        Chassis.history.destroy();
      }
    } );

    var switchRouter = new Router();

    Chassis.history.start();

    Chassis.history.navigate( 'pagea/1' );

    Chassis.history.navigate( 'pageb/2' );

  } );

  asyncTest( 'switch events on the same page', 10, function() {

    var Router = Chassis.Router.extend( {
      routes: [ 'pageb/:bid' ]
    } );

    var counter = 0;

    Chassis.PageView[ 'pageb' ] = Chassis.PageView.extend( {
      id: 'pageb',
      init: function( opts ) {
        this.spm = new Chassis.SubPageMgr( {
          owner: this,
          klass: PageBSubView
        } );
      }
    } );

    var PageBSubView = Chassis.SubView.extend( {

      onBeforeSwitchIn: function( e ) {

        if ( e.from ) {

          ok( e.from instanceof PageBSubView  );
          equal( e.to, this );
          equal( e.params.from, e.params.to );
          equal( e.params.from.action, 'pageb' );
          equal( e.params.params.bid, 2 );

        }
      },

      onAfterSwitchIn: function( e ) {

        if ( e.from ) {

          ok( e.from instanceof PageBSubView  );
          equal( e.to, this );
          equal( e.params.from, e.params.to );
          equal( e.params.from.action, 'pageb' );
          equal( e.params.params.bid, 2 );

          start();
          Chassis.history.navigate( '' );
          Chassis.history.destroy();
          
        }
      }
    } );

    var switchRouter = new Router();

    Chassis.history.start();

    Chassis.history.navigate( 'pageb/1' );

    Chassis.history.navigate( 'pageb/2' );

  } );

});

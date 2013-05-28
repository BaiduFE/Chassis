$(document).ready(function() {
  
  module('Chassis.SubView');

  test('subview constructor arguments', 6, function() {

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
    equal( sub2.parent, sub1 );
  });

  asyncTest('subview page change events', 10, function(){

    var router = new Chassis.Router( {
      routes: [ 'subview/:id' ]
    } );

    Chassis.PageView['subview'] = Chassis.PageView.extend( {
      id: 'PageView',
      init: function () {
        this.append( new Chassis.SubView.Sub( {}, this ) );
        this.append( new Chassis.SubView.Sub2( {}, this ) );
      }
    } );

    Chassis.SubView.Sub = Chassis.SubView.extend({
      id: 'SubView',
      onBeforePageIn: function( opts ) {
        strictEqual(opts.to, this.root);
        strictEqual(opts.to, this.parent);
        strictEqual(opts.params.id, '123');
      },
      onAfterPageIn: function( opts ) {
        strictEqual(opts.to, this.root);
        strictEqual(opts.params.id, '123');
      }
    });

    Chassis.SubView.Sub2 = Chassis.SubView.extend({
      id: 'SubView2',
      onBeforePageIn: function( opts ) {
        strictEqual(opts.to, this.root);
        strictEqual(opts.to, this.parent);
        strictEqual(opts.params.id, '123');
      },
      onAfterPageIn: function( opts ) {
        strictEqual(opts.to, this.root);
        strictEqual(opts.params.id, '123');
        start();

        Chassis.history.navigate( '' );
        Chassis.history.destroy();
      }
    });

    Chassis.history.start();
    Chassis.history.navigate( 'subview/123', { trigger: true } );

  });

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

    start();
    
    Chassis.history.navigate( '' );
    Chassis.history.destroy();

  });

});

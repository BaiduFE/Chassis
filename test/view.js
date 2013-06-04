$(document).ready(function() {

  var view;

  module('Chassis.View', {

    setup: function() {
      view = new Chassis.View({
        id        : 'test-view',
        className : 'test-view',
        other     : 'non-special-option'
      });
    }

  });

  test('constructor', 3, function() {
    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, undefined);
  });

  
  test('view.$', 1, function() {
    var view = new Chassis.View;
    view.setElement('<p><a><b>test</b></a></p>');
    strictEqual(view.$('a b').html(), 'test');
  });

  
  test('init', 1, function() {
    var View = Chassis.View.extend({
      init: function() {
        this.one = 1;
      }
    });

    strictEqual(new View().one, 1);
  });

  
  test('delegateEvents', 10, function() {
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

  });

  test('delegateEvents allows functions for callbacks', 3, function() {
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
  });

  /*
  test('delegateEvents ignore undefined methods', 0, function() {
    var view = new Chassis.View({el: '<p></p>'});
    view.delegateEvents({'click': 'undefinedMethod'});
    view.$el.trigger('click');
  });
  */

  test('undelegateEvents', 14, function() {
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

  });

  test('_ensureElement with DOM node el', 1, function() {
    var View = Chassis.View.extend({
      el: document.body
    });

    equal(new View().el, document.body);
  });

  test('_ensureElement with string el', 3, function() {
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
  });

  /*
  test('with className and id functions', 2, function() {
    var View = Chassis.View.extend({
      className: function() {
        return 'className';
      },
      id: function() {
        return 'id';
      }
    });

    strictEqual(new View().el.className, 'className');
    strictEqual(new View().el.id, 'id');
  });
  */

  test('with attributes', 2, function() {
    var View = Chassis.View.extend({
      attributes: {
        id: 'id',
        'class': 'class'
      }
    });

    strictEqual(new View().el.className, 'class');
    strictEqual(new View().el.id, 'id');
  });

  /*
  test('with attributes as a function', 1, function() {
    var View = Chassis.View.extend({
      attributes: function() {
        return {'class': 'dynamic'};
      }
    });

    strictEqual(new View().el.className, 'dynamic');
  });
  */

  test('multiple views per element', 3, function() {
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
  });

  /*
  test('custom events, with namespaces', 2, function() {
    var count = 0;

    var View = Chassis.View.extend({
      el: $('body'),
      events: function() {
        return {'fake$event.namespaced': 'run'};
      },
      run: function() {
        count++;
      }
    });

    var view = new View;
    $('body').trigger('fake$event').trigger('fake$event');
    equal(count, 2);

    $('body').unbind('.namespaced');
    $('body').trigger('fake$event');
    equal(count, 2);
  });
  */


  test('setElement uses provided object.', 2, function() {
    var $el = $('body');

    var view = new Chassis.View({el: $el});
    ok(view.$el === $el);

    view.setElement($el = $($el));
    ok(view.$el === $el);
  });

  test('Undelegate before changing element.', 1, function() {
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
  });

  test('Clone attributes object', 2, function() {
    var View = Chassis.View.extend({
      // 原型属性
      attributes: {foo: 'bar'}
    });

    var view1 = new View({id: 'foo'});
    strictEqual(view1.el.id, 'foo');

    var view2 = new View();
    ok(!view2.el.id);
  });

  /*
  test('#1228 - tagName can be provided as a function', 1, function() {
    var View = Chassis.View.extend({
      tagName: function() {
        return 'p';
      }
    });

    ok(new View().$el.is('p'));
  });
  */

  test('views stopListening', 0, function() {
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
  });

  /*
  test('Provide function for el.', 1, function() {
    var View = Chassis.View.extend({
      el: function() {
        return '<p><a></a></p>';
      }
    });

    var view = new View;
    ok(view.$el.is('p:has(a)'));
  });
  */

  test('events passed in options', 2, function() {
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
  });

  test('hierarchical views', 6, function() {

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

    equal( sub1.parent, top );
    equal( sub2.parent, top );
    equal( sub3.parent, top );

    var divs = top.$('div');

    strictEqual( sub1.el, divs[1] );
    strictEqual( sub2.el, divs[0] );
    ok(!top.$('#sub3').length);
    
  });

  test('destroy function and event', 2, function() {

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
  });

  asyncTest('page change events', 4, function(){
    var router = new Chassis.Router( {
      routes: [ 'list1/:id' ]
    } );

    Chassis.PageView['list1'] = Chassis.PageView.extend( {
      onBeforePageIn: function( opts ) {
        // ok(!opts.from);
        strictEqual(opts.to, this);
        strictEqual(opts.params.id, '123');
      },
      onAfterPageIn: function( opts ) {
        // ok(!opts.from);
        strictEqual(opts.to, this);
        strictEqual(opts.params.id, '123');
        start();

        Chassis.history.navigate( '',{trigger:false} );
        Chassis.history.destroy();
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

        start();
        Chassis.history.navigate( '',{trigger:false}  );
        Chassis.history.destroy();

      }
    } );

    Chassis.history.start();
    Chassis.history.navigate( 'list2/123' );

  });

});

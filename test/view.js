$(document).ready(function() {

  var view;

  module("Chassis.View", {

    setup: function() {
      view = new Chassis.View({
        id        : 'test-view',
        className : 'test-view',
        other     : 'non-special-option'
      });
    }

  });

  test("constructor", 3, function() {
    equal(view.el.id, 'test-view');
    equal(view.el.className, 'test-view');
    equal(view.el.other, void 0);
  });

  test("jQuery", 1, function() {
    var view = new Chassis.View;
    view.setElement('<p><a><b>test</b></a></p>');
    strictEqual(view.$('a b').html(), 'test');
  });

  test("initialize", 1, function() {
    var View = Chassis.View.extend({
      initialize: function() {
        this.one = 1;
      }
    });

    strictEqual(new View().one, 1);
  });

  test("delegateEvents", 6, function() {
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
    equal(counter1, 3);
    equal(counter2, 3);
  });

  test("delegateEvents allows functions for callbacks", 3, function() {
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
    equal(view.counter, 3);
  });

  test("delegateEvents ignore undefined methods", 0, function() {
    var view = new Chassis.View({el: '<p></p>'});
    view.delegateEvents({'click': 'undefinedMethod'});
    view.$el.trigger('click');
  });

  test("undelegateEvents", 6, function() {
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
  });

  test("_ensureElement with DOM node el", 1, function() {
    var View = Chassis.View.extend({
      el: document.body
    });

    equal(new View().el, document.body);
  });

  test("_ensureElement with string el", 3, function() {
    var View = Chassis.View.extend({
      el: "body"
    });
    strictEqual(new View().el, document.body);

    View = Chassis.View.extend({
      el: "#testElement > h1"
    });
    strictEqual(new View().el, $("#testElement > h1").get(0));

    View = Chassis.View.extend({
      el: "#nonexistent"
    });
    ok(!new View().el);
  });

  test("with className and id functions", 2, function() {
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

  test("with attributes", 2, function() {
    var View = Chassis.View.extend({
      attributes: {
        id: 'id',
        'class': 'class'
      }
    });

    strictEqual(new View().el.className, 'class');
    strictEqual(new View().el.id, 'id');
  });

  test("multiple views per element", 3, function() {
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
    $el.trigger("click");
    equal(1, count);

    var view2 = new View;
    $el.trigger("click");
    equal(3, count);

    view1.delegateEvents();
    $el.trigger("click");
    equal(5, count);
  });

  test("custom events, with namespaces", 2, function() {
    var count = 0;

    var View = Chassis.View.extend({
      el: $('body'),
      events: {"fake$event.namespaced": "run"},
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

  test("setElement uses provided object.", 2, function() {
    var $el = $('body');

    var view = new Chassis.View({el: $el});
    ok(view.$el === $el);

    view.setElement($el = $($el));
    ok(view.$el === $el);
  });

  test("Undelegate before changing element.", 1, function() {
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

  test("#1172 - Clone attributes object", 2, function() {
    var View = Chassis.View.extend({
      attributes: {foo: 'bar'}
    });

    var view1 = new View({id: 'foo'});
    strictEqual(view1.el.id, 'foo');

    var view2 = new View();
    ok(!view2.el.id);
  });

  test("views stopListening", 0, function() {
    var View = Chassis.View.extend({
      initialize: function() {
        this.listenTo(this.model, 'all x', function(){ ok(false); }, this);
      }
    });

    var view = new View({
      model: new Chassis.Model
    });

    view.stopListening();
    view.model.trigger('x');
  });

  test("events passed in options", 2, function() {
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
});
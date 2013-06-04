$(document).ready(function() {

  module('Chassis.PageView');

  var PageView = Chassis.PageView;

  test('pageview constructor arguments', 5, function() {
    var counter = 0;
    var PageView = Chassis.PageView.extend({
      init: function(){
        ok(true);
      },
      doCounter: function(){
        counter++;
      }
    });

    var action = 'home';

    var view = new PageView({
      id: 'pageview',
      className: 'pageview',
      events: {'click': 'doCounter'}
    }, action);

    equal(view.$el[0].id, 'pageview');
    equal(view.$el[0].className, 'pageview');
    view.$el.trigger('click');
    equal(counter,1);
    equal(view.action,action);

  } );

  test('pageview isActive api', 2, function(){
    var view = new Chassis.PageView();

    ok(!view.isActive());

    view.$el.show();
    ok(view.isActive());
  });

  test( 'static methods', 4, function() {

    PageView.define( 'home', {
      id: 'home1',
      className: 'home2'
    } );

    var homeView = PageView.create( 'home', { className: 'homeClass' }, 'home' );

    equal( PageView.get( 'home' ), PageView.home );
    equal( homeView.el.id, 'home1' );
    equal( homeView.el.className, 'homeClass' );
    equal( homeView.action, 'home' );

    delete PageView[ 'home' ];

  } );

  asyncTest('pageview save and restore position', 2, function(){
    var view = new Chassis.PageView();
    var startY = window.scrollY;

    view.savePos();

    window.scrollTo(0,300);

    equal(window.scrollY,300);

    view.restorePos();

    setTimeout(function() {
      equal(startY, window.scrollY);
      start();
    }, 300);
  });

});

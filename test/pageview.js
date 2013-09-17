$(document).ready(function() {

	module('Chassis.PageView');

	var PageView = Chassis.PageView;
	
	asyncTest('pageview constructor arguments', 5, function() {
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
		
		start();

	} );

	asyncTest('pageview isActive api', 2, function(){
		var view = new Chassis.PageView();

		ok(!view.isActive());

		view.$el.show();
		ok(view.isActive());
		
		start();
	});

	asyncTest( 'static methods', 4, function() {

		PageView.define( 'home', {
			id: 'home1',
			className: 'home2'
		} );

		var homeView = PageView.create( 'home', { className: 'homeClass' }, 'home' );

		ok( PageView.get( 'home' ) === PageView.home );
		equal( homeView.el.id, 'home1' );
		equal( homeView.el.className, 'homeClass' );
		equal( homeView.action, 'home' );

		delete PageView[ 'home' ];
		start();

	} );

	asyncTest('pageview save and restore position', 2, function(){
		var view = new Chassis.PageView();
		var startY = window.scrollY;
		
		//保存当前的值
		view.savePos();
		// 如果高度不够，scrollTo就不会生效
		$('body').append( '<div style="height:3000px;" id="_tmpElement_"></div>' );
		window.scrollTo(0,300);

		equal(window.scrollY,300);

		view.restorePos();

		setTimeout(function() {
			equal(window.scrollY,startY);

			$('#_tmpElement_').remove();
			start();
		}, 20);

	});
});

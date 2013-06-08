Chassis.View.Loading.setup('.wrapper .global-loading','.wrapper .page-loading');

Router = Chassis.Router.extend( Router );

var router = new Router();

new Chassis.GlobalView.top({}, router);

Chassis.history.start( {
	pushState : true,
	root : '/'
} );
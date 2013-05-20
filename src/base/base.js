/**
 * @fileOverview 命名空间初始化
 */

var root = this,
	exportName = 'Rocket',
	_Chassis = root[ exportName ],
	Chassis;

if( typeof exports !== 'undefined' ) {
	Chassis = exports;
} else {
	Chassis = root[ exportName ] = {};
}

Chassis.VERSION = '0.1.0';

Chassis.$ = root.jQuery || root.Zepto || root.ender;

Chassis.noConflict = function() {
	root[ exportName ] = _Chassis;
	return this;
};
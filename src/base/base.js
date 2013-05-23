/**
 * @fileOverview 命名空间初始化
 */

/**
 * 命名空间
 * @class __Chassis__
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

/**
 * 版本号
 * @property VERSION
 * @static
 * @type String
 */
Chassis.VERSION = '0.1.0';

/**
 * $
 * @property $
 * @type jQuery|Zepto|ender
 */
Chassis.$ = root.jQuery || root.Zepto || root.ender;


/**
 * 获取无冲突命名空间
 * @method noConflict
 * @static
 * @return __Chassis__
 */
Chassis.noConflict = function() {
	root[ exportName ] = _Chassis;
	return this;
};
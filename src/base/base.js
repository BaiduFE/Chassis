/**
 * @fileOverview 命名空间初始化
 */

/**
 * 命名空间
 * @class __Chassis__
 */
var root = this,
	exportName = '__Chassis__',
	_Chassis = root[ exportName ],
	Chassis;

if ( typeof exports !== 'undefined' ) {
	Chassis = exports;
} else {
	Chassis = root[ exportName ] = {};
}

/**
 * 版本号
 * @property VERSION
 * @static
 * @type string
 */
Chassis.VERSION = '0.1.0';

/**
 * 页面切换动画命名空间
 * @property FX
 * @static
 * @type string
 */
Chassis.FX = {}; 

/**
 * see [jQuery](http://api.jquery.com/),
 * [Zepto](http://zeptojs.com/),[GMU](http://gmu.baidu.com/)
 * or [ender](https://ender.no.de)
 * @property $
 * @type object
 */
Chassis.$ = root.jQuery || root.Zepto || root.ender;
Chassis.F = root.F;

/**
 * 通用模块缓存
 * @property commonView
 * @static
 * @type object
 */
Chassis.commonView = {};

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

Chassis.reset = function() {
	Chassis.commonView = {};
	Chassis.PageView.AllPageView = [];
	Chassis.PageView.AllPageViewBox = {};
};
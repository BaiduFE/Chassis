/**
 * @fileOverview 语言增强
 */

/**
 * mixin
 * @method mixin
 * @static
 * @param  {object} target	待mixin目标对象
 * @param  {object} source	待mixin源对象
 * @return {object}
 */
Chassis.mixin = $.extend;

/*
function( target, source ) {

	// 如果只有一个参数则视target为source，target为this;
	if( arguments.length === 1 ) {
		source = [ target ];
		target = this;
	} else {
		source = [].slice.call( arguments, 1 );
	}

	for( var i = 0, len = source.length; i < len; i++ ) {
		var src = source[ i ];

		if( src ) {
			for( var prop in src ) {
				target[ prop ] = src[ prop ];
			}
		}
	}

	return target;
};
*/

/**
 * 实现类继承
 * @method extend
 * @static
 * @param  {object} protoProps	原型属性或方法
 * @param  {object} staticProps 类属性或方法
 * @return {function}
 */
Chassis.extend = function( protoProps, staticProps ) {
	var parent = this,
		child;

	// 构造函数
	if( protoProps && 'constructor' in protoProps ) {
		child = protoProps.constructor;
	} else {
		child = function() {
			return parent.apply( this, arguments );
		};
	}

	// 静态方法
	Chassis.mixin( child, parent, staticProps );

	// 原型链处理
	var Proxy = function() {
		this.constructor = child;
	};

	Proxy.prototype = parent.prototype;
	child.prototype = new Proxy;

	if( protoProps ) {
		Chassis.mixin( child.prototype, protoProps );
	}

	child.__super__ = parent.prototype;

	return child;
	
};

/**
 * 生成标识ID
 * @method uniqueId
 * @static
 * @param {string} prefix ID前缀
 * @return {string}
 */
Chassis.uniqueId = ( function() {
	var idCounter = 0;
	return function( prefix ){
		var id = ++idCounter + '';
    	return prefix ? prefix + id : id;
	};
} )();

Chassis.isFunction = $.isFunction;
Chassis.bind = $.proxy;

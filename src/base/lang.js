/**
 * @fileOverview 语言增强
 */


Chassis.mixin = function( target, source /*[, source]*/) {

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
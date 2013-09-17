 /*jshint camelcase:false*/
 /**
 * @fileOverview 语言增强
 */

var proto = Array.prototype,
    nativeForEach = proto.forEach,
    breaker = {},
    toString = proto.toString,
    nativeIsArray = Array.isArray;

/**
 * mixin方法，等同于$.extend;
 * @method mixin
 * @static
 */
Chassis.mixin = $.extend;

/**
 * 实现类继承
 * @method extend
 * @static
 * @param  {object} protoProps  原型属性或方法
 * @param  {object} staticProps 类属性或方法
 * @return {function}
 */
Chassis.extend = function( protoProps, staticProps ) {
    var parent = this,
        Proxy,
        child;

    // 构造函数
    if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
        child = protoProps.constructor;
    } else {
        child = function() {
            return parent.apply( this, arguments );
        };
    }

    // 静态方法
    Chassis.mixin( child, parent, staticProps );

    // 原型链处理
    Proxy = function() {
        this.constructor = child;
    };

    Proxy.prototype = parent.prototype;
    child.prototype = new Proxy();

    if ( protoProps ) {
        Chassis.mixin( child.prototype, protoProps );
    }

    child.__super__ = parent.prototype;

    return child;

};

/**
 * 创建一个只能调用一次的函数。
 * > 重复调用改进的方法也没有效果，还是返回第一次执行的结果。
 * > 有助于初始化类型的方法，代替过去设置一个boolean标记及后续对标记检测。
 *
 * @method _once
 * @static
 * @param  {function} func 传入的函数
 * @return {function} 只能调用一次的函数
 */     
Chassis._once = function( func ) {
    var me = this,
        ran = false, 
        memo;

    return function() {
        
        if ( ran ) {
            return memo;
        }
        
        ran = true;
        memo = func.apply( me, arguments );
        func = null;
        return memo;
    };
};

/**
 * 判断一个对象是否有你给出名称的属性或对象。
 * > 需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
 *
 * @method has
 * @static
 * @param  {object} obj 目标对象
 * @param {string} key 属性
 * @return {boolean} key 属性
 */
Chassis.has = function( obj, key ) {
    return hasOwnProperty.call( obj, key );
};

/**
 * 检索object的所有的属性名称。
 *
 * @method keys
 * @static
 * @param  {object} obj 目标对象
 * @return {array} 所有的属性名称
 */
Chassis.keys = function( obj ) {
    var keys = [];
    
    if ( obj !== Object( obj ) ) {
        throw new TypeError( 'Invalid object' );
    }
    
    Chassis.$.each( obj, function( key, item ) {
        if ( Chassis.has( obj, key ) ) {
            keys[ keys.length ] = key;
        }
    } );
    
    return keys;
};

/**
 * 为需要的客户端模型或DOM元素生成一个全局唯一的id。
 * > 如果prefix参数存在， id 将附加给它
 *
 * @method uniqueId
 * @static
 * @param  {string} prefix 前缀
 * @return {string}
 */
Chassis.uniqueId = (function() {
    var idCounter = 0;

    return function( prefix ) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
})();

    
/**
 * see [$.isArray](http://zeptojs.com/#$.isArray)
 * @method isArray
 * @static
 */
Chassis.isArray = Chassis.$.isArray;

/**
 * 判断是否是对象
 *
 * @method isObject
 * @static
 * @param  {*} obj 目标
 * @return {boolean}
 */
Chassis.isObject = function( obj ) {
    return obj === Object( obj );
};

/**
 * see [$.isFunction](http://zeptojs.com/#$.isFunction)
 *
 * @method isFunction
 * @static
 */
Chassis.isFunction = Chassis.$.isFunction;

/**
 * 创建 一个浅复制（浅拷贝）的克隆object。
 * > 任何嵌套的对象或数组都通过引用拷贝，不会复制。
 *
 * @method clone
 * @static
 * @param  {object} obj 目标对象
 * @return {object}
 */
Chassis.clone = function( obj ) {
    if ( !Chassis.isObject( obj ) ) {
        return obj;
    }
    return Chassis.isArray( obj ) ? obj.slice() : Chassis.mixin( {}, obj );
};

/**
 * 返回对象属性的运行结果
 * > 如果该属性是一个方法，则返回该方法的运算结果
 *
 * @method result
 * @static
 * @param  {object} obj 目标对象
 * @param  {object} property 目标属性
 * @return {object}
 */
Chassis.result = function( object, property ) {
    var value;

    if ( object === null ) {
        return null;
    }
    
    value = object[ property ];
    return Chassis.isFunction( value ) ? value.call( object ) : value;
};

/**
 * 转义HTML字符串，替换&, <, >, ", ', /字符
 *
 * @method escape
 * @static
 * @param  {string} str 目标字符串
 * @return {string}
 */
Chassis.escape = function( str ) {
    return str ?
        str.replace( /\&/g, '&amp;' )
            .replace( /</g, '&lt;' )
            .replace( /\>/g, '&gt;' )
            .replace( /\"/g, '&quot;' )
            .replace( /\'/g, '&#x27' )
            .replace( /\//g, '&#x2F' ):
        str;

};

/**
 * see [$.proxy](http://zeptojs.com/#$.proxy)
 *
 * @method proxy
 * @static
 */
Chassis.proxy = $.proxy;

/**
 * 将两个数组转换为名称-值对的对象
 *
 * @method object
 * @param  {array} list 目标数组(key)
 * @param  {array} values 目标数组(value)
 * @return {object}
 * @static
 */
Chassis.object = function( list, values ) {
    var result = {};

    if ( list === null ) {
        return {};
    }
    
    Chassis.$.each( list, function( key, item ) {
        if ( values ) {
            result[ item ] = values[ key ];
        } else {
            result[ item[ 0 ] ] = item[ 1 ];
        }
    } );

    return result;
};



Chassis.load = function( pkg, callback ) {
    var pkgs = Chassis.load.config.ruler( pkg );
    if ( pkgs ) {
        Chassis.F.load( pkgs, callback );
    }
};
Chassis.load.config = {
    ruler : function( pkg ) {}
};


$.support = Chassis.mixin( $.support || {}, {
    has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
} );

/**
 * Undefined
 * @property Undefined
 * @static
 * @type undefined
 * @private
 */
Chassis.Undefined;
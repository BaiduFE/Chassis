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
 * see [$.proxy](http://zeptojs.com/#$.proxy)
 *
 * @method proxy
 * @static
 */
Chassis.proxy = $.proxy;

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
 /**
 * @fileOverview 语言增强
 */

var 
    proto = Array.prototype,
    nativeForEach = proto.forEach,
    breaker = {},
    toString = proto.toString,
    nativeIsArray = Array.isArray;

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
        child;

    // 构造函数
    if( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
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



Chassis.each = Chassis.forEach = function(obj, iterator, context) {
    if ( obj == null ) {
        return;
    }
    
    if ( nativeForEach && obj.forEach === nativeForEach ) {
        obj.forEach( iterator, context );

    } else if ( obj.length === +obj.length ) {
        for ( var i = 0, l = obj.length; i < l; i++ ) {
            if ( iterator.call( context, obj[ i ], i, obj ) === breaker ) {
                return;
            }
        }
    } else {
        for ( var key in obj ) {
            if ( Chassis.has( obj, key )) {
                if ( iterator.call( context, obj[ key ], key, obj ) === breaker ) {
                    return;
                }
            }
        }
    }
};
      
      
Chassis._once = function( func ) {
    var ran = false, 
        memo,
        self = this;

    return function() {
        
        if (ran) {
            return memo;
        }
        
        ran = true;
        memo = func.apply(self, arguments);
        func = null;
        return memo;
    };
};

Chassis.has = function( obj, key ) {
    return hasOwnProperty.call(obj, key);
};

Chassis.keys = function( obj ) {
    var keys = [];
    
    if ( obj !== Object( obj ) ) {
        throw new TypeError( 'Invalid object' );
    }
    
    Chassis.each( obj,function( item,key ) {
        if ( Chassis.has( obj, key )) {
            keys[ keys.length ] = key;
        }
    });
    
    return keys;
};
    
Chassis.uniqueId = ( function() {
    var idCounter = 0;

    return function( prefix ){
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
} )();

    

Chassis.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
};

Chassis.isObject = function( obj ) {
    return obj === Object( obj );
};

Chassis.isFunction = $.isFunction;


Chassis.clone = function(obj) {
    if ( !Chassis.isObject( obj )) {
        return obj;
    }
    return Chassis.isArray( obj ) ? obj.slice() : Chassis.mixin( {}, obj );
};

Chassis.result = function( object, property ) {
    var value;

    if (object == null) {
        return null;
    }
    
    value = object[ property ];
    return Chassis.isFunction( value ) ? value.call( object ) : value;
};

Chassis.escape = function( str ){
    return str ?
        str.replace( /\&/g,'&amp;' )
            .replace( /\</g,'&lt;' )
            .replace( /\>/g,'&gt;' )
            .replace( /\"/g,'&quot;' )
            .replace( /\'/g,'&#x27' )
            .replace( /\//g,'&#x2F' ):
        str;

};

Chassis.bind = $.proxy;

Chassis.object = function(list, values) {
    var result = {};
    if (list == null) {
        return {};
    }
    
    Chassis.each(list,function(item, key){
        if (values) {
            result[item] = values[ key ];
        } else {
            result[item[0]] = item[1];
        }
    });

    return result;
};
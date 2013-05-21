    /**
     * @fileOverview 语言增强
     */

    var nativeForEach = Array.prototype.forEach,
        breaker = {},
        idCounter = 0,
        toString = Array.prototype.toString,
        nativeIsArray = Array.isArray;

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

    Chassis.extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && Chassis.has(protoProps, 'constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }

        Chassis.mixin(child, parent, staticProps);


        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        if (protoProps) Chassis.mixin(child.prototype, protoProps);


        child.__super__ = parent.prototype;

        return child;
    };



    Chassis.each = Chassis.forEach = function(obj, iterator, context) {
        if (obj == null) {
            return;
        }
        
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) {
                    return;
                }
            }
        } else {
            for (var key in obj) {
                if (Chassis.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) {
                        return;
                    }
                }
            }
        }
    };
      
      
    Chassis._once = function(func){
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

    Chassis.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    Chassis.keys = function(obj) {
        var keys = [];
        
        if (obj !== Object(obj)) {
            throw new TypeError('Invalid object');
        }
        
        Chassis.each(obj,function(item,key){
            if (Chassis.has(obj, key)) {
                keys[keys.length] = key;
            }
        });
        
        return keys;
    };



    
    Chassis.uniqueId = function(prefix) {
        var id = '' + (++idCounter);
        return prefix ? prefix + id : id;
    };
    

    Chassis.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };

    Chassis.isObject = function(obj) {
        return obj === Object(obj);
    };
    
    Chassis.isFunction = function(obj) {
        return typeof obj === 'function';
    };
    
  
    Chassis.clone = function(obj) {
        if (!Chassis.isObject(obj)) {
            return obj;
        }
        return Chassis.isArray(obj) ? obj.slice() : Chassis.mixin({}, obj);
    };
    
    Chassis.result = function(object, property) {
        var value;
        if (object == null) {
            return null;
        }
        
        value = object[property];
        return Chassis.isFunction(value) ? value.call(object) : value;
    };
    
    Chassis.escape = function(str){
        return str ?
            str.replace(/\&/g,'&amp;')
                .replace(/\</g,'&lt;')
                .replace(/\>/g,'&gt;')
                .replace(/\"/g,'&quot;')
                .replace(/\'/g,'&#x27')
                .replace(/\//g,'&#x2F'):
            str;
    
    };
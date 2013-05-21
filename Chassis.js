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
  
    /**
     * Chassis Events模块
     *
     * @module Events
     *
     */
    var Events = Chassis.Events = {
        
        /**
         * on
         *
         * @example
         * var obj = _.extend({},Chassis.Events);
         * obj.on("a b c",callback);
         * obj.on({a:callback, b:callback, c:callback},obj);
         */
        on: function(name, callback, context) {
            var events;
            
            if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
                return this;
            }
          
            this._events || (this._events = {});
            events = this._events[name] || (this._events[name] = []);
            events.push({callback: callback, context: context, ctx: context || this});
            
            return this;
        },

        /**
         * once
         *
         * @example
         * var obj = _.extend({},Chassis.Events);
         * obj.once("a b c",callback);
         * obj.once({a:callback, b:callback, c:callback},obj);
         */
        once: function(name, callback, context) {
            var self = this,
                once;
            
            if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
                return this;
            }
            

            once = Chassis._once(function() {
                self.off(name, once);
                callback.apply(self, arguments);
            });
            
            once._callback = callback;
            return this.on(name, once, context);
        },

        /**
         * off
         *
         * @example
         * var obj = _.extend({},Chassis.Events);
         * obj.off("a b c",callback);
         * obj.off({a:callback, b:callback, c:callback},obj);
         */
        off: function(name, callback, context) {
            var self = this,
                retain, 
                ev, 
                events, 
                names, 
                i, 
                l, 
                j, 
                k;
                
            if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
                return this;
            }
            
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }

            names = name ? [name] : Chassis.keys(this._events);
            
            Chassis.each(names,function(nItem,nKey){
                name = nItem;
                if (events = self._events[name]) {
                    self._events[name] = retain = [];
                    if (callback || context) {
                        Chassis.each(events,function(eItem,eKey){
                            ev = eItem;
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                (context && context !== ev.context)) {
                                retain.push(ev);
                            }
                        });
                        
                    }
                    if (!retain.length) {
                        delete self._events[name];
                    }
                }
            });
            
            
            return this;
        },

        /**
         * trigger
         *
         * @example
         * var obj = _.extend({},Chassis.Events);
         * obj.trigger("a b c");
         */
        trigger: function(name) {
            var args,
                events,
                allEvents;
            
            if (!this._events) {
                return this;
            }
            
            args = [].slice.call(arguments, 1);
            
            if (!eventsApi(this, 'trigger', name, args)) {
                return this;
            }
            
            events = this._events[name];
            allEvents = this._events.all;
            
            if (events) {
                triggerEvents(events, args);
            }
            
            if (allEvents) {
                triggerEvents(allEvents, arguments);
            }
            
            return this;
        },

        /**
         * stopListening
         *
         * @example
         * var obj = _.extend({},Chassis.Events);
         * obj.stopListening("a b c",callback);
         */
        stopListening: function(obj, name, callback) {
            var listeners = this._listeners,
                self = this,
                deleteListener,
                id;
            
            if (!listeners) {
                return this;
            }
            
            deleteListener = !name && !callback;
            
            if (typeof name === 'object') {
                callback = this;
            }
            
            if (obj) {
                (listeners = {})[obj._listenerId] = obj;
            }
            
            Chassis.each(listeners,function(item,key){
                listeners[ key ].off(name, callback, self);
                
                if (deleteListener) {
                    delete self._listeners[ key ];
                }
            });
            
            return this;
        }

    };

    var eventSplitter = /\s+/;

    var eventsApi = function(obj, action, name, rest) {
        var names,i,l;
        if (!name) {
            return true;
        }

        if (typeof name === 'object') {
            Chassis.each(name,function(item,key){
                obj[action].apply(obj, [key, item].concat(rest));
            });
            
            return false;
        }

        if (eventSplitter.test(name)) {
            
            names = name.split(eventSplitter);
            
            Chassis.each(names,function(item,key){
                obj[action].apply(obj, [item].concat(rest));
            });
            
            
            
            return false;
        }

        return true;
    };


    var triggerEvents = function(events, args) {
        var ev, 
            i = -1, 
            l = events.length, 
            a1 = args[0], 
            a2 = args[1], 
            a3 = args[2];
        
        switch (args.length) {
            case 0: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx); 
                }
                return;
            case 1: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1); 
                }
                return;
            case 2: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1, a2); 
                }
                return;
            case 3: 
                while (++i < l) {
                    (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); 
                }
                return;
            default: 
                while (++i < l) {
                    (ev = events[i]).callback.apply(ev.ctx, args);
                }
        }
    };

    var listenMethods = {listenTo: 'on', listenToOnce: 'once'};


    Chassis.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeners,id;
            
            listeners = this._listeners || (this._listeners = {});
            id = obj._listenerId || (obj._listenerId = Chassis.uniqueId('l'));
            listeners[id] = obj;
            
            if (typeof name === 'object') {
                callback = this;
            }
            
            obj[implementation](name, callback, this);
            return this;
        };
    });

    Events.bind   = Events.on;
    Events.unbind = Events.off;

    Chassis.mixin(Chassis, Events);
    
    ////////////////////////////////////////////////////////////
    var Model = Chassis.Model = function(attributes, options) {
        var defaults,
            attrs;
        
        attrs = attributes || {};
        options || (options = {});
        
        this.attributes = {};
        this.cid = _.uniqueId('c');
        
        
        attrs = Chassis.mixin({},this.defaults || {},attrs);
        this.set(attrs, options);

        this.initialize.apply(this,arguments);
    };
    
    Chassis.mixin(Model.prototype, Events, {
        
        idAttribute : 'id',
        
        initialize : function(){},
        
        get : function(key) {
            return this.attributes[ key ];
        },
        
        has : function( key ){
            return this.get( key ) != null;
        },
        
        set : function(key, val, options) {
            var self = this,
                attr, 
                attrs, 
                unset, 
                changes, 
                silent, 
                changing, 
                prev, 
                current;
                
            if (key == null) {
                return this;
            }

            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            options || (options = {});
            
            this._previousAttributes = Chassis.clone( this.attributes );
            
            if (this.idAttribute in attrs) {
                this.id = attrs[this.idAttribute];
            }
            
            Chassis.each(attrs,function(item,key){
                options.unset ?
                    delete self.attributes[ key ] :
                    self.attributes[ key ] = item;
                    
            });
        },
        
        unset : function( attr, options ) {
            return this.set(attr, void 0, Chassis.mixin({}, options, {unset: true}));
        },
                
        clear : function(options) {
            var attrs = {};
            Chassis.each(this.attributes,function(item,key){
                attrs[key] = void 0;
            });
            
            return this.unset(attrs,options);
        },
        
        toJSON : function() {
            return Chassis.clone(this.attributes);
        },
        
        clone : function() {
            return new this.constructor(this.attributes);
        },
        
        escape : function( attr ) {
            return Chassis.escape(this.get(attr));
        },
        
        previous : function( attr ) {
            return (attr == null || !this._previousAttributes) ?
                    null : this._previousAttributes[attr];
        },
        
        previousAttributes : function(){
            return Chassis.clone(this._previousAttributes);
        },
        
        isNew : function(){
            return this.id == null;
        }
        
        
        
        
    });
    

    Model.extend = Chassis.extend;

  
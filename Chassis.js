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
    
    Chassis.object = function(list, values) {
        var result = {};
        
        if (list == null) {
            return result;
        }
        
        Chassis.each(list,function(item,key){
            if (values) {
                result[item] = values[key];
            } else {
                result[item[0]] = item[1];
            }
        });
        
        return result;
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
        
        /**
         *fetch方法获取数据的url。
         *注意这个方法的意思和backbone是有区别的
         *
         * @method url
         * @return 
         **/
        url : function(){
            
        },
        
        /**
         *从模型获取当前属性值，比如：csser.get("title")
         *
         * @method get
         * @return 
         **/
        get : function(key) {
            return this.attributes[ key ];
        },
        
        /**
         *属性值为非 null 或非 undefined 时返回 true
         *
         * @method has
         * @return 
         **/
        has : function( key ){
            return this.get( key ) != null;
        },
        
        /**
         *向模型设置一个或多个散列属性。 如果任何一个属性改变了模型的状态，在不传入 {silent: true} 选项参数的情况下，会触发 "change" 事件。 
         *
         * @method set
         * @return 
         **/
        set : function(key, val, options) {
            var self = this,
                attr, 
                attrs, 
                unset, 
                changes, 
                silent, 
                changing, 
                prev, 
                current,
                validateResult;
                
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
            
            //变更之前先做校验
            validateResult = this.validate.call(this,attrs);
            
            if(validateResult !== true){
                this.trigger('error',validateResult);
                return;
            }
            
            this._previousAttributes = Chassis.clone( this.attributes );
            
            if (this.idAttribute in attrs) {
                this.id = attrs[this.idAttribute];
            }
            
            Chassis.each(attrs,function(item,key){
                options.unset ?
                    delete self.attributes[ key ] :
                    self.attributes[ key ] = item;
                    
            });
            
            self.trigger('change',self);
        },
        
        /**
         *从内部属性散列表中删除指定属性。 如果未设置 silent 选项，会触发 "change" 事件。
         *
         * @method clear
         * @return 
         **/
        unset : function( attr, options ) {
            return this.set(attr, void 0, Chassis.mixin({}, options, {unset: true}));
        },
        
        /**
         *从模型中删除所有属性。 如果未设置 silent 选项，会触发 "change" 事件。
         *
         * @method clear
         * @return 
         **/
        clear : function( options ) {
            var attrs = {};
            Chassis.each(this.attributes,function(item,key){
                attrs[key] = void 0;
            });
            
            return this.unset(attrs,options);
        },
        
        /**
         *返回模型 attributes 副本的 JSON 字符串化形式。 它可用于模型的持久化、序列化，或者传递到视图前的扩充。
         *
         * @method toJSON
         * @return 
         **/
        toJSON : function() {
            return Chassis.clone(this.attributes);
        },
        
        /**
         *返回与模型属性一致的新的实例。
         *
         * @method clone
         * @return 
         **/
        clone : function() {
            return new this.constructor(this.attributes);
        },
        
        /**
         *与 get 类似, 但返回模型属性值的 HTML 转义后的版本。 如果将数据从模型插入 HTML，使用 escape 取数据可以避免 XSS 攻击.
         *
         * @method escape
         * @return 
         **/
        escape : function( attr ) {
            return Chassis.escape(this.get(attr));
        },
        
        /**
         *在 "change" 事件发生的过程中，本方法可被用于获取已改变属性的旧值。
         *
         * @method previous
         * @return 
         **/
        previous : function( attr ) {
            return (attr == null || !this._previousAttributes) ?
                    null : this._previousAttributes[attr];
        },
        
        /**
         *返回模型的上一个属性散列的副本。一般用于获取模型的不同版本之间的区别，或者当发生错误时回滚模型状态。
         *
         * @method previousAttributes
         * @return 
         **/
        previousAttributes : function() {
            return Chassis.clone(this._previousAttributes);
        },
        
        /**
         *模型是否已经保存到服务器。 如果模型尚无 id，则被视为新的。
         *
         * @method isNew
         * @return 
         **/
        isNew : function() {
            return this.id == null;
        },
        
        /**
         *手动获取数据
         *
         * @method fetch
         * @return 
         **/
        fetch : function( options ) {
            var self = this;
            
            
            options = options ? Chassis.clone(options) : {};
            
            $.ajax({
                url : self.url(),
                data : (options.data || {}),
                dataType : 'json',
                success : function(resp){
                    resp = self.parse(resp,options);
                    
                    options.success = options.success || function(){};
                    options.success.call(self);
                    self.set( resp, options );
                },
                error : function(){
                    self.trigger('error');
                }
            });
        },
        
        /**
         *自定义数据解析，建议用自定义的逻辑重载它
         *
         * @method parse
         * @return 
         **/
        parse: function(resp, options) {
            return resp;
        },
        
        /**
         *自定义校验，建议用自定义的逻辑重载它
         *
         * @method validate
         * @return 
         **/
        validate : function(){
            return true;
        },
        
        /**
         *手动触发 "change" 事件。
         *
         * @method change
         * @return 
         **/
        change : function(){
            this.trigger('change');
        }
        
        
        
        
        
        //对服务端做模型操作基本没用，故不做实现
        /*
        ,save : function(){}
        ,destroy : function(){}
        */
        
        
        //可以全局指定，没什么实际意义
        /*
        ,urlRoot : function(){}
        */
        
        //数据变更暂不实现(除非实现数据双向绑定)
        /*
        ,hasChanged : function(){}
        ,changedAttributes : function(){}
        */
        
        
        
        
    });
    

    Model.extend = Chassis.extend;
    
    var Router = Chassis.Router = function( options ) {
        
        options || (options = {});
        
        if( options.routes ) {
            this.routes = options.routes;
        }
        
        this._bindRoutes();
        
        this.initialize.apply(this, arguments);
        
        
    };
    
    Chassis.mixin(Router.prototype, Events, {
        
        initialize : function() {},
        
        route : function(route, name) {
            var self = this,
                callback = self[ name ],
                routeRe = self._routeToRegExp(route),
                keys = routeRe.exec(route).slice(1);
            
            Chassis.each(keys,function(item,key){
                keys[ key ] = item.substring(1);
            });
            
            Chassis.history.route(routeRe,function( fragment ){
            
                var vals,Request;
                
                vals = routeRe.exec( fragment ).slice(1);
                Request = Chassis.object(keys,vals);
                
                self.Request = Request;

                callback.call(self);
            
            });

        },
        
        _bindRoutes : function() {
            var self = this;
            
            Chassis.each(self.routes,function(item,key) {
                self.route(key,item);
            });
            
            return self;
        },
        
        _routeToRegExp : function(route){
            var optionalParam = /\((.*?)\)/g,
                namedParam    = /(\(\?)?:\w+/g,
                splatParam    = /\*\w+/g,
                escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                
            route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
            return new RegExp('^' + route + '$');
        },
        
        navigate : function(fragment, options){
            return Chassis.history.navigate(fragment, options);
        }
        
    });
    
    Router.extend = Chassis.extend;
    
    /////////////////////////////////
    /**
     * @fileOverview history 基类
     */

    var History = Chassis.History = function( handler ) {
        this.handler = handler || [];
    };
    
    Chassis.mixin(History.prototype, Events, {
        
        
        route : function(routeRe, callback){
            this.handler.push({
                reg : routeRe,
                callback : callback
            });
        },
        
        /**
         * 会被重写
         *
         */
        navigate : function(fragment, options, replace) {
            return this;
        },
        
        _triggerHandle : function( fragment ){
            var self = this;
            Chassis.each(self.handler,function(item, key){
                if(!item.reg.test( fragment )){
                    return;
                }

                item.callback.call(self, fragment);
            });
        },
        
        /**
         * 会被重写
         *
         */
        start : function( options ){
            var handler = Chassis.clone( this.handler ),
                type = 'Hash';
            
            options || (options = {});
            
            this.destroy();
            
            if(options.pushState){
                type = 'Pushstate';
            }
            
            if(!History[ type ]){
                throw new Error('History.' + type +' is not found');
                return;
            }
            Chassis.history = new History[ type ](handler);
            return Chassis.history.start(options);
        },
        
        _getHash : function(){
            var match = window.location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },
        
        /**
         * 会被重写
         *
         */
        _setHash : function( fragment ){
            return this;
        },
        
        destroy : function(){
            this.pushState = false;
            this.root = '/';
            this.handler = [];
            this.cacheOptions = null;
            $(window).off('hashchange');
            $(window).off('popstate');
            History.start = false;
            
            //销毁后重新指向原始的History，方便重新调用
            Chassis.history = new History();
        }
    });
    
    
    History.extend = Chassis.extend;
    
    History.Hash = History.extend( {
    /**
     *
     *silent
     *root
     *pushState
     */
    start : function( options ){
        var self = this;
        if(History.start){
            return;
        }
        
        History.start = true;
        
        options || ( options = {});
        
        
        //开始监听hashchange
        if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
            $(window).on('hashchange',function(e){
                self.navigate(self._getHash(),{trigger:true},true);
            });
            
            //处理当前hash
            !options.silent && self.navigate(self._getHash(),{trigger:true},true);   
        }
    },
    navigate : function(fragment, options, replace) {
        var self = this;
        
        options || ( options = {} );

        //如果不是来自onchange监控的事件
        if( !self.pushState && !replace ){
            //缓存当前的配置
            self.cacheOptions = options;
            self._setHash( fragment );
            
            return; //因为后面会自动触发window.onhashchange事件
        }
        
        
        //从非onchange监控的options里获取配置
        if( !self.pushState && !replace ){
            options = self.cacheOptions ? Chassis.clone(self.cacheOptions) : options;
            
        }
        self.cacheOptions = null;
        
        options.trigger && self._triggerHandle.call(self, fragment);

    },
    
    _setHash : function( fragment ){
        

        if(this._getHash() != fragment){
            window.location.hash = '#' + fragment;
                            
        }

        return this;
    }
} );

/**
 * @fileOverview 使用pushstate实现的history
 * @requires Router.History
 */

History.Pushstate = History.extend({
    /**
     *
     *silent
     *root
     *pushState
     */
    start : function( options ){
        var self = this;
        
        
        
        if(History.start){
            return;
        }
        
        History.start = true;
        
        options || ( options = {});
        
        if(options.pushState){
            self.pushState = true;
            if(options.root){
                self.root = options.root;
            }
            
            //当浏览器前进后退时触发
            $(window).on('popstate',function(){
                var fragment = window.location.href.split(/\//).slice(3).join('/').substring( self.root.length );
                
                self._triggerHandle.call(self, fragment);
            });
            
            return;
        }

    },
    navigate : function(fragment, options, replace) {
        var self = this;
        
        options || ( options = {} );
        
        if(self.pushState){
            self._setHash( fragment );
        }
        
        self.cacheOptions = null;
        
        options.trigger && self._triggerHandle.call(self, fragment);

    },
    _setHash : function( fragment ){
        
        if(this.pushState){
            fragment = fragment || this.root;
            history.pushState({}, document.title, fragment);
            return this;
        }
    }
});

History.Pushstate.extend = Chassis.extend;
Chassis.history = new History();

  
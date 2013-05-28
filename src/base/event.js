/**
 * @fileOverview 事件机制
 */

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
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.on("a b c",callback);
     * obj.on({a:callback, b:callback, c:callback},obj);
     */
    on: function( name, callback, context ) {
        var events;
        
        if ( !eventsApi( this, 'on', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        
        if ( !this._events ) {
            this._events = {};
        }
        
        events = this._events[ name ] || (this._events[ name ] = []);
        events.push({
            callback: callback,
            context: context,
            ctx: context || this
        });
        
        return this;
    },

    /**
     * once
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.once("a b c",callback);
     * obj.once({a:callback, b:callback, c:callback},obj);
     */
    once: function( name, callback, context ) {
        var me = this,
            once;
        
        if ( !eventsApi( this, 'once', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        

        once = Chassis._once(function() {
            me.off( name, once );
            callback.apply( me, arguments );
        });
        
        once._callback = callback;

        return this.on( name, once, context );
    },

    /**
     * off
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.off("a b c",callback);
     * obj.off({a:callback, b:callback, c:callback},obj);
     */
    off: function( name, callback, context ) {
        var me = this,
            retain, 
            ev, 
            events, 
            names, 
            i, 
            l, 
            j, 
            k;
            
        if ( !this._events ||
                !eventsApi( this, 'off', name, [ callback, context ] ) ) {
            return this;
        }
        
        if ( !name && !callback && !context ) {
            this._events = {};
            return this;
        }

        names = name ? [ name ] : Chassis.keys( this._events );
        
        Chassis.$.each( names, function( nKey, nItem ) {
            name = nItem;
            events = me._events[ name ];

            if ( events ) {
                me._events[ name ] = retain = [];

                if ( callback || context ) {
                    Chassis.$.each( events, function( eKey, eItem ) {
                        ev = eItem;
                        if ( (callback && callback !== ev.callback &&
                                callback !== ev.callback._callback) ||
                                (context && context !== ev.context) ) {
                            retain.push( ev );
                        }
                    } );
                    
                }
                if ( !retain.length ) {
                    delete me._events[ name ];
                }
            }
        } );
        
        return this;
    },

    /**
     * trigger
     *
     * @param {string} name
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.trigger("a b c");
     */
    trigger: function( name ) {
        var args,
            events,
            allEvents;
        
        if ( !this._events ) {
            return this;
        }
        
        args = [].slice.call( arguments, 1 );
        
        if ( !eventsApi( this, 'trigger', name, args ) ) {
            return this;
        }
        
        events = this._events[ name ];
        allEvents = this._events.all;
        
        if ( events ) {
            triggerEvents( events, args );
        }
        
        if ( allEvents ) {
            triggerEvents( allEvents, arguments );
        }
        
        return this;
    },

    /**
     * stopListening
     *
     * @param {string} name
     * @param {function} callback
     * @param {object} context
     * @example
     * var obj = _.extend({},Chassis.Events);
     * obj.stopListening("a b c",callback);
     */
    stopListening: function( obj, name, callback ) {

        var listeners = this._listeners,
            me = this,
            deleteListener,
            id;
        
        if ( !listeners ) {
            return this;
        }
        
        deleteListener = !name && !callback;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        if ( obj ) {
            (listeners = {})[ obj._listenerId ] = obj;
        }
        
        Chassis.$.each( listeners, function( key, item ) {

            listeners[ key ].off( name, callback, me );
            
            if ( deleteListener ) {
                delete me._listeners[ key ];
            }
        } );
        
        return this;
    }

};

var eventSplitter = /\s+/;

var eventsApi = function( obj, action, name, rest ) {
    var names,
        i,
        l;

    if ( !name ) {
        return true;
    }

    if ( typeof name === 'object' ) {
        Chassis.$.each( name, function( key, item ) {
            obj[ action ].apply( obj, [ key, item ].concat( rest ) );
        } );
        
        return false;
    }

    if ( eventSplitter.test( name ) ) {
        
        names = name.split( eventSplitter );
        
        Chassis.$.each( names, function( key, item ) {
            obj[ action ].apply( obj, [ item ].concat( rest ) );
        } );
        
        return false;
    }

    return true;
};


var triggerEvents = function( events, args ) {

    var l = events.length, 
        a1 = args[ 0 ], 
        a2 = args[ 1 ], 
        a3 = args[ 2 ], 
        i = -1,
        ev;
    
    switch ( args.length ) {
        case 0: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx ); 
            }
            return;
        case 1: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1 ); 
            }
            return;
        case 2: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2 ); 
            }
            return;
        case 3: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2, a3 ); 
            }
            return;
        default: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.apply( ev.ctx, args );
            }
    }
};

var listenMethods = { listenTo: 'on', listenToOnce: 'once' };


Chassis.$.each( listenMethods, function( method, implementation ) {
    Events[ method ] = function( obj, name, callback ) {

        var me = this,
            listeners,
            id;
        
        listeners = this._listeners || (this._listeners = {});
        id = obj._listenerId || (obj._listenerId = Chassis.uniqueId( 'l' ));
        listeners[ id ] = obj;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        obj[ implementation ]( name, callback, this );
        return this;
    };
} );

Events.bind   = Events.on;
Events.unbind = Events.off;

Chassis.mixin( Chassis, Events );
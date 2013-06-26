/* jshint undef:false */

/**
 * @fileOverview 适配underscore接口
 */
(function() {
    var root = this,

        // Establish the object that gets returned to break out of 
        // a loop iteration.
        breaker = {},

        Chassis = require( 'common:libs/backbone/backbone/backbone.js' ),

        // Save bytes in the minified (but not gzipped) version:
        ArrayProto = Array.prototype,
        ObjProto = Object.prototype,

        // Create quick reference variables for speed access to 
        // core prototypes.
        toString         = ObjProto.toString,

        // All **ECMAScript 5** native function implementations that 
        // we hope to use
        // are declared here.
        nativeForEach      = ArrayProto.forEach,
        nativeFilter       = ArrayProto.filter,
        nativeEvery        = ArrayProto.every,
        nativeIndexOf      = ArrayProto.indexOf,

        _ = {},

        each = _.each = function( obj, iterator, context ) {
            var i = 0,
                l = obj.length,
                key;

            if ( obj === null ) {
                return;
            }

            if ( nativeForEach && obj.forEach === nativeForEach ) {
                obj.forEach( iterator, context );
            } else if ( obj.length === +obj.length ) {
                for ( ; i < l; i++ ) {
                    if ( i in obj && iterator.call( 
                            context, obj[ i ], i, obj ) === breaker ) {
                        return;
                    }
                }
            } else {
                for ( key in obj ) {
                    if ( obj.hasOwnProperty( key ) ) {
                        if ( iterator.call( context, obj[ key ], key, obj ) ===
                                breaker ) {
                            return;
                        }
                    }
                }
            }
        };

    _.clone = Chassis.clone;

    // 简化版本（只针对字符串）
    _.unique = function( array ) {
        var map = {},
            result = [];
        each( array, function( item ) {
            if ( !map[ item ] ) {
                map[ item ] = 1;
                result.push( item );
            }
        } );

        return result;
    };

    _.extend = Chassis.mixin;

    // APP中有一处使用了_.union，但是应该是_.unique
    _.union = _.unique;

    _.uniqueId = Chassis.uniqueId;

    _.isFunction = Chassis.isFunction;

    _.bind = Chassis.$.proxy;

    _.include = function( obj, target ) {
        var found = false;

        if ( obj === null ) {
            return found;
        }

        if ( nativeIndexOf && obj.indexOf === nativeIndexOf ) {
            return obj.indexOf( target ) !== -1;
        }

        each( obj, function( item ) {
            if ( item === target ) {
                found = true;
                return breaker;
            }
        } );

        return found;
    };

    _.every = function( obj, iterator, context ) {
        var result = true;

        if ( obj === null ) {
            return result;
        }

        if ( nativeEvery && obj.every === nativeEvery ) {
            return obj.every( iterator, context );
        }

        each( obj, function( value, index, list ) {
            if ( !(result = 
                    result && iterator.call( context, value, index, list )) ) {
                return breaker;
            }
        } );

        return !!result;
    };

    _.isString = function( obj ) {
        return toString.call( obj ) === '[object String]';
    };

    _.find = function( obj, iterator, context ) {
        var result;

        each( obj, function( value, index, list ) {
            if ( iterator.call( context, value, index, list ) ) {
                result = value;
                return breaker;
            }
        } );

        return result;
    };

    _.filter = function( obj, iterator, context ) {
        var results = [];

        if ( obj === null ) {
            return results;
        }

        if ( nativeFilter && obj.filter === nativeFilter ) {
            return obj.filter( iterator, context );
        }

        each( obj, function( value, index, list ) {
            if ( iterator.call( context, value, index, list ) ) {
                results[ results.length ] = value;
            }
        } );

        return results;
    };

    if ( typeof exports !== 'undefined' ) {
        if ( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
})();





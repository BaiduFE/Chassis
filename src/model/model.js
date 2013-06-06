/**
 * @fileOverview Model
 */

/**
 * Model
 * @class Model
 * @namespace __Chassis__
 * @constructor
 * @param {object} attributes
 * @param {object} opts
 */
var Model = Chassis.Model = function( attributes, opts ) {
    var me = this,
        attrs = attributes || {},
        defaults;

    if ( !opts ) {
        opts = {};
    }

    
    me.attributes = {};
    me.cid = Chassis.uniqueId( 'c' );
    
    
    attrs = Chassis.mixin( {}, me.defaults || {}, attrs );
    me.set( attrs, opts );

    me.init.apply( me, arguments );
};

Chassis.mixin( Model.prototype, Events, {
    
	/**
     * 模型的特殊属性
     * > `id` 可以是任意字符串。在属性中设置的 `id` 会被直接拷贝到模型属性上。 
     *
     * @property idAttribute
     * @return 
     **/
    idAttribute : 'id',
    
	/**
	 * 初始化
     * > 当创建模型实例时，可以传入 `属性` 初始值，这些值会被 `set` 到模型。 如果定义了 `init` 函数，该函数会在模型创建后执行。
     *
     * @method init
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
     **/
    init : function() {},
    
    /**
     * fetch方法获取数据的url。
     * > 注意这个方法的意思和backbone是有区别的
     *
     * @method url
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			url : function(){
				return '/path/?title=' + this.get( 'title' );
			}
		} );
		
        var m = new model();
     **/
    url : function() {},
    
    /**
     * 从模型获取当前属性值
     *
     * @method get
     * @param {string} key
     * @return
	 * @example
		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			}
		} );
		
        var m = new model();
        m.get( 'title' );
     **/
    get : function( key ) {
        return this.attributes[ key ];
    },
    
    /**
	 * 模型是否具有某个属性
     * > 属性值为非 null 或非 undefined 时返回 true
     *
     * @method has
     * @param {string} key
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			}
		} );
		
        var m = new model();
		m.has( 'title' );
     **/
    has : function( key ) {
        return this.get( key ) !== null;
    },
    
    /**
     * 向模型设置一个或多个散列属性。
     * > 如果任何一个属性改变了模型的状态，在不传入 `{silent: true}` 选项参数的情况下，
     * > 会触发 `change` 事件。 
     *
     * @method set
     * @param {string} key
     * @param {*} val
     * @param {object} opts
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//model has be changed.
		} );
        m.set( 'title', '' );
		
     **/
    set : function( key, val, opts ) {

        var me = this,
            attr, 
            attrs, 
            unset, 
            changes, 
            silent, 
            changing, 
            prev, 
            current,
            validateResult;
            
        if ( key === null ) {
            return me;
        }

        if ( typeof key === 'object' ) {
            attrs = key;
            opts = val;
        } else {
            (attrs = {})[ key ] = val;
        }
        
        if ( !opts ) {
            opts = {};
        }

        
        // 变更之前先做校验
        validateResult = me.validate.call( me, attrs );
        
        if ( validateResult !== true ) {
            me.trigger( 'error', validateResult );
            return;
        }
        
        me._previousAttributes = Chassis.clone( me.attributes );
        
        if ( me.idAttribute in attrs ) {
            me[ me.idAttribute ] = attrs[ me.idAttribute ];
        }
        
        Chassis.$.each( attrs, function( key, item ) {
            if ( opts.unset ) {
                delete me.attributes[ key ];
            } else {
                me.attributes[ key ] = item;
            }   
        } );
        
		if ( !opts.silent ) {
			me.trigger( 'change', me );
		}
        
    },
    
    /**
     * 从内部属性散列表中删除指定属性。 
	 * > 如果未设置 `silent` 选项，会触发 `change` 事件。
     *
     * @method clear
     * @param {string} attr
     * @param {object} opts
     * @return 
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			}
		} );
		
        var m = new model();
		m.unset( 'title' )
     **/
    unset : function( attr, opts ) {
        return this.set( attr, Chassis.Undefined,
                Chassis.mixin( {}, opts, { unset: true } ) );
    },
    
    /**
     * 从模型中删除所有属性。 
	 * > 如果未设置 `silent` 选项，会触发 `change` 事件。
     *
     * @method clear
     * @param {object} opts
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			}
		} );
		
        var m = new model();
		m.clear();
     **/
    clear : function( opts ) {
        var attrs = {};
        Chassis.$.each( this.attributes, function( key, item ) {
            attrs[ key ] = Chassis.Undefined;
        } );
        
        return this.unset( attrs, opts );
    },
    
    /**
     * 返回模型 `attributes` 副本的 JSON 字符串化形式。 
	 * > 它可用于模型的持久化、序列化，或者传递到视图前的扩充。
     *
     * @method toJSON
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.toJSON();		
     **/
    toJSON : function() {
        return Chassis.clone( this.attributes );
    },
    
    /**
     * 返回与模型属性一致的新的实例。
     *
     * @method clone
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.clone();	
     **/
    clone : function() {
        return new this.constructor( this.attributes );
    },
    
    /**
     * 与 get 类似, 但返回模型属性值的 HTML 转义后的版本。 
     * > 如果将数据从模型插入 HTML，使用 escape 取数据可以避免 XSS 攻击.
     *
     * @method escape
     * @param {string} attr
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.escape( 'title' );		 
     **/
    escape : function( attr ) {
        return Chassis.escape( this.get( attr ) );
    },
    
    /**
     *在 `change` 事件发生的过程中，本方法可被用于获取已改变属性的旧值。
     *
     * @method previous
     * @param {string} attr
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			this.previous( 'title' );
		} );
		
        m.set( 'tile', '' );	 
     **/
    previous : function( attr ) {
        return (attr === null || !this._previousAttributes) ?
                null : this._previousAttributes[ attr ];
    },
    
    /**
     * 返回模型的上一个属性散列的副本。
     * > 一般用于获取模型的不同版本之间的区别，或者当发生错误时回滚模型状态。
     *
     * @method previousAttributes
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			this.previousAttributes( );
		} );
		
        m.set( 'tile', '' );	 
     **/
    previousAttributes : function() {
        return Chassis.clone( this._previousAttributes );
    },
    
    /**
     * 模型是否已经保存到服务器。 
	 * > 如果模型尚无 `id`，则被视为新的。
     *
     * @method isNew
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();

        m.isNew();		 
     **/
    isNew : function() {
        return this.id === null;
    },
    
    /**
     * 手动获取数据
     *
     * @method fetch
     * @param {object} opts
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    fetch : function( opts ) {
        var me = this,
            _opt;
        
        opts = opts ? Chassis.clone( opts ) : {};
        
        opts = Chassis.mixin( {}, {
            dataType : 'json',
            success : function() {}
        }, opts );
        
        _opt = Chassis.mixin( {}, opts, {
            url : me.url(),
            success : function( resp ) {
                resp = me.parse( resp, opts );

                opts.success.call( me );
                me.set( resp, opts );
            },
            error : function() {
                me.trigger( 'error' );
            }
        } );
        
        
        me.sync( _opt );
    },
    
    /**
     * 自定义数据解析，建议用自定义的逻辑重载它
     *
     * @method parse
     * @param {object} resp
     * @param {object} opts
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			},
			parse : function(resp){
				return resp[ 'data' ];
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    parse: function( resp, opts ) {
        return resp;
    },
    
    /**
     * 自定义校验，建议用自定义的逻辑重载它
     *
     * @method validate
     * @return
	 * @example

		var model = __Chassis__.Model.extend( {
			defaults : {
				title : '__Chassis__'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			},
			parse : function(resp){
				return resp[ 'data' ];
			},
			
			validate : function( data ){
				if ( data[ 'title' ] == '' ) {
					return 'title attribute can not be empty;';
				}
				return true;
			}
			
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    validate : function() {
        return true;
    },
    
    /**
     * 手动触发 `change` 事件。
     *
     * @method change
     * @return
     * @private	 
     **/
    change : function() {
        this.trigger( 'change' );
    },
    
    sync : function( opts ) {
        return Chassis.$.ajax.call( this, opts );
    }
    
    
    
    
    
    // 对服务端做模型操作基本没用，故不做实现
    /*
    ,save : function(){}
    ,destroy : function(){}
    */
    
    
    // 可以全局指定，没什么实际意义
    /*
    ,urlRoot : function(){}
    */
    
    // 数据变更暂不实现(除非实现数据双向绑定)
    /*
    ,hasChanged : function(){}
    ,changedAttributes : function(){}
    */
    
} );


Model.extend = Chassis.extend;
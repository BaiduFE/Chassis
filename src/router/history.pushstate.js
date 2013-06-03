/**
 * @fileOverview 使用pushstate实现的history
 * @requires Router.History
 */

/**
 * Pushstate
 * > 用户不需要手动调用，当使用history.start时，会根据传递的参数自动实例化此类并覆盖之前的history实例。
 *
 * > 当用户调用destroy时，history将自动恢复至初始状态。
 * @class Pushstate
 * @namespace __Chassis__.History
 * @constructor
 * @param {object} handler
 * @private
 */
History.Pushstate = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 Pushstate 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        
        if ( opts.root ) {
            me.root = opts.root;
        }
        
        // 当浏览器前进后退时触发
        $( window ).on( 'popstate', function() {
            me._triggerHandle.call( me, me._getFragment() );
        } );
        
        // 处理当前pushState
        if ( opts.trigger ) {
			me._triggerHandle.call( me, me._getHash() );
		}
        
        return;
       

    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts/*, replace*/ ) {
        var me = this;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        
        me._setPushState( fragment );
        
        
        me.cacheOptions = null;
        
        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }
    },
    
    /**
     * 设置pushstate 
     *
     * @private
     * @method _setPushState
     * @param {string} fragment
     * @return 
     **/
    _setPushState : function( fragment ) {

        fragment = fragment || this.root;
        history.pushState( {}, document.title, fragment );
        return this;
        
    },
    
    /**
     * 获取当前的fragment
     *
     * @private
     * @method _getFragment
     * @return 
     **/
    _getFragment : function() {
        
        return window.location.href
                .split( /\// )
                .slice( 3 )
                .join( '/' )
                .substring( this.root.length );
    }
    
    
});

History.Pushstate.extend = Chassis.extend;
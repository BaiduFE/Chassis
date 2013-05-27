/**
 * @fileOverview 使用pushstate实现的history
 * @requires Router.History
 */

History.Pushstate = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} options
     * @return 
     **/
    start : function( options ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !options ) {
            options = {};
        }
        
        
        if ( options.root ) {
            me.root = options.root;
        }
        
        // 当浏览器前进后退时触发
        $( window ).on( 'popstate', function() {
            me._triggerHandle.call( me, me._getFragment() );
        } );
        
        // 处理当前pushState
        if ( !options.silent ) {
            me._triggerHandle.call( me, me._getFragment() );
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
     * @param {object} options
     * @return 
     **/
    navigate : function( fragment, options/*, replace*/ ) {
        var me = this;
        
        if ( !options ) {
            options = {};
        }
        
        
        me._setPushState( fragment );
        
        
        me.cacheOptions = null;
        
        if ( options.trigger ) {
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
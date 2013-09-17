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
        var me = this,
			pathname = window.location.pathname,
			atRoot;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        
        if ( opts.root ) {
            me.root = (opts.root.indexOf( '/' ) === 0) ? 
				opts.root : ('/' + opts.root);
        }
        
		// 注释掉的原因是和backbone保持一致：路由不匹配就不执行
		
		// 如果当前设置的root和URL中的root不同
		// 则重写URL为当前root
		/*
		atRoot = 
			pathname.replace( /[^\/]$/, '$&/' ) === me.root;
		
		if ( !atRoot ) {
			history.replaceState( {}, document.title, me.root );
		}
		*/
		
		me.curFragment = me.getFragment();
		
        // 当浏览器前进后退时触发
        $( window ).on( 'popstate', function() {
			
			if ( me.curFragment === me.getFragment() ) {
				return;
			}
			
			me.curFragment = me.getFragment();
            me.loadUrl.call( me, me.curFragment );
        } );
        
        // 处理当前pushState
        if ( opts.trigger ) {
			me.loadUrl.call( me, me.getFragment() );
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
        
        fragment = this.getFragment( fragment );
        
        this.curFragment = fragment;
		
        me._setPushState( fragment );
        
        
        me.cacheOptions = null;
        
        if ( opts.trigger ) {
            me.loadUrl.call( me, fragment );
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
    _setPushState : function( fragment, replace ) {

        fragment = this.root + fragment;
		
		if ( replace ) {
			history.replaceState( {}, document.title, fragment );
		} else {
			history.pushState( {}, document.title, fragment );
		}
        
        return this;
        
    },
    
    /**
     * 获取当前的fragment
     *
     * @private
     * @method getFragment
     * @return 
     **/
    getFragment : function( fragment ) {
       
        return (fragment !== undefined) ? 
			fragment : 
			window.location.pathname
				.replace( new RegExp( '^' + this.root ), '' );
    }
    
    
});

History.Pushstate.extend = Chassis.extend;
/**
 * @fileOverview 浏览器历史管理
 */

History.Hash = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
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
            opts = {};
        }
        
        // 开始监听hashchange
        if ( ('onhashchange' in window) &&
                ((typeof document.documentMode === 'undefined') ||
                document.documentMode === 8) ) {

            $( window ).on( 'hashchange', function() {
                me.navigate( me._getHash(), { trigger: true }, true );
            } );
            
            // 处理当前hash
            if ( opts.trigger ) {
                me.navigate( me._getHash(), { trigger: true }, true ); 
            }
            
            return;
        }
        
        throw new Error( 'current browser do not suport hashchange event;' );
    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @param {boolean} replace
     * @return 
     **/
    navigate : function( fragment, opts, replace ) {
        var me = this;
        
        if ( !opts ) {
            opts = {};
        }

        // 如果不是来自onchange监控的事件
        if ( !replace ) {

            // 缓存当前的配置
            me.cacheOptions = opts;
            me._setHash( fragment );
            
            // 因为后面会自动触发window.onhashchange事件
            return; 
        }
        
        
        // 从非onchange监控的options里获取配置
        if ( replace && me.cacheOptions ) {
            opts = Chassis.clone( me.cacheOptions );
        }
        me.cacheOptions = null;
        
        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }
        

    },
    
    /**
     * 设置hash 
     *
     * @private
     * @method _setHash
     * @param {string} fragment
     * @return 
     **/
    _setHash : function( fragment ) {

        if ( this._getHash() !== fragment ) {
            window.location.hash = '#' + fragment;              
        }

        return this;
    },
    
    /**
     * 获取hash 
     *
     * @private
     * @method _getHash
     * @return 
     **/
    _getHash : function() {
        var match = window.location.href.match( /#(.*)$/ );
        return match ? match[ 1 ] : '';
    }
});
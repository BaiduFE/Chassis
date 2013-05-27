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
        var self = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !options ) {
            options = {};
        }
        
        if ( options.pushState ) {

            self.pushState = true;

            if ( options.root ) {
                self.root = options.root;
            }
            
            // 当浏览器前进后退时触发
            $( window ).on( 'popstate', function() {
                var fragment = window.location.href.split( /\// ).slice( 3 )
                        .join( '/' ).substring( self.root.length );
                
                self._triggerHandle.call( self, fragment );
            } );
            
            return;
        }

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
        var self = this;
        
        if ( !options ) {
            options = {};
        }
        
        if ( self.pushState ) {
            self._setPushState( fragment );
        }
        
        self.cacheOptions = null;
        
        if ( options.trigger ) {
            self._triggerHandle.call( self, fragment );
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
        
        if ( this.pushState ) {
            fragment = fragment || this.root;
            history.pushState( {}, document.title, fragment );
            return this;
        }
    }
});

History.Pushstate.extend = Chassis.extend;
History.Hash = History.extend( {
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 hashchange 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @return 
     **/
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
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @return 
     **/
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
    
    /**
     * 设置hash 
     *
     * @private
     * @method _setHash
     * @return 
     **/
    _setHash : function( fragment ){
        if(this._getHash() != fragment){
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
    _getHash : function(){
        var match = window.location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    }
    
    
} );
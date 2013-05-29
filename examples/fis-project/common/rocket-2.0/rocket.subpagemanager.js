(function($) {

// @todo: subpage positon retain
rocket.subpagemanager = function(options, subpageManagerView){
    var me = this,
        opt = options || {};

    me._subpageClass = opt.subpageClass || null;
    me.MAX_SUBPAGES = opt.maxSubpages || 3;
    me.subpageTransition = opt.subpageTransition || 'slide';
    me.subpageManagerView = subpageManagerView;

    me._subpages = [];
    me._currentSubpage = null;
    me._previousSubpage = null;

    me.defaultSubpageTransition = 'slide';
}; 

rocket.subpagemanager.prototype = {

    switchSubpage: function(from, to, params){
        var me = this,
            dir = 0;

        dir = me.subpageManagerView.getSubpageSwitchDir
            ? me.subpageManagerView.getSubpageSwitchDir(from, to)
                : me.getSubpageSwitchDir(from, to);

        // console.log([fromFeatureString, toFeatureString, dir].join(' | '));

        $.each(from == to ? [from] : [from, to], function(key, item){
            // item && console.log('subpagebeforechange');
            item && item.onsubpagebeforechange
                 && item.onsubpagebeforechange(params);
        });

        me.doSubpageAnimation(
            from,
            to,
            dir,
            function(){
                // 恢复位置
                // me.enablePositionRestore && to && (to.restorePos(params));
                $.each(from == to ? [from] : [from, to], function(key, item){
                    // item && console.log('subpageafterchange');
                    item && item.onsubpageafterchange
                         && item.onsubpageafterchange(params);
                });

                // 子页面回收
                me.recycleSubpage();
            }
        );

    }

    /**
     * 计算页面切换方向，子类可覆盖，提供自定义方向策略
     * @param {rocket.subview} 起始子页面
     * @param {rocket.subview} 目标子页面
     * @return {integer} 方向参数（含义可扩展）：0-无方向，1-向左，2-向右
     */
    ,getSubpageSwitchDir: function(fromSubpage, toSubpage){
        var me = this,
            dir = 0,
            subpages = me._subpages,
            fromFeatureString = fromSubpage 
                && fromSubpage.getFeatureString() || null,
            toFeatureString = toSubpage 
                && toSubpage.getFeatureString() || null,
            fromIndex = -1, toIndex = -1;
        
        for(var i=0; i<subpages.length; i++){
            if(subpages[i].name == fromFeatureString){
                fromIndex = i;
            }
            if(subpages[i].name == toFeatureString){
                toIndex = i;
            }
        }

        if(fromFeatureString !== null 
            && null !== toFeatureString && fromFeatureString !== toFeatureString){
            if(-1 != fromIndex && -1 != toIndex ){
                dir = fromIndex > toIndex ? 2 : 1;
            }
        }

        return dir;
    }

    /**
     * 选择相应切换动画并执行
     * @param fromView
     * @param toView
     * @param direction
     * @param callback
     */
    ,doSubpageAnimation: function(fromView, toView, direction, callback){

        var animate, me = this;

        // 根据action组合，选择不同切换动画方法
        animate = rocket['pageanimation_' + me.subpageTransition].animate; 

        animate(
            fromView && fromView.el, 
            toView && toView.el, 
            direction,
            callback
        );

    }

    /**
     * 注册子页面
     * @param name 子页面名称，用以唯一标记子页面
     * @param subpage 子页面，rocket.subview实例
     */
    ,registerSubpage: function(name, subpage){
        var me = this;
        if(!me.getSubpage(name)){
            me._subpages.push({
                name: name,
                subpage: subpage
            });
        }
    }

    /**
     * 获取子页面
     * @param name 子页面名称，用以唯一标记子页面
     * @return rocket.subview实例或者undefined
     */
    ,getSubpage: function(name){
        var me = this, 
            p = me._subpages;

        for(var i=0, len=p.length; i<len; i++){
            if(p[i].name == name){
                return p[i].subpage;
            }
        }
        return;
    }

    /**
     * 设置当前子页面 
     */
    ,setCurrentSubpage: function(subpage){
        var me = this;
        if(subpage instanceof rocket.baseview){
            if(subpage != me._currentSubpage){
                me._previousSubpage = me._currentSubpage;
                me._currentSubpage = subpage;
            }
        }
        else{
            throw Error('error in method setCurrentSubpage: '
                + 'subpage is not an instance of rocket.baseview');
        }
    }

    /**
     * 回收子页面
     * @todo: 回收算法求精
     */
    ,recycleSubpage: function(){
        var me = this, 
            p = me._subpages,
            item;

        while(p.length > me.MAX_SUBPAGES){
            item = p.shift();

            // 不回收当前活动子页面
            if(item.subpage == me._currentSubpage){
                me._subpages.push(item); 
            }
            else{
                item.subpage.destroy();
            }
        }

    }

};

})(Zepto);




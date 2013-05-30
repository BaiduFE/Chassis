(function($){

rocket.subview.slide_pageslider = rocket.subview.extend({


    className: 'slide-page-content-pageslider'

    ,events: {
        'click .markdown-slide-navigator-left': 'onnavigatingleft'
        ,'click .markdown-slide-navigator-right': 'onnavigatingright'

    }

    ,template: baidu.template($('#template_slide_news').text())
	

	
    ,init: function(options){
        var me = this;
		
        // 用于页面切换时，避免重复请求数据
        me.isFirstLoad = true;

        me.title = options.title;
        me.sliderIndex = options.sliderindex - 0;

        // 从跨页面model获取数据
        me.sectionCount = 0;
        me.section = null; 
        me.fetchSectionData();
		
		me.registerEvents();
		
        me.render();
    }

    ,render: function(){
        var me = this,
            section = me.section;

        if(section){

            me.$el.html(me.template({
                type: section[0].type == 'docinfo' ? 'cover' : 'main' 
                ,section: me.section
            }));
			
			
        }
        else{
            // @note: 直接跳走
            setTimeout(function(){
                rocket.history.navigate([
                    '#outline/'
                    ,encodeURIComponent(me.title)
                ].join(''));
            }, 1000);
            
        }

        me.el.setAttribute('data-feature', me.featureString);

        me.hideLoading();
		me.$el.show();
        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.root;

        me.$el.on('swipeDown', function(e){
            me.gooutlinepage();
        });

        me.$el.on('swipeLeft', function(e){
            me.gonext();
        });

        me.$el.on('swipeRight', function(e){
            me.goprev();
        });

        ec.on('keydown', me.onkeydown, me);

        ec.on('goup', me.gooutlinepage, me);
        ec.on('goprev', me.ongoprev, me);
        ec.on('gonext', me.ongonext, me);
        ec.on('increaseimagesize', me.onincreaseimagesize, me);
        ec.on('decreaseimagesize', me.ondecreaseimagesize, me);
    }



    
	,onBeforeSwitchIn: function(params){
		var me = this;

        if(!me.section){
			me.fetchSectionData();
			me.render();
		} 
		me.$el.show();
    }
	
	,onAfterSwitchIn: function(params){
        var me = this;
		me.$el.show();
    }
    

    ,fetchSectionData: function(){
        var me = this,
            instance 
                = rocket.model.outline_sections
                    .getInstance(me.title);
    
        me.section = instance 
            ? instance.getSection(me.sliderIndex)
                : null;

        me.sectionCount = instance
            ? instance.getSectionCount()
                : 0;
    }

    ,onnavigatingleft: function(e){
        this.goprev();
    }

    ,onnavigatingright: function(e){
        this.gonext();
    }

    ,onkeydown: function(params){
        var me = this,
            target = params.target,
            key = params.key,
            shiftKey = params.shiftKey,
            ctrlKey = params.ctrlKey;
        
        // @note: 仅当活动子页面才响应
        if(me == target 
            && me.root.isActive()){
            switch(key){
                // 'left arrow' key
                case 37:
                    me.goprev();
                    break;
                // 'right arrow' key
                case 39:
                    me.gonext();
                    break;
                // 'up arrow' key
                case 38:
                    me.gooutlinepage();
                    break;
                // '[' key
                case 219:
                    me.decreaseImageSize();
                    break;
                // ']' key
                case 221:
                    me.increaseImageSize();
                    break;
            }
        }
    }

    ,ongoprev: function(params){
        var me = this,
            target = params.target;
        
        // @note: 仅当活动子页面才响应
        if(me == target 
            && me.root.$el.css('display') == 'block'){
            me.goprev();
        }
    }

    ,ongonext: function(params){
        var me = this,
            target = params.target;
        
        // @note: 仅当活动子页面才响应
        if(me == target 
            && me.root.$el.css('display') == 'block'){
            me.gonext();
        }
    }

    ,onincreaseimagesize: function(params){
        var me = this,
            target = params.target;
        
        if(me == target 
            && me.root.$el.css('display') == 'block'){
            me.increaseImageSize();
        }
    }

    ,ondecreaseimagesize: function(params){
        var me = this,
            target = params.target;
        
        if(me == target 
            && me.root.$el.css('display') == 'block'){
            me.decreaseImageSize();
        }
    }

    ,goprev: function(){
        var me = this,
            prev = me.sliderIndex - 1;

        prev = 
            prev < 1 ? 1 : prev; 

        rocket.history.navigate(
            '#slide'
            + '/' + encodeURIComponent(me.title)
            + '/' + prev
            , {trigger: true}
        );

    }

    ,gonext: function(){
        var me = this,
            next = me.sliderIndex + 1;

        next = 
            next > me.sectionCount ?
                me.sliderIndex
                : next; 

        rocket.history.navigate(
            '#slide'
            + '/' + encodeURIComponent(me.title)
            + '/' + next
            , {trigger: true}
        );
    }

    ,gooutlinepage: function(){
        var me = this;
        
        rocket.history.navigate(
            '#outline'
            + '/' + encodeURIComponent(me.title)
            , {trigger: true}
        );
    }

    ,decreaseImageSize: function(){
        var me = this;

        $.each(me.$('img'), function(index, item){
            var width = parseInt($(item).css('width')) - 50;

            // console.log('decrease width to ' + width);        
            $(item).css('width', width + 'px');
        });
    }

    ,increaseImageSize: function(){
        var me = this;

        $.each(me.$('img'), function(index, item){
            var width = parseInt($(item).css('width')) + 50;

            // console.log('increase width to ' + width);        
            $(item).css('width', width + 'px');
        });
    }

});

})(Zepto);

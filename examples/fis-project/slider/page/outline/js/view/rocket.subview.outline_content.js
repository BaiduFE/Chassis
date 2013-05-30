(function($){

rocket.subview.outline_content = rocket.subview.extend({

    el: '#outline_page_content'

    ,events: {
		'change model': 'onModelChange',
        'click .outline-page-content-relayoutbtn': 'relayout'
    }

    ,init: function(options){
        var me = this;
		
        // @note: 标识是否第一次加载，避免后续多次加载
        me.isFirstLoad = true;

        me.model = new rocket.model.outline_sections(
            null
            ,$.extend({}, options)
        );

        me.title = options.title
            || 'ROCKET框架介绍';

        me.maxZIndex = 1000;

        // 显示页面loading
        me.showLoading(me.$el);
		
		me.registerEvents();
    }

    // @note: 若不涉及回收，可以不提供unregisterEvents
    ,registerEvents: function(){
        var me = this, ec = me.root;


        

        ec.on('keydown', me.onkeydown, me);

        me.$el.on('swipeUp', function(e){
            me.goslide();
        });

        me.$el.on('swipeDown', function(e){
            me.relayout('random');
        });

        ec.on('sidenav:relayout', me.relayout, me);
        ec.on('sidenav:down', me.goslide, me);
    }

    ,onModelChange: function(){
        var me = this,
            sections = me.model.getSections();

        for(var i=0; i<sections.length; i++){
            me.append(new rocket.subview.outline_content_tile(
                $.extend({}, me.options, {
                    sectionIndex: i+1
                })
                ,me
            ));
        }
		
		me.$el.show();
		
        me.root.trigger('dataready', sections);

        me.relayout('random');

        me.hideLoading();
    }

    , onBeforePageIn : function(){
		
		if( !this.model.fetched ) {
            this.model.fetch();
            this.model.fetched = true;;
        }
	}
	


    ,onkeydown: function(params){
        var me = this,
            key = params.key;

        switch(key){
            // 'up arrow' key
            case 38:
                me.relayout('random');
                break;
            // 'down arrow' key
            case 40:
                me.goslide();
                break;
        }
    }

    ,goslide: function(){
        var me = this;
        rocket.history.navigate(
            '#slide'
            + '/' + encodeURIComponent(me.title)
            + '/1'  
            , {trigger: true}
        );
    }

    ,relayout: function(type){
        var me = this,
            type = type || 'random';

        me['relayout_' + type]();
    }

    ,getLayoutRanges: function(){
        var me = this,
            tiles = me.$('.outline-page-content-tile'),
            cw = me.$el.width(),
            ch = me.$el.height(),
            w = tiles.width(),
            h = tiles.height(),
            nx = Math.floor(cw/w),
            ny = Math.floor(ch/h),
            ranges = [], k;

        for(var i=0; i<ny; i++){
            for(var j=0; j<nx; j++){
                ranges.push({
                    ystart:i*(h+20)+30, 
                    yend:(i+1)*(h+20)+30, 
                    xstart:j*(w+20)+30, 
                    xend:(j+1)*(w+20)+30
                });
            }
        }

        return ranges;
    }

    ,relayout_grid: function(){
        var me = this,
            tiles = me.$('.outline-page-content-tile'),
            ranges = me.getLayoutRanges(),
            k;

        k = ranges.length;
        
        $.each(tiles, function(index, item){
            var range = ranges[index%k]; 
            $(item).css(
                me._gridStyle(range) 
            );  
        });
    }

    ,relayout_random: function(){
        var me = this,
            tiles = me.$('.outline-page-content-tile'),
            ranges = me.getLayoutRanges(),
            k;

        k = ranges.length;
        
        $.each(tiles, function(index, item){
            var range = ranges[index%k]; 
            $(item).css(
                me._randomStyle(range) 
            );  
        });
    }

    ,_gridStyle: function(range){
        var me = this;
        return {
            top: range.ystart + 'px'
            ,left: range.xstart + 'px'
            // ,'-webkit-transform': 'rotate(' + me._getRandomValue(-45, 45) + 'deg)'
        }; 
    }

    ,_randomStyle: function(range){
        var me = this;
        return {
            top: me._getRandomValue(range.ystart, range.yend) + 'px'
            ,left: me._getRandomValue(range.xstart, range.xend) + 'px'
            ,'-webkit-transform': 'rotate(' + me._getRandomValue(-45, 45) + 'deg)'
        }; 
    }

    ,_getRandomValue: function(min, max){
        var span, tmp;

        if(min > max){
            tmp = max;
            max = min;
            min = tmp;
        }
        span = max - min;

        return Math.floor(span * Math.random()) + min;
    }

});

})(Zepto);

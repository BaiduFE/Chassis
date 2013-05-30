(function($){

rocket.subview.outline_content_tile = rocket.subview.extend({

    className: 'outline-page-content-tile'

    ,template: baidu.template($('#template_outline_section').text())

    ,events: {
		'change model': 'onModelChange',
        'click .outline-page-content-tile-gobtn': 'ontilegobtnclick'

        // touch dragging
        ,'touchstart': 'ontiletouchstart'
        ,'touchmove': 'ontiletouchmove'
        ,'touchend': 'ontiletouchend'

        // mouse dragging
        ,'mousedown': 'ontilemousedown'
    }

    ,init: function(options){
        var me = this;

        me.title = options.title
            || 'ROCKET框架介绍';
        me.sectionIndex = options.sectionIndex;
        
		me.root.on('dataready', me.onModelChange, me);
    }

    

    ,onModelChange: function(sections){
        var me = this;

        me.$el.append(me.template({
            sectionIndex: me.sectionIndex
            ,sectionData: sections[me.sectionIndex - 1] 
        }));
        me.$el.data('index', me.sectionIndex);

        // @note: 密集DOM操作，展现操作可能需要延时才能保证被执行
        // setTimeout(function(){
            me.$el.show();
        // }, 0);
    }

    , onBeforePageIn : function(){
		
		
	}

    ,ontilegobtnclick: function(e){
        var me = this,
            tile = $(e.target).closest('.outline-page-content-tile'),
            sliderIndex = tile.data('index');
       
        // tile.css('z-index', me.maxZIndex++); 
        rocket.history.navigate(
            '#slide'
                + '/' + encodeURIComponent(me.title)
                + '/' + sliderIndex 
            ,{trigger:true}
        );
    }

    ,ontiletouchstart: function(e){
        var me = this,
            touch = e.targetTouches[0],
            tile = $(e.target).closest('.outline-page-content-tile');

        me.draggingTile = tile;

        me.tilePos = {
           pageX: touch.pageX 
           ,pageY: touch.pageY 
        };
    }

    ,ontiletouchmove: function(e){
        var me = this,
            touch = e.targetTouches[0],
            tile = $(e.target).closest('.outline-page-content-tile'),
            transform = tile.css('-webkit-transform');

        e.preventDefault();
        e.stopPropagation();

        transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');

        tile.css(
            '-webkit-transform',
            'translate(' + (touch.pageX - me.tilePos.pageX) + 'px,'
                + (touch.pageY - me.tilePos.pageY) + 'px) '
                + transform
        );
    }

    ,ontiletouchend: function(e){
        var me = this,
            touch = e.changedTouches[0],
            tile = me.draggingTile,
            top = parseInt(tile.css('top')),
            left = parseInt(tile.css('left')),
            transform = tile.css('-webkit-transform');

        transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');

        /*
         * @note: touch方式不需要恢复，和mouse的区别
         */
        tile.css({
            top: top + (touch.pageY - me.tilePos.pageY) + 'px' 
            ,left: left + (touch.pageX - me.tilePos.pageX) + 'px' 
            ,'-webkit-transform':transform
        });
    }


    ,ontilemousedown: function(e){
        var me = this,
            tile = $(e.target).closest('.outline-page-content-tile'),
            startX = e.pageX,
            startY = e.pageY;

        $(document).on('mousemove', function(e){
            var transform = tile.css('-webkit-transform');

            e.preventDefault();
            transform = transform.replace(/translate\([^\)]+\)\s*/g, '');
            tile.css(
                '-webkit-transform',
                'translate(' + (e.pageX - startX) + 'px,'
                    + (e.pageY - startY) + 'px) '
                    + transform
            );
        });

        $(document).on('mouseup', function(e){
            var top = parseInt(tile.css('top')),
                left = parseInt(tile.css('left')),
                transform = tile.css('-webkit-transform');

            transform = transform.replace(/translate\([^\)]+\)\s*/gi, '');
            tile.css({
                top: top + (e.pageY - startY) 
                ,left: left + (e.pageX - startX) 
                ,'-webkit-transform':transform
            });

            // 卸载事件监听
            $(document).off('mousemove mouseup');
        });

    }

});

})(Zepto);

/*jshint camelcase:false,undef:false*/
/**
 * @fileOverview Panel组件基类
 */
UI.GMUSliderView = SliderView.extend({
    createWidget: function( options ) {
        var widget = $.ui.slider( this.$el, {
            autoPlay: false,
            showArr: options.showNavi !== false,
            showDot: options.showIndicator !== false,
            content: options.data
        } );

        return widget;
    },
    prev: function() {
        this.widget.pre.apply( this.widget, arguments );
    },
    next: function() {
        this.widget.next.apply( this.widget, arguments );
    },
    stop: function() {
        this.widget.stop.apply( this.widget, arguments );
    },
    resume: function() {
        this.widget.resume.apply( this.widget, arguments );
    }
});
/*jshint camelcase:false,undef:false*/

/**
 * @fileOverview GMU Panel实现
 */
UI.GMUPanelView = PanelView.extend({
    createWidget: function( options ) {
        return $.ui.panel( this.$el, options );
    },
    show: function() {
        this.widget.open.apply( this.widget, arguments );
    },
    hide: function() {
        this.widget.close.apply( this.widget, arguments );
    },
    toggle: function() {
        this.widget.toggle.apply( this.widget, arguments );
    },
    state: function() {
        this.widget.state.apply( this.widget, arguments );
    },
    destroy: function() {
        this.widget.destroy.apply( this.widget, arguments );
    }
});
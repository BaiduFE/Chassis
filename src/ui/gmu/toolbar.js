/*jshint camelcase:false,undef:false*/

/**
 * @fileOverview GMU Toolbar实现
 */
UI.GMUToolbarView = ToolbarView.extend({
    createWidget: function( options ) {
        return $.ui.toolbar( this.$el, options );
    },
    addButtons: function() {
        this.widget.addBtns.apply( this.widget, arguments );
    },
    show: function() {
        this.widget.show.apply( this.widget, arguments );
    },
    hide: function() {
        this.widget.hide.apply( this.widget, arguments );
    },
    toggle: function() {
        this.widget.toggle.apply( this.widget, arguments );
    }
});
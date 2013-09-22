/*jshint camelcase:false,undef:false*/
/**
 * @fileOverview Toolbar组件基类
 */
var ToolbarView = UI.ToolbarView = WidgetView.extend({
    protocol: {
        methods: [ 
            'addBtns', 'show', 'hide', 'toggle' ],
        
        events: [ 
            'show',
            'hide',
            'ready', 
            'destroy' ],

        options: [ 
            'container', 
            'title', 
            'leftBtns', 
            'rightBtns', 
            'fixed' ]
    }
});
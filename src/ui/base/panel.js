/*jshint camelcase:false,undef:false*/
/**
 * @fileOverview Panel组件基类
 */
var PanelView = UI.PanelView = WidgetView.extend({
    protocol: {
        methods: [ 'open', 'close', 'toggle', 'state', 'destroy' ],
        
        events: [ 
            'ready', 
            'beforeopen', 
            'open', 
            'beforeclose', 
            'close', 
            'destroy'
        ],

        options: [ 'contentWrap', 'display', 'position' ]
    }
});
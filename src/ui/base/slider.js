/*jshint camelcase:false,undef:false*/
/**
 * @fileOverview Slider组件基类
 */
var SliderView = UI.SliderView = WidgetView.extend({
    protocol: {
        methods: [ 'prev', 'next', 'stop', 'resume' ],
        events: [ 'init', 'slide', 'slideend', 'destroy' ],
        options: [ 'data', 'showNavi', 'showIndicator' ]
    }
});
$(document).ready(function() {

    module('Chassis.View.Plugin', {

        setup: function() {
        }

    });

    asyncTest( 'widgetview delegateEvents', 3, function() {
        var counter = 0;
        var Router = Chassis.Router.extend( {
            routes: [ 'widgetview' ]
        } );

        Chassis.PageView.define( 'widgetview', {
            el: '#testElement',
            init: function(){

                this.slider = new Chassis.UI.GMUSliderView( {
                    id: 'mySlider',
                    model: {
                        ui: {
                            data: [{
                                title: 'test',
                                pic: 'about:blank',
                                href: 'http://www.baidu.com'
                            }]
                        }
                    }
                }, this );

                this.append( this.slider );

                equal( this.slider.$el[0].id, 'mySlider' );

            },
            events: {
                'init widget#mySlider': 'assert',
                'slide widget#mySlider': 'doCounter'
            },
            assert: function() {
                ok( true );
                this.slider.widget.trigger( 'slide' );

                equal( counter, 1 );
            },
            doCounter: function(){
                counter++;
            }
        });

        new Router();

        Chassis.history.start();

        Chassis.history.navigate( 'widgetview' );
        Chassis.history.navigate( '', { trigger: false } );
        Chassis.history.destroy();

        start();
    });

});

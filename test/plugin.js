$(document).ready(function() {

    Chassis.View.Plugin.add( 'testPlugin', {
        inject: {
            setElement: function( $el, delegate ) {
                var valid = false,
                    value = $el;

                // 修改id为test2
                if ( $el && $el[ 0 ] && $el[ 0 ].id === 'injecttest1' ) {
                    $el[ 0 ].id = 'injecttest2';
                    valid = true;
                }

                return {
                    valid: valid,
                    value: value
                };
            },
            delegateEvents: function( eventName, selector, method ) {
                var valid = false,
                    value = true;

                // selector为#testDelegate1的事件将不会被监听
                if ( selector === '#testDelegate1' ) {
                    valid = true;
                    value = false;
                }

                return {
                    valid: valid,
                    value: value
                };
            }
        },
        proto: {
            getId: function() {
                return this.$el[ 0 ].id;
            }
        }
    } );

    module('Chassis.View.Plugin', {

        setup: function() {
        }

    });

    asyncTest( 'plugin inject setElement', 2, function() {
        var view1 = new Chassis.View( {
            id: 'injecttest1'
        } );

        strictEqual( view1.$el[ 0 ].id, 'injecttest2');

        var view2 = new Chassis.View( {
            id: 'test3'
        } );

        strictEqual( view2.$el[ 0 ].id, 'test3');
        
        start();
    });
  
    asyncTest( 'plugin inject delegateEvents', 1, function() {
        var counter = 0;
        var PageView = Chassis.PageView.extend({
            doCounter: function(){
                counter++;
            }
        });

        var action = 'home';

        var view = new PageView({
            id: 'pageview',
            el: '<div><span id="testDelegate1"></span><span id="testDelegate2"></span></div>',
            events: {
                'click #testDelegate1': 'doCounter',
                'click #testDelegate2': 'doCounter'
            }
        }, action);

        $( '#testElement' ).append( view.$el );


        view.$el.find( '#testDelegate1' ).trigger( 'click' );
        view.$el.find( '#testDelegate2' ).trigger( 'click' );

        equal(counter,1);
        
        start();
    });

    asyncTest( 'plugin inject proto method', 2, function() {
        var view = new Chassis.View( {
            id: 'injecttest4'
        } );

        strictEqual( view.getId(), 'injecttest4');

        var PageView = Chassis.PageView.extend({
            myId: function(){
                return this.getId();
            }
        });

        var view1 = new PageView( {
            id: 'injecttest5'
        } );

        strictEqual( view1.myId(), 'injecttest5' );
        
        start();
    });

});

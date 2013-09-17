    Chassis.PageView['async2'] = Chassis.PageView.extend( {
        init: function( options ) {

            var me = this,opt;
            
            opt = $.extend({}, options);
            
            me.setup( 'async2_header',  opt );
            me.setup( 'async2_content', opt );
            
            me._asyncSubViewCounter = 2;
            
            me.on( 'subViewLoaded',    this._onSubViewLoaded );
            me.on( 'allSubViewLoaded', this._onAllSubViewLoaded );
            
			me.renderAsyncSubView();
            ok( true );

        },
      
        _onSubViewLoaded : function(){
            var me = this;
                me._asyncSubViewCounter--;

            if ( me._asyncSubViewCounter == 0 ) {
                me.trigger( 'allSubViewLoaded' );
            }
        },
      
        _onAllSubViewLoaded : function(){

            Chassis.history.navigate( '#',{trigger:false} );
            Chassis.history.destroy();
            
            start();
        }
      
      
    } );
    
    // 需要一个allLoadComplete
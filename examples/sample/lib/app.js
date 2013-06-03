//创建Router
var Router = {
    
    routes : [

        'info/:id'
    ]

};



/*INDEX*/
var IndexModel = Chassis.Model.extend( {

    url : function() {
        return 'lib/albums.php';
    },
    
    parse : function(resp) {
        return resp.plaze_album_list.RM.album_list;
    }
} );

Chassis.PageView.index = Chassis.PageView.extend( {

    el: '#list',

    events: {
          'change model'    : 'onModelChange'
        , 'error model'     : 'onModelError'
		, 'click span.link' : 'gotoInfo'
    },

    init: function( opts ) {
        this.model = new IndexModel;
    },

    onBeforePageIn: function() {
        if( !this.model.fetched ) {
            this.model.fetch();
            this.model.fetched = true;;
        }
    },

    onModelChange: function() {
        this.$el.html( 
            baidu.template( $( '#albumlist' ).html(), 
                this.model.toJSON() )
        );
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    },
	
	gotoInfo : function(e){
		Chassis.history.navigate( 'info/' + $(e.target).attr('data-id') );
	}
} );

/*INFO*/
var InfoModel = Chassis.Model.extend( {
    url : function(){
        return 'lib/info.php';
    },
    
    parse : function(resp){
        return resp;
    }
} );

Chassis.PageView.info = Chassis.PageView.extend({

    el: '#info',

    events: {
          'change model'  : 'onModelChange'
        , 'error model'   : 'onModelError'
		, 'click .goback' : 'goBack'
    },

    init: function( opts ) {
        this.model = new InfoModel;
    },

    onBeforePageIn: function( e ) {
        this.$el.html( '' );

        this.model.fetch({
            data : {
                id : e.params.id
            }
        });
    },

    onModelChange: function() {
		var me = this;
        this.$el.html( 
            baidu.template( $( '#albuminfo' ).html(), 
                this.model.toJSON() )
        );
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    },
	
	goBack : function( e ){
		Chassis.history.navigate( '' );
		
		return false;
	}
} );



Chassis.history.start( {router:Router} );



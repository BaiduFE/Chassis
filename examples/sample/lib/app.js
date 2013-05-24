//创建Router
var Router = Chassis.Router.extend({
    
    routes : {
        '' : 'home',
        'info/:id'  : 'info'
    },

    pageOrder: [ 'home', 'info' ]

    
});

var router = new Router;

/*HOME*/
var HomeModel = Chassis.Model.extend({

    init: function(attributes, options) {

    },
    
    url : function(){
        return 'lib/albums.php';
    },
    
    parse : function(resp){
        return resp.plaze_album_list.RM.album_list;
    }
});

Chassis.PageView.home = Chassis.PageView.extend({

    el: '#list',

    events: {
        'change model': 'onModelChange',
        'error model': 'onModelError'
    },

    init: function( opts ) {
        this.model = new HomeModel;
    },

    onBeforePageIn: function() {
        if( !this.model.fetched ) {
            this.model.fetch();
            this.model.fetched = true;;
        }
    },

    onModelChange: function() {
        this.$el.html( 
            baidu.template( $( '#albumlist' ).html(), this.model.toJSON() ));
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    }
});

/*INFO*/
var InfoModel = Chassis.Model.extend({

    init: function(attributes, options) {

    },
    
    url : function(){
        return 'lib/info.php';
    },
    
    parse : function(resp){
        return resp;
    }
});

Chassis.PageView.info = Chassis.PageView.extend({

    el: '#info',

    events: {
        'change model': 'onModelChange',
        'error model': 'onModelError'
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
        this.$el.html( 
            baidu.template( $( '#albuminfo' ).html(), this.model.toJSON() ));
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    }
});

Chassis.history.start();


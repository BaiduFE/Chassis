Chassis.PageView.index = Chassis.PageView.extend( {

    el: '#list',

    events: {
          'change model'    : 'onModelChange'
        , 'error model'     : 'onModelError'
		, 'click a.info' : 'gotoInfo'
		, 'click .more' : 'more'
    },

    init: function( opts ) {
        this.model = new IndexModel;
		this.root.on('index:reload',this.reload);
		this.showLoading();
    },

    onBeforePageIn: function() {
		if(this.firstLoad){
			return;
		}
		
		this.firstLoad = true;
        this.model.fetch();
    },
	
	onAfterPageIn : function(){
		this.$el.show();
		this.hideLoading();
	},

    onModelChange: function() {
		if( this.model.get('totalPage') <= this.model.get('page') ){
			this.$el.find('.more').hide();
		}
		if(this.$el.find('ul').length){
			this.$el.find( 'ul' ).append( 
				baidu.template( $( '#listtplitem' ).html(), 
					this.model.toJSON() )
			);
		}else{
			this.$el.html( 
				baidu.template( $( '#listtpl' ).html(), 
					this.model.toJSON() )
			);
		}
        
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    },
	
	gotoInfo : function(e){
		Chassis.history.navigate( 'info/' + $(e.target).attr('data-id') );
	},
	
	more : function(e){
		this.model.set( 'page',this.model.get('page') + 1,{silent:true} );
		this.model.fetch();
		
	},
	
	reload : function(){
		console.log( '#######' );
		this.model.set( 'page',1,{silent:true} );
		this.model.fetch();
	}
} );

var Router = {
    
    routes : [
        'info/:id',
		'submit'
    ]

};
var IndexModel = Chassis.Model.extend( {
	
	defaults : {
		page : 1
	},
	
    url : function() {
        return '/?m=Index&a=recordlist&page=' + this.get('page');
    },
    
    parse : function(resp) {
        return resp;
    }
} );

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

var InfoModel = Chassis.Model.extend( {

    url : function() {
        return '/?m=Index&a=recordinfo';
    },
    
    parse : function(resp) {
        return resp;
    }
} );

Chassis.SubView.info_content_info = Chassis.SubView.extend( {
	className: 'infoItem',
	events: {
		  'change model'    : 'onModelChange',
          'error model'     : 'onModelError',
		  'click .submit'   : 'submit'
    },

    init: function( opts ) {
		this.id = opts.id;
        this.model = new InfoModel;
		
		
    },

    onBeforeSwitchIn: function( arg ) {
		var me = this;
		this.showLoading();
        this.model.fetch({
			data : {
				id : me.id
			}
		});
    },
	
	onAfterSwitchIn: function() {
		this.hideLoading();
		this.$el.show();
    },

    onModelChange: function() {
		
		this.$el.html( 
            baidu.template( $( '#commentTpl' ).html(), 
                this.model.toJSON() )
        );
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    },
	
	submit : function(e){
		var me = this, content = me.$el.find( 'textarea[name=content]' ).val();
		

		$.ajax({
			url : '/?m=Index&a=addrecordcomment',
			type : 'POST',
			data : $.param({
				id : me.id,
				content : content
			}),
			dataType : 'json',
			
			success : function( resp ){
				me.$el.html( 
					baidu.template( $( '#submitSuccessTpl' ).html(), 
						{} )
				);
			},
			
			error : function(){
			
			}
		});
		
	}

});

Chassis.SubView.info_content = Chassis.SubView.extend( {
	el: '#info-content',

    init: function( opts ) {
		var me = this;
		
		me.spm = new Chassis.SubPageMgr({
          owner: me,
          max: 15,
          klass: Chassis.SubView.info_content_info
        });
		
    },

    onBeforePageIn: function( arg ) {
    },
	
	onAfterPageIn: function() {
		this.$el.show();
    }
});

Chassis.PageView.info = Chassis.PageView.extend( {
	el: '#info',

    init: function( opts ) {
		var me = this;
        me.setup(new Chassis.SubView.info_content(
            Chassis.mixin({}, opts), 
            me
        ));
    },

	onAfterPageIn : function(){
		this.$el.show();
	}
});


Chassis.PageView.submit = Chassis.PageView.extend( {
	el: '#submitElement',
	events: {
          'click .submit' : 'submit',
		  'click .goBack' : 'goBack',
		  'click .resetSubmit' : 'reset'
    },

    init: function( opts ) {
        
    },

    onBeforePageIn: function() {
		
		return;
    },
	
	onAfterPageIn: function() {
	
		if(!Config.haslogin){
			this.$el.html( 
				baidu.template( $( '#loginTip' ).html(), 
					{} )
			);
			
			return;
		}
		
		this.$el.html( 
            baidu.template( $( '#submitTpl' ).html(), 
                {} )
        );
    },
	
    onModelChange: function() {
		return;
    },

    onModelError: function() {
        this.$el.html( 'something is wrong' );
    },
	
	submit : function(){
		var me = this,title,url;
		
		title = this.$el.find('input[name=title]').val();
		url = this.$el.find('input[name=url]').val();
		
		$.ajax({
			url : '/?m=Index&a=addrecord',
			type : 'POST',
			data : $.param({
				title : title,
				url : url
			}),
			dataType : 'json',
			
			success : function( resp ){
				me.$el.html( 
					baidu.template( $( '#submitSuccessTpl' ).html(), 
						{} )
				);
			},
			
			error : function(){
			
			}
		});
		
	},
	
	goBack : function(){
		console.log(this.root);
		this.root.trigger('index:reload' );
		Chassis.history.navigate( '' );
	},
	
	reset : function(){
		this.$el.html( 
            baidu.template( $( '#submitTpl' ).html(), 
                {} )
        );
	}

});

Chassis.GlobalView.top = Chassis.GlobalView.extend({

    el: '#globalview-top',

    events: {
		 'click #home' : 'gotoHome'
		, 'click #submit' : 'gotoSubmit'
    },

    init: function( opts ) {
		var me = this,ec = me.root;
		ec.on('routechange', me.onRouteChange, me);
    },

    onBeforePageIn: function() {

    },
	
	onRouteChange : function( args ){
		this._currentAction = args.to.action;
	},
	
	gotoHome : function(e){
		
		if(this._currentAction == ''){
			return;
		}
		Chassis.history.navigate( '' );
	},
	
	gotoSubmit : function(e){
		if(this._currentAction == 'submit'){
			return;
		}
		Chassis.history.navigate( 'submit' );
	}
});
Chassis.View.Loading.setup('.wrapper .global-loading','.wrapper .page-loading');

Router = Chassis.Router.extend( Router );

var router = new Router();

new Chassis.GlobalView.top({}, router);

Chassis.history.start( {
	pushState : true,
	root : '/'
} );
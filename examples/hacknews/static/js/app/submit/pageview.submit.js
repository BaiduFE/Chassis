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

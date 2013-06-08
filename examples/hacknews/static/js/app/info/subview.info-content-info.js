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

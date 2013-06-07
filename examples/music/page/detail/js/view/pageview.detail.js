Chassis.PageView.define( 'detail', {
    // 设置PageView所在的DOM
    el: '#album-detail',

    // 配置事件
    events: {
        // 监听model change
        'change model': 'onModelChange',
        // 监听model error
        'error model': 'onModelError',
        // expand
        'click .expand': 'onExpand'
    },

    init: function( opts ) {
        this.model = Chassis.Model.create( 'detail' );
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function( e ) {

        this.$el.html( '' );

        this.showLoading();

        // 获取数据
        this.model.fetch({
            data : {
                id : e.params.albumId
            }
        });
        
    },

    onModelChange: function( ) {

        // 渲染模板并输出
        this.$el.html( 
            Mustache.render( $( '#detail-template' ).html(), 
                this.model.toJSON() )
        );

        // 隐藏Loading
        this.hideLoading();

    },

    onModelError: function( ) {

        // 渲染模板并输出
        this.$el.html( '<h4>数据获取失败</h4>' );

    },

    onExpand: function( e ) {
        e.preventDefault();
        var $info = this.$( '.mod .info p' );
        $info.html( $info.attr( 'data-info' ) );
    }
} );
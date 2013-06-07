Chassis.PageView.define( 'index', {
    
    // 设置PageView所在的DOM
    el: '#album-list',

    // 配置事件
    events: {
        // 监听model change
        'change model': 'onModelChange',
        // 监听model error
        'error model': 'onModelError'
    },

    init: function( opts ) {
        this.model = Chassis.Model.create( 'index' );
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function() {

        // 获取数据
        if ( !this.model.fetched ) {
            this.showLoading();

            this.model.fetch();
            this.model.fetched = true;
        }
    },

    onModelChange: function( ) {

        // 渲染模板并输出
        this.$el.html( 
            Mustache.render( $( '#index-template' ).html(), 
                this.model.toJSON() )
        );

        // 隐藏Loading
        this.hideLoading();

    },

    onModelError: function( ) {

        // 渲染模板并输出
        this.$el.html( '<h4>数据获取失败</h4>' );

    }
} );
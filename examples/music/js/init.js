( function() {
    // 减少命名空间调用层级
    Chassis.mixin( window, Chassis );

    // 设置Loading
    Loading.setup( '.global-loading','.page-loading' );

    Chassis.history.start( {
        router: {
            routes: [ 'detail/:albumId' ],
            pageOrder: [ 'index', 'detail' ]
        } 
    } );

    // 显示App Loading
    Loading.Global.show();

} )();
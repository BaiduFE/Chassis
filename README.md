Chassis
=======

[入门文档](https://github.com/BaiduFE/Chassis/issues/28)

#### Chassis是什么？

Chassis源于百度内部的Rocket项目，是一套以提高Webapp开发效率为目的的开发框架。它提供了一套类Backbone的MVC代码架构，在此基础上延伸了视图层管理，优化了路由控制以及更加轻量级的实现。此外，基于Chassis的视图分层和开发规范，可以实现非常灵活的分工协作。

#### Chassis有多轻量级？

Chassis在实现上采用了多种组件化方案，开发者可以根据需求实现灵活定制。在体积上，轻量级版本Chassis只有 `4.8KB` (gzip)。

#### Chassis适合什么样开发场景？

如果你的项目满足以下特点（或需求）将会非常适合使用Chassis作为开发框架：

 * 单页面应用(SPA)
 * 路由管理
 * 视图管理（视图分层、视图切换、视图智能回收等）

#### Chassis入门

假设我们需要开发一个非常简单的APP，由两个页面组成：一个列表页以及一个详情页。APP默认页面为列表页，点击列表页会切换到详情页。

[PC请点击此处查看效果](http://responsivepx.com/?chassis.duapp.com%2Fexamples%2Fmusic%2F#320x640&scrollbars) 

手机请访问 `t.cn/zH0WkZn`

##### 准备工作

首先我们需要引入基础的JS脚本库。Chassis本身唯一的依赖是DOM脚本库，你可以选择使用[zepto](http://zeptojs.com/)、[jQuery](http://jquery.com)或者[ender](https://ender.no.de/)。

此外，在实际项目中通常还需要用到前端模板，因此还需要引入模板库，例子中使用的是[Mustache](https://github.com/janl/mustache.js)。

最后引入Chassis，这样脚本库的准备工作就完成了。

    <script src="js/zepto.js"></script>
    <script src="js/mustache.js"></script>
    <script src="js/chassis.js"></script>

##### 路由规则

接下来我们需要确定APP的路由规则，这直接影响到视图层的组织。本例中包含两个页面：首页以及详情页，我们给每个页面分配一个ID：`index`和`detail`。页面对应的访问路径分别是：`http://yourdomain.com`和`http://yourdomain.com#/detail/123`

`index`页面由于为首页而且无参数，因此它对应的路由规则为空字符串；

`detail`页面需要参数来获取数据，因此`detail`页面对应的路由为`/detail/123`，为了在页面初始化时能够获得参数，我们把`detail`页面的路由规则定义为`detail/:albumId`。

接下来我们就可以初始化路由管理了。

    Chassis.history.start( {
        router: {
            routes: [ '', 'detail/:albumId' ]
        } 
    } );

以上的路由定义含义为：当URL中路由路径为空以及`detail/:albumId`时会切换到相应的视图；`detail/:albumId`则对应`detail`视图。Chassis中空路径默认对应ID为`index`的视图，因此路由规则可以简化：

    routes: [ 'detail/:albumId' ]

如果实际应用中路由规则中的字符串无法和视图ID对应则可以换用以下方式：

    routes: {
        // 空路由会定位到home视图
        '': 'home',
        // 定位到album视图
        'detail/:albumId': 'album'
    }

##### 开发首页

在路由确定后我们就可以正式进行视图开发了，让我们先完成首页的开发。




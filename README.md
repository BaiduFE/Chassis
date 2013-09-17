![](https://raw.github.com/miller/Chassis/master/docs/chassis.png)
=======

## 内容导航
 * [Chassis是什么？](#1-chassis%E6%98%AF%E4%BB%80%E4%B9%88)
 * [Chassis有多轻量级？](#2-chassis%E6%9C%89%E5%A4%9A%E8%BD%BB%E9%87%8F%E7%BA%A7)
 * [Chassis适合什么样开发场景？](#3-chassis%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E6%A0%B7%E5%BC%80%E5%8F%91%E5%9C%BA%E6%99%AF)
 * [Chassis入门](#4-chassis%E5%85%A5%E9%97%A8)
    * [准备工作](#4-1-%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
    * [路由规则](#4-2-%E8%B7%AF%E7%94%B1%E8%A7%84%E5%88%99)
    * [开发首页](#4-3-%E5%BC%80%E5%8F%91%E9%A6%96%E9%A1%B5)
        * [模板](#4-3-1-%E6%A8%A1%E6%9D%BF)
        * [Model](#4-3-2-model)
        * [视图](#4-3-3-%E8%A7%86%E5%9B%BE)
    * [开发详情页](#4-4-%E5%BC%80%E5%8F%91%E8%AF%A6%E6%83%85%E9%A1%B5)
        * [模板](#4-4-1-%E6%A8%A1%E6%9D%BF)
        * [Model](#4-4-2-model)
        * [视图](#4-4-3-%E8%A7%86%E5%9B%BE)
 * [更多文档](#5-%E6%9B%B4%E5%A4%9A%E6%96%87%E6%A1%A3)

##1. Chassis是什么？

Chassis源于百度内部的Rocket项目，是一套以提高Webapp开发效率为目的的开发框架。它提供了一套类Backbone的MVC代码架构，在此基础上延伸了视图层管理，优化了路由控制以及更加轻量级的实现。此外，基于Chassis的视图分层和开发规范，可以实现非常灵活的分工协作。

##2. Chassis有多轻量级？

Chassis在实现上采用了多种组件化方案，开发者可以根据需求实现灵活定制。在体积上，轻量级版本Chassis只有 `4.8KB` (gzip)。为百度地图webapp定制的精简版仅`3.5K`(gzip，同时替换掉underscore.js)。

##3. Chassis适合什么样开发场景？

如果你的项目满足以下特点（或需求）将会非常适合使用Chassis作为开发框架：

 * 单页面应用(SPA)
 * 路由管理
 * 视图管理（视图分层、视图切换、视图智能回收等）

##4. Chassis入门

假设我们需要开发一个非常简单的APP，由两个页面组成：一个列表页以及一个详情页。APP默认页面为列表页，点击列表页会切换到详情页。

[PC请点击此处查看效果](http://responsivepx.com/?chassis.duapp.com%2Fexamples%2Fmusic%2F#320x640&scrollbars) [source](https://github.com/BaiduFE/Chassis/tree/master/examples/music)

手机请访问 `t.cn/zH0WkZn`

###4-1. 准备工作

首先我们需要引入基础的JS脚本库。Chassis本身唯一的依赖是DOM脚本库，你可以选择使用[zepto](http://zeptojs.com/)、[jQuery](http://jquery.com)或者[ender](https://ender.no.de/)。

此外，在实际项目中通常还需要用到前端模板，因此还需要引入模板库，例子中使用的是[Mustache](https://github.com/janl/mustache.js)。

最后引入Chassis，这样脚本库的准备工作就完成了。

```html
<script src="js/zepto.js"></script>
<script src="js/mustache.js"></script>
<script src="js/chassis.js"></script>
```

###4-2. 路由规则

接下来我们需要确定APP的路由规则，这直接影响到视图层的组织。本例中包含两个页面：首页以及详情页，我们给每个页面分配一个ID：`index`和`detail`。页面对应的访问路径分别是：`http://yourdomain.com`和`http://yourdomain.com#/detail/123`

`index`页面由于为首页而且无参数，因此它对应的路由规则为空字符串；

`detail`页面需要参数来获取数据，因此`detail`页面对应的路由为`/detail/123`，为了在页面初始化时能够获得参数，我们把`detail`页面的路由规则定义为`detail/:albumId`。

接下来我们就可以初始化路由管理了。

```javascript
Chassis.history.start( {
    router: {
        routes: [ '', 'detail/:albumId' ]
    } 
} );
```

以上的路由定义含义为：当URL中路由路径为空以及`detail/:albumId`时会切换到相应的视图；`detail/:albumId`则对应`detail`视图。Chassis中空路径默认对应ID为`index`的视图，因此路由规则可以简化：

```javascript
routes: [ 'detail/:albumId' ]
```

如果实际应用中路由规则中的字符串无法和视图ID对应则可以换用以下方式：

```javascript
routes: {
    // 空路由会定位到home视图
    '': 'home',
    // 定位到album视图
    'detail/:albumId': 'album'
}
```

更多信息请参考[《Chassis的路由使用》](https://github.com/BaiduFE/Chassis/issues/9)。

###4-3. 开发首页

在路由确定后我们就可以正式进行视图开发了，让我们先来完成首页。

首先，我们需要为页面数据的显示准备相应的模板，这里使用`Mustache`语法，如下。

####4-3-1. 模板

```html
<script id="index-template" type="text/x-template">
    <div class="hd log url  need-active">   
        <h2>专辑热榜</h2>
        <div></div>
    </div>
    <ul class="list">
        {{#list}}
        <li class="song url log song-{{album_id}}">
                <div class="left">
                    <div class="rank equal">{{rank}}</div>
                    <div class="info">
                        <a href="#detail/{{album_id}}">
                            <b>{{title}}</b>
                            <span class="txt">{{author}}</span>
                        </a>
                    </div>
                </div>
                <div class="download need-active">下载</div>
        </li>
        {{/list}}
    </ul>
</script>
```

现在我们需要定义视图对应的数据。

####4-3-2. Model

```javascript
Chassis.Model.define( 'index', {
    url : function() {
        return 'data/albums.php';
    },
    parse : function( resp ) {
        var album_list = resp.plaze_album_list.RM.album_list,
            list = album_list.list;
        for( var i = 0, len = list.length; i < len; i++ ) {
            list[ i ].rank = i + 1;
        }
        return album_list;
    }
} );
```

通过`Chassis.Model.define`接口可以定义数据Model， 第一个参数为Model的ID， 建议和对应视图的ID保持一致，第二个参数为Model原型方法和属性。

这里使用了`url`和`parse`方法，`url`返回的结果会作为获取数据的目标路径；`parse`返回的结果会作为Model的最终数据。

更多信息请参考[《Chassis的模型使用》](https://github.com/BaiduFE/Chassis/issues/31)。

这之后就是视图的定义了。

####4-3-3. 视图

```javascript
Chassis.PageView.define( 'index', {
    // 设置PageView所在的DOM
    el: '#album-list',
    // 配置事件
    events: {
        // 监听model change
        'change model': 'onModelChange'
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
    }
} );
```

接下来详细介绍一下如何定义一个视图。

首先你需要了解`Chassis.PageView.define`接口。该接口接收两个参数，第一个参数为页面的ID，与路由规则中的ID一一对应；第二个参数则为视图原型的属性和方法。

在原型上：

```javascript
el: '#album-list',
```

设置视图所关联的DOM结点，在视图中`this.$el`可以获得DOM的jQuery封装对象。 它是整个视图的宿主DOM结点，视图的切换、显示、隐藏以及默认的事件等都作用在结点上。

```javascript
events: {
    // 监听model change
    'change model': 'onModelChange',
    // 监听model error
    'error model': 'onModelError'
},
```

通过`events`对象可以统一配置各种事件的处理方法，这里不仅仅能配置内部DOM结点的事件，还包括了view、model以及document和window。

 * `'click .btn': handler` ：点击`this.$el`上class为`.btn`的DOM结点；
 * `'change model: handler'` ：监听`this.model`的`change`事件；
 * `'beforepagein view': handler` ：监听当前视图的`beforepagein`事件；
 * `'click window': handler` ：点击window；
 * `'click document': handler` ：点击document；

通过`events`对象配置的事件，在调用视图的`destroy`方法后都能被正确移除， 因此建议事件统一在此配置。

```javascript
init: function( opts ) {
    this.model = Chassis.Model.create( 'index' );
},
```

定义初始化操作，这里在初始化时创建了视图对应的数据Model。

```javascript
onBeforePageIn: function() {
    // 获取数据
    if ( !this.model.fetched ) {
        this.showLoading();
        this.model.fetch();
        this.model.fetched = true;
    }
},
```

`onBeforePageIn`方法在视图即将切换到当前视图之前会自动调用， 你可以在此进行视图展示前的预处理，比如此处会提前显示loading效果并请求数据。对应的还有`onAfterPageIn`、`onBeforePageOut`以及`onAfterPageOut`方法。

```javascript
onModelChange: function( ) {
    // 渲染模板并输出
    this.$el.html( 
        Mustache.render( $( '#index-template' ).html(), 
            this.model.toJSON() )
    );
    // 隐藏Loading
    this.hideLoading();
}
```

此处监听Model数据，在数据返回后会获取页面模板进行渲染，最后因此loading。

至此，首页的代码就完成了。

###4-4. 开发详情页

####4-4-1. 模板

```html
<script id="detail-template" type="text/x-template">
    <header id="header" class="">
        <div class="bar">
            <div class="left">
                <a href="#"><span class="btn need-active btn-back"></span></a>
            </div>
             <h1 class="">{{albumInfo.title}}</h1>
             <div class="right"></div>
        </div>
    </header>
    <section class="content">
        <div class="topic">
            <div class="mod">
                <div class="pic">
                    <img alt="{{albumInfo.title}}" src="{{albumInfo.pic_small}}">
                </div>
                <div class="info">
                    <p data-info="{{albumInfo.info}}">
                        {{albumInfo.simpleinfo}}
                        <a class="expand">展开</a>
                    </p>
                    <time class="txt">创建时间：{{albumInfo.publishtime}}</time>
                </div>
            </div>
            <ul class="list withbar">
                <li class="hd">{{albumInfo.title}}</li>
                <ul class="list">
                    {{#songlist}}
                    <li class="song url log song-50902704">
                        <div class="left">
                            <div class="rank">{{rank}}</div>
                            <div class="info">
                                <b>{{title}}</b>
                                <br>
                                <span class="txt">{{author}}</span>
                            </div>
                        </div>
                        <div class="download need-active">下载</div>
                    </li>
                    {{/songlist}}
                </ul>
            </ul>
        </div>
    </section>
</script>
```

####4-4-2. Model

```javascript
Chassis.Model.Detail = Chassis.Model.extend( {
    url : function() {
        return 'data/info.php';
    },
    
    parse : function( resp ) {
        var list = resp.songlist;
        resp.albumInfo.simpleinfo = resp.albumInfo.info.substring(0, 70) + '...';
        for( var i = 0, len = list.length; i < len; i++ ) {
            list[ i ].rank = i + 1;
        }
        return resp;
    }
} );
```

####4-4-3. 视图

```javascript
Chassis.PageView.define( 'detail', {
    // 设置PageView所在的DOM
    el: '#album-detail',
    // 配置事件
    events: {
        // 监听model change
        'change model': 'onModelChange',
        // expand
        'click .expand': 'onExpand'
    },
    init: function( opts ) {
        this.model = new Chassis.Model.Detail();
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
    onExpand: function( e ) {
        e.preventDefault();
        var $info = this.$( '.mod .info p' );
        $info.html( $info.attr( 'data-info' ) );
    }
} );
```

到此一个最简单的Chassis应用就开发完了，关于Chassis的更多细节请参考：

##5. 更多文档

[Chassis入门文档](https://github.com/BaiduFE/Chassis/issues/28)






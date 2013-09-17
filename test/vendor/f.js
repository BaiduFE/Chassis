(function(server){
    var F = {'version' : '1.0.0', 'debug' : true},
        head = document.head || document.getElementsByTagName('head')[0],
        url = server || '/pkg/webapp';
/**
 * 支持对array和object进行遍历
 * @param o
 * @param fn
 */
function forEach(o, fn) {
    if( o instanceof Array) {
         o.forEach(fn);
    } else {
        for(var i in o) {
            if(o.hasOwnProperty(i)) {
                fn(o[i], i);
            }
        }
    }
}
/**
 * 异步请求
 * @param opts
 */
function ajax(opts){
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        data = null,
        callback = opts.success,
        timer;

    if(opts.data) {
        method = 'POST';
        data = opts.data;
    }

    xhr.open(method, opts.url, true);
    if(method == 'POST'){
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.onreadystatechange = function(){
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            if(xhr.readyState === 4) {
                clearTimeout(timer);
                try{
                    callback(JSON.parse(xhr.responseText));
                }catch(e){
                    throw new Error('server error:' + xhr.responseText);
                }
            }
        }
    };
    xhr.send(data);
    timer = setTimeout(function(){
        xhr.abort();
        throw new Error('timeout to load file :' + url);
    }, opts.timeout || 30000);
}
/**
 * 配置项
 * @type {Object}
 */
var config = {
    manifest: false, //用于支持html5的离线缓存机制
    cachePriority: true, //本地缓存优先,默认启动,优先使用本地缓存，在后台更新资源，直到下次刷新页面此次资源才会生效
    //支持request、package、ui三种方式
    //request是把一次请求的资源合并成一个script、link标签
    //package 是一个包合并成一个script、link
    //ui 是一个组件一个script、link
    combo: 'request',
    storagePrefix: '__'
};

/**
 * 支持一些配置选项
 * F.config({
 *    manifest: false,
 *    cachePriority: true
 * });
 * @param o
 */
F.config = function(o){
    forEach(o, function(value, key){
        config[key] = value;
    });
}
function _load(index, list, length, fn){
    if(index < length - 1){
        loadResources(index + 1, list, length, fn);
    }else{
        fn && fn();
    }
}
/**
 * 按同步加载资源包
 * @param index
 * @param list
 * @param length
 * @param fn
 */
function loadResources(index, list, length, fn){
    //import(beforeDataRequest)
    var h = head,
        node,
        currentItem = list[index];
    if(currentItem["js"]) {
        node = document.createElement('script');
        node.type = "text/javascript";
        node.src = currentItem["js"];
        node.onload = function(){
            _load(index, list, length, fn);
        };
        h.insertBefore(node, h.firstChild);
    }else{
        _load(index, list, length, fn);
    }
    if(currentItem["css"]){
        node = document.createElement('link');
        node.rel = "stylesheet";
        node.href = currentItem["css"];
        h.appendChild(node);
    }
}
/**
 * 获取并加载资源列表
 * @param url
 * @param list
 * @param fn
 */
function getResources(url, list, fn){
    //import(beforeListRequestdebug)
    ajax({
        url : url + '?type=list',
        data : list,
        success : function(ret){
            //import(afterListRequest)
            loadResources(0, ret, ret.length, fn);
        }
    });
}
//在普通package加载前，提前加载
var preload = '';
/**
 * 加载包
 * @param packages {Array} 包
 * @param fn {function} 回调函数
 */
F.load = function(packages, fn){
    if (typeof packages === 'string') {
        packages = [packages];
    }
    //本地调试package对应的hash为空，最后的等号是必须，否则后端拿不到key
    getResources(url, preload + "=&" + packages.join('=&') + '=', fn);
};

 'F' in window || (window.F = F);
})('data');
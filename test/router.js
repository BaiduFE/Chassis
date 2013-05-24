$(document).ready(function() {
    
   
  module("Chassis.Router");

  
  test("init for hashchange", 1, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        
        init : function(){
            delete Chassis.PageView.index;
            ok(true);
            window.setTimeout(function(){
                Chassis.history.navigate( '',{trigger:false} );
                Chassis.history.destroy();
                start();
            },1000);

        }
    });
    
    Router = Chassis.Router.extend({
        routes : ['index/:id']
    });
    
    router = new Router();

    Chassis.history.start();
    
    Chassis.history.navigate( 'index/2',{trigger:true} );
    
    
  });
  
  
  test("use pushState and root", 1, function() {
    var Router,router;
    stop();
    
    Chassis.PageView.index = Chassis.PageView.extend({
        init : function(){
            ok(true);
            window.setTimeout(function(){
                Chassis.history.navigate( '',{trigger:false} );
                Chassis.history.destroy();
                start();
            },1000);

        }
    });
    
    Router = Chassis.Router.extend({
         routes : ['index/:id']
    });
    
    router = new Router();
    
    Chassis.history.start({
        pushState : true,
        root : '/test/'
    });
    
    Chassis.history.navigate( 'index/2',{trigger:true} );  
    
  });
  
  
  
  
  
  

  /*


  test("routes via navigate with {replace: true}", 1, function() {
    location.replace('http://example.com#start_here');
    Backbone.history.checkUrl();
    location.replace = function(href) {
      strictEqual(href, new Location('http://example.com#end_here').href);
    };
    Backbone.history.navigate('end_here', {replace: true});
  });

  test("routes (splats)", 1, function() {
    location.replace('http://example.com#splat/long-list/of/splatted_99args/end');
    Backbone.history.checkUrl();
    equal(router.args, 'long-list/of/splatted_99args');
  });

  test("routes (github)", 3, function() {
    location.replace('http://example.com#backbone/compare/1.0...braddunbar:with/slash');
    Backbone.history.checkUrl();
    equal(router.repo, 'backbone');
    equal(router.from, '1.0');
    equal(router.to, 'braddunbar:with/slash');
  });

  test("routes (optional)", 2, function() {
    location.replace('http://example.com#optional');
    Backbone.history.checkUrl();
    ok(!router.arg);
    location.replace('http://example.com#optional/thing');
    Backbone.history.checkUrl();
    equal(router.arg, 'thing');
  });

  test("routes (complex)", 3, function() {
    location.replace('http://example.com#one/two/three/complex-part/four/five/six/seven');
    Backbone.history.checkUrl();
    equal(router.first, 'one/two/three');
    equal(router.part, 'part');
    equal(router.rest, 'four/five/six/seven');
  });

  test("routes (query)", 5, function() {
    location.replace('http://example.com#mandel?a=b&c=d');
    Backbone.history.checkUrl();
    equal(router.entity, 'mandel');
    equal(router.queryArgs, 'a=b&c=d');
    equal(lastRoute, 'query');
    equal(lastArgs[0], 'mandel');
    equal(lastArgs[1], 'a=b&c=d');
  });

  test("routes (anything)", 1, function() {
    location.replace('http://example.com#doesnt-match-a-route');
    Backbone.history.checkUrl();
    equal(router.anything, 'doesnt-match-a-route');
  });

  test("routes (function)", 3, function() {
    router.on('route', function(name) {
      ok(name === '');
    });
    equal(ExternalObject.value, 'unset');
    location.replace('http://example.com#function/set');
    Backbone.history.checkUrl();
    equal(ExternalObject.value, 'set');
  });

  test("Decode named parameters, not splats.", 2, function() {
    location.replace('http://example.com#decode/a%2Fb/c%2Fd/e');
    Backbone.history.checkUrl();
    strictEqual(router.named, 'a/b');
    strictEqual(router.path, 'c/d/e');
  });

  test("fires event when router doesn't have callback on it", 1, function() {
    router.on("route:noCallback", function(){ ok(true); });
    location.replace('http://example.com#noCallback');
    Backbone.history.checkUrl();
  });

  test("#933, #908 - leading slash", 2, function() {
    location.replace('http://example.com/root/foo');

    Backbone.history.stop();
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.start({root: '/root', hashChange: false, silent: true});
    strictEqual(Backbone.history.getFragment(), 'foo');

    Backbone.history.stop();
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.start({root: '/root/', hashChange: false, silent: true});
    strictEqual(Backbone.history.getFragment(), 'foo');
  });

  test("#1003 - History is started before navigate is called", 1, function() {
    Backbone.history.stop();
    Backbone.history.navigate = function(){ ok(Backbone.History.started); };
    Backbone.history.start();
    // If this is not an old IE navigate will not be called.
    if (!Backbone.history.iframe) ok(true);
  });

  test("#967 - Route callback gets passed encoded values.", 3, function() {
    var route = 'has%2Fslash/complex-has%23hash/has%20space';
    Backbone.history.navigate(route, {trigger: true});
    strictEqual(router.first, 'has/slash');
    strictEqual(router.part, 'has#hash');
    strictEqual(router.rest, 'has space');
  });

  test("correctly handles URLs with % (#868)", 3, function() {
    location.replace('http://example.com#search/fat%3A1.5%25');
    Backbone.history.checkUrl();
    location.replace('http://example.com#search/fat');
    Backbone.history.checkUrl();
    equal(router.query, 'fat');
    equal(router.page, void 0);
    equal(lastRoute, 'search');
  });

  test("#1185 - Use pathname when hashChange is not wanted.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/path/name#hash');
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.start({hashChange: false});
    var fragment = Backbone.history.getFragment();
    strictEqual(fragment, location.pathname.replace(/^\//, ''));
  });

  test("#1206 - Strip leading slash before location.assign.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root/');
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.start({hashChange: false, root: '/root/'});
    location.assign = function(pathname) {
      strictEqual(pathname, '/root/fragment');
    };
    Backbone.history.navigate('/fragment');
  });

  test("#1387 - Root fragment without trailing slash.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root');
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.start({hashChange: false, root: '/root/', silent: true});
    strictEqual(Backbone.history.getFragment(), '');
  });

  test("#1366 - History does not prepend root to fragment.", 2, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root/');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(state, title, url) {
          strictEqual(url, '/root/x');
        }
      }
    });
    Backbone.history.start({
      root: '/root/',
      pushState: true,
      hashChange: false
    });
    Backbone.history.navigate('x');
    strictEqual(Backbone.history.fragment, 'x');
  });

  test("Normalize root.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(state, title, url) {
          strictEqual(url, '/root/fragment');
        }
      }
    });
    Backbone.history.start({
      pushState: true,
      root: '/root',
      hashChange: false
    });
    Backbone.history.navigate('fragment');
  });

  test("Normalize root.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root#fragment');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(state, title, url) {},
        replaceState: function(state, title, url) {
          strictEqual(url, '/root/fragment');
        }
      }
    });
    Backbone.history.start({
      pushState: true,
      root: '/root'
    });
  });

  test("Normalize root.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root');
    Backbone.history = _.extend(new Backbone.History, {location: location});
    Backbone.history.loadUrl = function() { ok(true); };
    Backbone.history.start({
      pushState: true,
      root: '/root'
    });
  });

  test("Normalize root - leading slash.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(){},
        replaceState: function(){}
      }
    });
    Backbone.history.start({root: 'root'});
    strictEqual(Backbone.history.root, '/root/');
  });

  test("Transition from hashChange to pushState.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root#x/y');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(){},
        replaceState: function(state, title, url){
          strictEqual(url, '/root/x/y');
        }
      }
    });
    Backbone.history.start({
      root: 'root',
      pushState: true
    });
  });

  test("#1619: Router: Normalize empty root", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(){},
        replaceState: function(){}
      }
    });
    Backbone.history.start({root: ''});
    strictEqual(Backbone.history.root, '/');
  });

  test("#1619: Router: nagivate with empty root", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(state, title, url) {
          strictEqual(url, '/fragment');
        }
      }
    });
    Backbone.history.start({
      pushState: true,
      root: '',
      hashChange: false
    });
    Backbone.history.navigate('fragment');
  });

  test("Transition from pushState to hashChange.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root/x/y?a=b');
    location.replace = function(url) {
      strictEqual(url, '/root/?a=b#x/y');
    };
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: null,
        replaceState: null
      }
    });
    Backbone.history.start({
      root: 'root',
      pushState: true
    });
  });

  test("#1695 - hashChange to pushState with search.", 1, function() {
    Backbone.history.stop();
    location.replace('http://example.com/root?a=b#x/y');
    Backbone.history = _.extend(new Backbone.History, {
      location: location,
      history: {
        pushState: function(){},
        replaceState: function(state, title, url){
          strictEqual(url, '/root/x/y?a=b');
        }
      }
    });
    Backbone.history.start({
      root: 'root',
      pushState: true
    });
  });

  test("#1746 - Router allows empty route.", 1, function() {
    var Router = Backbone.Router.extend({
      routes: {'': 'empty'},
      empty: function(){},
      route: function(route){
        strictEqual(route, '');
      }
    });
    new Router;
  });

  test("#1794 - Trailing space in fragments.", 1, function() {
    var history = new Backbone.History;
    strictEqual(history.getFragment('fragment   '), 'fragment');
  });

  test("#1820 - Leading slash and trailing space.", 1, function() {
    var history = new Backbone.History;
    strictEqual(history.getFragment('/fragment '), 'fragment');
  });

  test("#1980 - Optional parameters.", 2, function() {
    location.replace('http://example.com#named/optional/y');
    Backbone.history.checkUrl();
    strictEqual(router.z, undefined);
    location.replace('http://example.com#named/optional/y123');
    Backbone.history.checkUrl();
    strictEqual(router.z, '123');
  });

  test("#2062 - Trigger 'route' event on router instance.", 2, function() {
    router.on('route', function(name, args) {
      strictEqual(name, 'routeEvent');
      deepEqual(args, ['x']);
    });
    location.replace('http://example.com#route-event/x');
    Backbone.history.checkUrl();
  });

  test("#2255 - Extend routes by making routes a function.", 1, function() {
    var RouterBase = Backbone.Router.extend({
      routes: function() {
        return {
          home:  "root",
          index: "index.html"
        };
      }
    });

    var RouterExtended = RouterBase.extend({
      routes: function() {
        var _super = RouterExtended.__super__.routes;
        return _.extend(_super(),
          { show:   "show",
            search: "search" });
      }
    });

    var router = new RouterExtended();
    deepEqual({home: "root", index: "index.html", show: "show", search: "search"}, router.routes);
  });
  */
});

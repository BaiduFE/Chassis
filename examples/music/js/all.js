/* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function E(a){return a==null?String(a):y[z.call(a)]||"object"}function F(a){return E(a)=="function"}function G(a){return a!=null&&a==a.window}function H(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function I(a){return E(a)=="object"}function J(a){return I(a)&&!G(a)&&a.__proto__==Object.prototype}function K(a){return a instanceof Array}function L(a){return typeof a.length=="number"}function M(a){return g.call(a,function(a){return a!=null})}function N(a){return a.length>0?c.fn.concat.apply([],a):a}function O(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function P(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function Q(a,b){return typeof b=="number"&&!l[O(a)]?b+"px":b}function R(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=k(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),i[a]=c),i[a]}function S(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function T(c,d,e){for(b in d)e&&(J(d[b])||K(d[b]))?(J(d[b])&&!J(c[b])&&(c[b]={}),K(d[b])&&!K(c[b])&&(c[b]=[]),T(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function U(b,d){return d===a?c(b):c(b).filter(d)}function V(a,b,c,d){return F(b)?b.call(a,c,d):b}function W(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function X(b,c){var d=b.className,e=d&&d.baseVal!==a;if(c===a)return e?d.baseVal:d;e?d.baseVal=c:b.className=c}function Y(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:isNaN(b=Number(a))?/^[\[\{]/.test(a)?c.parseJSON(a):a:b):a}catch(d){return a}}function Z(a,b){b(a);for(var c in a.childNodes)Z(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k=h.defaultView.getComputedStyle,l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},m=/^\s*<(\w+|!)[^>]*>/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/^(?:body|html)$/i,p=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],r=h.createElement("table"),s=h.createElement("tr"),t={tr:h.createElement("tbody"),tbody:r,thead:r,tfoot:r,td:s,th:s,"*":h.createElement("div")},u=/complete|loaded|interactive/,v=/^\.([\w-]+)$/,w=/^#([\w-]*)$/,x=/^[\w-]+$/,y={},z=y.toString,A={},B,C,D=h.createElement("div");return A.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=D).appendChild(a),d=~A.qsa(e,b).indexOf(a),f&&D.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},A.fragment=function(b,d,e){b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=m.test(b)&&RegExp.$1),d in t||(d="*");var g,h,i=t[d];return i.innerHTML=""+b,h=c.each(f.call(i.childNodes),function(){i.removeChild(this)}),J(e)&&(g=c(h),c.each(e,function(a,b){p.indexOf(a)>-1?g[a](b):g.attr(a,b)})),h},A.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},A.isZ=function(a){return a instanceof A.Z},A.init=function(b,d){if(!b)return A.Z();if(F(b))return c(h).ready(b);if(A.isZ(b))return b;var e;if(K(b))e=M(b);else if(I(b))e=[J(b)?c.extend({},b):b],b=null;else if(m.test(b))e=A.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=A.qsa(h,b)}return A.Z(e,b)},c=function(a,b){return A.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){T(a,c,b)}),a},A.qsa=function(a,b){var c;return H(a)&&w.test(b)?(c=a.getElementById(RegExp.$1))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:f.call(v.test(b)?a.getElementsByClassName(RegExp.$1):x.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=function(a,b){return a!==b&&a.contains(b)},c.type=E,c.isFunction=F,c.isWindow=G,c.isArray=K,c.isPlainObject=J,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=B,c.trim=function(a){return a.trim()},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,d=[],e,f;if(L(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return N(d)},c.each=function(a,b){var c,d;if(L(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){y["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return u.test(h.readyState)?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return F(a)?this.not(this.not(a)):c(g.call(this,function(b){return A.matches(b,a)}))},add:function(a,b){return c(C(this.concat(c(a,b))))},is:function(a){return this.length>0&&A.matches(this[0],a)},not:function(b){var d=[];if(F(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):L(b)&&F(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},has:function(a){return this.filter(function(){return I(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!I(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!I(a)?a:c(a)},find:function(a){var b,d=this;return typeof a=="object"?b=c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):this.length==1?b=c(A.qsa(this[0],a)):b=this.map(function(){return A.qsa(this,a)}),b},closest:function(a,b){var d=this[0],e=!1;typeof a=="object"&&(e=c(a));while(d&&!(e?e.indexOf(d)>=0:A.matches(d,a)))d=d!==b&&!H(d)&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&!H(a)&&b.indexOf(a)<0)return b.push(a),a});return U(b,a)},parent:function(a){return U(C(this.pluck("parentNode")),a)},children:function(a){return U(this.map(function(){return S(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return U(this.map(function(a,b){return g.call(S(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),k(this,"").getPropertyValue("display")=="none"&&(this.style.display=R(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=F(a);if(this[0]&&!b)var d=c(a).get(0),e=d.parentNode||this.length>1;return this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));var b;while((b=a.children()).length)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=F(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?d.css("display")=="none":b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(V(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(I(c))for(b in c)W(this,b,c[b]);else W(this,c,V(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&W(this,a)})},prop:function(b,c){return c===a?this[0]&&this[0][b]:this.each(function(a){this[b]=V(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+O(b),c);return d!==null?Y(d):a},val:function(b){return b===a?this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(a){return this.selected}).pluck("value"):this[0].value):this.each(function(a){this.value=V(this,b,a,this.value)})},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=V(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};d.css("position")=="static"&&(g.position="relative"),d.css(g)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,c){if(arguments.length<2&&typeof a=="string")return this[0]&&(this[0].style[B(a)]||k(this[0],"").getPropertyValue(a));var d="";if(E(a)=="string")!c&&c!==0?this.each(function(){this.style.removeProperty(O(a))}):d=O(a)+":"+Q(a,c);else for(b in a)!a[b]&&a[b]!==0?this.each(function(){this.style.removeProperty(O(b))}):d+=O(b)+":"+Q(b,a[b])+";";return this.each(function(){this.style.cssText+=";"+d})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return e.some.call(this,function(a){return this.test(X(a))},P(a))},addClass:function(a){return this.each(function(b){d=[];var e=X(this),f=V(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&X(this,e+(e?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return X(this,"");d=X(this),V(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(P(a)," ")}),X(this,d.trim())})},toggleClass:function(b,d){return this.each(function(e){var f=c(this),g=V(this,b,e,X(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||h.body;while(a&&!o.test(a.nodeName)&&c(a).css("position")=="static")a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){c.fn[b]=function(d){var e,f=this[0],g=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?G(f)?f["inner"+g]:H(f)?f.documentElement["offset"+g]:(e=this.offset())&&e[b]:this.each(function(a){f=c(this),f.css(b,V(this,d,a,f[b]()))})}}),q.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,e=c.map(arguments,function(b){return a=E(b),a=="object"||a=="array"||b==null?b:A.fragment(b)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,h){f=d?h:h.parentNode,h=b==0?h.nextSibling:b==1?h.firstChild:b==2?h:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();Z(f.insertBefore(a,h),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),A.Z.prototype=c.fn,A.uniq=C,A.deserializeValue=Y,c.zepto=A,c}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/),m=a.match(/(BB10).*Version\/([\d.]+)/),n=a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),o=a.match(/PlayBook/),p=a.match(/Chrome\/([\d.]+)/)||a.match(/CriOS\/([\d.]+)/),q=a.match(/Firefox\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),m&&(b.bb10=!0,b.version=m[2]),n&&(b.rimtabletos=!0,b.version=n[2]),o&&(c.playbook=!0),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0),p&&(c.chrome=!0,c.version=p[1]),q&&(c.firefox=!0,c.version=q[1]),b.tablet=!!(f||o||e&&!a.match(/Mobile/)||q&&a.match(/Tablet/)),b.phone=!b.tablet&&!!(e||g||h||l||m||p&&a.match(/Android/)||p&&a.match(/CriOS\/([\d.]+)/)||q&&a.match(/Mobile/))}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a){function g(a){return a._zid||(a._zid=d++)}function h(a,b,d,e){b=i(b);if(b.ns)var f=j(b.ns);return(c[g(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||f.test(a.ns))&&(!d||g(a.fn)===g(d))&&(!e||a.sel==e)})}function i(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function j(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function k(b,c,d){a.type(b)!="string"?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function l(a,b){return a.del&&(a.e=="focus"||a.e=="blur")||!!b}function m(a){return f[a]||a}function n(b,d,e,h,j,n){var o=g(b),p=c[o]||(c[o]=[]);k(d,e,function(c,d){var e=i(c);e.fn=d,e.sel=h,e.e in f&&(d=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return e.fn.apply(this,arguments)}),e.del=j&&j(d,c);var g=e.del||d;e.proxy=function(a){var c=g.apply(b,[a].concat(a.data));return c===!1&&(a.preventDefault(),a.stopPropagation()),c},e.i=p.length,p.push(e),b.addEventListener(m(e.e),e.proxy,l(e,n))})}function o(a,b,d,e,f){var i=g(a);k(b||"",d,function(b,d){h(a,b,d,e).forEach(function(b){delete c[i][b.i],a.removeEventListener(m(b.e),b.proxy,l(b,f))})})}function t(b){var c,d={originalEvent:b};for(c in b)!r.test(c)&&b[c]!==undefined&&(d[c]=b[c]);return a.each(s,function(a,c){d[a]=function(){return this[c]=p,b[a].apply(b,arguments)},d[c]=q}),d}function u(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.zepto.qsa,c={},d=1,e={},f={mouseenter:"mouseover",mouseleave:"mouseout"};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:n,remove:o},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._zid=g(b),d}if(typeof c=="string")return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){n(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){o(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){n(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return o(d,b,a),c}})})};var p=function(){return!0},q=function(){return!1},r=/^([A-Z]|layer[XY]$)/,s={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){n(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(t(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){o(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return!c||a.isFunction(c)?this.bind(b,c||d):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return!c||a.isFunction(c)?this.unbind(b,c||d):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){if(typeof b=="string"||a.isPlainObject(b))b=a.Event(b);return u(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,g){d=t(typeof b=="string"?a.Event(b):b),d.data=c,d.target=g,a.each(h(g,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){typeof a!="string"&&(b=a,a=b.type);var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c.isDefaultPrevented=function(){return this.defaultPrevented},c}}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),triggerGlobal(c,d,"ajaxSuccess",[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,"ajaxError",[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a=a.split(";",2)[0]),a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){a.processData&&a.data&&$.type(a.data)!="string"&&(a.data=$.param(a.data,a.traditional)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data))}function parseArguments(a,b,c,d){var e=!$.isFunction(b);return{url:a,data:e?b:undefined,success:e?$.isFunction(c)?c:undefined:b,dataType:e?d||c:c}}function serialize(a,b,c,d){var e,f=$.isArray(b);$.each(b,function(b,g){e=$.type(g),d&&(b=c?d:d+"["+(f?"":b)+"]"),!d&&f?a.add(g.name,g.value):e=="array"||!c&&e=="object"?serialize(a,g,c,b):a.add(b,g)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){if("type"in a){var b="jsonp"+ ++jsonpID,c=document.createElement("script"),d=function(){clearTimeout(g),$(c).remove(),delete window[b]},e=function(c){d();if(!c||c=="timeout")window[b]=empty;ajaxError(null,c||"abort",f,a)},f={abort:e},g;return ajaxBeforeSend(f,a)===!1?(e("abort"),!1):(window[b]=function(b){d(),ajaxSuccess(b,f,a)},c.onerror=function(){e("error")},c.src=a.url.replace(/=\?/,"="+b),$("head").append(c),a.timeout>0&&(g=setTimeout(function(){e("timeout")},a.timeout)),f)}return $.ajax(a)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host),settings.url||(settings.url=window.location.toString()),serializeData(settings),settings.cache===!1&&(settings.url=appendQuery(settings.url,"_="+Date.now()));var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty,clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,xhr.status?"error":"abort",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b,c,d){return $.ajax(parseArguments.apply(null,arguments))},$.post=function(a,b,c,d){var e=parseArguments.apply(null,arguments);return e.type="POST",$.ajax(e)},$.getJSON=function(a,b,c){var d=parseArguments.apply(null,arguments);return d.dataType="json",$.ajax(d)},$.fn.load=function(a,b,c){if(!this.length)return this;var d=this,e=a.split(/\s/),f,g=parseArguments(a,b,c),h=g.success;return e.length>1&&(g.url=e[0],f=e[1]),g.success=function(a){d.html(f?$("<div>").html(a.replace(rscript,"")).find(f):a),h&&h.apply(d,arguments)},$.ajax(g),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a,b){function s(a){return t(a.replace(/([a-z])([A-Z])/,"$1-$2"))}function t(a){return a.toLowerCase()}function u(a){return d?d+a:t(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,k,l,m,n,o,p,q,r={};a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+t(a)+"-",d=e,!1}),k=c+"transform",r[l=c+"transition-property"]=r[m=c+"transition-duration"]=r[n=c+"transition-timing-function"]=r[o=c+"animation-name"]=r[p=c+"animation-duration"]=r[q=c+"animation-timing-function"]="",a.fx={off:d===b&&i.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:c,transitionEnd:u("TransitionEnd"),animationEnd:u("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isPlainObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c=(typeof c=="number"?c:a.fx.speeds[c]||a.fx.speeds._default)/1e3),this.anim(b,c,d,e)},a.fn.anim=function(c,d,e,f){var g,h={},i,t="",u=this,v,w=a.fx.transitionEnd;d===b&&(d=.4),a.fx.off&&(d=0);if(typeof c=="string")h[o]=c,h[p]=d+"s",h[q]=e||"linear",w=a.fx.animationEnd;else{i=[];for(g in c)j.test(g)?t+=g+"("+c[g]+") ":(h[g]=c[g],i.push(s(g)));t&&(h[k]=t,i.push(k)),d>0&&typeof c=="object"&&(h[l]=i.join(", "),h[m]=d+"s",h[n]=e||"linear")}return v=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(w,v)}a(this).css(r),f&&f.call(this)},d>0&&this.bind(w,v),this.size()&&this.get(0).clientLeft,this.css(h),d<=0&&setTimeout(function(){u.each(function(){v.call(this)})},0),this},i=null}(Zepto);/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (obj) {
    return Object_toString.call(obj) === '[object Array]';
  };

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view || {};
    this.parent = parent;
    this._cache = {};
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name == '.') {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf('.') > 0) {
            value = context.view;
            var names = name.split('.'), i = 0;
            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) break;

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === 'function') value = value.call(this.view);

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = mustache.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.getPartial = function (name) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    return this._partialCache[name];
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var self = this;
    return function (view, partials) {
      if (partials) {
        if (typeof partials === 'function') {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return renderTokens(tokens, self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  /**
   * Low-level function that renders the given `tokens` using the given `writer`
   * and `context`. The `template` string is only needed for templates that use
   * higher-order sections to extract the portion of the original template that
   * was contained in that section.
   */
  function renderTokens(tokens, writer, context, template) {
    var buffer = '';

    var token, tokenValue, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      tokenValue = token[1];

      switch (token[0]) {
      case '#':
        value = context.lookup(tokenValue);

        if (typeof value === 'object') {
          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            }
          } else if (value) {
            buffer += renderTokens(token[4], writer, context.push(value), template);
          }
        } else if (typeof value === 'function') {
          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, function (template) {
            return writer.render(template, context);
          });
          if (value != null) buffer += value;
        } else if (value) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '^':
        value = context.lookup(tokenValue);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '>':
        value = writer.getPartial(tokenValue);
        if (typeof value === 'function') buffer += value(context);
        break;
      case '&':
        value = context.lookup(tokenValue);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(tokenValue);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += tokenValue;
        break;
      }
    }

    return buffer;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];

    var token;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      switch (token[0]) {
      case '#':
      case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;
      case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;
      default:
        collector.push(token);
      }
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          lastToken = token;
          squashedTokens.push(token);
        }
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parseTemplate(template, tags) {
    template = template || '';
    tags = tags || mustache.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) throw new Error('Invalid tags: ' + tags.join(', '));

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr == '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        if (sections.length === 0) throw new Error('Unopened section "' + value + '" at ' + start);
        var openSection = sections.pop();
        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);
        if (tags.length !== 2) throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    var openSection = sections.pop();
    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    tokens = squashTokens(tokens);

    return nestTokens(tokens);
  }

  mustache.name = "mustache.js";
  mustache.version = "0.7.2";
  mustache.tags = ["{{", "}}"];

  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  mustache.parse = parseTemplate;

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // All Mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  mustache.compile = function (template, tags) {
    return defaultWriter.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  mustache.compilePartial = function (name, template, tags) {
    return defaultWriter.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  mustache.compileTokens = function (tokens, template) {
    return defaultWriter.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

}));
;(function(){
/**
 * @fileOverview 命名空间初始化
 */

/**
 * 命名空间
 * @class Chassis
 */
var root = this,
	exportName = 'Chassis',
	_Chassis = root[ exportName ],
	Chassis;

if ( typeof exports !== 'undefined' ) {
	Chassis = exports;
} else {
	Chassis = root[ exportName ] = {};
}

/**
 * 版本号
 * @property VERSION
 * @static
 * @type string
 */
Chassis.VERSION = '0.1.0';

/**
 * 页面切换动画命名空间
 * @property FX
 * @static
 * @type string
 */
Chassis.FX = {}; 

/**
 * see [jQuery](http://api.jquery.com/),
 * [Zepto](http://zeptojs.com/),[GMU](http://gmu.baidu.com/)
 * or [ender](https://ender.no.de)
 * @property $
 * @type object
 */
Chassis.$ = root.jQuery || root.Zepto || root.ender;


/**
 * 获取无冲突命名空间
 * @method noConflict
 * @static
 * @return Chassis
 */
Chassis.noConflict = function() {
	root[ exportName ] = _Chassis;
	return this;
};
 /*jshint camelcase:false*/
 /**
 * @fileOverview 语言增强
 */

var proto = Array.prototype,
    nativeForEach = proto.forEach,
    breaker = {},
    toString = proto.toString,
    nativeIsArray = Array.isArray;

/**
 * mixin方法，等同于$.extend;
 * @method mixin
 * @static
 */
Chassis.mixin = $.extend;

/**
 * 实现类继承
 * @method extend
 * @static
 * @param  {object} protoProps  原型属性或方法
 * @param  {object} staticProps 类属性或方法
 * @return {function}
 */
Chassis.extend = function( protoProps, staticProps ) {
    var parent = this,
        Proxy,
        child;

    // 构造函数
    if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
        child = protoProps.constructor;
    } else {
        child = function() {
            return parent.apply( this, arguments );
        };
    }

    // 静态方法
    Chassis.mixin( child, parent, staticProps );

    // 原型链处理
    Proxy = function() {
        this.constructor = child;
    };

    Proxy.prototype = parent.prototype;
    child.prototype = new Proxy();

    if ( protoProps ) {
        Chassis.mixin( child.prototype, protoProps );
    }

    child.__super__ = parent.prototype;

    return child;

};

/**
 * 创建一个只能调用一次的函数。
 * > 重复调用改进的方法也没有效果，还是返回第一次执行的结果。
 * > 有助于初始化类型的方法，代替过去设置一个boolean标记及后续对标记检测。
 *
 * @method _once
 * @static
 * @param  {function} func 传入的函数
 * @return {function} 只能调用一次的函数
 */     
Chassis._once = function( func ) {
    var me = this,
        ran = false, 
        memo;

    return function() {
        
        if ( ran ) {
            return memo;
        }
        
        ran = true;
        memo = func.apply( me, arguments );
        func = null;
        return memo;
    };
};

/**
 * 判断一个对象是否有你给出名称的属性或对象。
 * > 需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
 *
 * @method has
 * @static
 * @param  {object} obj 目标对象
 * @param {string} key 属性
 * @return {boolean} key 属性
 */
Chassis.has = function( obj, key ) {
    return hasOwnProperty.call( obj, key );
};

/**
 * 检索object的所有的属性名称。
 *
 * @method keys
 * @static
 * @param  {object} obj 目标对象
 * @return {array} 所有的属性名称
 */
Chassis.keys = function( obj ) {
    var keys = [];
    
    if ( obj !== Object( obj ) ) {
        throw new TypeError( 'Invalid object' );
    }
    
    Chassis.$.each( obj, function( key, item ) {
        if ( Chassis.has( obj, key ) ) {
            keys[ keys.length ] = key;
        }
    } );
    
    return keys;
};

/**
 * 为需要的客户端模型或DOM元素生成一个全局唯一的id。
 * > 如果prefix参数存在， id 将附加给它
 *
 * @method uniqueId
 * @static
 * @param  {string} prefix 前缀
 * @return {string}
 */
Chassis.uniqueId = (function() {
    var idCounter = 0;

    return function( prefix ) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
})();

    
/**
 * see [$.isArray](http://zeptojs.com/#$.isArray)
 * @method isArray
 * @static
 */
Chassis.isArray = Chassis.$.isArray;

/**
 * 判断是否是对象
 *
 * @method isObject
 * @static
 * @param  {*} obj 目标
 * @return {boolean}
 */
Chassis.isObject = function( obj ) {
    return obj === Object( obj );
};

/**
 * see [$.isFunction](http://zeptojs.com/#$.isFunction)
 *
 * @method isFunction
 * @static
 */
Chassis.isFunction = Chassis.$.isFunction;

/**
 * 创建 一个浅复制（浅拷贝）的克隆object。
 * > 任何嵌套的对象或数组都通过引用拷贝，不会复制。
 *
 * @method clone
 * @static
 * @param  {object} obj 目标对象
 * @return {object}
 */
Chassis.clone = function( obj ) {
    if ( !Chassis.isObject( obj ) ) {
        return obj;
    }
    return Chassis.isArray( obj ) ? obj.slice() : Chassis.mixin( {}, obj );
};

/**
 * 返回对象属性的运行结果
 * > 如果该属性是一个方法，则返回该方法的运算结果
 *
 * @method result
 * @static
 * @param  {object} obj 目标对象
 * @param  {object} property 目标属性
 * @return {object}
 */
Chassis.result = function( object, property ) {
    var value;

    if ( object === null ) {
        return null;
    }
    
    value = object[ property ];
    return Chassis.isFunction( value ) ? value.call( object ) : value;
};

/**
 * 转义HTML字符串，替换&, <, >, ", ', /字符
 *
 * @method escape
 * @static
 * @param  {string} str 目标字符串
 * @return {string}
 */
Chassis.escape = function( str ) {
    return str ?
        str.replace( /\&/g, '&amp;' )
            .replace( /</g, '&lt;' )
            .replace( /\>/g, '&gt;' )
            .replace( /\"/g, '&quot;' )
            .replace( /\'/g, '&#x27' )
            .replace( /\//g, '&#x2F' ):
        str;

};

/**
 * see [$.proxy](http://zeptojs.com/#$.proxy)
 *
 * @method proxy
 * @static
 */
Chassis.proxy = $.proxy;

/**
 * 将两个数组转换为名称-值对的对象
 *
 * @method object
 * @param  {array} list 目标数组(key)
 * @param  {array} values 目标数组(value)
 * @return {object}
 * @static
 */
Chassis.object = function( list, values ) {
    var result = {};

    if ( list === null ) {
        return {};
    }
    
    Chassis.$.each( list, function( key, item ) {
        if ( values ) {
            result[ item ] = values[ key ];
        } else {
            result[ item[ 0 ] ] = item[ 1 ];
        }
    } );

    return result;
};

$.support = Chassis.mixin( $.support || {}, {
    has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
} );

/**
 * Undefined
 * @property Undefined
 * @static
 * @type undefined
 * @private
 */
Chassis.Undefined;
/**
 * @fileOverview 事件机制
 */

/**
 * Events
 * @class Events
 * @namespace Chassis
 */
var Events = Chassis.Events = {
    
	/**
	 * > 绑定 `callback` 函数到 `object` 对象。
	 *
	 * > 当事件触发时执行回调函数 callback 。
	 *
	 * @method on
	 * @param {string} name
	 * @param {function} callback
	 * @param {object} context
	 * @return {object}
	 * @static
	 * @example

		var obj = Chassis.mixin({},Chassis.Events);
		obj.on("a b c",callback);
		obj.on({a:callback, b:callback, c:callback},obj);

	 */
    on: function( name, callback, context ) {
        var events;
        
        if ( !eventsApi( this, 'on', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        
        if ( !this._events ) {
            this._events = {};
        }
        
        events = this._events[ name ] || (this._events[ name ] = []);
        events.push({
            callback: callback,
            context: context,
            ctx: context || this
        });
        
        return this;
    },

    /**
	 * > 绑定 只能运行一次的callback 函数到 object 对象。 
	 *
	 * > 当事件触发时执行回调函数 callback 。
	 *
	 * @method once
     * @param {string} name
     * @param {function} callback
     * @param {object} context
	 * @return {object}
	 * @static
     * @example
	
		var obj = Chassis.mixin({},Chassis.Events);
		obj.once("a b c",callback);
		obj.once({a:callback, b:callback, c:callback},obj);
	
	 */
    once: function( name, callback, context ) {
        var me = this,
            once;
        
        if ( !eventsApi( this, 'once', name, [ callback, context ] ) ||
                !callback ) {
            return this;
        }
        

        once = Chassis._once(function() {
            me.off( name, once );
            callback.apply( me, arguments );
        });
        
        once._callback = callback;

        return this.on( name, once, context );
    },

    /**
	 * > 移除绑定的事件。 
	 *
	 * @method off
     * @param {string} name
     * @param {function} callback
     * @param {object} context
	 * @return {object}
	 * @static
     * @example
	
		var obj = Chassis.mixin({},Chassis.Events);
		obj.off("a b c",callback);
		obj.off({a:callback, b:callback, c:callback},obj);
	
	 */
    off: function( name, callback, context ) {
        var me = this,
            retain, 
            ev, 
            events, 
            names, 
            i, 
            l, 
            j, 
            k;
            
        if ( !this._events ||
                !eventsApi( this, 'off', name, [ callback, context ] ) ) {
            return this;
        }
        
        if ( !name && !callback && !context ) {
            this._events = {};
            return this;
        }

        names = name ? [ name ] : Chassis.keys( this._events );
        
        Chassis.$.each( names, function( nKey, nItem ) {
            name = nItem;
            events = me._events[ name ];

            if ( events ) {
                me._events[ name ] = retain = [];

                if ( callback || context ) {
                    Chassis.$.each( events, function( eKey, eItem ) {
                        ev = eItem;
                        if ( (callback && callback !== ev.callback &&
                                callback !== ev.callback._callback) ||
                                (context && context !== ev.context) ) {
                            retain.push( ev );
                        }
                    } );
                    
                }
                if ( !retain.length ) {
                    delete me._events[ name ];
                }
            }
        } );
        
        return this;
    },

    /**
	 * > 触发绑定的事件。 
	 *
	 * @method trigger
     * @param {string} name
	 * @return {object}
	 * @static
     * @example
	
		var obj = Chassis.mixin({},Chassis.Events);
		obj.trigger("a b c");
	
	 */
    trigger: function( name ) {
        var args,
            events,
            allEvents;
        
        if ( !this._events ) {
            return this;
        }
        
        args = [].slice.call( arguments, 1 );
        
        if ( !eventsApi( this, 'trigger', name, args ) ) {
            return this;
        }
        
        events = this._events[ name ];
        allEvents = this._events.all;
        
        if ( events ) {
            triggerEvents( events, args );
        }
        
        if ( allEvents ) {
            triggerEvents( allEvents, arguments );
        }
        
        return this;
    },

    /**
	 * > 停止监听事件 
	 *
	 * @method stopListening
     * @param {string} name
     * @param {function} callback
     * @param {object} context
	 * @return {object}
	 * @static
     * @example
	
		var obj = Chassis.mixin({},Chassis.Events);
		obj.stopListening("a b c",callback);
	
	 */
    stopListening: function( obj, name, callback ) {

        var listeners = this._listeners,
            me = this,
            deleteListener,
            id;
        
        if ( !listeners ) {
            return this;
        }
        
        deleteListener = !name && !callback;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        if ( obj ) {
            (listeners = {})[ obj._listenerId ] = obj;
        }
        
        Chassis.$.each( listeners, function( key, item ) {

            listeners[ key ].off( name, callback, me );
            
            if ( deleteListener ) {
                delete me._listeners[ key ];
            }
        } );
        
        return this;
    }

};

var eventSplitter = /\s+/;

var eventsApi = function( obj, action, name, rest ) {
    var names,
        i,
        l;

    if ( !name ) {
        return true;
    }

    if ( typeof name === 'object' ) {
        Chassis.$.each( name, function( key, item ) {
            obj[ action ].apply( obj, [ key, item ].concat( rest ) );
        } );
        
        return false;
    }

    if ( eventSplitter.test( name ) ) {
        
        names = name.split( eventSplitter );
        
        Chassis.$.each( names, function( key, item ) {
            obj[ action ].apply( obj, [ item ].concat( rest ) );
        } );
        
        return false;
    }

    return true;
};


var triggerEvents = function( events, args ) {

    var l = events.length, 
        a1 = args[ 0 ], 
        a2 = args[ 1 ], 
        a3 = args[ 2 ], 
        i = -1,
        ev;
    
    switch ( args.length ) {
        case 0: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx ); 
            }
            return;
        case 1: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1 ); 
            }
            return;
        case 2: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2 ); 
            }
            return;
        case 3: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.call( ev.ctx, a1, a2, a3 ); 
            }
            return;
        default: 
            while ( ++i < l ) {
                (ev = events[ i ]).callback.apply( ev.ctx, args );
            }
    }
};

var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

/**
 * see [on](#method_on)
 *
 * @method listenTo
 * @static
 */
/**
 * see [once](#method_once)
 *
 * @method listenToOnce
 * @static
 */
Chassis.$.each( listenMethods, function( method, implementation ) {
    Events[ method ] = function( obj, name, callback ) {

        var me = this,
            listeners,
            id;
        
        listeners = this._listeners || (this._listeners = {});
        id = obj._listenerId || (obj._listenerId = Chassis.uniqueId( 'l' ));
        listeners[ id ] = obj;
        
        if ( typeof name === 'object' ) {
            callback = me;
        }
        
        obj[ implementation ]( name, callback, this );
        return this;
    };
} );

/**
 * see [on](#method_on)
 *
 * @method bind
 * @static
 */

/**
 * see [off](#method_off)
 *
 * @method unbind
 * @static
 */

Events.bind   = Events.on;
Events.unbind = Events.off;

Chassis.mixin( Chassis, Events );
/**
 * @fileOverview Model
 */

/**
 * Model
 * @class Model
 * @namespace Chassis
 * @constructor
 * @param {object} attributes
 * @param {object} opts
 */
var Model = Chassis.Model = function( attributes, opts ) {
    var me = this,
        attrs = attributes || {},
        defaults;

    if ( !opts ) {
        opts = {};
    }

    
    me.attributes = {};
    me.cid = Chassis.uniqueId( 'c' );
    
    
    attrs = Chassis.mixin( {}, me.defaults || {}, attrs );
    me.set( attrs, opts );

    me.init.apply( me, arguments );
};

Chassis.mixin( Model.prototype, Events, {
    
	/**
     * 模型的特殊属性
     * > `id` 可以是任意字符串。在属性中设置的 `id` 会被直接拷贝到模型属性上。 
     *
     * @property idAttribute
     * @return 
     **/
    idAttribute : 'id',
    
	/**
	 * 初始化
     * > 当创建模型实例时，可以传入 `属性` 初始值，这些值会被 `set` 到模型。 如果定义了 `init` 函数，该函数会在模型创建后执行。
     *
     * @method init
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
     **/
    init : function() {},
    
    /**
     * fetch方法获取数据的url。
     * > 注意这个方法的意思和backbone是有区别的
     *
     * @method url
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			url : function(){
				return '/path/?title=' + this.get( 'title' );
			}
		} );
		
        var m = new model();
     **/
    url : function() {},
    
    /**
     * 从模型获取当前属性值
     *
     * @method get
     * @param {string} key
     * @return
	 * @example
		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			}
		} );
		
        var m = new model();
        m.get( 'title' );
     **/
    get : function( key ) {
        return this.attributes[ key ];
    },
    
    /**
	 * 模型是否具有某个属性
     * > 属性值为非 null 或非 undefined 时返回 true
     *
     * @method has
     * @param {string} key
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			}
		} );
		
        var m = new model();
		m.has( 'title' );
     **/
    has : function( key ) {
        return this.get( key ) !== null;
    },
    
    /**
     * 向模型设置一个或多个散列属性。
     * > 如果任何一个属性改变了模型的状态，在不传入 `{silent: true}` 选项参数的情况下，
     * > 会触发 `change` 事件。 
     *
     * @method set
     * @param {string} key
     * @param {*} val
     * @param {object} opts
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//model has be changed.
		} );
        m.set( 'title', '' );
		
     **/
    set : function( key, val, opts ) {

        var me = this,
            attr, 
            attrs, 
            unset, 
            changes, 
            silent, 
            changing, 
            prev, 
            current,
            validateResult;
            
        if ( key === null ) {
            return me;
        }

        if ( typeof key === 'object' ) {
            attrs = key;
            opts = val;
        } else {
            (attrs = {})[ key ] = val;
        }
        
        if ( !opts ) {
            opts = {};
        }

        
        // 变更之前先做校验
        validateResult = me.validate.call( me, attrs );
        
        if ( validateResult !== true ) {
            me.trigger( 'error', validateResult );
            return;
        }
        
        me._previousAttributes = Chassis.clone( me.attributes );
        
        if ( me.idAttribute in attrs ) {
            me[ me.idAttribute ] = attrs[ me.idAttribute ];
        }
        
        Chassis.$.each( attrs, function( key, item ) {
            if ( opts.unset ) {
                delete me.attributes[ key ];
            } else {
                me.attributes[ key ] = item;
            }   
        } );
        
        me.trigger( 'change', me );
    },
    
    /**
     * 从内部属性散列表中删除指定属性。 
	 * > 如果未设置 `silent` 选项，会触发 `change` 事件。
     *
     * @method clear
     * @param {string} attr
     * @param {object} opts
     * @return 
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			}
		} );
		
        var m = new model();
		m.unset( 'title' )
     **/
    unset : function( attr, opts ) {
        return this.set( attr, Chassis.Undefined,
                Chassis.mixin( {}, opts, { unset: true } ) );
    },
    
    /**
     * 从模型中删除所有属性。 
	 * > 如果未设置 `silent` 选项，会触发 `change` 事件。
     *
     * @method clear
     * @param {object} opts
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			}
		} );
		
        var m = new model();
		m.clear();
     **/
    clear : function( opts ) {
        var attrs = {};
        Chassis.$.each( this.attributes, function( key, item ) {
            attrs[ key ] = Chassis.Undefined;
        } );
        
        return this.unset( attrs, opts );
    },
    
    /**
     * 返回模型 `attributes` 副本的 JSON 字符串化形式。 
	 * > 它可用于模型的持久化、序列化，或者传递到视图前的扩充。
     *
     * @method toJSON
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.toJSON();		
     **/
    toJSON : function() {
        return Chassis.clone( this.attributes );
    },
    
    /**
     * 返回与模型属性一致的新的实例。
     *
     * @method clone
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.clone();	
     **/
    clone : function() {
        return new this.constructor( this.attributes );
    },
    
    /**
     * 与 get 类似, 但返回模型属性值的 HTML 转义后的版本。 
     * > 如果将数据从模型插入 HTML，使用 escape 取数据可以避免 XSS 攻击.
     *
     * @method escape
     * @param {string} attr
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
        m.escape( 'title' );		 
     **/
    escape : function( attr ) {
        return Chassis.escape( this.get( attr ) );
    },
    
    /**
     *在 `change` 事件发生的过程中，本方法可被用于获取已改变属性的旧值。
     *
     * @method previous
     * @param {string} attr
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			this.previous( 'title' );
		} );
		
        m.set( 'tile', '' );	 
     **/
    previous : function( attr ) {
        return (attr === null || !this._previousAttributes) ?
                null : this._previousAttributes[ attr ];
    },
    
    /**
     * 返回模型的上一个属性散列的副本。
     * > 一般用于获取模型的不同版本之间的区别，或者当发生错误时回滚模型状态。
     *
     * @method previousAttributes
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			this.previousAttributes( );
		} );
		
        m.set( 'tile', '' );	 
     **/
    previousAttributes : function() {
        return Chassis.clone( this._previousAttributes );
    },
    
    /**
     * 模型是否已经保存到服务器。 
	 * > 如果模型尚无 `id`，则被视为新的。
     *
     * @method isNew
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			init : function(){
				//
			}
		} );
		
        var m = new model();

        m.isNew();		 
     **/
    isNew : function() {
        return this.id === null;
    },
    
    /**
     * 手动获取数据
     *
     * @method fetch
     * @param {object} opts
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    fetch : function( opts ) {
        var me = this,
            _opt;
        
        opts = opts ? Chassis.clone( opts ) : {};
        
        opts = Chassis.mixin( {}, {
            dataType : 'json',
            success : function() {}
        }, opts );
        
        _opt = Chassis.mixin( {}, opts, {
            url : me.url(),
            success : function( resp ) {
                resp = me.parse( resp, opts );

                opts.success.call( me );
                me.set( resp, opts );
            },
            error : function() {
                me.trigger( 'error' );
            }
        } );
        
        
        me.sync( _opt );
    },
    
    /**
     * 自定义数据解析，建议用自定义的逻辑重载它
     *
     * @method parse
     * @param {object} resp
     * @param {object} opts
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			},
			parse : function(resp){
				return resp[ 'data' ];
			}
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    parse: function( resp, opts ) {
        return resp;
    },
    
    /**
     * 自定义校验，建议用自定义的逻辑重载它
     *
     * @method validate
     * @return
	 * @example

		var model = Chassis.Model.extend( {
			defaults : {
				title : 'Chassis'
			},
			url : function(){
				return '/data/?title=' + this.get( 'title' );
			},
			parse : function(resp){
				return resp[ 'data' ];
			},
			
			validate : function( data ){
				if ( data[ 'title' ] == '' ) {
					return 'title attribute can not be empty;';
				}
				return true;
			}
			
		} );
		
        var m = new model();
		m.on( 'change', function(){
			//success
		} );
        m.fetch();	 
     **/
    validate : function() {
        return true;
    },
    
    /**
     * 手动触发 `change` 事件。
     *
     * @method change
     * @return
     * @private	 
     **/
    change : function() {
        this.trigger( 'change' );
    },
    
    sync : function( opts ) {
        return Chassis.$.ajax.call( this, opts );
    }
    
    
    
    
    
    // 对服务端做模型操作基本没用，故不做实现
    /*
    ,save : function(){}
    ,destroy : function(){}
    */
    
    
    // 可以全局指定，没什么实际意义
    /*
    ,urlRoot : function(){}
    */
    
    // 数据变更暂不实现(除非实现数据双向绑定)
    /*
    ,hasChanged : function(){}
    ,changedAttributes : function(){}
    */
    
} );


Model.extend = Chassis.extend;
/**
 * @fileOverview 数据缓存
 */
/**
 * @fileOverview Router核心实现
 * @requires Router.History || Router.Pushstate
 */

/**
 * 路由
 * @class Router
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 */
var Router = Chassis.Router = function( opts ) {
    
    if ( !opts ) {
        opts = {};
    }
    
	/**
	 * 路由规则
	 * @property routes
     * @description
	 *
     *      路由规则包括两种配置方式
	 *
     *      1. 键值对配置，例如：
     *      {
     *          '': 'index',
     *          'info/:id': 'info'
     *      }
     *      其中的key表示路由解析规则，规则中包括`action`和参数；`action`指定路由的目标
     *      页面；
     *      其中的val表示的是自定义路由处理函数，如果需要自定义路由行为则可以在`Router`类中
     *      定义名称为val的函数，其实参为路由规则解析后得到的参数；如果需要阻止默认路由行为则
     *      需要返回false。
     *
     *      2. 数组配置，例如：
     *      [
     *          'info/:id'
     *      ]
     *      这种配置方式会使用默认的路由行为：路由目标为`Chassis.PageView.info`;
     *      使用这种配置方式时如果路由action为空时会默认路由到`Chassis.PageView.index`,
     *      可以通过`opts.index`来重新设置;
	 * @type object
	 */
	 

    if ( opts.routes ) {
        this.routes = opts.routes;
    }

    // 默认的路由action
    this._index = opts.index || 'index';

    // 保存的视图列表，对应不同页面
    this.views = {};

    // 记录控制器变化
    this.currentView = null;
    this.previousView = null;
    
    this._bindRoutes();
    
    this.init.apply( this, arguments );
	
	if ( opts.start ) {
        Chassis.history.start();
    }
};

Chassis.mixin( Router.prototype, Events, {
    
    /**
     * 实例化一个路由对象
     *
     * @public
     * @method init
	 * @optional
     * @return 
     **/
    init : function() {},
    
    /**
     * 
  为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 

  每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数（callback）。
     *
     * @public
     * @method route
     * @param {string} route
     * @param {string} name
     * @return 
     **/
    route : function( route, name ) {

        var me = this,
            callback = this._getHandler( name ),
            routeRe = me._routeToRegExp( route ),
            keys = routeRe.exec( route ).slice( 1 );
        
        Chassis.$.each( keys, function( key, item ) {
            keys[ key ] = item.substring( 1 );
        } );
        
        Chassis.history.route( routeRe, function( fragment ) {
        
            var vals, 
                Request;
            
            vals = routeRe.exec( fragment ).slice( 1 );
            Request = Chassis.object( keys, vals );
            
            me.Request = Request;

            callback.call( me );
        
        } );

    },
    
    /**
     * 手动路由
     *
     * @private
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts ) {
        return Chassis.history.navigate( fragment, opts );
    },

	/**
	 * 页面切换顺序配置
	 * @property pageOrder
	 * @type array
	 */
    pageOrder: [],
	
	/**
	 * 默认页面切换动画，合理选择配置
	 * @property defaultTransition
     * @note: slide比较适用于固高切换(默认)
     * @note: fade比较适用DOM树较小的两个页面切换
     * @note: simple性能最好，但效果最一般
     * @note: dropdown只能用于固高切换
	 * @type string
	 */
    defaultTransition: 'slider',


	/**
	 * 页面切换动画配置
	 * @property pageTransition
     * @key {string} actionname-actionname，"-"号分隔的action名称串，不分先后，但支持精确设定
     * @value {string} animation name
     * @note: 以index和search为例，有两种可设定的值：index-search和search-index：
     *     1. 如果只设定了其中一个，则不分先后顺序同时生效。比如'index-search':'fade'，
     *     无论index->search还是search->index，切换动画总是fade
     *     2. 如果两个都设定了，则分别生效。比如'index-search':'fade'，'search-index':
     *     'slide'，那么index->search使用fade动画，search->index使用slide动画
     *     3. 如果两个都没有设定，则都是用默认动画
	 * @type object
	 */
    pageTransition: {
        
        // 'index-search': 'fade'
        // ,'index-page': 'slide'
    },

    /**
     * 通用切换页面逻辑
     * @method switchPage
     * @param {pageview} from
     * @param {pageview} to
     * @param {object} params
     */
    switchPage: function( from, to, params ) {

        var me = this,
            e = {
                from: from,
                to: to,
                params: params
            },
            dir = 0, 
            order = me.pageOrder, 
            fromAction = from && from.action,
            toAction = to && to.action,
            fromIndex = order.indexOf( fromAction ),
            toIndex = order.indexOf( toAction );

        /**
         * 计算页面切换方向：0-无方向，1-向左，2-向右
         */
        if ( fromAction !== toAction ) {
            if ( -1 !== fromIndex && -1 !== toIndex ) {
                dir = fromIndex > toIndex ? 2 : 1;
            }
        }

        // 记忆位置
        if ( me.enablePositionRestore && from ) {
            from.savePos();
        }
        
        if ( from ) {
            from.trigger( 'beforepageout', e );
        }
        
        if ( to ) {
            to.trigger( 'beforepagein', e );
        }


        /*
        Chassis.each( 
            from == to ? [ from ] : [ from, to ], function( item, key ) {

            item && item.trigger( 'pagebeforechange', {
                from: me.previousView, 
                to: me.currentView,
                params: params 
            });
        });
        */
        
        me._doTransition(
            from,
                to,
                dir,
                function() {
                
                /**
                 * 尽可能等切换稳定了再开始数据请求
                 * 延后一点用户感觉不出来，但能保证页面的稳定性
                 */

                // 恢复位置
                if ( me.enablePositionRestore && to ) {
                    to.restorePos( params );
                }
                

                /*
                $.each(from == to ? [from] : [from, to], function(key, item){
                    // item && console.log('pageafterchange');
                    item && item.trigger(
                        'pageafterchange', {
                            from: me.previousView, 
                            to: me.currentView,
                            params: params 
                        });
                });
                */
                
                if ( from ) {
                    
                    if ( from.trigger( 'afterpageout', e ) ) {
                        from.$el.hide();
                    }
                   
                    
                }
                
                if ( to ) {
                    to.trigger( 'afterpagein', e );
                }

            }
        );

    },

    /**
     * 选择相应切换动画并执行
     *
     * @method _doTransition
     * @private
     * @param {pageview} from
     * @param {pageview} to
     * @param {int} dir
     * @param {function} transitionEnd
     */
    _doTransition: function( from, to, dir, transitionEnd ) {

        var me = this,
            animate;

        // 根据action组合，选择不同切换动画方法
        animate = me._selectTransition( from && from.action, to && to.action );

        animate = animate || Chassis.FX[ me.defaultTransition ].animate; 

        animate(
            from && from.el, 
                to && to.el, 
                dir,
                transitionEnd
        );

    },

    /**
     * 根据action组合选择相应切换动画
     * @param {string} fromAction
     * @param {string} toAction
     * @return {string}
     */
    _selectTransition: function( fromAction, toAction ) {
        var me = this,
            transition,
            fx;
        if ( !fromAction || !toAction ) {
            return;
        }


        // key不分顺序，需要试探两种顺序的配置
        transition = me.pageTransition[ fromAction + '-' + toAction ] ||
                me.pageTransition[ toAction + '-' + fromAction ];

        
        fx = Chassis.FX[ transition ];
        return fx && fx.animate;
    },
    
    /**
     * 批量绑定路由事件
     *
     * @private
     * @method _bindRoutes
     * @return 
     **/
    _bindRoutes : function() {
        var me = this;
        
        // 对routes支持数组的处理
        me._routeArray.call( me );

        Chassis.$.each( me.routes, function( key, item ) {
            me.route( key, item );
        } );
		
		// 设定一个空的配置
		if ( !me.routes[ '' ] ) {
			me.route( '', me._index );
		}
		
        
        return me;
    },
    
    /**
     * 当routes为Array时解析为Object
     *
     * @private
     * @method _routeArray
     * @return 
     **/
    _routeArray : function() {
        var me = this,
            _routes = {},
            hasPageOrder = !!me.pageOrder.length;
        
        if ( !Chassis.isArray( me.routes ) ) {
            return me;
        }
        
        
        Chassis.$.each( me.routes, function( key, item ) {
            var first = item.split( /\//g )[ 0 ],
                name = first;

            if ( first.substring( 0, 1 ) === '*' ) {
                name = 'all';
            }
            
            if ( first === '' ) {
                name = me._index;
            }
            
            _routes[ item ] = name;
            
            if ( !hasPageOrder ) {
                me.pageOrder.push( name );
            }
        } );
        
        me.routes = Chassis.clone( _routes );
        
        return me;
       
    },
    
    /**
     * 将路由规则解析为正则
     *
     * @private
     * @method _routeToRegExp
     * @param {string} route
     * @return 
     **/
    _routeToRegExp : function( route ) {

        var optionalParam = /\((.*?)\)/g,
            namedParam    = /(\(\?)?:\w+/g,
            splatParam    = /\*\w+/g,
            escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
            
        route = route.replace( escapeRegExp, '\\$&' )
                .replace( optionalParam, '(?:$1)?' )
                .replace( namedParam, function( match, optional ) {
                    return optional ? match : '([^\/]+)';
                } )
                .replace( splatParam, '(.*?)' );
        return new RegExp( '^' + route + '$' );
    },

    _getHandler: function( action ) {
        var me = this;

        return function() {
            var fn = me[ action ];

            // 先执行自定义路由行为
            if ( Chassis.isFunction( fn ) &&
                    fn.apply( this, arguments ) === false ) {
                return;
            }

            me._doAction( action, me.Request );

        };

    },

    _doAction: function( action, request ) {

        var me = this,
            view = me.views[ action ];

        this._decodeRequest( request );
        
        if ( !view ) {
            view = me.views[ action ]  =
                    new Chassis.PageView[ action ]( request, action ); 
        } 
        
        // 切换视图控制器
        me.previousView = me.currentView;
        me.currentView = view;

        me.trigger( 'routechange', {
            from: me.previousView,
            to: me.currentView,
            params: request,
            views: this.views
        } );

        me.switchPage(
            me.previousView, 
                me.currentView, 
                request
        );
    },

    _decodeRequest: function( request ) {

        if ( !request ) {
            return;
        }

        Chassis.$.each( request, function( key, val ) {
            request[ key ] = decodeURIComponent( val );
        } );

    }
    
} );

Router.extend = Chassis.extend;
/**
 * @fileOverview history 基类
 */

/**
 * History
 * @class History
 * @namespace Chassis
 * @constructor
 * @param {object} handler
 */

var History = Chassis.History = function( handler ) {
    this.handler = handler || [];
};

Chassis.mixin( History.prototype, Events, {
    
    /**
     * 为路由对象手动创建路由
	 * > route 参数可以是 路由字符串 或 正则表达式。 
     * > 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数
     *
     * @public
     * @method route
     * @param {object} routeRe
     * @param {Function} callback
     * @return 
     **/
    route: function( routeRe, callback ) {
        this.handler.push({
            reg : routeRe,
            callback : callback
        });
    },
    
    /**
     * 手动到达应用程序中的某个位置
     *
     * @public
     * @method navigate
	 * @param {string} fragment hash字符串
	 * @param {object} opts 配置，opts.trigger指定是否触发事件
     * @return 
     **/
    navigate: function() {
        return this;
    },
    
    /**
     * 传入url触发对应的事件
     *
     * @private
     * @method _triggerHandle
     * @param {string} fragment
     * @return 
     **/
    _triggerHandle : function( fragment ) {
        var me = this;
		
        Chassis.$.each( me.handler, function( key, item ) {
            if ( !item.reg.test( fragment ) ) {
                return;
            }

            item.callback.call( me, fragment );
        } );
    },
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控路由变化事件并分发事件。
     * @public
     * @method start
     * @param {object} opts (optional) 
	 * opts.trigger 是否触发事件;
	 * opts.pushState 是否使用pushState;
	 * opts.root 使用pushState时配置的相对路径;
     * @return 
     **/
    start : function( opts ) {
        var handler = {},
            type = 'Hash',
			router;
        
        if ( !opts ) {
            opts = {};
        }
		
		
		
		if ( opts.router ) {
			
			opts.trigger = (opts.trigger === false) ? false : true;
			router = Chassis.Router.extend( opts.router );
			new router();
		}
        
		handler = Chassis.clone( this.handler );
		
        this.destroy();
        
        if ( opts.pushState ) {
            type = 'Pushstate';
        }
        
        if ( !History[ type ] ) {
            throw new Error( 'History.' + type + ' is not found' );
        }
        Chassis.history = new History[ type ]( handler );
        return Chassis.history.start( opts );
    },

    /**
     * 销毁当前的history实例，并重新生成新的History实例。
     * > 当应用的路由配置在hash和pushState之间来回切换时尤其有用。
     *
     * @public
     * @method destroy
     * @return 
     **/
    destroy : function() {
        this.pushState = false;
        this.root = '/';
        this.handler = [];
        this.cacheOptions = null;
        $( window ).off( 'hashchange' );
        $( window ).off( 'popstate' );
        History.start = false;
        
        // 销毁后重新指向原始的History，方便重新调用
        Chassis.history = new History();
    }
} );


History.extend = Chassis.extend;

Chassis.history = new History();
/**
 * @fileOverview 浏览器历史管理
 */

/**
 * Hash
 * > 用户不需要手动调用，当使用`history.start`时，会根据传递的参数自动实例化此类并覆盖之前的`history`实例。
 *
 * > 当用户调用destroy时，history将自动恢复至初始状态。
 * @class Hash
 * @namespace Chassis.History
 * @constructor
 * @param {object} handler
 * @private
 */
History.Hash = History.extend({
    
    /**
     * 当所有的路由创建并设置完毕，调用 `Chassis.history.start()` 监控 `hashchange` 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        // 开始监听hashchange
        if ( ('onhashchange' in window) &&
                ((typeof document.documentMode === 'undefined') ||
                document.documentMode === 8) ) {

            me._onHashChangeEvent();
            
            // 处理当前hash
			if ( opts.trigger ) {
				me._triggerHandle.call( me, me._getHash() );
			}
            
            return;
        }
        
        throw new Error( 'current browser do not suport hashchange event;' );
    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts ) {
        var me = this;

        
        if ( !opts ) {
            opts = { trigger : true };
        }

        me._setHash( fragment );

        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }

    },
    
    /**
     * 设置hash 
     *
     * @private
     * @method _setHash
     * @param {string} fragment
     * @return 
     **/
    _setHash : function( fragment ) {
		var me = this,
			folder = '';
		
		fragment = Chassis.$.trim( fragment ).replace( /^[#]+/, '' );
		
        if ( me._getHash() !== fragment ) {
		
			me._offHashChangeEvent(); 
			
			// 处理hash为空时页面回到顶部
			// 因为不考虑webkit之外的浏览器，所以用此方法比较有效
			if ( fragment === '' ) {
				folder = location.href.split( '/' ).slice( 3 ).join( '/' );
				folder = '/' + folder.replace( /#(.*?)$/, '' );
                history.pushState( {}, document.title, folder );
			} else {
                location.hash = '#' + fragment; 
			}
			window.setTimeout( function() {
				me._onHashChangeEvent();
			}, 0 );
        }

        return me;
    },
    
    /**
     * 获取hash 
     *
     * @private
     * @method _getHash
     * @return 
     **/
    _getHash : function() {
        var match = location.href.match( /#(.*)$/ );
        return match ? match[ 1 ] : '';
    },
    
    
    _onHashChangeEvent : function() {
        var me = this;
        $( window ).on( 'hashchange', function( e ) {
			me._triggerHandle.call( me, me._getHash() );
        } );
    },
    _offHashChangeEvent : function() {
        $( window ).off( 'hashchange' );
    }
});
/**
 * @fileOverview 使用pushstate实现的history
 * @requires Router.History
 */

/**
 * Pushstate
 * > 用户不需要手动调用，当使用history.start时，会根据传递的参数自动实例化此类并覆盖之前的history实例。
 *
 * > 当用户调用destroy时，history将自动恢复至初始状态。
 * @class Pushstate
 * @namespace Chassis.History
 * @constructor
 * @param {object} handler
 * @private
 */
History.Pushstate = History.extend({
    
    /**
     * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控 Pushstate 事件并分配路由。
     *
     * @overwrite
     * @public
     * @method start
     * @param {object} opts
     * @return 
     **/
    start : function( opts ) {
        var me = this;

        if ( History.start ) {
            return;
        }
        
        History.start = true;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        
        if ( opts.root ) {
            me.root = opts.root;
        }
        
        // 当浏览器前进后退时触发
        $( window ).on( 'popstate', function() {
            me._triggerHandle.call( me, me._getFragment() );
        } );
        
        // 处理当前pushState
        if ( opts.trigger ) {
			me._triggerHandle.call( me, me._getHash() );
		}
        
        return;
       

    },
    
    /**
     * 手动到达应用程序中的某个位置 
     *
     * @overwrite
     * @public
     * @method navigate
     * @param {string} fragment
     * @param {object} opts
     * @return 
     **/
    navigate : function( fragment, opts/*, replace*/ ) {
        var me = this;
        
        if ( !opts ) {
            opts = { trigger : true };
        }
        
        
        me._setPushState( fragment );
        
        
        me.cacheOptions = null;
        
        if ( opts.trigger ) {
            me._triggerHandle.call( me, fragment );
        }
    },
    
    /**
     * 设置pushstate 
     *
     * @private
     * @method _setPushState
     * @param {string} fragment
     * @return 
     **/
    _setPushState : function( fragment ) {

        fragment = fragment || this.root;
        history.pushState( {}, document.title, fragment );
        return this;
        
    },
    
    /**
     * 获取当前的fragment
     *
     * @private
     * @method _getFragment
     * @return 
     **/
    _getFragment : function() {
        
        return window.location.href
                .split( /\// )
                .slice( 3 )
                .join( '/' )
                .substring( this.root.length );
    }
    
    
});

History.Pushstate.extend = Chassis.extend;
/**
 * @fileOverview 视图
 * 层级关系管理
 * 事件管理
 */

// View构造函数中的opts参数中需要添加到View实例中的属性列表
var viewOptions = [ 'model', 'el', 'id', 'attributes', 'className',
		'tagName', 'events' ],
    rDelegateEventSplitter = /^(\S+)\s*(.*)$/,
    noop = function() {};

/**
 * 视图类
 * @class View
 * @constructor
 * @namespace Chassis
 * @param {object} opts
 * @param {view} super
 */
var View = Chassis.View = function( opts ) {
	this.cid = Chassis.uniqueId( 'view' );
	this._configure( opts );
	this._ensureElement();
    this._initialize.apply( this, arguments );
    this.delegateEvents();
};

Chassis.mixin( View.prototype, Events, {

	// view默认自动生成的元素的标签为div
	tagName: 'div',

	/**
	 * $
	 * @method $
	 * @param  {mixed} selector
	 * @return {$}
	 */
	$: function( selector ) {
        return this.$el.find( selector );
    },

    /**
     * 完成View的渲染，需子类重载实现。
     * @method render
     */
    render: function() {
        return this;
    },

    /**
     * 移除DOM元素以及清除事件监听
     * @method destroy
     */
    destroy: function() {

        var cld = this.children,
            cid;

        this.onDestroy();

        /**
         * View销毁前触发事件
         * @event beforedestroy
         */
        this.trigger( 'beforedestroy', this );

        // 销毁子视图
        for ( cid in cld ) {
            if ( cld.hasOwnProperty( cid ) ) {
                cld[ cid ].destroy();
                delete cld[ cid ];
            }
        }

        // 解除事件绑定
        this.undelegateEvents();

        // 移除DOM
        this.$el.remove();

        // 移除引用
        this.$el = this.el = null;

        // 如果是子视图则从父视图中删除
        if ( this.parent ) {
            delete this.parent.children[ this.cid ];
        }

        // TODO subpages清除
        /**
         * View销毁后触发事件
         * @event afterdestroy
         */
        this.trigger( 'afterdestroy', this );

        return this;
    },

    /**
     * 设置view所属的元素
     * @method setElement
     * @param  {mixed} el 新元素或者选择符
     * @param  {boolean} delegate 是否需要重新绑定事件
     */
    setElement: function( el, delegate ) {
        if ( this.$el ) {
            this.undelegateEvents();
        }

        this.$el = el instanceof Chassis.$ ? el : Chassis.$( el );
        this.el = this.$el[ 0 ];

        if ( delegate !== false ) {
            this.delegateEvents();
        }

        return this;
    },

    /**
     * 设置需绑定的事件，事件由参数`events`或者`this.events`中的键值对指定。
     * 事件绑定采用代理的方式实现(除了选择符是window和document)，事件回调中的执行上下文为当
     * 前`View`实例。
     * @note 每次调用时都不会自动接绑定之前的事件，因此多次调用会多次绑定；
     * @method delegateEvents
     * @param  {objects} events
     * @example
     *      //格式为 {"event[ selector]": "callback"}
     *      {
     *          'mousedown .title': 'edit',
     *          'click .button': 'save',
     *          'click .open': function( e ){},
     *          'orientationchange window': 'refresh',
     *          'click document': 'close',
     *          'beforepagein view': 'onBeforePageIn',
     *          'change model': 'render'
     *      }
     */
    delegateEvents: function( events ) {

        var key,
            method,
            match,
            eventName,
            selector,
            fullEventName;

        if ( !(events || (events = this.events)) ) {
            return this;
        }

        // 默认undelegate时，对于view/model的事件不好处理，如果view/model的事件直接
        // 解绑定的话将会使外界注册的以及beforepagein/afterpagein失效；因此暂时去掉
        // 自动解绑定功能。
        // this.undelegateEvents();

        for ( key in events ) {

            if ( events.hasOwnProperty( key ) ) {
                method = events[ key ];

                if ( !Chassis.isFunction( method ) ) {
                    method = this[ events[ key ] ];
                }

                if ( !method ) {
                    throw new Error(
                        'Method "' + events[ key ] + '" does not exist' );
                }

                match = key.match( rDelegateEventSplitter );
                eventName = match[ 1 ];
                selector = match[ 2 ];

                method = Chassis.proxy( method, this );

                fullEventName = eventName + '.delegateEvents' + this.cid;

                switch ( selector ) {
                    case 'window':
                    case 'document':
                        Chassis.$(window[ selector ])
                                .on( fullEventName, method );
                        break;
                    case 'view':
                        this.listenTo( this, eventName, method );
                        break;
                    case 'model':
                        if ( this.model ) {
                            this.listenTo( this.model, eventName, method );
                        }
                        break;
                    case '':
                        this.$el.on( fullEventName, method );
                        break;
                    default:
                        this.$el.on( fullEventName, selector, method );
                }
            }
        }

        return this;
    },

    /**
     * 解除view的所有事件绑定
     */
    undelegateEvents: function() {
        var eventName = '.delegateEvents' + this.cid;
        this.$el.off( eventName );

        Chassis.$( window ).off( eventName );
        Chassis.$( document ).off( eventName );

        this.stopListening();

        return this;
    },

    /**
     * 将view作为当前视图的子视图，并将view所属dom元素append父视图所属dom元素
     * @param  {[type]} view
     * @return {[type]}
     */
    append: function( view ) {
        this._addSubview( view );
    },

    /**
     * 将view作为当前视图的子视图，并将view所属dom元素prepend父视图所属dom元素
     * @param  {[type]} view
     * @return {[type]}
     */
    prepend: function( view ) {
        this._addSubview( view, 'PREPEND' );
    },

    /**
     * 将view作为当前视图的子视图（不涉及dom元素的处理）
     * @param  {[type]} view
     * @return {[type]}
     */
    setup: function( view ) {
        this._addSubview( view, 'SETUP' );
    },

    /**
     * 子类初始化
     */
    init: noop,

    /**
     * View销毁时调用，需子类实现。
     * @method onDestroy
     * @override
     */
    onDestroy: noop,

    /**
     * View所在Page即将显示前调用，需子类实现。
     * @method onBeforePageIn
     * @param {object} params
     *      params.from: 当前显示但是即将被替换的视图
     *      params.to: 即将显示的视图
     *      params.params: 路由参数
     * @override
     */
    onBeforePageIn: noop,

    /**
     * View所在Page显示后前调用，需子类实现。
     * @method onAfterPageIn
     * @param {object} params
     *      params.from: 被当前显示视图替换的视图
     *      params.to: 当前显示视图
     *      params.params: 路由参数
     * @override
     */
    onAfterPageIn: noop,

    /**
     * View所在PageView显示前触发
     * @event beforepagein
     * @param {object} params
     *      params.from: 即将被隐藏的视图
     *      params.to: 即将显示的视图
     *      params.params: 路由参数
     */
    _onBeforePageIn: function( params ) {

        this.onBeforePageIn( params );
        
    },

    /**
     * View所在PageView显示后触发
     * @event afterpagein
     * @param {object} params
     *      params.from: 已隐藏的视图
     *      params.to: 当前显示的视图
     *      params.params: 路由参数
     */
    _onAfterPageIn: function( params ) {

        this.onAfterPageIn( params );
    },

    /**
     * 初始化
     * @method initialize
     * @param {object} opts
     */
    _initialize: function( opts ) {

        this.root = this._getRoot();
        this.children = {};

        // 子类初始化
        this.init( opts );

        var listenTarget = this.root || this;

        // 自动监听常用事件
        this.listenTo( listenTarget, 'beforepagein', this._onBeforePageIn );
        this.listenTo( listenTarget, 'afterpagein', this._onAfterPageIn );
    },

    _getRoot: function() {
        var pointer = this;

        while ( pointer.parent ) {
            pointer = pointer.parent;
        }

        return pointer;
    },

	_configure: function( opts ) {

        var len = viewOptions.length,
            i = 0,
            opt,
            val;

        opts = opts || {};

        this.options = opts;

        for ( ; i < len; i++ ) {

            opt = viewOptions[ i ];
            val = this.options[ opt ];

            if ( val ) {
                this[ opt ] = val;
            }
        }
	},

	_ensureElement: function() {

        var attrs,
            $el;

        // 如果未指定DOM元素则自动创建并设置id/className
		if ( !this.el ) {

            // attributes有可能来自原型属性因此需要复制
			attrs = Chassis.mixin( {}, this.attributes || {} );

			if ( this.id ) {
				attrs.id = this.id;
			}

			if ( this.className ) {
				attrs[ 'class' ] = this.className;
			}

			$el = Chassis.$( '<' + this.tagName + '>' ).attr( attrs );
			this.setElement( $el, false );

        // 如果已经指定DOM元素则不会设置id/className
		} else {
			this.setElement( this.el, false );
		}
	},

	_addSubview: function( view, action ) {

		if ( view instanceof Chassis.View ) {
			this.children[ view.cid ] = view;
			view.parent = this;

			switch ( action ) {

				// 不进行DOM处理
				case 'SETUP': 
					break;
				case 'PREPEND':
					this.$el.prepend( view.$el );
					break;
				default:
					this.$el.append( view.$el );
					break;
			}

			view.$el.hide();

		} else {
			throw new Error( 'view is not an instance of Chassis.View.' );
		}
	}
} );

// 引入view.loading.js后会在view的原型增加以下方法

/**
 * 显示页面Loading
 * @method showLoading
 */

/**
 * 隐藏页面Loading
 * @method hideLoading
 */

/**
 * 显示全局Loading
 * @method showGLoading
 */

/**
 * 隐藏全局Loading
 * @method hideGLoading
 */

Chassis.mixin( View, {

    /**
     * 创建自定义视图类，Chassis.View的子类中可用。
     * @method define
     * @param  {string} viewId      视图ID，确保在相同类型视图下是唯一的。
     * @param  {object} protoProps  视图原型方法和属性。
     * @param  {object} staticProps 视图静态方法和属性。
     * @static
     * @example
     *     // 定义PageView
     *     Chassis.PageView.define( 'home', {} );
     *
     *     // 定义PageView下面的SubView（SubView ID建议加上所属PageView的ID）
     *     Chassis.SubView.define( 'home.banner', {} );
     */
    define: function( viewId, protoProps, staticProps ) {
        
        /*
        if ( this[ viewId ] ) {
            throw new Error( 'View ' + viewId + ' exists already.' );
        }
        */

        this[ viewId ] = this.extend( protoProps, staticProps );

    },

    /**
     * 获取自定义视图类，Chassis.View的子类中可用。
     * @method get
     * @static
     * @param  {string} viewId 视图ID
     * @return {view}
     */
    get: function( viewId ) {
        return this[ viewId ];
    },

    /**
     * 创建自定义视图类实例，Chassis.View的子类中可用。
     * @method create
     * @static
     * @param  {string} viewId 视图ID
     * @param  {object} opts1  创建实例参数（不同类型的视图类具有不同的参数）
     * @param  {object} opts2  创建实例参数（不同类型的视图类具有不同的参数）
     * @return {view}
     */
    create: function( viewId, opts1, opts2  ) {

        var klass = this.get( viewId );

        return klass ? (new klass( opts1, opts2 )) : null;
    },

    extend: Chassis.extend
} );
/*jshint camelcase:false,undef:false*/

/**
 * @fileOverview 子视图
 */

/**
 * 子视图控制器
 *
 * @class SubView
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 * @param {view} parent 子视图的父级视图
 */

/**
 * 当前子视图所在子页面即将切入时触发
 * @event beforeswitchin
 * @param {object} e
 */

/**
 * 当前子视图所在子页面即将切入时触发
 * @event afterswitchin
 * @param {object} e
 */

var SubView = Chassis.SubView = View.SubView = View.extend({

	_initialize: function( opts, parent ) {

		this.parent = parent;

        // 自动监听SUBPAGE事件
        this.listenTo( this, 'beforeswitchin', this.onBeforeSwitchIn );
        this.listenTo( this, 'afterswitchin', this.onAfterSwitchIn );

		SubView.__super__._initialize.call( this, opts );
	},

    /**
     * View所属SubPage即将显示前调用，需子类实现。
     * @method onBeforeSwitchIn
     * @param {object} e
     *      e.from: 当前显示但是即将被替换的子页面
     *      e.to: 即将显示的子页面
     *      e.params: 路由参数
     *          e.params.from: 路由切换时的源页面
     *          e.params.to: 路由切换时的目标页面
     *          e.params.params: 路由参数
     * @override
     */
    onBeforeSwitchIn: noop,

    /**
     * View所属SubPage显示后前调用，需子类实现。
     * @method onAfterSwitchIn
     * @param {object} e
     *      e.from: 当前显示但是即将被替换的子页面
     *      e.to: 即将显示的子页面
     *      e.params: 路由参数
     *          e.params.from: 路由切换时的源页面
     *          e.params.to: 路由切换时的目标页面
     *          e.params.params: 路由参数
     * @override
     */
    onAfterSwitchIn: noop

});
/*jshint camelcase:false*/

/**
 * @fileOverview 页面视图控制器
 */

/**
 * 子视图控制器
 *
 * @class PageView
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 * @param {string} action
 */
var PageView = Chassis.PageView = View.PageView = View.extend({

	_initialize: function( opts, action ) {

		this.action = action;

		this._tops = {};
		this._logicString = this._getLogicString( opts );

		PageView.__super__._initialize.call( this, opts );
	},

	isActive: function() {
        var display = this.$el.css( 'display' );
		return  display !== 'none' && display !== '';
	},

	_getLogicString: function( opts ) {
        return Chassis.$.param( opts || {} ) || '__empty_logic_string__'; 
    },

    savePos: function() {

        // @note: chrome pc (mac or win) 浏览器存在读取值不准确的情况
        this._tops[ this._logicString ] = window.scrollY;
    },

    restorePos: function( opts ) {
        var me = this,
            cls = me._logicString = me._getLogicString( opts );

        // @note: iOS4需要延时
        setTimeout( function() {
            window.scrollTo( 0, me._tops[ cls ] || 0 );
        }, 0 );
    }
});
/*jshint camelcase:false*/

/**
 * @fileOverview 子页面管理
 */

/**
 * 子页面管理器
 * @class SubPageMgr
 * @constructor
 * @namespace Chassis.View
 * @param  {object} opts
 * opts.owner {view} 子页面所属视图
 * [opts.max] {int} 子页面并存上限，超过此上限将回收
 * opts.klass {view} 子页面实例对应的视图类
 * [opts.transition] {string|function} 子页面切换效果，如果是字符串则会从
 * `Chassis.FX[transition]`中调用切换方法；如果是函数则直接调用改函数来处理切换。
 * 对于自定义页面切换函数将接收以下参数：
 * fromEl: 待切出视图元素；
 * toEl: 待切入视图元素；
 * dirFn: 切换方向(0-无方向，1-向左，2-向右)；
 * transitionEnd: 切换完成后的回调，必须在自定义函数中调用；
 * [opts.dirFn] {function} 自定义切换方向(-1-默认，0-无方向，1-向左，2-向右)；
 */
var SPM = Chassis.SubPageMgr = View.SubPageMgr = function( opts ) {
	Chassis.mixin( this, {
		max: 3,

		/*owner,*/

		/*klass,*/
		
		/*dirFn,*/
		transition: 'slider'
	}, opts );

	this._init();
};

Chassis.mixin( SPM.prototype, Events, {

	/**
	 * 获取页面内的识别串，用于同一个页面中不同子页面间的识别
	 * @param  {object} params
	 * @return {string}
	 */
	getStamp: function( params ) {
		return Chassis.$.param( params || {} );
	},

	/**
	 * 添加新的子页面
	 * @param  {subview} subview
	 */
	register: function( subview ) {

		var pages = this.pagesMap;

		if ( !pages[ subview.cid ] ) {
			subview.__order__ = this._order++;
			pages[ subview.cid ] = subview;

			this.pagesList.push( subview );
		}

		return this;
	},

	/**
	 * 查找子页面
	 * @param  {string} key
	 * @param  {string} val
	 * @return {subview}
	 * @example
	 * spm.getBy( 'featureString', ft );
	 */
	getBy: function( key, val ) {

		var pages = this.pagesMap,
			subview,
			cid;

		if ( key === 'cid' ) {
			return pages[ val ];
		}

		for ( cid in pages ) {
			if ( pages.hasOwnProperty( cid ) ) {
				subview = pages[ cid ];

				if ( subview[ key ] === val ) {
					return subview;
				}
			}
		}

		return null;
	},

	/**
	 * 页面切换
	 * @param  {view} from subpage
	 * @param  {view} to subpage
	 * @param  {object} params
	 * params.from page
	 * params.to page
	 * params.params 页面切换参数
	 *
	 * @description 处理逻辑
	 *
	 * 1. 页面内部切换（即params.from === params.to，但是参数不同）
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 显示目标子页面DOM元素
	 *   d2. 调用动画切换
	 *   d3. 隐藏切出子页面DOM元素
	 * 
	 * 2. 页面间切换（即params.from !== params.to)
	 *  a. 根据params生成识别串并在SPM中查找目标子页面
	 *  b. 如果未找到则自动创建目标子页面并加入SPM
	 *  c. 重新设置current
	 *  d. 调用switch切换
	 *   d1. 如果待切出子页面不为空（首次进入params.to时为空）则直接隐藏DOM
	 *   d2. 显示目标子页面DOM元素
	 */
	_switch: function( from, to, params ) {
		var dir = -1,
			fromPage = params.from,
			toPage = params.to,
			me = this,
			evt = {
				from: from,
				to: to,
				params: params
			};

		// 派发事件
		to.trigger( 'beforeswitchin', evt );

		to.$el.show();

		// pageview内部子页面切换
		if ( fromPage === toPage ) {

			if ( this.dirFn ) {
				dir = this.dirFn( from, to );
			}

			if ( dir < 0 ) {
				dir = this._calcDir.apply( this, arguments );
			}


			this._doSwitch( from, to, dir, function() {

				// 隐藏已切出子页面
				if ( from ) {
					from.$el.hide();
				}

				me._setCurrent( to );

				to.trigger( 'afterswitchin', evt );

				// 子页面回收
				me.recycle();
			} );

		// 从其他pageview切换到当前pageview: 子页面显示无需动画效果，直接显示即可
		} else {
			if ( from ) {
				from.$el.hide();
			}

			this._setCurrent( to );

			to.trigger( 'afterswitchin', evt );

			this.recycle();
		}

		return this;
	},

	/**
	 * 自动判断并回收子页面，先入先出。
	 */
	recycle: function() {
		var list = this.pagesList,
			page;

		while ( list.length > this.max ) {
			page = list.shift();

			if ( page === this.current ) {
				list.push( page );
			} else {
				delete this.pagesMap[ page.cid ];
				page.destroy();
			}
		}
	},

	_init: function() {

		// 子页面列表，key为cid
		this.pagesMap = {};

		// 子页面列表，回收时使用
		this.pagesList = [];

		// 当前可见子页面
		this.current = null;

		// 上一可见子页面
		this.previous = null;

		// 子页面序号
		this._order = 0;

		this._boundToView();
	},

	/**
	 * 监听view的切换事件，判断是否需要处理子页面切换逻辑
	 */
	_boundToView: function() {

		var listenTarget = this.owner.root || this.owner;

		// 监听PageView的beforepagein和afterpagein事件
		this.listenTo( listenTarget, 'beforepagein', this._beforePageIn );
		this.listenTo( listenTarget, 'afterpagein', this._afterPageIn );
		
		this.listenTo( this.owner, 'beforedestroy', this._destroy );

	},

	/**
	 * 计算子页面切换方向，可以在dirFn选项中自定义切换方向
	 * @param {subview} 起始子页面
     * @param {subview} 目标子页面
     * @return {int} 方向参数（含义可扩展）：1-向左，2-向右
	 */
	_calcDir: function( from, to ) {

		if ( !from ) {
			return 0;
		}

		var pages = this.pagesMap,
			fromOrder = pages[ from.cid ].__order__,
			toOrder = pages[ to.cid ].__order__;

		return fromOrder > toOrder ? 2 : 1;
	},

	/**
	 * 处理子页面切换
	 * @param  {subview} from
	 * @param  {subview} to
	 * @param  {int} dir 方向参数（含义可扩展）：1-向左，2-向右
	 * @param  {function} transitionEnd
	 */
	_doSwitch: function( from, to, dir, transitionEnd ) {

		var toEl = to.$el,
			fromEl,
			fxFn;

		if ( Chassis.isFunction( this.transition ) ) {
			fxFn = this.transition;
		} else {
			fxFn = Chassis.FX[ this.transition ].animate;
		}

		if ( !fxFn ) {
			return;
		}

		if ( from ) {
			fromEl = from.$el;
		}

		fxFn( fromEl, toEl, dir, transitionEnd );
	},

	/**
	 * 销毁子页面管理器，通常只在子页面管理器所在owner被销毁后执行
	 */
	_destroy: function() {
		this.stopListening();

		this.pagesMap =
				this.pagesList =
				this.current =
				this.previous =
				this.owner = null;
	},

	_beforePageIn: function( e ) {
		var from = e.from,
			to = e.to,
			params = e.params,
			stamp = this.getStamp( params );

		// 跨页面切换到子页面时，当前子页面若不是目标子页面，须提前隐藏，保证切换效果
		if (  from !== to &&
				this.current &&
				stamp !== this.current.stamp ) {
			this.current.$el.hide();
		}
	},

	_afterPageIn: function( e ) {

		var params = e.params,
			owner = this.owner,
			stamp = this.getStamp( params ),
			target = this.getBy( 'stamp', stamp ),
			subpage;

		// 如果子页面不存在则自动创建
		if ( !target ) {

			// TODO: 某些数据可能不允许自动生成subview
			subpage = new this.klass( params || {}, owner );
			subpage.stamp = stamp;

			owner.append( subpage );
			this.register( subpage );

			target = subpage;
		}

		this._switch( this.current, target, e );
	},

	_setCurrent: function( subview ) {
		if ( subview !== this.current ) {
			this.previous = this.current;
			this.current = subview;
		}
	}

	/* TODO

	/**
	 * 从子页面管理器中移除指定页面
	 * @return {[type]}
	 */
	/*
	_remove: function( subview ) {
		var pagesMap = this.pagesMap,
			pagesList = this.pagesList;

		if( pagesMap[ subview.cid ] ) {
			delete pagesMap[ subview.cid ];

			for( var i = 0, len = pagesList.length; i < len; i++ ) {
				if( pagesList[ i ].cid == subview.cid ) {
					pagesList.splice( i, 1 );
					break;
				}
			}

			if( this.current === subview ) {
				//TODO
			}
		}
	}
	*/
} );
/*jshint camelcase:false*/

/**
 * @fileOverview  全局视图控制器
 * 用于管理独立于页面之外，不参与页面事件流的部分，层级上与全局路由同级，能读取全局路由信息
 */

/**
 * 全局视图控制器
 * @class GlobalView
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 * @param {router} router
 */
var GlobalView = Chassis.GlobalView = View.GlobalView = View.extend({

	_initialize: function( opts, router ) {

		this.router = router;
		this.listenTo( router, 'routechange', this._onRouteChange );

		GlobalView.__super__._initialize.call( this, opts );
	},

    /** 
     * 默认路由事件响应函数
     * @param params.from 起始页面视图
     * @param params.to 目标页面视图
     * @param params.views 页面视图列表，以action为索引
     * @param params.params 路由中的参数
     */
    _onRouteChange: function( params ) {
        
        /**
         * 路由事件
         * @event routechange
         * @param {pageview} params.from 起始页面视图
         * @param {pageview} params.to 目标页面视图
         * @param {object} params.views 页面视图列表，以action为索引
         * @param {object} params.params 路由中的参数
         */
        this.trigger( 'routechange', Chassis.mixin( {}, params ) );
    },

    /**
     * 触发页面事件
     * @method triggerPageEvent
     * @param action 页面action名称，多个action可由逗号分隔
     * @param eventName 事件名
     * @params params 事件参数
     */
    triggerPageEvent: function( action, eventName, params ) {
        var me = this,
            actions = action.split( /\s*,\s*/ ),
            pageView;

        Chassis.$.each( actions, function( index, item ) {
            pageView = me.router.views[ item ];

            if ( pageView ) {
                pageView.trigger( eventName, params );
            }
            
        } );
    },

    /**
     * 获取当前活动action
     * @method getCurrentAction
     * @return {string}
     */
    getCurrentAction: function() {
        return this.router && this.router.currentView.action || '';        
    }

});
/**
 * @fileOverview slider 切换效果
 */
Chassis.FX.slider = (function() {

	function generateTransform( x, y, z ) {
        return 'translate' + ($.support.has3d ? '3d' : '') + 
				'(' + x + 'px, ' + y + 'px' +
				($.support.has3d ? (', ' + z + 'px)') : ')');
    }

	return {
		animate: function( fromEl, toEl, dir, transitionEnd ) {

			// 由于多种动画混杂，必须进行位置恢复
			var restore = true,
				clientWidth = document.documentElement.clientWidth;

			if ( dir === 0 ) {
				if ( fromEl !== toEl ) {

					// 先隐藏当前，避免当前页面残留，确保切换效果
					if ( fromEl ) {
						$( fromEl ).hide();
					}
					
					if ( toEl ) {
						$( toEl ).show();
					}

				}

				if ( transitionEnd ) {
					transitionEnd();
				}

				return;
			}

			// 准备位置
			toEl = $( toEl );
			fromEl = $( fromEl );

			fromEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform( 0, 0, 0 ), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial'
			});

			toEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform( (dir === 1 ?
                        '' : '-') + clientWidth, 0, 0 ), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial',
				'display': 'block'
			});

			setTimeout( function() {

				function endAllTransition() {

					// 是否恢复原状，子页面切换使用
					if ( restore ) {
						fromEl.css({
							'display': 'none',
							'-webkit-transform': generateTransform( 0, 0, 0 ), 
							'-webkit-transition-duration': '0ms'
						});

						toEl.css({
							'display': 'block',
							'-webkit-transform': generateTransform( 0, 0, 0 ), 
							'-webkit-transition-duration': '0ms'
						});
					} else {

						fromEl.css({
							'display': 'none'
						});

						toEl.css({
							'display': 'block'
						});
					}
				}

				// 开始动画
				toEl.css({
					'-webkit-transform': generateTransform( 0, 0, 0 ), 
					'-webkit-transition-duration': '350ms'
				});

				fromEl.css({
					'-webkit-transform': generateTransform( (dir === 1 ? '-' :
					'') + clientWidth, 0, 0 ), 
					'-webkit-transition-duration': '350ms'
				});

				setTimeout( function() {
					setTimeout( function() {
						endAllTransition();

						if ( transitionEnd ) {
							transitionEnd();
						}
					}, 0 );
				}, 400 );

			}, 0 );
		}
	};
})();
/**
 * @fileOverview Loading管理
 */

/**
 * Loading管理
 * @class Loading
 * @namespace Chassis.View
 */
var Loading = View.Loading = Chassis.Loading = (function() {

	function isExistedDom( el ) {
		return !!Chassis.$( el )[ 0 ].parentNode;
	}

	function setup( el ) {
		var $el = this.$el = Chassis.$( el ).hide();

		if ( !isExistedDom( $el ) ) {
			Chassis.$( 'body' ).append( $el );
		}
	}

	return {

		/**
		 * 设置全局以及页面Loading所对应的元素
		 * @param  {mixed} globalEl 全局Loading元素
		 * @param  {mixed} [viewEl] 页面Loading元素，如果省略则`viewEl=globalEl`
		 */
		setup: function( globalEl, viewEl ) {
			var argLen = arguments.length;

			if ( !argLen ) {
				return;
			}

			if ( argLen === 1 ) {
				viewEl = globalEl;
			}

			Loading.Global.setup( globalEl );
			Loading.View.setup( viewEl );
		},

		/**
		 * 全局Loading
		 * @class Global
		 * @namespace Chassis.View.Loading
		 */
		Global: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @static
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 显示全局Loading
			 * @method show
			 * @static
			 */
			show: function() {
				this.$el.show();
			},

			/**
			 * 隐藏全局Loading
			 * @method hide
			 * @static
			 */
			hide: function() {
				this.$el.hide();
			}
		},

		/**
		 * 视图Loading
		 * @class View
		 * @namespace Chassis.View.Loading
		 */
		View: {

			/**
			 * 设置Loading元素，可以是已经存在元素的选择符或HTML结构。
			 * @method setup
			 * @static
			 * @param {mixed} el
			 */
			setup: setup,

			/**
			 * 将Loading元素插入View中并显示（如果不指定View则直接显示）
			 * @method show
			 * @static
			 * @param  {View} [view]
			 */
			show: function( view ) {

				Loading.Global.hide();

				if ( view ) {
					view.$el.append( this.$el );
				}

				this.$el.show();
				
			},

			/**
			 * 隐藏Loading
			 * @method hide
			 * @static
			 */
			hide: function() {

				Loading.Global.hide();
				this.$el.remove();
			}
		},

		/**
		 * 将全局方法添加到view中作为原型方法。
		 * @method mixToView
		 * @static
		 */
		mixToView: function() {

			var GL = Loading.Global,
				VL = Loading.View;

			Chassis.mixin( Chassis.View.prototype, {

				showLoading: function() {
					VL.show( this );
				},

				hideLoading: function() {
					VL.hide();
				},

				showGLoading: function() {
					GL.show();
				},

				hideGLoading: function() {
					GL.hide();
				}
			} );
		}
	};
})();

Loading.mixToView();


/**
 * @fileOverview  默认的index
 * 为默认路由为空的情况指定默认pageview
 */
Chassis.PageView.index  = Chassis.PageView.extend({});
})();Chassis.Model.Detail = Chassis.Model.extend( {

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
} );;Chassis.PageView.define( 'detail', {
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
        this.model = new Chassis.Model.Detail();
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function( e ) {

        if ( !this.model.fetched ) {

            this.$el.html( '' );

            this.showLoading();

            // 获取数据
            this.model.fetch({
                data : {
                    id : e.params.albumId
                }
            });

            this.model.fetched = true;

        }
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
} );;Chassis.Model.Index = Chassis.Model.extend( {

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
;Chassis.PageView.define( 'index', {
    
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
        this.model = new Chassis.Model.Index();
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
} );;( function() {
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
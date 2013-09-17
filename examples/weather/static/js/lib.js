// FastClick
function FastClick(e) {
    "use strict";
    var t, n = this;
    this.trackingClick = !1,
    this.trackingClickStart = 0,
    this.targetElement = null,
    this.touchStartX = 0,
    this.touchStartY = 0,
    this.lastTouchIdentifier = 0,
    this.layer = e;
    if (!e || !e.nodeType) throw new TypeError("Layer must be a document node");
    this.onClick = function() {
        return FastClick.prototype.onClick.apply(n, arguments)
    },
    this.onMouse = function() {
        return FastClick.prototype.onMouse.apply(n, arguments)
    },
    this.onTouchStart = function() {
        return FastClick.prototype.onTouchStart.apply(n, arguments)
    },
    this.onTouchEnd = function() {
        return FastClick.prototype.onTouchEnd.apply(n, arguments)
    },
    this.onTouchCancel = function() {
        return FastClick.prototype.onTouchCancel.apply(n, arguments)
    };
    if (typeof window.ontouchstart == "undefined") return;
    this.deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)),
    e.addEventListener("click", this.onClick, !0),
    e.addEventListener("touchstart", this.onTouchStart, !1),
    e.addEventListener("touchend", this.onTouchEnd, !1),
    e.addEventListener("touchcancel", this.onTouchCancel, !1),
    Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, r) {
        var i = Node.prototype.removeEventListener;
        t === "click" ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
    },
    e.addEventListener = function(t, n, r) {
        var i = Node.prototype.addEventListener;
        t === "click" ? i.call(e, t, n.hijacked || (n.hijacked = function(e) {
            e.propagationStopped || n(e)
        }), r) : i.call(e, t, n, r)
    }),
    typeof e.onclick == "function" && (t = e.onclick, e.addEventListener("click",
    function(e) {
        t(e)
    },
    !1), e.onclick = null)
}


function isRetina() {
    return "devicePixelRatio" in window && devicePixelRatio > 1 || "matchMedia" in window && matchMedia("(min-resolution:144dpi)").matches
} (
	function(e, t) {
		function _(e) {
			var t = M[e] = {};
			return v.each(e.split(y),
			function(e, n) {
				t[n] = !0
			}),
			t
		}
		
		function H(e, n, r) {
			if (r === t && e.nodeType === 1) {
				var i = "data-" + n.replace(P, "-$1").toLowerCase();
				r = e.getAttribute(i);
				if (typeof r == "string") {
					try {
						r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null: +r + "" === r ? +r: D.test(r) ? v.parseJSON(r) : r
					} catch(s) {}
					v.data(e, n, r)
				} else r = t
			}
			return r
		}
		
		function B(e) {
			var t;
			for (t in e) {
				if (t === "data" && v.isEmptyObject(e[t])) continue;
				if (t !== "toJSON") return ! 1
			}
			return ! 0
		}
		
		function et() {
			return ! 1
		}
		
		function tt() {
			return ! 0
		}
		
		function ut(e) {
			return ! e || !e.parentNode || e.parentNode.nodeType === 11
		}
		
		function at(e, t) {
			do e = e[t];
			while (e && e.nodeType !== 1);
			return e
		}
		
		function ft(e, t, n) {
			t = t || 0;
			if (v.isFunction(t)) return v.grep(e,
			function(e, r) {
				var i = !!t.call(e, r, e);
				return i === n
			});
			if (t.nodeType) return v.grep(e,
			function(e, r) {
				return e === t === n
			});
			if (typeof t == "string") {
				var r = v.grep(e,
				function(e) {
					return e.nodeType === 1
				});
				if (it.test(t)) return v.filter(t, r, !n);
				t = v.filter(t, r)
			}
			return v.grep(e,
			function(e, r) {
				return v.inArray(e, t) >= 0 === n
			})
		}
		
		function lt(e) {
			var t = ct.split("|"),
			n = e.createDocumentFragment();
			if (n.createElement) while (t.length) n.createElement(t.pop());
			return n
		}
		
		function Lt(e, t) {
			return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
		}
	
		function At(e, t) {
			if (t.nodeType !== 1 || !v.hasData(e)) return;
			var n, r, i, s = v._data(e),
			o = v._data(t, s),
			u = s.events;
			if (u) {
				delete o.handle,
				o.events = {};
				for (n in u) for (r = 0, i = u[n].length; r < i; r++) v.event.add(t, n, u[n][r])
			}
			o.data && (o.data = v.extend({},
			o.data))
		}
		
		function Ot(e, t) {
			var n;
			if (t.nodeType !== 1) return;
			t.clearAttributes && t.clearAttributes(),
			t.mergeAttributes && t.mergeAttributes(e),
			n = t.nodeName.toLowerCase(),
			n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected: n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue: n === "script" && t.text !== e.text && (t.text = e.text),
			t.removeAttribute(v.expando)
		}
		
		function Mt(e) {
			return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
		}
		
		function _t(e) {
			Et.test(e.type) && (e.defaultChecked = e.checked)
		}
		
		function Qt(e, t) {
			if (t in e) return t;
			var n = t.charAt(0).toUpperCase() + t.slice(1),
			r = t,
			i = Jt.length;
			while (i--) {
				t = Jt[i] + n;
				if (t in e) return t
			}
			return r
		}
		
		function Gt(e, t) {
			return e = t || e,
			v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
		}
	
		function Yt(e, t) {
			var n, r, i = [],
			s = 0,
			o = e.length;
			for (; s < o; s++) {
				n = e[s];
				if (!n.style) continue;
				i[s] = v._data(n, "olddisplay"),
				t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
			}
			for (s = 0; s < o; s++) {
				n = e[s];
				if (!n.style) continue;
				if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "": "none"
			}
			return e
		}
		
		function Zt(e, t, n) {
			var r = Rt.exec(t);
			return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
		}
		
		function en(e, t, n, r) {
			var i = n === (r ? "border": "content") ? 4 : t === "width" ? 1 : 0,
			s = 0;
			for (; i < 4; i += 2) n === "margin" && (s += v.css(e, n + $t[i], !0)),
			r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
			return s
		}
		
		function tn(e, t, n) {
			var r = t === "width" ? e.offsetWidth: e.offsetHeight,
			i = !0,
			s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
			if (r <= 0 || r == null) {
				r = Dt(e, t);
				if (r < 0 || r == null) r = e.style[t];
				if (Ut.test(r)) return r;
				i = s && (v.support.boxSizingReliable || r === e.style[t]),
				r = parseFloat(r) || 0
			}
			return r + en(e, t, n || (s ? "border": "content"), i) + "px"
		}
		
		function nn(e) {
			if (Wt[e]) return Wt[e];
			var t = v("<" + e + ">").appendTo(i.body),
			n = t.css("display");
			t.remove();
			if (n === "none" || n === "") {
				Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
					frameBorder: 0,
					width: 0,
					height: 0
				}));
				if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document,
				Ht.write("<!doctype html><html><body>"),
				Ht.close();
				t = Ht.body.appendChild(Ht.createElement(e)),
				n = Dt(t, "display"),
				i.body.removeChild(Pt)
			}
			return Wt[e] = n,
			n
		}
		
		function fn(e, t, n, r) {
			var i;
			if (v.isArray(t)) v.each(t,
			function(t, i) {
				n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t: "") + "]", i, n, r)
			});
			else if (!n && v.type(t) === "object") for (i in t) fn(e + "[" + i + "]", t[i], n, r);
			else r(e, t)
		}
		function Cn(e) {
			return function(t, n) {
				typeof t != "string" && (n = t, t = "*");
				var r, i, s, o = t.toLowerCase().split(y),
				u = 0,
				a = o.length;
				if (v.isFunction(n)) for (; u < a; u++) r = o[u],
				s = /^\+/.test(r),
				s && (r = r.substr(1) || "*"),
				i = e[r] = e[r] || [],
				i[s ? "unshift": "push"](n)
			}
		}
		
		function kn(e, n, r, i, s, o) {
			s = s || n.dataTypes[0],
			o = o || {},
			o[s] = !0;
			var u, a = e[s],
			f = 0,
			l = a ? a.length: 0,
			c = e === Sn;
			for (; f < l && (c || !u); f++) u = a[f](n, r, i),
			typeof u == "string" && (!c || o[u] ? u = t: (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
			return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)),
			u
		}
		function Ln(e, n) {
			var r, i, s = v.ajaxSettings.flatOptions || {};
			for (r in n) n[r] !== t && ((s[r] ? e: i || (i = {}))[r] = n[r]);
			i && v.extend(!0, e, i)
		}
    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
        f = e.dataTypes,
        l = e.responseFields;
        for (s in l) s in r && (n[l[s]] = r[s]);
        while (f[0] === "*") f.shift(),
        i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i) for (s in a) if (a[s] && a[s].test(i)) {
            f.unshift(s);
            break
        }
        if (f[0] in r) o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o) return o !== f[0] && f.unshift(o),
        r[o]
    }
    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
        u = o[0],
        a = {},
        f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1]) for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];) if (i !== "*") {
            if (u !== "*" && u !== i) {
                n = a[u + " " + i] || a["* " + i];
                if (!n) for (r in a) {
                    s = r.split(" ");
                    if (s[1] === i) {
                        n = a[u + " " + s[0]] || a["* " + s[0]];
                        if (n) {
                            n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                            break
                        }
                    }
                }
                if (n !== !0) if (n && e["throws"]) t = n(t);
                else try {
                    t = n(t)
                } catch(l) {
                    return {
                        state: "parsererror",
                        error: n ? l: "No conversion from " + u + " to " + i
                    }
                }
            }
            u = i
        }
        return {
            state: "success",
            data: t
        }
    }
    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch(t) {}
    }
    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch(t) {}
    }
    function $n() {
        return setTimeout(function() {
            qn = t
        },
        0),
        qn = v.now()
    }
    function Jn(e, t) {
        v.each(t,
        function(t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
            i = 0,
            s = r.length;
            for (; i < s; i++) if (r[i].call(e, t, n)) return
        })
    }
    function Kn(e, t, n) {
        var r, i = 0,
        s = 0,
        o = Xn.length,
        u = v.Deferred().always(function() {
            delete a.elem
        }),
        a = function() {
            var t = qn || $n(),
            n = Math.max(0, f.startTime + f.duration - t),
            r = n / f.duration || 0,
            i = 1 - r,
            s = 0,
            o = f.tweens.length;
            for (; s < o; s++) f.tweens[s].run(i);
            return u.notifyWith(e, [f, i, n]),
            i < 1 && o ? n: (u.resolveWith(e, [f]), !1)
        },
        f = u.promise({
            elem: e,
            props: v.extend({},
            t),
            opts: v.extend(!0, {
                specialEasing: {}
            },
            n),
            originalProperties: t,
            originalOptions: n,
            startTime: qn || $n(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n, r) {
                var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                return f.tweens.push(i),
                i
            },
            stop: function(t) {
                var n = 0,
                r = t ? f.tweens.length: 0;
                for (; n < r; n++) f.tweens[n].run(1);
                return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]),
                this
            }
        }),
        l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) return r
        }
        return Jn(f, l),
        v.isFunction(f.opts.start) && f.opts.start.call(e, f),
        v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        })),
        f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }
    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n),
            i = t[r],
            s = e[n],
            v.isArray(s) && (i = s[1], s = e[n] = s[0]),
            n !== r && (e[r] = s, delete e[n]),
            o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s),
                delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }
    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
        p = e.style,
        d = {},
        m = [],
        g = e.nodeType && Gt(e);
        n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
            l.unqueued || c()
        }), l.unqueued++, h.always(function() {
            h.always(function() {
                l.unqueued--,
                v.queue(e, "fx").length || l.empty.fire()
            })
        })),
        e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block": p.zoom = 1)),
        n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r],
                a = a || s === "toggle";
                if (s === (g ? "hide": "show")) continue;
                m.push(r)
            }
        }
        o = m.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}),
            "hidden" in u && (g = u.hidden),
            a && (u.hidden = !g),
            g ? v(e).show() : h.done(function() {
                v(e).hide()
            }),
            h.done(function() {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in d) v.style(e, t, d[t])
            });
            for (r = 0; r < o; r++) i = m[r],
            f = h.createTween(i, g ? u[i] : 0),
            d[i] = u[i] || v.style(e, i),
            i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }
    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }
    function Zn(e, t) {
        var n, r = {
            height: e
        },
        i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = $t[i],
        r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function tr(e) {
        return v.isWindow(e) ? e: e.nodeType === 9 ? e.defaultView || e.parentWindow: !1
    }
    var n, r, i = e.document,
    s = e.location,
    o = e.navigator,
    u = e.jQuery,
    a = e.$,
    f = Array.prototype.push,
    l = Array.prototype.slice,
    c = Array.prototype.indexOf,
    h = Object.prototype.toString,
    p = Object.prototype.hasOwnProperty,
    d = String.prototype.trim,
    v = function(e, t) {
        return new v.fn.init(e, t, n)
    },
    m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
    g = /\S/,
    y = /\s+/,
    b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    S = /^[\],:{}\s]*$/,
    x = /(?:^|:|,)(?:\s*\[)+/g,
    T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
    C = /^-ms-/,
    k = /-([\da-z])/gi,
    L = function(e, t) {
        return (t + "").toUpperCase()
    },
    A = function() {
        i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
    },
    O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function(e, n, r) {
            var s, o, u, a;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e,
            this.length = 1,
            this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1]) return n = n instanceof v ? n[0] : n,
                    a = n && n.nodeType ? n.ownerDocument || n: i,
                    e = v.parseHTML(s[1], a, !0),
                    E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0),
                    v.merge(this, e);
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2]) return r.find(e);
                        this.length = 1,
                        this[0] = o
                    }
                    return this.context = i,
                    this.selector = e,
                    this
                }
                return ! n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return l.call(this)
        },
        get: function(e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this,
            r.context = this.context,
            t === "find" ? r.selector = this.selector + (this.selector ? " ": "") + n: t && (r.selector = this.selector + "." + t + "(" + n + ")"),
            r
        },
        each: function(e, t) {
            return v.each(this, e, t)
        },
        ready: function(e) {
            return v.ready.promise().done(e),
            this
        },
        eq: function(e) {
            return e = +e,
            e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        slice: function() {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(v.map(this,
            function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    },
    v.fn.init.prototype = v.fn,
    v.extend = v.fn.extend = function() {
        var e, n, r, i, s, o, u = arguments[0] || {},
        a = 1,
        f = arguments.length,
        l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {},
        a = 2),
        typeof u != "object" && !v.isFunction(u) && (u = {}),
        f === a && (u = this, --a);
        for (; a < f; a++) if ((e = arguments[a]) != null) for (n in e) {
            r = u[n],
            i = e[n];
            if (u === i) continue;
            l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r: []) : o = r && v.isPlainObject(r) ? r: {},
            u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
        }
        return u
    },
    v.extend({
        noConflict: function(t) {
            return e.$ === v && (e.$ = a),
            t && e.jQuery === v && (e.jQuery = u),
            v
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? v.readyWait++:v.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --v.readyWait: v.isReady) return;
            if (!i.body) return setTimeout(v.ready, 1);
            v.isReady = !0;
            if (e !== !0 && --v.readyWait > 0) return;
            r.resolveWith(i, [v]),
            v.fn.trigger && v(i).trigger("ready").off("ready")
        },
        isFunction: function(e) {
            return v.type(e) === "function"
        },
        isArray: Array.isArray ||
        function(e) {
            return v.type(e) === "array"
        },
        isWindow: function(e) {
            return e != null && e == e.window
        },
        isNumeric: function(e) {
            return ! isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return e == null ? String(e) : O[h.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return ! 1;
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(n) {
                return ! 1
            }
            var r;
            for (r in e);
            return r === t || p.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return ! 1;
            return ! 0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var r;
            return ! e || typeof e != "string" ? null: (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null: []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
        },
        parseJSON: function(t) {
            if (!t || typeof t != "string") return null;
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return (new Function("return " + t))();
            v.error("Invalid JSON: " + t)
        },
        parseXML: function(n) {
            var r, i;
            if (!n || typeof n != "string") return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch(s) {
                r = t
            }
            return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n),
            r
        },
        noop: function() {},
        globalEval: function(t) {
            t && g.test(t) && (e.execScript ||
            function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(C, "ms-").replace(k, L)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, r) {
            var i, s = 0,
            o = e.length,
            u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e) if (n.apply(e[i], r) === !1) break
                } else for (; s < o;) if (n.apply(e[s++], r) === !1) break
            } else if (u) {
                for (i in e) if (n.call(e[i], i, e[i]) === !1) break
            } else for (; s < o;) if (n.call(e[s], s, e[s++]) === !1) break;
            return e
        },
        trim: d && !d.call("锘柯�") ?
        function(e) {
            return e == null ? "": d.call(e)
        }: function(e) {
            return e == null ? "": (e + "").replace(b, "")
        },
        makeArray: function(e, t) {
            var n, r = t || [];
            return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)),
            r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (c) return c.call(t, e, n);
                r = t.length,
                n = n ? n < 0 ? Math.max(0, r + n) : n: 0;
                for (; n < r; n++) if (n in t && t[n] === e) return n
            }
            return - 1
        },
        merge: function(e, n) {
            var r = n.length,
            i = e.length,
            s = 0;
            if (typeof r == "number") for (; s < r; s++) e[i++] = n[s];
            else while (n[s] !== t) e[i++] = n[s++];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            var r, i = [],
            s = 0,
            o = e.length;
            n = !!n;
            for (; s < o; s++) r = !!t(e[s], s),
            n !== r && i.push(e[s]);
            return i
        },
        map: function(e, n, r) {
            var i, s, o = [],
            u = 0,
            a = e.length,
            f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f) for (; u < a; u++) i = n(e[u], u, r),
            i != null && (o[o.length] = i);
            else for (s in e) i = n(e[s], s, r),
            i != null && (o[o.length] = i);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, s;
            return typeof n == "string" && (r = e[n], n = e, e = r),
            v.isFunction(e) ? (i = l.call(arguments, 2), s = function() {
                return e.apply(n, i.concat(l.call(arguments)))
            },
            s.guid = e.guid = e.guid || v.guid++, s) : t
        },
        access: function(e, n, r, i, s, o, u) {
            var a, f = r == null,
            l = 0,
            c = e.length;
            if (r && typeof r == "object") {
                for (l in r) v.access(e, n, l, r[l], 1, o, i);
                s = 1
            } else if (i !== t) {
                a = u === t && v.isFunction(i),
                f && (a ? (a = n, n = function(e, t, n) {
                    return a.call(v(e), n)
                }) : (n.call(e, i), n = null));
                if (n) for (; l < c; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                s = 1
            }
            return s ? e: f ? n.call(e) : c ? n(e[0], r) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    v.ready.promise = function(t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") setTimeout(v.ready, 1);
            else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1),
            e.addEventListener("load", v.ready, !1);
            else {
                i.attachEvent("onreadystatechange", A),
                e.attachEvent("onload", v.ready);
                var n = !1;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch(s) {}
                n && n.doScroll &&
                function o() {
                    if (!v.isReady) {
                        try {
                            n.doScroll("left")
                        } catch(e) {
                            return setTimeout(o, 50)
                        }
                        v.ready()
                    }
                } ()
            }
        }
        return r.promise(t)
    },
    v.each("Boolean Number String Function Array Date RegExp Object".split(" "),
    function(e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    }),
    n = v(i);
    var M = {};
    v.Callbacks = function(e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({},
        e);
        var n, r, i, s, o, u, a = [],
        f = !e.once && [],
        l = function(t) {
            n = e.memory && t,
            r = !0,
            u = s || 0,
            s = 0,
            o = a.length,
            i = !0;
            for (; a && u < o; u++) if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            i = !1,
            a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
        },
        c = {
            add: function() {
                if (a) {
                    var t = a.length; (function r(t) {
                        v.each(t,
                        function(t, n) {
                            var i = v.type(n);
                            i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
                        })
                    })(arguments),
                    i ? o = a.length: n && (s = t, l(n))
                }
                return this
            },
            remove: function() {
                return a && v.each(arguments,
                function(e, t) {
                    var n;
                    while ((n = v.inArray(t, a, n)) > -1) a.splice(n, 1),
                    i && (n <= o && o--, n <= u && u--)
                }),
                this
            },
            has: function(e) {
                return v.inArray(e, a) > -1
            },
            empty: function() {
                return a = [],
                this
            },
            disable: function() {
                return a = f = n = t,
                this
            },
            disabled: function() {
                return ! a
            },
            lock: function() {
                return f = t,
                n || c.disable(),
                this
            },
            locked: function() {
                return ! f
            },
            fireWith: function(e, t) {
                return t = t || [],
                t = [e, t.slice ? t.slice() : t],
                a && (!r || f) && (i ? f.push(t) : l(t)),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! r
            }
        };
        return c
    },
    v.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", v.Callbacks("once memory"), "resolved"], ["reject", "fail", v.Callbacks("once memory"), "rejected"], ["notify", "progress", v.Callbacks("memory")]],
            n = "pending",
            r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return v.Deferred(function(n) {
                        v.each(t,
                        function(t, r) {
                            var s = r[0],
                            o = e[t];
                            i[r[1]](v.isFunction(o) ?
                            function() {
                                var e = o.apply(this, arguments);
                                e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n: this, [e])
                            }: n[s])
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return e != null ? v.extend(e, r) : r
                }
            },
            i = {};
            return r.pipe = r.then,
            v.each(t,
            function(e, s) {
                var o = s[2],
                u = s[3];
                r[s[1]] = o.add,
                u && o.add(function() {
                    n = u
                },
                t[e ^ 1][2].disable, t[2][2].lock),
                i[s[0]] = o.fire,
                i[s[0] + "With"] = o.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t = 0,
            n = l.call(arguments),
            r = n.length,
            i = r !== 1 || e && v.isFunction(e.promise) ? r: 0,
            s = i === 1 ? e: v.Deferred(),
            o = function(e, t, n) {
                return function(r) {
                    t[e] = this,
                    n[e] = arguments.length > 1 ? l.call(arguments) : r,
                    n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                }
            },
            u,
            a,
            f;
            if (r > 1) {
                u = new Array(r),
                a = new Array(r),
                f = new Array(r);
                for (; t < r; t++) n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n),
            s.promise()
        }
    }),
    v.support = function() {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"),
        p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        n = p.getElementsByTagName("*"),
        r = p.getElementsByTagName("a")[0];
        if (!n || !r || !n.length) return {};
        s = i.createElement("select"),
        o = s.appendChild(i.createElement("option")),
        u = p.getElementsByTagName("input")[0],
        r.style.cssText = "top:1px;float:left;opacity:.5",
        t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        u.checked = !0,
        t.noCloneChecked = u.cloneNode(!0).checked,
        s.disabled = !0,
        t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch(d) {
            t.deleteExpando = !1
        } ! p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function() {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)),
        u = i.createElement("input"),
        u.value = "t",
        u.setAttribute("type", "radio"),
        t.radioValue = u.value === "t",
        u.setAttribute("checked", "checked"),
        u.setAttribute("name", "t"),
        p.appendChild(u),
        a = i.createDocumentFragment(),
        a.appendChild(p.lastChild),
        t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
        t.appendChecked = u.checked,
        a.removeChild(u),
        a.appendChild(p);
        if (p.attachEvent) for (l in {
            submit: !0,
            change: !0,
            focusin: !0
        }) f = "on" + l,
        c = f in p,
        c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"),
        t[l + "Bubbles"] = c;
        return v(function() {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
            a = i.getElementsByTagName("body")[0];
            if (!a) return;
            n = i.createElement("div"),
            n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            a.insertBefore(n, a.firstChild),
            r = i.createElement("div"),
            n.appendChild(r),
            r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            s = r.getElementsByTagName("td"),
            s[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            c = s[0].offsetHeight === 0,
            s[0].style.display = "",
            s[1].style.display = "none",
            t.reliableHiddenOffsets = c && s[0].offsetHeight === 0,
            r.innerHTML = "",
            r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            t.boxSizing = r.offsetWidth === 4,
            t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1,
            e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)),
            typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1),
            a.removeChild(n),
            n = r = s = o = null
        }),
        a.removeChild(p),
        n = r = s = o = u = a = p = null,
        t
    } ();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando],
            !!e && !B(e)
        },
        data: function(e, n, r, i) {
            if (!v.acceptData(e)) return;
            var s, o, u = v.expando,
            a = typeof n == "string",
            f = e.nodeType,
            l = f ? v.cache: e,
            c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++:c = u),
            l[c] || (l[c] = {},
            f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            return s = l[c],
            i || (s.data || (s.data = {}), s = s.data),
            r !== t && (s[v.camelCase(n)] = r),
            a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s,
            o
        },
        removeData: function(e, t, n) {
            if (!v.acceptData(e)) return;
            var r, i, s, o = e.nodeType,
            u = o ? v.cache: e,
            a = o ? e[v.expando] : v.expando;
            if (!u[a]) return;
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, s = t.length; i < s; i++) delete r[t[i]];
                    if (! (n ? B: v.isEmptyObject)(r)) return
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) return
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
        },
        _data: function(e, t, n) {
            return v.data(e, t, n, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return ! t || t !== !0 && e.getAttribute("classid") === t
        }
    }),
    v.fn.extend({
        data: function(e, n) {
            var r, i, s, o, u, a = this[0],
            f = 0,
            l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) o = s[f].name,
                        o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                        v._data(a, "parsedAttrs", !0)
                    }
                }
                return l
            }
            return typeof e == "object" ? this.each(function() {
                v.data(this, e)
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this,
            function(n) {
                if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]),
                l === t && a && (l = v.data(a, e), l = H(a, e, l)),
                l === t && r[1] ? this.data(r[0]) : l;
                r[1] = n,
                this.each(function() {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r),
                    v.data(this, e, n),
                    t.triggerHandler("changeData" + i, r)
                })
            },
            null, n, arguments.length > 1, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                v.removeData(this, e)
            })
        }
    }),
    v.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue",
            r = v._data(e, t),
            n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)),
            r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
            r = n.length,
            i = n.shift(),
            s = v._queueHooks(e, t),
            o = function() {
                v.dequeue(e, t)
            };
            i === "inprogress" && (i = n.shift(), r--),
            i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)),
            !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                empty: v.Callbacks("once memory").add(function() {
                    v.removeData(e, t + "queue", !0),
                    v.removeData(e, n, !0)
                })
            })
        }
    }),
    v.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--),
            arguments.length < r ? v.queue(this[0], e) : n === t ? this: this.each(function() {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e),
                e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                v.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = v.fx ? v.fx.speeds[e] || e: e,
            t = t || "fx",
            this.queue(t,
            function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
            s = v.Deferred(),
            o = this,
            u = this.length,
            a = function() {--i || s.resolveWith(o, [o])
            };
            typeof e != "string" && (n = e, e = t),
            e = e || "fx";
            while (u--) r = v._data(o[u], e + "queueHooks"),
            r && r.empty && (i++, r.empty.add(a));
            return a(),
            s.promise(n)
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
    R = /\r/g,
    U = /^(?:button|input)$/i,
    z = /^(?:button|input|object|select|textarea)$/i,
    W = /^a(?:rea|)$/i,
    X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function(e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                v.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = v.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = t,
                    delete this[e]
                } catch(n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;
                    else {
                        s = " " + i.className + " ";
                        for (o = 0, u = t.length; o < u; o++) s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                        i.className = v.trim(s)
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++) while (r.indexOf(" " + n[s] + " ") >= 0) r = r.replace(" " + n[s] + " ", " ");
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
            r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function(n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, s = 0,
                    o = v(this),
                    u = t,
                    a = e.split(y);
                    while (i = a[s++]) u = r ? u: !o.hasClass(i),
                    o[u ? "addClass": "removeClass"](i)
                } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className),
                this.className = this.className || e === !1 ? "": v._data(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
            n = 0,
            r = this.length;
            for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return ! 0;
            return ! 1
        },
        val: function(e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()],
                n && "get" in n && (r = n.get(s, "value")) !== t ? r: (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "": r);
                return
            }
            return i = v.isFunction(e),
            this.each(function(r) {
                var s, o = v(this);
                if (this.nodeType !== 1) return;
                i ? s = e.call(this, r, o.val()) : s = e,
                s == null ? s = "": typeof s == "number" ? s += "": v.isArray(s) && (s = v.map(s,
                function(e) {
                    return e == null ? "": e + ""
                })),
                n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s
            })
        }
    }),
    v.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return ! t || t.specified ? e.value: e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                    i = e.selectedIndex,
                    s = e.type === "select-one" || i < 0,
                    o = s ? null: [],
                    u = s ? i + 1 : r.length,
                    a = i < 0 ? u: s ? i: 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled: n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                            t = v(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n = v.makeArray(t);
                    return v(e).find("option").each(function() {
                        this.selected = v.inArray(v(this).val(), n) >= 0
                    }),
                    n.length || (e.selectedIndex = -1),
                    n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) return;
            if (i && v.isFunction(v.fn[n])) return v(e)[n](r);
            if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);
            u = a !== 1 || !v.isXMLDoc(e),
            u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F: j));
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return
                }
                return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s: (e.setAttribute(n, r + ""), r)
            }
            return o && "get" in o && u && (s = o.get(e, n)) !== null ? s: (s = e.getAttribute(n), s === null ? t: s)
        },
        removeAttr: function(e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) i = r[o],
                i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i: n), s && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");
                    else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value: null
                },
                set: function(e, t, n) {
                    if (j && v.nodeName(e, "button")) return j.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) return;
            return o = u !== 1 || !v.isXMLDoc(e),
            o && (n = v.propFix[n] || n, s = v.propHooks[n]),
            r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i: e[n] = r: s && "get" in s && (i = s.get(e, n)) !== null ? i: e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }),
    F = {
        get: function(e, n) {
            var r, i = v.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())),
            n
        }
    },
    V || (I = {
        name: !0,
        id: !0,
        coords: !0
    },
    j = v.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n),
            r && (I[n] ? r.value !== "": r.specified) ? r.value: t
        },
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = i.createAttribute(n), e.setAttributeNode(r)),
            r.value = t + ""
        }
    },
    v.each(["width", "height"],
    function(e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {
            set: function(e, n) {
                if (n === "") return e.setAttribute(t, "auto"),
                n
            }
        })
    }), v.attrHooks.contenteditable = {
        get: j.get,
        set: function(e, t, n) {
            t === "" && (t = "false"),
            j.set(e, t, n)
        }
    }),
    v.support.hrefNormalized || v.each(["href", "src", "width", "height"],
    function(e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t: r
            }
        })
    }),
    v.support.style || (v.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }),
    v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
        }
    })),
    v.support.enctype || (v.propFix.enctype = "encoding"),
    v.support.checkOn || v.each(["radio", "checkbox"],
    function() {
        v.valHooks[this] = {
            get: function(e) {
                return e.getAttribute("value") === null ? "on": e.value
            }
        }
    }),
    v.each(["radio", "checkbox"],
    function() {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function(e, t) {
                if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
    J = /^([^\.]*|)(?:\.(.+)|)$/,
    K = /(?:^|\s)hover(\.\S+|)\b/,
    Q = /^key/,
    G = /^(?:mouse|contextmenu)|click/,
    Y = /^(?:focusinfocus|focusoutblur)$/,
    Z = function(e) {
        return v.event.special.hover ? e: e.replace(K, "mouseenter$1 mouseleave$1")
    };
    v.event = {
        add: function(e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;
            r.handler && (d = r, r = d.handler, s = d.selector),
            r.guid || (r.guid = v.guid++),
            a = o.events,
            a || (o.events = a = {}),
            u = o.handle,
            u || (o.handle = u = function(e) {
                return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t: v.event.dispatch.apply(u.elem, arguments)
            },
            u.elem = e),
            n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [],
                c = l[1],
                h = (l[2] || "").split(".").sort(),
                g = v.event.special[c] || {},
                c = (s ? g.delegateType: g.bindType) || c,
                g = v.event.special[c] || {},
                p = v.extend({
                    type: c,
                    origType: l[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && v.expr.match.needsContext.test(s),
                    namespace: h.join(".")
                },
                d),
                m = a[c];
                if (!m) {
                    m = a[c] = [],
                    m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === !1) e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                }
                g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)),
                s ? m.splice(m.delegateCount++, 0, p) : m.push(p),
                v.event.global[c] = !0
            }
            e = null
        },
        global: {},
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events)) return;
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [],
                u = a = o[1],
                f = o[2];
                if (!u) {
                    for (u in h) v.event.remove(e, u + t[s], n, r, !0);
                    continue
                }
                p = v.event.special[u] || {},
                u = (r ? p.delegateType: p.bindType) || u,
                d = h[u] || [],
                l = d.length,
                f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++) m = d[c],
                (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
                d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
            }
            v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, r, s, o) {
            if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                b = [];
                if (Y.test(y + v.event.triggered)) return;
                y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0),
                y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
                if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;
                n = typeof n == "object" ? n[v.expando] ? n: new v.Event(y, n) : new v.Event(y),
                n.type = y,
                n.isTrigger = !0,
                n.exclusive = a,
                n.namespace = b.join("."),
                n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                h = y.indexOf(":") < 0 ? "on" + y: "";
                if (!s) {
                    u = v.cache;
                    for (f in u) u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                    return
                }
                n.result = t,
                n.target || (n.target = s),
                r = r != null ? v.makeArray(r) : [],
                r.unshift(n),
                p = v.event.special[y] || {};
                if (p.trigger && p.trigger.apply(s, r) === !1) return;
                m = [[s, p.bindType || y]];
                if (!o && !p.noBubble && !v.isWindow(s)) {
                    g = p.delegateType || y,
                    l = Y.test(g + y) ? s: s.parentNode;
                    for (c = s; l; l = l.parentNode) m.push([l, g]),
                    c = l;
                    c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
                }
                for (f = 0; f < m.length && !n.isPropagationStopped(); f++) l = m[f][0],
                n.type = m[f][1],
                d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"),
                d && d.apply(l, r),
                d = h && l[h],
                d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                return n.type = y,
                !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)),
                n.result
            }
            return
        },
        dispatch: function(n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
            m = d.delegateCount,
            g = l.call(arguments),
            y = !n.exclusive && !n.namespace,
            b = v.event.special[n.type] || {},
            w = [];
            g[0] = n,
            n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;
            if (m && (!n.button || n.type !== "click")) for (s = n.target; s != this; s = s.parentNode || this) if (s.disabled !== !0 || n.type !== "click") {
                u = {},
                f = [];
                for (r = 0; r < m; r++) c = d[r],
                h = c.selector,
                u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length),
                u[h] && f.push(c);
                f.length && w.push({
                    elem: s,
                    matches: f
                })
            }
            d.length > m && w.push({
                elem: this,
                matches: d.slice(m)
            });
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r],
                n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data,
                    n.handleObj = c,
                    o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g),
                    o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
                }
            }
            return b.postDispatch && b.postDispatch.call(this, n),
            n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode: t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, s, o, u = n.button,
                a = n.fromElement;
                return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement: a),
                !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
                e
            }
        },
        fix: function(e) {
            if (e[v.expando]) return e;
            var t, n, r = e,
            s = v.event.fixHooks[e.type] || {},
            o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;) n = o[--t],
            e[n] = r[n];
            return e.target || (e.target = r.srcElement || i),
            e.target.nodeType === 3 && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    v.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    v.event.handle = v.event.dispatch,
    v.removeEvent = i.removeEventListener ?
    function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }: function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
    },
    v.Event = function(e, t) {
        if (! (this instanceof v.Event)) return new v.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt: et) : this.type = e,
        t && v.extend(this, t),
        this.timeStamp = e && e.timeStamp || v.now(),
        this[v.expando] = !0
    },
    v.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        stopPropagation: function() {
            this.isPropagationStopped = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = tt,
            this.stopPropagation()
        },
        isDefaultPrevented: et,
        isPropagationStopped: et,
        isImmediatePropagationStopped: et
    },
    v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                i = e.relatedTarget,
                s = e.handleObj,
                o = s.selector;
                if (!i || i !== r && !v.contains(r, i)) e.type = s.origType,
                n = s.handler.apply(this, arguments),
                e.type = t;
                return n
            }
        }
    }),
    v.support.submitBubbles || (v.event.special.submit = {
        setup: function() {
            if (v.nodeName(this, "form")) return ! 1;
            v.event.add(this, "click._submit keypress._submit",
            function(e) {
                var n = e.target,
                r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form: t;
                r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit",
                function(e) {
                    e._submit_bubble = !0
                }), v._data(r, "_submit_attached", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            if (v.nodeName(this, "form")) return ! 1;
            v.event.remove(this, "._submit")
        }
    }),
    v.support.changeBubbles || (v.event.special.change = {
        setup: function() {
            if ($.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change",
                function(e) {
                    e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }),
                v.event.add(this, "click._change",
                function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1),
                    v.event.simulate("change", this, e, !0)
                });
                return ! 1
            }
            v.event.add(this, "beforeactivate._change",
            function(e) {
                var t = e.target;
                $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change",
                function(e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
                }), v._data(t, "_change_attached", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return v.event.remove(this, "._change"),
            !$.test(this.nodeName)
        }
    }),
    v.support.focusinBubbles || v.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(e, t) {
        var n = 0,
        r = function(e) {
            v.event.simulate(t, e.target, v.event.fix(e), !0)
        };
        v.event.special[t] = {
            setup: function() {
                n++===0 && i.addEventListener(e, r, !0)
            },
            teardown: function() {--n === 0 && i.removeEventListener(e, r, !0)
            }
        }
    }),
    v.fn.extend({
        on: function(e, n, r, i, s) {
            var o, u;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (u in e) this.on(u, n, r, e[u], s);
                return this
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1) i = et;
            else if (!i) return this;
            return s === 1 && (o = i, i = function(e) {
                return v().off(e),
                o.apply(this, arguments)
            },
            i.guid = o.guid || (o.guid = v.guid++)),
            this.each(function() {
                v.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
            v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
            this;
            if (typeof e == "object") {
                for (s in e) this.off(s, n, e[s]);
                return this
            }
            if (n === !1 || typeof n == "function") r = n,
            n = t;
            return r === !1 && (r = et),
            this.each(function() {
                v.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            return v(this.context).on(e, this.selector, t, n),
            this
        },
        die: function(e, t) {
            return v(this.context).off(e, this.selector || "**", t),
            this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                v.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0]) return v.event.trigger(e, t, this[0], !0)
        },
        toggle: function(e) {
            var t = arguments,
            n = e.guid || v.guid++,
            r = 0,
            i = function(n) {
                var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                return v._data(this, "lastToggle" + e.guid, i + 1),
                n.preventDefault(),
                t[i].apply(this, arguments) || !1
            };
            i.guid = n;
            while (r < t.length) t[r++].guid = n;
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(e, t) {
        v.fn[t] = function(e, n) {
            return n == null && (n = e, e = null),
            arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        },
        Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks),
        G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
    }),
    function(e, t) {
        function nt(e, t, n, r) {
            n = n || [],
            t = t || g;
            var i, s, a, f, l = t.nodeType;
            if (!e || typeof e != "string") return n;
            if (l !== 1 && l !== 9) return [];
            a = o(t);
            if (!a && !r) if (i = R.exec(e)) if (f = i[1]) {
                if (l === 9) {
                    s = t.getElementById(f);
                    if (!s || !s.parentNode) return n;
                    if (s.id === f) return n.push(s),
                    n
                } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s),
                n
            } else {
                if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)),
                n;
                if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)),
                n
            }
            return vt(e.replace(j, "$1"), t, n, r, a)
        }
        function rt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }
        function it(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }
        function st(e) {
            return N(function(t) {
                return t = +t,
                N(function(n, r) {
                    var i, s = e([], n.length, t),
                    o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function ot(e, t, n) {
            if (e === t) return n;
            var r = e.nextSibling;
            while (r) {
                if (r === t) return - 1;
                r = r.nextSibling
            }
            return 1
        }
        function ut(e, t) {
            var n, r, s, o, u, a, f, l = L[d][e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e,
            a = [],
            f = i.preFilter;
            while (u) {
                if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u),
                a.push(s = []);
                n = !1;
                if (r = I.exec(u)) s.push(n = new m(r.shift())),
                u = u.slice(n.length),
                n.type = r[0].replace(j, " ");
                for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                if (!n) break
            }
            return t ? u.length: u ? nt.error(e) : L(e, a).slice(0)
        }
        function at(e, t, r) {
            var i = t.dir,
            s = r && t.dir === "parentNode",
            o = w++;
            return t.first ?
            function(t, n, r) {
                while (t = t[i]) if (s || t.nodeType === 1) return e(t, n, r)
            }: function(t, r, u) {
                if (!u) {
                    var a, f = b + " " + o + " ",
                    l = f + n;
                    while (t = t[i]) if (s || t.nodeType === 1) {
                        if ((a = t[d]) === l) return t.sizset;
                        if (typeof a == "string" && a.indexOf(f) === 0) {
                            if (t.sizset) return t
                        } else {
                            t[d] = l;
                            if (e(t, r, u)) return t.sizset = !0,
                            t;
                            t.sizset = !1
                        }
                    }
                } else while (t = t[i]) if (s || t.nodeType === 1) if (e(t, r, u)) return t
            }
        }
        function ft(e) {
            return e.length > 1 ?
            function(t, n, r) {
                var i = e.length;
                while (i--) if (!e[i](t, n, r)) return ! 1;
                return ! 0
            }: e[0]
        }
        function lt(e, t, n, r, i) {
            var s, o = [],
            u = 0,
            a = e.length,
            f = t != null;
            for (; u < a; u++) if (s = e[u]) if (!n || n(s, r, i)) o.push(s),
            f && t.push(u);
            return o
        }
        function ct(e, t, n, r, i, s) {
            return r && !r[d] && (r = ct(r)),
            i && !i[d] && (i = ct(i, s)),
            N(function(s, o, u, a) {
                var f, l, c, h = [],
                p = [],
                d = o.length,
                v = s || dt(t || "*", u.nodeType ? [u] : u, []),
                m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                g = n ? i || (s ? e: d || r) ? [] : o: m;
                n && n(m, g, u, a);
                if (r) {
                    f = lt(g, p),
                    r(f, [], u, a),
                    l = f.length;
                    while (l--) if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [],
                            l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = lt(g === o ? g.splice(d, g.length) : g),
                i ? i(null, o, g, a) : S.apply(o, g)
            })
        }
        function ht(e) {
            var t, n, r, s = e.length,
            o = i.relative[e[0].type],
            u = o || i.relative[" "],
            a = o ? 1 : 0,
            f = at(function(e) {
                return e === t
            },
            u, !0),
            l = at(function(e) {
                return T.call(t, e) > -1
            },
            u, !0),
            h = [function(e, n, r) {
                return ! o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
            }];
            for (; a < s; a++) if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
            else {
                n = i.filter[e[a].type].apply(null, e[a].matches);
                if (n[d]) {
                    r = ++a;
                    for (; r < s; r++) if (i.relative[e[r].type]) break;
                    return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                }
                h.push(n)
            }
            return ft(h)
        }
        function pt(e, t) {
            var r = t.length > 0,
            s = e.length > 0,
            o = function(u, a, f, l, h) {
                var p, d, v, m = [],
                y = 0,
                w = "0",
                x = u && [],
                T = h != null,
                N = c,
                C = u || s && i.find.TAG("*", h && a.parentNode || a),
                k = b += N == null ? 1 : Math.E;
                T && (c = a !== g && a, n = o.el);
                for (; (p = C[w]) != null; w++) {
                    if (s && p) {
                        for (d = 0; v = e[d]; d++) if (v(p, a, f)) {
                            l.push(p);
                            break
                        }
                        T && (b = k, n = ++o.el)
                    }
                    r && ((p = !v && p) && y--, u && x.push(p))
                }
                y += w;
                if (r && w !== y) {
                    for (d = 0; v = t[d]; d++) v(x, m, a, f);
                    if (u) {
                        if (y > 0) while (w--) ! x[w] && !m[w] && (m[w] = E.call(l));
                        m = lt(m)
                    }
                    S.apply(l, m),
                    T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                }
                return T && (b = k, c = N),
                x
            };
            return o.el = 0,
            r ? N(o) : o
        }
        function dt(e, t, n) {
            var r = 0,
            i = t.length;
            for (; r < i; r++) nt(e, t[r], n);
            return n
        }
        function vt(e, t, n, r, s) {
            var o, u, f, l, c, h = ut(e),
            p = h.length;
            if (!r && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                    t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                    if (!t) return n;
                    e = e.slice(u.shift().length)
                }
                for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                    f = u[o];
                    if (i.relative[l = f.type]) break;
                    if (c = i.find[l]) if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                        u.splice(o, 1),
                        e = r.length && u.join("");
                        if (!e) return S.apply(n, x.call(r, 0)),
                        n;
                        break
                    }
                }
            }
            return a(e, h)(r, t, s, n, z.test(e)),
            n
        }
        function mt() {}
        var n, r, i, s, o, u, a, f, l, c, h = !0,
        p = "undefined",
        d = ("sizcache" + Math.random()).replace(".", ""),
        m = String,
        g = e.document,
        y = g.documentElement,
        b = 0,
        w = 0,
        E = [].pop,
        S = [].push,
        x = [].slice,
        T = [].indexOf ||
        function(e) {
            var t = 0,
            n = this.length;
            for (; t < n; t++) if (this[t] === e) return t;
            return - 1
        },
        N = function(e, t) {
            return e[d] = t == null || t,
            e
        },
        C = function() {
            var e = {},
            t = [];
            return N(function(n, r) {
                return t.push(n) > i.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            },
            e)
        },
        k = C(),
        L = C(),
        A = C(),
        O = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
        _ = M.replace("w", "w#"),
        D = "([*^$|!~]?=)",
        P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
        H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
        B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
        j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
        F = new RegExp("^" + O + "*," + O + "*"),
        I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
        q = new RegExp(H),
        R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        U = /^:not/,
        z = /[\x20\t\r\n\f]*[+~]/,
        W = /:not\($/,
        X = /h\d/i,
        V = /input|select|textarea|button/i,
        $ = /\\(?!\\)/g,
        J = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
            TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + P),
            PSEUDO: new RegExp("^" + H),
            POS: new RegExp(B, "i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
            needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
        },
        K = function(e) {
            var t = g.createElement("div");
            try {
                return e(t)
            } catch(n) {
                return ! 1
            } finally {
                t = null
            }
        },
        Q = K(function(e) {
            return e.appendChild(g.createComment("")),
            !e.getElementsByTagName("*").length
        }),
        G = K(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
        }),
        Y = K(function(e) {
            e.innerHTML = "<select></select>";
            var t = typeof e.lastChild.getAttribute("multiple");
            return t !== "boolean" && t !== "string"
        }),
        Z = K(function(e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
        }),
        et = K(function(e) {
            e.id = d + 0,
            e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>",
            y.insertBefore(e, y.firstChild);
            var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
            return r = !g.getElementById(d),
            y.removeChild(e),
            t
        });
        try {
            x.call(y.childNodes, 0)[0].nodeType
        } catch(tt) {
            x = function(e) {
                var t, n = [];
                for (; t = this[e]; e++) n.push(t);
                return n
            }
        }
        nt.matches = function(e, t) {
            return nt(e, null, null, t)
        },
        nt.matchesSelector = function(e, t) {
            return nt(t, null, null, [e]).length > 0
        },
        s = nt.getText = function(e) {
            var t, n = "",
            r = 0,
            i = e.nodeType;
            if (i) {
                if (i === 1 || i === 9 || i === 11) {
                    if (typeof e.textContent == "string") return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
                } else if (i === 3 || i === 4) return e.nodeValue
            } else for (; t = e[r]; r++) n += s(t);
            return n
        },
        o = nt.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML": !1
        },
        u = nt.contains = y.contains ?
        function(e, t) {
            var n = e.nodeType === 9 ? e.documentElement: e,
            r = t && t.parentNode;
            return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
        }: y.compareDocumentPosition ?
        function(e, t) {
            return t && !!(e.compareDocumentPosition(t) & 16)
        }: function(e, t) {
            while (t = t.parentNode) if (t === e) return ! 0;
            return ! 1
        },
        nt.attr = function(e, t) {
            var n, r = o(e);
            return r || (t = t.toLowerCase()),
            (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t: null: n.specified ? n.value: null: null)
        },
        i = nt.selectors = {
            cacheLength: 50,
            createPseudo: N,
            match: J,
            attrHandle: G ? {}: {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: r ?
                function(e, t, n) {
                    if (typeof t.getElementById !== p && !n) {
                        var r = t.getElementById(e);
                        return r && r.parentNode ? [r] : []
                    }
                }: function(e, n, r) {
                    if (typeof n.getElementById !== p && !r) {
                        var i = n.getElementById(e);
                        return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t: []
                    }
                },
                TAG: Q ?
                function(e, t) {
                    if (typeof t.getElementsByTagName !== p) return t.getElementsByTagName(e)
                }: function(e, t) {
                    var n = t.getElementsByTagName(e);
                    if (e === "*") {
                        var r, i = [],
                        s = 0;
                        for (; r = n[s]; s++) r.nodeType === 1 && i.push(r);
                        return i
                    }
                    return n
                },
                NAME: et &&
                function(e, t) {
                    if (typeof t.getElementsByName !== p) return t.getElementsByName(name)
                },
                CLASS: Z &&
                function(e, t, n) {
                    if (typeof t.getElementsByClassName !== p && !n) return t.getElementsByClassName(e)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace($, ""),
                    e[3] = (e[4] || e[5] || "").replace($, ""),
                    e[2] === "~=" && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n;
                    if (J.CHILD.test(e[0])) return null;
                    if (e[3]) e[2] = e[3];
                    else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)),
                    e[2] = t;
                    return e.slice(0, 3)
                }
            },
            filter: {
                ID: r ?
                function(e) {
                    return e = e.replace($, ""),
                    function(t) {
                        return t.getAttribute("id") === e
                    }
                }: function(e) {
                    return e = e.replace($, ""),
                    function(t) {
                        var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                },
                TAG: function(e) {
                    return e === "*" ?
                    function() {
                        return ! 0
                    }: (e = e.replace($, "").toLowerCase(),
                    function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function(e) {
                    var t = k[d][e + " "];
                    return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e,
                    function(e) {
                        return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r, i) {
                        var s = nt.attr(r, e);
                        return s == null ? t === "!=": t ? (s += "", t === "=" ? s === n: t === "!=" ? s !== n: t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n: t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-": !1) : !0
                    }
                },
                CHILD: function(e, t, n, r) {
                    return e === "nth" ?
                    function(e) {
                        var t, i, s = e.parentNode;
                        if (n === 1 && r === 0) return ! 0;
                        if (s) {
                            i = 0;
                            for (t = s.firstChild; t; t = t.nextSibling) if (t.nodeType === 1) {
                                i++;
                                if (e === t) break
                            }
                        }
                        return i -= r,
                        i === n || i % n === 0 && i / n >= 0
                    }: function(t) {
                        var n = t;
                        switch (e) {
                        case "only":
                        case "first":
                            while (n = n.previousSibling) if (n.nodeType === 1) return ! 1;
                            if (e === "first") return ! 0;
                            n = t;
                        case "last":
                            while (n = n.nextSibling) if (n.nodeType === 1) return ! 1;
                            return ! 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                    return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
                        var i, s = r(e, t),
                        o = s.length;
                        while (o--) i = T.call(e, s[o]),
                        e[i] = !(n[i] = s[o])
                    }) : function(e) {
                        return r(e, 0, n)
                    }) : r
                }
            },
            pseudos: {
                not: N(function(e) {
                    var t = [],
                    n = [],
                    r = a(e.replace(j, "$1"));
                    return r[d] ? N(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                        u = e.length;
                        while (u--) if (s = o[u]) e[u] = !(t[u] = s)
                    }) : function(e, i, s) {
                        return t[0] = e,
                        r(t, null, s, n),
                        !n.pop()
                    }
                }),
                has: N(function(e) {
                    return function(t) {
                        return nt(e, t).length > 0
                    }
                }),
                contains: N(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                    }
                }),
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !!e.checked || t === "option" && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                parent: function(e) {
                    return ! i.pseudos.empty(e)
                },
                empty: function(e) {
                    var t;
                    e = e.firstChild;
                    while (e) {
                        if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return ! 1;
                        e = e.nextSibling
                    }
                    return ! 0
                },
                header: function(e) {
                    return X.test(e.nodeName)
                },
                text: function(e) {
                    var t, n;
                    return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                },
                radio: rt("radio"),
                checkbox: rt("checkbox"),
                file: rt("file"),
                password: rt("password"),
                image: rt("image"),
                submit: it("submit"),
                reset: it("reset"),
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                input: function(e) {
                    return V.test(e.nodeName)
                },
                focus: function(e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: st(function() {
                    return [0]
                }),
                last: st(function(e, t) {
                    return [t - 1]
                }),
                eq: st(function(e, t, n) {
                    return [n < 0 ? n + t: n]
                }),
                even: st(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: st(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: st(function(e, t, n) {
                    for (var r = n < 0 ? n + t: n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: st(function(e, t, n) {
                    for (var r = n < 0 ? n + t: n; ++r < t;) e.push(r);
                    return e
                })
            }
        },
        f = y.compareDocumentPosition ?
        function(e, t) {
            return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition: e.compareDocumentPosition(t) & 4) ? -1 : 1
        }: function(e, t) {
            if (e === t) return l = !0,
            0;
            if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
            var n, r, i = [],
            s = [],
            o = e.parentNode,
            u = t.parentNode,
            a = o;
            if (o === u) return ot(e, t);
            if (!o) return - 1;
            if (!u) return 1;
            while (a) i.unshift(a),
            a = a.parentNode;
            a = u;
            while (a) s.unshift(a),
            a = a.parentNode;
            n = i.length,
            r = s.length;
            for (var f = 0; f < n && f < r; f++) if (i[f] !== s[f]) return ot(i[f], s[f]);
            return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
        },
        [0, 0].sort(f),
        h = !l,
        nt.uniqueSort = function(e) {
            var t, n = [],
            r = 1,
            i = 0;
            l = h,
            e.sort(f);
            if (l) {
                for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                while (i--) e.splice(n[i], 1)
            }
            return e
        },
        nt.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        },
        a = nt.compile = function(e, t) {
            var n, r = [],
            i = [],
            s = A[d][e + " "];
            if (!s) {
                t || (t = ut(e)),
                n = t.length;
                while (n--) s = ht(t[n]),
                s[d] ? r.push(s) : i.push(s);
                s = A(e, pt(i, r))
            }
            return s
        },
        g.querySelectorAll &&
        function() {
            var e, t = vt,
            n = /'|\\/g,
            r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            i = [":focus"],
            s = [":active"],
            u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
            K(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>",
                e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                e.querySelectorAll(":checked").length || i.push(":checked")
            }),
            K(function(e) {
                e.innerHTML = "<p test=''></p>",
                e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"),
                e.innerHTML = "<input type='hidden'/>",
                e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
            }),
            i = new RegExp(i.join("|")),
            vt = function(e, r, s, o, u) {
                if (!o && !u && !i.test(e)) {
                    var a, f, l = !0,
                    c = d,
                    h = r,
                    p = r.nodeType === 9 && e;
                    if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                        a = ut(e),
                        (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c),
                        c = "[id='" + c + "'] ",
                        f = a.length;
                        while (f--) a[f] = c + a[f].join("");
                        h = z.test(e) && r.parentNode || r,
                        p = a.join(",")
                    }
                    if (p) try {
                        return S.apply(s, x.call(h.querySelectorAll(p), 0)),
                        s
                    } catch(v) {} finally {
                        l || r.removeAttribute("id")
                    }
                }
                return t(e, r, s, o, u)
            },
            u && (K(function(t) {
                e = u.call(t, "div");
                try {
                    u.call(t, "[test!='']:sizzle"),
                    s.push("!=", H)
                } catch(n) {}
            }), s = new RegExp(s.join("|")), nt.matchesSelector = function(t, n) {
                n = n.replace(r, "='$1']");
                if (!o(t) && !s.test(n) && !i.test(n)) try {
                    var a = u.call(t, n);
                    if (a || e || t.document && t.document.nodeType !== 11) return a
                } catch(f) {}
                return nt(n, null, null, [t]).length > 0
            })
        } (),
        i.pseudos.nth = i.pseudos.eq,
        i.filters = mt.prototype = i.pseudos,
        i.setFilters = new mt,
        nt.attr = v.attr,
        v.find = nt,
        v.expr = nt.selectors,
        v.expr[":"] = v.expr.pseudos,
        v.unique = nt.uniqueSort,
        v.text = nt.getText,
        v.isXMLDoc = nt.isXML,
        v.contains = nt.contains
    } (e);
    var nt = /Until$/,
    rt = /^(?:parents|prev(?:Until|All))/,
    it = /^.[^:#\[\.,]*$/,
    st = v.expr.match.needsContext,
    ot = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    v.fn.extend({
        find: function(e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string") return v(e).filter(function() {
                for (t = 0, n = u.length; t < n; t++) if (v.contains(u[t], this)) return ! 0
            });
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length,
                v.find(e, this[t], o);
                if (t > 0) for (i = r; i < o.length; i++) for (s = 0; s < r; s++) if (o[s] === o[i]) {
                    o.splice(i--, 1);
                    break
                }
            }
            return o
        },
        has: function(e) {
            var t, n = v(e, this),
            r = n.length;
            return this.filter(function() {
                for (t = 0; t < r; t++) if (v.contains(this, n[t])) return ! 0
            })
        },
        not: function(e) {
            return this.pushStack(ft(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(ft(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !! e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n, r = 0,
            i = this.length,
            s = [],
            o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            return s = s.length > 1 ? v.unique(s) : s,
            this.pushStack(s, "closest", e)
        },
        index: function(e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length: -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
            r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r: v.unique(r))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject: this.prevObject.filter(e))
        }
    }),
    v.fn.andSelf = v.fn.addBack,
    v.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t: null
        },
        parents: function(e) {
            return v.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return v.dir(e, "parentNode", n)
        },
        next: function(e) {
            return at(e, "nextSibling")
        },
        prev: function(e) {
            return at(e, "previousSibling")
        },
        nextAll: function(e) {
            return v.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return v.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return v.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return v.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return v.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return v.sibling(e.firstChild)
        },
        contents: function(e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: v.merge([], e.childNodes)
        }
    },
    function(e, t) {
        v.fn[e] = function(n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n),
            r && typeof r == "string" && (i = v.filter(r, i)),
            i = this.length > 1 && !ot[e] ? v.unique(i) : i,
            this.length > 1 && rt.test(e) && (i = i.reverse()),
            this.pushStack(i, e, l.call(arguments).join(","))
        }
    }),
    v.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"),
            t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = [],
            s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) s.nodeType === 1 && i.push(s),
            s = s[n];
            return i
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    ht = / jQuery\d+="(?:null|\d+)"/g,
    pt = /^\s+/,
    dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    vt = /<([\w:]+)/,
    mt = /<tbody/i,
    gt = /<|&#?\w+;/,
    yt = /<(?:script|style|link)/i,
    bt = /<(?:script|object|embed|option|style)/i,
    wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
    Et = /^(?:checkbox|radio)$/,
    St = /checked\s*(?:[^=]|=\s*.checked.)/i,
    xt = /\/(java|ecma)script/i,
    Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
    Nt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    },
    Ct = lt(i),
    kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option,
    Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead,
    Nt.th = Nt.td,
    v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]),
    v.fn.extend({
        text: function(e) {
            return v.access(this,
            function(e) {
                return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
            },
            null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (v.isFunction(e)) return this.each(function(t) {
                v(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return v.isFunction(e) ? this.each(function(t) {
                v(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = v(this),
                n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = v.isFunction(e);
            return this.each(function(n) {
                v(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0,
            function(e) { (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0,
            function(e) { (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (!ut(this[0])) return this.domManip(arguments, !1,
            function(e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!ut(this[0])) return this.domManip(arguments, !1,
            function(e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            var n, r = 0;
            for (; (n = this[r]) != null; r++) if (!e || v.filter(e, [n]).length) ! t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])),
            n.parentNode && n.parentNode.removeChild(n);
            return this
        },
        empty: function() {
            var e, t = 0;
            for (; (e = this[t]) != null; t++) {
                e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                while (e.firstChild) e.removeChild(e.firstChild)
            }
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e,
            t = t == null ? e: t,
            this.map(function() {
                return v.clone(this, e, t)
            })
        },
        html: function(e) {
            return v.access(this,
            function(e) {
                var n = this[0] || {},
                r = 0,
                i = this.length;
                if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(dt, "<$1></$2>");
                    try {
                        for (; r < i; r++) n = this[r] || {},
                        n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        n = 0
                    } catch(s) {}
                }
                n && this.empty().append(e)
            },
            null, e, arguments.length)
        },
        replaceWith: function(e) {
            return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this: v.isFunction(e) ? this.each(function(t) {
                var n = v(this),
                r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = v(e).detach()), this.each(function() {
                var t = this.nextSibling,
                n = this.parentNode;
                v(this).remove(),
                t ? v(t).before(e) : v(n).append(e)
            }))
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, r) {
            e = [].concat.apply([], e);
            var i, s, o, u, a = 0,
            f = e[0],
            l = [],
            c = this.length;
            if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function() {
                v(this).domManip(e, n, r)
            });
            if (v.isFunction(f)) return this.each(function(i) {
                var s = v(this);
                e[0] = f.call(this, i, n ? s.html() : t),
                s.domManip(e, n, r)
            });
            if (this[0]) {
                i = v.buildFragment(e, this, l),
                o = i.fragment,
                s = o.firstChild,
                o.childNodes.length === 1 && (o = s);
                if (s) {
                    n = n && v.nodeName(s, "tr");
                    for (u = i.cacheable || c - 1; a < c; a++) r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o: v.clone(o, !0, !0))
                }
                o = s = null,
                l.length && v.each(l,
                function(e, t) {
                    t.src ? v.ajax ? v.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")),
                    t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }),
    v.buildFragment = function(e, n, r) {
        var s, o, u, a = e[0];
        return n = n || i,
        n = !n.nodeType && n[0] || n,
        n = n.ownerDocument || n,
        e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t),
        s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)),
        {
            fragment: s,
            cacheable: o
        }
    },
    v.fragments = {},
    v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(e, t) {
        v.fn[e] = function(n) {
            var r, i = 0,
            s = [],
            o = v(n),
            u = o.length,
            a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]),
            this;
            for (; i < u; i++) r = (i > 0 ? this.clone(!0) : this).get(),
            v(o[i])[t](r),
            s = s.concat(r);
            return this.pushStack(s, e, o.selector)
        }
    }),
    v.extend({
        clone: function(e, t, n) {
            var r, i, s, o;
            v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
            if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                Ot(e, o),
                r = Mt(e),
                i = Mt(o);
                for (s = 0; r[s]; ++s) i[s] && Ot(r[s], i[s])
            }
            if (t) {
                At(e, o);
                if (n) {
                    r = Mt(e),
                    i = Mt(o);
                    for (s = 0; r[s]; ++s) At(r[s], i[s])
                }
            }
            return r = i = null,
            o
        },
        clean: function(e, t, n, r) {
            var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
            b = [];
            if (!t || typeof t.createDocumentFragment == "undefined") t = i;
            for (s = 0; (u = e[s]) != null; s++) {
                typeof u == "number" && (u += "");
                if (!u) continue;
                if (typeof u == "string") if (!gt.test(u)) u = t.createTextNode(u);
                else {
                    y = y || lt(t),
                    c = t.createElement("div"),
                    y.appendChild(c),
                    u = u.replace(dt, "<$1></$2>"),
                    a = (vt.exec(u) || ["", ""])[1].toLowerCase(),
                    f = Nt[a] || Nt._default,
                    l = f[0],
                    c.innerHTML = f[1] + u + f[2];
                    while (l--) c = c.lastChild;
                    if (!v.support.tbody) {
                        h = mt.test(u),
                        p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes: f[1] === "<table>" && !h ? c.childNodes: [];
                        for (o = p.length - 1; o >= 0; --o) v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                    } ! v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild),
                    u = c.childNodes,
                    c.parentNode.removeChild(c)
                }
                u.nodeType ? b.push(u) : v.merge(b, u)
            }
            c && (u = c = y = null);
            if (!v.support.appendChecked) for (s = 0; (u = b[s]) != null; s++) v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
            if (n) {
                m = function(e) {
                    if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                };
                for (s = 0; (u = b[s]) != null; s++) if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u),
                typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
            }
            return b
        },
        cleanData: function(e, t) {
            var n, r, i, s, o = 0,
            u = v.expando,
            a = v.cache,
            f = v.support.deleteExpando,
            l = v.event.special;
            for (; (i = e[o]) != null; o++) if (t || v.acceptData(i)) {
                r = i[u],
                n = r && a[r];
                if (n) {
                    if (n.events) for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                    a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
                }
            }
        }
    }),
    function() {
        var e, t;
        v.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        },
        e = v.uaMatch(o.userAgent),
        t = {},
        e.browser && (t[e.browser] = !0, t.version = e.version),
        t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0),
        v.browser = t,
        v.sub = function() {
            function e(t, n) {
                return new e.fn.init(t, n)
            }
            v.extend(!0, e, this),
            e.superclass = this,
            e.fn = e.prototype = this(),
            e.fn.constructor = e,
            e.sub = this.sub,
            e.fn.init = function(r, i) {
                return i && i instanceof v && !(i instanceof e) && (i = e(i)),
                v.fn.init.call(this, r, i, t)
            },
            e.fn.init.prototype = e.fn;
            var t = e(i);
            return e
        }
    } ();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
    jt = /opacity=([^)]*)/,
    Ft = /^(top|right|bottom|left)$/,
    It = /^(none|table(?!-c[ea]).+)/,
    qt = /^margin/,
    Rt = new RegExp("^(" + m + ")(.*)$", "i"),
    Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
    zt = new RegExp("^([-+])=(" + m + ")", "i"),
    Wt = {
        BODY: "block"
    },
    Xt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    Vt = {
        letterSpacing: 0,
        fontWeight: 400
    },
    $t = ["Top", "Right", "Bottom", "Left"],
    Jt = ["Webkit", "O", "Moz", "ms"],
    Kt = v.fn.toggle;
    v.fn.extend({
        css: function(e, n) {
            return v.access(this,
            function(e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            },
            e, n, arguments.length > 1)
        },
        show: function() {
            return Yt(this, !0)
        },
        hide: function() {
            return Yt(this)
        },
        toggle: function(e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function() { (n ? e: Gt(this)) ? v(this).show() : v(this).hide()
            })
        }
    }),
    v.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1": n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var s, o, u, a = v.camelCase(n),
            f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)),
            u = v.cssHooks[n] || v.cssHooks[a];
            if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s: f[n];
            o = typeof r,
            o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
            if (r == null || o === "number" && isNaN(r)) return;
            o === "number" && !v.cssNumber[a] && (r += "px");
            if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
                f[n] = r
            } catch(l) {}
        },
        css: function(e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)),
            u = v.cssHooks[n] || v.cssHooks[a],
            u && "get" in u && (s = u.get(e, !0, i)),
            s === t && (s = Dt(e, n)),
            s === "normal" && n in Vt && (s = Vt[n]),
            r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
        },
        swap: function(e, t, n) {
            var r, i, s = {};
            for (i in t) s[i] = e.style[i],
            e.style[i] = t[i];
            r = n.call(e);
            for (i in t) e.style[i] = s[i];
            return r
        }
    }),
    e.getComputedStyle ? Dt = function(t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null),
        a = t.style;
        return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)),
        r
    }: i.documentElement.currentStyle && (Dt = function(e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t],
        s = e.style;
        return i == null && s && s[t] && (i = s[t]),
        Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em": i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)),
        i === "" ? "auto": i
    }),
    v.each(["height", "width"],
    function(e, t) {
        v.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt,
                function() {
                    return tn(e, t, r)
                }) : tn(e, t, r)
            },
            set: function(e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
            }
        }
    }),
    v.support.opacity || (v.cssHooks.opacity = {
        get: function(e, t) {
            return jt.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
        },
        set: function(e, t) {
            var n = e.style,
            r = e.currentStyle,
            i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")": "",
            s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                n.removeAttribute("filter");
                if (r && !r.filter) return
            }
            n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
        }
    }),
    v(function() {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {
            get: function(e, t) {
                return v.swap(e, {
                    display: "inline-block"
                },
                function() {
                    if (t) return Dt(e, "marginRight")
                })
            }
        }),
        !v.support.pixelPosition && v.fn.position && v.each(["top", "left"],
        function(e, t) {
            v.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        var r = Dt(e, t);
                        return Ut.test(r) ? v(e).position()[t] + "px": r
                    }
                }
            }
        })
    }),
    v.expr && v.expr.filters && (v.expr.filters.hidden = function(e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
    },
    v.expr.filters.visible = function(e) {
        return ! v.expr.filters.hidden(e)
    }),
    v.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(e, t) {
        v.cssHooks[e + t] = {
            expand: function(n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n],
                s = {};
                for (r = 0; r < 4; r++) s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                return s
            }
        },
        qt.test(e) || (v.cssHooks[e + t].set = Zt)
    });
    var rn = /%20/g,
    sn = /\[\]$/,
    on = /\r?\n/g,
    un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function() {
            return v.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
            }).map(function(e, t) {
                var n = v(this).val();
                return n == null ? null: v.isArray(n) ? v.map(n,
                function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(on, "\r\n")
                }
            }).get()
        }
    }),
    v.param = function(e, n) {
        var r, i = [],
        s = function(e, t) {
            t = v.isFunction(t) ? t() : t == null ? "": t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e,
        function() {
            s(this.name, this.value)
        });
        else for (r in e) fn(r, e[r], n, s);
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/,
    pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
    vn = /^(?:GET|HEAD)$/,
    mn = /^\/\//,
    gn = /\?/,
    yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    bn = /([?&])_=[^&]*/,
    wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    En = v.fn.load,
    Sn = {},
    xn = {},
    Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch(Nn) {
        cn = i.createElement("a"),
        cn.href = "",
        cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [],
    v.fn.load = function(e, n, r) {
        if (typeof e != "string" && En) return En.apply(this, arguments);
        if (!this.length) return this;
        var i, s, o, u = this,
        a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)),
        v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"),
        v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                r && u.each(r, o || [e.responseText, t, e])
            }
        }).done(function(e) {
            o = arguments,
            u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
        }),
        this
    },
    v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
    function(e, t) {
        v.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    v.each(["get", "post"],
    function(e, n) {
        v[n] = function(e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t),
            v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            })
        }
    }),
    v.extend({
        getScript: function(e, n) {
            return v.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return v.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings),
            Ln(e, t),
            e
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function(e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) return;
                E = 2,
                u && clearTimeout(u),
                o = t,
                i = a || "",
                x.readyState = e > 0 ? 4 : 0,
                s && (w = An(c, x, s));
                if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)),
                e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);
                else {
                    b = T;
                    if (!T || e) T = "error",
                    e < 0 && (e = 0)
                }
                x.status = e,
                x.statusText = (n || T) + "",
                l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]),
                x.statusCode(g),
                g = t,
                f && p.trigger("ajax" + (l ? "Success": "Error"), [x, c, l ? y: b]),
                m.fireWith(h, [x, T]),
                f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e, e = t),
            n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({},
            n),
            h = c.context || c,
            p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
            d = v.Deferred(),
            m = v.Callbacks("once memory"),
            g = c.statusCode || {},
            b = {},
            w = {},
            E = 0,
            S = "canceled",
            x = {
                readyState: 0,
                setRequestHeader: function(e, t) {
                    if (!E) {
                        var n = e.toLowerCase();
                        e = w[n] = w[n] || e,
                        b[e] = t
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return E === 2 ? i: null
                },
                getResponseHeader: function(e) {
                    var n;
                    if (E === 2) {
                        if (!s) {
                            s = {};
                            while (n = pn.exec(i)) s[n[1].toLowerCase()] = n[2]
                        }
                        n = s[e.toLowerCase()]
                    }
                    return n === t ? null: n
                },
                overrideMimeType: function(e) {
                    return E || (c.mimeType = e),
                    this
                },
                abort: function(e) {
                    return e = e || S,
                    o && o.abort(e),
                    T(0, e),
                    this
                }
            };
            d.promise(x),
            x.success = x.done,
            x.error = x.fail,
            x.complete = m.add,
            x.statusCode = function(e) {
                if (e) {
                    var t;
                    if (E < 2) for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status],
                    x.always(t)
                }
                return this
            },
            c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"),
            c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y),
            c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))),
            c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)),
            kn(Sn, c, n, x);
            if (E === 2) return x;
            f = c.global,
            c.type = c.type.toUpperCase(),
            c.hasContent = !vn.test(c.type),
            f && v.active++===0 && v.event.trigger("ajaxStart");
            if (!c.hasContent) {
                c.data && (c.url += (gn.test(c.url) ? "&": "?") + c.data, delete c.data),
                r = c.url;
                if (c.cache === !1) {
                    var N = v.now(),
                    C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&": "?") + "_=" + N: "")
                }
            } (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType),
            c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])),
            x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01": "") : c.accepts["*"]);
            for (l in c.headers) x.setRequestHeader(l, c.headers[l]);
            if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                S = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[l](c[l]);
                o = kn(xn, c, n, x);
                if (!o) T( - 1, "No Transport");
                else {
                    x.readyState = 1,
                    f && p.trigger("ajaxSend", [x, c]),
                    c.async && c.timeout > 0 && (u = setTimeout(function() {
                        x.abort("timeout")
                    },
                    c.timeout));
                    try {
                        E = 1,
                        o.send(b, T)
                    } catch(k) {
                        if (! (E < 2)) throw k;
                        T( - 1, k)
                    }
                }
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
    _n = /\?/,
    Dn = /(=)\?(?=&|$)|\?\?/,
    Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0,
            e
        }
    }),
    v.ajaxPrefilter("json jsonp",
    function(n, r, i) {
        var s, o, u, a = n.data,
        f = n.url,
        l = n.jsonp !== !1,
        c = l && Dn.test(f),
        h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
        o = e[s],
        c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&": "?") + n.jsonp + "=" + s),
        n.converters["script json"] = function() {
            return u || v.error(s + " was not called"),
            u[0]
        },
        n.dataTypes[0] = "json",
        e[s] = function() {
            u = arguments
        },
        i.always(function() {
            e[s] = o,
            n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)),
            u && v.isFunction(o) && o(u[0]),
            u = o = t
        }),
        "script"
    }),
    v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return v.globalEval(e),
                e
            }
        }
    }),
    v.ajaxPrefilter("script",
    function(e) {
        e.cache === t && (e.cache = !1),
        e.crossDomain && (e.type = "GET", e.global = !1)
    }),
    v.ajaxTransport("script",
    function(e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function(s, o) {
                    n = i.createElement("script"),
                    n.async = "async",
                    e.scriptCharset && (n.charset = e.scriptCharset),
                    n.src = e.url,
                    n.onload = n.onreadystatechange = function(e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null,
                        r && n.parentNode && r.removeChild(n),
                        n = t,
                        i || o(200, "success")
                    },
                    r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Hn, Bn = e.ActiveXObject ?
    function() {
        for (var e in Hn) Hn[e](0, 1)
    }: !1,
    jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ?
    function() {
        return ! this.isLocal && Fn() || In()
    }: Fn,
    function(e) {
        v.extend(v.support, {
            ajax: !!e,
            cors: !!e && "withCredentials" in e
        })
    } (v.ajaxSettings.xhr()),
    v.support.ajax && v.ajaxTransport(function(n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return {
                send: function(i, s) {
                    var o, u, a = n.xhr();
                    n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                    if (n.xhrFields) for (u in n.xhrFields) a[u] = n.xhrFields[u];
                    n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType),
                    !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (u in i) a.setRequestHeader(u, i[u])
                    } catch(f) {}
                    a.send(n.hasContent && n.data || null),
                    r = function(e, i) {
                        var u, f, l, c, h;
                        try {
                            if (r && (i || a.readyState === 4)) {
                                r = t,
                                o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                                if (i) a.readyState !== 4 && a.abort();
                                else {
                                    u = a.status,
                                    l = a.getAllResponseHeaders(),
                                    c = {},
                                    h = a.responseXML,
                                    h && h.documentElement && (c.xml = h);
                                    try {
                                        c.text = a.responseText
                                    } catch(p) {}
                                    try {
                                        f = a.statusText
                                    } catch(p) {
                                        f = ""
                                    } ! u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                }
                            }
                        } catch(d) {
                            i || s( - 1, d)
                        }
                        c && s(u, f, c, l)
                    },
                    n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {},
                    v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
                },
                abort: function() {
                    r && r(0, 1)
                }
            }
        }
    });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
    zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
    Wn = /queueHooks$/,
    Xn = [Gn],
    Vn = {
        "*": [function(e, t) {
            var n, r, i = this.createTween(e, t),
            s = zn.exec(t),
            o = i.cur(),
            u = +o || 0,
            a = 1,
            f = 20;
            if (s) {
                n = +s[2],
                r = s[3] || (v.cssNumber[e] ? "": "px");
                if (r !== "px" && u) {
                    u = v.css(i.elem, e, !0) || n || 1;
                    do a = a || ".5",
                    u /= a,
                    v.style(i.elem, e, u + r);
                    while (a !== (a = i.cur() / o) && a !== 1 && --f)
                }
                i.unit = r,
                i.start = u,
                i.end = s[1] ? u + (s[1] + 1) * n: n
            }
            return i
        }]
    };
    v.Animation = v.extend(Kn, {
        tweener: function(e, t) {
            v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
            i = e.length;
            for (; r < i; r++) n = e[r],
            Vn[n] = Vn[n] || [],
            Vn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? Xn.unshift(e) : Xn.push(e)
        }
    }),
    v.Tween = Yn,
    Yn.prototype = {
        constructor: Yn,
        init: function(e, t, n, r, i, s) {
            this.elem = e,
            this.prop = n,
            this.easing = i || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = s || (v.cssNumber[n] ? "": "px")
        },
        cur: function() {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Yn.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : Yn.propHooks._default.set(this),
            this
        }
    },
    Yn.prototype.init.prototype = Yn.prototype,
    Yn.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    v.each(["toggle", "show", "hide"],
    function(e, t) {
        var n = v.fn[t];
        v.fn[t] = function(r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
        }
    }),
    v.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            },
            e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = v.isEmptyObject(e),
            s = v.speed(t, n, r),
            o = function() {
                var t = Kn(this, v.extend({},
                e), s);
                i && t.stop(!0)
            };
            return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop,
                t(r)
            };
            return typeof e != "string" && (r = n, n = e, e = t),
            n && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0,
                n = e != null && e + "queueHooks",
                s = v.timers,
                o = v._data(this);
                if (n) o[n] && o[n].stop && i(o[n]);
                else for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                for (n = s.length; n--;) s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1)); (t || !r) && v.dequeue(this, e)
            })
        }
    }),
    v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(e, t) {
        v.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    v.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? v.extend({},
        e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration: r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete,
        r.complete = function() {
            v.isFunction(r.old) && r.old.call(this),
            r.queue && v.dequeue(this, r.queue)
        },
        r
    },
    v.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return.5 - Math.cos(e * Math.PI) / 2
        }
    },
    v.timers = [],
    v.fx = Yn.prototype.init,
    v.fx.tick = function() {
        var e, n = v.timers,
        r = 0;
        qn = v.now();
        for (; r < n.length; r++) e = n[r],
        !e() && n[r] === e && n.splice(r--, 1);
        n.length || v.fx.stop(),
        qn = t
    },
    v.fx.timer = function(e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
    },
    v.fx.interval = 13,
    v.fx.stop = function() {
        clearInterval(Rn),
        Rn = null
    },
    v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    v.fx.step = {},
    v.expr && v.expr.filters && (v.expr.filters.animated = function(e) {
        return v.grep(v.timers,
        function(t) {
            return e === t.elem
        }).length
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function(e) {
        if (arguments.length) return e === t ? this: this.each(function(t) {
            v.offset.setOffset(this, e, t)
        });
        var n, r, i, s, o, u, a, f = {
            top: 0,
            left: 0
        },
        l = this[0],
        c = l && l.ownerDocument;
        if (!c) return;
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
            top: f.top + u - s,
            left: f.left + a - o
        }) : f)
    },
    v.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
            n = e.offsetLeft;
            return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0),
            {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = v.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = v(e),
            s = i.offset(),
            o = v.css(e, "top"),
            u = v.css(e, "left"),
            a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
            f = {},
            l = {},
            c,
            h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0),
            v.isFunction(t) && (t = t.call(e, n, s)),
            t.top != null && (f.top = t.top - s.top + c),
            t.left != null && (f.left = t.left - s.left + h),
            "using" in t ? t.using.call(e, f) : i.css(f)
        }
    },
    v.fn.extend({
        position: function() {
            if (!this[0]) return;
            var e = this[0],
            t = this.offsetParent(),
            n = this.offset(),
            r = er.test(t[0].nodeName) ? {
                top: 0,
                left: 0
            }: t.offset();
            return n.top -= parseFloat(v.css(e, "marginTop")) || 0,
            n.left -= parseFloat(v.css(e, "marginLeft")) || 0,
            r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0,
            r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0,
            {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") e = e.offsetParent;
                return e || i.body
            })
        }
    }),
    v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function(i) {
            return v.access(this,
            function(e, i, s) {
                var o = tr(e);
                if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s: v(o).scrollTop()) : e[i] = s
            },
            e, i, arguments.length, null)
        }
    }),
    v.each({
        Height: "height",
        Width: "width"
    },
    function(e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        },
        function(r, i) {
            v.fn[i] = function(i, s) {
                var o = arguments.length && (r || typeof i != "boolean"),
                u = r || (i === !0 || s === !0 ? "margin": "border");
                return v.access(this,
                function(n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                },
                n, o ? i: t, o, null)
            }
        })
    }),
    e.jQuery = e.$ = v,
    typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [],
    function() {
        return v
    })
})(window),
function(e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled: "a" === u ? t.href || n: n) && s(t)
    }
    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
            return e.css(this, "visibility") === "hidden"
        }).length
    }
    var n = 0,
    r = /^ui-id-\d+$/;
    e.ui = e.ui || {};
    if (e.ui.version) return;
    e.extend(e.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    e.fn.extend({
        _focus: e.fn.focus,
        focus: function(t, n) {
            return typeof t == "number" ? this.each(function() {
                var r = this;
                setTimeout(function() {
                    e(r).focus(),
                    n && n.call(r)
                },
                t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var t;
            return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : t = this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) {
                var r = e(this[0]),
                i,
                s;
                while (r.length && r[0] !== document) {
                    i = r.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        s = parseInt(r.css("zIndex"), 10);
                        if (!isNaN(s) && s !== 0) return s
                    }
                    r = r.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                r.test(this.id) && e(this).removeAttr("id")
            })
        }
    }),
    e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(n) {
                return !! e.data(n, t)
            }
        }) : function(t, n, r) {
            return !! e.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
            r = isNaN(n);
            return (r || n >= 0) && i(t, !r)
        }
    }),
    e(function() {
        var t = document.body,
        n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight,
        e.extend(n.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }),
        e.support.minHeight = n.offsetHeight === 100,
        e.support.selectstart = "onselectstart" in n,
        t.removeChild(n).style.display = "none"
    }),
    e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"],
    function(n, r) {
        function u(t, n, r, s) {
            return e.each(i,
            function() {
                n -= parseFloat(e.css(t, "padding" + this)) || 0,
                r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }),
            n
        }
        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        s = r.toLowerCase(),
        o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + r] = function(n) {
            return n === t ? o["inner" + r].call(this) : this.each(function() {
                e(this).css(s, u(this, n) + "px")
            })
        },
        e.fn["outer" + r] = function(t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    } (e.fn.removeData)),
    function() {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        e.ui.ie = t.length ? !0 : !1,
        e.ui.ie6 = parseFloat(t[1], 10) === 6
    } (),
    e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
            function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    e.extend(e.ui, {
        plugin: {
            add: function(t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [],
                s.plugins[i].push([n, r[i]])
            },
            call: function(e, t, n) {
                var r, i = e.plugins[t];
                if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
                for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
            }
        },
        contains: e.contains,
        hasScroll: function(t, n) {
            if (e(t).css("overflow") === "hidden") return ! 1;
            var r = n && n === "left" ? "scrollLeft": "scrollTop",
            i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        },
        isOverAxis: function(e, t, n) {
            return e > t && e < t + n
        },
        isOver: function(t, n, r, i, s, o) {
            return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
        }
    })
} (jQuery),
function(e, t) {
    var n = 0,
    r = Array.prototype.slice,
    i = e.cleanData;
    e.cleanData = function(t) {
        for (var n = 0,
        r; (r = t[n]) != null; n++) try {
            e(r).triggerHandler("remove")
        } catch(s) {}
        i(t)
    },
    e.widget = function(t, n, r) {
        var i, s, o, u, a = t.split(".")[0];
        t = t.split(".")[1],
        i = a + "-" + t,
        r || (r = n, n = e.Widget),
        e.expr[":"][i.toLowerCase()] = function(t) {
            return !! e.data(t, i)
        },
        e[a] = e[a] || {},
        s = e[a][t],
        o = e[a][t] = function(e, t) {
            if (!this._createWidget) return new o(e, t);
            arguments.length && this._createWidget(e, t)
        },
        e.extend(o, s, {
            version: r.version,
            _proto: e.extend({},
            r),
            _childConstructors: []
        }),
        u = new n,
        u.options = e.widget.extend({},
        u.options),
        e.each(r,
        function(t, i) {
            e.isFunction(i) && (r[t] = function() {
                var e = function() {
                    return n.prototype[t].apply(this, arguments)
                },
                r = function(e) {
                    return n.prototype[t].apply(this, e)
                };
                return function() {
                    var t = this._super,
                    n = this._superApply,
                    s;
                    return this._super = e,
                    this._superApply = r,
                    s = i.apply(this, arguments),
                    this._super = t,
                    this._superApply = n,
                    s
                }
            } ())
        }),
        o.prototype = e.widget.extend(u, {
            widgetEventPrefix: s ? u.widgetEventPrefix: t
        },
        r, {
            constructor: o,
            namespace: a,
            widgetName: t,
            widgetBaseClass: i,
            widgetFullName: i
        }),
        s ? (e.each(s._childConstructors,
        function(t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o),
        e.widget.bridge(t, o)
    },
    e.widget.extend = function(n) {
        var i = r.call(arguments, 1),
        s = 0,
        o = i.length,
        u,
        a;
        for (; s < o; s++) for (u in i[s]) a = i[s][u],
        i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({},
        n[u], a) : e.widget.extend({},
        a) : n[u] = a);
        return n
    },
    e.widget.bridge = function(n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function(o) {
            var u = typeof o == "string",
            a = r.call(arguments, 1),
            f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o,
            u ? this.each(function() {
                var r, i = e.data(this, s);
                if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
                r = i[o].apply(i, a);
                if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r,
                !1
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }),
            f
        }
    },
    e.Widget = function() {},
    e.Widget._childConstructors = [],
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0],
            this.element = e(r),
            this.uuid = n++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = e.widget.extend({},
            this.options, this._getCreateOptions(), t),
            this.bindings = e(),
            this.hoverable = e(),
            this.focusable = e(),
            r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument: r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(n, r) {
            var i = n,
            s, o, u;
            if (arguments.length === 0) return e.widget.extend({},
            this.options);
            if (typeof n == "string") {
                i = {},
                s = n.split("."),
                n = s.shift();
                if (s.length) {
                    o = i[n] = e.widget.extend({},
                    this.options[n]);
                    for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {},
                    o = o[s[u]];
                    n = s.pop();
                    if (r === t) return o[n] === t ? null: o[n];
                    o[n] = r
                } else {
                    if (r === t) return this.options[n] === t ? null: this.options[n];
                    i[n] = r
                }
            }
            return this._setOptions(i),
            this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t,
            e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(t, n, r) {
            var i, s = this;
            typeof t != "boolean" && (r = n, n = t, t = !1),
            r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()),
            e.each(r,
            function(r, o) {
                function u() {
                    if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                    return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                }
                typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var a = r.match(/^(\w+)\s*(.*)$/),
                f = a[1] + s.eventNamespace,
                l = a[2];
                l ? i.delegate(l, f, u) : n.bind(f, u)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function n() {
                return (typeof e == "string" ? r[e] : e).apply(r, arguments)
            }
            var r = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            r = r || {},
            n = e.Event(n),
            n.type = (t === this.widgetEventPrefix ? t: this.widgetEventPrefix + t).toLowerCase(),
            n.target = this.element[0],
            s = n.originalEvent;
            if (s) for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r),
            !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
        }
    },
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(t, n) {
        e.Widget.prototype["_" + t] = function(r, i, s) {
            typeof i == "string" && (i = {
                effect: i
            });
            var o, u = i ? i === !0 || typeof i == "number" ? n: i.effect || n: t;
            i = i || {},
            typeof i == "number" && (i = {
                duration: i
            }),
            o = !e.isEmptyObject(i),
            i.complete = s,
            i.delay && r.delay(i.delay),
            o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                e(this)[t](),
                s && s.call(r[0]),
                n()
            })
        }
    }),
    e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
} (jQuery),
function(e, t) {
    var n = !1;
    e(document).mouseup(function(e) {
        n = !1
    }),
    e.widget("ui.mouse", {
        version: "1.9.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName,
            function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName,
            function(n) {
                if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"),
                n.stopImmediatePropagation(),
                !1
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (n) return;
            this._mouseStarted && this._mouseUp(t),
            this._mouseDownEvent = t;
            var r = this,
            i = t.which === 1,
            s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length: !1;
            if (!i || s || !this._mouseCapture(t)) return ! 0;
            this.mouseDelayMet = !this.options.delay,
            this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                r.mouseDelayMet = !0
            },
            this.options.delay));
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = this._mouseStart(t) !== !1;
                if (!this._mouseStarted) return t.preventDefault(),
                !0
            }
            return ! 0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"),
            this._mouseMoveDelegate = function(e) {
                return r._mouseMove(e)
            },
            this._mouseUpDelegate = function(e) {
                return r._mouseUp(e)
            },
            e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
            t.preventDefault(),
            n = !0,
            !0
        },
        _mouseMove: function(t) {
            return ! e.ui.ie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)),
            !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(e) {
            return this.mouseDelayMet
        },
        _mouseStart: function(e) {},
        _mouseDrag: function(e) {},
        _mouseStop: function(e) {},
        _mouseCapture: function(e) {
            return ! 0
        }
    })
} (jQuery),
function(e, t) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var n = this.options;
            return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe": n.iframeFix).each(function() {
                e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(t) {
            var n = this.options;
            return this.helper = this._createHelper(t),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            e.ui.ddmanager && (e.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(t),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
            n.containment && this._setContainment(),
            this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function(t, n) {
            this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute");
            if (!n) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp({}),
                !1;
                this.position = r.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            return e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var n = !1;
            e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)),
            this.dropped && (n = this.dropped, this.dropped = !1);
            var r = this.element[0],
            i = !1;
            while (r && (r = r.parentNode)) r == document && (i = !0);
            if (!i && this.options.helper === "original") return ! 1;
            if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
                var s = this;
                e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                function() {
                    s._trigger("stop", t) !== !1 && s._clear()
                })
            } else this._trigger("stop", t) !== !1 && this._clear();
            return ! 1
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
            e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(t) {
            var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
            return e(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == t.target && (n = !0)
            }),
            n
        },
        _createHelper: function(t) {
            var n = this.options,
            r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode: n.appendTo),
            r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"),
            r
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" ")),
            e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }),
            "left" in t && (this.offset.click.left = t.left + this.margins.left),
            "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top" in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t = this.options;
            t.containment == "parent" && (t.containment = this.helper[0].parentNode);
            if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
                var n = e(t.containment),
                r = n[0];
                if (!r) return;
                var i = n.offset(),
                s = e(r).css("overflow") != "hidden";
                this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                this.relative_container = n
            } else t.containment.constructor == Array && (this.containment = t.containment)
        },
        _convertPositionTo: function(t, n) {
            n || (n = this.position);
            var r = t == "absolute" ? 1 : -1,
            i = this.options,
            s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            o = /(html|body)/i.test(s[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var n = this.options,
            r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent: this.offsetParent,
            i = /(html|body)/i.test(r[0].tagName),
            s = t.pageX,
            o = t.pageY;
            if (this.originalPosition) {
                var u;
                if (this.containment) {
                    if (this.relative_container) {
                        var a = this.relative_container.offset();
                        u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
                    } else u = this.containment;
                    t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left),
                    t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top),
                    t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left),
                    t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
                }
                if (n.grid) {
                    var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                    o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f: f;
                    var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                    s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l: l
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(t, n, r) {
            return r = r || this._uiHash(),
            e.ui.plugin.call(this, t, [n, r]),
            t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")),
            e.Widget.prototype._trigger.call(this, t, n, r)
        },
        plugins: {},
        _uiHash: function(e) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, n) {
            var r = e(this).data("draggable"),
            i = r.options,
            s = e.extend({},
            n, {
                item: r.element
            });
            r.sortables = [],
            e(i.connectToSortable).each(function() {
                var n = e.data(this, "sortable");
                n && !n.options.disabled && (r.sortables.push({
                    instance: n,
                    shouldRevert: n.options.revert
                }), n.refreshPositions(), n._trigger("activate", t, s))
            })
        },
        stop: function(t, n) {
            var r = e(this).data("draggable"),
            i = e.extend({},
            n, {
                item: r.element
            });
            e.each(r.sortables,
            function() {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
            })
        },
        drag: function(t, n) {
            var r = e(this).data("draggable"),
            i = this,
            s = function(t) {
                var n = this.offset.click.top,
                r = this.offset.click.left,
                i = this.positionAbs.top,
                s = this.positionAbs.left,
                o = t.height,
                u = t.width,
                a = t.top,
                f = t.left;
                return e.ui.isOver(i + n, s + r, a, f, o, u)
            };
            e.each(r.sortables,
            function(s) {
                var o = !1,
                u = this;
                this.instance.positionAbs = r.positionAbs,
                this.instance.helperProportions = r.helperProportions,
                this.instance.offset.click = r.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables,
                function() {
                    return this.instance.positionAbs = r.positionAbs,
                    this.instance.helperProportions = r.helperProportions,
                    this.instance.offset.click = r.offset.click,
                    this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1),
                    o
                })),
                o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return n.helper[0]
                },
                t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    }),
    e.ui.plugin.add("draggable", "cursor", {
        start: function(t, n) {
            var r = e("body"),
            i = e(this).data("draggable").options;
            r.css("cursor") && (i._cursor = r.css("cursor")),
            r.css("cursor", i.cursor)
        },
        stop: function(t, n) {
            var r = e(this).data("draggable").options;
            r._cursor && e("body").css("cursor", r._cursor)
        }
    }),
    e.ui.plugin.add("draggable", "opacity", {
        start: function(t, n) {
            var r = e(n.helper),
            i = e(this).data("draggable").options;
            r.css("opacity") && (i._opacity = r.css("opacity")),
            r.css("opacity", i.opacity)
        },
        stop: function(t, n) {
            var r = e(this).data("draggable").options;
            r._opacity && e(n.helper).css("opacity", r._opacity)
        }
    }),
    e.ui.plugin.add("draggable", "scroll", {
        start: function(t, n) {
            var r = e(this).data("draggable");
            r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
        },
        drag: function(t, n) {
            var r = e(this).data("draggable"),
            i = r.options,
            s = !1;
            if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
                if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed: t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
                if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed: t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
            } else {
                if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
                if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
            }
            s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
        }
    }),
    e.ui.plugin.add("draggable", "snap", {
        start: function(t, n) {
            var r = e(this).data("draggable"),
            i = r.options;
            r.snapElements = [],
            e(i.snap.constructor != String ? i.snap.items || ":data(draggable)": i.snap).each(function() {
                var t = e(this),
                n = t.offset();
                this != r.element[0] && r.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        },
        drag: function(t, n) {
            var r = e(this).data("draggable"),
            i = r.options,
            s = i.snapTolerance,
            o = n.offset.left,
            u = o + r.helperProportions.width,
            a = n.offset.top,
            f = a + r.helperProportions.height;
            for (var l = r.snapElements.length - 1; l >= 0; l--) {
                var c = r.snapElements[l].left,
                h = c + r.snapElements[l].width,
                p = r.snapElements[l].top,
                d = p + r.snapElements[l].height;
                if (! (c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
                    r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
                        snapItem: r.snapElements[l].item
                    })),
                    r.snapElements[l].snapping = !1;
                    continue
                }
                if (i.snapMode != "inner") {
                    var v = Math.abs(p - f) <= s,
                    m = Math.abs(d - a) <= s,
                    g = Math.abs(c - u) <= s,
                    y = Math.abs(h - o) <= s;
                    v && (n.position.top = r._convertPositionTo("relative", {
                        top: p - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top),
                    m && (n.position.top = r._convertPositionTo("relative", {
                        top: d,
                        left: 0
                    }).top - r.margins.top),
                    g && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c - r.helperProportions.width
                    }).left - r.margins.left),
                    y && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: h
                    }).left - r.margins.left)
                }
                var b = v || m || g || y;
                if (i.snapMode != "outer") {
                    var v = Math.abs(p - a) <= s,
                    m = Math.abs(d - f) <= s,
                    g = Math.abs(c - o) <= s,
                    y = Math.abs(h - u) <= s;
                    v && (n.position.top = r._convertPositionTo("relative", {
                        top: p,
                        left: 0
                    }).top - r.margins.top),
                    m && (n.position.top = r._convertPositionTo("relative", {
                        top: d - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top),
                    g && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c
                    }).left - r.margins.left),
                    y && (n.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: h - r.helperProportions.width
                    }).left - r.margins.left)
                } ! r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
                    snapItem: r.snapElements[l].item
                })),
                r.snapElements[l].snapping = v || m || g || y || b
            }
        }
    }),
    e.ui.plugin.add("draggable", "stack", {
        start: function(t, n) {
            var r = e(this).data("draggable").options,
            i = e.makeArray(e(r.stack)).sort(function(t, n) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
            });
            if (!i.length) return;
            var s = parseInt(i[0].style.zIndex) || 0;
            e(i).each(function(e) {
                this.style.zIndex = s + e
            }),
            this[0].style.zIndex = s + i.length
        }
    }),
    e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, n) {
            var r = e(n.helper),
            i = e(this).data("draggable").options;
            r.css("zIndex") && (i._zIndex = r.css("zIndex")),
            r.css("zIndex", i.zIndex)
        },
        stop: function(t, n) {
            var r = e(this).data("draggable").options;
            r._zIndex && e(n.helper).css("zIndex", r._zIndex)
        }
    })
} (jQuery),
function(e, t) {
    var n = 5;
    e.widget("ui.slider", e.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var t, r, i = this.options,
            s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
            o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
            u = [];
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled": "")),
            this.range = e([]),
            i.range && (i.range === !0 && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && i.values.length !== 2 && (i.values = [i.values[0], i.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (i.range === "min" || i.range === "max" ? " ui-slider-range-" + i.range: ""))),
            r = i.values && i.values.length || 1;
            for (t = s.length; t < r; t++) u.push(o);
            this.handles = s.add(e(u.join("")).appendTo(this.element)),
            this.handle = this.handles.eq(0),
            this.handles.add(this.range).filter("a").click(function(e) {
                e.preventDefault()
            }).mouseenter(function() {
                i.disabled || e(this).addClass("ui-state-hover")
            }).mouseleave(function() {
                e(this).removeClass("ui-state-hover")
            }).focus(function() {
                i.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
            }).blur(function() {
                e(this).removeClass("ui-state-focus")
            }),
            this.handles.each(function(t) {
                e(this).data("ui-slider-handle-index", t)
            }),
            this._on(this.handles, {
                keydown: function(t) {
                    var r, i, s, o, u = e(t.target).data("ui-slider-handle-index");
                    switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        t.preventDefault();
                        if (!this._keySliding) {
                            this._keySliding = !0,
                            e(t.target).addClass("ui-state-active"),
                            r = this._start(t, u);
                            if (r === !1) return
                        }
                    }
                    o = this.options.step,
                    this.options.values && this.options.values.length ? i = s = this.values(u) : i = s = this.value();
                    switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                        s = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        s = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / n);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / n);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (i === this._valueMax()) return;
                        s = this._trimAlignValue(i + o);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (i === this._valueMin()) return;
                        s = this._trimAlignValue(i - o)
                    }
                    this._slide(t, u, s)
                },
                keyup: function(t) {
                    var n = e(t.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(t, n), this._change(t, n), e(t.target).removeClass("ui-state-active"))
                }
            }),
            this._refreshValue(),
            this._animateOff = !1
        },
        _destroy: function() {
            this.handles.remove(),
            this.range.remove(),
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"),
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var n, r, i, s, o, u, a, f, l = this,
            c = this.options;
            return c.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(), n = {
                x: t.pageX,
                y: t.pageY
            },
            r = this._normValueFromMouse(n), i = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var n = Math.abs(r - l.values(t));
                i > n && (i = n, s = e(this), o = t)
            }), c.range === !0 && this.values(1) === c.min && (o += 1, s = e(this.handles[o])), u = this._start(t, o), u === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, s.addClass("ui-state-active").focus(), a = s.offset(), f = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = f ? {
                left: 0,
                top: 0
            }: {
                left: t.pageX - a.left - s.width() / 2,
                top: t.pageY - a.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(t, o, r), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return ! 0
        },
        _mouseDrag: function(e) {
            var t = {
                x: e.pageX,
                y: e.pageY
            },
            n = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, n),
            !1
        },
        _mouseStop: function(e) {
            return this.handles.removeClass("ui-state-active"),
            this._mouseSliding = !1,
            this._stop(e, this._handleIndex),
            this._change(e, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1,
            !1
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical": "horizontal"
        },
        _normValueFromMouse: function(e) {
            var t, n, r, i, s;
            return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)),
            r = n / t,
            r > 1 && (r = 1),
            r < 0 && (r = 0),
            this.orientation === "vertical" && (r = 1 - r),
            i = this._valueMax() - this._valueMin(),
            s = this._valueMin() + r * i,
            this._trimAlignValue(s)
        },
        _start: function(e, t) {
            var n = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()),
            this._trigger("start", e, n)
        },
        _slide: function(e, t, n) {
            var r, i, s;
            this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: n,
                values: i
            }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                handle: this.handles[t],
                value: n
            }), s !== !1 && this.value(n))
        },
        _stop: function(e, t) {
            var n = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()),
            this._trigger("stop", e, n)
        },
        _change: function(e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()),
                this._trigger("change", e, n)
            }
        },
        value: function(e) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(e),
                this._refreshValue(),
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(t, n) {
            var r, i, s;
            if (arguments.length > 1) {
                this.options.values[t] = this._trimAlignValue(n),
                this._refreshValue(),
                this._change(null, t);
                return
            }
            if (!arguments.length) return this._values();
            if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            r = this.options.values,
            i = arguments[0];
            for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]),
            this._change(null, s);
            this._refreshValue()
        },
        _setOption: function(t, n) {
            var r, i = 0;
            e.isArray(this.options.values) && (i = this.options.values.length),
            e.Widget.prototype._setOption.apply(this, arguments);
            switch (t) {
            case "disabled":
                n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
                break;
            case "orientation":
                this._detectOrientation(),
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                this._refreshValue();
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                this._animateOff = !0,
                this._refreshValue();
                for (r = 0; r < i; r += 1) this._change(null, r);
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0,
                this._refreshValue(),
                this._animateOff = !1
            }
        },
        _value: function() {
            var e = this.options.value;
            return e = this._trimAlignValue(e),
            e
        },
        _values: function(e) {
            var t, n, r;
            if (arguments.length) return t = this.options.values[e],
            t = this._trimAlignValue(t),
            t;
            n = this.options.values.slice();
            for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
            return n
        },
        _trimAlignValue: function(e) {
            if (e <= this._valueMin()) return this._valueMin();
            if (e >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step: 1,
            n = (e - this._valueMin()) % t,
            r = e - n;
            return Math.abs(n) * 2 >= t && (r += n > 0 ? t: -t),
            parseFloat(r.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var t, n, r, i, s, o = this.options.range,
            u = this.options,
            a = this,
            f = this._animateOff ? !1 : u.animate,
            l = {};
            this.options.values && this.options.values.length ? this.handles.each(function(r) {
                n = (a.values(r) - a._valueMin()) / (a._valueMax() - a._valueMin()) * 100,
                l[a.orientation === "horizontal" ? "left": "bottom"] = n + "%",
                e(this).stop(1, 1)[f ? "animate": "css"](l, u.animate),
                a.options.range === !0 && (a.orientation === "horizontal" ? (r === 0 && a.range.stop(1, 1)[f ? "animate": "css"]({
                    left: n + "%"
                },
                u.animate), r === 1 && a.range[f ? "animate": "css"]({
                    width: n - t + "%"
                },
                {
                    queue: !1,
                    duration: u.animate
                })) : (r === 0 && a.range.stop(1, 1)[f ? "animate": "css"]({
                    bottom: n + "%"
                },
                u.animate), r === 1 && a.range[f ? "animate": "css"]({
                    height: n - t + "%"
                },
                {
                    queue: !1,
                    duration: u.animate
                }))),
                t = n
            }) : (r = this.value(), i = this._valueMin(), s = this._valueMax(), n = s !== i ? (r - i) / (s - i) * 100 : 0, l[this.orientation === "horizontal" ? "left": "bottom"] = n + "%", this.handle.stop(1, 1)[f ? "animate": "css"](l, u.animate), o === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[f ? "animate": "css"]({
                width: n + "%"
            },
            u.animate), o === "max" && this.orientation === "horizontal" && this.range[f ? "animate": "css"]({
                width: 100 - n + "%"
            },
            {
                queue: !1,
                duration: u.animate
            }), o === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[f ? "animate": "css"]({
                height: n + "%"
            },
            u.animate), o === "max" && this.orientation === "vertical" && this.range[f ? "animate": "css"]({
                height: 100 - n + "%"
            },
            {
                queue: !1,
                duration: u.animate
            }))
        }
    })
} (jQuery),
function(e, t) {
    "$:nomunge";
    function N(e) {
        return typeof e == "string"
    }
    function C(e) {
        var t = r.call(arguments, 1);
        return function() {
            return e.apply(this, t.concat(r.call(arguments)))
        }
    }
    function k(e) {
        return e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    function L(e) {
        return e.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }
    function A(r, o, a, f, l) {
        var c, h, p, d, g;
        return f !== n ? (p = a.match(r ? /^([^#]*)\#?(.*)$/: /^([^#?]*)\??([^#]*)(#?.*)/), g = p[3] || "", l === 2 && N(f) ? h = f.replace(r ? S: E, "") : (d = u(p[2]), f = N(f) ? u[r ? m: v](f) : f, h = l === 2 ? f: l === 1 ? e.extend({},
        f, d) : e.extend({},
        d, f), h = s(h), r && (h = h.replace(x, i))), c = p[1] + (r ? "#": h || !p[1] ? "?": "") + h + g) : c = o(a !== n ? a: t[y][b]),
        c
    }
    function O(e, t, r) {
        return t === n || typeof t == "boolean" ? (r = t, t = s[e ? m: v]()) : t = N(t) ? t.replace(e ? S: E, "") : t,
        u(t, r)
    }
    function M(t, r, i, o) {
        return ! N(i) && typeof i != "object" && (o = i, i = r, r = n),
        this.each(function() {
            var n = e(this),
            u = r || h()[(this.nodeName || "").toLowerCase()] || "",
            a = u && n.attr(u) || "";
            n.attr(u, s[t](a, i, o))
        })
    }
    var n, r = Array.prototype.slice,
    i = decodeURIComponent,
    s = e.param,
    o, u, a, f = e.bbq = e.bbq || {},
    l, c, h, p = e.event.special,
    d = "hashchange",
    v = "querystring",
    m = "fragment",
    g = "elemUrlAttr",
    y = "location",
    b = "href",
    w = "src",
    E = /^.*\?|#.*$/g,
    S = /^.*\#/,
    x, T = {};
    s[v] = C(A, 0, L),
    s[m] = o = C(A, 1, k),
    o.noEscape = function(t) {
        t = t || "";
        var n = e.map(t.split(""), encodeURIComponent);
        x = new RegExp(n.join("|"), "g")
    },
    o.noEscape(",/"),
    e.deparam = u = function(t, r) {
        var s = {},
        o = {
            "true": !0,
            "false": !1,
            "null": null
        };
        return e.each(t.replace(/\+/g, " ").split("&"),
        function(t, u) {
            var a = u.split("="),
            f = i(a[0]),
            l,
            c = s,
            h = 0,
            p = f.split("]["),
            d = p.length - 1;
            /\[/.test(p[0]) && /\]$/.test(p[d]) ? (p[d] = p[d].replace(/\]$/, ""), p = p.shift().split("[").concat(p), d = p.length - 1) : d = 0;
            if (a.length === 2) {
                l = i(a[1]),
                r && (l = l && !isNaN(l) ? +l: l === "undefined" ? n: o[l] !== n ? o[l] : l);
                if (d) for (; h <= d; h++) f = p[h] === "" ? c.length: p[h],
                c = c[f] = h < d ? c[f] || (p[h + 1] && isNaN(p[h + 1]) ? {}: []) : l;
                else e.isArray(s[f]) ? s[f].push(l) : s[f] !== n ? s[f] = [s[f], l] : s[f] = l
            } else f && (s[f] = r ? n: "")
        }),
        s
    },
    u[v] = C(O, 0),
    u[m] = a = C(O, 1),
    e[g] || (e[g] = function(t) {
        return e.extend(T, t)
    })({
        a: b,
        base: b,
        iframe: w,
        img: w,
        input: w,
        form: "action",
        link: b,
        script: w
    }),
    h = e[g],
    e.fn[v] = C(M, v),
    e.fn[m] = C(M, m),
    f.pushState = l = function(e, r) {
        N(e) && /^#/.test(e) && r === n && (r = 2);
        var i = e !== n,
        s = o(t[y][b], i ? e: {},
        i ? r: 2);
        t[y][b] = s + (/#/.test(s) ? "": "#")
    },
    f.getState = c = function(e, t) {
        return e === n || typeof e == "boolean" ? a(e) : a(t)[e]
    },
    f.removeState = function(t) {
        var r = {};
        t !== n && (r = c(), e.each(e.isArray(t) ? t: arguments,
        function(e, t) {
            delete r[t]
        })),
        l(r, 2)
    },
    p[d] = e.extend(p[d], {
        add: function(t) {
            function i(e) {
                var t = e[m] = o();
                e.getState = function(e, r) {
                    return e === n || typeof e == "boolean" ? u(t, e) : u(t, r)[e]
                },
                r.apply(this, arguments)
            }
            var r;
            if (e.isFunction(t)) return r = t,
            i;
            r = t.handler,
            t.handler = i
        }
    })
} (jQuery, this),
function(e, t, n) {
    "$:nomunge";
    function h(e) {
        return e = e || t[s][u],
        e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var r, i = e.event.special,
    s = "location",
    o = "hashchange",
    u = "href",
    a = e.browser,
    f = document.documentMode,
    l = a.msie && (f === n || f < 8),
    c = "on" + o in t && !l;
    e[o + "Delay"] = 100,
    i[o] = e.extend(i[o], {
        setup: function() {
            if (c) return ! 1;
            e(r.start)
        },
        teardown: function() {
            if (c) return ! 1;
            e(r.stop)
        }
    }),
    r = function() {
        function c() {
            a = f = function(e) {
                return e
            },
            l && (i = e('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow, f = function() {
                return h(i.document[s][u])
            },
            a = function(e, t) {
                if (e !== t) {
                    var n = i.document;
                    n.open().close(),
                    n[s].hash = "#" + e
                }
            },
            a(h()))
        }
        var n = {},
        r, i, a, f;
        return n.start = function() {
            if (r) return;
            var n = h();
            a || c(),
            function i() {
                var l = h(),
                c = f(n);
                l !== n ? (a(n = l, c), e(t).trigger(o)) : c !== n && (t[s][u] = t[s][u].replace(/#.*/, "") + "#" + c),
                r = setTimeout(i, e[o + "Delay"])
            } ()
        },
        n.stop = function() {
            i || (r && clearTimeout(r), r = 0)
        },
        n
    } ()
} (jQuery, this),
this.Handlebars = {},
function(e) {
    e.VERSION = "1.0.rc.1",
    e.helpers = {},
    e.partials = {},
    e.registerHelper = function(e, t, n) {
        n && (t.not = n),
        this.helpers[e] = t
    },
    e.registerPartial = function(e, t) {
        this.partials[e] = t
    },
    e.registerHelper("helperMissing",
    function(e) {
        if (arguments.length === 2) return undefined;
        throw new Error("Could not find property '" + e + "'")
    });
    var t = Object.prototype.toString,
    n = "[object Function]";
    e.registerHelper("blockHelperMissing",
    function(r, i) {
        var s = i.inverse ||
        function() {},
        o = i.fn,
        u = "",
        a = t.call(r);
        return a === n && (r = r.call(this)),
        r === !0 ? o(this) : r === !1 || r == null ? s(this) : a === "[object Array]" ? r.length > 0 ? e.helpers.each(r, i) : s(this) : o(r)
    }),
    e.K = function() {},
    e.createFrame = Object.create ||
    function(t) {
        e.K.prototype = t;
        var n = new e.K;
        return e.K.prototype = null,
        n
    },
    e.registerHelper("each",
    function(t, n) {
        var r = n.fn,
        i = n.inverse,
        s = "",
        o;
        n.data && (o = e.createFrame(n.data));
        if (t && t.length > 0) for (var u = 0,
        a = t.length; u < a; u++) o && (o.index = u),
        s += r(t[u], {
            data: o
        });
        else s = i(this);
        return s
    }),
    e.registerHelper("if",
    function(r, i) {
        var s = t.call(r);
        return s === n && (r = r.call(this)),
        !r || e.Utils.isEmpty(r) ? i.inverse(this) : i.fn(this)
    }),
    e.registerHelper("unless",
    function(t, n) {
        var r = n.fn,
        i = n.inverse;
        return n.fn = i,
        n.inverse = r,
        e.helpers["if"].call(this, t, n)
    }),
    e.registerHelper("with",
    function(e, t) {
        return t.fn(e)
    }),
    e.registerHelper("log",
    function(t) {
        e.log(t)
    })
} (this.Handlebars);
var handlebars = function() {
    function n() {
        this.yy = {}
    }
    var e = {
        trace: function() {},
        yy: {},
        symbols_: {
            error: 2,
            root: 3,
            program: 4,
            EOF: 5,
            statements: 6,
            simpleInverse: 7,
            statement: 8,
            openInverse: 9,
            closeBlock: 10,
            openBlock: 11,
            mustache: 12,
            partial: 13,
            CONTENT: 14,
            COMMENT: 15,
            OPEN_BLOCK: 16,
            inMustache: 17,
            CLOSE: 18,
            OPEN_INVERSE: 19,
            OPEN_ENDBLOCK: 20,
            path: 21,
            OPEN: 22,
            OPEN_UNESCAPED: 23,
            OPEN_PARTIAL: 24,
            params: 25,
            hash: 26,
            DATA: 27,
            param: 28,
            STRING: 29,
            INTEGER: 30,
            BOOLEAN: 31,
            hashSegments: 32,
            hashSegment: 33,
            ID: 34,
            EQUALS: 35,
            pathSegments: 36,
            SEP: 37,
            $accept: 0,
            $end: 1
        },
        terminals_: {
            2 : "error",
            5 : "EOF",
            14 : "CONTENT",
            15 : "COMMENT",
            16 : "OPEN_BLOCK",
            18 : "CLOSE",
            19 : "OPEN_INVERSE",
            20 : "OPEN_ENDBLOCK",
            22 : "OPEN",
            23 : "OPEN_UNESCAPED",
            24 : "OPEN_PARTIAL",
            27 : "DATA",
            29 : "STRING",
            30 : "INTEGER",
            31 : "BOOLEAN",
            34 : "ID",
            35 : "EQUALS",
            37 : "SEP"
        },
        productions_: [0, [3, 2], [4, 3], [4, 1], [4, 0], [6, 1], [6, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [7, 2], [17, 3], [17, 2], [17, 2], [17, 1], [17, 1], [25, 2], [25, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [26, 1], [32, 2], [32, 1], [33, 3], [33, 3], [33, 3], [33, 3], [33, 3], [21, 1], [36, 3], [36, 1]],
        performAction: function(t, n, r, i, s, o, u) {
            var a = o.length - 1;
            switch (s) {
            case 1:
                return o[a - 1];
            case 2:
                this.$ = new i.ProgramNode(o[a - 2], o[a]);
                break;
            case 3:
                this.$ = new i.ProgramNode(o[a]);
                break;
            case 4:
                this.$ = new i.ProgramNode([]);
                break;
            case 5:
                this.$ = [o[a]];
                break;
            case 6:
                o[a - 1].push(o[a]),
                this.$ = o[a - 1];
                break;
            case 7:
                this.$ = new i.BlockNode(o[a - 2], o[a - 1].inverse, o[a - 1], o[a]);
                break;
            case 8:
                this.$ = new i.BlockNode(o[a - 2], o[a - 1], o[a - 1].inverse, o[a]);
                break;
            case 9:
                this.$ = o[a];
                break;
            case 10:
                this.$ = o[a];
                break;
            case 11:
                this.$ = new i.ContentNode(o[a]);
                break;
            case 12:
                this.$ = new i.CommentNode(o[a]);
                break;
            case 13:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 14:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 15:
                this.$ = o[a - 1];
                break;
            case 16:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 17:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], !0);
                break;
            case 18:
                this.$ = new i.PartialNode(o[a - 1]);
                break;
            case 19:
                this.$ = new i.PartialNode(o[a - 2], o[a - 1]);
                break;
            case 20:
                break;
            case 21:
                this.$ = [[o[a - 2]].concat(o[a - 1]), o[a]];
                break;
            case 22:
                this.$ = [[o[a - 1]].concat(o[a]), null];
                break;
            case 23:
                this.$ = [[o[a - 1]], o[a]];
                break;
            case 24:
                this.$ = [[o[a]], null];
                break;
            case 25:
                this.$ = [[new i.DataNode(o[a])], null];
                break;
            case 26:
                o[a - 1].push(o[a]),
                this.$ = o[a - 1];
                break;
            case 27:
                this.$ = [o[a]];
                break;
            case 28:
                this.$ = o[a];
                break;
            case 29:
                this.$ = new i.StringNode(o[a]);
                break;
            case 30:
                this.$ = new i.IntegerNode(o[a]);
                break;
            case 31:
                this.$ = new i.BooleanNode(o[a]);
                break;
            case 32:
                this.$ = new i.DataNode(o[a]);
                break;
            case 33:
                this.$ = new i.HashNode(o[a]);
                break;
            case 34:
                o[a - 1].push(o[a]),
                this.$ = o[a - 1];
                break;
            case 35:
                this.$ = [o[a]];
                break;
            case 36:
                this.$ = [o[a - 2], o[a]];
                break;
            case 37:
                this.$ = [o[a - 2], new i.StringNode(o[a])];
                break;
            case 38:
                this.$ = [o[a - 2], new i.IntegerNode(o[a])];
                break;
            case 39:
                this.$ = [o[a - 2], new i.BooleanNode(o[a])];
                break;
            case 40:
                this.$ = [o[a - 2], new i.DataNode(o[a])];
                break;
            case 41:
                this.$ = new i.IdNode(o[a]);
                break;
            case 42:
                o[a - 2].push(o[a]),
                this.$ = o[a - 2];
                break;
            case 43:
                this.$ = [o[a]]
            }
        },
        table: [{
            3 : 1,
            4 : 2,
            5 : [2, 4],
            6 : 3,
            8 : 4,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 11],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            1 : [3]
        },
        {
            5 : [1, 16]
        },
        {
            5 : [2, 3],
            7 : 17,
            8 : 18,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 19],
            20 : [2, 3],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            5 : [2, 5],
            14 : [2, 5],
            15 : [2, 5],
            16 : [2, 5],
            19 : [2, 5],
            20 : [2, 5],
            22 : [2, 5],
            23 : [2, 5],
            24 : [2, 5]
        },
        {
            4 : 20,
            6 : 3,
            8 : 4,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 11],
            20 : [2, 4],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            4 : 21,
            6 : 3,
            8 : 4,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 11],
            20 : [2, 4],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            5 : [2, 9],
            14 : [2, 9],
            15 : [2, 9],
            16 : [2, 9],
            19 : [2, 9],
            20 : [2, 9],
            22 : [2, 9],
            23 : [2, 9],
            24 : [2, 9]
        },
        {
            5 : [2, 10],
            14 : [2, 10],
            15 : [2, 10],
            16 : [2, 10],
            19 : [2, 10],
            20 : [2, 10],
            22 : [2, 10],
            23 : [2, 10],
            24 : [2, 10]
        },
        {
            5 : [2, 11],
            14 : [2, 11],
            15 : [2, 11],
            16 : [2, 11],
            19 : [2, 11],
            20 : [2, 11],
            22 : [2, 11],
            23 : [2, 11],
            24 : [2, 11]
        },
        {
            5 : [2, 12],
            14 : [2, 12],
            15 : [2, 12],
            16 : [2, 12],
            19 : [2, 12],
            20 : [2, 12],
            22 : [2, 12],
            23 : [2, 12],
            24 : [2, 12]
        },
        {
            17 : 22,
            21 : 23,
            27 : [1, 24],
            34 : [1, 26],
            36 : 25
        },
        {
            17 : 27,
            21 : 23,
            27 : [1, 24],
            34 : [1, 26],
            36 : 25
        },
        {
            17 : 28,
            21 : 23,
            27 : [1, 24],
            34 : [1, 26],
            36 : 25
        },
        {
            17 : 29,
            21 : 23,
            27 : [1, 24],
            34 : [1, 26],
            36 : 25
        },
        {
            21 : 30,
            34 : [1, 26],
            36 : 25
        },
        {
            1 : [2, 1]
        },
        {
            6 : 31,
            8 : 4,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 11],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            5 : [2, 6],
            14 : [2, 6],
            15 : [2, 6],
            16 : [2, 6],
            19 : [2, 6],
            20 : [2, 6],
            22 : [2, 6],
            23 : [2, 6],
            24 : [2, 6]
        },
        {
            17 : 22,
            18 : [1, 32],
            21 : 23,
            27 : [1, 24],
            34 : [1, 26],
            36 : 25
        },
        {
            10 : 33,
            20 : [1, 34]
        },
        {
            10 : 35,
            20 : [1, 34]
        },
        {
            18 : [1, 36]
        },
        {
            18 : [2, 24],
            21 : 41,
            25 : 37,
            26 : 38,
            27 : [1, 45],
            28 : 39,
            29 : [1, 42],
            30 : [1, 43],
            31 : [1, 44],
            32 : 40,
            33 : 46,
            34 : [1, 47],
            36 : 25
        },
        {
            18 : [2, 25]
        },
        {
            18 : [2, 41],
            27 : [2, 41],
            29 : [2, 41],
            30 : [2, 41],
            31 : [2, 41],
            34 : [2, 41],
            37 : [1, 48]
        },
        {
            18 : [2, 43],
            27 : [2, 43],
            29 : [2, 43],
            30 : [2, 43],
            31 : [2, 43],
            34 : [2, 43],
            37 : [2, 43]
        },
        {
            18 : [1, 49]
        },
        {
            18 : [1, 50]
        },
        {
            18 : [1, 51]
        },
        {
            18 : [1, 52],
            21 : 53,
            34 : [1, 26],
            36 : 25
        },
        {
            5 : [2, 2],
            8 : 18,
            9 : 5,
            11 : 6,
            12 : 7,
            13 : 8,
            14 : [1, 9],
            15 : [1, 10],
            16 : [1, 12],
            19 : [1, 11],
            20 : [2, 2],
            22 : [1, 13],
            23 : [1, 14],
            24 : [1, 15]
        },
        {
            14 : [2, 20],
            15 : [2, 20],
            16 : [2, 20],
            19 : [2, 20],
            22 : [2, 20],
            23 : [2, 20],
            24 : [2, 20]
        },
        {
            5 : [2, 7],
            14 : [2, 7],
            15 : [2, 7],
            16 : [2, 7],
            19 : [2, 7],
            20 : [2, 7],
            22 : [2, 7],
            23 : [2, 7],
            24 : [2, 7]
        },
        {
            21 : 54,
            34 : [1, 26],
            36 : 25
        },
        {
            5 : [2, 8],
            14 : [2, 8],
            15 : [2, 8],
            16 : [2, 8],
            19 : [2, 8],
            20 : [2, 8],
            22 : [2, 8],
            23 : [2, 8],
            24 : [2, 8]
        },
        {
            14 : [2, 14],
            15 : [2, 14],
            16 : [2, 14],
            19 : [2, 14],
            20 : [2, 14],
            22 : [2, 14],
            23 : [2, 14],
            24 : [2, 14]
        },
        {
            18 : [2, 22],
            21 : 41,
            26 : 55,
            27 : [1, 45],
            28 : 56,
            29 : [1, 42],
            30 : [1, 43],
            31 : [1, 44],
            32 : 40,
            33 : 46,
            34 : [1, 47],
            36 : 25
        },
        {
            18 : [2, 23]
        },
        {
            18 : [2, 27],
            27 : [2, 27],
            29 : [2, 27],
            30 : [2, 27],
            31 : [2, 27],
            34 : [2, 27]
        },
        {
            18 : [2, 33],
            33 : 57,
            34 : [1, 58]
        },
        {
            18 : [2, 28],
            27 : [2, 28],
            29 : [2, 28],
            30 : [2, 28],
            31 : [2, 28],
            34 : [2, 28]
        },
        {
            18 : [2, 29],
            27 : [2, 29],
            29 : [2, 29],
            30 : [2, 29],
            31 : [2, 29],
            34 : [2, 29]
        },
        {
            18 : [2, 30],
            27 : [2, 30],
            29 : [2, 30],
            30 : [2, 30],
            31 : [2, 30],
            34 : [2, 30]
        },
        {
            18 : [2, 31],
            27 : [2, 31],
            29 : [2, 31],
            30 : [2, 31],
            31 : [2, 31],
            34 : [2, 31]
        },
        {
            18 : [2, 32],
            27 : [2, 32],
            29 : [2, 32],
            30 : [2, 32],
            31 : [2, 32],
            34 : [2, 32]
        },
        {
            18 : [2, 35],
            34 : [2, 35]
        },
        {
            18 : [2, 43],
            27 : [2, 43],
            29 : [2, 43],
            30 : [2, 43],
            31 : [2, 43],
            34 : [2, 43],
            35 : [1, 59],
            37 : [2, 43]
        },
        {
            34 : [1, 60]
        },
        {
            14 : [2, 13],
            15 : [2, 13],
            16 : [2, 13],
            19 : [2, 13],
            20 : [2, 13],
            22 : [2, 13],
            23 : [2, 13],
            24 : [2, 13]
        },
        {
            5 : [2, 16],
            14 : [2, 16],
            15 : [2, 16],
            16 : [2, 16],
            19 : [2, 16],
            20 : [2, 16],
            22 : [2, 16],
            23 : [2, 16],
            24 : [2, 16]
        },
        {
            5 : [2, 17],
            14 : [2, 17],
            15 : [2, 17],
            16 : [2, 17],
            19 : [2, 17],
            20 : [2, 17],
            22 : [2, 17],
            23 : [2, 17],
            24 : [2, 17]
        },
        {
            5 : [2, 18],
            14 : [2, 18],
            15 : [2, 18],
            16 : [2, 18],
            19 : [2, 18],
            20 : [2, 18],
            22 : [2, 18],
            23 : [2, 18],
            24 : [2, 18]
        },
        {
            18 : [1, 61]
        },
        {
            18 : [1, 62]
        },
        {
            18 : [2, 21]
        },
        {
            18 : [2, 26],
            27 : [2, 26],
            29 : [2, 26],
            30 : [2, 26],
            31 : [2, 26],
            34 : [2, 26]
        },
        {
            18 : [2, 34],
            34 : [2, 34]
        },
        {
            35 : [1, 59]
        },
        {
            21 : 63,
            27 : [1, 67],
            29 : [1, 64],
            30 : [1, 65],
            31 : [1, 66],
            34 : [1, 26],
            36 : 25
        },
        {
            18 : [2, 42],
            27 : [2, 42],
            29 : [2, 42],
            30 : [2, 42],
            31 : [2, 42],
            34 : [2, 42],
            37 : [2, 42]
        },
        {
            5 : [2, 19],
            14 : [2, 19],
            15 : [2, 19],
            16 : [2, 19],
            19 : [2, 19],
            20 : [2, 19],
            22 : [2, 19],
            23 : [2, 19],
            24 : [2, 19]
        },
        {
            5 : [2, 15],
            14 : [2, 15],
            15 : [2, 15],
            16 : [2, 15],
            19 : [2, 15],
            20 : [2, 15],
            22 : [2, 15],
            23 : [2, 15],
            24 : [2, 15]
        },
        {
            18 : [2, 36],
            34 : [2, 36]
        },
        {
            18 : [2, 37],
            34 : [2, 37]
        },
        {
            18 : [2, 38],
            34 : [2, 38]
        },
        {
            18 : [2, 39],
            34 : [2, 39]
        },
        {
            18 : [2, 40],
            34 : [2, 40]
        }],
        defaultActions: {
            16 : [2, 1],
            24 : [2, 25],
            38 : [2, 23],
            55 : [2, 21]
        },
        parseError: function(t, n) {
            throw new Error(t)
        },
        parse: function(t) {
            function v(e) {
                r.length = r.length - 2 * e,
                i.length = i.length - e,
                s.length = s.length - e
            }
            function m() {
                var e;
                return e = n.lexer.lex() || 1,
                typeof e != "number" && (e = n.symbols_[e] || e),
                e
            }
            var n = this,
            r = [0],
            i = [null],
            s = [],
            o = this.table,
            u = "",
            a = 0,
            f = 0,
            l = 0,
            c = 2,
            h = 1;
            this.lexer.setInput(t),
            this.lexer.yy = this.yy,
            this.yy.lexer = this.lexer,
            this.yy.parser = this,
            typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
            var p = this.lexer.yylloc;
            s.push(p);
            var d = this.lexer.options && this.lexer.options.ranges;
            typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
            var g, y, b, w, E, S, x = {},
            T, N, C, k;
            for (;;) {
                b = r[r.length - 1];
                if (this.defaultActions[b]) w = this.defaultActions[b];
                else {
                    if (g === null || typeof g == "undefined") g = m();
                    w = o[b] && o[b][g]
                }
                if (typeof w == "undefined" || !w.length || !w[0]) {
                    var L = "";
                    if (!l) {
                        k = [];
                        for (T in o[b]) this.terminals_[T] && T > 2 && k.push("'" + this.terminals_[T] + "'");
                        this.lexer.showPosition ? L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'": L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input": "'" + (this.terminals_[g] || g) + "'"),
                        this.parseError(L, {
                            text: this.lexer.match,
                            token: this.terminals_[g] || g,
                            line: this.lexer.yylineno,
                            loc: p,
                            expected: k
                        })
                    }
                }
                if (w[0] instanceof Array && w.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g);
                switch (w[0]) {
                case 1:
                    r.push(g),
                    i.push(this.lexer.yytext),
                    s.push(this.lexer.yylloc),
                    r.push(w[1]),
                    g = null,
                    y ? (g = y, y = null) : (f = this.lexer.yyleng, u = this.lexer.yytext, a = this.lexer.yylineno, p = this.lexer.yylloc, l > 0 && l--);
                    break;
                case 2:
                    N = this.productions_[w[1]][1],
                    x.$ = i[i.length - N],
                    x._$ = {
                        first_line: s[s.length - (N || 1)].first_line,
                        last_line: s[s.length - 1].last_line,
                        first_column: s[s.length - (N || 1)].first_column,
                        last_column: s[s.length - 1].last_column
                    },
                    d && (x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]),
                    S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
                    if (typeof S != "undefined") return S;
                    N && (r = r.slice(0, -1 * N * 2), i = i.slice(0, -1 * N), s = s.slice(0, -1 * N)),
                    r.push(this.productions_[w[1]][0]),
                    i.push(x.$),
                    s.push(x._$),
                    C = o[r[r.length - 2]][r[r.length - 1]],
                    r.push(C);
                    break;
                case 3:
                    return ! 0
                }
            }
            return ! 0
        }
    },
    t = function() {
        var e = {
            EOF: 1,
            parseError: function(t, n) {
                if (!this.yy.parser) throw new Error(t);
                this.yy.parser.parseError(t, n)
            },
            setInput: function(e) {
                return this._input = e,
                this._more = this._less = this.done = !1,
                this.yylineno = this.yyleng = 0,
                this.yytext = this.matched = this.match = "",
                this.conditionStack = ["INITIAL"],
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                },
                this.options.ranges && (this.yylloc.range = [0, 0]),
                this.offset = 0,
                this
            },
            input: function() {
                var e = this._input[0];
                this.yytext += e,
                this.yyleng++,
                this.offset++,
                this.match += e,
                this.matched += e;
                var t = e.match(/(?:\r\n?|\n).*/g);
                return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++,
                this.options.ranges && this.yylloc.range[1]++,
                this._input = this._input.slice(1),
                e
            },
            unput: function(e) {
                var t = e.length,
                n = e.split(/(?:\r\n?|\n)/g);
                this._input = e + this._input,
                this.yytext = this.yytext.substr(0, this.yytext.length - t - 1),
                this.offset -= t;
                var r = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1),
                this.matched = this.matched.substr(0, this.matched.length - 1),
                n.length - 1 && (this.yylineno -= n.length - 1);
                var i = this.yylloc.range;
                return this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: n ? (n.length === r.length ? this.yylloc.first_column: 0) + r[r.length - n.length].length - n[0].length: this.yylloc.first_column - t
                },
                this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]),
                this
            },
            more: function() {
                return this._more = !0,
                this
            },
            less: function(e) {
                this.unput(this.match.slice(e))
            },
            pastInput: function() {
                var e = this.matched.substr(0, this.matched.length - this.match.length);
                return (e.length > 20 ? "...": "") + e.substr( - 20).replace(/\n/g, "")
            },
            upcomingInput: function() {
                var e = this.match;
                return e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
                (e.substr(0, 20) + (e.length > 20 ? "...": "")).replace(/\n/g, "")
            },
            showPosition: function() {
                var e = this.pastInput(),
                t = (new Array(e.length + 1)).join("-");
                return e + this.upcomingInput() + "\n" + t + "^"
            },
            next: function() {
                if (this.done) return this.EOF;
                this._input || (this.done = !0);
                var e, t, n, r, i, s;
                this._more || (this.yytext = "", this.match = "");
                var o = this._currentRules();
                for (var u = 0; u < o.length; u++) {
                    n = this._input.match(this.rules[o[u]]);
                    if (n && (!t || n[0].length > t[0].length)) {
                        t = n,
                        r = u;
                        if (!this.options.flex) break
                    }
                }
                if (t) {
                    s = t[0].match(/(?:\r\n?|\n).*/g),
                    s && (this.yylineno += s.length),
                    this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length: this.yylloc.last_column + t[0].length
                    },
                    this.yytext += t[0],
                    this.match += t[0],
                    this.matches = t,
                    this.yyleng = this.yytext.length,
                    this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]),
                    this._more = !1,
                    this._input = this._input.slice(t[0].length),
                    this.matched += t[0],
                    e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]),
                    this.done && this._input && (this.done = !1);
                    if (e) return e;
                    return
                }
                return this._input === "" ? this.EOF: this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                })
            },
            lex: function() {
                var t = this.next();
                return typeof t != "undefined" ? t: this.lex()
            },
            begin: function(t) {
                this.conditionStack.push(t)
            },
            popState: function() {
                return this.conditionStack.pop()
            },
            _currentRules: function() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
            },
            topState: function() {
                return this.conditionStack[this.conditionStack.length - 2]
            },
            pushState: function(t) {
                this.begin(t)
            }
        };
        return e.options = {},
        e.performAction = function(t, n, r, i) {
            var s = i;
            switch (r) {
            case 0:
                n.yytext.slice( - 1) !== "\\" && this.begin("mu"),
                n.yytext.slice( - 1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1), this.begin("emu"));
                if (n.yytext) return 14;
                break;
            case 1:
                return 14;
            case 2:
                return n.yytext.slice( - 1) !== "\\" && this.popState(),
                n.yytext.slice( - 1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1)),
                14;
            case 3:
                return 24;
            case 4:
                return 16;
            case 5:
                return 20;
            case 6:
                return 19;
            case 7:
                return 19;
            case 8:
                return 23;
            case 9:
                return 23;
            case 10:
                return n.yytext = n.yytext.substr(3, n.yyleng - 5),
                this.popState(),
                15;
            case 11:
                return 22;
            case 12:
                return 35;
            case 13:
                return 34;
            case 14:
                return 34;
            case 15:
                return 37;
            case 16:
                break;
            case 17:
                return this.popState(),
                18;
            case 18:
                return this.popState(),
                18;
            case 19:
                return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'),
                29;
            case 20:
                return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'),
                29;
            case 21:
                return n.yytext = n.yytext.substr(1),
                27;
            case 22:
                return 31;
            case 23:
                return 31;
            case 24:
                return 30;
            case 25:
                return 34;
            case 26:
                return n.yytext = n.yytext.substr(1, n.yyleng - 2),
                34;
            case 27:
                return "INVALID";
            case 28:
                return 5
            }
        },
        e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[} ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/],
        e.conditions = {
            mu: {
                rules: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
                inclusive: !1
            },
            emu: {
                rules: [2],
                inclusive: !1
            },
            INITIAL: {
                rules: [0, 1, 28],
                inclusive: !0
            }
        },
        e
    } ();
    return e.lexer = t,
    n.prototype = e,
    e.Parser = n,
    new n
} ();
typeof require != "undefined" && typeof exports != "undefined" && (exports.parser = handlebars, exports.Parser = handlebars.Parser, exports.parse = function() {
    return handlebars.parse.apply(handlebars, arguments)
},
exports.main = function(t) {
    if (!t[1]) throw new Error("Usage: " + t[0] + " FILE");
    var n, r;
    return typeof process != "undefined" ? n = require("fs").readFileSync(require("path").resolve(t[1]), "utf8") : n = require("file").path(require("file").cwd()).join(t[1]).read({
        charset: "utf-8"
    }),
    exports.parser.parse(n)
},
typeof module != "undefined" && require.main === module && exports.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args)),
Handlebars.Parser = handlebars,
Handlebars.parse = function(e) {
    return Handlebars.Parser.yy = Handlebars.AST,
    Handlebars.Parser.parse(e)
},
Handlebars.print = function(e) {
    return (new Handlebars.PrintVisitor).accept(e)
},
Handlebars.logger = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,
    log: function(e, t) {}
},
Handlebars.log = function(e, t) {
    Handlebars.logger.log(e, t)
},
function() {
    Handlebars.AST = {},
    Handlebars.AST.ProgramNode = function(e, t) {
        this.type = "program",
        this.statements = e,
        t && (this.inverse = new Handlebars.AST.ProgramNode(t))
    },
    Handlebars.AST.MustacheNode = function(e, t, n) {
        this.type = "mustache",
        this.escaped = !n,
        this.hash = t;
        var r = this.id = e[0],
        i = this.params = e.slice(1),
        s = this.eligibleHelper = r.isSimple;
        this.isHelper = s && (i.length || t)
    },
    Handlebars.AST.PartialNode = function(e, t) {
        this.type = "partial",
        this.id = e,
        this.context = t
    };
    var e = function(e, t) {
        if (e.original !== t.original) throw new Handlebars.Exception(e.original + " doesn't match " + t.original)
    };
    Handlebars.AST.BlockNode = function(t, n, r, i) {
        e(t.id, i),
        this.type = "block",
        this.mustache = t,
        this.program = n,
        this.inverse = r,
        this.inverse && !this.program && (this.isInverse = !0)
    },
    Handlebars.AST.ContentNode = function(e) {
        this.type = "content",
        this.string = e
    },
    Handlebars.AST.HashNode = function(e) {
        this.type = "hash",
        this.pairs = e
    },
    Handlebars.AST.IdNode = function(e) {
        this.type = "ID",
        this.original = e.join(".");
        var t = [],
        n = 0;
        for (var r = 0,
        i = e.length; r < i; r++) {
            var s = e[r];
            s === ".." ? n++:s === "." || s === "this" ? this.isScoped = !0 : t.push(s)
        }
        this.parts = t,
        this.string = t.join("."),
        this.depth = n,
        this.isSimple = e.length === 1 && !this.isScoped && n === 0
    },
    Handlebars.AST.DataNode = function(e) {
        this.type = "DATA",
        this.id = e
    },
    Handlebars.AST.StringNode = function(e) {
        this.type = "STRING",
        this.string = e
    },
    Handlebars.AST.IntegerNode = function(e) {
        this.type = "INTEGER",
        this.integer = e
    },
    Handlebars.AST.BooleanNode = function(e) {
        this.type = "BOOLEAN",
        this.bool = e
    },
    Handlebars.AST.CommentNode = function(e) {
        this.type = "comment",
        this.comment = e
    }
} (),
Handlebars.Exception = function(e) {
    var t = Error.prototype.constructor.apply(this, arguments);
    for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
    this.message = t.message
},
Handlebars.Exception.prototype = new Error,
Handlebars.SafeString = function(e) {
    this.string = e
},
Handlebars.SafeString.prototype.toString = function() {
    return this.string.toString()
},
function() {
    var e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    },
    t = /[&<>"'`]/g,
    n = /[&<>"'`]/,
    r = function(t) {
        return e[t] || "&amp;"
    };
    Handlebars.Utils = {
        escapeExpression: function(e) {
            return e instanceof Handlebars.SafeString ? e.toString() : e == null || e === !1 ? "": n.test(e) ? e.replace(t, r) : e
        },
        isEmpty: function(e) {
            return typeof e == "undefined" ? !0 : e === null ? !0 : e === !1 ? !0 : Object.prototype.toString.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
        }
    }
} (),
Handlebars.Compiler = function() {},
Handlebars.JavaScriptCompiler = function() {},
function(e, t) {
    e.prototype = {
        compiler: e,
        disassemble: function() {
            var e = this.opcodes,
            t, n = [],
            r,
            i;
            for (var s = 0,
            o = e.length; s < o; s++) {
                t = e[s];
                if (t.opcode === "DECLARE") n.push("DECLARE " + t.name + "=" + t.value);
                else {
                    r = [];
                    for (var u = 0; u < t.args.length; u++) i = t.args[u],
                    typeof i == "string" && (i = '"' + i.replace("\n", "\\n") + '"'),
                    r.push(i);
                    n.push(t.opcode + " " + r.join(" "))
                }
            }
            return n.join("\n")
        },
        guid: 0,
        compile: function(e, t) {
            this.children = [],
            this.depths = {
                list: []
            },
            this.options = t;
            var n = this.options.knownHelpers;
            this.options.knownHelpers = {
                helperMissing: !0,
                blockHelperMissing: !0,
                each: !0,
                "if": !0,
                unless: !0,
                "with": !0,
                log: !0
            };
            if (n) for (var r in n) this.options.knownHelpers[r] = n[r];
            return this.program(e)
        },
        accept: function(e) {
            return this[e.type](e)
        },
        program: function(e) {
            var t = e.statements,
            n;
            this.opcodes = [];
            for (var r = 0,
            i = t.length; r < i; r++) n = t[r],
            this[n.type](n);
            return this.isSimple = i === 1,
            this.depths.list = this.depths.list.sort(function(e, t) {
                return e - t
            }),
            this
        },
        compileProgram: function(e) {
            var t = (new this.compiler).compile(e, this.options),
            n = this.guid++,
            r;
            this.usePartial = this.usePartial || t.usePartial,
            this.children[n] = t;
            for (var i = 0,
            s = t.depths.list.length; i < s; i++) {
                r = t.depths.list[i];
                if (r < 2) continue;
                this.addDepth(r - 1)
            }
            return n
        },
        block: function(e) {
            var t = e.mustache,
            n = e.program,
            r = e.inverse;
            n && (n = this.compileProgram(n)),
            r && (r = this.compileProgram(r));
            var i = this.classifyMustache(t);
            i === "helper" ? this.helperMustache(t, n, r) : i === "simple" ? (this.simpleMustache(t), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("blockValue")) : (this.ambiguousMustache(t, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("ambiguousBlockValue")),
            this.opcode("append")
        },
        hash: function(e) {
            var t = e.pairs,
            n, r;
            this.opcode("push", "{}");
            for (var i = 0,
            s = t.length; i < s; i++) n = t[i],
            r = n[1],
            this.accept(r),
            this.opcode("assignToHash", n[0])
        },
        partial: function(e) {
            var t = e.id;
            this.usePartial = !0,
            e.context ? this.ID(e.context) : this.opcode("push", "depth0"),
            this.opcode("invokePartial", t.original),
            this.opcode("append")
        },
        content: function(e) {
            this.opcode("appendContent", e.string)
        },
        mustache: function(e) {
            var t = this.options,
            n = this.classifyMustache(e);
            n === "simple" ? this.simpleMustache(e) : n === "helper" ? this.helperMustache(e) : this.ambiguousMustache(e),
            e.escaped && !t.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
        },
        ambiguousMustache: function(e, t, n) {
            var r = e.id,
            i = r.parts[0];
            this.opcode("getContext", r.depth),
            this.opcode("pushProgram", t),
            this.opcode("pushProgram", n),
            this.opcode("invokeAmbiguous", i)
        },
        simpleMustache: function(e, t, n) {
            var r = e.id;
            r.type === "DATA" ? this.DATA(r) : r.parts.length ? this.ID(r) : (this.addDepth(r.depth), this.opcode("getContext", r.depth), this.opcode("pushContext")),
            this.opcode("resolvePossibleLambda")
        },
        helperMustache: function(e, t, n) {
            var r = this.setupFullMustacheParams(e, t, n),
            i = e.id.parts[0];
            if (this.options.knownHelpers[i]) this.opcode("invokeKnownHelper", r.length, i);
            else {
                if (this.knownHelpersOnly) throw new Error("You specified knownHelpersOnly, but used the unknown helper " + i);
                this.opcode("invokeHelper", r.length, i)
            }
        },
        ID: function(e) {
            this.addDepth(e.depth),
            this.opcode("getContext", e.depth);
            var t = e.parts[0];
            t ? this.opcode("lookupOnContext", e.parts[0]) : this.opcode("pushContext");
            for (var n = 1,
            r = e.parts.length; n < r; n++) this.opcode("lookup", e.parts[n])
        },
        DATA: function(e) {
            this.options.data = !0,
            this.opcode("lookupData", e.id)
        },
        STRING: function(e) {
            this.opcode("pushString", e.string)
        },
        INTEGER: function(e) {
            this.opcode("pushLiteral", e.integer)
        },
        BOOLEAN: function(e) {
            this.opcode("pushLiteral", e.bool)
        },
        comment: function() {},
        opcode: function(e) {
            this.opcodes.push({
                opcode: e,
                args: [].slice.call(arguments, 1)
            })
        },
        declare: function(e, t) {
            this.opcodes.push({
                opcode: "DECLARE",
                name: e,
                value: t
            })
        },
        addDepth: function(e) {
            if (isNaN(e)) throw new Error("EWOT");
            if (e === 0) return;
            this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
        },
        classifyMustache: function(e) {
            var t = e.isHelper,
            n = e.eligibleHelper,
            r = this.options;
            if (n && !t) {
                var i = e.id.parts[0];
                r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
            }
            return t ? "helper": n ? "ambiguous": "simple"
        },
        pushParams: function(e) {
            var t = e.length,
            n;
            while (t--) n = e[t],
            this.options.stringParams ? (n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", n.string)) : this[n.type](n)
        },
        setupMustacheParams: function(e) {
            var t = e.params;
            return this.pushParams(t),
            e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"),
            t
        },
        setupFullMustacheParams: function(e, t, n) {
            var r = e.params;
            return this.pushParams(r),
            this.opcode("pushProgram", t),
            this.opcode("pushProgram", n),
            e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"),
            r
        }
    };
    var n = function(e) {
        this.value = e
    };
    t.prototype = {
        nameLookup: function(e, n, r) {
            return /^[0-9]+$/.test(n) ? e + "[" + n + "]": t.isValidJavaScriptVariableName(n) ? e + "." + n: e + "['" + n + "']"
        },
        appendToBuffer: function(e) {
            return this.environment.isSimple ? "return " + e + ";": "buffer += " + e + ";"
        },
        initializeBuffer: function() {
            return this.quotedString("")
        },
        namespace: "Handlebars",
        compile: function(e, t, n, r) {
            this.environment = e,
            this.options = t || {},
            Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n"),
            this.name = this.environment.name,
            this.isChild = !!n,
            this.context = n || {
                programs: [],
                aliases: {}
            },
            this.preamble(),
            this.stackSlot = 0,
            this.stackVars = [],
            this.registers = {
                list: []
            },
            this.compileStack = [],
            this.compileChildren(e, t);
            var i = e.opcodes,
            s;
            this.i = 0;
            for (o = i.length; this.i < o; this.i++) s = i[this.i],
            s.opcode === "DECLARE" ? this[s.name] = s.value: this[s.opcode].apply(this, s.args);
            return this.createFunctionContext(r)
        },
        nextOpcode: function() {
            var e = this.environment.opcodes,
            t = e[this.i + 1];
            return e[this.i + 1]
        },
        eat: function(e) {
            this.i = this.i + 1
        },
        preamble: function() {
            var e = [];
            if (!this.isChild) {
                var t = this.namespace,
                n = "helpers = helpers || " + t + ".helpers;";
                this.environment.usePartial && (n = n + " partials = partials || " + t + ".partials;"),
                this.options.data && (n += " data = data || {};"),
                e.push(n)
            } else e.push("");
            this.environment.isSimple ? e.push("") : e.push(", buffer = " + this.initializeBuffer()),
            this.lastContext = 0,
            this.source = e
        },
        createFunctionContext: function(e) {
            var t = this.stackVars.concat(this.registers.list);
            t.length > 0 && (this.source[1] = this.source[1] + ", " + t.join(", "));
            if (!this.isChild) {
                var n = [];
                for (var r in this.context.aliases) this.source[1] = this.source[1] + ", " + r + "=" + this.context.aliases[r]
            }
            this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"),
            this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"),
            this.environment.isSimple || this.source.push("return buffer;");
            var i = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
            for (var s = 0,
            o = this.environment.depths.list.length; s < o; s++) i.push("depth" + this.environment.depths.list[s]);
            if (e) return i.push(this.source.join("\n  ")),
            Function.apply(this, i);
            var u = "function " + (this.name || "") + "(" + i.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
            return Handlebars.log(Handlebars.logger.DEBUG, u + "\n\n"),
            u
        },
        blockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e),
            this.replaceStack(function(t) {
                return e.splice(1, 0, t),
                t + " = blockHelperMissing.call(" + e.join(", ") + ")"
            })
        },
        ambiguousBlockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e);
            var t = this.topStack();
            e.splice(1, 0, t),
            this.source.push("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
        },
        appendContent: function(e) {
            this.source.push(this.appendToBuffer(this.quotedString(e)))
        },
        append: function() {
            var e = this.popStack();
            this.source.push("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"),
            this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
        },
        appendEscaped: function() {
            var e = this.nextOpcode(),
            t = "";
            this.context.aliases.escapeExpression = "this.escapeExpression",
            e && e.opcode === "appendContent" && (t = " + " + this.quotedString(e.args[0]), this.eat(e)),
            this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + t))
        },
        getContext: function(e) {
            this.lastContext !== e && (this.lastContext = e)
        },
        lookupOnContext: function(e) {
            this.pushStack(this.nameLookup("depth" + this.lastContext, e, "context"))
        },
        pushContext: function() {
            this.pushStackLiteral("depth" + this.lastContext)
        },
        resolvePossibleLambda: function() {
            this.context.aliases.functionType = '"function"',
            this.replaceStack(function(e) {
                return "typeof " + e + " === functionType ? " + e + "() : " + e
            })
        },
        lookup: function(e) {
            this.replaceStack(function(t) {
                return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
            })
        },
        lookupData: function(e) {
            this.pushStack(this.nameLookup("data", e, "data"))
        },
        pushStringParam: function(e) {
            this.pushStackLiteral("depth" + this.lastContext),
            this.pushString(e)
        },
        pushString: function(e) {
            this.pushStackLiteral(this.quotedString(e))
        },
        push: function(e) {
            this.pushStack(e)
        },
        pushLiteral: function(e) {
            this.pushStackLiteral(e)
        },
        pushProgram: function(e) {
            e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
        },
        invokeHelper: function(e, t) {
            this.context.aliases.helperMissing = "helpers.helperMissing";
            var n = this.lastHelper = this.setupHelper(e, t);
            this.register("foundHelper", n.name),
            this.pushStack("foundHelper ? foundHelper.call(" + n.callParams + ") " + ": helperMissing.call(" + n.helperMissingParams + ")")
        },
        invokeKnownHelper: function(e, t) {
            var n = this.setupHelper(e, t);
            this.pushStack(n.name + ".call(" + n.callParams + ")")
        },
        invokeAmbiguous: function(e) {
            this.context.aliases.functionType = '"function"',
            this.pushStackLiteral("{}");
            var t = this.setupHelper(0, e),
            n = this.lastHelper = this.nameLookup("helpers", e, "helper");
            this.register("foundHelper", n);
            var r = this.nameLookup("depth" + this.lastContext, e, "context"),
            i = this.nextStack();
            this.source.push("if (foundHelper) { " + i + " = foundHelper.call(" + t.callParams + "); }"),
            this.source.push("else { " + i + " = " + r + "; " + i + " = typeof " + i + " === functionType ? " + i + "() : " + i + "; }")
        },
        invokePartial: function(e) {
            var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
            this.options.data && t.push("data"),
            this.context.aliases.self = "this",
            this.pushStack("self.invokePartial(" + t.join(", ") + ");")
        },
        assignToHash: function(e) {
            var t = this.popStack(),
            n = this.topStack();
            this.source.push(n + "['" + e + "'] = " + t + ";")
        },
        compiler: t,
        compileChildren: function(e, t) {
            var n = e.children,
            r, i;
            for (var s = 0,
            o = n.length; s < o; s++) {
                r = n[s],
                i = new this.compiler,
                this.context.programs.push("");
                var u = this.context.programs.length;
                r.index = u,
                r.name = "program" + u,
                this.context.programs[u] = i.compile(r, t, this.context)
            }
        },
        programExpression: function(e) {
            this.context.aliases.self = "this";
            if (e == null) return "self.noop";
            var t = this.environment.children[e],
            n = t.depths.list,
            r,
            i = [t.index, t.name, "data"];
            for (var s = 0,
            o = n.length; s < o; s++) r = n[s],
            r === 1 ? i.push("depth0") : i.push("depth" + (r - 1));
            return n.length === 0 ? "self.program(" + i.join(", ") + ")": (i.shift(), "self.programWithDepth(" + i.join(", ") + ")")
        },
        register: function(e, t) {
            this.useRegister(e),
            this.source.push(e + " = " + t + ";")
        },
        useRegister: function(e) {
            this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
        },
        pushStackLiteral: function(e) {
            return this.compileStack.push(new n(e)),
            e
        },
        pushStack: function(e) {
            return this.source.push(this.incrStack() + " = " + e + ";"),
            this.compileStack.push("stack" + this.stackSlot),
            "stack" + this.stackSlot
        },
        replaceStack: function(e) {
            var t = e.call(this, this.topStack());
            return this.source.push(this.topStack() + " = " + t + ";"),
            "stack" + this.stackSlot
        },
        nextStack: function(e) {
            var t = this.incrStack();
            return this.compileStack.push("stack" + this.stackSlot),
            t
        },
        incrStack: function() {
            return this.stackSlot++,
            this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot),
            "stack" + this.stackSlot
        },
        popStack: function() {
            var e = this.compileStack.pop();
            return e instanceof n ? e.value: (this.stackSlot--, e)
        },
        topStack: function() {
            var e = this.compileStack[this.compileStack.length - 1];
            return e instanceof n ? e.value: e
        },
        quotedString: function(e) {
            return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
        },
        setupHelper: function(e, t) {
            var n = [];
            this.setupParams(e, n);
            var r = this.nameLookup("helpers", t, "helper");
            return {
                params: n,
                name: r,
                callParams: ["depth0"].concat(n).join(", "),
                helperMissingParams: ["depth0", this.quotedString(t)].concat(n).join(", ")
            }
        },
        setupParams: function(e, t) {
            var n = [],
            r = [],
            i,
            s,
            o;
            n.push("hash:" + this.popStack()),
            s = this.popStack(),
            o = this.popStack();
            if (o || s) o || (this.context.aliases.self = "this", o = "self.noop"),
            s || (this.context.aliases.self = "this", s = "self.noop"),
            n.push("inverse:" + s),
            n.push("fn:" + o);
            for (var u = 0; u < e; u++) i = this.popStack(),
            t.push(i),
            this.options.stringParams && r.push(this.popStack());
            return this.options.stringParams && n.push("contexts:[" + r.join(",") + "]"),
            this.options.data && n.push("data:data"),
            t.push("{" + n.join(",") + "}"),
            t.join(", ")
        }
    };
    var r = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),
    i = t.RESERVED_WORDS = {};
    for (var s = 0,
    o = r.length; s < o; s++) i[r[s]] = !0;
    t.isValidJavaScriptVariableName = function(e) {
        return ! t.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e) ? !0 : !1
    }
} (Handlebars.Compiler, Handlebars.JavaScriptCompiler),
Handlebars.precompile = function(e, t) {
    t = t || {};
    var n = Handlebars.parse(e),
    r = (new Handlebars.Compiler).compile(n, t);
    return (new Handlebars.JavaScriptCompiler).compile(r, t)
},
Handlebars.compile = function(e, t) {
    function r() {
        var n = Handlebars.parse(e),
        r = (new Handlebars.Compiler).compile(n, t),
        i = (new Handlebars.JavaScriptCompiler).compile(r, t, undefined, !0);
        return Handlebars.template(i)
    }
    t = t || {};
    var n;
    return function(e, t) {
        return n || (n = r()),
        n.call(this, e, t)
    }
},
Handlebars.VM = {
    template: function(e) {
        var t = {
            escapeExpression: Handlebars.Utils.escapeExpression,
            invokePartial: Handlebars.VM.invokePartial,
            programs: [],
            program: function(e, t, n) {
                var r = this.programs[e];
                return n ? Handlebars.VM.program(t, n) : r ? r: (r = this.programs[e] = Handlebars.VM.program(t), r)
            },
            programWithDepth: Handlebars.VM.programWithDepth,
            noop: Handlebars.VM.noop
        };
        return function(n, r) {
            return r = r || {},
            e.call(t, Handlebars, n, r.helpers, r.partials, r.data)
        }
    },
    programWithDepth: function(e, t, n) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function(n, i) {
            return i = i || {},
            e.apply(this, [n, i.data || t].concat(r))
        }
    },
    program: function(e, t) {
        return function(n, r) {
            return r = r || {},
            e(n, r.data || t)
        }
    },
    noop: function() {
        return ""
    },
    invokePartial: function(e, t, n, r, i, s) {
        var o = {
            helpers: r,
            partials: i,
            data: s
        };
        if (e === undefined) throw new Handlebars.Exception("The partial " + t + " could not be found");
        if (e instanceof Function) return e(n, o);
        if (!Handlebars.compile) throw new Handlebars.Exception("The partial " + t + " could not be compiled when running in runtime-only mode");
        return i[t] = Handlebars.compile(e, {
            data: s !== undefined
        }),
        i[t](n, o)
    }
},
Handlebars.template = Handlebars.VM.template,
function(e) {
    function O(e, t, n, r) {
        var i = n.lang();
        return i[e].call ? i[e](n, r) : i[e][t]
    }
    function M(e, t) {
        return function(n) {
            return B(e.call(this, n), t)
        }
    }
    function _(e) {
        return function(t) {
            var n = e.call(this, t);
            return n + this.lang().ordinal(n)
        }
    }
    function D(e, t, n) {
        this._d = e,
        this._isUTC = !!t,
        this._a = e._a || null,
        this._lang = n || !1
    }
    function P(e) {
        var t = this._data = {},
        n = e.years || e.y || 0,
        r = e.months || e.M || 0,
        i = e.weeks || e.w || 0,
        s = e.days || e.d || 0,
        o = e.hours || e.h || 0,
        u = e.minutes || e.m || 0,
        a = e.seconds || e.s || 0,
        f = e.milliseconds || e.ms || 0;
        this._milliseconds = f + a * 1e3 + u * 6e4 + o * 36e5,
        this._days = s + i * 7,
        this._months = r + n * 12,
        t.milliseconds = f % 1e3,
        a += H(f / 1e3),
        t.seconds = a % 60,
        u += H(a / 60),
        t.minutes = u % 60,
        o += H(u / 60),
        t.hours = o % 24,
        s += H(o / 24),
        s += i * 7,
        t.days = s % 30,
        r += H(s / 30),
        t.months = r % 12,
        n += H(r / 12),
        t.years = n,
        this._lang = !1
    }
    function H(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e)
    }
    function B(e, t) {
        var n = e + "";
        while (n.length < t) n = "0" + n;
        return n
    }
    function j(e, t, n) {
        var r = t._milliseconds,
        i = t._days,
        s = t._months,
        o;
        r && e._d.setTime( + e + r * n),
        i && e.date(e.date() + i * n),
        s && (o = e.date(), e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())))
    }
    function F(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    }
    function I(e, t) {
        var n = Math.min(e.length, t.length),
        r = Math.abs(e.length - t.length),
        i = 0,
        s;
        for (s = 0; s < n; s++)~~e[s] !== ~~t[s] && i++;
        return i + r
    }
    function q(e, t, n, r) {
        var i, s, o = [];
        for (i = 0; i < 7; i++) o[i] = e[i] = e[i] == null ? i === 2 ? 1 : 0 : e[i];
        return e[7] = o[7] = t,
        e[8] != null && (o[8] = e[8]),
        e[3] += n || 0,
        e[4] += r || 0,
        s = new Date(0),
        t ? (s.setUTCFullYear(e[0], e[1], e[2]), s.setUTCHours(e[3], e[4], e[5], e[6])) : (s.setFullYear(e[0], e[1], e[2]), s.setHours(e[3], e[4], e[5], e[6])),
        s._a = o,
        s
    }
    function R(e, n) {
        var r, i, o = []; ! n && u && (n = require("./lang/" + e));
        for (r = 0; r < a.length; r++) n[a[r]] = n[a[r]] || s.en[a[r]];
        for (r = 0; r < 12; r++) i = t([2e3, r]),
        o[r] = new RegExp("^" + (n.months[r] || n.months(i, "")) + "|^" + (n.monthsShort[r] || n.monthsShort(i, "")).replace(".", ""), "i");
        return n.monthsParse = n.monthsParse || o,
        s[e] = n,
        n
    }
    function U(e) {
        var n = typeof e == "string" && e || e && e._lang || null;
        return n ? s[n] || R(n) : t
    }
    function z(e) {
        return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }
    function W(e) {
        var t = e.match(l),
        n,
        r;
        for (n = 0, r = t.length; n < r; n++) A[t[n]] ? t[n] = A[t[n]] : t[n] = z(t[n]);
        return function(i) {
            var s = "";
            for (n = 0; n < r; n++) s += typeof t[n].call == "function" ? t[n].call(i, e) : t[n];
            return s
        }
    }
    function X(e, t) {
        function r(t) {
            return e.lang().longDateFormat[t] || t
        }
        var n = 5;
        while (n--&&c.test(t)) t = t.replace(c, r);
        return C[t] || (C[t] = W(t)),
        C[t](e)
    }
    function V(e) {
        switch (e) {
        case "DDDD":
            return v;
        case "YYYY":
            return m;
        case "S":
        case "SS":
        case "SSS":
        case "DDD":
            return d;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
        case "a":
        case "A":
            return g;
        case "Z":
        case "ZZ":
            return y;
        case "T":
            return b;
        case "MM":
        case "DD":
        case "YY":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
            return p;
        default:
            return new RegExp(e.replace("\\", ""))
        }
    }
    function $(e, t, n, r) {
        var i, s;
        switch (e) {
        case "M":
        case "MM":
            n[1] = t == null ? 0 : ~~t - 1;
            break;
        case "MMM":
        case "MMMM":
            for (i = 0; i < 12; i++) if (U().monthsParse[i].test(t)) {
                n[1] = i,
                s = !0;
                break
            }
            s || (n[8] = !1);
            break;
        case "D":
        case "DD":
        case "DDD":
        case "DDDD":
            t != null && (n[2] = ~~t);
            break;
        case "YY":
            n[0] = ~~t + (~~t > 70 ? 1900 : 2e3);
            break;
        case "YYYY":
            n[0] = ~~Math.abs(t);
            break;
        case "a":
        case "A":
            r.isPm = (t + "").toLowerCase() === "pm";
            break;
        case "H":
        case "HH":
        case "h":
        case "hh":
            n[3] = ~~t;
            break;
        case "m":
        case "mm":
            n[4] = ~~t;
            break;
        case "s":
        case "ss":
            n[5] = ~~t;
            break;
        case "S":
        case "SS":
        case "SSS":
            n[6] = ~~ (("0." + t) * 1e3);
            break;
        case "Z":
        case "ZZ":
            r.isUTC = !0,
            i = (t + "").match(x),
            i && i[1] && (r.tzh = ~~i[1]),
            i && i[2] && (r.tzm = ~~i[2]),
            i && i[0] === "+" && (r.tzh = -r.tzh, r.tzm = -r.tzm)
        }
        t == null && (n[8] = !1)
    }
    function J(e, t) {
        var n = [0, 0, 1, 0, 0, 0, 0],
        r = {
            tzh: 0,
            tzm: 0
        },
        i = t.match(l),
        s,
        o;
        for (s = 0; s < i.length; s++) o = (V(i[s]).exec(e) || [])[0],
        o && (e = e.slice(e.indexOf(o) + o.length)),
        A[i[s]] && $(i[s], o, n, r);
        return r.isPm && n[3] < 12 && (n[3] += 12),
        r.isPm === !1 && n[3] === 12 && (n[3] = 0),
        q(n, r.isUTC, r.tzh, r.tzm)
    }
    function K(e, t) {
        var n, r = e.match(h) || [],
        i,
        s = 99,
        o,
        u,
        a;
        for (o = 0; o < t.length; o++) u = J(e, t[o]),
        i = X(new D(u), t[o]).match(h) || [],
        a = I(r, i),
        a < s && (s = a, n = u);
        return n
    }
    function Q(e) {
        var t = "YYYY-MM-DDT",
        n;
        if (w.exec(e)) {
            for (n = 0; n < 4; n++) if (S[n][1].exec(e)) {
                t += S[n][0];
                break
            }
            return y.exec(e) ? J(e, t + " Z") : J(e, t)
        }
        return new Date(e)
    }
    function G(e, t, n, r, i) {
        var s = i.relativeTime[e];
        return typeof s == "function" ? s(t || 1, !!n, e, r) : s.replace(/%d/i, t || 1)
    }
    function Y(e, t, n) {
        var i = r(Math.abs(e) / 1e3),
        s = r(i / 60),
        o = r(s / 60),
        u = r(o / 24),
        a = r(u / 365),
        f = i < 45 && ["s", i] || s === 1 && ["m"] || s < 45 && ["mm", s] || o === 1 && ["h"] || o < 22 && ["hh", o] || u === 1 && ["d"] || u <= 25 && ["dd", u] || u <= 45 && ["M"] || u < 345 && ["MM", r(u / 30)] || a === 1 && ["y"] || ["yy", a];
        return f[2] = t,
        f[3] = e > 0,
        f[4] = n,
        G.apply({},
        f)
    }
    function Z(e, n) {
        t.fn[e] = function(e) {
            var t = this._isUTC ? "UTC": "";
            return e != null ? (this._d["set" + t + n](e), this) : this._d["get" + t + n]()
        }
    }
    function et(e) {
        t.duration.fn[e] = function() {
            return this._data[e]
        }
    }
    function tt(e, n) {
        t.duration.fn["as" + e] = function() {
            return + this / n
        }
    }
    var t, n = "1.7.2",
    r = Math.round,
    i, s = {},
    o = "en",
    u = typeof module != "undefined" && module.exports,
    a = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),
    f = /^\/?Date\((\-?\d+)/i,
    l = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,
    c = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,
    h = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,
    p = /\d\d?/,
    d = /\d{1,3}/,
    v = /\d{3}/,
    m = /\d{1,4}/,
    g = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,
    y = /Z|[\+\-]\d\d:?\d\d/i,
    b = /T/i,
    w = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
    E = "YYYY-MM-DDTHH:mm:ssZ",
    S = [["HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /T\d\d:\d\d:\d\d/], ["HH:mm", /T\d\d:\d\d/], ["HH", /T\d\d/]],
    x = /([\+\-]|\d\d)/gi,
    T = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
    N = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    },
    C = {},
    k = "DDD w M D d".split(" "),
    L = "M D H h m s w".split(" "),
    A = {
        M: function() {
            return this.month() + 1
        },
        MMM: function(e) {
            return O("monthsShort", this.month(), this, e)
        },
        MMMM: function(e) {
            return O("months", this.month(), this, e)
        },
        D: function() {
            return this.date()
        },
        DDD: function() {
            var e = new Date(this.year(), this.month(), this.date()),
            t = new Date(this.year(), 0, 1);
            return~~ ((e - t) / 864e5 + 1.5)
        },
        d: function() {
            return this.day()
        },
        dd: function(e) {
            return O("weekdaysMin", this.day(), this, e)
        },
        ddd: function(e) {
            return O("weekdaysShort", this.day(), this, e)
        },
        dddd: function(e) {
            return O("weekdays", this.day(), this, e)
        },
        w: function() {
            var e = new Date(this.year(), this.month(), this.date() - this.day() + 5),
            t = new Date(e.getFullYear(), 0, 4);
            return~~ ((e - t) / 864e5 / 7 + 1.5)
        },
        YY: function() {
            return B(this.year() % 100, 2)
        },
        YYYY: function() {
            return B(this.year(), 4)
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0)
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1)
        },
        H: function() {
            return this.hours()
        },
        h: function() {
            return this.hours() % 12 || 12
        },
        m: function() {
            return this.minutes()
        },
        s: function() {
            return this.seconds()
        },
        S: function() {
            return~~ (this.milliseconds() / 100)
        },
        SS: function() {
            return B(~~ (this.milliseconds() / 10), 2)
        },
        SSS: function() {
            return B(this.milliseconds(), 3)
        },
        Z: function() {
            var e = -this.zone(),
            t = "+";
            return e < 0 && (e = -e, t = "-"),
            t + B(~~ (e / 60), 2) + ":" + B(~~e % 60, 2)
        },
        ZZ: function() {
            var e = -this.zone(),
            t = "+";
            return e < 0 && (e = -e, t = "-"),
            t + B(~~ (10 * e / 6), 4)
        }
    };
    while (k.length) i = k.pop(),
    A[i + "o"] = _(A[i]);
    while (L.length) i = L.pop(),
    A[i + i] = M(A[i], 2);
    A.DDDD = M(A.DDD, 3),
    t = function(n, r) {
        if (n === null || n === "") return null;
        var i, s;
        return t.isMoment(n) ? new D(new Date( + n._d), n._isUTC, n._lang) : (r ? F(r) ? i = K(n, r) : i = J(n, r) : (s = f.exec(n), i = n === e ? new Date: s ? new Date( + s[1]) : n instanceof Date ? n: F(n) ? q(n) : typeof n == "string" ? Q(n) : new Date(n)), new D(i))
    },
    t.utc = function(e, n) {
        return F(e) ? new D(q(e, !0), !0) : (typeof e == "string" && !y.exec(e) && (e += " +0000", n && (n += " Z")), t(e, n).utc())
    },
    t.unix = function(e) {
        return t(e * 1e3)
    },
    t.duration = function(e, n) {
        var r = t.isDuration(e),
        i = typeof e == "number",
        s = r ? e._data: i ? {}: e,
        o;
        return i && (n ? s[n] = e: s.milliseconds = e),
        o = new P(s),
        r && (o._lang = e._lang),
        o
    },
    t.humanizeDuration = function(e, n, r) {
        return t.duration(e, n === !0 ? null: n).humanize(n === !0 ? !0 : r)
    },
    t.version = n,
    t.defaultFormat = E,
    t.lang = function(e, n) {
        var r;
        if (!e) return o; (n || !s[e]) && R(e, n);
        if (s[e]) {
            for (r = 0; r < a.length; r++) t[a[r]] = s[e][a[r]];
            t.monthsParse = s[e].monthsParse,
            o = e
        }
    },
    t.langData = U,
    t.isMoment = function(e) {
        return e instanceof D
    },
    t.isDuration = function(e) {
        return e instanceof P
    },
    t.lang("en", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        meridiem: function(e, t, n) {
            return e > 11 ? n ? "pm": "PM": n ? "am": "AM"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinal: function(e) {
            var t = e % 10;
            return~~ (e % 100 / 10) === 1 ? "th": t === 1 ? "st": t === 2 ? "nd": t === 3 ? "rd": "th"
        }
    }),
    t.fn = D.prototype = {
        clone: function() {
            return t(this)
        },
        valueOf: function() {
            return + this._d
        },
        unix: function() {
            return Math.floor( + this._d / 1e3)
        },
        toString: function() {
            return this._d.toString()
        },
        toDate: function() {
            return this._d
        },
        toArray: function() {
            var e = this;
            return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds(), !!this._isUTC]
        },
        isValid: function() {
            return this._a ? this._a[8] != null ? !!this._a[8] : !I(this._a, (this._a[7] ? t.utc(this._a) : t(this._a)).toArray()) : !isNaN(this._d.getTime())
        },
        utc: function() {
            return this._isUTC = !0,
            this
        },
        local: function() {
            return this._isUTC = !1,
            this
        },
        format: function(e) {
            return X(this, e ? e: t.defaultFormat)
        },
        add: function(e, n) {
            var r = n ? t.duration( + n, e) : t.duration(e);
            return j(this, r, 1),
            this
        },
        subtract: function(e, n) {
            var r = n ? t.duration( + n, e) : t.duration(e);
            return j(this, r, -1),
            this
        },
        diff: function(e, n, i) {
            var s = this._isUTC ? t(e).utc() : t(e).local(),
            o = (this.zone() - s.zone()) * 6e4,
            u = this._d - s._d - o,
            a = this.year() - s.year(),
            f = this.month() - s.month(),
            l = this.date() - s.date(),
            c;
            return n === "months" ? c = a * 12 + f + l / 30 : n === "years" ? c = a + (f + l / 30) / 12 : c = n === "seconds" ? u / 1e3: n === "minutes" ? u / 6e4: n === "hours" ? u / 36e5: n === "days" ? u / 864e5: n === "weeks" ? u / 6048e5: u,
            i ? c: r(c)
        },
        from: function(e, n) {
            return t.duration(this.diff(e)).lang(this._lang).humanize(!n)
        },
        fromNow: function(e) {
            return this.from(t(), e)
        },
        calendar: function() {
            var e = this.diff(t().sod(), "days", !0),
            n = this.lang().calendar,
            r = n.sameElse,
            i = e < -6 ? r: e < -1 ? n.lastWeek: e < 0 ? n.lastDay: e < 1 ? n.sameDay: e < 2 ? n.nextDay: e < 7 ? n.nextWeek: r;
            return this.format(typeof i == "function" ? i.apply(this) : i)
        },
        isLeapYear: function() {
            var e = this.year();
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        },
        isDST: function() {
            return this.zone() < t([this.year()]).zone() || this.zone() < t([this.year(), 5]).zone()
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return e == null ? t: this.add({
                d: e - t
            })
        },
        startOf: function(e) {
            switch (e.replace(/s$/, "")) {
            case "year":
                this.month(0);
            case "month":
                this.date(1);
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return this
        },
        endOf: function(e) {
            return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1)
        },
        sod: function() {
            return this.clone().startOf("day")
        },
        eod: function() {
            return this.clone().endOf("day")
        },
        zone: function() {
            return this._isUTC ? 0 : this._d.getTimezoneOffset()
        },
        daysInMonth: function() {
            return t.utc([this.year(), this.month() + 1, 0]).date()
        },
        lang: function(t) {
            return t === e ? U(this) : (this._lang = t, this)
        }
    };
    for (i = 0; i < T.length; i++) Z(T[i].toLowerCase(), T[i]);
    Z("year", "FullYear"),
    t.duration.fn = P.prototype = {
        weeks: function() {
            return H(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months * 2592e6
        },
        humanize: function(e) {
            var t = +this,
            n = this.lang().relativeTime,
            r = Y(t, !e, this.lang()),
            i = t <= 0 ? n.past: n.future;
            return e && (typeof i == "function" ? r = i(r) : r = i.replace(/%s/i, r)),
            r
        },
        lang: t.fn.lang
    };
    for (i in N) N.hasOwnProperty(i) && (tt(i, N[i]), et(i.toLowerCase()));
    tt("Weeks", 6048e5),
    u && (module.exports = t),
    typeof ender == "undefined" && (this.moment = t),
    typeof define == "function" && define.amd && define("moment", [],
    function() {
        return t
    })
}.call(this),
function() {
    function o() {
        try {
            return r in t && t[r]
        } catch(e) {
            return ! 1
        }
    }
    var e = {},
    t = window,
    n = t.document,
    r = "localStorage",
    i = "__storejs__",
    s;
    e.disabled = !1,
    e.set = function(e, t) {},
    e.get = function(e) {},
    e.remove = function(e) {},
    e.clear = function() {},
    e.transact = function(t, n, r) {
        var i = e.get(t);
        r == null && (r = n, n = null),
        typeof i == "undefined" && (i = n || {}),
        r(i),
        e.set(t, i)
    },
    e.getAll = function() {},
    e.serialize = function(e) {
        return JSON.stringify(e)
    },
    e.deserialize = function(e) {
        if (typeof e != "string") return undefined;
        try {
            return JSON.parse(e)
        } catch(t) {
            return e || undefined
        }
    };
    if (o()) s = t[r],
    e.set = function(t, n) {
        return n === undefined ? e.remove(t) : (s.setItem(t, e.serialize(n)), n)
    },
    e.get = function(t) {
        return e.deserialize(s.getItem(t))
    },
    e.remove = function(e) {
        s.removeItem(e)
    },
    e.clear = function() {
        s.clear()
    },
    e.getAll = function() {
        var t = {};
        for (var n = 0; n < s.length; ++n) {
            var r = s.key(n);
            t[r] = e.get(r)
        }
        return t
    };
    else if (n.documentElement.addBehavior) {
        var u, a;
        try {
            a = new ActiveXObject("htmlfile"),
            a.open(),
            a.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),
            a.close(),
            u = a.w.frames[0].document,
            s = u.createElement("div")
        } catch(f) {
            s = n.createElement("div"),
            u = n.body
        }
        function l(t) {
            return function() {
                var n = Array.prototype.slice.call(arguments, 0);
                n.unshift(s),
                u.appendChild(s),
                s.addBehavior("#default#userData"),
                s.load(r);
                var i = t.apply(e, n);
                return u.removeChild(s),
                i
            }
        }
        var c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        function h(e) {
            return e.replace(c, "___")
        }
        e.set = l(function(t, n, i) {
            return n = h(n),
            i === undefined ? e.remove(n) : (t.setAttribute(n, e.serialize(i)), t.save(r), i)
        }),
        e.get = l(function(t, n) {
            return n = h(n),
            e.deserialize(t.getAttribute(n))
        }),
        e.remove = l(function(e, t) {
            t = h(t),
            e.removeAttribute(t),
            e.save(r)
        }),
        e.clear = l(function(e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(r);
            for (var n = 0,
            i; i = t[n]; n++) e.removeAttribute(i.name);
            e.save(r)
        }),
        e.getAll = l(function(t) {
            var n = t.XMLDocument.documentElement.attributes;
            t.load(r);
            var i = {};
            for (var s = 0,
            o; o = n[s]; ++s) i[o] = e.get(o);
            return i
        })
    }
    try {
        e.set(i, i),
        e.get(i) != i && (e.disabled = !0),
        e.remove(i)
    } catch(f) {
        e.disabled = !0
    }
    e.enabled = !e.disabled,
    typeof module != "undefined" && typeof module != "function" ? module.exports = e: typeof define == "function" && define.amd ? define(e) : this.store = e
} (),
function(e, t, n, r) {
    "use strict";
    function c(e, t) {
        if (typeof e == "function") return e.call(t)
    }
    function h(e) {
        return (e < 10 ? "0": "") + e
    }
    function p(e, t, n, r) {
        return t = Array.isArray(t) ? t.join("") : t,
        n = n ? ' class="' + n + '"': "",
        r = r ? " " + r: "",
        "<" + e + n + r + ">" + t + "</" + e + ">"
    }
    function d(e, t) {
        return Array.isArray(e) ? e = new Date(e[0], e[1], e[2]) : isNaN(e) ? t || (e = new Date, e.setHours(0, 0, 0, 0)) : e = new Date(e),
        {
            YEAR: t || e.getFullYear(),
            MONTH: t || e.getMonth(),
            DATE: t || e.getDate(),
            DAY: t || e.getDay(),
            TIME: t || e.getTime()
        }
    }
    var i = 7,
    s = 6,
    o = s * i,
    u = "div",
    a = "pickadate__",
    f = e(n),
    l = function(t, r) {
        function O(e) {
            if (e && N.YEAR >= w.YEAR && N.MONTH >= w.MONTH || !e && N.YEAR <= b.YEAR && N.MONTH <= b.MONTH) return "";
            var t = "month" + (e ? "Next": "Prev");
            return p(u, r[t], m[t], "data-nav=" + (e || -1))
        }
        function M(e) {
            return r.monthSelector ? p("select", e.map(function(e, t) {
                return p("option", e, 0, "value=" + t + (N.MONTH == t ? " selected": "") + W(t, N.YEAR, " disabled", ""))
            }), m.monthSelector, "tabindex=" + (v.isOpen ? 0 : -1)) : p(u, e[N.MONTH], m.month)
        }
        function _() {
            var e = N.YEAR,
            t = r.yearSelector;
            if (t) {
                t = t === !0 ? 5 : ~~ (t / 2);
                var n = [],
                i = e - t,
                s = H(i, b.YEAR),
                o = e + t + (s - i),
                a = H(o, w.YEAR, 1);
                t = o - a,
                t && (s = H(i - t, b.YEAR));
                for (var f = 0; f <= a - s; f += 1) n.push(s + f);
                return p("select", n.map(function(t) {
                    return p("option", t, 0, "value=" + t + (e == t ? " selected": ""))
                }), m.yearSelector, "tabindex=" + (v.isOpen ? 0 : -1))
            }
            return p(u, e, m.year)
        }
        function D() {
            var e, t, n, r = [],
            s = "",
            a = d([N.YEAR, N.MONTH + 1, 0]).DATE,
            f = B(N.DATE, N.DAY),
            l = function(e, t) {
                var n = !1,
                r = [m.day, t ? m.dayInfocus: m.dayOutfocus];
                if (e.TIME < b.TIME || e.TIME > w.TIME || E && E.filter(S, e).length) n = !0,
                r.push(m.dayDisabled);
                return e.TIME == y.TIME && r.push(m.dayToday),
                e.TIME == x.TIME && r.push(m.dayHighlighted),
                e.TIME == T.TIME && r.push(m.daySelected),
                [r.join(" "), "data-" + (n ? "disabled": "date") + "=" + [e.YEAR, e.MONTH, e.DATE].join("/")]
            };
            for (var c = 0; c < o; c += 1) t = c - f,
            e = d([N.YEAR, N.MONTH, t]),
            n = l(e, t > 0 && t <= a),
            r.push(p("td", p(u, e.DATE, n[0], n[1]))),
            c % i + 1 == i && (s += p("tr", r.splice(0, i)));
            return p("tbody", s, m.calendarBody)
        }
        function P() {
            return p(u, p(u, p(u, O() + O(1), m.monthNav) + p(u, M(r.showMonthsFull ? r.monthsFull: r.monthsShort), m.monthWrap) + p(u, _(), m.yearWrap) + p("table", [k, D()], m.calendarTable), m.calendar), m.calendarWrap)
        }
        function H(e, t, n) {
            return n && e < t || !n && e > t ? e: t
        }
        function B(e, t) {
            var n = e % i,
            s = t - n + (r.firstDay ? -1 : 0);
            return t >= n ? s: i + s
        }
        function j(e, t) {
            x = e,
            N = e,
            t ? X() : F(e, 1)
        }
        function F(e, t) {
            T = e,
            l.value = a.getDate(),
            C && (C.value = a.getDate(r.formatSubmit)),
            t && X(),
            c(r.onSelect, a)
        }
        function I(e, t) {
            return N = d([t, e, 1])
        }
        function q(e) {
            return L.find("." + e)
        }
        function R(e, t) {
            t = t || N.YEAR,
            e = W(e, t),
            I(e, t),
            X()
        }
        function U(e, t) {
            return e === !0 ? y: Array.isArray(e) ? (--e[1], d(e)) : e && !isNaN(e) ? d([y.YEAR, y.MONTH, y.DATE + e]) : d(0, t ? Infinity: -Infinity)
        }
        function z(e, t) {
            e = e.TIME ? e: d(e);
            if (E) {
                var n = e;
                while (E.filter(S, e).length) e = d([e.YEAR, e.MONTH, e.DATE + (t || 1)]),
                e.MONTH != n.MONTH && (e = d([n.YEAR, n.MONTH, t > 0 ? ++n.DATE: --n.DATE]), n = e)
            }
            return e.TIME < b.TIME ? e = z(b) : e.TIME > w.TIME && (e = z(w, -1)),
            e
        }
        function W(e, t, n, r) {
            return t <= b.YEAR && e < b.MONTH ? n || b.MONTH: t >= w.YEAR && e > w.MONTH ? n || w.MONTH: r != null ? r: e
        }
        function X() {
            L.html(P()),
            V()
        }
        function V() {
            v.selectMonth = q(m.monthSelector).on({
                click: function(e) {
                    e.stopPropagation()
                },
                change: function() {
                    R( + this.value),
                    q(m.monthSelector).focus()
                }
            })[0],
            v.selectYear = q(m.yearSelector).on({
                click: function(e) {
                    e.stopPropagation()
                },
                change: function() {
                    R(N.MONTH, +this.value),
                    q(m.yearSelector).focus()
                }
            })[0]
        }
        function J(n) {
            var r = e(n.target),
            i = r.data();
            n.stopPropagation(),
            t.focus();
            if (i.date) {
                var s = i.date.split("/").map(function(e) {
                    return + e
                });
                j(d(s), !1, r),
                a.close()
            }
            i.nav && R(N.MONTH + i.nav)
        }
        function K(e) {
            var n = e.keyCode,
            r = e.target;
            if (r != l && r != v.selectMonth && r != v.selectYear) {
                a.close();
                return
            }
            if (r == v.selectMonth || r == v.selectYear) {
                t.removeClass(m.inputFocus);
                return
            }
            if (n && r == l) { ! e.metaKey && n != 9 && e.preventDefault();
                if (n == 13) {
                    F(x, 1),
                    a.close();
                    return
                }
                if (n == 27) {
                    a.close();
                    return
                }
                A[n] && j(z([N.YEAR, N.MONTH, x.DATE + A[n]], A[n]), 1)
            }
        }
        var s = function() {},
        a = s.prototype = {
            constructor: s,
            init: function() {
                return t.on({
                    "focusin click": a.open,
                    keydown: function(e) {
                        var t = e.keyCode;
                        if (t == 8 || !v.isOpen && A[t]) e.preventDefault(),
                        e.stopPropagation(),
                        t != 8 && a.open()
                    }
                }).after([L, C]),
                l.autofocus && a.open(),
                V(),
                c(r.onStart, a),
                a
            },
            open: function() {
                return v.isOpen ? a: (v.isOpen = !0, t.addClass(m.inputFocus), L.addClass(m.open), v.selectMonth && (v.selectMonth.tabIndex = 0), v.selectYear && (v.selectYear.tabIndex = 0), f.on("click.P" + v.id + " focusin.P" + v.id + " keydown.P" + v.id, K), c(r.onOpen, a), a)
            },
            close: function() {
                return v.isOpen = !1,
                t.removeClass(m.inputFocus),
                L.removeClass(m.open),
                v.selectMonth && (v.selectMonth.tabIndex = -1),
                v.selectYear && (v.selectYear.tabIndex = -1),
                f.off(".P" + v.id),
                c(r.onClose, a),
                a
            },
            show: function(e, t) {
                return R(--e, t),
                a
            },
            getDate: function(e, t) {
                return g.toArray(e || r.format).map(function(e) {
                    return c(g[e], t || T) || e
                }).join("")
            },
            setDate: function(e, t, n, r) {
                return j(z([e, --t, n]), r),
                a
            },
            getDateLimit: function(e, t) {
                return a.getDate(t, e ? w: b)
            },
            setDateLimit: function(e, t) {
                return t ? (w = U(e, t), N.TIME > w.TIME && (N = w)) : (b = U(e), N.TIME < b.TIME && (N = b)),
                X(),
                a
            }
        },
        l = function(e) {
            return e.autofocus = e == n.activeElement,
            e.type = "text",
            e.readOnly = !0,
            e
        } (t[0]),
        v = {
            id: ~~ (Math.random() * 1e9)
        },
        m = r.klass,
        g = function() {
            function e(e) {
                return e.match(/\w+/)[0].length
            }
            function t(e) {
                return /\d/.test(e[1]) ? 2 : 1
            }
            function n(e, t, n) {
                var r = e.match(/\w+/)[0];
                return ! t.mm && !t.m && (t.m = n.indexOf(r) + 1),
                r.length
            }
            return {
                d: function(e) {
                    return e ? t(e) : this.DATE
                },
                dd: function(e) {
                    return e ? 2 : h(this.DATE)
                },
                ddd: function(t) {
                    return t ? e(t) : r.weekdaysShort[this.DAY]
                },
                dddd: function(t) {
                    return t ? e(t) : r.weekdaysFull[this.DAY]
                },
                m: function(e) {
                    return e ? t(e) : this.MONTH + 1
                },
                mm: function(e) {
                    return e ? 2 : h(this.MONTH + 1)
                },
                mmm: function(e, t) {
                    var i = r.monthsShort;
                    return e ? n(e, t, i) : i[this.MONTH]
                },
                mmmm: function(e, t) {
                    var i = r.monthsFull;
                    return e ? n(e, t, i) : i[this.MONTH]
                },
                yy: function(e) {
                    return e ? 2 : ("" + this.YEAR).slice(2)
                },
                yyyy: function(e) {
                    return e ? 4 : this.YEAR
                },
                toArray: function(e) {
                    return e.split(/(?=\b)(d{1,4}|m{1,4}|y{4}|yy)+(\b)/g)
                }
            }
        } (),
        y = d(),
        b = U(r.dateMin),
        w = U(r.dateMax, 1),
        E = function(e) {
            if (Array.isArray(e)) return e[0] === !0 && (v.disabled = e.shift()),
            e.map(function(e) {
                return isNaN(e) ? (--e[1], d(e)) : --e + r.firstDay
            })
        } (r.datesDisabled),
        S = function() {
            var e = function(e) {
                return this.TIME == e.TIME || E.indexOf(this.DAY) > -1
            };
            return v.disabled ?
            function(t, n, r) {
                return r.map(e, this).indexOf(!0) < 0
            }: e
        } (),
        x = function(e, t) {
            return e ? (t = {},
            g.toArray(r.formatSubmit).map(function(n) {
                var r = g[n] ? g[n](e, t) : n.length;
                g[n] && (t[n] = e.slice(0, r)),
                e = e.slice(r)
            }), t = [ + (t.yyyy || t.yy), +(t.mm || t.m) - 1, +(t.dd || t.d)]) : t = Date.parse(t),
            z(!isNaN(t) || Array.isArray(t) ? t: y)
        } (l.getAttribute("data-value"), l.value),
        T = x,
        N = x,
        C = r.formatSubmit ? e("<input type=hidden name=" + l.name + r.hiddenSuffix + ">").val(l.value ? a.getDate(r.formatSubmit) : "")[0] : null,
        k = function(e) {
            return r.firstDay && e.push(e.splice(0, 1)[0]),
            p("thead", p("tr", e.map(function(e) {
                return p("th", e, m.weekdays)
            })))
        } ((r.showWeekdaysShort ? r.weekdaysShort: r.weekdaysFull).slice(0)),
        L = e(p(u, P(), m.holder)).on("click", J),
        A = {
            40 : 7,
            38 : -7,
            39 : 1,
            37 : -1
        };
        return new a.init
    };
    e.fn.pickadate = function(t) {
        var n = "pickadate";
        return t = e.extend(!0, {},
        e.fn.pickadate.defaults, t),
        t.disablePicker ? this: this.each(function() {
            var r = e(this);
            this.nodeName == "INPUT" && !r.data(n) && r.data(n, new l(r, t))
        })
    },
    e.fn.pickadate.defaults = {
        monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthPrev: "&#9664;",
        monthNext: "&#9654;",
        showMonthsFull: !0,
        showWeekdaysShort: !0,
        format: "d mmmm, yyyy",
        formatSubmit: !1,
        hiddenSuffix: "_submit",
        firstDay: 0,
        monthSelector: !1,
        yearSelector: !1,
        dateMin: !1,
        dateMax: !1,
        datesDisabled: !1,
        disablePicker: !1,
        onOpen: null,
        onClose: null,
        onSelect: null,
        onStart: null,
        klass: {
            inputFocus: a + "input--focused",
            holder: a + "holder",
            open: a + "holder--opened",
            calendar: a + "calendar",
            calendarWrap: a + "calendar--wrap",
            calendarTable: a + "calendar--table",
            calendarBody: a + "calendar--body",
            year: a + "year",
            yearWrap: a + "year--wrap",
            yearSelector: a + "year--selector",
            month: a + "month",
            monthWrap: a + "month--wrap",
            monthSelector: a + "month--selector",
            monthNav: a + "month--nav",
            monthPrev: a + "month--prev",
            monthNext: a + "month--next",
            week: a + "week",
            weekdays: a + "weekday",
            day: a + "day",
            dayDisabled: a + "day--disabled",
            daySelected: a + "day--selected",
            dayHighlighted: a + "day--highlighted",
            dayToday: a + "day--today",
            dayInfocus: a + "day--infocus",
            dayOutfocus: a + "day--outfocus"
        }
    }
} (jQuery, window, document),
function(e, t) {
    function r(t, r, i) {
        t || (t = "div");
        var s = e(r.container),
        o = s.offset() || {
            left: 0,
            top: 0
        },
        u = [o.left + s.width(), o.top + s.height()],
        a = {
            x: 0,
            y: 1,
            w: 0,
            h: 1
        },
        f,
        l;
        for (f in a) a.hasOwnProperty(f) && (l = n.exec(r[f]), l && (r[f] = u[a[f]] * l[1] / 100));
        var c = e(t),
        h = [],
        p = !!r.furthest,
        d = !!r.checkHoriz,
        v = !!r.checkVert,
        m = p ? 0 : Infinity,
        g = parseFloat(r.x) || 0,
        y = parseFloat(r.y) || 0,
        b = parseFloat(g + r.w) || g,
        w = parseFloat(y + r.h) || y,
        E = r.tolerance || 0,
        S = !!e.fn.each2,
        x = Math.min,
        T = Math.max; ! r.includeSelf && i && (c = c.not(i)),
        E < 0 && (E = 0),
        c[S ? "each2": "each"](function(t, n) {
            var r = S ? n: e(this),
            i = r.offset(),
            s = i.left,
            o = i.top,
            u = r.outerWidth(),
            a = r.outerHeight(),
            f = s + u,
            l = o + a,
            c = T(s, g),
            N = x(f, b),
            C = T(o, y),
            k = x(l, w),
            L = N >= c,
            A = k >= C,
            O,
            M,
            _,
            D;
            if (d && v || !d && !v && L && A || d && A || v && L) O = L ? 0 : c - N,
            M = A ? 0 : C - k,
            _ = L || A ? T(O, M) : Math.sqrt(O * O + M * M),
            D = p ? _ >= m - E: _ <= m + E,
            D && (m = p ? T(m, _) : x(m, _), h.push({
                node: this,
                dist: _
            }))
        });
        var N = h.length,
        C = [],
        k,
        L,
        A,
        O;
        if (N) {
            p ? (k = m - E, L = m) : (k = m, L = m + E);
            for (A = 0; A < N; A++) O = h[A],
            O.dist >= k && O.dist <= L && C.push(O.node)
        }
        return C
    }
    var n = /^([\d.]+)%$/;
    e.each(["nearest", "furthest", "touching"],
    function(n, i) {
        var s = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            tolerance: 1,
            container: document,
            furthest: i == "furthest",
            includeSelf: !1,
            checkHoriz: i != "touching",
            checkVert: i != "touching"
        };
        e[i] = function(n, i, o) {
            if (!n || n.x === t || n.y === t) return e([]);
            var u = e.extend({},
            s, n, o || {});
            return e(r(i, u))
        },
        e.fn[i] = function(t, n) {
            var i;
            if (t && e.isPlainObject(t)) return i = e.extend({},
            s, t, n || {}),
            this.pushStack(r(this, i));
            var o = this.offset(),
            u = {
                x: o.left,
                y: o.top,
                w: this.outerWidth(),
                h: this.outerHeight()
            };
            return i = e.extend({},
            s, u, n || {}),
            this.pushStack(r(t, i, this))
        }
    })
} (jQuery),
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
FastClick.prototype.needsClick = function(e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
    case "button":
    case "input":
        if (this.deviceIsIOS && e.type === "file") return ! 0;
        return e.disabled;
    case "label":
    case "video":
        return ! 0;
    default:
        return /\bneedsclick\b/.test(e.className)
    }
},
FastClick.prototype.needsFocus = function(e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
    case "textarea":
    case "select":
        return ! 0;
    case "input":
        switch (e.type) {
        case "button":
        case "checkbox":
        case "file":
        case "image":
        case "radio":
        case "submit":
            return ! 1
        }
        return ! e.disabled && !e.readOnly;
    default:
        return /\bneedsfocus\b/.test(e.className)
    }
},
FastClick.prototype.sendClick = function(e, t) {
    "use strict";
    var n, r;
    document.activeElement && document.activeElement !== e && document.activeElement.blur(),
    r = t.changedTouches[0],
    n = document.createEvent("MouseEvents"),
    n.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null),
    n.forwardedTouchEvent = !0,
    e.dispatchEvent(n)
},
FastClick.prototype.focus = function(e) {
    "use strict";
    var t;
    this.deviceIsIOS && e.setSelectionRange ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
},
FastClick.prototype.updateScrollParent = function(e) {
    "use strict";
    var t, n;
    t = e.fastClickScrollParent;
    if (!t || !t.contains(e)) {
        n = e;
        do {
            if (n.scrollHeight > n.offsetHeight) {
                t = n,
                e.fastClickScrollParent = n;
                break
            }
            n = n.parentElement
        } while ( n )
    }
    t && (t.fastClickLastScrollTop = t.scrollTop)
},
FastClick.prototype.getTargetElementFromEventTarget = function(e) {
    "use strict";
    return e.nodeType === Node.TEXT_NODE ? e.parentNode: e
},
FastClick.prototype.onTouchStart = function(e) {
    "use strict";
    var t, n, r;
    t = this.getTargetElementFromEventTarget(e.target),
    n = e.targetTouches[0];
    if (this.deviceIsIOS) {
        r = window.getSelection();
        if (r.rangeCount && !r.isCollapsed) return ! 0;
        if (!this.deviceIsIOS4) {
            if (n.identifier === this.lastTouchIdentifier) return e.preventDefault(),
            !1;
            this.lastTouchIdentifier = n.identifier,
            this.updateScrollParent(t)
        }
    }
    return this.trackingClick = !0,
    this.trackingClickStart = e.timeStamp,
    this.targetElement = t,
    this.touchStartX = n.pageX,
    this.touchStartY = n.pageY,
    e.timeStamp - this.lastClickTime < 200 && e.preventDefault(),
    !0
},
FastClick.prototype.touchHasMoved = function(e) {
    "use strict";
    var t = e.changedTouches[0];
    return Math.abs(t.pageX - this.touchStartX) > 10 || Math.abs(t.pageY - this.touchStartY) > 10 ? !0 : !1
},
FastClick.prototype.findControl = function(e) {
    "use strict";
    return e.control !== undefined ? e.control: e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
},
FastClick.prototype.onTouchEnd = function(e) {
    "use strict";
    var t, n, r, i, s, o = this.targetElement;
    this.touchHasMoved(e) && (this.trackingClick = !1, this.targetElement = null);
    if (!this.trackingClick) return ! 0;
    if (e.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0,
    !0;
    this.lastClickTime = e.timeStamp,
    n = this.trackingClickStart,
    this.trackingClick = !1,
    this.trackingClickStart = 0,
    this.deviceIsIOSWithBadTarget && (s = e.changedTouches[0], o = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset)),
    r = o.tagName.toLowerCase();
    if (r === "label") {
        t = this.findControl(o);
        if (t) {
            this.focus(o);
            if (this.deviceIsAndroid) return ! 1;
            o = t
        }
    } else if (this.needsFocus(o)) {
        if (e.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && r === "input") return this.targetElement = null,
        !1;
        this.focus(o);
        if (!this.deviceIsIOS4 || r !== "select") this.targetElement = null,
        e.preventDefault();
        return ! 1
    }
    if (this.deviceIsIOS && !this.deviceIsIOS4) {
        i = o.fastClickScrollParent;
        if (i && i.fastClickLastScrollTop !== i.scrollTop) return ! 0
    }
    return this.needsClick(o) || (e.preventDefault(), this.sendClick(o, e)),
    !1
},
FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1,
    this.targetElement = null
},
FastClick.prototype.onMouse = function(e) {
    "use strict";
    return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0 : !0
},
FastClick.prototype.onClick = function(e) {
    "use strict";
    var t;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : e.target.type === "submit" && e.detail === 0 ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
},
FastClick.prototype.destroy = function() {
    "use strict";
    var e = this.layer;
    this.deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)),
    e.removeEventListener("click", this.onClick, !0),
    e.removeEventListener("touchstart", this.onTouchStart, !1),
    e.removeEventListener("touchend", this.onTouchEnd, !1),
    e.removeEventListener("touchcancel", this.onTouchCancel, !1)
},
FastClick.attach = function(e) {
    "use strict";
    return new FastClick(e)
},
typeof define != "undefined" && define.amd && define(function() {
    "use strict";
    return FastClick
}),
typeof module != "undefined" && module.exports && (module.exports = FastClick.attach, module.exports.FastClick = FastClick);



var Skycons; 

(function(e) {
    "use strict";
    function u(e, t, n, r) {
        e.beginPath(),
        e.arc(t, n, r, 0, s, !1),
        e.fill()
    }
    function a(e, t, n, r, i) {
        e.beginPath(),
        e.moveTo(t, n),
        e.lineTo(r, i),
        e.stroke()
    }
    function f(e, t, n, r, i, o, a, f) {
        var l = Math.cos(t * s),
        c = Math.sin(t * s);
        f -= a,
        u(e, n - c * i, r + l * o + f * .5, a + (1 - l * .5) * f)
    }
    function l(e, t, n, r, i, s, o, u) {
        var a;
        for (a = 5; a--;) f(e, t + a / 5, n, r, i, s, o, u)
    }
    function c(e, t, n, r, i, s, o) {
        t /= 3e4;
        var u = i * .21,
        a = i * .12,
        f = i * .24,
        c = i * .28;
        e.fillStyle = o,
        l(e, t, n, r, u, a, f, c),
        e.globalCompositeOperation = "destination-out",
        l(e, t, n, r, u, a, f - s, c - s),
        e.globalCompositeOperation = "source-over"
    }
    function h(e, t, n, r, i, o, u) {
        t /= 12e4;
        var f = i * .25 - o * .5,
        l = i * .32 + o * .5,
        c = i * .5 - o * .5,
        h, p, d, v;
        e.strokeStyle = u,
        e.lineWidth = o,
        e.lineCap = "round",
        e.lineJoin = "round",
        e.beginPath(),
        e.arc(n, r, f, 0, s, !1),
        e.stroke();
        for (h = 8; h--;) p = (t + h / 8) * s,
        d = Math.cos(p),
        v = Math.sin(p),
        a(e, n + d * l, r + v * l, n + d * c, r + v * c)
    }
    function p(e, t, n, r, i, u, a) {
        t /= 15e3;
        var f = i * .29 - u * .5,
        l = i * .05,
        c = Math.cos(t * s),
        h = c * s / -16;
        e.strokeStyle = a,
        e.lineWidth = u,
        e.lineCap = "round",
        e.lineJoin = "round",
        n += c * l,
        e.beginPath(),
        e.arc(n, r, f, h + s / 8, h + s * 7 / 8, !1),
        e.arc(n + Math.cos(h) * f * o, r + Math.sin(h) * f * o, f, h + s * 5 / 8, h + s * 3 / 8, !0),
        e.closePath(),
        e.stroke()
    }
    function d(e, t, n, r, i, o, u) {
        t /= 1350;
        var a = i * .16,
        f = s * 11 / 12,
        l = s * 7 / 12,
        c, h, p, d;
        e.fillStyle = u;
        for (c = 4; c--;) h = (t + c / 4) % 1,
        p = n + (c - 1.5) / 1.5 * (c === 1 || c === 2 ? -1 : 1) * a,
        d = r + h * h * i,
        e.beginPath(),
        e.moveTo(p, d - o * 1.5),
        e.arc(p, d, o * .75, f, l, !1),
        e.fill()
    }
    function v(e, t, n, r, i, o, u) {
        t /= 750;
        var f = i * .1875,
        l = s * 11 / 12,
        c = s * 7 / 12,
        h, p, d, v;
        e.strokeStyle = u,
        e.lineWidth = o * .5,
        e.lineCap = "round",
        e.lineJoin = "round";
        for (h = 4; h--;) p = (t + h / 4) % 1,
        d = Math.floor(n + (h - 1.5) / 1.5 * (h === 1 || h === 2 ? -1 : 1) * f) + .5,
        v = r + p * i,
        a(e, d, v - o * 1.5, d, v + o * 1.5)
    }
    function m(e, t, n, r, i, o, u) {
        t /= 3e3;
        var f = i * .16,
        l = o * .75,
        c = t * s * .7,
        h = Math.cos(c) * l,
        p = Math.sin(c) * l,
        d = c + s / 3,
        v = Math.cos(d) * l,
        m = Math.sin(d) * l,
        g = c + s * 2 / 3,
        y = Math.cos(g) * l,
        b = Math.sin(g) * l,
        w,
        E,
        S,
        x;
        e.strokeStyle = u,
        e.lineWidth = o * .5,
        e.lineCap = "round",
        e.lineJoin = "round";
        for (w = 4; w--;) E = (t + w / 4) % 1,
        S = n + Math.sin((E + w / 4) * s) * f,
        x = r + E * i,
        a(e, S - h, x - p, S + h, x + p),
        a(e, S - v, x - m, S + v, x + m),
        a(e, S - y, x - b, S + y, x + b)
    }
    function g(e, t, n, r, i, s, o) {
        t /= 3e4;
        var u = i * .21,
        a = i * .06,
        f = i * .21,
        c = i * .28;
        e.fillStyle = o,
        l(e, t, n, r, u, a, f, c),
        e.globalCompositeOperation = "destination-out",
        l(e, t, n, r, u, a, f - s, c - s),
        e.globalCompositeOperation = "source-over"
    }
    function w(e, t, n, r, i, o, u) {
        var a = i / 8,
        f = a / 3,
        l = 2 * f,
        c = t % 1 * s,
        h = Math.cos(c),
        p = Math.sin(c);
        e.fillStyle = u,
        e.strokeStyle = u,
        e.lineWidth = o,
        e.lineCap = "round",
        e.lineJoin = "round",
        e.beginPath(),
        e.arc(n, r, a, c, c + Math.PI, !1),
        e.arc(n - f * h, r - f * p, l, c + Math.PI, c, !1),
        e.arc(n + l * h, r + l * p, f, c + Math.PI, c, !0),
        e.globalCompositeOperation = "destination-out",
        e.fill(),
        e.globalCompositeOperation = "source-over",
        e.stroke()
    }
    function E(e, t, n, r, i, s, o, u, a) {
        t /= 2500;
        var f = y[o],
        l = (t + o - b[o].start) % u,
        c = (t + o - b[o].end) % u,
        h = (t + o) % u,
        p,
        d,
        v,
        m;
        e.strokeStyle = a,
        e.lineWidth = s,
        e.lineCap = "round",
        e.lineJoin = "round";
        if (l < 1) {
            e.beginPath(),
            l *= f.length / 2 - 1,
            p = Math.floor(l),
            l -= p,
            p *= 2,
            p += 2,
            e.moveTo(n + (f[p - 2] * (1 - l) + f[p] * l) * i, r + (f[p - 1] * (1 - l) + f[p + 1] * l) * i);
            if (c < 1) {
                c *= f.length / 2 - 1,
                d = Math.floor(c),
                c -= d,
                d *= 2,
                d += 2;
                for (m = p; m !== d; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
                e.lineTo(n + (f[d - 2] * (1 - c) + f[d] * c) * i, r + (f[d - 1] * (1 - c) + f[d + 1] * c) * i)
            } else for (m = p; m !== f.length; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
            e.stroke()
        } else if (c < 1) {
            e.beginPath(),
            c *= f.length / 2 - 1,
            d = Math.floor(c),
            c -= d,
            d *= 2,
            d += 2,
            e.moveTo(n + f[0] * i, r + f[1] * i);
            for (m = 2; m !== d; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
            e.lineTo(n + (f[d - 2] * (1 - c) + f[d] * c) * i, r + (f[d - 1] * (1 - c) + f[d + 1] * c) * i),
            e.stroke()
        }
        h < 1 && (h *= f.length / 2 - 1, v = Math.floor(h), h -= v, v *= 2, v += 2, w(e, t, n + (f[v - 2] * (1 - h) + f[v] * h) * i, r + (f[v - 1] * (1 - h) + f[v + 1] * h) * i, i, s, a))
    }
    var t, n; (function() {
        var r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame,
        i = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || e.msCancelAnimationFrame;
        r && i ? (t = function(e, t) {
            function i() {
                n.value = r(i),
                e()
            }
            var n = {
                value: null
            };
            return i(),
            n
        },
        n = function(e) {
            i(e.value)
        }) : (t = setInterval, n = clearInterval)
    })();
    var r = 500,
    i = .08,
    s = 2 * Math.PI,
    o = 2 / Math.sqrt(2),
    y = [[ - 0.75, -0.18, -0.7219, -0.1527, -0.6971, -0.1225, -0.6739, -0.091, -0.6516, -0.0588, -0.6298, -0.0262, -0.6083, .0065, -0.5868, .0396, -0.5643, .0731, -0.5372, .1041, -0.5033, .1259, -0.4662, .1406, -0.4275, .1493, -0.3881, .153, -0.3487, .1526, -0.3095, .1488, -0.2708, .1421, -0.2319, .1342, -0.1943, .1217, -0.16, .1025, -0.129, .0785, -0.1012, .0509, -0.0764, .0206, -0.0547, -0.012, -0.0378, -0.0472, -0.0324, -0.0857, -0.0389, -0.1241, -0.0546, -0.1599, -0.0814, -0.1876, -0.1193, -0.1964, -0.1582, -0.1935, -0.1931, -0.1769, -0.2157, -0.1453, -0.229, -0.1085, -0.2327, -0.0697, -0.224, -0.0317, -0.2064, .0033, -0.1853, .0362, -0.1613, .0672, -0.135, .0961, -0.1051, .1213, -0.0706, .1397, -0.0332, .1512, .0053, .158, .0442, .1624, .0833, .1636, .1224, .1615, .1613, .1565, .1999, .15, .2378, .1402, .2749, .1279, .3118, .1147, .3487, .1015, .3858, .0892, .4236, .0787, .4621, .0715, .5012, .0702, .5398, .0766, .5768, .089, .6123, .1055, .6466, .1244, .6805, .144, .7147, .163, .75, .18], [ - 0.75, 0, -0.7033, .0195, -0.6569, .0399, -0.6104, .06, -0.5634, .0789, -0.5155, .0954, -0.4667, .1089, -0.4174, .1206, -0.3676, .1299, -0.3174, .1365, -0.2669, .1398, -0.2162, .1391, -0.1658, .1347, -0.1157, .1271, -0.0661, .1169, -0.017, .1046, .0316, .0903, .0791, .0728, .1259, .0534, .1723, .0331, .2188, .0129, .2656, -0.0064, .3122, -0.0263, .3586, -0.0466, .4052, -0.0665, .4525, -0.0847, .5007, -0.1002, .5497, -0.113, .5991, -0.124, .6491, -0.1325, .6994, -0.138, .75, -0.14]],
    b = [{
        start: .36,
        end: .11
    },
    {
        start: .56,
        end: .16
    }];
    Skycons = function(e) {
        this.list = [],
        this.interval = null,
        this.color = e && e.color ? e.color: "black",
        this.resizeClear = !!e && !!e.resizeClear
    },
    Skycons.CLEAR_DAY = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        h(e, t, r * .5, s * .5, o, o * i, n)
    },
    Skycons.CLEAR_NIGHT = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        p(e, t, r * .5, s * .5, o, o * i, n)
    },
    Skycons.PARTLY_CLOUDY_DAY = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        h(e, t, r * .625, s * .375, o * .75, o * i, n),
        c(e, t, r * .375, s * .625, o * .75, o * i, n)
    },
    Skycons.PARTLY_CLOUDY_NIGHT = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        p(e, t, r * .667, s * .375, o * .75, o * i, n),
        c(e, t, r * .375, s * .625, o * .75, o * i, n)
    },
    Skycons.CLOUDY = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        c(e, t, r * .5, s * .5, o, o * i, n)
    },
    Skycons.RAIN = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        d(e, t, r * .5, s * .37, o * .9, o * i, n),
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    },
    Skycons.SLEET = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        v(e, t, r * .5, s * .37, o * .9, o * i, n),
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    },
    Skycons.SNOW = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        m(e, t, r * .5, s * .37, o * .9, o * i, n),
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    },
    Skycons.WIND = function(e, t, n) {
        var r = e.canvas.width,
        s = e.canvas.height,
        o = Math.min(r, s);
        E(e, t, r * .5, s * .5, o, o * i, 0, 2, n),
        E(e, t, r * .5, s * .5, o, o * i, 1, 2, n)
    },
    Skycons.FOG = function(e, t, n) {
        var r = e.canvas.width,
        o = e.canvas.height,
        u = Math.min(r, o),
        f = u * i;
        g(e, t, r * .5, o * .32, u * .75, f, n),
        t /= 5e3;
        var l = Math.cos(t * s) * u * .02,
        c = Math.cos((t + .25) * s) * u * .02,
        h = Math.cos((t + .5) * s) * u * .02,
        p = Math.cos((t + .75) * s) * u * .02,
        d = o * .936,
        v = Math.floor(d - f * .5) + .5,
        m = Math.floor(d - f * 2.5) + .5;
        e.strokeStyle = n,
        e.lineWidth = f,
        e.lineCap = "round",
        e.lineJoin = "round",
        a(e, l + r * .2 + f * .5, v, c + r * .8 - f * .5, v),
        a(e, h + r * .2 + f * .5, m, p + r * .8 - f * .5, m)
    },
    Skycons.prototype = {
        add: function(e, t) {
            var n;
            typeof e == "string" && (e = document.getElementById(e)),
            n = {
                element: e,
                context: e.getContext("2d"),
                drawing: t
            },
            this.list.push(n),
            this.draw(n, r)
        },
        set: function(e, t) {
            var n;
            typeof e == "string" && (e = document.getElementById(e));
            for (n = this.list.length; n--;) if (this.list[n].element === e) {
                this.list[n].drawing = t,
                this.draw(this.list[n], r);
                return
            }
            this.add(e, t)
        },
        remove: function(e) {
            var t;
            typeof e == "string" && (e = document.getElementById(e));
            for (t = this.list.length; t--;) if (this.list[t].element === e) {
                this.list.splice(t, 1);
                return
            }
        },
        draw: function(e, t) {
            var n = e.context.canvas;
            this.resizeClear ? n.width = n.width: e.context.clearRect(0, 0, n.width, n.height),
            e.drawing(e.context, t, this.color)
        },
        play: function() {
            var e = this;
            this.pause(),
            this.interval = t(function() {
                var t = Date.now(),
                n;
                for (n = e.list.length; n--;) e.draw(e.list[n], t)
            },
            1e3 / 60)
        },
        pause: function() {
            var e;
            this.interval && (n(this.interval), this.interval = null)
        }
    }
})(this);

test_data = {
		days: [{
			temperatureMin: 23.17035980346019,
			temperatureMax: 33.76026401883471,
			temperatureError: 10.354621367561817,
			windSpeed: 8.82938623743374,
			humidity: .6728126485717144,
			cloudCover: .6071039826409974,
			precipProbability: .09468224757527684
		},
		{
			temperatureMin: 23.03806588240459,
			temperatureMax: 33.624405826855615,
			temperatureError: 10.376858020305313,
			windSpeed: 8.845552979699072,
			humidity: .6718992238326474,
			cloudCover: .6036108457964805,
			precipProbability: .09221234206572641
		},
		{
			temperatureMin: 22.911793603264066,
			temperatureMax: 33.495918094251984,
			temperatureError: 10.398012367583577,
			windSpeed: 8.861699364749162,
			humidity: .6709881516307767,
			cloudCover: .5995135193155362,
			precipProbability: .08621764349867582
		},
		{
			temperatureMin: 22.791580383240106,
			temperatureMax: 33.374838894711985,
			temperatureError: 10.418047124802838,
			windSpeed: 8.877823519968937,
			humidity: .6700797019364582,
			cloudCover: .5978184415270897,
			precipProbability: .08604306939500457
		},
		{
			temperatureMin: 22.677461844104215,
			temperatureMax: 33.26120410661554,
			temperatureError: 10.436926681997358,
			windSpeed: 8.893923406436588,
			humidity: .6691741439429418,
			cloudCover: .5994313739477316,
			precipProbability: .09261464228104027
		},
		{
			temperatureMin: 22.569471801642436,
			temperatureMax: 33.1550474024028,
			temperatureError: 10.454617193501209,
			windSpeed: 8.909996816281469,
			humidity: .6682717459866053,
			cloudCover: .6029238150969634,
			precipProbability: .10083986206223572
		},
		{
			temperatureMin: 22.467642255634928,
			temperatureMax: 33.0564002385963,
			temperatureError: 10.47108666330566,
			windSpeed: 8.92604137030081,
			humidity: .6673727754674378,
			cloudCover: .6056515183021386,
			precipProbability: .10642962195052778
		},
		{
			temperatureMin: 22.372003380373854,
			temperatureMax: 32.96529184647961,
			temperatureError: 10.486305025876094,
			windSpeed: 8.942054515839597,
			humidity: .6664774987698059,
			cloudCover: .6054850469117645,
			precipProbability: .10450246046258481
		},
		{
			temperatureMin: 22.282583515722013,
			temperatureMax: 32.88174922343562,
			temperatureError: 10.50024422221427,
			windSpeed: 8.958033524937528,
			humidity: .6655861811835168,
			cloudCover: .6020959000989803,
			precipProbability: .09760766171279613
		},
		{
			temperatureMin: 22.19940915871514,
			temperatureMax: 32.80579712494654,
			temperatureError: 10.512878270964348,
			windSpeed: 8.973975492746723,
			humidity: .6646990868252071,
			cloudCover: .5970480152756149,
			precipProbability: .09678478071564293
		},
		{
			temperatureMin: 22.122504955710266,
			temperatureMax: 32.73745805725833,
			temperatureError: 10.524183334374179,
			windSpeed: 8.989877336223481,
			humidity: .6638164785600806,
			cloudCover: .5926830653067453,
			precipProbability: .10212736676559535
		},
		{
			temperatureMin: 22.05189369508245,
			temperatureMax: 32.67675227071162,
			temperatureError: 10.534137778936946,
			windSpeed: 9.005735793097061,
			humidity: .6629386179240142,
			cloudCover: .5905207160276971,
			precipProbability: .10230843029897074
		},
		{
			temperatureMin: 21.98759630047217,
			temperatureMax: 32.623697753741084,
			temperatureError: 10.54272223055239,
			windSpeed: 9.021547421118079,
			humidity: .6620657650460609,
			cloudCover: .5901906032461482,
			precipProbability: .09732766933285993
		},
		{
			temperatureMin: 21.92963182458508,
			temperatureMax: 32.57831022754514,
			temperatureError: 10.54991962406118,
			windSpeed: 9.037308597588781,
			humidity: .6611981785713655,
			cloudCover: .5895966938133262,
			precipProbability: .09646429728329547
		},
		{
			temperatureMin: 21.878017443546376,
			temperatureMax: 32.54060314142733,
			temperatureError: 10.555715247021118,
			windSpeed: 9.053015519177114,
			humidity: .6603361155845243,
			cloudCover: .5862704114119445,
			precipProbability: .09917971199746417
		},
		{
			temperatureMin: 21.832768451811052,
			temperatureMax: 32.51058766881106,
			temperatureError: 10.56009677760881,
			windSpeed: 9.068664202016057,
			humidity: .6594798315334053,
			cloudCover: .5791324198506764,
			precipProbability: .09935279822733563
		},
		{
			temperatureMin: 21.793898257631927,
			temperatureMax: 32.48827270392865,
			temperatureError: 10.563054316546305,
			windSpeed: 9.084250482089596,
			humidity: .6586295801534537,
			cloudCover: .5695908225511929,
			precipProbability: .09569250312673332
		},
		{
			temperatureMin: 21.76141837908644,
			temperatureMax: 32.473664859185796,
			temperatureError: 10.564580412967679,
			windSpeed: 9.099770015905973,
			humidity: .6577856133925026,
			cloudCover: .561239226736148,
			precipProbability: .08861656495022656
		},
		{
			temperatureMin: 21.73533844066358,
			temperatureMax: 32.46676846320214,
			temperatureError: 10.564670084156916,
			windSpeed: 9.115218281458725,
			humidity: .6569481813361172,
			cloudCover: .5582026261085459,
			precipProbability: .0825958321086903
		},
		{
			temperatureMin: 21.71566617041191,
			temperatureMax: 32.46758555952868,
			temperatureError: 10.563320829104338,
			windSpeed: 9.13059057947568,
			humidity: .6561175321334899,
			cloudCover: .5629694991590718,
			precipProbability: .08598429981741566
		},
		{
			temperatureMin: 21.702407397649736,
			temperatureMax: 32.47611590604212,
			temperatureError: 10.560532635845492,
			windSpeed: 9.145882034955608,
			humidity: .6552939119239062,
			cloudCover: .5748894832356646,
			precipProbability: .09545485135472503
		},
		{
			temperatureMin: 21.695566051237513,
			temperatureMax: 32.492356975016676,
			temperatureError: 10.556307982562645,
			windSpeed: 9.161087598991866,
			humidity: .654477564763809,
			cloudCover: .5902005280881132,
			precipProbability: .09852663749940245
		},
		{
			temperatureMin: 21.695144158413804,
			temperatureMax: 32.51630395387311,
			temperatureError: 10.550651832445642,
			windSpeed: 9.176202050882136,
			humidity: .6536687325544803,
			cloudCover: .6036405486674158,
			precipProbability: .09622120529269212
		},
		{
			temperatureMin: 21.70114184419477,
			temperatureMax: 32.5479497466048,
			temperatureError: 10.543571622325436,
			windSpeed: 9.191220000522742,
			humidity: .6528676549703593,
			cloudCover: .6108408565002535,
			precipProbability: .09893024791234639
		},
		{
			temperatureMin: 21.713557331336364,
			temperatureMax: 32.58728497588035,
			temperatureError: 10.535077245110019,
			windSpeed: 9.206135891086046,
			humidity: .6520745693880236,
			cloudCover: .6102691753671049,
			precipProbability: .10544024642109778
		},
		{
			temperatureMin: 21.732386940862078,
			temperatureMax: 32.63429798582243,
			temperatureError: 10.525181026068884,
			windSpeed: 9.2209440019787,
			humidity: .6512897108158471,
			cloudCover: .6037296295697457,
			precipProbability: .10860240057944516
		},
		{
			temperatureMin: 21.757625093151947,
			temperatureMax: 32.68897484546152,
			temperatureError: 10.513897693028518,
			windSpeed: 9.235638452078357,
			humidity: .6505133118243633,
			cloudCover: .5952039442318054,
			precipProbability: .10843241807646146
		},
		{
			temperatureMin: 21.789264309597034,
			temperatureMax: 32.75129935286413,
			temperatureError: 10.501244340557458,
			windSpeed: 9.250213203246044,
			humidity: .6497456024773492,
			cloudCover: .588701679529097,
			precipProbability: .10707392899264033
		},
		{
			temperatureMin: 21.82729521481453,
			temperatureMax: 32.82125303993362,
			temperatureError: 10.487240388235383,
			windSpeed: 9.264662064111116,
			humidity: .6489868102636531,
			cloudCover: .5862904983759428,
			precipProbability: .10699489838251348
		},
		{
			temperatureMin: 21.871706539426462,
			temperatureMax: 32.898815177882845,
			temperatureError: 10.471907533116392,
			windSpeed: 9.278978694125238,
			humidity: .6482371600297844,
			cloudCover: .5873297776468166,
			precipProbability: .11206987678014864
		},
		{
			temperatureMin: 21.92248512339897,
			temperatureMax: 32.9839627833763,
			temperatureError: 10.455269696511921,
			windSpeed: 9.293156607881611,
			humidity: .6474968739132856,
			cloudCover: .589228286022243,
			precipProbability: .11710050948377677
		},
		{
			temperatureMin: 21.979615919941626,
			temperatureMax: 33.07667062534096,
			temperatureError: 10.437352965233854,
			windSpeed: 9.307189179695209,
			humidity: .6467661712769097,
			cloudCover: .5891936211571792,
			precipProbability: .11194814417138144
		},
		{
			temperatureMin: 22.043081999966386,
			temperatureMax: 33.17691123244233,
			temperatureError: 10.41818552745303,
			windSpeed: 9.321069648439606,
			humidity: .6460452686436177,
			cloudCover: .5859188582482723,
			precipProbability: .1015592627929235
		},
		{
			temperatureMin: 22.11286455710405,
			temperatureMax: 33.28465490122523,
			temperatureError: 10.397797603342482,
			windSpeed: 9.334791122635453,
			humidity: .6453343796324188,
			cloudCover: .5802454274339707,
			precipProbability: .09862465023673637
		},
		{
			temperatureMin: 22.18894291327708,
			temperatureMax: 33.39986970491531,
			temperatureError: 10.376221370688715,
			windSpeed: 9.348346585785569,
			humidity: .6446337148950688,
			cloudCover: .5744804502682017,
			precipProbability: .10134454499150297
		},
		{
			temperatureMin: 22.27129452482645,
			temperatureMax: 33.52252150287968,
			temperatureError: 10.353490885667455,
			windSpeed: 9.361728901950988,
			humidity: .6439434820536512,
			cloudCover: .5708510511085475,
			precipProbability: .10123439858268059
		},
		{
			temperatureMin: 22.359894989192462,
			temperatureMax: 33.65257395074353,
			temperatureError: 10.329641998993251,
			windSpeed: 9.374930821562382,
			humidity: .6432638856390527,
			cloudCover: .5700781418988716,
			precipProbability: .09899182596202126
		},
		{
			temperatureMin: 22.454718052145346,
			temperatureMax: 33.789988511159855,
			temperatureError: 10.304712267664339,
			windSpeed: 9.38794498746051,
			humidity: .6425951270303583,
			cloudCover: .5709604496960253,
			precipProbability: .09784315585659487
		},
		{
			temperatureMin: 22.555735615565037,
			temperatureMax: 33.934724465228676,
			temperatureError: 10.278740862535992,
			windSpeed: 9.400763941159527,
			humidity: .6419374043951769,
			cloudCover: .5712352667429353,
			precipProbability: .09856096971690924
		},
		{
			temperatureMin: 22.662917745767324,
			temperatureMax: 34.086738924563214,
			temperatureError: 10.251768471966523,
			windSpeed: 9.413380129326281,
			humidity: .6412909126309208,
			cloudCover: .5691955951472701,
			precipProbability: .10250058358939203
		},
		{
			temperatureMin: 22.77623268237405,
			temperatureMax: 34.24598684399845,
			temperatureError: 10.223837201790365,
			windSpeed: 9.42578591046877,
			humidity: .6406558433070498,
			cloudCover: .5650599225795926,
			precipProbability: .10531786412704057
		},
		{
			temperatureMin: 22.89564684772379,
			temperatureMax: 34.41242103493884,
			temperatureError: 10.194990471882546,
			windSpeed: 9.437973561826263,
			humidity: .6400323846083136,
			cloudCover: .5612019205105173,
			precipProbability: .1003866018671397
		},
		{
			temperatureMin: 23.021124856822322,
			temperatureMax: 34.585992179341865,
			temperatureError: 10.165272909587644,
			windSpeed: 9.449935286453899,
			humidity: .6394207212789774,
			cloudCover: .5609988108922835,
			precipProbability: .094642724578746
		},
		{
			temperatureMin: 23.15262952782733,
			temperatureMax: 34.76664884433136,
			temperatureError: 10.134730240294724,
			windSpeed: 9.461663220493712,
			humidity: .6388210345680868,
			cloudCover: .5668779080655567,
			precipProbability: .09909554107682232
		},
		{
			temperatureMin: 23.290121893066875,
			temperatureMax: 34.954337497438615,
			temperatureError: 10.103409175447135,
			windSpeed: 9.473149440624042,
			humidity: .6382335021757589,
			cloudCover: .5786543204718056,
			precipProbability: .10788266372205567
		},
		{
			temperatureMin: 23.433561210585637,
			temperatureMax: 35.14900252246511,
			temperatureError: 10.07135729828286,
			windSpeed: 9.484385971679412,
			humidity: .6376582982005184,
			cloudCover: .5931510887054574,
			precipProbability: .10966291864054262
		},
		{
			temperatureMin: 23.582904976218227,
			temperatureMax: 35.35058623596268,
			temperatureError: 10.038622947607015,
			windSpeed: 9.495364794431767,
			humidity: .6370955930877196,
			cloudCover: .6054167150658664,
			precipProbability: .10596274780826288
		},
		{
			temperatureMin: 23.738108936183817,
			temperatureMax: 35.559028904326404,
			temperatureError: 10.005255099903296,
			windSpeed: 9.506077853524976,
			humidity: .63654555357903,
			cloudCover: .6109748188672571,
			precipProbability: .10221821718924051
		},
		{
			temperatureMin: 23.899127100199646,
			temperatureMax: 35.77426876149522,
			temperatureError: 9.971303250095323,
			windSpeed: 9.516517065553174,
			humidity: .6360083426630271,
			cloudCover: .6079500555373781,
			precipProbability: .09933926641123253
		},
		{
			temperatureMin: 24.065911755108242,
			temperatureMax: 35.99624202725408,
			temperatureError: 9.93681729127262,
			windSpeed: 9.526674327274081,
			humidity: .6354841195269001,
			cloudCover: .5979506153647073,
			precipProbability: .09830450189708356
		},
		{
			temperatureMin: 24.23841347901725,
			temperatureMax: 36.22488292613375,
			temperatureError: 9.901847393698324,
			windSpeed: 9.536541523947898,
			humidity: .6349730395092773,
			cloudCover: .5852389419646146,
			precipProbability: .09696020644628385
		},
		{
			temperatureMin: 24.416581155942776,
			temperatureMax: 36.46012370690165,
			temperatureError: 9.86644388341773,
			windSpeed: 9.546110537792195,
			humidity: .6344752540541974,
			cloudCover: .5746325516633747,
			precipProbability: .09152699543053243
		},
		{
			temperatureMin: 24.60036199095701,
			temperatureMax: 36.70189466263729,
			temperatureError: 9.830657120787684,
			windSpeed: 9.55537325654319,
			humidity: .633990910666235,
			cloudCover: .5692442120052419,
			precipProbability: .08859776456934705
		},
		{
			temperatureMin: 24.789701525832168,
			temperatureMax: 36.950124151388614,
			temperatureError: 9.794537379246856,
			windSpeed: 9.564321582113676,
			humidity: .6335201528667883,
			cloudCover: .5692294261691363,
			precipProbability: .09575269065464832
		},
		{
			temperatureMin: 24.98454365517818,
			temperatureMax: 37.20473861740105,
			temperatureError: 9.758134724646427,
			windSpeed: 9.572947439337339,
			humidity: .6330631201515529,
			cloudCover: .5721339636049575,
			precipProbability: .10391456694317946
		},
		{
			temperatureMin: 25.184830643066437,
			temperatureMax: 37.46566261291325,
			temperatureError: 9.721498895458788,
			windSpeed: 9.581242784789698,
			humidity: .6326199479491854,
			cloudCover: .5745526427417694,
			precipProbability: .1018518509168651
		},
		{
			temperatureMin: 25.390503140140375,
			temperatureMax: 37.73281882051395,
			temperatureError: 9.684679184179766,
			windSpeed: 9.58919961567513,
			humidity: .6321907675811756,
			cloudCover: .5741163774300224,
			precipProbability: .09473088394198224
		},
		{
			temperatureMin: 25.60150020120008,
			temperatureMax: 38.006128076053386,
			temperatureError: 9.647724320236307,
			windSpeed: 9.596809978769942,
			humidity: .631775706222927,
			cloudCover: .5706983619706177,
			precipProbability: .0912203699153042
		},
		{
			temperatureMin: 25.817759303262743,
			temperatureMax: 38.285509392100565,
			temperatureError: 9.6106823547077,
			windSpeed: 9.604065979410699,
			humidity: .6313748868660802,
			cloudCover: .5662270217383981,
			precipProbability: .09158378511221675
		},
		{
			temperatureMin: 26.03921636408912,
			temperatureMax: 38.57087998194188,
			temperatureError: 9.573600547163279,
			windSpeed: 9.61095979051767,
			humidity: .6309884282820583,
			cloudCover: .5633154338377142,
			precipProbability: .09451636986131662
		},
		{
			temperatureMin: 26.265805761172942,
			temperatureMax: 38.86215528411294,
			temperatureError: 9.536525254913963,
			windSpeed: 9.617483661642359,
			humidity: .6306164449868822,
			cloudCover: .5635880785475843,
			precipProbability: .09748656217046929
		},
		{
			temperatureMin: 26.49746035118527,
			temperatureMax: 39.15924898745544,
			temperatureError: 9.49950182496836,
			windSpeed: 9.623629928028995,
			humidity: .6302590472072288,
			cloudCover: .5667248082384313,
			precipProbability: .09678025580326895
		},
		{
			temperatureMin: 26.73411148987173,
			temperatureMax: 39.462073056693015,
			temperatureError: 9.46257448897699,
			windSpeed: 9.629391019678733,
			humidity: .6299163408477743,
			cloudCover: .5707796327653728,
			precipProbability: .0968390119012939
		},
		{
			temperatureMin: 26.975689052392646,
			temperatureMax: 39.77053775851885,
			temperatureError: 9.425786261439915,
			windSpeed: 9.634759470406202,
			humidity: .6295884274598096,
			cloudCover: .5735477518217232,
			precipProbability: .10252793872532155
		},
		{
			temperatureMin: 27.222121454102414,
			temperatureMax: 40.08455168818439,
			temperatureError: 9.389178841444538,
			windSpeed: 9.6397279268776,
			humidity: .6292754042111471,
			cloudCover: .5741123839772599,
			precipProbability: .1048337460848851
		},
		{
			temperatureMin: 27.473335671761994,
			temperatureMax: 40.404021796585205,
			temperatureError: 9.352792518190652,
			windSpeed: 9.644289157619275,
			humidity: .6289773638573335,
			cloudCover: .5735826579616425,
			precipProbability: .09616325481165607
		},
		{
			temperatureMin: 27.729257265177317,
			temperatureMax: 40.72885341783379,
			temperatureError: 9.31666608054965,
			windSpeed: 9.648436061986503,
			humidity: .6286943947141553,
			cloudCover: .5745094458470011,
			precipProbability: .08648177750380055
		},
		{
			temperatureMin: 27.98981039925655,
			temperatureMax: 41.058950297309984,
			temperatureError: 9.28083673089409,
			windSpeed: 9.652161679081265,
			humidity: .6284265806314774,
			cloudCover: .5792627866533017,
			precipProbability: .08612118328619182
		},
		{
			temperatureMin: 28.254917866483268,
			temperatureMax: 41.39421462018433,
			temperatureError: 9.245340003422195,
			windSpeed: 9.655459196608517,
			humidity: .6281740009683943,
			cloudCover: .5883063465076439,
			precipProbability: .09218181956101769
		},
		{
			temperatureMin: 28.52450110979333,
			temperatureMax: 41.7345470404026,
			temperatureError: 9.210209687189957,
			windSpeed: 9.658321959660485,
			humidity: .6279367305697069,
			cloudCover: .5994228312361106,
			precipProbability: .09943619723108164
		},
		{
			temperatureMin: 28.798480245853494,
			temperatureMax: 42.07984671012358,
			temperatureError: 9.175477754050684,
			windSpeed: 9.660743479417683,
			humidity: .6277148397437596,
			cloudCover: .6084449957680419,
			precipProbability: .10476357060691587
		},
		{
			temperatureMin: 29.07677408873287,
			temperatureMax: 42.43001130960283,
			temperatureError: 9.141174291688891,
			windSpeed: 9.662717441757104,
			humidity: .627508394241591,
			cloudCover: .6112022738722676,
			precipProbability: .1053935830873425
		},
		{
			temperatureMin: 29.35930017395995,
			temperatureMax: 42.78493707751259,
			temperatureError: 9.107327441921646,
			windSpeed: 9.66423771575611,
			humidity: .6273174552374584,
			cloudCover: .6056803571055247,
			precipProbability: .10530816846680086
		},
		{
			temperatureMin: 29.645974782957985,
			temperatureMax: 43.14451884168784,
			temperatureError: 9.073963344426316,
			windSpeed: 9.665298362082293,
			humidity: .6271420793107109,
			cloudCover: .5932214500155505,
			precipProbability: .10894334118909245
		},
		{
			temperatureMin: 29.93671296785355,
			temperatureMax: 43.50865005029124,
			temperatureError: 9.041106086039346,
			windSpeed: 9.665893641258878,
			humidity: .6269823184290181,
			cloudCover: .5780756715224357,
			precipProbability: .10910722095144859
		},
		{
			temperatureMin: 30.231428576647797,
			temperatureMax: 43.8772228033874,
			temperatureError: 9.008777655755479,
			windSpeed: 9.666018021795217,
			humidity: .62683821993298,
			cloudCover: .5654907619272184,
			precipProbability: .10119332299106809
		},
		{
			temperatureMin: 30.53003427874533,
			temperatureMax: 44.250127884914846,
			temperatureError: 8.976997905541797,
			windSpeed: 9.665666188172924,
			humidity: .6267098265220891,
			cloudCover: .5593146264434975,
			precipProbability: .09636783045082715
		},
		{
			temperatureMin: 30.83244159083214,
			temperatureMax: 44.62725479505016,
			temperatureError: 8.94578451706528,
			windSpeed: 9.664833048677059,
			humidity: .6265971762420854,
			cloudCover: .5603462830804179,
			precipProbability: .10219101529543967
		},
		{
			temperatureMin: 31.13856090309535,
			temperatureMax: 45.008491782950685,
			temperatureError: 8.915152974416795,
			windSpeed: 9.663513743063378,
			humidity: .6265003024736758,
			cloudCover: .5662607411069781,
			precipProbability: .11032837709246786
		},
		{
			temperatureMin: 31.44830150577585,
			temperatureMax: 45.39372587986933,
			temperatureError: 8.885116542898286,
			windSpeed: 9.66170365005124,
			humidity: .6264192339226513,
			cloudCover: .5730812129391423,
			precipProbability: .11269375169309391
		},
		{
			temperatureMin: 31.761571616048407,
			temperatureMax: 45.78284293262883,
			temperatureError: 8.855686253923887,
			windSpeed: 9.6593983946337,
			humidity: .6263539946113701,
			cloudCover: .5773513276840866,
			precipProbability: .10877587054090883
		},
		{
			temperatureMin: 32.07827840521825,
			temperatureMax: 46.17572763744869,
			temperatureError: 8.826870896069108,
			windSpeed: 9.65659385519465,
			humidity: .6263046038716523,
			cloudCover: .5778219833772084,
			precipProbability: .10009215606480437
		},
		{
			temperatureMin: 32.398328026229436,
			temperatureMax: 46.572263574112064,
			temperatureError: 8.798677012285959,
			windSpeed: 9.653286170424911,
			humidity: .6262710763390354,
			cloudCover: .5757884770875937,
			precipProbability: .0924739669597673
		},
		{
			temperatureMin: 32.72162564147121,
			temperatureMax: 46.97233324046271,
			temperatureError: 8.7711089032853,
			windSpeed: 9.649471746027636,
			humidity: .6262534219484527,
			cloudCover: .5739988733108841,
			precipProbability: .09096110014322732
		},
		{
			temperatureMin: 33.04807545088303,
			temperatureMax: 47.37581808722433,
			temperatureError: 8.744168637071217,
			windSpeed: 9.645147261204963,
			humidity: .6262516459312832,
			cloudCover: .5748527140970847,
			precipProbability: .08973415254110023
		},
		{
			temperatureMin: 33.377580720341264,
			temperatureMax: 47.782598553128885,
			temperatureError: 8.717856064595804,
			windSpeed: 9.640309674917662,
			humidity: .6262657488137969,
			cloudCover: .5789703670392596,
			precipProbability: .08503008937510213
		},
		{
			temperatureMin: 33.71004381032318,
			temperatureMax: 48.1925541003451,
			temperatureError: 8.69216884148628,
			windSpeed: 9.63495623190908,
			humidity: .6262957264170058,
			cloudCover: .5849445065117663,
			precipProbability: .08639608266109784
		},
		{
			temperatureMin: 34.045366204839674,
			temperatureMax: 48.60556325019716,
			temperatureError: 8.6671024557803,
			windSpeed: 9.629084468486107,
			humidity: .6263415698578992,
			cloudCover: .5903565643291921,
			precipProbability: .0974523251726687
		},
		{
			temperatureMin: 34.38344854062892,
			temperatureMax: 49.02150361916012,
			temperatureError: 8.642650261588999,
			windSpeed: 9.622692218049362,
			humidity: .6264032655520758,
			cloudCover: .5933839684362257,
			precipProbability: .10629499539134761
		},
		{
			temperatureMin: 34.72419063659823,
			temperatureMax: 49.440251955126236,
			temperatureError: 8.618803518591704,
			windSpeed: 9.615777616365145,
			humidity: .6264807952177707,
			cloudCover: .5939808226515803,
			precipProbability: .10553489953491942
		},
		{
			temperatureMin: 35.06749152351062,
			temperatureMax: 49.861684173926086,
			temperatureError: 8.595551437250535,
			windSpeed: 9.60833910657241,
			humidity: .6265741358812695,
			cloudCover: .5938830605158462,
			precipProbability: .09962771121874277
		},
		{
			temperatureMin: 35.41324947390442,
			temperatureMax: 50.28567539609806,
			temperatureError: 8.572881229617792,
			windSpeed: 9.600375443917539,
			humidity: .6266832598837201,
			cloudCover: .5954088597447289,
			precipProbability: .09372639627523453
		},
		{
			temperatureMin: 35.76136203223652,
			temperatureMax: 50.712099983892465,
			temperatureError: 8.5507781655942,
			windSpeed: 9.591885700210947,
			humidity: .6268081348893272,
			cloudCover: .5997715542926759,
			precipProbability: .09233228889698135
		},
		{
			temperatureMin: 36.11172604524357,
			temperatureMax: 51.140831578500745,
			temperatureError: 8.5292256344814,
			windSpeed: 9.582869267999193,
			humidity: .6269487238949274,
			cloudCover: .6059524980614021,
			precipProbability: .09720236812458244
		},
		{
			temperatureMin: 36.464237692506735,
			temperatureMax: 51.57174313749912,
			temperatureError: 8.508205211657947,
			windSpeed: 9.57332586444622,
			humidity: .6271049852409677,
			cloudCover: .6108916592816783,
			precipProbability: .1007378093463942
		},
		{
			temperatureMin: 36.81596407140715,
			temperatureMax: 52.00470697249233,
			temperatureError: 8.487696730194445,
			windSpeed: 9.563255534919245,
			humidity: .6272768726238366,
			cloudCover: .6110002855031188,
			precipProbability: .09819685815930172
		},
		{
			temperatureMin: 37.16474019334605,
			temperatureMax: 52.43959478695248,
			temperatureError: 8.46767835721017,
			windSpeed: 9.552658656273005,
			humidity: .6274643351095952,
			cloudCover: .6042122212606812,
			precipProbability: .0976484551876073
		},
		{
			temperatureMin: 37.515330405445894,
			temperatureMax: 52.876277714233865,
			temperatureError: 8.448126674760898,
			windSpeed: 9.54153593982825,
			humidity: .6276673171490622,
			cloudCover: .5914263011212605,
			precipProbability: .10155043728160269
		},
		{
			temperatureMin: 37.86763082025986,
			temperatureMax: 53.31462635576113,
			temperatureError: 8.429016765035557,
			windSpeed: 9.529888434039494,
			humidity: .6278857585942771,
			cloudCover: .576474501818062,
			precipProbability: .09902917637069399
		},
		{
			temperatureMin: 38.221537043572106,
			temperatureMax: 53.75451081937146,
			temperatureError: 8.410322299627772,
			windSpeed: 9.517717526847933,
			humidity: .6281195947163273,
			cloudCover: .5645356820601142,
			precipProbability: .08714418561800018
		},
		{
			temperatureMin: 38.57694420533041,
			temperatureMax: 54.195800757804605,
			temperatureError: 8.39201563263753,
			windSpeed: 9.50502494771589,
			humidity: .6283687562245232,
			cloudCover: .5597699565792592,
			precipProbability: .07590775711775781
		},
		{
			temperatureMin: 38.93374699072271,
			temperatureMax: 54.63836540732846,
			temperatureError: 8.374067897347938,
			windSpeed: 9.491812769338994,
			humidity: .6286331692869306,
			cloudCover: .56339473733786,
			precipProbability: .07177942302402034
		},
		{
			temperatureMin: 39.2918396713833,
			temperatureMax: 55.08207362648547,
			temperatureError: 8.356449106212427,
			windSpeed: 9.478083409032974,
			humidity: .6289127555522546,
			cloudCover: .5732055306372889,
			precipProbability: .07510199769387964
		},
		{
			temperatureMin: 39.651116136722244,
			temperatureMax: 55.52679393495457,
			temperatureError: 8.339128253879116,
			windSpeed: 9.46383962979259,
			humidity: .6292074321730495,
			cloudCover: .5847779974071833,
			precipProbability: .08332837469705211
		},
		{
			temperatureMin: 40.01146992536956,
			temperatureMax: 55.972394552510295,
			temperatureError: 8.322073422970652,
			windSpeed: 9.449084541019811,
			humidity: .6295171118302761,
			cloudCover: .5936945480762429,
			precipProbability: .08827097460652548
		},
		{
			temperatureMin: 40.37279425672012,
			temperatureMax: 56.41874343807295,
			temperatureError: 8.305251892330702,
			windSpeed: 9.433821598919836,
			humidity: .6298417027591644,
			cloudCover: .5976109683225898,
			precipProbability: .08642672337477468
		},
		{
			temperatureMin: 40.73498206257682,
			temperatureMax: 56.86570832883496,
			temperatureError: 8.288630247441661,
			windSpeed: 9.418054606562366,
			humidity: .6301811087764174,
			cloudCover: .5971025085309416,
			precipProbability: .08650719235534667
		},
		{
			temperatureMin: 41.0979260188762,
			temperatureMax: 57.313156779452534,
			temperatureError: 8.272174492712166,
			windSpeed: 9.401787713607728,
			humidity: .6305352293087093,
			cloudCover: .5949256292315289,
			precipProbability: .09132746065487914
		},
		{
			temperatureMin: 41.46151857749074,
			temperatureMax: 57.76095620129357,
			temperatureError: 8.255850165328281,
			windSpeed: 9.385025415696491,
			humidity: .630903959422484,
			cloudCover: .5942043593681773,
			precipProbability: .09111671788538356
		},
		{
			temperatureMin: 41.82565199809865,
			temperatureMax: 58.2089739017243,
			temperatureError: 8.239622450357825,
			windSpeed: 9.367772553501974,
			humidity: .6312871898550488,
			cloudCover: .5966103994170887,
			precipProbability: .08484341915385862
		},
		{
			temperatureMin: 42.19021838010841,
			temperatureMax: 58.65707712343174,
			temperatureError: 8.223456296794064,
			windSpeed: 9.350034311445638,
			humidity: .6316848070469554,
			cloudCover: .6015494432511068,
			precipProbability: .08320245036205294
		},
		{
			temperatureMin: 42.555109694633536,
			temperatureMax: 59.10513308376013,
			temperatureError: 8.207316534222496,
			windSpeed: 9.331816216075305,
			humidity: .6320966931756516,
			cloudCover: .6067420908549718,
			precipProbability: .08922999826674077
		},
		{
			temperatureMin: 42.920217816501854,
			temperatureMax: 59.55300901405858,
			temperatureError: 8.191167989792788,
			windSpeed: 9.313124134107367,
			humidity: .632522726190388,
			cloudCover: .6097662477362211,
			precipProbability: .0973543418432621
		},
		{
			temperatureMin: 43.285434556297666,
			temperatureMax: 60.00057219902297,
			temperatureError: 8.174975605177034,
			windSpeed: 9.29396427013328,
			humidity: .6329627798483832,
			cloudCover: .6095847478584422,
			precipProbability: .10268640972303333
		},
		{
			temperatureMin: 43.650651692419174,
			temperatureMax: 60.44769001602261,
			temperatureError: 8.158704553195678,
			windSpeed: 9.274343163991762,
			humidity: .6334167237522463,
			cloudCover: .607125050435989,
			precipProbability: .10030711277513206
		},
		{
			temperatureMin: 44.015761003146345,
			temperatureMax: 60.89422997439851,
			temperatureError: 8.142320353793261,
			windSpeed: 9.254267687809158,
			humidity: .633884423388598,
			cloudCover: .6045723259903407,
			precipProbability: .0911160564766832
		},
		{
			temperatureMin: 44.38065429871102,
			temperatureMax: 61.34005975472389,
			temperatureError: 8.12578898904791,
			windSpeed: 9.233745042708904,
			humidity: .6343657401679444,
			cloudCover: .6038281207505495,
			precipProbability: .08575987822782276
		},
		{
			temperatureMin: 44.74522345335454,
			temperatureMax: 61.78504724801322,
			temperatureError: 8.10907701690102,
			windSpeed: 9.212782755193578,
			humidity: .6348605314657374,
			cloudCover: .6051060938230964,
			precipProbability: .08726894433905796
		},
		{
			temperatureMin: 45.10936043736848,
			temperatureMax: 62.229060594868336,
			temperatureError: 8.092151683297171,
			windSpeed: 9.191388673201828,
			humidity: .6353686506646337,
			cloudCover: .6065748105124742,
			precipProbability: .08595476213643023
		},
		{
			temperatureMin: 45.47295734910578,
			temperatureMax: 62.67196822455234,
			temperatureError: 8.074981032428363,
			windSpeed: 9.169570961843275,
			humidity: .6358899471979494,
			cloudCover: .6053448677899805,
			precipProbability: .08099130021959505
		},
		{
			temperatureMin: 45.83590644695417,
			temperatureMax: 63.11363889397558,
			temperatureError: 8.05753401478188,
			windSpeed: 9.147338098815391,
			humidity: .6364242665942751,
			cloudCover: .5992869047934839,
			precipProbability: .08228987277000877
		},
		{
			temperatureMin: 46.19810018126312,
			temperatureMax: 63.55394172658679,
			temperatureError: 8.03978059269691,
			windSpeed: 9.124698869506199,
			humidity: .6369714505232367,
			cloudCover: .5886325849762278,
			precipProbability: .08991897010683997
		},
		{
			temperatureMin: 46.55943122621228,
			temperatureMax: 63.992746251153925,
			temperatureError: 8.021691843141712,
			windSpeed: 9.101662361786417,
			humidity: .6375313368424304,
			cloudCover: .576373953583008,
			precipProbability: .09537394861687505
		},
		{
			temperatureMin: 46.919792511614894,
			temperatureMax: 64.42992244042645,
			temperatureError: 8.003240057430604,
			windSpeed: 9.07823796049672,
			humidity: .6381037596454533,
			cloudCover: .5671183982599933,
			precipProbability: .09523995125367422
		},
		{
			temperatureMin: 47.279077254644754,
			temperatureMax: 64.86534074966427,
			temperatureError: 7.984398837608122,
			windSpeed: 9.054435341634187,
			humidity: .638688549311077,
			cloudCover: .5649230036339732,
			precipProbability: .08972196550351087
		},
		{
			temperatureMin: 47.63717899147864,
			temperatureMax: 65.29887215502545,
			temperatureError: 7.965143189236753,
			windSpeed: 9.030264466243802,
			humidity: .6392855325535047,
			cloudCover: .5712335136774798,
			precipProbability: .08255567372214194
		},
		{
			temperatureMin: 47.99399160884345,
			temperatureMax: 65.73038819179816,
			temperatureError: 7.94544961033417,
			windSpeed: 9.005735574020566,
			humidity: .639894532473714,
			cloudCover: .5840416282105046,
			precipProbability: .0824667066693552
		},
		{
			temperatureMin: 48.349409375460056,
			temperatureMax: 66.15976099246758,
			temperatureError: 7.925296176216253,
			windSpeed: 8.980859176627815,
			humidity: .640515368611886,
			cloudCover: .5987439650296653,
			precipProbability: .08902056285310606
		},
		{
			temperatureMin: 48.70332697337363,
			temperatureMax: 66.58686332460638,
			temperatureError: 7.904662620012974,
			windSpeed: 8.955646050738528,
			humidity: .6411478570008787,
			cloudCover: .6102793335636637,
			precipProbability: .09057439707776427
		},
		{
			temperatureMin: 49.055639529161446,
			temperatureMax: 67.01156862857606,
			temperatureError: 7.883530408636219,
			windSpeed: 8.930107230806327,
			humidity: .6417918102207252,
			cloudCover: .6154383876676753,
			precipProbability: .08608002597231494
		},
		{
			temperatureMin: 49.40624264501023,
			temperatureMax: 67.43375105502913,
			temperatureError: 7.861882813990064,
			windSpeed: 8.904254001572157,
			humidity: .642447037454193,
			cloudCover: .614158532352053,
			precipProbability: .08566869012758034
		},
		{
			temperatureMin: 49.755032429649674,
			temperatureMax: 67.85328550220098,
			temperatureError: 7.839704979227623,
			windSpeed: 8.87809789031523,
			humidity: .6431133445433125,
			cloudCover: .6091793498397251,
			precipProbability: .0889427745311711
		},
		{
			temperatureMin: 50.10190552913919,
			temperatureMax: 68.27004765298102,
			temperatureError: 7.816983979871011,
			windSpeed: 8.851650658854709,
			humidity: .6437905340469116,
			cloudCover: .6043239170247742,
			precipProbability: .08761198131375207
		},
		{
			temperatureMin: 50.4467591574935,
			temperatureMax: 68.68391401174904,
			temperatureError: 7.793708879625348,
			windSpeed: 8.824924295310383,
			humidity: .6444784052991239,
			cloudCover: .6023940832981026,
			precipProbability: .08154155919970621
		},
		{
			temperatureMin: 50.78949112713979,
			temperatureMax: 69.09476194097127,
			temperatureError: 7.769870780731481,
			windSpeed: 8.797931005630165,
			humidity: .6451767544688544,
			cloudCover: .6038276469601238,
			precipProbability: .07509551273591496
		},
		{
			temperatureMin: 51.12999987919869,
			temperatureMax: 69.50246969753925,
			temperatureError: 7.745462868717037,
			windSpeed: 8.770683204893226,
			humidity: .6458853746201693,
			cloudCover: .6067876297585096,
			precipProbability: .07185843595336332
		},
		{
			temperatureMin: 51.46818451357813,
			temperatureMax: 69.9069164688458,
			temperatureError: 7.720480451420044,
			windSpeed: 8.743193508396585,
			humidity: .6466040557736311,
			cloudCover: .6085224891246092,
			precipProbability: .07615152907335328
		},
		{
			temperatureMin: 51.803944818872516,
			temperatureMax: 70.30798240858397,
			temperatureError: 7.694920992175163,
			windSpeed: 8.71547472253509,
			humidity: .6473325849684972,
			cloudCover: .6071287117079386,
			precipProbability: .08412294151231454
		},
		{
			temperatureMin: 52.137181302057016,
			temperatureMax: 70.70554867226006,
			temperatureError: 7.668784137067668,
			windSpeed: 8.687539835482555,
			humidity: .6480707463258445,
			cloudCover: .6026616322344719,
			precipProbability: .08440230680739202
		},
		{
			temperatureMin: 52.467795217969666,
			temperatureMax: 71.09949745241005,
			temperatureError: 7.642071736176561,
			windSpeed: 8.659402007684369,
			humidity: .6488183211125361,
			cloudCover: .5969692737402715,
			precipProbability: .0781460082694136
		},
		{
			temperatureMin: 52.795688598572134,
			temperatureMax: 71.48971201350773,
			temperatureError: 7.614787858744187,
			windSpeed: 8.631074562170943,
			humidity: .6495750878060286,
			cloudCover: .5924059926248598,
			precipProbability: .07701746850113893
		},
		{
			temperatureMin: 53.12076428197888,
			temperatureMax: 71.8760767265579,
			temperatureError: 7.586938802225826,
			windSpeed: 8.602570974701353,
			humidity: .6503408221600114,
			cloudCover: .5902559100570595,
			precipProbability: .08033004784739847
		},
		{
			temperatureMin: 53.44292594124987,
			temperatureMax: 72.25847710335708,
			temperatureError: 7.558533095189358,
			windSpeed: 8.57390486374704,
			humidity: .6511152972708772,
			cloudCover: .589866326582339,
			precipProbability: .07908039578035402
		},
		{
			temperatureMin: 53.76207811293205,
			temperatureMax: 72.63679983042104,
			temperatureError: 7.529581494051375,
			windSpeed: 8.545089980326603,
			humidity: .651898283644933,
			cloudCover: .5890597742338884,
			precipProbability: .07409170269790269
		},
		{
			temperatureMin: 54.07812622534931,
			temperatureMax: 73.01093280256083,
			temperatureError: 7.500096973652664,
			windSpeed: 8.51614019770072,
			humidity: .6526895492664174,
			cloudCover: .5856135567105812,
			precipProbability: .07069006169794809
		},
		{
			temperatureMin: 54.39097662662499,
			temperatureMax: 73.38076515610224,
			temperatureError: 7.4700947116925205,
			windSpeed: 8.487069500938432,
			humidity: .6534888596662508,
			cloudCover: .5789266696679439,
			precipProbability: .07006057302856764
		},
		{
			temperatureMin: 54.700536612433574,
			temperatureMax: 73.74618730173732,
			temperatureError: 7.439592067057731,
			windSpeed: 8.457891976365188,
			humidity: .654295977991512,
			cloudCover: .5708346681011068,
			precipProbability: .07264591998185799
		},
		{
			temperatureMin: 55.006714453470046,
			temperatureMax: 74.10709095699802,
			temperatureError: 7.408608552098435,
			windSpeed: 8.42862180090329,
			humidity: .6551106650756202,
			cloudCover: .5649894811013919,
			precipProbability: .07442096651684542
		},
		{
			temperatureMin: 55.30941942263247,
			temperatureMax: 74.46336917834205,
			temperatureError: 7.377165798919321,
			windSpeed: 8.399273231315595,
			humidity: .6559326795092126,
			cloudCover: .5650419846674308,
			precipProbability: .06796598851363546
		},
		{
			temperatureMin: 55.60856182190559,
			temperatureMax: 74.81491639284364,
			temperatureError: 7.345287519770557,
			windSpeed: 8.369860593363624,
			humidity: .6567617777116679,
			cloudCover: .5725823008572909,
			precipProbability: .05829283013458761
		},
		{
			temperatureMin: 55.90405300894024,
			temperatureMax: 75.16162842947598,
			temperatureError: 7.312999461638765,
			windSpeed: 8.34039827089069,
			humidity: .6575977140032983,
			cloudCover: .5859885221793414,
			precipProbability: .05789747054661732
		},
		{
			temperatureMin: 56.19580542332085,
			temperatureMax: 75.5034025499799,
			temperatureError: 7.2803293551538095,
			windSpeed: 8.310900694841807,
			humidity: .6584402406781419,
			cloudCover: .6008820425523829,
			precipProbability: .06424782911958987
		},
		{
			temperatureMin: 56.48373261251016,
			temperatureMax: 75.84013747930737,
			temperatureError: 7.247306857942419,
			windSpeed: 8.281382332231148,
			humidity: .6592891080773587,
			cloudCover: .6120275468333006,
			precipProbability: .06637504920406191
		},
		{
			temperatureMin: 56.76774925746824,
			temperatureMax: 76.17173343563178,
			temperatureError: 7.213963492574583,
			windSpeed: 8.251857675068349,
			humidity: .6601440646632146,
			cloudCover: .6157235747825377,
			precipProbability: .06521963807004894
		},
		{
			temperatureMin: 57.04777119793353,
			temperatureMax: 76.49809215991445,
			temperatureError: 7.180332579263163,
			windSpeed: 8.222341229255049,
			humidity: .6610048570936277,
			cloudCover: .6114487904474555,
			precipProbability: .06675591429363038
		},
		{
			temperatureMin: 57.3237154573618,
			temperatureMax: 76.81911694502224,
			temperatureError: 7.146449163491082,
			windSpeed: 8.192847503463335,
			humidity: .6618712302972217,
			cloudCover: .6019201495287773,
			precipProbability: .0705306189941254
		},
		{
			temperatureMin: 57.59550026751343,
			temperatureMax: 77.13471266438289,
			temperatureError: 7.112349938754342,
			windSpeed: 8.163390998006959,
			humidity: .6627429275489192,
			cloudCover: .5915680344445358,
			precipProbability: .07495014371963354
		},
		{
			temperatureMin: 57.86304509268381,
			temperatureMax: 77.44478580017395,
			temperatureError: 7.078073164621977,
			windSpeed: 8.133986193717039,
			humidity: .6636196905460101,
			cloudCover: .584271181027739,
			precipProbability: .07739166516156777
		},
		{
			temperatureMin: 58.12627065356719,
			temperatureMax: 77.74924447103275,
			temperatureError: 7.0436585803267,
			windSpeed: 8.104647540833557,
			humidity: .6645012594846943,
			cloudCover: .5815603445336145,
			precipProbability: .07377647833802528
		},
		{
			temperatureMin: 58.38509895074832,
			temperatureMax: 78.04799845928501,
			temperatureError: 7.0091473141120915,
			windSpeed: 8.0753894479238,
			humidity: .6653873731370765,
			cloudCover: .5822000346696613,
			precipProbability: .06971994992520576
		},
		{
			temperatureMin: 58.639453287817894,
			temperatureMax: 78.34095923767603,
			temperatureError: 6.974581788573428,
			windSpeed: 8.046226270839911,
			humidity: .6662777689285502,
			cloudCover: .5832712950038348,
			precipProbability: .07464279061665068
		},
		{
			temperatureMin: 58.88925829409548,
			temperatureMax: 78.62803999560465,
			temperatureError: 6.940005622240146,
			windSpeed: 8.017172301725491,
			humidity: .6671721830156283,
			cloudCover: .5820532281566299,
			precipProbability: .08223937298730538
		},
		{
			temperatureMin: 59.13443994696704,
			temperatureMax: 78.90915566484652,
			temperatureError: 6.905463527658043,
			windSpeed: 7.988241758083663,
			humidity: .6680703503641169,
			cloudCover: .5775981874098469,
			precipProbability: .08034585913976401
		},
		{
			temperatureMin: 59.37492559381689,
			temperatureMax: 79.18422294476203,
			temperatureError: 6.871001206238554,
			windSpeed: 7.959448771917518,
			humidity: .6689720048276481,
			cloudCover: .5711296910004401,
			precipProbability: .0722473387937321
		},
		{
			temperatureMin: 59.61064397355842,
			temperatureMax: 79.4531603269796,
			temperatureError: 6.836665240151525,
			windSpeed: 7.930807378953467,
			humidity: .6698768792265298,
			cloudCover: .5651125869075114,
			precipProbability: .06698697573689082
		},
		{
			temperatureMin: 59.841525237748044,
			temperatureMax: 79.71588811954858,
			temperatureError: 6.802502981545455,
			windSpeed: 7.902331507959107,
			humidity: .6707847054269678,
			cloudCover: .5616269076787875,
			precipProbability: .06467477840730161
		},
		{
			temperatureMin: 60.06750097128421,
			temperatureMax: 79.9723284705541,
			temperatureError: 6.768562439386733,
			windSpeed: 7.874034970166522,
			humidity: .6716952144204585,
			cloudCover: .5610673085662788,
			precipProbability: .06334733017720671
		},
		{
			temperatureMin: 60.28850421268026,
			temperatureMax: 80.22240539118565,
			temperatureError: 6.734892164215691,
			windSpeed: 7.84593144881119,
			humidity: .6726081364035368,
			cloudCover: .5619683842123542,
			precipProbability: .0621809228181243
		},
		{
			temperatureMin: 60.50446947390637,
			temperatureMax: 80.46604477825461,
			temperatureError: 6.70154113112293,
			windSpeed: 7.818034488797949,
			humidity: .6735232008577118,
			cloudCover: .5620594596342262,
			precipProbability: .05914042551150769
		},
		{
			temperatureMin: 60.715332759794734,
			temperatureMax: 80.70317443615224,
			temperatureError: 6.668558621254326,
			windSpeed: 7.790357486503429,
			humidity: .6744401366296494,
			cloudCover: .5598940293485702,
			precipProbability: .05843956644472693
		},
		{
			temperatureMin: 60.92103158700221,
			temperatureMax: 80.93372409824359,
			temperatureError: 6.635994102157049,
			windSpeed: 7.762913679727198,
			humidity: .6753586720114816,
			cloudCover: .5560283287481125,
			precipProbability: .06581787664254297
		},
		{
			temperatureMin: 61.121505002528174,
			temperatureMax: 81.15762544768765,
			temperatureError: 6.603897107282168,
			windSpeed: 7.735716137799251,
			humidity: .6762785348213526,
			cloudCover: .5529649062733691,
			precipProbability: .07306656280374643
		},
		{
			temperatureMin: 61.31669360177205,
			temperatureMax: 81.37481213768281,
			temperatureError: 6.572317114961696,
			windSpeed: 7.7087777518560285,
			humidity: .6771994524840617,
			cloudCover: .5537980923805924,
			precipProbability: .06969007088847486
		},
		{
			temperatureMin: 61.50653954613955,
			temperatureMax: 81.58521981112527,
			temperatureError: 6.541303427179648,
			windSpeed: 7.682111225293705,
			humidity: .6781211521118286,
			cloudCover: .5602837456949016,
			precipProbability: .06260527234356163
		},
		{
			temperatureMin: 61.690986580180585,
			temperatureMax: 81.7887861196805,
			temperatureError: 6.51090504845697,
			windSpeed: 7.655729064408572,
			humidity: .6790433605851623,
			cloudCover: .5714455537456343,
			precipProbability: .06263172878827504
		},
		{
			temperatureMin: 61.86998004825765,
			temperatureMax: 81.98545074225811,
			temperatureError: 6.481170565170388,
			windSpeed: 7.629643569234084,
			humidity: .6799658046337856,
			cloudCover: .5835853277379499,
			precipProbability: .06756018958750983
		},
		{
			temperatureMin: 62.04346691074368,
			temperatureMax: 82.1751554028858,
			temperatureError: 6.452148025623895,
			windSpeed: 7.603866824583239,
			humidity: .6808882109176287,
			cloudCover: .5918079729150918,
			precipProbability: .0719603788259703
		},
		{
			temperatureMin: 62.21139575973683,
			temperatureMax: 82.35784388797867,
			temperatureError: 6.42388482118989,
			windSpeed: 7.578410691306402,
			humidity: .6818103061077946,
			cloudCover: .592322517865862,
			precipProbability: .07420666257742291
		},
		{
			temperatureMin: 62.37371683429502,
			temperatureMax: 82.53346206299565,
			temperatureError: 6.396427568833974,
			windSpeed: 7.553286797771574,
			humidity: .6827318169675788,
			cloudCover: .5843188476626711,
			precipProbability: .07262470446739439
		},
		{
			temperatureMin: 62.53038203518096,
			temperatureMax: 82.7019578884815,
			temperatureError: 6.3698219953342905,
			windSpeed: 7.528506531577051,
			humidity: .6836524704334276,
			cloudCover: .5704137546018365,
			precipProbability: .07001555758938753
		},
		{
			temperatureMin: 62.68134493911458,
			temperatureMax: 82.86328143548673,
			temperatureError: 6.344112823501276,
			windSpeed: 7.504081031504099,
			humidity: .6845719936958473,
			cloudCover: .5554115285421632,
			precipProbability: .07072190490461754
		},
		{
			temperatureMin: 62.826560812528584,
			temperatureMax: 83.01738490036252,
			temperatureError: 6.319343660699032,
			windSpeed: 7.480021179717203,
			humidity: .6854901142802561,
			cloudCover: .5440217914752358,
			precipProbability: .068350754825102
		},
		{
			temperatureMin: 62.96598662482637,
			temperatureMax: 83.1642226189265,
			temperatureError: 6.295556889963122,
			windSpeed: 7.456337594220545,
			humidity: .6864065601277004,
			cloudCover: .5387254590537147,
			precipProbability: .05676555801629248
		},
		{
			temperatureMin: 63.09958106113068,
			temperatureMax: 83.3037510799937,
			temperatureError: 6.272793564003005,
			windSpeed: 7.433040621576542,
			humidity: .6873210596755045,
			cloudCover: .5388779261155212,
			precipProbability: .04636330992019257
		},
		{
			temperatureMin: 63.2273045345265,
			temperatureMax: 83.43592893826971,
			temperatureError: 6.251093302369598,
			windSpeed: 7.410140329895235,
			humidity: .688233341937717,
			cloudCover: .5414489492263014,
			precipProbability: .047589646772949225
		},
		{
			temperatureMin: 63.34911919779206,
			temperatureMax: 83.56071702660265,
			temperatureError: 6.230494192060225,
			windSpeed: 7.387646502100043,
			humidity: .6891431365854079,
			cloudCover: .5429096356403462,
			precipProbability: .054222637845213306
		},
		{
			temperatureMin: 63.464988954614554,
			temperatureMax: 83.6780783675886,
			temperatureError: 6.211032691824106,
			windSpeed: 7.36556862947657,
			humidity: .6900501740267924,
			cloudCover: .5411829534819268,
			precipProbability: .05761107801389104
		},
		{
			temperatureMin: 63.57487947028329,
			temperatureMax: 83.78797818452956,
			temperatureError: 6.19274354042182,
			windSpeed: 7.343915905511014,
			humidity: .6909541854871043,
			cloudCover: .5365972774938633,
			precipProbability: .05712914517562271
		},
		{
			temperatureMin: 63.67875818186762,
			temperatureMax: 83.89038391173781,
			temperatureError: 6.175659669081764,
			windSpeed: 7.32269722002371,
			humidity: .6918549030882297,
			cloudCover: .5313931732913112,
			precipProbability: .053671081403644405
		},
		{
			temperatureMin: 63.77659430786291,
			temperatureMax: 83.98526520418635,
			temperatureError: 6.159812118385436,
			windSpeed: 7.301921153602769,
			humidity: .692752059928112,
			cloudCover: .528172226385721,
			precipProbability: .05048362397289321
		},
		{
			temperatureMin: 63.86835885731358,
			temperatureMax: 84.0725939465005,
			temperatureError: 6.14522995980186,
			windSpeed: 7.281595972344125,
			humidity: .6936453901598156,
			cloudCover: .5282617190926718,
			precipProbability: .051624421274140325
		},
		{
			temperatureMin: 63.95402463840368,
			temperatureMax: 84.15234426128919,
			temperatureError: 6.1319402220790264,
			windSpeed: 7.261729622901527,
			humidity: .6945346290703115,
			cloudCover: .5309725330971612,
			precipProbability: .05210615658748562
		},
		{
			temperatureMin: 64.03356626651279,
			temperatureMax: 84.22449251681297,
			temperatureError: 6.11996782268758,
			windSpeed: 7.2423297278517325,
			humidity: .6954195131589141,
			cloudCover: .5341610256875045,
			precipProbability: .047325976418936745
		},
		{
			temperatureMin: 64.10696017174071,
			temperatureMax: 84.2890173339867,
			temperatureError: 6.109335504498258,
			windSpeed: 7.22340358137819,
			humidity: .6962997802153804,
			cloudCover: .5357088802604285,
			precipProbability: .046537683231232856
		},
		{
			temperatureMin: 64.17418460588833,
			temperatureMax: 84.34589959271442,
			temperatureError: 6.100063777861337,
			windSpeed: 7.204958145278387,
			humidity: .6971751693975784,
			cloudCover: .5349782188123876,
			precipProbability: .056028265297350104
		},
		{
			temperatureMin: 64.23521964890551,
			temperatureMax: 84.39512243755534,
			temperatureError: 6.092170868241435,
			windSpeed: 7.1870000452961404,
			humidity: .6980454213088048,
			cloudCover: .5333101309450251,
			precipProbability: .06503865685348303
		},
		{
			temperatureMin: 64.29004721479207,
			temperatureMax: 84.43667128271817,
			temperatureError: 6.0856726695467165,
			windSpeed: 7.169535567783892,
			humidity: .6989102780746315,
			cloudCover: .5332084425733082,
			precipProbability: .06425435026625584
		},
		{
			temperatureMin: 64.33865105695642,
			temperatureMax: 84.47053381638341,
			temperatureError: 6.080582703276428,
			windSpeed: 7.152570656695882,
			humidity: .6997694834193356,
			cloudCover: .5366522036692528,
			precipProbability: .05738532221912305
		},
		{
			temperatureMin: 64.3810167730315,
			temperatureMax: 84.49670000435148,
			temperatureError: 6.076912083595121,
			windSpeed: 7.136110910915666,
			humidity: .7006227827418355,
			cloudCover: .5435382775096494,
			precipProbability: .049920052612928444
		},
		{
			temperatureMin: 64.41713180914068,
			temperatureMax: 84.51516209301617,
			temperatureError: 6.074669488426429,
			windSpeed: 7.120161581919682,
			humidity: .7014699231911162,
			cloudCover: .5512340652409661,
			precipProbability: .04577806816249883
		},
		{
			temperatureMin: 64.4469854636204,
			temperatureMax: 84.52591461166222,
			temperatureError: 6.07386113664326,
			windSpeed: 7.104727571777119,
			humidity: .7023106537411872,
			cloudCover: .555616780058792,
			precipProbability: .04779215726184883
		},
		{
			temperatureMin: 64.47056889018775,
			temperatureMax: 84.52895437408624,
			temperatureError: 6.074490771415083,
			windSpeed: 7.089813431489328,
			humidity: .7031447252654407,
			cloudCover: .5531252476013917,
			precipProbability: .05086033184867598
		},
		{
			temperatureMin: 64.48787510056464,
			temperatureMax: 84.52428047954106,
			temperatureError: 6.076559649756747,
			windSpeed: 7.075423359667639,
			humidity: .7039718906104807,
			cloudCover: .5427380136674383,
			precipProbability: .05017195644175652
		},
		{
			temperatureMin: 64.49889896654751,
			temperatureMax: 84.51189431300261,
			temperatureError: 6.080066538306878,
			windSpeed: 7.061561201550888,
			humidity: .7047919046693645,
			cloudCover: .5267755931809573,
			precipProbability: .05288126864448247
		},
		{
			temperatureMin: 64.50363722152724,
			temperatureMax: 84.49179954475908,
			temperatureError: 6.0850077153473245,
			windSpeed: 7.048230448362282,
			humidity: .7056045244542348,
			cloudCover: .5100293205411258,
			precipProbability: .06244459543429662
		},
		{
			temperatureMin: 64.50208846145611,
			temperatureMax: 84.4640021293242,
			temperatureError: 6.091376979058624,
			windSpeed: 7.035434237005856,
			humidity: .7064095091683055,
			cloudCover: .49761706718992516,
			precipProbability: .06723247558037915
		},
		{
			temperatureMin: 64.49425314526509,
			temperatureMax: 84.42851030367198,
			temperatureError: 6.099165661990058,
			windSpeed: 7.023175350100466,
			humidity: .7072066202772326,
			cloudCover: .4926599579573794,
			precipProbability: .06092019566073139
		},
		{
			temperatureMin: 64.48013359472817,
			temperatureMax: 84.38533458479644,
			temperatureError: 6.1083626517062335,
			windSpeed: 7.011456216351431,
			humidity: .7079956215797935,
			cloudCover: .49497680690473117,
			precipProbability: .052416037398040016
		},
		{
			temperatureMin: 64.45973399377219,
			temperatureMax: 84.33448776659479,
			temperatureError: 6.118954417555912,
			windSpeed: 7.00027891125769,
			humidity: .7087762792778746,
			cloudCover: .5014454291263756,
			precipProbability: .049279452883103016
		},
		{
			temperatureMin: 64.43306038723934,
			temperatureMax: 84.2759849160766,
			temperatureError: 6.1309250434925735,
			windSpeed: 6.989645158152651,
			humidity: .7095483620457549,
			cloudCover: .5077855592928661,
			precipProbability: .05202044426193317
		},
		{
			temperatureMin: 64.40012067909561,
			temperatureMax: 84.20984336889921,
			temperatureError: 6.144256266860107,
			windSpeed: 6.979556329576691,
			humidity: .7103116410986376,
			cloudCover: .5107717542431361,
			precipProbability: .05897738787067458
		},
		{
			temperatureMin: 64.3609246300865,
			temperatureMax: 84.13608272423032,
			temperatureError: 6.1589275230414,
			windSpeed: 6.970013448977894,
			humidity: .7110658902604744,
			cloudCover: .5096947912906992,
			precipProbability: .0636334433030998
		},
		{
			temperatureMin: 64.31548385484747,
			temperatureMax: 84.05472483894108,
			temperatureError: 6.17491599585185,
			windSpeed: 6.961017192739212,
			humidity: .7118108860309635,
			cloudCover: .5063503476752941,
			precipProbability: .06149814007702231
		},
		{
			temperatureMin: 64.26381181846104,
			temperatureMax: 83.96579382112832,
			temperatureError: 6.192196673544834,
			windSpeed: 6.952567892528092,
			humidity: .7125464076517695,
			cloudCover: .5036736284684394,
			precipProbability: .05965332900666595
		},
		{
			temperatureMin: 64.20592383246652,
			temperatureMax: 83.86931602297265,
			temperatureError: 6.210742410281214,
			windSpeed: 6.944665537964088,
			humidity: .7132722371719695,
			cloudCover: .5038798818830398,
			precipProbability: .0619820477919123
		},
		{
			temperatureMin: 64.1418370503243,
			temperatureMax: 83.7653200329271,
			temperatureError: 6.230523992900519,
			windSpeed: 6.937309779601921,
			humidity: .7139881595126139,
			cloudCover: .5072000203558572,
			precipProbability: .05920274050774584
		},
		{
			temperatureMin: 64.07157046232997,
			temperatureMax: 83.65383666724813,
			temperatureError: 6.251510212817398,
			windSpeed: 6.930499932224646,
			humidity: .7146939625304535,
			cloudCover: .5119024524166609,
			precipProbability: .04894821455836441
		},
		{
			temperatureMin: 63.995144889990826,
			temperatureMax: 83.5348989608633,
			temperatureError: 6.273667942853528,
			windSpeed: 6.9242349784417465,
			humidity: .7153894370808261,
			cloudCover: .5155107987698226,
			precipProbability: .043064207511174374
		},
		{
			temperatureMin: 63.91258297985262,
			temperatureMax: 83.40854215758132,
			temperatureError: 6.296962218801833,
			windSpeed: 6.918513572588343,
			humidity: .7160743770796167,
			cloudCover: .5164219346238165,
			precipProbability: .047402870131880326
		},
		{
			temperatureMin: 63.823909196791725,
			temperatureMax: 83.27480369965066,
			temperatureError: 6.321356325507732,
			windSpeed: 6.913334044918979,
			humidity: .716748579564321,
			cloudCover: .514908692387203,
			precipProbability: .056711416974391186
		},
		{
			temperatureMin: 63.729149816763794,
			temperatureMax: 83.13372321666249,
			temperatureError: 6.346811887239816,
			windSpeed: 6.908694406090864,
			humidity: .717411844754185,
			cloudCover: .5128797349594948,
			precipProbability: .06544566611674771
		},
		{
			temperatureMin: 63.628332919018035,
			temperatureMax: 82.98534251380836,
			temperatureError: 6.3732889621114035,
			windSpeed: 6.9045923519298285,
			humidity: .7180639761094286,
			cloudCover: .5125333763616372,
			precipProbability: .06836583211840318
		},
		{
			temperatureMin: 63.52148837777692,
			temperatureMax: 82.82970555949309,
			temperatureError: 6.40074614030343,
			windSpeed: 6.901025268473927,
			humidity: .7187047803894507,
			cloudCover: .5147304399063873,
			precipProbability: .06399726341195786
		},
		{
			temperatureMin: 63.40864785338422,
			temperatureMax: 82.66685847230525,
			temperatureError: 6.4291406458292455,
			windSpeed: 6.897990237286382,
			humidity: .7193340677101112,
			cloudCover: .5181141476761715,
			precipProbability: .06069986093924929
		},
		{
			temperatureMin: 63.289844782922316,
			temperatureMax: 82.49684950735129,
			temperatureError: 6.458428441572596,
			windSpeed: 6.895484041032025,
			humidity: .7199516516000015,
			cloudCover: .5195940178094252,
			precipProbability: .06261690549242115
		},
		{
			temperatureMin: 63.165114370305076,
			temperatureMax: 82.31972904195639,
			temperatureError: 6.488564337321356,
			windSpeed: 6.893503169310081,
			humidity: .7205573490556829,
			cloudCover: .5160151914747089,
			precipProbability: .061080206434286265
		},
		{
			temperatureMin: 63.03449357584559,
			temperatureMax: 82.1355495607373,
			temperatureError: 6.519502100511704,
			windSpeed: 6.89204382473469,
			humidity: .7211509805959296,
			cloudCover: .5061124130534571,
			precipProbability: .05426025933043605
		},
		{
			temperatureMin: 62.89802110530495,
			temperatureMax: 81.94436564004909,
			temperatureError: 6.551194569390393,
			windSpeed: 6.891101929256791,
			humidity: .7217323703149024,
			cloudCover: .4916231374892855,
			precipProbability: .052960757840273286
		},
		{
			temperatureMin: 62.755737398420635,
			temperatureMax: 81.74623393181344,
			temperatureError: 6.583593768296358,
			windSpeed: 6.8906731307182065,
			humidity: .7223013459342784,
			cloudCover: .47685195536060293,
			precipProbability: .05930973297858657
		},
		{
			temperatureMin: 62.60768461692586,
			temperatureMax: 81.54121314673175,
			temperatureError: 6.616651024757426,
			windSpeed: 6.890752809630094,
			humidity: .7228577388543121,
			cloudCover: .46681728302648556,
			precipProbability: .06398110624333889
		},
		{
			temperatureMin: 62.453906632054945,
			temperatureMax: 81.32936403688714,
			temperatureError: 6.650317088092993,
			windSpeed: 6.891336086167898,
			humidity: .7234013842037633,
			cloudCover: .4649048663974014,
			precipProbability: .06202057536707147
		},
		{
			temperatureMin: 62.29444901154418,
			temperatureMax: 81.11074937774322,
			temperatureError: 6.684542249209861,
			windSpeed: 6.892417827372391,
			humidity: .7239321208887847,
			cloudCover: .4712527088022142,
			precipProbability: .05384701613691584
		},
		{
			temperatureMin: 62.12935900612783,
			temperatureMax: 80.88543394954159,
			temperatureError: 6.719276461275245,
			windSpeed: 6.893992654549687,
			humidity: .7244497916406433,
			cloudCover: .4827225915896527,
			precipProbability: .04291269026634165
		},
		{
			temperatureMin: 61.958685535536695,
			temperatureMax: 80.65348451810553,
			temperatureError: 6.754469460948531,
			windSpeed: 6.896054950859885,
			humidity: .7249542430623258,
			cloudCover: .49447255825596304,
			precipProbability: .03813009467514038
		},
		{
			temperatureMin: 61.78247917400443,
			temperatureMax: 80.41496981505873,
			temperatureError: 6.790070889852385,
			windSpeed: 6.898598869085664,
			humidity: .7254453256739785,
			cloudCover: .5022952341656332,
			precipProbability: .04201973602795601
		},
		{
			temperatureMin: 61.600792135278,
			temperatureMax: 80.16996051745414,
			temperatureError: 6.826030415962883,
			windSpeed: 6.901618339570391,
			humidity: .7259228939572306,
			cloudCover: .5044965007238654,
			precipProbability: .044717192377034524
		},
		{
			temperatureMin: 61.41367825714882,
			temperatureMax: 79.9185292268352,
			temperatureError: 6.862297854598883,
			windSpeed: 6.905107078317116,
			humidity: .7263868063983017,
			cloudCover: .5023685240159478,
			precipProbability: .04357521653005014
		},
		{
			temperatureMin: 61.22119298549668,
			temperatureMax: 79.66075044771871,
			temperatureError: 6.898823288691937,
			windSpeed: 6.9090585952384584,
			humidity: .7268369255299124,
			cloudCover: .499097032684946,
			precipProbability: .048016966355439304
		},
		{
			temperatureMin: 61.02339335786211,
			temperatureMax: 79.39670056552178,
			temperatureError: 6.935557188020035,
			windSpeed: 6.913466202545977,
			humidity: .7272731179720525,
			cloudCover: .49779179654074523,
			precipProbability: .05795329191453938
		},
		{
			temperatureMin: 60.82033798654344,
			temperatureMax: 79.12645782392157,
			temperatureError: 6.972450527091426,
			windSpeed: 6.918323023270709,
			humidity: .7276952544714906,
			cloudCover: .49976982452331714,
			precipProbability: .06287982317682857
		},
		{
			temperatureMin: 60.61208704122969,
			temperatureMax: 78.85010230167514,
			temperatureError: 7.009454901368383,
			windSpeed: 6.9236219999036415,
			humidity: .7281032099400718,
			cloudCover: .5040183555329104,
			precipProbability: .06045383429925765
		},
		{
			temperatureMin: 60.39870223117013,
			temperatureMax: 78.56771588888896,
			temperatureError: 7.046522641525299,
			windSpeed: 6.92935590314585,
			humidity: .7284968634917819,
			cloudCover: .5080509768671918,
			precipProbability: .05569490752380552
		},
		{
			temperatureMin: 60.18024678688921,
			temperatureMax: 78.2793822627505,
			temperatureError: 7.083606925440763,
			windSpeed: 6.935517340757691,
			humidity: .7288760984785824,
			cloudCover: .5095634639187029,
			precipProbability: .052869972423944867
		},
		{
			temperatureMin: 59.95678544145024,
			temperatureMax: 77.985186862736,
			temperatureError: 7.1206618876297405,
			windSpeed: 6.942098766497036,
			humidity: .7292408025249563,
			cloudCover: .5078593214775023,
			precipProbability: .05666977354479593
		},
		{
			temperatureMin: 59.728384411271726,
			temperatureMax: 77.6852168652922,
			temperatureError: 7.15764272582831,
			windSpeed: 6.949092489135039,
			humidity: .7295908675612267,
			cloudCover: .5041914789686791,
			precipProbability: .06525680466147385
		},
		{
			temperatureMin: 59.49511137650882,
			temperatureMax: 77.37956115800301,
			temperatureError: 7.194505804451623,
			windSpeed: 6.956490681539627,
			humidity: .7299261898555663,
			cloudCover: .5008420729690877,
			precipProbability: .06769827528771266
		},
		{
			temperatureMin: 59.257035460995894,
			temperatureMax: 77.06831031325086,
			temperatureError: 7.231208754653952,
			windSpeed: 6.964285389815214,
			humidity: .7302466700447479,
			cloudCover: .49953451856143066,
			precipProbability: .06251743078321995
		},
		{
			temperatureMin: 59.014227211764926,
			temperatureMax: 76.75155656137886,
			temperatureError: 7.2677105707288225,
			windSpeed: 6.972468542488492,
			humidity: .7305522131635738,
			cloudCover: .500185025362529,
			precipProbability: .06055977832393215
		},
		{
			temperatureMin: 58.76675857814017,
			temperatureMax: 76.42939376335927,
			temperatureError: 7.303971702597021,
			windSpeed: 6.981031959728892,
			humidity: .7308427286730219,
			cloudCover: .5008090096189441,
			precipProbability: .06266083238006344
		},
		{
			temperatureMin: 58.5147028904192,
			temperatureMax: 76.10191738298226,
			temperatureError: 7.339954144141086,
			windSpeed: 6.989967362593216,
			humidity: .7311181304870759,
			cloudCover: .4987096730534384,
			precipProbability: .059679719563861304
		},
		{
			temperatureMin: 58.25813483814114,
			temperatureMax: 75.76922445856732,
			temperatureError: 7.375621517155579,
			windSpeed: 6.999266382283621,
			humidity: .7313783369982354,
			cloudCover: .4922917308176345,
			precipProbability: .05236447814944881
		},
		{
			temperatureMin: 57.99713044795842,
			temperatureMax: 75.43141357420747,
			temperatureError: 7.410939150694574,
			windSpeed: 7.008920569407979,
			humidity: .7316232711016976,
			cloudCover: .48242486705451587,
			precipProbability: .04841110127483327
		},
		{
			temperatureMin: 57.73176706110314,
			temperatureMax: 75.08858483055779,
			temperatureError: 7.445874155610042,
			windSpeed: 7.018921403232142,
			humidity: .7318528602181997,
			cloudCover: .47248495793962547,
			precipProbability: .050295961683538754
		},
		{
			temperatureMin: 57.46212331047538,
			temperatureMax: 74.74083981517533,
			temperatureError: 7.480395494087642,
			windSpeed: 7.029260300912966,
			humidity: .7320670363155304,
			cloudCover: .4669255280493074,
			precipProbability: .05769202900116222
		},
		{
			temperatureMin: 57.1882790973364,
			temperatureMax: 74.38828157241173,
			temperatureError: 7.5144740439998285,
			windSpeed: 7.039928626701649,
			humidity: .732265735928688,
			cloudCover: .4690728373713898,
			precipProbability: .06636953794461004
		},
		{
			temperatureMin: 56.91031556763785,
			temperatureMax: 74.03101457288402,
			temperatureError: 7.5480826579103315,
			windSpeed: 7.050917701106652,
			humidity: .7324489001786944,
			cloudCover: .47931568838246613,
			precipProbability: .0675036680489572
		},
		{
			temperatureMin: 56.6283150879719,
			temperatureMax: 73.66914468251422,
			temperatureError: 7.581196216578008,
			windSpeed: 7.062218810006146,
			humidity: .7326164747900211,
			cloudCover: .49469413145646923,
			precipProbability: .06268619346313536
		},
		{
			temperatureMin: 56.34236122116658,
			temperatureMax: 73.30277913116038,
			temperatureError: 7.613791676823109,
			windSpeed: 7.073823213698266,
			humidity: .7327684101067083,
			cloudCover: .5101596747892198,
			precipProbability: .06377703211482184
		},
		{
			temperatureMin: 56.05253870152464,
			temperatureMax: 72.93202648084295,
			temperatureError: 7.645848113633929,
			windSpeed: 7.085722155880902,
			humidity: .7329046611070296,
			cloudCover: .5208831796379024,
			precipProbability: .07053180622682194
		},
		{
			temperatureMin: 55.75893340971302,
			temperatureMax: 72.5569965935732,
			temperatureError: 7.677346756407406,
			windSpeed: 7.097906872548286,
			humidity: .7330251874168767,
			cloudCover: .5244217017084777,
			precipProbability: .07237635172156924
		},
		{
			temperatureMin: 55.46163234731636,
			temperatureMax: 72.17780059880033,
			temperatureError: 7.7082710192327015,
			windSpeed: 7.110368600796279,
			humidity: .7331299533217086,
			cloudCover: .5216359436772878,
			precipProbability: .06988737560509252
		},
		{
			temperatureMin: 55.1607236110557,
			temperatureMax: 71.79455086048188,
			temperatureError: 7.7386065251429095,
			windSpeed: 7.123098587525785,
			humidity: .7332189277771178,
			cloudCover: .5159302364215498,
			precipProbability: .07058732403641903
		},
		{
			temperatureMin: 54.85629636668377,
			temperatureMax: 71.40736094378622,
			temperatureError: 7.768341124276289,
			windSpeed: 7.136088098033763,
			humidity: .7332920844180569,
			cloudCover: .5112881025738742,
			precipProbability: .0743421141251193
		},
		{
			temperatureMin: 54.54844082256334,
			temperatureMax: 71.01634558144168,
			temperatureError: 7.797464905904323,
			windSpeed: 7.149328424483259,
			humidity: .7333494015666338,
			cloudCover: .5101997032945619,
			precipProbability: .07788386359401214
		},
		{
			temperatureMin: 54.237248202935625,
			temperatureMax: 70.62162063973919,
			temperatureError: 7.825970204300725,
			windSpeed: 7.162810894242156,
			humidity: .7333908622385437,
			cloudCover: .5125845860258621,
			precipProbability: .07837214519760324
		},
		{
			temperatureMin: 53.92281072089048,
			temperatureMax: 70.22330308419828,
			temperatureError: 7.853851598441931,
			windSpeed: 7.176526878082267,
			humidity: .7334164541480849,
			cloudCover: .5162146356600243,
			precipProbability: .0719494792102972
		},
		{
			temperatureMin: 53.60522155103994,
			temperatureMax: 69.8215109449061,
			temperatureError: 7.881105905545721,
			windSpeed: 7.1904677982280285,
			humidity: .7334261697118333,
			cloudCover: .5182872351302125,
			precipProbability: .06344951358159055
		},
		{
			temperatureMin: 53.28457480190844,
			temperatureMax: 69.41636328154539,
			temperatureError: 7.9077321684716795,
			windSpeed: 7.20462513624816,
			humidity: .7334200060508543,
			cloudCover: .517173990610953,
			precipProbability: .06398450730731835
		},
		{
			temperatureMin: 52.96096548804911,
			temperatureMax: 69.00798014811319,
			temperatureError: 7.933731637023267,
			windSpeed: 7.218990440779625,
			humidity: .733397964991573,
			cloudCover: .5133226940841266,
			precipProbability: .07069999773223323
		},
		{
			temperatureMin: 52.6344895018846,
			temperatureMax: 68.59648255734446,
			temperatureError: 7.959107743207492,
			windSpeed: 7.233555335076314,
			humidity: .7333600530652346,
			cloudCover: .5088312276820022,
			precipProbability: .07142963929332224
		},
		{
			temperatureMin: 52.305243585296395,
			temperatureMax: 68.18199244485699,
			temperatureError: 7.9838660705247575,
			windSpeed: 7.248311524374674,
			humidity: .7333062815059509,
			cloudCover: .5060162996424924,
			precipProbability: .06740300043362883
		},
		{
			temperatureMin: 51.973325300954144,
			temperatureMax: 67.76463263301594,
			temperatureError: 8.008014317376986,
			windSpeed: 7.26325080306675,
			humidity: .7332366662474065,
			cloudCover: .5058948964386082,
			precipProbability: .06730501876264705
		},
		{
			temperatureMin: 51.63883300340978,
			temperatureMax: 67.34452679454155,
			temperatureError: 8.03156225469797,
			windSpeed: 7.27836506167515,
			humidity: .7331512279181004,
			cloudCover: .5075363384046985,
			precipProbability: .07023707526918144
		},
		{
			temperatureMin: 51.301865809950414,
			temperatureMax: 66.92179941586011,
			temperatureError: 8.054521677925587,
			windSpeed: 7.293646293620568,
			humidity: .7330499918352489,
			cloudCover: .5087076807888883,
			precipProbability: .07186225879932837
		},
		{
			temperatureMin: 50.96252357122656,
			temperatureMax: 66.49657576021676,
			temperatureError: 8.076906353450369,
			windSpeed: 7.309086601775301,
			humidity: .7329329879972954,
			cloudCover: .5074411615170943,
			precipProbability: .07123004117494304
		},
		{
			temperatureMin: 50.62090684166819,
			temperatureMax: 66.06898183055851,
			temperatureError: 8.09873195968955,
			windSpeed: 7.324678204796622,
			humidity: .7328002510749987,
			cloudCover: .5035686115384591,
			precipProbability: .06740891208878978
		},
		{
			temperatureMin: 50.27711684968438,
			temperatureMax: 65.63914433219414,
			temperatureError: 8.120016022950699,
			windSpeed: 7.340413443232098,
			humidity: .7326518204011735,
			cloudCover: .4992440429914177,
			precipProbability: .0645343793975761
		},
		{
			temperatureMin: 49.93125546766935,
			temperatureMax: 65.20719063525206,
			temperatureError: 8.140777848262275,
			windSpeed: 7.356284785391554,
			humidity: .7324877399590352,
			cloudCover: .4980381937297384,
			precipProbability: .06963803721442606
		},
		{
			temperatureMin: 49.583425181815514,
			temperatureMax: 64.77324873693352,
			temperatureError: 8.16103844536219,
			windSpeed: 7.372284832979241,
			humidity: .7323080583691571,
			cloudCover: .5030216347988689,
			precipProbability: .07670843683989843
		},
		{
			temperatureMin: 49.233729061742565,
			temperatureMax: 64.33744722358999,
			temperatureError: 8.180820450048536,
			windSpeed: 7.388406326480421,
			humidity: .7321128288750747,
			cloudCover: .5148768132964117,
			precipProbability: .07394735011567778
		},
		{
			temperatureMin: 48.88227072995856,
			temperatureMax: 63.899915232614084,
			temperatureError: 8.200148041108848,
			windSpeed: 7.404642150297466,
			humidity: .7319021093274958,
			cloudCover: .5311260361285607,
			precipProbability: .0656746505097076
		},
		{
			temperatureMin: 48.52915433115217,
			temperatureMax: 63.46078241417741,
			temperatureError: 8.219046853056035,
			windSpeed: 7.420985337629657,
			humidity: .7316759621671741,
			cloudCover: .5469884250783261,
			precipProbability: .0632657934376735
		},
		{
			temperatureMin: 48.17448450133315,
			temperatureMax: 63.02017889281163,
			temperatureError: 8.237543884910515,
			windSpeed: 7.4374290750928855,
			humidity: .7314344544063883,
			cloudCover: .5574948498760864,
			precipProbability: .06565866664551966
		},
		{
			temperatureMin: 47.818366336825974,
			temperatureMax: 62.578235228849664,
			temperatureError: 8.255667405278574,
			windSpeed: 7.453966707073708,
			humidity: .7311776576091077,
			cloudCover: .5597878264535173,
			precipProbability: .06731620525987767
		},
		{
			temperatureMin: 47.460905363128916,
			temperatureMax: 62.13508237973602,
			temperatureError: 8.273446853986652,
			windSpeed: 7.470591739815212,
			humidity: .7309056478697592,
			cloudCover: .5544095388750881,
			precipProbability: .06812735996031506
		},
		{
			temperatureMin: 47.102207503644024,
			temperatureMax: 61.690851661224414,
			temperatureError: 8.290912740540927,
			windSpeed: 7.487297845229232,
			humidity: .730618505790703,
			cloudCover: .5449109720735985,
			precipProbability: .06829794083730885
		},
		{
			temperatureMin: 46.74237904828659,
			temperatureMax: 61.245674708464385,
			temperatureError: 8.30809653968954,
			windSpeed: 7.504078864433033,
			humidity: .7303163164583343,
			cloudCover: .5360089977296922,
			precipProbability: .06996524986157779
		},
		{
			temperatureMin: 46.381526621994894,
			temperatureMax: 60.799683436994634,
			temperatureError: 8.325030584372813,
			windSpeed: 7.520928811006702,
			humidity: .729999169417868,
			cloudCover: .5312831958254725,
			precipProbability: .07680427250282636
		},
		{
			temperatureMin: 46.0197571531303,
			temperatureMax: 60.35301000365303,
			temperatureError: 8.341747956353922,
			windSpeed: 7.537841873968272,
			humidity: .7296671586468273,
			cloudCover: .5316205604373061,
			precipProbability: .0824114750796717
		},
		{
			temperatureMin: 45.65717784179396,
			temperatureMax: 59.90578676741937,
			temperatureError: 8.358282374828258,
			windSpeed: 7.5548124204657015,
			humidity: .7293203825271605,
			cloudCover: .5351725182715464,
			precipProbability: .07799329219081252
		},
		{
			temperatureMin: 45.29389612806164,
			temperatureMax: 59.45814625018986,
			temperatureError: 8.37466808331552,
			windSpeed: 7.571834998181735,
			humidity: .7289589438161156,
			cloudCover: .5387419045441335,
			precipProbability: .07112683662705162
		},
		{
			temperatureMin: 44.9300196601446,
			temperatureMax: 59.01022109751068,
			temperatureError: 8.39093973514288,
			windSpeed: 7.5889043374515595,
			humidity: .7285829496157906,
			cloudCover: .5397455952626294,
			precipProbability: .07350408042120758
		},
		{
			temperatureMin: 44.56565626249329,
			temperatureMax: 58.56214403927147,
			temperatureError: 8.407132277831655,
			windSpeed: 7.606015353091974,
			humidity: .7281925113413775,
			cloudCover: .5376290008495795,
			precipProbability: .08086338339480424
		},
		{
			temperatureMin: 44.20091390384679,
			temperatureMax: 58.114047850374256,
			temperatureError: 8.423280836702348,
			windSpeed: 7.623163145940155,
			humidity: .7277877446881592,
			cloudCover: .5339785307490349,
			precipProbability: .084377583088953
		},
		{
			temperatureMin: 43.835900665237084,
			temperatureMax: 57.66606531139217,
			temperatureError: 8.439420598015468,
			windSpeed: 7.640343004102381,
			humidity: .7273687695972363,
			cloudCover: .5313602940912854,
			precipProbability: .08399295013909545
		},
		{
			temperatureMin: 43.470724707964386,
			temperatureMax: 57.21832916921807,
			temperatureError: 8.455586691966632,
			windSpeed: 7.657550403912832,
			humidity: .7269357102199661,
			cloudCover: .5316505683513059,
			precipProbability: .08147273766707265
		},
		{
			temperatureMin: 43.104180578929245,
			temperatureMax: 56.77097209773489,
			temperatureError: 8.471814075854608,
			windSpeed: 7.674781010601557,
			humidity: .7264886948811925,
			cloudCover: .5348926795534842,
			precipProbability: .0786923741837003
		},
		{
			temperatureMin: 42.731319749978056,
			temperatureMax: 56.32412665849703,
			temperatureError: 8.488137417740845,
			windSpeed: 7.692030678673554,
			humidity: .7260278560412062,
			cloudCover: .5393687161143961,
			precipProbability: .0788942851257926
		},
		{
			temperatureMin: 42.35864502680595,
			temperatureMax: 55.87792526145264,
			temperatureError: 8.504590980917536,
			windSpeed: 7.709295451998957,
			humidity: .7255533302565006,
			cloudCover: .5428240160298914,
			precipProbability: .07813901987245991
		},
		{
			temperatureMin: 41.98626684097619,
			temperatureMax: 55.432500125704465,
			temperatureError: 8.521208509498985,
			windSpeed: 7.726571563615905,
			humidity: .725065258139311,
			cloudCover: .5440726785518861,
			precipProbability: .07142933144512045
		},
		{
			temperatureMin: 41.61429553618174,
			temperatureMax: 54.987983240333705,
			temperatureError: 8.538023115448327,
			windSpeed: 7.743855435248182,
			humidity: .7245637843159353,
			cloudCover: .5439637790473342,
			precipProbability: .06764408864642739
		},
		{
			temperatureMin: 41.24284133554815,
			temperatureMax: 54.54450632528765,
			temperatureError: 8.555067167347508,
			windSpeed: 7.761143676539113,
			humidity: .7240490573838848,
			cloudCover: .545051898338338,
			precipProbability: .07592976493717342
		},
		{
			temperatureMin: 40.87201430897155,
			temperatureMax: 54.10220079234603,
			temperatureError: 8.572372181214005,
			windSpeed: 7.7784330840040665,
			humidity: .7235212298678668,
			cloudCover: .5500853526577607,
			precipProbability: .08764055620291793
		},
		{
			temperatureMin: 40.50192434050336,
			temperatureMax: 53.661197706184645,
			temperatureError: 8.589968713662122,
			windSpeed: 7.795720639705221,
			humidity: .7229804581745639,
			cloudCover: .5601539974302315,
			precipProbability: .09183847833274979
		},
		{
			temperatureMin: 40.132681095787554,
			temperatureMax: 53.22162774553605,
			temperatureError: 8.607886257700494,
			windSpeed: 7.813003509650531,
			humidity: .7224269025462952,
			cloudCover: .5735953703043973,
			precipProbability: .09068677644318208
		},
		{
			temperatureMin: 39.764393989567196,
			temperatureMax: 52.78362116446484,
			temperatureError: 8.626153141450454,
			windSpeed: 7.830279041920805,
			humidity: .7218607270135445,
			cloudCover: .5863793349988121,
			precipProbability: .08904844259236211
		},
		{
			temperatureMin: 39.39717215326097,
			temperatureMax: 52.3473077537754,
			temperatureError: 8.644796430061868,
			windSpeed: 7.84754476452909,
			humidity: .7212820993463396,
			cloudCover: .5938781257170532,
			precipProbability: .08885681972789056
		},
		{
			temperatureMin: 39.03112440262271,
			temperatureMax: 51.9128168025472,
			temperatureError: 8.663841831094913,
			windSpeed: 7.864798383015642,
			humidity: .7206911910045446,
			cloudCover: .5931359845444454,
			precipProbability: .09205766171240211
		},
		{
			temperatureMin: 38.66635920550128,
			temperatureMax: 51.48027705982613,
			temperatureError: 8.683313603626331,
			windSpeed: 7.882037777783374,
			humidity: .7200881770870629,
			cloudCover: .584432753328091,
			precipProbability: .09504238560895563
		},
		{
			temperatureMin: 38.30298464969782,
			temperatureMax: 51.04981669647297,
			temperatureError: 8.703234471329594,
			windSpeed: 7.899261001179167,
			humidity: .7194732362799171,
			cloudCover: .5712802039989092,
			precipProbability: .09321435166101406
		},
		{
			temperatureMin: 37.9411084109336,
			temperatureMax: 50.62156326718339,
			temperatureError: 8.723625539767077,
			windSpeed: 7.916466274324027,
			humidity: .7188465508033518,
			cloudCover: .5588173917675071,
			precipProbability: .09330555804739465
		},
		{
			temperatureMin: 37.58083772094988,
			temperatureMax: 50.19564367269044,
			temperatureError: 8.744506218121236,
			windSpeed: 7.933651983700426,
			humidity: .718208306357798,
			cloudCover: .551427356516247,
			precipProbability: .10075377385163505
		},
		{
			temperatureMin: 37.222279335727265,
			temperatureMax: 49.77218412216291,
			temperatureError: 8.765894145580193,
			windSpeed: 7.95081667750014,
			humidity: .7175586920688529,
			cloudCover: .5508087243767222,
			precipProbability: .10488764551606918
		},
		{
			temperatureMin: 36.865539503852126,
			temperatureMax: 49.35131009580496,
			temperatureError: 8.787805122580584,
			windSpeed: 7.967959061739228,
			humidity: .7168979004312511,
			cloudCover: .5554759843366219,
			precipProbability: .0969950102846885
		},
		{
			temperatureMin: 36.51072393503697,
			temperatureMax: 48.9331463076726,
			temperatureError: 8.810253047096948,
			windSpeed: 7.985077996147059,
			humidity: .7162261272518204,
			cloudCover: .5618791894969558,
			precipProbability: .0848737384034234
		},
		{
			temperatureMin: 36.15793776879266,
			temperatureMax: 48.517816668721906,
			temperatureError: 8.833249856154556,
			windSpeed: 8.00217248983533,
			humidity: .7155435715914479,
			cloudCover: .5664651242975766,
			precipProbability: .07744046573770877
		},
		{
			temperatureMin: 35.80728554327322,
			temperatureMax: 48.10544425008823,
			temperatureError: 8.85680547272754,
			windSpeed: 8.019241696753612,
			humidity: .7148504357061133,
			cloudCover: .5675278677400095,
			precipProbability: .07575901494617153
		},
		{
			temperatureMin: 35.458871164301335,
			temperatureMax: 47.69615124661787,
			temperatureError: 8.880927758170333,
			windSpeed: 8.036284910939765,
			humidity: .7141469249869271,
			cloudCover: .5658703901418788,
			precipProbability: .07907426271413291
		},
		{
			temperatureMin: 35.1127978745754,
			temperatureMax: 47.290058940663236,
			temperatureError: 8.905622470315647,
			windSpeed: 8.053301561570331,
			humidity: .7134332478993102,
			cloudCover: .564006809123652,
			precipProbability: .08308456046246454
		},
		{
			temperatureMin: 34.76916822308174,
			temperatureMax: 46.88728766613649,
			temperatureError: 8.93089322735666,
			windSpeed: 8.070291207821416,
			humidity: .7127096159211801,
			cloudCover: .5644656594877375,
			precipProbability: .08319472859302605
		},
		{
			temperatureMin: 34.42808403470232,
			temperatureMax: 46.487956772860265,
			temperatureError: 8.956741477616141,
			windSpeed: 8.087253533545052,
			humidity: .7119762434803111,
			cloudCover: .5682353408847113,
			precipProbability: .08464596920178952
		},
		{
			temperatureMin: 34.089646380042545,
			temperatureMax: 46.092184591196066,
			temperatureError: 8.983166475289027,
			windSpeed: 8.10418834177109,
			humidity: .7112333478907819,
			cloudCover: .5742592816980406,
			precipProbability: .09138098399339607
		},
		{
			temperatureMin: 33.75395554548248,
			temperatureMax: 45.700088396982494,
			temperatureError: 9.01016526222922,
			windSpeed: 8.121095549041609,
			humidity: .7104811492885901,
			cloudCover: .5802320553013659,
			precipProbability: .09362998588401246
		},
		{
			temperatureMin: 33.421111003463906,
			temperatureMax: 45.31178437678477,
			temperatureError: 9.037732655835278,
			windSpeed: 8.137975179587235,
			humidity: .7097198705664125,
			cloudCover: .5841599860596981,
			precipProbability: .0860925573787088
		},
		{
			temperatureMin: 33.091211383006524,
			temperatureMax: 44.92738759346346,
			temperatureError: 9.065861243072968,
			windSpeed: 8.154827359353218,
			humidity: .7089497373075752,
			cloudCover: .5856934734289566,
			precipProbability: .07985893564276067
		},
		{
			temperatureMin: 32.7643544404875,
			temperatureMax: 44.54701195208151,
			temperatureError: 9.09454138065677,
			windSpeed: 8.171652309885182,
			humidity: .7081709777191706,
			cloudCover: .5863797929584805,
			precipProbability: .08299970883436401
		},
		{
			temperatureMin: 32.44063703067288,
			temperatureMax: 44.17077016615221,
			temperatureError: 9.123761201395459,
			windSpeed: 8.188450342081811,
			humidity: .7073838225644749,
			cloudCover: .5886408409641536,
			precipProbability: .09111754901310255
		},
		{
			temperatureMin: 32.12015507801813,
			temperatureMax: 43.79877372423479,
			temperatureError: 9.153506626690655,
			windSpeed: 8.20522184982587,
			humidity: .7065885050945556,
			cloudCover: .5940649291888551,
			precipProbability: .09869009508540849
		},
		{
			temperatureMin: 31.803003548242476,
			temperatureMax: 43.43113285690332,
			temperatureError: 9.18376138516072,
			windSpeed: 8.221967303500605,
			humidity: .7057852609791393,
			cloudCover: .6020513981772714,
			precipProbability: .10138326950010292
		},
		{
			temperatureMin: 31.48927642018924,
			temperatureMax: 43.067956504082275,
			temperatureError: 9.21450703734584,
			windSpeed: 8.238687243403433,
			humidity: .7049743282367898,
			cloudCover: .6096881792948973,
			precipProbability: .09684834155644334
		},
		{
			temperatureMin: 31.179066657976126,
			temperatureMax: 42.70935228276288,
			temperatureError: 9.245723006434057,
			windSpeed: 8.255382273063836,
			humidity: .7041559471643821,
			cloudCover: .6130534246563559,
			precipProbability: .09161074773318693
		},
		{
			temperatureMin: 30.872466183450523,
			temperatureMax: 42.355426455114845,
			temperatureError: 9.277386614931793,
			windSpeed: 8.272053052477576,
			humidity: .7033303602658886,
			cloudCover: .60930121879377,
			precipProbability: .09081542523825537
		},
		{
			temperatureMin: 30.569565848951143,
			temperatureMax: 42.00628389699854,
			temperatureError: 9.309473127186337,
			windSpeed: 8.288700291265254,
			humidity: .7024978121805326,
			cloudCover: .5983966768503893,
			precipProbability: .08722326260257092
		},
		{
			temperatureMin: 30.270455410383654,
			temperatureMax: 41.662028066890535,
			temperatureError: 9.341955797652513,
			windSpeed: 8.30532474176686,
			humidity: .7016585496102629,
			cloudCover: .5835019788781233,
			precipProbability: .07825440403100993
		},
		{
			temperatureMin: 29.9752235006263,
			temperatureMax: 41.32276097522174,
			temperatureError: 9.374805924779665,
			windSpeed: 8.321927192079674,
			humidity: .7008128212467083,
			cloudCover: .5697212916128361,
			precipProbability: .07552736762849473
		},
		{
			temperatureMin: 29.683957603266304,
			temperatureMax: 40.98858315415393,
			temperatureError: 9.407992910380882,
			windSpeed: 8.338508459053033,
			humidity: .6999608776974333,
			cloudCover: .5618029847403124,
			precipProbability: .08383787595542219
		},
		{
			temperatureMin: 29.39674402667269,
			temperatureMax: 40.65959362778787,
			temperatureError: 9.441484324330927,
			windSpeed: 8.355069381247192,
			humidity: .699102971411688,
			cloudCover: .5619763043695162,
			precipProbability: .09368268491594672
		},
		{
			temperatureMin: 29.113667878429496,
			temperatureMax: 40.3358898828197,
			temperatureError: 9.475245974425462,
			windSpeed: 8.371610811867201,
			humidity: .6982393566056301,
			cloudCover: .5690408121164053,
			precipProbability: .09797952703795454
		},
		{
			temperatureMin: 28.834813040108365,
			temperatureMax: 40.017567839655605,
			temperatureError: 9.509241981220354,
			windSpeed: 8.388133611683248,
			humidity: .6973702891869594,
			cloudCover: .5791591510830882,
			precipProbability: .09618815166474186
		},
		{
			temperatureMin: 28.560262142414345,
			temperatureMax: 39.70472182398672,
			temperatureError: 9.543434857656104,
			windSpeed: 8.4046386419457,
			humidity: .6964960266791088,
			cloudCover: .5878953620748142,
			precipProbability: .09023010077497323
		},
		{
			temperatureMin: 28.29009654070468,
			temperatureMax: 39.397444538840084,
			temperatureError: 9.577785593259998,
			windSpeed: 8.42112675730637,
			humidity: .6956168281449305,
			cloudCover: .5923932735144203,
			precipProbability: .0873426695427902
		},
		{
			temperatureMin: 28.024396290878606,
			temperatureMax: 39.09582703710559,
			temperatureError: 9.612253742706217,
			windSpeed: 8.437598798755943,
			humidity: .6947329541099242,
			cloudCover: .5925552644482517,
			precipProbability: .09145348372687429
		},
		{
			temperatureMin: 27.763240125653823,
			temperatureMax: 38.79995869455867,
			temperatureError: 9.646797518502117,
			windSpeed: 8.45405558658736,
			humidity: .6938446664850377,
			cloudCover: .5906686498251094,
			precipProbability: .0944926693928362
		},
		{
			temperatureMin: 27.50670543123795,
			temperatureMax: 38.50992718337557,
			temperatureError: 9.681373887558207,
			windSpeed: 8.470497913395429,
			humidity: .6929522284890633,
			cloudCover: .5897964417837019,
			precipProbability: .09291435279156979
		},
		{
			temperatureMin: 27.254868224398486,
			temperatureMax: 38.2258184461515,
			temperatureError: 9.715938671388711,
			windSpeed: 8.486926537122747,
			humidity: .6920559045706544,
			cloudCover: .5919105416700025,
			precipProbability: .09613165614964529
		},
		{
			temperatureMin: 27.00780312993286,
			temperatureMax: 37.947716670437494,
			temperatureError: 9.750446649679821,
			windSpeed: 8.503342174163128,
			humidity: .6911559603299141,
			cloudCover: .5968340864384387,
			precipProbability: .10572631271673451
		},
		{
			temperatureMin: 26.76558335856206,
			temperatureMax: 37.675704263791296,
			temperatureError: 9.784851666953719,
			windSpeed: 8.519745492529465,
			humidity: .6902526624397525,
			cloudCover: .6025419091006258,
			precipProbability: .11034455436464237
		},
		{
			temperatureMin: 26.52828068523285,
			temperatureMax: 37.4098618293587,
			temperatureError: 9.81910674204804,
			windSpeed: 8.536137105099298,
			humidity: .6893462785668372,
			cloudCover: .6065552705106448,
			precipProbability: .10565247932776776
		},
		{
			temperatureMin: 26.295965427846884,
			temperatureMax: 37.15026814199204,
			temperatureError: 9.85316418012299,
			windSpeed: 8.552517562946536,
			humidity: .6884370772922513,
			cloudCover: .6075336105757606,
			precipProbability: .09727725895867924
		},
		{
			temperatureMin: 26.068706426429088,
			temperatureMax: 36.897000124902675,
			temperatureError: 9.886975686901303,
			windSpeed: 8.56888734876723,
			humidity: .6875253280319686,
			cloudCover: .6060758270561161,
			precipProbability: .09060054275642888
		},
		{
			temperatureMin: 25.846571022727733,
			temperatureMax: 36.65013282686926,
			temperatureError: 9.920492484840324,
			windSpeed: 8.585246870412393,
			humidity: .6866113009569735,
			cloudCover: .6042414198708084,
			precipProbability: .0908524237140012
		},
		{
			temperatureMin: 25.629625040254428,
			temperatureMax: 36.40973940000114,
			temperatureError: 9.953665430930156,
			windSpeed: 8.601596454534635,
			humidity: .685695266913206,
			cloudCover: .6040900105362371,
			precipProbability: .09840285148026785
		},
		{
			temperatureMin: 25.41793276478823,
			temperatureMax: 36.1758910780581,
			temperatureError: 9.986445135807344,
			windSpeed: 8.617936340358513,
			humidity: .6847774973413233,
			cloudCover: .6061496508313466,
			precipProbability: .10362195315700322
		},
		{
			temperatureMin: 25.211556925318305,
			temperatureMax: 35.948657155345,
			temperatureError: 10.018782083870322,
			windSpeed: 8.63426667358407,
			humidity: .6838582641962648,
			cloudCover: .6087955035043741,
			precipProbability: .10270043487519713
		},
		{
			temperatureMin: 25.01055867545824,
			temperatureMax: 35.728104966177476,
			temperatureError: 10.05062675407929,
			windSpeed: 8.650587500432858,
			humidity: .6829378398666437,
			cloudCover: .6090008942616916,
			precipProbability: .10465626981662833
		},
		{
			temperatureMin: 24.814997575330036,
			temperatureMax: 35.514299864928944,
			temperatureError: 10.08192974112221,
			windSpeed: 8.666898761843836,
			humidity: .6820164970940521,
			cloudCover: .6041080686281125,
			precipProbability: .11065390576744294
		},
		{
			temperatureMin: 24.624931573906846,
			temperatureMax: 35.30730520666472,
			temperatureError: 10.112641876626876,
			windSpeed: 8.68320028782908,
			humidity: .6810945088922447,
			cloudCover: .5936291752135784,
			precipProbability: .11018888926863746
		},
		{
			temperatureMin: 24.44041699184674,
			temperatureMax: 35.10718232837004,
			temperatureError: 10.142714350098878,
			windSpeed: 8.699491791997291,
			humidity: .6801721484662209,
			cloudCover: .5800071816831236,
			precipProbability: .10217438882655644
		},
		{
			temperatureMin: 24.26150850480276,
			temperatureMax: 34.91399053077259,
			temperatureError: 10.172098829266252,
			windSpeed: 8.715772866252875,
			humidity: .6792496891312746,
			cloudCover: .5678051180688329,
			precipProbability: .09561007424380907
		},
		{
			temperatureMin: 24.088259127221153,
			temperatureMax: 34.727787060771156,
			temperatureError: 10.20074757951261,
			windSpeed: 8.732042975678853,
			humidity: .6783274042320242,
			cloudCover: .5616580527890891,
			precipProbability: .09470470066463839
		},
		{
			temperatureMin: 23.92072019663102,
			temperatureMax: 34.54862709447284,
			temperatureError: 10.228613582083208,
			windSpeed: 8.74830145361158,
			humidity: .6774055670613874,
			cloudCover: .5640301736707125,
			precipProbability: .09921030825789602
		},
		{
			temperatureMin: 23.758941358432924,
			temperatureMax: 34.37656372084198,
			temperatureError: 10.255650650751507,
			windSpeed: 8.764547496914464,
			humidity: .6764844507796092,
			cloudCover: .5739652192601196,
			precipProbability: .10567587044859994
		},
		{
			temperatureMin: 23.602970551188903,
			temperatureMax: 34.21164792596956,
			temperatureError: 10.281813546637533,
			windSpeed: 8.780780161457619,
			humidity: .6755643283333241,
			cloudCover: .5875100947562641,
			precipProbability: .10541089844071257
		},
		{
			temperatureMin: 23.452853992414795,
			temperatureMax: 34.05392857796522,
			temperatureError: 10.307058090874646,
			windSpeed: 8.796998357810965,
			humidity: .6746454723746781,
			cloudCover: .5996035199976968,
			precipProbability: .09757332675906709
		},
		{
			temperatureMin: 23.308636164887393,
			temperatureMax: 33.90345241247508,
			temperatureError: 10.33134127482637,
			windSpeed: 8.813200847157814,
			humidity: .6737281551805125,
			cloudCover: .6064430536169073,
			precipProbability: .09327225979686248
		}],
		monthly: {
			temperatureMin: {
				min: ["January", 22.087022114569223],
				max: ["July", 64.04197466845834]
			},
			temperatureMax: {
				min: ["January", 32.81752362016866],
				max: ["July", 84.13030118174744]
			},
			temperatureError: {
				min: ["July", 6.140871905935371],
				max: ["January", 10.504286437717745]
			},
			windSpeed: {
				min: ["August", 6.911499128072752],
				max: ["March", 9.647160089721057]
			},
			humidity: {
				min: ["March", .6276066083339461],
				max: ["September", .7322521509810982]
			},
			cloudCover: {
				min: ["August", .5018039963779445],
				max: ["April", .5956349019190301]
			},
			precipProbability: {
				min: ["July", .0547359850147825],
				max: ["February", .0996985606124524]
			}
		}
	};
	



var Timeline = function(e, t) {
    t.label_width = t.label_width || 100,
    t.hour_spacing = t.hour_spacing || null,
    t.first_hour_width = t.first_hour_width || 0;
    var n = t.width,
    r = {},
    i = e.find(".hours"),
    s = e.find(".night"),
    o,
    u = 0,
    a,
    f,
    l = function(e) {
        return e.cloudCover < .2 ? 0 : e.cloudCover < .8 ? 1 : 2
    },
    c = function(e) {
        var t = UIManager.si_units() ? .127 : .005;
        if (!e.precipIntensity || e.precipIntensity < t) return 0;
        var n = Forecaster.precip_intensity(e, !0);
        return n ? Math.round(1 + n) : 0
    },
    h = function(e) {
        var t = new Date(1e3 * e);
        t.setHours(t.getHours() + u);
        var n = t.getHours();
        return t.getMinutes() > 30 && (n++, n == 24 && (n = 0)),
        n
    },
    p = function(e) {
        var t = h(e);
        return t == 0 ? t = "12AM": t < 12 ? t += "AM": t == 12 ? t = "noon": (t -= 12, t += "PM"),
        t
    },
    d = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    },
    v = function(t) {
        var r = e.find(".hour_ticks");
        r.empty();
        var i = n / t.length,
        s = 0;
        for (var o = 0; o < t.length; o++) s > n && (s = n),
        $("<span />").addClass(o % 2 == 0 ? "even": "odd").css("left", s).appendTo(r),
        s += i;
        r.find("span").eq(0).addClass("first"),
        r.find("span").eq(1).addClass("second")
    },
    m = function(e) {
        i.empty();
        var t = new Date(1e3 * o),
        r,
        s;
        t.setHours(t.getHours(), 0, 0, 0);
        for (var u = 0; u < e.length; u++) {
            r = e[u].time,
            ENV.is_mobile && u == 0 ? s = 3 : s = u == 0 ? 1 : w(r);
            if (s >= 0 && s < n) {
                var a = $("<span />").addClass("hour").css("left", s);
                if (u == 0 || u > 1 && h(r) % 2 == 0) {
                    var f = p(r);
                    ENV.is_mobile && f == "midnight" && (f = "12AM"),
                    $("<span />").html(f).addClass(f.replace(" ", "")).appendTo(a)
                }
                a.appendTo(i)
            }
            t.setHours(t.getHours() + 1)
        }
        i.find(".hour").eq(0).addClass("first")
    },
    g = function(t) {
        var r = e.find(".stripes");
        r.empty();
        var i = n / 24,
        s, o, u = 0,
        a, f = 5,
        l = 0,
        c = [];
        for (var h = 0; h < t.length; h++) {
            a = l * i;
            if (a >= n) continue;
            var p = i * t[h].num_hours + 1;
            1 + a + p > n && (p -= 1 + a + p - n);
            var d = $("<span />").addClass(t[h].type + t[h].range).addClass(t[h].type).css({
                left: a,
                width: p
            });
            s = null,
            t[h].range == 0 ? o = "clear": t[h].type == "c" ? t[h].range == 2 ? o = "cloudy": t[h].range == 1 ? o = "partly cloudy": o = "": t[h].range == 4 ? o = "heavy " + t[h].precip_type: t[h].range == 2 ? o = "scattered light " + t[h].precip_type: t[h].range == 1 ? o = t[h].precip_type == "snow" ? "possible flurries": "possible drizzle": o = t[h].precip_type,
            o.length * f <= p && (s = $("<span />").html(o).appendTo(d), c.push(o)),
            d.appendTo(r),
            u++,
            l += t[h].num_hours
        }
        r.find("> span").eq(0).addClass("first")
    },
    y = function(t) {
        var r = e.find(".temps");
        r.empty();
        var i = Infinity,
        s = -Infinity;
        for (var o = 0; o < t.length; o++) t[o].temperature !== null && (t[o].temperature < i && (i = t[o].temperature), t[o].temperature > s && (s = t[o].temperature));
        var u = function(e) {
            var o = t[e].time,
            u = t[e].temperature,
            a = .25 + .75 * (u - i) / (s - i);
            u == null ? u = "-": u = Math.round(u) + "&deg;";
            var f = e == 0 ? 1 : w(o);
            ENV.is_mobile && e == 0 && (f = 3);
            if (f < 0 || f > n) return;
            $("<span><span>" + u + "</span></span>").css({
                left: f,
                opacity: a
            }).appendTo(r)
        };
        u(0);
        for (var o = h(t[0].time) % 2 ? 3 : 2; o < t.length; o += 2) u(o);
        r.find("> span").eq(0).addClass("first")
    },
    b = function() {
        e.find(".now").remove();
        var t = (new Date).getTime() / 1e3,
        r = w(t);
        if (r < 0 || r > n) return;
        $("<span />").addClass("now").css("left", r).appendTo(e)
    },
    w = function(e) {
        var t = n / 86400,
        r = e - o;
        return r * t
    };
    return r.load = function(i) {
        o = i.hourly.data[0].time,
        u = (i.offset || 0) + (new Date(1e3 * o)).getTimezoneOffset() / 60,
        a = i.latitude,
        f = i.longitude;
        var s = i.hourly.data.slice(0, 24);
        if (t.width) {
            var h = t.width / 24,
            p = Math.ceil(t.label_width / h - 1e-4);
            p > t.hour_spacing && (t.hour_spacing = p)
        }
        n || (n = Math.ceil(24 * t.label_width / min_spacing)),
        e.css("width", n),
        t.hour_spacing === null && (t.hour_spacing = n / 24),
        v(s),
        m(s);
        var d = [],
        w = {},
        E,
        S,
        x,
        T,
        N = "rain";
        s[0].precipType ? N = s[0].precipType: s[0].temperature && (N = s[0].temperature <= (UIManager.si_units() ? 0 : 32) ? "snow": "rain");
        for (var C = 0; C < s.length; C++) {
            S = l(s[C]),
            x = c(s[C]),
            T = s[C].precipType || N,
            E = x > 0 ? "p": "c";
            var k = {
                type: E,
                range: E == "p" ? x: S,
                precip_type: E == "p" ? T: null,
                num_hours: 0
            };
            if (k.type != w.type || k.range != w.range) C > 0 && d.push(w),
            w = k;
            N = T,
            w.num_hours++
        }
        d.push(w),
        g(d),
        y(s),
        b(),
        r.params = t
    },
    r
},

Loader = {
    start: function() {},
    stop: function() {}
}; 

(function() {
    function g() {
        var e = Date.now(),
        t;
        for (t = i + 2; t--;) l[t] = 0,
        c[t] = 0;
        h = !0,
        d = .5,
        p = 1,
        f.length = 0,
        f.push({
            x: Math.random(),
            t: e - 500
        },
        {
            x: Math.random(),
            t: e - 250
        },
        {
            x: Math.random(),
            t: e - 0
        })
    }
    function y() {
        p > .1 && f.push({
            x: Math.random(),
            t: Date.now()
        })
    }
    function b() {
        var e = i;
        while (e--) l[e + 1] = (c[e] + c[e + 2] - l[e + 1]) * o;
        e = c,
        c = l,
        l = e
    }
    function w(e, t) {
        e *= i;
        var n = r * i,
        s = Math.ceil(e - n),
        o = Math.floor(e + n) + 1,
        u,
        a;
        for (u = s; u !== o; ++u) a = e - u,
        l[u + 1] -= Math.sqrt(n * n - a * a) * t / n
    }
    function E() {
        var i = Date.now(),
        s = Math.sqrt((p + r * 3) / n),
        o = r * 2,
        u = Math.PI * 11 / 6,
        a = Math.PI * 7 / 6,
        l,
        c,
        h,
        d;
        for (l = f.length; l--;) h = f[l].x * (1 - o) + r,
        c = i - f[l].t,
        d = n * c * c - r,
        c >= s ? (w(h, d), f.splice(l, 1)) : (t.beginPath(), t.moveTo(h * e.width, (d - o) * e.height), t.arc(h * e.width, d * e.height, r * e.width, u, a, !1), t.fill())
    }
    function S() {
        var n = e.width / (i - 1),
        r = i;
        t.beginPath(),
        t.moveTo(0, e.height),
        t.lineTo(e.width, e.height);
        while (r--) t.lineTo(r * n, (p + l[r + 1] * s) * e.height);
        t.fill()
    }
    function x() {
        var n = Math.max(e.width, e.height),
        r = n * a,
        i = n - r,
        s;
        t.fillStyle = "#f8f8f8",
        t.fillRect(0, 0, e.width, e.height),
        t.fillStyle = "#d3d3d3",
        t.save(),
        b(),
        S(),
        E(),
        t.restore(),
        p += (d - p) * u,
        v && Math.abs(d - p) < .005 && (p = d, s = v, v = undefined, s())
    }
    function T(e) {
        var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(e) {
            window.setTimeout(e, 1e3 / 60)
        },
        n = function() {
            h && (t(n), e())
        };
        n()
    }
    var e = document.getElementById("loader_canvas");
    if (!e) return;
    var t = e.getContext("2d"),
    n = 1 / 1048576,
    r = 1 / 16,
    i = 48,
    s = 1 / 8,
    o = .75,
    u = 1 / 16,
    a = 1 / 8,
    f = [],
    l = new Array(i + 2),
    c = new Array(i + 2),
    h,
    p,
    d,
    v,
    m;
    Loader.start = function(e) {
        g(),
        v = e,
        m = setInterval(y, 1e3 / 3),
        T(x)
    },
    Loader.stop = function(e) {
        d = 0,
        v = function() {
            clearInterval(m),
            h = !1,
            typeof e == "function" && e()
        }
    }
})();

var ENV = function() {
    var e = {},
    t = $(e);
    e.is_retina = isRetina(),
    e.is_online = window.navigator.onLine,
    e.is_homescreen = window.navigator.standalone,
    e.has_geolocation = !!navigator.geolocation,
    e.is_ie = $.browser.msie,
    e.is_old_ie = e.is_ie && parseInt($.browser.version, 0) < 10,
    e.is_webkit = navigator.userAgent.match(/webkit/i),
    e.is_mozilla = $.browser.mozilla,
    e.is_chrome = /chrome/.test(navigator.userAgent.toLowerCase()),
    e.is_mobile_chrome = /crios/.test(navigator.userAgent.toLowerCase()),
    e.is_iphone = navigator.userAgent.match(/like Mac OS X/i) && navigator.userAgent.match(/iPhone/i),
    e.is_mobile = navigator.userAgent.match(/(iphone|ipod|(android.*?mobile)|(mobile.*?firefox)|blackberry|nokia)/i),
    e.is_tablet = navigator.userAgent.match(/(ipad|android(?!.*mobile))/i),
    e.is_android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    if (e.is_android) var n = navigator.userAgent,
    r = parseFloat(n.slice(n.indexOf("Android") + 8));
    return e.is_retina = window.devicePixelRatio && window.devicePixelRatio > 1,
    e.is_mobile_site = !!window.location.href.match(/mobile.html/i),
    e.has_avenir = /Mac OS X 10_8/.test(navigator.userAgent) || /iPhone OS 6/.test(navigator.userAgent),
    e.begin = function() {
        $.browser.msie && parseInt($.browser.version, 0) < 9 ? t.trigger("criteria_failed", "old_ie") : $.browser.mozilla && parseInt($.browser.version, 0) < 15 ? t.trigger("criteria_failed", "old_firefox") : $.browser.safari && parseInt($.browser.version, 0) < 533 ? t.trigger("criteria_failed", "old_safari") : e.is_online ? e.is_iphone && !e.is_homescreen ? t.trigger("criteria_failed", "not_homescreen") : e.is_android && r < 4 ? t.trigger("criteria_failed", "old_android") : t.trigger("criteria_met") : t.trigger("criteria_failed", "not_online")
    },
    e.is_mobile ? $("body").addClass("mobile") : $("body").addClass("desktop"),
    e.is_iphone && $("body").addClass("iphone"),
    e.is_chrome && $("body").addClass("chrome"),
    e.is_mobile_chrome && $("body").addClass("mobile_chrome"),
    e.is_android && $("body").addClass("android"),
    e.has_avenir && $("body").addClass("has_avenir"),
    e.is_tablet && $("body").addClass("tablet"),
    e
} ();

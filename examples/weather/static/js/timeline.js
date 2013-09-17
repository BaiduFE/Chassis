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
};

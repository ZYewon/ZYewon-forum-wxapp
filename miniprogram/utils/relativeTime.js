
!function (e, r) { "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_relativeTime = r() }(this, function () { "use strict"; return function (p, e, v) { p = p || {}; var o = e.prototype, M = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }; function t(e, r, t, n) { return o.fromToBase(e, r, t, n) } v.en.relativeTime = M, o.fromToBase = function (e, r, t, n, o) { for (var i, d, u = t.$locale().relativeTime || M, f = p.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], a = f.length, s = 0; s < a; s += 1) { var l = f[s], h = (l.d && (i = n ? v(e).diff(t, l.d, !0) : t.diff(e, l.d, !0)), (p.rounding || Math.round)(Math.abs(i))), m = 0 < i; if (h <= l.r || !l.r) { var c = u[(l = h <= 1 && 0 < s ? f[s - 1] : l).l]; o && (h = o("" + h)), d = "string" == typeof c ? c.replace("%d", h) : c(h, r, l.l, m); break } } if (r) return d; var y = m ? u.future : u.past; return "function" == typeof y ? y(d) : y.replace("%s", d) }, o.to = function (e, r) { return t(e, r, this, !0) }, o.from = function (e, r) { return t(e, r, this) }; function r(e) { return e.$u ? v.utc() : v() } o.toNow = function (e) { return this.to(r(this), e) }, o.fromNow = function (e) { return this.from(r(this), e) } } });
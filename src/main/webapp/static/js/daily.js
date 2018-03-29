/**
 * Created by hanyu on 2017/11/29.
 */
    define("tool-cookie", [],
    function() {
        return $.cookie = function(e, t, n) {
            var i, o, r, a;
            return arguments.length > 1 && "[object Object]" !== String(t) ? (n = $.extend({}, n), null !== t && void 0 !== t || (n.expires = -1), "number" == typeof n.expires && (i = 24 * n.expires * 60 * 60 * 1e3, o = n.expires = new Date, o.setTime(o.getTime() + i)), t = String(t), document.cookie = [encodeURIComponent(e), "=", n.raw ? t: encodeURIComponent(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path: "", n.domain ? "; domain=" + n.domain: "", n.secure ? "; secure": ""].join("")) : (n = t || {},
                a = n.raw ?
                    function(e) {
                        return e
                    }: decodeURIComponent, (r = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? a(r[1]) : null)
        }
    }),
    define("api", ["tool-cookie"],
        function() {
            var e = {};
            return e.regist = function(t, n) {
                n = n || {};
                var i = null;
                e[t] = function(e, o) {
                    return i && (i.abort(), i = null),
                    "function" == typeof e && (o = e, e = {}),
                        i = $.ajax({
                            url: n.url || "http://sentence.iciba.com/index.php",
                            data: $.extend(n.data || {
                                    c: n.c,
                                    m: t
                                },
                                e),
                            type: n.type || "get",
                            dataType: n.dataType || "jsonp",
                            success: function(e) {
                                o && o(e)
                            },
                            error: function(e) {
                                console.log(e)
                            },
                            complete: function() {
                                i = null
                            }
                        })
                }
            },
                e.regist("dailyList", {
                    c: "dailysentence"
                }),
                e.regist("getdetail", {
                    c: "dailysentence"
                }),
                e.regist("getRecommend", {
                    c: "dailysentence",
                    url: "http://news.iciba.com/index.php",
                    data: {
                        mod: "new_functions",
                        act: "get_recommend"
                    }
                }),
                e.regist("getTodaySentence", {
                    c: "dailysentence"
                }),
                e.regist("getRelationBySid", {
                    c: "dailysentence"
                }),
                e.regist("addLove", {
                    c: "dailysentence"
                }),
                e.regist("getNoticemessage", {
                    c: "comment"
                }),
                e.regist("getHot", {
                    c: "comment"
                }),
                e.regist("getList", {
                    c: "comment"
                }),
                e.regist("getReply", {
                    c: "comment"
                }),
                e.regist("getNoticecount", {
                    c: "comment"
                }),
                e.regist("getOne", {
                    c: "comment"
                }),
                e.regist("postOne", {
                    c: "comment"
                }),
                e.regist("deleteOne", {
                    c: "comment"
                }),
                e.regist("getRecentBilingual", {
                    c: "news_index",
                    url: "http://dict-pc.iciba.com/interface/index.php"
                }),
                e.regist("getNewsSentence", {
                    c: "dailysentence",
                    url: "http://sentence.iciba.com/index.php"
                }),
                e.regist("getVideoList", {
                    c: "news_video",
                    url: "http://dict-pc.iciba.com/interface/index.php"
                }),
                e.regist("praise", {
                    c: "news_video",
                    url: "http://dict-pc.iciba.com/interface/index.php"
                }),
                e
        }),
    define("tool-filters", [],
        function() {
            var e = {
                "01": "Jan",
                "02": "Feb",
                "03": "Mar",
                "04": "Apr",
                "05": "May",
                "06": "Jun",
                "07": "Jul",
                "08": "Aug",
                "09": "Sep",
                10 : "Oct",
                11 : "Nov",
                12 : "Dec"
            };
            return avalon.filters.month = function(t) {
                return e[t.substr(5, 2)]
            },
                avalon.filters.numToLetter = function(e) {
                    return String.fromCharCode(65 + parseInt(e))
                },
                avalon.filters.trim = function(e) {
                    return e.replace(/(^\s*)|(\s*$)/g, "")
                },
                avalon.filters
        }),
    define("sentence", ["api", "tool-filters"],
        function(e) {
            var t = {
                    main: $(".sentence"),
                    data: null,
                    xhr: null,
                    success: function(e) {
                        return t.data ? e && e(t.data) : void t.xhr.success(e)
                    }
                },
                n = avalon.define({
                    $id: "sentence",
                    picture: "",
                    title: "",
                    content: "",
                    note: ""
                });
            return avalon.scan(t.main.get(0), n),
                t.xhr = e.getTodaySentence(function(e) {
                    t.data = e,
                        0 === e.errno ? (n.picture = e.picture, n.title = e.title, n.content = e.content, n.note = e.note, setTimeout(function() {
                                t.main.fadeIn(400)
                            },
                            100)) : console.log(e)
                }),
                t
        }),
    define("nav", ["sentence"],
        function(e) {
            var t = {
                    main: $(".nav"),
                    input: $("#nav-search-input")
                },
                n = function() {
                    var e = t.input.val();
                    e && avalon.router.navigate("/list/2/" + e + "/0")
                },
                i = avalon.define({
                    $id: "nav",
                    submit: function(e) {
                        return n(),
                            e.preventDefault(),
                            !1
                    },
                    href: "javascript:;"
                });
            return avalon.scan(t.main.get(0), i),
                e.success(function(e) {
                    0 === e.errno ? i.href = "#!/detail/title/" + e.title: console.log(e)
                }),
                t
        }),
    define("tool-sound", [],
        function() {
            var e = null,
                t = function(e) {
                    return window.document[e] ? window.document[e] : navigator.appName.indexOf("Microsoft Internet") == -1 && document.embeds && document.embeds[e] ? document.embeds[e] : document.getElementById(e)
                },
                n = {
                    set: function(n, i) {
                        var o = document.createElement("audio");
                        if (null != o && o.canPlayType && o.canPlayType("audio/mpeg")) e ? e.src === n ? e.paused ? e.play() : e.pause() : (e.pause(), o.src = n, e = o, o.play()) : (o.src = n, e = o, o.play());
                        else {
                            var r = t("asound_top");
                            if (r) try {
                                r.SetVariable("f", n),
                                    r.GotoFrame(1)
                            } catch(a) {}
                            e = null
                        }
                        return i && this.action(i),
                            this
                    },
                    action: function(e) {
                        var t = $(e),
                            n = t.get(0);
                        return clearTimeout(n.__sound_action_timer),
                            t.hasClass("icon-sound-play") ? t.removeClass("icon-sound-play") : (t.addClass("icon-sound-play"), n.__sound_action_timer = setTimeout(function() {
                                    t.removeClass("icon-sound-play")
                                },
                                2e3)),
                            this
                    },
                    scan: function(e) {
                        $("[data-sound]", e).each(function() {
                            var e = $(this),
                                t = e.attr("data-sound");
                            e.removeAttr("data-sound"),
                                e.addClass("icon-sound"),
                                e.on("click",
                                    function() {
                                        n.set(t, this)
                                    })
                        })
                    }
                };
            return n
        }),
    !
        function() {
            function e(e) {
                return e.replace(b, "").replace(x, ",").replace(w, "").replace($, "").replace(_, "").split(/^$|,+/)
            }
            function t(e) {
                return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
            }
            function n(n, i) {
                function o(e) {
                    return d += e.split(/\n/).length - 1,
                    u && (e = e.replace(/\s+/g, " ").replace(/<!--.*?-->/g, "")),
                    e && (e = y[1] + t(e) + y[2] + "\n"),
                        e
                }
                function r(t) {
                    var n = d;
                    if (l ? t = l(t, i) : a && (t = t.replace(/\n/g,
                                function() {
                                    return d++,
                                    "$line=" + d + ";"
                                })), 0 === t.indexOf("=")) {
                        var o = p && !/^=[=#]/.test(t);
                        if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), o) {
                            var r = t.replace(/\s*\([^\)]+\)/, "");
                            f[r] || /^(include|print)$/.test(r) || (t = "$escape(" + t + ")")
                        } else t = "$string(" + t + ")";
                        t = y[1] + t + y[2]
                    }
                    return a && (t = "$line=" + n + ";" + t),
                        v(e(t),
                            function(e) {
                                if (e && !h[e]) {
                                    var t;
                                    t = "print" === e ? x: "include" === e ? w: f[e] ? "$utils." + e: m[e] ? "$helpers." + e: "$data." + e,
                                        $ += e + "=" + t + ",",
                                        h[e] = !0
                                }
                            }),
                    t + "\n"
                }
                var a = i.debug,
                    s = i.openTag,
                    c = i.closeTag,
                    l = i.parser,
                    u = i.compress,
                    p = i.escape,
                    d = 1,
                    h = {
                        $data: 1,
                        $filename: 1,
                        $utils: 1,
                        $helpers: 1,
                        $out: 1,
                        $line: 1
                    },
                    g = "".trim,
                    y = g ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                    b = g ? "$out+=text;return $out;": "$out.push(text);",
                    x = "function(){var text=''.concat.apply('',arguments);" + b + "}",
                    w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}",
                    $ = "var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0,": ""),
                    _ = y[0],
                    T = "return new String(" + y[3] + ");";
                v(n.split(s),
                    function(e) {
                        e = e.split(c);
                        var t = e[0],
                            n = e[1];
                        1 === e.length ? _ += o(t) : (_ += r(t), n && (_ += o(n)))
                    });
                var I = $ + _ + T;
                a && (I = "try{" + I + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
                try {
                    var C = new Function("$data", "$filename", I);
                    return C.prototype = f,
                        C
                } catch(k) {
                    throw k.temp = "function anonymous($data,$filename) {" + I + "}",
                        k
                }
            }
            var i = function(e, t) {
                return "string" == typeof t ? g(t, {
                    filename: e
                }) : a(e, t)
            };
            i.version = "3.0.0",
                i.config = function(e, t) {
                    o[e] = t
                };
            var o = i.defaults = {
                    openTag: "<%",
                    closeTag: "%>",
                    escape: !0,
                    cache: !0,
                    compress: !1,
                    parser: null
                },
                r = i.cache = {};
            i.render = function(e, t) {
                return g(e, t)
            };
            var a = i.renderFile = function(e, t) {
                var n = i.get(e) || h({
                        filename: e,
                        name: "Render Error",
                        message: "Template not found"
                    });
                return t ? n(t) : n
            };
            i.get = function(e) {
                var t;
                if (r[e]) t = r[e];
                else if ("object" == typeof document) {
                    var n = document.getElementById(e);
                    if (n) {
                        var i = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                        t = g(i, {
                            filename: e
                        })
                    }
                }
                return t
            };
            var s = function(e, t) {
                    return "string" != typeof e && (t = typeof e, "number" === t ? e += "": e = "function" === t ? s(e.call(e)) : ""),
                        e
                },
                c = {
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "&": "&#38;"
                },
                l = function(e) {
                    return c[e]
                },
                u = function(e) {
                    return s(e).replace(/&(?![\w#]+;)|[<>"']/g, l)
                },
                p = Array.isArray ||
                    function(e) {
                        return "[object Array]" === {}.toString.call(e)
                    },
                d = function(e, t) {
                    var n, i;
                    if (p(e)) for (n = 0, i = e.length; i > n; n++) t.call(e, e[n], n, e);
                    else for (n in e) t.call(e, e[n], n)
                },
                f = i.utils = {
                    $helpers: {},
                    $include: a,
                    $string: s,
                    $escape: u,
                    $each: d
                };
            i.helper = function(e, t) {
                m[e] = t
            };
            var m = i.helpers = f.$helpers;
            i.onerror = function(e) {
                var t = "Template Error\n\n";
                for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
                "object" == typeof console && console.error(t)
            };
            var h = function(e) {
                    return i.onerror(e),
                        function() {
                            return "{Template Error}"
                        }
                },
                g = i.compile = function(e, t) {
                    function i(n) {
                        try {
                            return new c(n, s) + ""
                        } catch(i) {
                            return t.debug ? h(i)() : (t.debug = !0, g(e, t)(n))
                        }
                    }
                    t = t || {};
                    for (var a in o) void 0 === t[a] && (t[a] = o[a]);
                    var s = t.filename;
                    try {
                        var c = n(e, t)
                    } catch(l) {
                        return l.filename = s || "anonymous",
                            l.name = "Syntax Error",
                            h(l)
                    }
                    return i.prototype = c.prototype,
                        i.toString = function() {
                            return c.toString()
                        },
                    s && t.cache && (r[s] = i),
                        i
                },
                v = f.$each,
                y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
                b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
                x = /[^\w$]+/g,
                w = new RegExp(["\\b" + y.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
                $ = /^\d[^,]*|,\d[^,]*/g,
                _ = /^,+|,+$/g;
            o.openTag = "{{",
                o.closeTag = "}}";
            var T = function(e, t) {
                var n = t.split(":"),
                    i = n.shift(),
                    o = n.join(":") || "";
                return o && (o = ", " + o),
                "$helpers." + i + "(" + e + o + ")"
            };
            o.parser = function(e, t) {
                e = e.replace(/^\s/, "");
                var n = e.split(" "),
                    o = n.shift(),
                    r = n.join(" ");
                switch (o) {
                    case "if":
                        e = "if(" + r + "){";
                        break;
                    case "else":
                        n = "if" === n.shift() ? " if(" + n.join(" ") + ")": "",
                            e = "}else" + n + "{";
                        break;
                    case "/if":
                        e = "}";
                        break;
                    case "each":
                        var a = n[0] || "$data",
                            s = n[1] || "as",
                            c = n[2] || "$value",
                            l = n[3] || "$index",
                            u = c + "," + l;
                        "as" !== s && (a = "[]"),
                            e = "$each(" + a + ",function(" + u + "){";
                        break;
                    case "/each":
                        e = "});";
                        break;
                    case "echo":
                        e = "print(" + r + ");";
                        break;
                    case "print":
                    case "include":
                        e = o + "(" + n.join(",") + ");";
                        break;
                    default:
                        if ( - 1 !== r.indexOf("|")) {
                            var p = t.escape;
                            0 === e.indexOf("#") && (e = e.substr(1), p = !1);
                            for (var d = 0,
                                     f = e.split("|"), m = f.length, h = p ? "$escape": "$string", g = h + "(" + f[d++] + ")"; m > d; d++) g = T(g, f[d]);
                            e = "=#" + g
                        } else e = i.helpers[o] ? "=#" + o + "(" + n.join(",") + ");": "=" + e
                }
                return e
            },
                "function" == typeof define ? define("dep-template", [],
                    function() {
                        return i
                    }) : "undefined" != typeof exports ? module.exports = i: this.template = i
        } (),
    define("commons/util/sets", ["require", "exports", "module", "commons/js/config", "commons/util/out"],
        function(e, t, n) {
            var i = (e("commons/js/config"), e("commons/util/out")),
                o = function(e) {
                    return e.replace(/([\.\?\+\*\^\(\)\\\{\}\$\/])/g, "\\$1")
                };
            n.exports = {
                placeholderable: function(e, t) {
                    function n() {
                        c.removeClass("edui-container-focus"),
                            i.tip("info", "umeditor blur"),
                        $.trim(e.getContentTxt()) || e.setContent(s)
                    }
                    function o() {
                        c.addClass("edui-container-focus"),
                            i.tip("info", "umeditor focus"),
                        ~$.trim(e.getContent()).indexOf(r) && e.setContent("")
                    }
                    var r = "zns6GSI672389sdnxzcxxz",
                        a = ["font-size:14px;", "color:#a9a9a9;", "padding-left:5px;"].join(""),
                        s = ['<span data-tag="' + r + '" style="' + a + '">', t, "</span>"].join(""),
                        c = $(e.container);
                    e.addListener("focus", o),
                        e.addListener("blur", n),
                        window.setTimeout(function() {
                                n(e)
                            },
                            0)
                },
                trimRegExp: o,
                imgupcut: function(e, t, n, i) {
                    e = $(e);
                    var o = e.attr("id"),
                        r = e.attr("title"),
                        a = "text",
                        s = {};
                    this.AllowExt = ".jpg,.gif,.jpeg,.png,.pjpeg",
                        this.FileExt = e.val().substr(e.val().lastIndexOf(".")).toLowerCase(),
                        0 != this.AllowExt && this.AllowExt.indexOf(this.FileExt) == -1 ? (i && i("typeerror", o, r), $("input[type = 'file']").val("")) : $.ajaxFileUpload({
                            url: t,
                            secureuri: !1,
                            fileElementId: o,
                            data: s,
                            dataType: a,
                            success: function(e) {
                                "text" == a && (e = $.parseJSON(e)),
                                    e.success ? n && n(e.content, o) : i && i("responseerror", o, e)
                            },
                            error: function(e) {
                                i && i("servererror", o, e)
                            }
                        })
                },
                highlights: function(e, t) {
                    "string" == typeof t && (t = [t]),
                        $(e).each(function() {
                            var e = $(this),
                                n = e.html();
                            $.each(t,
                                function(t, i) {
                                    if ("" != i) {
                                        i = o(i.toLowerCase());
                                        var r = new RegExp("(" + i + ")", "gi");
                                        r.test(n) && e.html(e.html().replace(r, '<em class="hl">$1</em>'))
                                    }
                                })
                        })
                },
                inherit: function(e, t, n) {
                    e.prototype = $.extend(new t, n),
                        e.prototype.constructor = e,
                        e.prototype.supertoucher = function() {
                            var e = new t;
                            return function(t, n, i) {
                                t && (n || (n = []), e[t] && e[t].apply(i || this, n))
                            }
                        } ()
                },
                inWeixin: function() {
                    var e = navigator.userAgent.toLowerCase();
                    return "micromessenger" == e.match(/MicroMessenger/i)
                },
                throttle: function(e, t, n, i) {
                    n = void 0 == n ? null: n,
                    e.tId && clearTimeout(e.tId),
                        e.tId = setTimeout(function() {
                                e.apply(n, t)
                            },
                            i ? i: 140)
                },
                isSet: function(e) {
                    return !! e && "null" != e && "undefined" != e
                },
                reflow: function() {
                    window.setTimeout(function() {
                            document.body.style.display = "none",
                                document.body.offsetHeight,
                                document.body.style.display = ""
                        },
                        0)
                },
                random: function(e) {
                    return e + Math.floor(1e5 * Math.random())
                }
            }
        }),
    define("commons/js/config", ["require", "exports", "module"],
        function(e, t, n) {
            n.exports = {
                debug: !0,
                symbol: {
                    UP: "↑",
                    DOWN: "↓",
                    LEFT: "←",
                    RIGHT: "→"
                },
                url: {
                    queryDistrict: "/forecast/tool/queryDistrict",
                    queryVersion: "/forecast/tool/queryVersion"
                }
            }
        }),
    define("commons/util/out", ["require", "exports", "module", "commons/js/config"],
        function(e, t, n) {
            var i = e("commons/js/config");
            n.exports = {
                tip: function() {
                    if (i.debug) {
                        var e = arguments[0],
                            t = Array.prototype.slice.call(arguments, 1);
                        console[e].apply(console, t)
                    }
                }
            }
        }),
    define("./tpl/aNotCurTpl.atpl", [],
        function() {
            return '<span hidefocus="hidefocus" page="{{index}}" class="pager_not_current">{{index}}</span>'
        }),
    define("./tpl/aIsCurTpl.atpl", [],
        function() {
            return '<span hidefocus="hidefocus" page="{{index}}" class="pager_is_current">{{index}}</span>'
        }),
    define("commons/components/base/Abstract", ["require", "exports", "module"],
        function(e, t, n) {
            var i = 0,
                o = function(e) {
                    for (var t in e) this[t] = e[t];
                    i++
                };
            o.prototype = {
                constructor: o,
                init: function() {
                    var e = this;
                    if (!e._nocontainer_ && !e.container) throw e.TAG + " need container!";
                    return e._id_ = i,
                        e
                },
                getInnerId: function() {
                    var e = this;
                    return e._id_
                },
                show: function() {
                    var e = this;
                    return e.container && e.container.show(),
                        e
                },
                hide: function() {
                    var e = this;
                    return e.container && e.container.hide(),
                        e
                },
                on: function() {
                    var e = this;
                    return e.container.on.apply(e.container, arguments),
                        e
                },
                hover: function(e, t, n) {
                    var i = this;
                    return i.container.find(e).hover(t, n),
                        i
                }
            },
                n.exports = o
        }),
    define("pager", ["require", "exports", "module", "dep-template", "commons/components/base/Abstract", "commons/util/out", "commons/util/sets", "./tpl/aNotCurTpl.atpl", "./tpl/aIsCurTpl.atpl"],
        function(e, t, n, i) {
            var o = e("commons/components/base/Abstract"),
                r = (e("commons/util/out"), e("commons/util/sets")),
                a = e("./tpl/aNotCurTpl.atpl"),
                s = e("./tpl/aIsCurTpl.atpl"),
                c = 2,
                l = "pager_container",
                u = "pager_is_current",
                p = "pager_prev",
                d = "pager_prev_disabled",
                f = "pager_next",
                m = "pager_next_disabled",
                h = "pager_lgthen",
                g = "pager_lgthen_dis",
                v = "< 上一页",
                y = "下一页 >",
                a = i.compile(a),
                s = i.compile(s),
                b = "···",
                x = function(e) {
                    o.call(this, e)
                };
            r.inherit(x, o, {
                TAG: "PagerConstructor",
                init: function() {
                    var e = this;
                    return e.supertoucher("init", null, e),
                        e.neighbour = void 0 == e.neighbour || c,
                        e._render(),
                        e._bindEvents(),
                        e
                },
                _isFirst: function() {
                    var e = this;
                    return 1 == e.current
                },
                _isLast: function() {
                    var e = this;
                    return e.current == e.totalpage
                },
                _render: function() {
                    var e = this,
                        t = "";
                    t += '<div class="c-page-main">',
                        t += '<div class="item_con_pager"></div>',
                        t += "</div>",
                        e.container.html(t);
                    var n = "";
                    if (1 == e.totalpage) return e.container.find(".c-page-main").remove(),
                        !1;
                    if (e.totalpage <= 10) for (var i = 1; i < e.totalpage + 1; i++) {
                        var o = i == e.current ? s: a;
                        n += o({
                            index: i
                        })
                    } else if (e.totalpage > 10) {
                        for (var i = 1; i < e.totalpage + 1; i++) {
                            var o = i == e.current ? s: a;
                            n += Math.abs(i - e.current) <= c || 1 == i || i == e.totalpage ? o({
                                index: i
                            }) : b
                        }
                        n = n.replace(/[·]+/g, b)
                    }
                    var r = '<div class="' + l + '"><span hidefocus="hidefocus" action="prev" class="' + p + " " + (e._isFirst() ? d: "") + '"><strong class="' + h + " " + (e._isFirst() ? g: "") + '"></strong>' + (e.pre || v) + "</span>" + n + '<span hidefocus="hidefocus" action="next" class="' + f + " " + (e._isLast() ? m: "") + '">' + (e.nex || y) + '<strong class="' + h + " " + (e._isLast() ? g: "") + '"></strong></span></div>';
                    e.container.find(".item_con_pager").html(r)
                },
                _clear: function() {
                    var e = this;
                    e.container.html("")
                },
                _bindEvents: function() {
                    var e = this;
                    e.container.off("click"),
                        e.container.on("click",
                            function(t) {
                                var n = t.target;
                                if (t.stopPropagation(), !$(n).hasClass(u)) {
                                    var i;
                                    if ("span" == n.tagName.toLowerCase() && n.getAttribute("page") || "span" == n.tagName.toLowerCase() && n.getAttribute("action")) if (i = n.getAttribute("action")) switch (i) {
                                        case "prev":
                                            if (e._isFirst()) break;
                                            var o = +e.current - 1;
                                            e.set(o),
                                                e.emitter.emit("pager:go", o);
                                            break;
                                        case "next":
                                            if (e._isLast()) break;
                                            var o = +e.current + 1;
                                            e.set(o),
                                                e.emitter.emit("pager:go", o);
                                            break;
                                        case "go":
                                            var r = $.trim(e.container.find("#c-gopage").val()),
                                                a = e.container.find(".coo-go-error"),
                                                s = /^[1-9]\d*$/;
                                            if (!s.test(r)) return void a.text("请输入大于0的正整数").show();
                                            if (a.hide(), 1 > r || r > e.totalPage) return void a.text("请输入有效页码").show();
                                            a.hide();
                                            var o = r;
                                            e.set(o),
                                                e.emitter.emit("pager:go", o)
                                    } else {
                                        var o = n.getAttribute("page");
                                        e.set(o),
                                            e.emitter.emit("pager:go", o)
                                    }
                                }
                            })
                },
                set: function(e) {
                    var t = this;
                    e > t.totalpage && (e = t.totalpage),
                        t.current = +e,
                        t._render()
                },
                setTotal: function(e) {
                    var t = this;
                    t.totalpage = +e,
                        t.set(1)
                },
                get: function() {
                    var e = this;
                    return + e.current
                }
            }),
                n.exports = x
        }),
    define("dep-emitter", [],
        function() {
            function e() {}
            var t = e.prototype;
            return t._getEvents = function() {
                return this._events || (this._events = {}),
                    this._events
            },
                t._getMaxListeners = function() {
                    return isNaN(this.maxListeners) && (this.maxListeners = 10),
                        this.maxListeners
                },
                t.on = function(e, t) {
                    var n = this._getEvents(),
                        i = this._getMaxListeners();
                    n[e] = n[e] || [];
                    var o = n[e].length;
                    if (o >= i && 0 !== i) throw new RangeError("Warning: possible Emitter memory leak detected. " + o + " listeners added.");
                    return n[e].push(t),
                        this
                },
                t.once = function(e, t) {
                    function n() {
                        i.off(e, n),
                            t.apply(this, arguments)
                    }
                    var i = this;
                    return n.listener = t,
                        this.on(e, n),
                        this
                },
                t.off = function(e, t) {
                    var n = this._getEvents();
                    if (0 === arguments.length) return this._events = {},
                        this;
                    var i = n[e];
                    if (!i) return this;
                    if (1 === arguments.length) return delete n[e],
                        this;
                    for (var o, r = 0; r < i.length; r++) if (o = i[r], o === t || o.listener === t) {
                        i.splice(r, 1);
                        break
                    }
                    return this
                },
                t.emit = function(e) {
                    var t = this._getEvents(),
                        n = t[e],
                        i = Array.prototype.slice.call(arguments, 1);
                    if (n) {
                        n = n.slice(0);
                        for (var o = 0,
                                 r = n.length; o < r; o++) n[o].apply(this, i)
                    }
                    return this
                },
                t.listeners = function(e) {
                    var t = this._getEvents();
                    return t[e] || []
                },
                t.setMaxListeners = function(e) {
                    return this.maxListeners = e,
                        this
                },
                e.mixin = function(t) {
                    for (var n in e.prototype) t[n] = e.prototype[n];
                    return t
                },
                e
        }),
    define("dep-mmHistory", [],
        function() {
            function e(e) {
                return ! e || e === window.name || "_self" === e || "top" === e && window == window.top
            }
            function t(e) {
                for (var t, n = 0; t = e[n++];) if ("A" === t.nodeName) return t
            }
            function n(e, n) { (n = document.getElementById(e)) ? n.scrollIntoView() : (n = t(document.getElementsByName(e))) ? n.scrollIntoView() : window.scrollTo(0, 0)
            }
            var i = document.createElement("a"),
                o = avalon.History = function() {
                    this.location = location
                };
            o.started = !1,
                o.IEVersion = function() {
                    var e = document.documentMode;
                    return e ? e: window.XMLHttpRequest ? 7 : 6
                } (),
                o.defaults = {
                    basepath: "/",
                    html5Mode: !1,
                    hashPrefix: "!",
                    iframeID: null,
                    interval: 50,
                    fireAnchor: !0,
                    routeElementJudger: avalon.noop
                };
            var r = window.VBArray && o.IEVersion <= 7,
                a = !!window.history.pushState,
                s = !(!("onhashchange" in window) || window.VBArray && r);
            return o.prototype = {
                constructor: o,
                getFragment: function(e) {
                    return null == e && (e = "popstate" === this.monitorMode ? this.getPath() : this.getHash()),
                        e.replace(/^[#\/]|\s+$/g, "")
                },
                getHash: function(e) {
                    var t = (e || this).location.href;
                    return this._getHash(t.slice(t.indexOf("#")))
                },
                _getHash: function(e) {
                    return 0 === e.indexOf("#/") ? decodeURIComponent(e.slice(2)) : 0 === e.indexOf("#!/") ? decodeURIComponent(e.slice(3)) : ""
                },
                getPath: function() {
                    var e = decodeURIComponent(this.location.pathname + this.location.search),
                        t = this.basepath.slice(0, -1);
                    return e.indexOf(t) || (e = e.slice(t.length)),
                        e.slice(1)
                },
                _getAbsolutePath: function(e) {
                    return e.hasAttribute ? e.href: e.getAttribute("href", 4)
                },
                start: function(e) {
                    function t(e) {
                        var t = n.iframe;
                        if ("iframepoll" === n.monitorMode && !t) return ! 1;
                        var i, o = n.getFragment(),
                            r = avalon.router.getLastPath();
                        if (t) {
                            var a = n.getHash(t);
                            o !== r ? (n._setIframeHistory(n.prefix + o), i = o) : a !== r && (n.location.hash = n.prefix + a, i = a)
                        } else o !== r && (i = o);
                        void 0 !== i && (n.fragment = i, n.fireRouteChange(i, {
                            fromHistory: !0
                        }))
                    }
                    if (o.started) throw new Error("avalon.history has already been started");
                    o.started = !0,
                        this.options = avalon.mix({},
                            o.defaults, e),
                        this.html5Mode = !!this.options.html5Mode,
                        this.monitorMode = this.html5Mode ? "popstate": "hashchange",
                    a || (this.html5Mode && (avalon.log("如果浏览器不支持HTML5 pushState，强制使用hash hack!"), this.html5Mode = !1), this.monitorMode = "hashchange"),
                    s || (this.monitorMode = "iframepoll"),
                        this.prefix = "#" + this.options.hashPrefix + "/",
                        this.basepath = ("/" + this.options.basepath + "/").replace(/^\/+|\/+$/g, "/"),
                        this.fragment = this.getFragment(),
                        i.href = this.basepath,
                        this.rootpath = this._getAbsolutePath(i);
                    var n = this,
                        r = "<!doctype html><html><body>@</body></html>";
                    switch (this.options.domain && (r = r.replace("<body>", "<script>document.domain =" + this.options.domain + "</script><body>")), this.iframeHTML = r, "iframepoll" === this.monitorMode && avalon.ready(function() {
                        if (!n.iframe) {
                            var e = n.iframe || document.getElementById(n.iframeID) || document.createElement("iframe");
                            e.src = "javascript:0",
                                e.style.display = "none",
                                e.tabIndex = -1,
                                document.body.appendChild(e),
                                n.iframe = e.contentWindow,
                                n._setIframeHistory(n.prefix + n.fragment)
                        }
                    }), this.monitorMode) {
                        case "popstate":
                            this.checkUrl = avalon.bind(window, "popstate", t),
                                this._fireLocationChange = t;
                            break;
                        case "hashchange":
                            this.checkUrl = avalon.bind(window, "hashchange", t);
                            break;
                        case "iframepoll":
                            this.checkUrl = setInterval(t, this.options.interval)
                    }
                    avalon.ready(function() {
                        n.fireRouteChange(n.fragment || "/", {
                            replace: !0
                        })
                    })
                },
                fireRouteChange: function(e, t) {
                    var i = avalon.router;
                    i && i.navigate && (i.setLastPath(e), i.navigate("/" === e ? e: "/" + e, t)),
                    this.options.fireAnchor && n(e.replace(/\?.*/g, ""))
                },
                stop: function() {
                    avalon.unbind(window, "popstate", this.checkUrl),
                        avalon.unbind(window, "hashchange", this.checkUrl),
                        clearInterval(this.checkUrl),
                        o.started = !1
                },
                updateLocation: function(e, t, n) {
                    var t = t || {},
                        i = t.replace,
                        o = t.silent;
                    if ("popstate" === this.monitorMode) {
                        var r = this.rootpath + e + (n || "");
                        r != this.location.href.split("#")[0] && history[i ? "replaceState": "pushState"]({
                                path: r
                            },
                            document.title, r),
                        o || this._fireLocationChange()
                    } else {
                        var a = this.prefix + e;
                        o && e != this.getHash() && (this._setIframeHistory(a, i), this.fragment = this._getHash(a)),
                            this._setHash(this.location, a, i)
                    }
                },
                _setHash: function(e, t, n) {
                    var i = e.href.replace(/(javascript:|#).*$/, "");
                    n ? e.replace(i + t) : e.hash = t
                },
                _setIframeHistory: function(e, t) {
                    if (this.iframe) {
                        var n = this.iframe.document;
                        n.open(),
                            n.write(this.iframeHTML),
                            n.close(),
                            this._setHash(n.location, e, t)
                    }
                }
            },
                avalon.history = new o,
                avalon.bind(document, "click",
                    function(t) {
                        var n = "defaultPrevented" in t ? t.defaultPrevented: t.returnValue === !1,
                            i = avalon.history.options.routeElementJudger;
                        if (! (n || t.ctrlKey || t.metaKey || 2 === t.which)) {
                            for (var o = t.target;
                                 "A" !== o.nodeName;) if (o = o.parentNode, !o || "BODY" === o.tagName) return;
                            if (e(o.target)) {
                                var a = r ? o.getAttribute("href", 2) : o.getAttribute("href") || o.getAttribute("xlink:href"),
                                    s = avalon.history.prefix;
                                if (null === a) return;
                                var c = a.replace(s, "").trim();
                                0 === a.indexOf(s) && "" !== c || (c = i(o, a), c === !0 && (c = a)),
                                c && (t.preventDefault(), avalon.router && avalon.router.navigate(c))
                            }
                        }
                    }),
                avalon
        }),
    define("dep-mmRouter", ["dep-mmHistory"],
        function() {
            function e() {
                var e = {};
                "get,post,delete,put".replace(avalon.rword,
                    function(t) {
                        e[t] = []
                    }),
                    this.routingTable = e
            }
            function t(e) {
                var t = e.split("?"),
                    n = {},
                    i = t[0],
                    o = t[1];
                if (o) for (var r, a = o.split("&"), s = a.length, c = 0; c < s; c++) a[c] && (r = a[c].split("="), n[decodeURIComponent(r[0])] = decodeURIComponent(r[1]));
                return {
                    path: i,
                    query: n
                }
            }
            function n(e) {
                if ("string" == typeof e) return e;
                var t = [];
                for (var n in e)"query" != n && t.push(n + "=" + encodeURIComponent(e[n]));
                return t.length ? "?" + t.join("&") : ""
            }
            function i(e, t, n) {
                var i = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                if (!t) return i;
                var o = n ? "?": "";
                return i + o + "(" + t + ")" + o
            }
            function o() {
                try {
                    return localStorage.setItem("avalon", 1),
                        localStorage.removeItem("avalon"),
                        !0
                } catch(e) {
                    return ! 1
                }
            }
            function r(e) {
                return String(e).replace(/[,;"\\=\s%]/g,
                    function(e) {
                        return encodeURIComponent(e)
                    })
            }
            function a(e, t) {
                var n = new Date;
                n.setTime(n.getTime() + 864e5),
                    document.cookie = r(e) + "=" + r(t) + ";expires=" + n.toGMTString()
            }
            function s(e) {
                var t = String(document.cookie).match(new RegExp("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)")) || ["", ""];
                return decodeURIComponent(t[1])
            }
            var c = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g;
            if (e.prototype = {
                    error: function(e) {
                        this.errorback = e
                    },
                    _pathToRegExp: function(e, t) {
                        for (var n, o, r, a, s = t.keys = [], l = "^", u = 0; n = c.exec(e);) {
                            o = n[2] || n[3],
                                r = n[4] || ("*" == n[1] ? ".*": "string"),
                                a = e.substring(u, n.index);
                            var p = this.$types[r],
                                d = {
                                    name: o
                                };
                            p && (r = p.pattern, d.decode = p.decode),
                                s.push(d),
                                l += i(a, r, !1),
                                u = c.lastIndex
                        }
                        a = e.substring(u),
                            l += i(a) + (t.strict ? t.last: "/?") + "$";
                        var f = "boolean" != typeof t.caseInsensitive || t.caseInsensitive;
                        return t.regexp = new RegExp(l, f ? "i": void 0),
                            t
                    },
                    add: function(e, t, n, i) {
                        var o = this.routingTable[e.toLowerCase()];
                        if ("/" !== t.charAt(0)) throw "path必须以/开头";
                        i = i || {},
                            i.callback = n,
                        t.length > 2 && "/" === t.charAt(t.length - 1) && (t = t.slice(0, -1), i.last = "/"),
                            avalon.Array.ensure(o, this._pathToRegExp(t, i))
                    },
                    route: function(e, t, n) {
                        t = t.trim();
                        for (var i, o = this.routingTable[e], r = 0; i = o[r++];) {
                            var a = t.match(i.regexp);
                            if (a) {
                                i.query = n || {},
                                    i.path = t,
                                    i.params = {};
                                var s = i.keys;
                                return a.shift(),
                                s.length && this._parseArgs(a, i),
                                    i.callback.apply(i, a)
                            }
                        }
                        this.errorback && this.errorback()
                    },
                    _parseArgs: function(e, t) {
                        for (var n = t.keys,
                                 i = 0,
                                 o = n.length; i < o; i++) {
                            var r = n[i],
                                a = e[i] || "";
                            if ("function" == typeof r.decode) var s = r.decode(a);
                            else try {
                                s = JSON.parse(a)
                            } catch(c) {
                                s = a
                            }
                            e[i] = t.params[r.name] = s
                        }
                    },
                    getLastPath: function() {
                        return s("msLastPath")
                    },
                    setLastPath: function(e) {
                        a("msLastPath", e)
                    },
                    redirect: function(e) {
                        this.navigate(e, {
                            replace: !0
                        })
                    },
                    navigate: function(e, n) {
                        var i = t(("/" !== e.charAt(0) ? "/": "") + e),
                            n = n || {};
                        "/" === e.charAt(0) && (e = e.slice(1)),
                        avalon.state && !n.silent || avalon.history && avalon.history.updateLocation(e, avalon.mix({},
                            n, {
                                silent: !0
                            })),
                        n.silent || this.route("get", i.path, i.query, n)
                    },
                    when: function(e, t) {
                        var n = this,
                            e = e instanceof Array ? e: [e];
                        return avalon.each(e,
                            function(e, i) {
                                n.add("get", i,
                                    function() {
                                        var e = n.urlFormate(t, this.params, this.query);
                                        n.navigate(e.path + e.query, {
                                            replace: !0
                                        })
                                    })
                            }),
                            this
                    },
                    get: function(e, t) {},
                    urlFormate: function(e, t, i) {
                        var i = i ? n(i) : "",
                            o = e.replace(c,
                                function(e) {
                                    var n = e.replace(/[\{\}]/g, "").split(":");
                                    return n = n[0] ? n[0] : n[1],
                                    t[n] || ""
                                }).replace(/^\//g, "");
                        return {
                            path: o,
                            query: i
                        }
                    },
                    $types: {
                        date: {
                            pattern: "[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])",
                            decode: function(e) {
                                return new Date(e.replace(/\-/g, "/"))
                            }
                        },
                        string: {
                            pattern: "[^\\/]*"
                        },
                        bool: {
                            decode: function(e) {
                                return 0 !== parseInt(e, 10)
                            },
                            pattern: "0|1"
                        },
                        "int": {
                            decode: function(e) {
                                return parseInt(e, 10)
                            },
                            pattern: "\\d+"
                        }
                    }
                },
                    "get,put,delete,post".replace(avalon.rword,
                        function(t) {
                            return e.prototype[t] = function(e, n, i) {
                                this.add(t, e, n, i)
                            }
                        }), o()) {
                e.prototype.getLastPath = function() {
                    return localStorage.getItem("msLastPath")
                };
                var l;
                e.prototype.setLastPath = function(e) {
                    l && (clearTimeout(l), l = null),
                        localStorage.setItem("msLastPath", e),
                        l = setTimeout(function() {
                                localStorage.removItem("msLastPath")
                            },
                            864e5)
                }
            }
            return avalon.router = new e,
                avalon
        }),
    define("list", ["api", "tool-sound", "pager", "dep-emitter", "dep-mmRouter", "tool-filters"],
        function(e, t, n, i) {
            var o = new i,
                r = new n({
                    emitter: o,
                    container: $(".list-pager"),
                    totalpage: 0,
                    current: 0,
                    totalcount: 0
                }).init(),
                a = function(e, t, n) {
                    r.totalpage = e,
                        r.current = t,
                        r.totalcount = n,
                        r._render()
                };
            o.on("pager:go",
                function(e) {
                    avalon.router.navigate("/list/" + c.type + "/" + c.key + "/" + (e - 1))
                });
            var s = {
                    main: $(".list")
                },
                c = avalon.define({
                    $id: "list",
                    czc: function(e, t) {
                        _czc.push(["_trackEvent", "每日一句", e, t, "", ""])
                    },
                    voice: function(e, n) {
                        return t.set(n),
                            e.stopPropagation(),
                            !1
                    },
                    key: "",
                    type: "",
                    title: "",
                    page: "",
                    big: {},
                    list1: [],
                    list2: [],
                    list3: [],
                    zanClick: function(t) {
                        console.log(t);
                        var n = $(this);
                        n.hasClass("on") || (n.addClass("on"), e.addLove({
                                sid: t.sid,
                                uid: getUid()
                            },
                            function(e) {
                                0 === e.errno ? t.love = e.love: console.log(e)
                            }))
                    },
                    comClick: function(e) {
                        avalon.router.navigate("/detail/sid/" + e.sid),
                            setTimeout(function() {
                                    $("body,html").animate({
                                            scrollTop: $("#detail-form-textarea").position().top - 60
                                        },
                                        300,
                                        function() {
                                            $("#detail-form-textarea").get(0).focus()
                                        })
                                },
                                500)
                    }
                }),
                l = 3,
                u = 3,
                p = 8;
            avalon.scan(s.main.get(0), c);
            var d = null,
                f = 0,
                m = function(t, n, i) {
                    if (f++, f >= 10) return window.location.reload();
                    var o = $(".detail");
                    "none" !== o.css("display") && o.fadeOut(100),
                        document.body.scrollTop = 0,
                        c.key = n,
                        n = (n + "").split(":"),
                        c.title = n[1] || n[0],
                        s.main.stop().fadeOut(100,
                            function() {
                                e.dailyList({
                                        type: c.type = t,
                                        key: n[0],
                                        page: c.page = i
                                    },
                                    function(e) {
                                        0 === e.errno ? (e.list.length ? (c.big = e.list.splice(0, 1)[0], e.list.length > p - 1 ? (c.list1 = e.list.splice(0, l), c.list2 = e.list.splice(0, u), c.list3 = e.list) : (c.list1 = e.list, c.list2 = [], c.list3 = [])) : (c.big = {},
                                            c.list1 = [], c.list2 = [], c.list3 = []), a(e.total_page, c.page + 1, e.total_num), setTimeout(function() {
                                                s.main.stop().fadeIn(400)
                                            },
                                            100)) : console.log(e)
                                    })
                            })
                };
            return avalon.router.get("/list/:type/:key/:page",
                function(e, t, n) {
                    1 != e && 2 != e || (clearTimeout(d), d = setTimeout(function() {
                            m(e, t, n)
                        },
                        100))
                }),
                s
        }),
    define("share", [],
        function() {
            var e = $(".share"),
                t = avalon.define({
                    $id: "share",
                    text: "",
                    pic: "",
                    url: "",
                    title: "",
                    weibo: function() {
                        var e = "?url=" + encodeURIComponent(t.url) + "&title=" + encodeURIComponent(t.text) + "&pic=" + encodeURIComponent(t.pic);
                        window.open("http://v.t.sina.com.cn/share/share.php" + e)
                    },
                    qzone: function() {
                        var e = "?title=" + encodeURIComponent(t.title) + "&summary=" + encodeURIComponent(t.text) + "&url=" + encodeURIComponent(t.url) + "&pics=" + encodeURIComponent(t.pic);
                        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey" + e)
                    }
                });
            return avalon.scan(e.get(0), t),
                {
                    set: function(e, n, i, o) {
                        t.text = e,
                            t.pic = n,
                            t.url = i,
                            t.title = o
                    },
                    bind: function(e, t) {
                        setTimeout(function() {
                            var n = $(document),
                                i = function(o) {
                                    e.get(0).contains(o.target) || (n.off("click", i), i = null, t.call(this))
                                };
                            n.on("click", i)
                        })
                    }
                }
        }),
    define("detail", ["api", "tool-sound", "sentence", "share", "dep-mmRouter"],
        function(e, t, n, i) {
            avalon.filters.voice = function(e) {
                return Math.round(parseInt(e) / 1e3)
            };
            var o = {
                    main: $(".detail")
                },
                r = null,
                a = null,
                s = avalon.define({
                    $id: "detail",
                    czc: function(e, t) {
                        _czc.push(["_trackEvent", "每日一句", e, t, "", ""])
                    },
                    width: function(e) {
                        return e /= 1e3,
                            e < 5 ? 50 : e > 30 ? 300 : 10 * e
                    },
                    voice: function(e) {
                        t.set(e)
                    },
                    sid: "",
                    title: "",
                    week: [],
                    banner: "",
                    lastTitle: "",
                    nextTitle: "",
                    content: "",
                    src: "",
                    note: "",
                    translation: "",
                    watch: "",
                    zan: "",
                    com: "",
                    hasZan: !1,
                    ifLogined: checkLoginState(),
                    zanClick: function() {
                        var t = $(this);
                        t.hasClass("on") || (s.hasZan = !0, e.addLove({
                                sid: s.sid,
                                uid: getUid()
                            },
                            function(e) {
                                0 === e.errno ? s.zan = e.love: console.log(e)
                            }))
                    },
                    comClick: function() {
                        $("body,html").animate({
                                scrollTop: $("#detail-form-textarea").position().top - 60
                            },
                            300,
                            function() {
                                $("#detail-form-textarea").get(0).focus()
                            })
                    },
                    shareClick: function() {
                        var e = $(".detail-content-share");
                        i.set(s.content + " " + s.note, "http://cdn.iciba.com/web/news/longweibo/imag/" + s.title + ".jpg", "http://news.iciba.com/views/dailysentence/daily.html#!/detail/title/" + s.title, "金山词霸 - 每日一句"),
                            e.addClass("on"),
                            i.bind(e,
                                function() {
                                    e.removeClass("on")
                                })
                    },
                    tags: [],
                    recommends: [],
                    login: function(e) {
                        createIframe(e)
                    },
                    limite: 140,
                    input: function() {
                        var e = $(this),
                            t = e.val();
                        t.length > 140 ? (e.val(t.substr(0, 140)), s.limite = 0) : s.limite = 140 - t.length
                    },
                    submit: function() {
                        var t = $("#detail-form-textarea").val();
                        t && (checkLoginState() ? e.postOne({
                                client: 1,
                                uid: getUid(),
                                zid: 14,
                                wid: s.sid,
                                retype: 1,
                                text: t,
                                contentType: 1
                            },
                            function(e) {
                                0 === e.errno && (s.comment = [], s.commentTab = "List", p(), input.val(""), $("body,html").animate({
                                        scrollTop: $(".detail-comment").position().top - 50
                                    },
                                    400))
                            }) : createIframe("login"))
                    },
                    comment: [],
                    commentTab: "Hot",
                    tab: function(e) {
                        s.commentTab = e,
                            s.comment = [],
                            p()
                    },
                    reply: function(e, t) {
                        r = e,
                            a = t,
                            s.placeholder = "回复" + t + ":",
                            $(".detail-comment-textarea").hide(),
                            $(this).closest(".detail-comment-item").find(".detail-comment-textarea").show().find(".detail-comment-textarea-main").val("").get(0).focus()
                    },
                    replyMore: function(t) {
                        var n = $(this),
                            i = 0;
                        t.replyList.length && (i = t.replyList[t.replyList.length - 1].id),
                            e.getReply({
                                    wid: t.comment.wid,
                                    zid: t.comment.zid,
                                    commentId: t.comment.id,
                                    id: i,
                                    count: 8
                                },
                                function(e) {
                                    if (0 === e.errno) {
                                        var i = e.content || [];
                                        t.replyList.pushArray(i),
                                        i.length < 8 && n.remove()
                                    } else console.log(e)
                                })
                    },
                    replyZan: function(t) {
                        var n = $(this);
                        n.hasClass("on") || (n.addClass("on"), e.postOne({
                                commentId: t.comment.id,
                                wid: t.comment.wid,
                                uid: getUid(),
                                retype: 2,
                                fname: t.comment.userName,
                                fid: t.comment.fid,
                                text: "",
                                contentType: 3
                            },
                            function(e) {
                                console.log(e, t),
                                    0 === e.errno ? t.praiseCount += 1 : console.log(e)
                            }))
                    },
                    placeholder: "",
                    replySubmit: function(t) {
                        if (checkLoginState()) {
                            var n = $(this).prev(),
                                i = n.val();
                            if (!i) return;
                            e.postOne({
                                    commentId: t.comment.id,
                                    wid: t.comment.wid,
                                    uid: getUid(),
                                    retype: 2,
                                    fname: a,
                                    fid: r,
                                    text: i,
                                    contentType: 1
                                },
                                function(e) {
                                    0 === e.errno ? (s.comment = [], p()) : console.log(e)
                                })
                        } else createIframe("login")
                    },
                    ifMore: !0,
                    more: function() {
                        p()
                    }
                });
            avalon.scan(o.main.get(0), s);
            var c = $(".detail-recommend"),
                l = function(t) {
                    e.getRelationBySid({
                            sid: t
                        },
                        function(e) {
                            0 === e.errno && (s.recommends = e.list, setTimeout(function() {
                                    c.fadeIn()
                                },
                                100))
                        })
                },
                u = $(".detail-comment"),
                p = function(t) {
                    var n;
                    n = s.comment.length ? s.comment[s.comment.length - 1].comment.id: 0,
                        e["get" + s.commentTab]({
                                wid: t || s.sid,
                                count: 5,
                                id: n
                            },
                            function(e) {
                                0 === e.errno && (s.comment.pushArray(e.content || []), s.ifMore = !(s.comment.length < 5), setTimeout(function() {
                                        u.fadeIn()
                                    },
                                    100))
                            })
                },
                d = null,
                f = function(t, i) {
                    var r = $(".list");
                    "none" !== r.css("display") && r.fadeOut(100),
                        document.body.scrollTop = 0;
                    var a = {};
                    a[t] = i,
                        c.hide(),
                        u.hide(),
                        s.comment = [],
                        o.main.stop().fadeOut(100,
                            function() {
                                e.getdetail(a,
                                    function(e) {
                                        0 === e.errno ? (s.sid = e.sid, s.title = e.title, s.week = e.week_info, s.banner = e.picture2 || e.picture, s.content = e.content, s.src = e.tts, s.note = e.note, s.translation = e.translation, s.watch = e.s_pv, s.zan = e.love, s.com = e.comment_count, s.hasZan = 1 === e.loveFlag, s.tags = e.tags, s.lastTitle = e.last_title, s.nextTitle = e.next_title, setTimeout(function() {
                                                o.main.stop().fadeIn(400),
                                                    l(e.sid),
                                                    p(e.sid)
                                            },
                                            100)) : 10010 === e.errno ? n.success(function(e) {
                                            avalon.router.navigate("/detail/title/" + e.title)
                                        }) : console.log(e)
                                    })
                            })
                };
            return avalon.router.get("/detail/:type/:param",
                function(e, t) {
                    "sid" !== e && "title" !== e || (clearTimeout(d), d = setTimeout(function() {
                            f(e, t)
                        },
                        100))
                }),
                o
        }),
    define("recommend", ["api"],
        function(e) {
            var t = 1,
                n = function(e) {
                    for (var t = []; t.length < 4;) t = t.concat(e.splice(parseInt(Math.random() * e.length), 1));
                    return t
                },
                i = {
                    main: $(".recommend"),
                    list: $(".recommend-list"),
                    get: function() {
                        e.getRecommend({
                                page: t
                            },
                            function(e) {
                                1 === e.status ? (t++, o.list = n(e.message.data), setTimeout(function() {
                                        i.list.fadeIn(400)
                                    },
                                    100)) : console.log(e)
                            })
                    }
                },
                o = avalon.define({
                    $id: "recommend",
                    list: [],
                    change: function() {
                        i.list.fadeOut(100, i.get)
                    }
                });
            return avalon.scan(i.main.get(0), o),
                i.get(),
                i
        }),
    require(["nav", "list", "detail", "recommend", "sentence"],
        function() {
            avalon.history.start()
        }),
    define("daily",
        function() {});
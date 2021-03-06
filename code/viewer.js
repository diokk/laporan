function Viewer(c, m) {
    function P() {
        var a, g, b, d, e;
        c && (b = c.getPluginName(), d = c.getPluginVersion(), e = c.getPluginURL());
        a = document.createElement("div");
        a.id = "aboutDialogCentererTable";
        g = document.createElement("div");
        g.id = "aboutDialogCentererCell";
        s = document.createElement("div");
        s.id = "aboutDialog";
        s.innerHTML = '<h1>ViewerJS</h1><p>Open Source document viewer for webpages, built with HTML and JavaScript.</p><p>Learn more and get your own copy on the <a href="http://viewerjs.org/" target="_blank">ViewerJS website</a>.</p>' +
                (c ? '<p>Using the <a href = "' + e + '" target="_blank">' + b + '</a> (<span id = "pluginVersion">' + d + "</span>) plugin to show you this document.</p>" : "") + '<p>Supported by <a href="http://nlnet.nl" target="_blank"><br><img src="images/nlnet.png" width="160" height="60" alt="NLnet Foundation"></a></p><p>Made by <a href="http://kogmbh.com" target="_blank"><br><img src="images/kogmbh.png" width="172" height="40" alt="KO GmbH"></a></p><button id = "aboutDialogCloseButton" class = "toolbarButton textButton">Close</button>';
        w.appendChild(a);
        a.appendChild(g);
        g.appendChild(s);
        a = document.createElement("button");
        a.id = "about";
        a.className = "toolbarButton textButton about";
        a.title = "About";
        a.innerHTML = "ViewerJS";
        Q.appendChild(a);
        a.addEventListener("click", function() {
            w.style.display = "block"
        });
        document.getElementById("aboutDialogCloseButton").addEventListener("click", function() {
            w.style.display = "none"
        })
    }
    function D(a) {
        var g = R.options, b, c = !1, d;
        for (d = 0; d < g.length; d += 1)
            b = g[d], b.value !== a ? b.selected = !1 : c = b.selected = !0;
        return c
    }
    function E(a,
            g) {
        if (a !== b.getZoomLevel()) {
            b.setZoomLevel(a);
            var c = document.createEvent("UIEvents");
            c.initUIEvent("scalechange", !1, !1, window, 0);
            c.scale = a;
            c.resetAutoSettings = g;
            window.dispatchEvent(c)
        }
    }
    function F() {
        var a;
        if (c.onScroll)
            c.onScroll();
        c.getPageInView && (a = c.getPageInView()) && (n = a, document.getElementById("pageNumber").value = a)
    }
    function G(a) {
        window.clearTimeout(H);
        H = window.setTimeout(function() {
            F()
        }, a)
    }
    function h(a, b) {
        var e, f;
        if (e = "custom" === a ? parseFloat(document.getElementById("customScaleOption").textContent) /
                100 : parseFloat(a))
            E(e, !0);
        else {
            e = d.clientWidth - t;
            f = d.clientHeight - t;
            switch (a) {
                case "page-actual":
                    E(1, b);
                    break;
                case "page-width":
                    c.fitToWidth(e);
                    break;
                case "page-height":
                    c.fitToHeight(f);
                    break;
                case "page-fit":
                    c.fitToPage(e, f);
                    break;
                case "auto":
                    c.isSlideshow() ? c.fitToPage(e + t, f + t) : c.fitSmart(e)
            }
            D(a)
        }
        G(300)
    }
    function S(a) {
        var b;
        return-1 !== ["auto", "page-actual", "page-width"].indexOf(a) ? a : (b = parseFloat(a)) && I <= b && b <= J ? a : T
    }
    function U(a) {
        a = parseInt(a, 10);
        return isNaN(a) ? 1 : a
    }
    function u() {
        p = !p;
        k && !p && b.togglePresentationMode()
    }
    function x() {
        v && (y.className = "viewer-touched", window.clearTimeout(K), K = window.setTimeout(function() {
            y.className = ""
        }, 5E3))
    }
    function z() {
        l.classList.add("viewer-touched");
        q.classList.add("viewer-touched");
        window.clearTimeout(L);
        L = window.setTimeout(function() {
            A()
        }, 5E3)
    }
    function A() {
        l.classList.remove("viewer-touched");
        q.classList.remove("viewer-touched")
    }
    function B() {
        l.classList.contains("viewer-touched") ? A() : z()
    }
    function M(a) {
        blanked.style.display = "block";
        blanked.style.backgroundColor = a;
        A()
    }
    function e(a,
            b) {
        var c = document.getElementById(a);
        c.addEventListener("click", function() {
            b();
            c.blur()
        })
    }
    var b = this, t = 40, I = 0.25, J = 4, T = "auto", k = !1, p = !1, N = !1, v = !1, C, f = document.getElementById("viewer"), d = document.getElementById("canvasContainer"), y = document.getElementById("overlayNavigator"), l = document.getElementById("titlebar"), q = document.getElementById("toolbarContainer"), O = document.getElementById("toolbarLeft"), V = document.getElementById("toolbarMiddleContainer"), R = document.getElementById("scaleSelect"), w = document.getElementById("dialogOverlay"),
            Q = document.getElementById("toolbarRight"), s, r = [], n, H, K, L;
    this.initialize = function() {
        var a;
        a = S(m.zoom);
        C = m.documentUrl;
        document.title = m.title;
        var g = document.getElementById("documentName");
        g.innerHTML = "";
        g.appendChild(g.ownerDocument.createTextNode(m.title));
        c.onLoad = function() {
            document.getElementById("pluginVersion").innerHTML = c.getPluginVersion();
            (v = c.isSlideshow()) ? (d.classList.add("slideshow"), O.style.visibility = "visible") : (V.style.visibility = "visible", c.getPageInView && (O.style.visibility = "visible"));
            N = !0;
            r = c.getPages();
            document.getElementById("numPages").innerHTML = "of " + r.length;
            b.showPage(U(m.startpage));
            h(a);
            d.onscroll = F;
            G()
        };
        c.initialize(d, C)
    };
    this.showPage = function(a) {
        0 >= a ? a = 1 : a > r.length && (a = r.length);
        c.showPage(a);
        n = a;
        document.getElementById("pageNumber").value = n
    };
    this.showNextPage = function() {
        b.showPage(n + 1)
    };
    this.showPreviousPage = function() {
        b.showPage(n - 1)
    };
    this.download = function() {
        var a = C.split("#")[0];
        window.open(a + "#viewer.action=download", "_parent")
    };
    this.toggleFullScreen = function() {
        p ?
                document.exitFullscreen ? document.exitFullscreen() : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() : f.requestFullscreen ? f.requestFullscreen() : f.mozRequestFullScreen ? f.mozRequestFullScreen() : f.webkitRequestFullscreen ? f.webkitRequestFullscreen() : f.webkitRequestFullScreen ?
                f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : f.msRequestFullscreen && f.msRequestFullscreen()
    };
    this.togglePresentationMode = function() {
        var a = document.getElementById("overlayCloseButton");
        k ? ("block" === blanked.style.display && (blanked.style.display = "none", B()), l.style.display = q.style.display = "block", a.style.display = "none", d.classList.remove("presentationMode"), d.onmouseup = function() {
        }, d.oncontextmenu = function() {
        }, d.onmousedown = function() {
        }, h("auto"), v = c.isSlideshow()) : (l.style.display = q.style.display =
                "none", a.style.display = "block", d.classList.add("presentationMode"), v = !0, d.onmousedown = function(a) {
            a.preventDefault()
        }, d.oncontextmenu = function(a) {
            a.preventDefault()
        }, d.onmouseup = function(a) {
            a.preventDefault();
            1 === a.which ? b.showNextPage() : b.showPreviousPage()
        }, h("page-fit"));
        k = !k
    };
    this.getZoomLevel = function() {
        return c.getZoomLevel()
    };
    this.setZoomLevel = function(a) {
        c.setZoomLevel(a)
    };
    this.zoomOut = function() {
        var a = (b.getZoomLevel() / 1.1).toFixed(2), a = Math.max(I, a);
        h(a, !0)
    };
    this.zoomIn = function() {
        var a =
                (1.1 * b.getZoomLevel()).toFixed(2), a = Math.min(J, a);
        h(a, !0)
    };
    (function() {
        P();
        c && (b.initialize(), document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitCancelFullScreen || document.msExitFullscreen || (document.getElementById("fullscreen").style.visibility = "hidden", document.getElementById("presentation").style.visibility = "hidden"), e("overlayCloseButton", b.toggleFullScreen), e("fullscreen", b.toggleFullScreen), e("presentation", function() {
            p ||
                    b.toggleFullScreen();
            b.togglePresentationMode()
        }), document.addEventListener("fullscreenchange", u), document.addEventListener("webkitfullscreenchange", u), document.addEventListener("mozfullscreenchange", u), document.addEventListener("MSFullscreenChange", u), e("download", b.download), e("zoomOut", b.zoomOut), e("zoomIn", b.zoomIn), e("previous", b.showPreviousPage), e("next", b.showNextPage), e("previousPage", b.showPreviousPage), e("nextPage", b.showNextPage), document.getElementById("pageNumber").addEventListener("change",
                function() {
                    b.showPage(this.value)
                }), document.getElementById("scaleSelect").addEventListener("change", function() {
            h(this.value)
        }), d.addEventListener("click", x), y.addEventListener("click", x), d.addEventListener("click", B), l.addEventListener("click", z), q.addEventListener("click", z), window.addEventListener("scalechange", function(a) {
            var b = document.getElementById("customScaleOption"), c = D(String(a.scale));
            b.selected = !1;
            c || (b.textContent = Math.round(1E4 * a.scale) / 100 + "%", b.selected = !0)
        }, !0), window.addEventListener("resize",
                function(a) {
                    N && (document.getElementById("pageWidthOption").selected || document.getElementById("pageAutoOption").selected) && h(document.getElementById("scaleSelect").value);
                    x()
                }), window.addEventListener("keydown", function(a) {
            var c = a.keyCode;
            a = a.shiftKey;
            if ("block" === blanked.style.display)
                switch (c) {
                    case 16:
                    case 17:
                    case 18:
                    case 91:
                    case 93:
                    case 224:
                    case 225:
                        break;
                    default:
                        blanked.style.display = "none", B()
                }
            else
                switch (c) {
                    case 8:
                    case 33:
                    case 37:
                    case 38:
                    case 80:
                        b.showPreviousPage();
                        break;
                    case 13:
                    case 34:
                    case 39:
                    case 40:
                    case 78:
                        b.showNextPage();
                        break;
                    case 32:
                        a ? b.showPreviousPage() : b.showNextPage();
                        break;
                    case 66:
                    case 190:
                        k && M("#000");
                        break;
                    case 87:
                    case 188:
                        k && M("#FFF");
                        break;
                    case 36:
                        b.showPage(1);
                        break;
                    case 35:
                        b.showPage(r.length)
                    }
        }))
    })()
}
;

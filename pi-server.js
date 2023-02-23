!(function (a, b) {
    function c(b, d) {
        var e, f;
        if ("." != b[0] && "/" != b[0]) return a(b);
        if (((d = d || "root"), (e = c.resolve(b)), !e && /\.json$/i.test(b)))
            return a("./" + c.basename(b));
        if (((f = c.cache[e]), !f))
            try {
                return a(b);
            } catch (g) {
                throw Error(
                    'failed to require "' +
                    b +
                    '" from ' +
                    d +
                    "\n" +
                    g.message +
                    "\n" +
                    g.stack
                );
            }
        return (
            f.exports ||
            ((f.exports = {}), f.call(f.exports, f, f.exports, c.relative(e))),
            f.exports
        );
    }
    (c.cache = {}),
        (c.basename = a("path").basename),
        (c.resolve = function (b) {
            var d, e, f, g;
            if ("." != b[0]) return a.resolve(b);
            for (
                d = "/" === b.slice(-1) ? b : b + "/",
                e = [b, b + ".js", d + "index.js", b + ".json", d + "index.json"],
                f = 0;
                (g = e[f]);
                f++
            )
                if (c.cache[g]) return g;
        }),
        (c.register = function (a, b) {
            c.cache[a] = b;
        }),
        (c.relative = function (a) {
            function b(b) {
                var d, e, f, g, h;
                if ("." != b[0]) return c(b);
                for (
                    d = a.split("/"), e = b.split("/"), d.pop(), f = 0, g = e.length;
                    g > f;
                    f += 1
                )
                    (h = e[f]), ".." == h ? d.pop() : "." != h && d.push(h);
                return c(d.join("/"), a);
            }
            return (b.resolve = c.resolve), (b.cache = c.cache), b;
        }),
        c.register("./pi-server.js", function (a, b, c) {
            "use strict";
            function s(a, b, c) {
                b.header("Access-Control-Allow-Origin", a.headers.origin),
                    b.header("Access-Control-Allow-Credentials", !0),
                    b.header(
                        "Access-Control-Allow-Methods",
                        "GET,PUT,POST,DELETE,OPTIONS"
                    ),
                    b.header(
                        "Access-Control-Allow-Headers",
                        "Authorization,Content-Type,Content-Length, X-Requested-With,origin,accept"
                    ),
                    "OPTIONS" == a.method ? b.send(200) : c();
            }
            function t(a) {
                a.all("*", function (a, b, c) {
                    return a.connection.localAddress !== a.connection.remoteAddress &&
                        k.getSettingsData().disableWebUi
                        ? b.status(403).end("forbidden")
                        : (b.setHeader("Last-Modified", new Date().toUTCString()),
                            (a.installation = ""),
                            void c());
                }),
                    a.get("/api/files", h.index),
                    a.get("/api/files/:file", h.getFileDetails),
                    a.post("/api/files", h.createFiles),
                    a.post("/api/postupload", h.updateFileDetails),
                    a.post("/api/playlistfiles", h.updatePlaylist),
                    a.post("/api/files/:file", h.updateAsset),
                    a["delete"]("/api/files/:file", h.deleteFile),
                    a.get("/api/notices/:file", h.getNotice),
                    a.post("/api/notices", h.createNotice),
                    a.post("/api/notices/:file", h.createNotice),
                    a["delete"]("/api/notices/:file", h.deleteFile),
                    a.post("/api/links", h.createLinkFile),
                    a.get("/api/links/:file", h.getLinkFileDetails),
                    a.get("/api/playlists", i.index),
                    a.get("/api/playlists/:file", i.getPlaylist),
                    a.post("/api/playlists", i.createPlaylist),
                    a.post("/api/playlists/:file", i.savePlaylist),
                    a.get("/api/tokens", j.getTokens),
                    a.post("/api/tokens", j.updateTokens),
                    a.get("/api/current-token", j.currentToken),
                    a.get("/api/rssfeed", k.getRssFeeds),
                    a.post("/api/play/playlists/:file", k.playPlaylist),
                    a.post("/api/play/files/:action", k.playFile),
                    a.post("/api/playlistmedia/:action", k.playlistMedia),
                    a.get("/api/status", k.getStatus),
                    a.post("/api/debug", k.setDebugLevel),
                    a.get("/api/testlog", k.getTestLog),
                    a.get("/api/snapshot", k.getSnapshot),
                    a.get("/api/settings", k.getSettings),
                    a.get("/api/settingsfile", k.getSettingsFile),
                    a.post("/api/pishell", k.executeShell),
                    a.post("/api/restart", k.systemRestart),
                    a.post("/api/shutdown", k.systemShutdown),
                    a.post("/api/settingsfile", k.setSettingsFile),
                    a.post("/api/settings/hostname", k.setHostname),
                    a.post("/api/settings/ethernet", k.setEthernet),
                    a.post("/api/settings/wifi", k.setWifi),
                    a.post("/api/settings/overscan", k.setOverscan),
                    a.post("/api/settings/orientation", k.setOrientation),
                    a.post("/api/settings/servername", k.setServerName),
                    a.post("/api/settings/user", k.setUser),
                    a.post("/api/settings/sleep", k.setSleepTimer),
                    a.get("/api/settings/omxVolume", k.getOMXVolume),
                    a.post("/api/settings/omxVolume", k.setOMXVolume),
                    a.post("/api/settings/mute", k.setMute),
                    a.get("/api/settings/log", k.getLog),
                    a.post("/api/settings/reset", k.factoryReset),
                    a.get("/api/settings/wifiscan", k.getWifiList),
                    a.post("/api/kioskui/:action", m.takeAction),
                    a.post("/api/piswupdate/", k.piswupdate),
                    a.get("/api/device", k.getDeviceId),
                    a.get("/api/schedule", k.getSchedule),
                    a.post("/api/schedule", k.setSchedule),
                    a.get("/api/radar", k.getRadar),
                    a.post("/api/radar", k.setRadar),
                    a.get("*", function (a, b) {
                        b.render("index-pi.html");
                    });
            }
            var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
            (process.env.NODE_ENV = "pi"),
                (d = c("express")),
                (e = c("http-auth")),
                (f = c("./config/config")),
                (g = c("socket.io-client")),
                (h = c("./app/controllers/assets")),
                (i = c("./app/controllers/playlists")),
                (j = c("./app/controllers/token")),
                (k = c("./app/controllers/pi-main")),
                (l = c("./app/controllers/pi-viewer")),
                (m = c("./app/controllers/kiosk-ui")),
                (n = process.version.slice(1, process.version.indexOf("."))),
                (o = n > 0 ? c("919.socket.io-client") : null),
                (p = e.basic({ realm: "pi", file: f.root + "/htpasswd" })),
                (q = d()),
                q.use(s),
                q.use(d["static"](f.root + "/public")),
                q.use(function (a, b, d) {
                    -1 == a.host.indexOf("localhost")
                        ? e.connect
                            ? e.connect(p)(a, b, d)
                            : c("http-auth-connect")(p)(a, b, d)
                        : d();
                }),
                q.use("/media", d["static"](f.mediaDir)),
                q.engine("html", c("ejs").renderFile),
                q.set("views", f.viewDir),
                q.use(d.favicon(f.root + "/public/app/img/favicon.ico")),
                q.configure(function () {
                    q.use(d.limit("990mb")),
                        q.use(d.bodyParser({ uploadDir: f.mediaDir })),
                        q.use(d.methodOverride()),
                        q.use(q.router),
                        q.use(function (a, b, c, d) {
                            return ~a.message.indexOf("not found")
                                ? d()
                                : (console.error(a.stack),
                                    void c.status(500).render("500.html"));
                        }),
                        q.use(function (a, b) {
                            b.status(404).render("404.html", { url: a.originalUrl });
                        });
                }),
                t(q),
                k.startClient(g, o),
                (r = q.listen(f.port, function () {
                    console.log("Express server listening on port " + f.port);
                })),
                l.startChromeSocket(r);
        }),
        c.register("./app/controllers/pi-main.js", function (a, b, c) {
            "use strict";
            function fa(a) {
                (a = a || "info"),
                    "toggle" == a && (a = "debug" == a ? "info" : "debug"),
                    "debug" == s.debugLevel &&
                    "debug" != a &&
                    n.clearDisplayOnscreenMessage(),
                    (s.debugLevel = a),
                    s.log("error", "Debug level changed to " + s.debugLevel);
            }
            function la() {
                var a, b, c;
                for (
                    G = [],
                    L = [],
                    M = [],
                    I = [],
                    J = [],
                    K = [],
                    H = [],
                    F = [],
                    a = 0,
                    b = w.deployedPlaylists.length;
                    b > a;
                    a++
                )
                    (c = w.deployedPlaylists[a]),
                        c.settings && c.settings.event && c.settings.event.enable
                            ? I.push(c)
                            : c.settings &&
                                c.settings.domination &&
                                c.settings.domination.enable
                                ? (L.push(c), M.push(-1))
                                : c.settings && c.settings.ads && c.settings.ads.adPlaylist
                                    ? G.push(c)
                                    : c.settings && c.settings.audio && c.settings.audio.enable
                                        ? H.push(c)
                                        : c.settings && c.settings.keyPress && c.settings.keyPress.enable
                                            ? (J.push(c), K.push(!1))
                                            : F.push(c);
            }
            function ra(a) {
                var b,
                    c,
                    d = function (b) {
                        var c,
                            d = x.cpuSerialNumber,
                            e =
                                d.slice(0, 4) +
                                "-" +
                                d.slice(4, 8) +
                                "-" +
                                d.slice(8, 12) +
                                "-" +
                                d.slice(12, 16);
                        (c = k.compile(b)({ playerId: e, myplayer: x, systemIP: B })),
                            f.writeFile(l.mediaPath + "_emptynotice.html", c, function (b) {
                                b && s.log("error", b), a && a();
                            }),
                            f.writeFile(l.mediaPath + "_system_notice.html", c, function (a) {
                                a && s.log("error", "_system_notice.html write error, " + a);
                            });
                    };
                f.exists(l.mediaPath + "welcome.ejs", function (a) {
                    b = a ? l.mediaPath + "welcome.ejs" : "./app/views/emptynotice.ejs";
                    try {
                        (c = f.readFileSync(b, "utf8")), d(c);
                    } catch (e) {
                        (c = f.readFileSync("./app/views/emptynotice.ejs", "utf8")), d(c);
                    }
                });
            }
            function Ga() {
                return ya ? ua && ua.socket && ua.socket.sessionid : ua && ua.id;
            }
            function Ha() {
                return ya
                    ? ua && ua.socket && ua.socket.sessionid && ua.socket.connected
                    : ua && ua.id && ua.connected;
            }
            function Ia() {
                if (va) {
                    try {
                        va.removeAllListeners(), va.disconnect();
                    } catch (a) {
                        s.log("error", "secondary socket disconnect exception: " + a.code);
                    }
                    va = null;
                }
            }
            function Ja(a) {
                var e;
                a &&
                    ((ua =
                        -1 === W.indexOf("pisignage.com") || (Aa && Ba) || ya
                            ? wa(a, {
                                path: "/newsocket.io",
                                transports: ["polling", "websocket"],
                                rejectUnauthorized: !1,
                            })
                            : wa(a, {
                                path: "/wssocket.io",
                                transports: ["websocket"],
                                rejectUnauthorized: !1,
                            })),
                        (va = xa.connect(m.config_server, { "force new connection": !0 })),
                        va.on("connect", function () {
                            (za = !0),
                                s.log("info", "socket.io works with 0.9.19"),
                                Ca ? b.startClient() : Ia();
                        })),
                    s.log(
                        "info",
                        "starting socketio to " +
                        a +
                        " with ver: " +
                        (ya ? "0.9.19" : "new")
                    ),
                    ua.on("connect", function () {
                        ya ? (za = !0) : (Aa = !0),
                            (Da = !0),
                            (Ea = !1),
                            s.log(
                                "info",
                                "socket.io: connected to server " +
                                Ga() +
                                "with ver: " +
                                (ya ? "0.9.19" : "new")
                            ),
                            Oa(),
                            (x.connectionStatus = "Connected"),
                            Fa && (Fa--, 0 == B.length ? ($(), _(ra)) : ra()),
                            s.testLog("socket", "connected");
                    }),
                    ua.on("reconnect", function () { }),
                    ua.on("reconnect_attempt", function () { }),
                    ua.on("reconnect_failed", function (a) {
                        (Da || Ea) &&
                            s.log("error", "socket.io: reconnect failed event: " + a.message),
                            (Ea = !1);
                    }),
                    ua.on("reconnect_error", function () { }),
                    ua.on("connect_error", function (a) {
                        (Da || Ea) &&
                            s.log("error", "socket.io: connect error event: " + a.message),
                            (Da = !1),
                            (Ea = !1),
                            (Ca = !0),
                            a.message &&
                            -1 !== a.message.indexOf("websocket error") &&
                            Ba !== !0 &&
                            ((Ba = !0), b.startClient()),
                            ya || Aa || !za || b.startClient();
                    }),
                    ua.on("connect_timeout", function () {
                        (Da || Ea) && s.log("error", "socket.io: connect timeout event"),
                            (Da = !1),
                            (Ea = !1);
                    }),
                    ua.on("connect_failed", function () {
                        (Da || Ea) &&
                            s.log("error", "socket.io: connect failed event" + Ga()),
                            (Da = !1),
                            (Ea = !1);
                    }),
                    ua.on("error", function (a) {
                        s.log("error", "socket.io: error  event" + Ga() + ";" + a),
                            (Da = !1);
                    }),
                    ua.on("disconnect", function (a) {
                        s.log("error", "socket.io: disconnect  event" + Ga() + ";" + a),
                            (Da = !1),
                            (x.connectionStatus = "Disconnected"),
                            Fa && (Fa--, ra()),
                            "io server disconnect" === a && ua.connect();
                    }),
                    ua.on("status", function () {
                        Oa();
                    }),
                    ua.on("shell", function (a) {
                        Ua(a);
                    }),
                    ua.on("config", function (a) {
                        var g,
                            h,
                            i,
                            k,
                            l,
                            m,
                            e = function (b) {
                                return void 0 !== a[b] && a[b] != x[b]
                                    ? (s.log(
                                        "info",
                                        "changed settings for " +
                                        b +
                                        " from " +
                                        x[b] +
                                        " to " +
                                        a[b]
                                    ),
                                        (x[b] = a[b]),
                                        (h = !0),
                                        !0)
                                    : !1;
                            };
                        (Da = !0),
                            Qa(),
                            a.currentTime &&
                            a.currentTime - Date.now() > 12e4 &&
                            (s.log(
                                "info",
                                "adjusting the time to server time " +
                                new Date(a.currentTime).toLocaleString()
                            ),
                                d(
                                    "sudo date -s @" + ~~(a.currentTime / 1e3),
                                    function (a, b, c) {
                                        a && (console.log(a), console.log(c), console.log(b));
                                    }
                                )),
                            (g = !1),
                            (h = !1),
                            a.installation &&
                            a.secret &&
                            (a.installation != x.installation || a.secret != x.secret) &&
                            (g = !0),
                            e("name") && t.registerHostnameChange(a.name),
                            (x.currentVersion = a.currentVersion),
                            (x.assets = a.assets),
                            (x.loadPlaylistOnCompletion = a.loadPlaylistOnCompletion || !1),
                            a.installation &&
                            ((x.installation = a.installation),
                                !a.authCredentials ||
                                (y.user == a.authCredentials.user &&
                                    y.password == a.authCredentials.password) ||
                                ((y.user = a.authCredentials.user),
                                    (y.password = a.authCredentials.password),
                                    f.writeFileSync(
                                        "/home/pi/.wgetrc",
                                        "user = " + y.user + "\npassword = " + y.password
                                    ),
                                    (i = c("apache-md5")(a.authCredentials.password)),
                                    f.writeFileSync(
                                        v.root + "/htpasswd",
                                        a.authCredentials.user + ":" + i
                                    ))),
                            void 0 === a.animationEnable ||
                            (a.animationEnable == x.animationEnable &&
                                a.animationType == x.animationType) ||
                            (a.animationEnable
                                ? ((x.animationEnable = !0),
                                    (x.animationType = a.animationType),
                                    n.setAnimationStatus(x.animationEnable, x.animationType))
                                : ((x.animationEnable = !1),
                                    (x.animationType = null),
                                    n.setAnimationStatus(!1, null, null)),
                                (h = !0)),
                            e("sshPassword") && t.changeSshPassword(x.sshPassword),
                            e("signageBackgroundColor") &&
                            n.setBackgroundColor(x.signageBackgroundColor),
                            (k = e("imageLetterboxed")),
                            (e("resizeAssets") || k) &&
                            n.setImageResize(ma(x.resizeAssets, x.imageLetterboxed)),
                            e("videoKeepAspect") && n.setVideoKeepAspect(x.videoKeepAspect),
                            e("videoShowSubtitles") &&
                            n.setVideoShowSubtitles(x.videoShowSubtitles),
                            e("systemMessagesHide") &&
                            n.setSystemMessagesHide(x.systemMessagesHide),
                            e("forceTvOn"),
                            e("disableCECPowerCheck"),
                            e("hideWelcomeNotice"),
                            e("omxVolume") && n.setOMXVolume(x.omxVolume),
                            e("timeToStopVideo") && n.setTimeToStopVideo(x.timeToStopVideo),
                            e("enableLog") && n.setAssetLogs(x.enableLog),
                            e("disablePlayerDownloadOnModem"),
                            e("reportIntervalMinutes"),
                            e("enableYoutubeDl") && n.setYoutubeDl(x.enableYoutubeDl),
                            (l = e("mpvAudioDelay")),
                            (e("enableMpv") || l) && n.setMpv(x.enableMpv, x.mpvAudioDelay),
                            e("combineDefaultPlaylist"),
                            e("playAllEligiblePlaylists"),
                            e("shuffleContent") && n.setShuffleContent(x.shuffleContent),
                            e("alternateContent"),
                            e("urlReloadDisable") &&
                            n.setUrlReloadDisable(x.urlReloadDisable),
                            e("keepWeblinksInMemory") &&
                            n.setWeblinkCacheEnable(x.keepWeblinksInMemory),
                            e("enablePio") && n.enablePio(x.enablePio),
                            e("disableAp") &&
                            x.disableAp &&
                            ((m = "--disable-access-point"),
                                d(v.systemScript + m, function (a, b, c) {
                                    a || c
                                        ? s.log("error", "wifi AP mode change error : " + a)
                                        : s.log("info", b);
                                })),
                            e("disableWarnings") &&
                            ((m =
                                "--change-config-txt avoid_warnings " +
                                (x.disableWarnings ? "1" : "0")),
                                d(v.systemScript + m, function (a, b, c) {
                                    a || c
                                        ? s.log("error", "avoid_warnings change error : " + a)
                                        : s.log("info", b);
                                })),
                            e("disableWebUi"),
                            ((a.logo && (a.logo != x.logo || !x.logo)) ||
                                (!a.logo && x.logo) ||
                                a.logox != x.logox ||
                                a.logoy != x.logoy) &&
                            ((x.logo = a.logo),
                                (x.logox = a.logox),
                                (x.logoy = a.logoy),
                                ub(),
                                (h = !0)),
                            ((a.orientation &&
                                x.orientation &&
                                a.orientation != x.orientation) ||
                                (a.resolution &&
                                    x.resolution &&
                                    a.resolution != x.resolution)) &&
                            kb(a),
                            !a.sleep ||
                            (x.sleep &&
                                a.sleep.enable == x.sleep.enable &&
                                a.sleep.ontime == x.sleep.ontime &&
                                a.sleep.offtime == x.sleep.offtime) ||
                            ((x.sleep = a.sleep), qb(x.sleep), (h = !0)),
                            !a.reboot ||
                            (x.reboot &&
                                a.reboot.enable == x.reboot.enable &&
                                a.reboot.time == x.reboot.time) ||
                            ((x.reboot = a.reboot), vb(x.reboot), (h = !0)),
                            !a.showClock ||
                            (x.showClock && j.isEqual(a.showClock, x.showClock)) ||
                            ((x.showClock = a.showClock),
                                n.setDisplayClock(x.showClock, x.emergencyMessage),
                                (h = !0)),
                            !a.kioskUi ||
                            (x.kioskUi && j.isEqual(a.kioskUi, x.kioskUi)) ||
                            ((x.kioskUi = a.kioskUi), q.setupUi(x.kioskUi), (h = !0)),
                            !a.emergencyMessage ||
                            (x.emergencyMessage &&
                                j.isEqual(a.emergencyMessage, x.emergencyMessage)) ||
                            ((x.emergencyMessage = a.emergencyMessage),
                                n.setDisplayClock(x.showClock, x.emergencyMessage),
                                x.emergencyMessage.enable &&
                                t.getCecStatus(!0, !0, function (a) {
                                    w.cecTvStatus = a;
                                }),
                                (h = !0)),
                            a.TZ &&
                            x.TZ != a.TZ &&
                            ((x.TZ = a.TZ),
                                d(
                                    "sed -i  \"s|.*TZ=.*|TZ='" +
                                    a.TZ +
                                    "'; export TZ|\"  /home/pi/.bash_profile"
                                ).on("close", function () {
                                    s.log("info", "Timezone changed to " + a.TZ),
                                        b.writeToSettings(),
                                        d("source /home/pi/.bashrc");
                                })),
                            (w.groupTicker = a.groupTicker),
                            g
                                ? ((w.localControl = !1),
                                    (X.settings = X.settings.filter(function (a) {
                                        return -1 === T.indexOf(a);
                                    })),
                                    S && ((S = !1), f.unlinkSync(R)),
                                    c("../others/license-utils").checkForLicense(
                                        x.installation,
                                        x.cpuSerialNumber,
                                        function (a) {
                                            ("ttk" != x.installation && "admin" != x.installation) ||
                                                "pisignage.com" != W ||
                                                (a = !0),
                                                n.setLicense(a),
                                                (w.licensed = a),
                                                s.log("info", "license status: " + a);
                                        },
                                        W
                                    ),
                                    (x.assetsValidity = a.assetsValidity),
                                    Ra(a))
                                : !C &&
                                !E &&
                                a.playlists &&
                                a.playlists.length > 0 &&
                                (parseInt(a.lastDeployed) > w.lastUpload ||
                                    (!w.localControl &&
                                        !j.isEqual(a.playlists, w.deployedPlaylists))) &&
                                ((w.localControl = !1),
                                    s.log(
                                        "info",
                                        "*** Downloading files,Group deploy time: " +
                                        new Date(parseInt(a.lastDeployed)).toLocaleString() +
                                        ", Player upload time: " +
                                        new Date(w.lastUpload).toLocaleString()
                                    ),
                                    (x.assetsValidity = a.assetsValidity),
                                    Ta(a.playlists, null, a.assets, !0)),
                            h && b.writeToSettings();
                    }),
                    ua.on("sync", function (a, b, c, d, e, f, g, h, i, j) {
                        s.log(
                            "info",
                            "*** sync initiated at server: " + new Date().toLocaleString()
                        ),
                            p.storeEvent("player", "network", "sync initiated from server"),
                            (w.localControl = !1),
                            (w.groupTicker = c),
                            (x.assets = b),
                            (x.assetsValidity = j),
                            (x.logo = d || null),
                            (x.logox = e || 10),
                            (x.logoy = f || 10),
                            (x.combineDefaultPlaylist = g || !1),
                            (x.loadPlaylistOnCompletion = i || !1),
                            n.setOMXVolume(h),
                            Oa(!0),
                            Ta(
                                a,
                                function (a) {
                                    -1 != a && ub();
                                },
                                b,
                                !0
                            );
                    }),
                    ua.on("restart", function () {
                        e ||
                            ((e = !0),
                                s.log("info", "**** Restarting the playlist ****"),
                                ea(function () {
                                    e = !1;
                                }));
                    }),
                    ua.on("swupdate", function (a) {
                        ta(a);
                    }),
                    ua.on("snapshot", function () {
                        ga(function (a, b) {
                            Ha() && ua.emit("snapshot", { playerInfo: x, data: b });
                        });
                    }),
                    ua.on("cmd", function (a, b) {
                        switch (a) {
                            case "debuglevel":
                                fa(b.level);
                                break;
                            case "tvpower":
                                b.off ? tb() : sb();
                        }
                    }),
                    ua.on("playlist_media", function (a) {
                        s.log("info", "play_action called with action: " + a), Va(a);
                    }),
                    ua.on("setplaylist", function (a) {
                        s.log("info", "Server request to play playlist 1 time: " + a),
                            (w.playlistOn = !1),
                            (w.localControl = !0),
                            da(
                                !0,
                                a,
                                function (a, b) {
                                    Ha() &&
                                        (a
                                            ? (s.log(
                                                "error",
                                                "Error changing playlist: " +
                                                JSON.stringify(a, null, 2)
                                            ),
                                                ua.emit("setplaylist_ack", { err: a }))
                                            : (Oa(),
                                                ua.emit("setplaylist_ack", {
                                                    msg: "Started playlist",
                                                    playlist: b ? b.currentPlaylist : null,
                                                })));
                                },
                                !1,
                                !0
                            );
                    }),
                    ua.on("upload_ack", function (a) {
                        -1 == a.indexOf("forever_out") && p.deleteLog(a);
                    }),
                    ua.on("license", function (a, b) {
                        s.log(
                            "info",
                            "License download request for " +
                            a +
                            " with id : " +
                            b +
                            " received"
                        ),
                            f.unlink(l.root + "/../license_" + b + ".txt", function () {
                                yb();
                            });
                    }),
                    Na();
            }
            function Na() {
                var a = parseInt(x.reportIntervalMinutes || 5);
                (isNaN(a) || 3 > a) && (a = 5),
                    clearTimeout(Ka),
                    (Ka = setTimeout(function () {
                        Ha()
                            ? (La = 0)
                            : (La++, La >= 4 ? (Ma(), (La = 0)) : La >= 2 && b.startClient()),
                            Oa(),
                            "NTSC" == x.resolution ||
                            "PAL" == x.resolution ||
                            x.disableCECPowerCheck ||
                            t.getCecStatus(x.forceTvOn, w.tvStatus, function (a, b) {
                                (w.cecTvStatus = a), (w.piTemperature = b);
                            }),
                            (w.uptime = process.uptime()),
                            Na();
                    }, 60 * a * 1e3));
            }
            function Oa(a) {
                (w.request = !0),
                    w.playlistOn
                        ? (w.duration = Math.floor(
                            (Date.now() - w.playlistStarttime) / 6e4
                        ))
                        : (w.duration = 0),
                    Ha() &&
                    ua.emit(
                        "status",
                        j.pick(x, X.settings),
                        j.pick(w, X.config),
                        a || S || !1
                    );
            }
            function Qa() {
                clearTimeout(Pa),
                    (Pa = setTimeout(function () {
                        Ma(), Qa();
                    }, 36e5));
            }
            function Ra(a) {
                var c = a.playlists,
                    d = a.assets;
                (C = !0),
                    (x.secret = a.secret),
                    b.writeToSettings(),
                    s.log("info", "*** Changing to Group: " + a.secret),
                    p.storeEvent(
                        "player",
                        "network",
                        "going to add secret key: " + a.secret
                    ),
                    Ha() && ua.emit("secret_ack"),
                    Ta(
                        c,
                        function (a) {
                            -1 != a && (C = !1);
                        },
                        d
                    );
            }
            function Ta(a, d, i, j, k) {
                var m = Object.keys(e.networkInterfaces());
                return x.disablePlayerDownloadOnModem === !0 &&
                    -1 === m.indexOf("wlan0") &&
                    -1 === m.indexOf("eth0")
                    ? (s.log(
                        "error",
                        "Skipping download of files due to eth0/wlan0 availability"
                    ),
                        console.log(m),
                        void (
                            d && d("Skipping download since no wlan0 or eth0 is present")
                        ))
                    : (k || (Sa = 0),
                        (E = !0),
                        void o.getGroupFiles(x.installation, x.secret, function (e, k) {
                            if ((d && d(e, k), -1 != e)) {
                                if (((E = !1), (w.lastUpload = Date.now()), e)) {
                                    if (
                                        (s.log("error", "FAILED COPYING SERVER FILES:: " + e),
                                            p.storeEvent(
                                                "player",
                                                "network",
                                                "wget download ERROR, " + e
                                            ),
                                            null == k)
                                    )
                                        return void s.log(
                                            "warn",
                                            "looks like another wget cancelled this wget"
                                        );
                                    4 == k
                                        ? 5 > Sa &&
                                        ((Sa += 1),
                                            setTimeout(function () {
                                                s.log("warn", "retrying for download, attempt: " + Sa),
                                                    Ta(a, d, i, j, !0);
                                            }, 3e5 * Sa * Sa))
                                        : (Sa = 0);
                                } else
                                    s.log(
                                        "info",
                                        "COPIED SERVER FILES " + x.secret + " SUCCESSFULLY."
                                    ),
                                        p.storeEvent(
                                            "player",
                                            "network",
                                            "download done for " + x.secret
                                        ),
                                        (Sa = 0);
                                a &&
                                    a.length > 0 &&
                                    ((w.deployedPlaylists = a),
                                        la(),
                                        s.log("debug", "Deployed playlists: " + a),
                                        s.log("debug", "Deployed assets: " + i && "" + i));
                                var m = fb();
                                lb(m.selectedAds, !0),
                                    mb(m.selectedAudioPlaylist, !0),
                                    (w.currentPlaylist = m.selectedPlaylist),
                                    (w.playlistIndex = m.index),
                                    (N = m.otherSelectedPlaylists),
                                    b.writeToSettings(),
                                    b.writeToConfig(),
                                    na
                                        ? (w.playlistOn = !0)
                                        : ea(function (a) {
                                            var e, j;
                                            i &&
                                                !a &&
                                                ((e = ["_emptynotice.html", "_system_notice.html"]),
                                                    i.forEach(function (a) {
                                                        a.match(l.zipfileRegex) &&
                                                            e.push(
                                                                "_" + g.basename(a, g.extname(a)) + ".repo"
                                                            );
                                                    }),
                                                    (e = e.concat(i)),
                                                    (j = []),
                                                    f.readdir(l.mediaDir, function (a, d) {
                                                        a &&
                                                            s.log("error", "read dir error for delete files"),
                                                            h.each(
                                                                d,
                                                                function (a, b) {
                                                                    var d = l.mediaPath + a;
                                                                    -1 == e.indexOf(a) && "." != a.charAt(0)
                                                                        ? ("_" == a.charAt(0) &&
                                                                            a.match(l.repofileRegex) &&
                                                                            c("rimraf")(d, function () {
                                                                                s.log(
                                                                                    "info",
                                                                                    "removed repo directory for " + a
                                                                                );
                                                                            }),
                                                                            j.push(a),
                                                                            f.unlink(d, b))
                                                                        : b();
                                                                },
                                                                function () {
                                                                    b.updateDiskStatus(),
                                                                        j.length
                                                                            ? s.log(
                                                                                "info",
                                                                                "Change playlist,deleting files: " + j
                                                                            )
                                                                            : s.log(
                                                                                "info",
                                                                                "Change playlist,nothing to delete"
                                                                            );
                                                                }
                                                            );
                                                    }));
                                        }, j);
                            }
                        }));
            }
            function Ua(a) {
                s.log("info", "executing shell command: " + a),
                    d(
                        a,
                        {
                            encoding: "utf8",
                            timeout: 3e4,
                            maxBuffer: 20480,
                            killSignal: "SIGTERM",
                            cwd: null,
                            env: null,
                        },
                        function (b, c, d) {
                            var e = { cmd: a, err: b, stdout: c, stderr: d };
                            Ha() && ua.emit("shell_ack", e);
                        }
                    );
            }
            function Va(a, b) {
                var e,
                    d = {};
                switch (a) {
                    case "backward":
                        n.stepBackward(), (d.msg = "Stepped backward in playlist");
                        break;
                    case "forward":
                        n.stepForward(), (d.msg = "Stepped forward in playlist");
                        break;
                    case "pause":
                        (e = n.pausePlaylist()),
                            (d.msg = "Playlist is " + (e ? "paused" : "resumed")),
                            (d.isPaused = e);
                        break;
                    default:
                        d.msg = "Unknown action";
                }
                return (d.action = a), b || (Ha() && ua.emit("media_ack", d)), d;
            }
            function db() {
                var a, b;
                (Xa = new Date()),
                    (Ya = 60 * Xa.getHours() + Xa.getMinutes()),
                    (Za = Xa),
                    ($a = Za.setHours(0, 0, 0, 0)),
                    (_a = Za.getDay() + 1),
                    (ab = Za.getDate()),
                    (a = new Date(Xa.getFullYear(), 0, 1)),
                    (b = Math.floor((Xa - a) / 864e5)),
                    (bb = "" + (Math.ceil((a.getDay() + 1 + b) / 7) % 4)),
                    (cb = "" + (Math.ceil((a.getDay() + 1 + b) / 7) % 3));
            }
            function eb(a) {
                var c,
                    d,
                    b = function (a) {
                        var b = a.split(":");
                        return 2 == b.length
                            ? 60 * parseInt(b[0]) + parseInt(b[1])
                            : 1 == b.length
                                ? parseInt(b[0])
                                : 60 * parseInt(b[b.length - 2]) + parseInt(b[b.length - 1]);
                    },
                    e = !0,
                    f = 0,
                    g = 864e5;
                if (a.settings.durationEnable) {
                    if (
                        (a.settings.starttime &&
                            a.settings.endtime &&
                            a.settings.starttime > a.settings.endtime &&
                            Ya <= b(a.settings.endtime) &&
                            (f = g),
                            a.settings.startdate && $a < ba(a.settings.startdate))
                    )
                        return !1;
                    if (a.settings.enddate && ba(a.settings.enddate) + f < $a) return !1;
                }
                return a.settings.timeEnable &&
                    (a.settings.starttime &&
                        ((c = b(a.settings.starttime)), c > Ya && (e = !1)),
                        a.settings.endtime &&
                        ((d = b(a.settings.endtime)), Ya > d && (e = !1)),
                        a.settings.starttime &&
                        a.settings.endtime &&
                        a.settings.starttime > a.settings.endtime &&
                        (e = Ya >= c || d >= Ya ? !0 : !1),
                        !e)
                    ? !1
                    : !a.settings.weekdays &&
                        a.settings.weekday &&
                        a.settings.weekday != _a
                        ? !1
                        : a.settings.weekdays && -1 == a.settings.weekdays.indexOf(_a)
                            ? !1
                            : !a.settings.monthdays &&
                                a.settings.monthday &&
                                a.settings.monthday != ab
                                ? !1
                                : a.settings.monthdays && -1 == a.settings.monthdays.indexOf(ab)
                                    ? !1
                                    : (a.settings.weeknumbers &&
                                        a.settings.weeknumbers.enable &&
                                        !a.settings.weeknumbers.modulo &&
                                        (a.settings.weeknumbers.modulo = "four"),
                                        a.settings.weeknumbers &&
                                            a.settings.weeknumbers.enable &&
                                            "four" == a.settings.weeknumbers.modulo &&
                                            a.settings.weeknumbers[bb] !== !0
                                            ? (s.log(
                                                "info",
                                                "Week Number " + bb + " is not enabled for " + a.name
                                            ),
                                                !1)
                                            : a.settings.weeknumbers &&
                                                a.settings.weeknumbers.enable &&
                                                "three" == a.settings.weeknumbers.modulo &&
                                                a.settings.weeknumbers[cb] !== !0
                                                ? (s.log(
                                                    "info",
                                                    "Week Number " + cb + " is not enabled for " + a.name
                                                ),
                                                    !1)
                                                : a.settings.onlineOnly && !Ha()
                                                    ? !1
                                                    : !0);
            }
            function fb(a) {
                var j,
                    l,
                    m,
                    o,
                    p,
                    q,
                    r,
                    b = w.currentPlaylist,
                    c = !1,
                    d = !1,
                    e = !1,
                    f = !1,
                    g = [],
                    h = [],
                    i = null,
                    k = w.playlistIndex;
                if (
                    (db(),
                        !c && n.getDominationStatus() && a && ((c = !0), (f = !0)),
                        !c && L.length)
                )
                    for (l = 0, m = L.length; m > l; l++)
                        if (
                            ((j = L[l]),
                                (o = parseInt(j.settings.domination.timeInterval || 5)),
                                3 > o && (o = 3),
                                j.settings && !j.skipForSchedule)
                        )
                            if (eb(j)) {
                                if (
                                    (-1 == M[l] && (M[l] = (Ya + o) % 1440),
                                        !c && (Ya >= M[l] || Ya + 720 < M[l]))
                                ) {
                                    (b = j.name),
                                        (k = l),
                                        (c = !0),
                                        (f = !0),
                                        (M[l] = (Ya + o) % 1440);
                                    break;
                                }
                            } else M[l] = -1;
                if (!c && J.length)
                    for (p = 0, m = J.length; m > p; p++)
                        if (((j = J[p]), j.settings && !j.skipForSchedule && eb(j) && K[p]))
                            if (c) g.push(j.name);
                            else if (
                                ((b = j.name),
                                    (k = p),
                                    (c = !0),
                                    (e = !0),
                                    !x.playAllEligiblePlaylists)
                            )
                                break;
                if (!c && Q && I.length)
                    for (q = 0, m = I.length; m > q; q++)
                        if (((j = I[q]), j.settings && !j.skipForSchedule && eb(j)))
                            if (c) g.push(j.name);
                            else if (
                                ((b = j.name),
                                    (k = q),
                                    (c = !0),
                                    (d = !0),
                                    !x.playAllEligiblePlaylists)
                            )
                                break;
                if (!c && F.length)
                    for (
                        "string" == typeof F[0].name
                            ? (b = F[0].name)
                            : s.log("error", "Playlist name is not string, " + F[0].name),
                        k = 0,
                        r = 1,
                        m = F.length;
                        m > r;
                        r++
                    )
                        if (((j = F[r]), j.settings && !j.skipForSchedule && eb(j)))
                            if (c) g.push(j.name);
                            else if (
                                ((b = j.name), (k = r), (c = !0), !x.playAllEligiblePlaylists)
                            )
                                break;
                for (r = 0, m = G.length; m > r; r++)
                    (j = G[r]),
                        j.settings && !j.skipForSchedule && eb(j) && h.push(j.name);
                for (r = 0; r < H.length; r++)
                    (j = H[r]), j.settings && !j.skipForSchedule && eb(j) && (i = j.name);
                return {
                    selectedPlaylist: b,
                    selectedAudioPlaylist: i,
                    index: k,
                    selectedAds: h,
                    otherSelectedPlaylists: g,
                    isEventPlaylist: d,
                    isKeyPressPlaylist: e,
                    isDominationPlaylist: f,
                };
            }
            function hb() {
                clearTimeout(gb);
                var a = fb(!0);
                lb(a.selectedAds, !1),
                    mb(a.selectedAudioPlaylist, !1),
                    (D ||
                        (!w.localControl &&
                            (w.tvStatus || "TV_OFF" == w.currentPlaylist) &&
                            (w.currentPlaylist != a.selectedPlaylist ||
                                (!j.isEqual(N, a.otherSelectedPlaylists) &&
                                    a.isDominationPlaylist !== !0)))) &&
                    ((D = !1),
                        (w.currentPlaylist = a.selectedPlaylist),
                        (w.playlistIndex = a.index),
                        a.isDominationPlaylist !== !0 && (N = a.otherSelectedPlaylists),
                        s.log(
                            "info",
                            "Schedule is changed to playlist " + w.currentPlaylist
                        ),
                        na ? (w.playlistOn = !0) : ea(function () { })),
                    (gb = setTimeout(hb, 6e4 - (Date.now() % 6e4)));
            }
            function jb() {
                var a, b, c, d, e, f, g, h, i, j;
                if (
                    (clearTimeout(ib),
                        (a = new Date().setMinutes(0, 0, 0)),
                        (b = !1),
                        x.assetsValidity)
                )
                    for (c = 0, d = x.assetsValidity.length; d > c; c++)
                        if (
                            ((e = x.assetsValidity[c]),
                                (f = e.starthour ? parseInt(e.starthour) : 0),
                                (g = e.endhour ? parseInt(e.endhour) : 24),
                                (NaN == f || 0 > f || f > 23) && (f = 0),
                                (NaN == g || 1 > g || g > 24) && (g = 24),
                                (e.startdate && a == ba(e.startdate) + 36e5 * f) ||
                                (e.enddate && a == ba(e.enddate) + 36e5 * g))
                        ) {
                            b = !0;
                            break;
                        }
                b &&
                    (s.log(
                        "info",
                        "Asset validity changed and hence redeploying the playlist"
                    ),
                        (h = fb()),
                        lb(h.selectedAds, !0),
                        mb(h.selectedAudioPlaylist, !0),
                        na ? (w.playlistOn = !0) : ea(function () { }, !0)),
                    (i = new Date()),
                    (j = i.getSeconds() + 60 * i.getMinutes()),
                    (ib = setTimeout(jb, 1e3 * (3605 - j)));
            }
            function kb(a, b) {
                (x.orientation = a.orientation || "landscape"),
                    (x.resolution = a.resolution || "auto"),
                    t.changeDisplaySetting(x.orientation, x.resolution, function (a) {
                        a
                            ? b
                                ? b(a)
                                : s.log(
                                    "error",
                                    "Error In Display Settings" + JSON.stringify(a)
                                )
                            : f.writeFile(
                                l.settingsFile,
                                JSON.stringify(x, null, 4),
                                function (a) {
                                    b && b(a),
                                        a
                                            ? s.log("error", "error in writing to _setting.json")
                                            : (s.log(
                                                "info",
                                                "Rebooting the server after orinetation config change"
                                            ),
                                                t.reboot(),
                                                s.log("info", "_setting.json updated"));
                                }
                            );
                    });
            }
            function lb(a, b) {
                if (
                    (!j.isEqual(a, O) || b) &&
                    (n.stopAds(), (O = a), O && 0 != O.length)
                ) {
                    var c = [];
                    h.eachSeries(
                        O,
                        function (a, b) {
                            f.readFile(l.mediaPath + "__" + a + ".json", function (d, e) {
                                if (d) s.log("error", "Playlist read error: " + a);
                                else
                                    try {
                                        var f = JSON.parse(e);
                                        f.settings && f.settings.ads && f.settings.ads.adPlaylist
                                            ? (ca(f.assets),
                                                f.assets &&
                                                f.assets.length &&
                                                c.push({
                                                    files: f.assets,
                                                    interval: f.settings.ads.adInterval,
                                                    adCount: f.settings.ads.adCount,
                                                    noMainPlay: f.settings.ads.noMainPlay,
                                                }))
                                            : s.log(
                                                "error",
                                                "error no setting for advertisement playlist " + a
                                            );
                                    } catch (g) {
                                        s.log("error", "error parsing advertisement playlist " + a);
                                    }
                                b();
                            });
                        },
                        function () {
                            c.length && n.startAds(c);
                        }
                    );
                }
            }
            function mb(a, b) {
                if (!a) return void n.stopLoungeMusic();
                if (!j.isEqual(a, P) || b) {
                    if ("NTSC" == x.resolution || "PAL" == x.resolution)
                        return (
                            s.log(
                                "error",
                                " **** Can not play lounge music in Composite video(NTSC or PAL) configurations ****"
                            ),
                            void n.stopLoungeMusic()
                        );
                    (P = a),
                        f.readFile(l.mediaPath + "__" + P + ".json", function (a, b) {
                            var c, e, g;
                            if (a)
                                s.log("error", "Playlist read error: " + P + ";" + a),
                                    n.stopLoungeMusic();
                            else {
                                try {
                                    c = JSON.parse(b);
                                } catch (d) {
                                    return (
                                        s.log("error", "error parsing audio playlist " + P),
                                        void n.stopLoungeMusic()
                                    );
                                }
                                (e = c.assets.filter(function (a) {
                                    return a && a.filename && a.filename.match(l.audioRegex);
                                })),
                                    ca(e),
                                    (g = c.assets.filter(function (a) {
                                        return (
                                            a && a.filename && a.filename.match(l.radioFileRegex)
                                        );
                                    })),
                                    h.eachSeries(
                                        g,
                                        function (a, b) {
                                            var c = l.mediaPath + a.filename;
                                            f.readFile(c, "utf8", function (d, f) {
                                                if (d)
                                                    s.log(
                                                        "error",
                                                        "error in reading radio link for lounge music " + c
                                                    ),
                                                        b();
                                                else
                                                    try {
                                                        var g = JSON.parse(f);
                                                        e.push({
                                                            filename: g.link,
                                                            duration: a.duration,
                                                            type: "radio",
                                                        }),
                                                            b();
                                                    } catch (h) {
                                                        s.log(
                                                            "error",
                                                            "error in reading radio link for lounge music " +
                                                            c
                                                        ),
                                                            console.log(h),
                                                            b();
                                                    }
                                            });
                                        },
                                        function () {
                                            e.length
                                                ? n.startLoungeMusic(
                                                    e,
                                                    c.settings.audio.random,
                                                    c.settings.audio.volume,
                                                    c.settings.audio.hdmi
                                                )
                                                : (s.log(
                                                    "error",
                                                    " **** No MP3 files present to Play the lounge music****"
                                                ),
                                                    n.stopLoungeMusic());
                                        }
                                    );
                            }
                        });
                }
            }
            function qb(a) {
                var b;
                a && a.enable
                    ? (a.ontime &&
                        ((b = a.ontime.split(":")),
                            2 == b.length
                                ? (ob = 60 * parseInt(b[0]) + parseInt(b[1]))
                                : 1 == b.length && (ob = parseInt(b[0]))),
                        a.offtime &&
                        ((b = a.offtime.split(":")),
                            2 == b.length
                                ? (pb = 60 * parseInt(b[0]) + parseInt(b[1]))
                                : 1 == b.length && (pb = parseInt(b[0]))))
                    : ((ob = null), (pb = null)),
                    a && a.enable && ob ? rb() : nb && (clearTimeout(nb), sb());
            }
            function rb() {
                var b,
                    c,
                    a = !1;
                clearTimeout(nb),
                    (b = new Date()),
                    (c = 60 * b.getHours() + b.getMinutes()),
                    (a = pb > ob ? c > pb || ob > c : c > pb && ob > c),
                    a ? tb() : "TV_OFF" != w.currentPlaylist && sb(),
                    (nb = setTimeout(rb, 3e5));
            }
            function sb() {
                var a = function () {
                    ub(),
                        n.pauseOpenVg(!1),
                        n.setDisplayClock(x.showClock, x.emergencyMessage),
                        da(!0, w.currentPlaylist, function () {
                            Oa();
                        });
                };
                return w.tvStatus
                    ? void n.pauseOpenVg(!1)
                    : ((w.tvStatus = !0),
                        void ("NTSC" != x.resolution && "PAL" != x.resolution
                            ? t.tvOn(function () {
                                a();
                            })
                            : a()));
            }
            function tb() {
                w.tvStatus &&
                    ((w.tvStatus = !1),
                        n.pauseOpenVg(!0),
                        n.removeLogo(),
                        da(!1, w.currentPlaylist, function () {
                            "NTSC" != x.resolution && "PAL" != x.resolution && t.tvOff(), Oa();
                        }));
            }
            function ub() {
                if ("NTSC" != x.resolution && "PAL" != x.resolution) {
                    var a = x.edidResolution[0] - 80,
                        b = a,
                        c = 10,
                        d = f.existsSync(l.root + "/public/app/img/logo.png")
                            ? l.root + "/public/app/img/logo.png"
                            : null;
                    x.logo && ((d = x.logo), (b = x.logox || a), (c = x.logoy || 10)),
                        n.setLogo(d, b, c, !x.logo);
                }
            }
            function vb(a) {
                var e,
                    f,
                    g,
                    b = "",
                    c = [];
                d("sudo crontab -l", function (h, i, j) {
                    h || j || !i
                        ? s.log(
                            "error",
                            "Error in setting/deleting cron job; " + h + ";" + j
                        )
                        : ((c = i.split("\n")),
                            (c = c.filter(function (a) {
                                return (
                                    a.length &&
                                    (-1 == a.indexOf("piSignage") ||
                                        -1 == a.indexOf("/sbin/reboot"))
                                );
                            }))),
                        a.enable &&
                        ((e = new Date(a.time)),
                            e.setTime(e.getTime() + 60 * e.getTimezoneOffset() * 1e3),
                            (f = e.getHours()),
                            (g = e.getMinutes()),
                            c.push(g + " " + f + " * * * /sbin/reboot && echo piSignage")),
                        (b =
                            0 == c.length
                                ? "sudo crontab -r"
                                : 'echo "' + c.join("\n") + '" | sudo crontab -'),
                        console.log(b),
                        d(b, function (b, c, d) {
                            b || d
                                ? s.log(
                                    "error",
                                    "Error in setting/deleting cron job; " + b + ";" + d
                                )
                                : a.enable &&
                                s.log(
                                    "info",
                                    "*** Cron job for reboot set at " + f + ":" + g
                                );
                        });
                });
            }
            function yb() {
                setTimeout(function () {
                    process.kill(process.pid, "SIGTERM");
                }, 3e3);
            }
            var X,
                Y,
                Z,
                $,
                _,
                aa,
                ba,
                ca,
                da,
                ea,
                ga,
                ha,
                ia,
                ja,
                ka,
                ma,
                na,
                oa,
                pa,
                qa,
                sa,
                ta,
                ua,
                va,
                wa,
                xa,
                ya,
                za,
                Aa,
                Ba,
                Ca,
                Da,
                Ea,
                Fa,
                Ka,
                La,
                Ma,
                Pa,
                Sa,
                Wa,
                Xa,
                Ya,
                Za,
                $a,
                _a,
                ab,
                bb,
                cb,
                gb,
                ib,
                nb,
                ob,
                pb,
                wb,
                xb,
                d = c("child_process").exec,
                e = c("os"),
                f = c("fs"),
                g = c("path"),
                h = c("async"),
                i = c("axios"),
                j = c("lodash"),
                k = c("ejs"),
                l = c("../../config/config"),
                m = c("./package.json"),
                n = c("./pi-viewer"),
                o = c("./pi-wget"),
                p = c("./pi-events"),
                q = c("./kiosk-ui"),
                r = c("../others/restware"),
                s = c("../others/logger"),
                t = c("../others/system-info"),
                u = c("../others/rss-service"),
                v = l,
                w = {
                    playlistOn: !1,
                    localControl: !1,
                    currentPlaylist: null,
                    deployedPlaylists: null,
                    playlistIndex: 0,
                    playlistStarttime: null,
                    groupTicker: {},
                    diskSpaceUsed: null,
                    diskSpaceAvailable: null,
                    duration: null,
                    tvStatus: !0,
                    cecTvStatus: !0,
                    licensed: !1,
                },
                x = {
                    cpuSerialNumber: "unknown",
                    ethMac: null,
                    wifiMac: null,
                    myIpAddress: "",
                    secret: "",
                    installation: "",
                    orientation: "",
                    resolution: "",
                    omxVolume: 100,
                    dns: { primary: "8.8.4.4", secondary: "8.8.8.8" },
                    assetsValidity: [],
                    edidResolution: [1920, 1080],
                },
                y = { user: null, password: null },
                z = !1,
                A = "",
                B = [],
                C = !1,
                D = !1,
                E = !1,
                F = [],
                G = [],
                H = [],
                I = [],
                J = [],
                K = [],
                L = [],
                M = [],
                N = [],
                O = [],
                P = null,
                Q = !1,
                R = l.root + "/config/player-config.json",
                S = !1,
                T = [
                    "sdConfigInstallation",
                    "sdConfigGroup",
                    "sdConfigTimezone",
                    "sdConfigName",
                    "sdConfigPin",
                ],
                U = l.root + "/config/temp_iface.txt",
                V = l.root + "/config/temp_wifi.txt",
                W = "";
            m.config_server &&
                (W = m.config_server
                    .trim()
                    .replace(/^http(s?):\/\//i, "")
                    .split(":")[0]),
                n.setConfigServer(W),
                (X = {
                    settings: [
                        "version",
                        "platform_version",
                        "cpuSerialNumber",
                        "myIpAddress",
                        "localName",
                        "ethMac",
                        "wifiMac",
                    ],
                    config: [
                        "playlistOn",
                        "currentPlaylist",
                        "playlistStarttime",
                        "diskSpaceUsed",
                        "diskSpaceAvailable",
                        "lastUpload",
                        "wgetBytes",
                        "wgetSpeed",
                        "syncInProgress",
                        "duration",
                        "tvStatus",
                        "request",
                        "licensed",
                        "cecTvStatus",
                        "piTemperature",
                        "uptime",
                    ],
                }),
                (Y = "stopped"),
                (Z = !1),
                ($ = function () {
                    (A = ""),
                        (B = t.getIp()),
                        B.forEach(function (a) {
                            A += a.ip + " ";
                        }),
                        (x.myIpAddress = A);
                }),
                $(),
                (_ = function (a) {
                    d("/bin/bash misc/nwdiag.sh", function (b, c) {
                        s.log("info", c);
                        try {
                            x.nwinfo = JSON.parse(c);
                        } catch (e) { }
                        a && a();
                    });
                }),
                (aa = function (a) {
                    var b = c("crypto").createCipher("aes-256-cbc", "356356356"),
                        d = b.update(a, "utf8", "hex");
                    return (d += b["final"]("hex"));
                }),
                (ba = function (a) {
                    var b = new Date(a);
                    return (
                        b.setTime(b.getTime() + 60 * b.getTimezoneOffset() * 1e3),
                        b.getTime()
                    );
                }),
                (ca = function (a) {
                    var b = new Date().setMinutes(0, 0, 0);
                    x.assetsValidity &&
                        x.assetsValidity.forEach(function (c) {
                            var f,
                                d = c.starthour ? parseInt(c.starthour) : 0,
                                e = c.endhour ? parseInt(c.endhour) : 24;
                            if (
                                ((NaN == d || 0 > d || d > 23) && (d = 0),
                                    (NaN == e || 1 > e || e > 24) && (e = 24),
                                    (c.startdate && b < ba(c.startdate) + 36e5 * d) ||
                                    (c.enddate && b >= ba(c.enddate) + 36e5 * e))
                            )
                                for (f = a.length - 1; f >= 0; f--)
                                    a[f].filename == c.name &&
                                        (s.log("info", "Removing " + c.name + " for validity"),
                                            a.splice(f, 1));
                        });
                }),
                (b.filterValidAssets = ca),
                (da = function (a, c, d, e, g) {
                    var j,
                        k,
                        m,
                        o,
                        r,
                        i = function (a, c) {
                            return a
                                ? ((w.playlistOn = !1),
                                    s.log("error", "start Playlist error: " + a),
                                    p.storeEvent("player", "error", "start Playlist error: " + a),
                                    d(a))
                                : (c != w.currentPlaylist &&
                                    (s.log(
                                        "info",
                                        "*** currentPlaylist name changed from " +
                                        w.currentPlaylist +
                                        " to " +
                                        c
                                    ),
                                        Q && xb(),
                                        (w.currentPlaylist = c)),
                                    (w.playlistStarttime = Date.now()),
                                    b.writeToConfig(),
                                    (w.duration = 0),
                                    s.log(
                                        "info",
                                        "*** Changing Playlist *** to " + w.currentPlaylist
                                    ),
                                    p.storeEvent(
                                        "player",
                                        "playlist",
                                        "Changed playlist to " + w.currentPlaylist
                                    ),
                                    d(null, w));
                        };
                    return a
                        ? "TV_OFF" == c
                            ? (tb(), (Z = !0), b.writeToConfig(), d(null, w))
                            : (Z && ((Z = !1), sb()),
                                w.playlistOn
                                    ? ((j = "Already playing started"),
                                        s.log("error", j),
                                        p.storeEvent("player", "error", j),
                                        d(j))
                                    : w.tvStatus
                                        ? ((w.playlistOn = !0),
                                            (w.currentPlaylist = c || l.defaultPlaylist),
                                            void h.series(
                                                [
                                                    function (a) {
                                                        f.readFile(
                                                            l.mediaPath + "__" + w.currentPlaylist + ".json",
                                                            "utf8",
                                                            function (b, c) {
                                                                if (b || !c)
                                                                    a(
                                                                        "There seems to be no such playlist file: " +
                                                                        w.currentPlaylist +
                                                                        ";error=" +
                                                                        b
                                                                    );
                                                                else
                                                                    try {
                                                                        (k = JSON.parse(c)),
                                                                            (m = k.assets),
                                                                            (o = null),
                                                                            a();
                                                                    } catch (d) {
                                                                        a(
                                                                            "Playlist JSON parse error: " +
                                                                            w.currentPlaylist +
                                                                            ";error=" +
                                                                            d.code
                                                                        );
                                                                    }
                                                            }
                                                        );
                                                    },
                                                    function (a) {
                                                        k.layout.indexOf("custom") >= 0 &&
                                                            f.existsSync(l.mediaPath + k.templateName)
                                                            ? f.readFile(
                                                                l.mediaPath + k.templateName,
                                                                "utf8",
                                                                function (b, c) {
                                                                    var d, e;
                                                                    if (b || !c)
                                                                        s.log(
                                                                            "error",
                                                                            " *** error in reading custom template for size calculation *** ;" +
                                                                            b
                                                                        );
                                                                    else {
                                                                        (d = c.slice(
                                                                            c.indexOf("data-properties=") + 17
                                                                        )),
                                                                            (d = d
                                                                                .slice(0, d.indexOf("}}") + 2)
                                                                                .replace(/&quot;/g, '"'));
                                                                        try {
                                                                            (e = JSON.parse(d)),
                                                                                console.log(e),
                                                                                e.main &&
                                                                                e.main.enable &&
                                                                                !k.videoWindow &&
                                                                                ((k.videoWindow = {}),
                                                                                    (k.videoWindow.xoffset = e.main.x),
                                                                                    (k.videoWindow.yoffset = e.main.y),
                                                                                    (k.videoWindow.length = e.main.w),
                                                                                    (k.videoWindow.width = e.main.h),
                                                                                    (k.videoWindow.mainzoneOnly =
                                                                                        e.main.w != e.width ||
                                                                                        e.main.h != e.height),
                                                                                    "custom" === e.resolution &&
                                                                                    ((k.videoWindow.fullscreenHeight =
                                                                                        e.height),
                                                                                        (k.videoWindow.fullscreenWidth =
                                                                                            e.width)),
                                                                                    s.log(
                                                                                        "info",
                                                                                        "changed values for video window, main"
                                                                                    )),
                                                                                ["side", "bottom", "zone4"].forEach(
                                                                                    function (a) {
                                                                                        e[a] &&
                                                                                            e[a].enable &&
                                                                                            !k.zoneVideoWindow[a] &&
                                                                                            ((k.zoneVideoWindow[a] = {}),
                                                                                                (k.zoneVideoWindow[a].xoffset =
                                                                                                    e[a].x),
                                                                                                (k.zoneVideoWindow[a].yoffset =
                                                                                                    e[a].y),
                                                                                                (k.zoneVideoWindow[a].length =
                                                                                                    e[a].w),
                                                                                                (k.zoneVideoWindow[a].width =
                                                                                                    e[a].h),
                                                                                                s.log(
                                                                                                    "info",
                                                                                                    "changed values for video window, " +
                                                                                                    a
                                                                                                ));
                                                                                    }
                                                                                ),
                                                                                s.log(
                                                                                    "info",
                                                                                    "changed values for video window"
                                                                                );
                                                                        } catch (f) {
                                                                            s.log(
                                                                                "error",
                                                                                " *** error in extracting values of custom template *** " +
                                                                                f
                                                                            );
                                                                        }
                                                                    }
                                                                    a();
                                                                }
                                                            )
                                                            : a();
                                                    },
                                                    function (a) {
                                                        var b = null;
                                                        x.combineDefaultPlaylist &&
                                                            w.currentPlaylist != w.deployedPlaylists[0].name &&
                                                            "TV_OFF" != w.deployedPlaylists[0].name
                                                            ? f.readFile(
                                                                l.mediaPath +
                                                                "__" +
                                                                w.deployedPlaylists[0].name +
                                                                ".json",
                                                                "utf8",
                                                                function (c, d) {
                                                                    if (c || !d)
                                                                        s.log(
                                                                            "error",
                                                                            " *** error in reading playlist *** " +
                                                                            w.deployedPlaylists[0].name +
                                                                            ";" +
                                                                            c
                                                                        );
                                                                    else {
                                                                        try {
                                                                            b = JSON.parse(d).assets;
                                                                        } catch (e) {
                                                                            s.log(
                                                                                "error",
                                                                                " *** error in combining default playlist *** " +
                                                                                e
                                                                            );
                                                                        }
                                                                        b && b.length > 0 && (m = b.concat(m));
                                                                    }
                                                                    a();
                                                                }
                                                            )
                                                            : a();
                                                    },
                                                    function (a) {
                                                        var b = 1;
                                                        !x.playAllEligiblePlaylists ||
                                                            (k.settings &&
                                                                k.settings.domination &&
                                                                k.settings.domination.enable)
                                                            ? a()
                                                            : h.eachSeries(
                                                                N,
                                                                function (a, c) {
                                                                    if ("TV_OFF" == a) return c();
                                                                    var d = null;
                                                                    f.readFile(
                                                                        l.mediaPath + "__" + a + ".json",
                                                                        "utf8",
                                                                        function (e, f) {
                                                                            if (e || !f)
                                                                                s.log(
                                                                                    "error",
                                                                                    " *** error in reading playlist *** " +
                                                                                    a +
                                                                                    ";" +
                                                                                    e
                                                                                );
                                                                            else {
                                                                                try {
                                                                                    d = JSON.parse(f).assets;
                                                                                } catch (g) {
                                                                                    s.log(
                                                                                        "error",
                                                                                        " *** error in combining default playlist *** " +
                                                                                        g
                                                                                    );
                                                                                }
                                                                                if (d && d.length > 0)
                                                                                    if (x.alternateContent) {
                                                                                        for (
                                                                                            var h = 0, i = d.length;
                                                                                            i > h;
                                                                                            h++
                                                                                        )
                                                                                            m.splice(
                                                                                                (h + 1) * b + h,
                                                                                                0,
                                                                                                d[h]
                                                                                            );
                                                                                        b++;
                                                                                    } else m = m.concat(d);
                                                                            }
                                                                            c();
                                                                        }
                                                                    );
                                                                },
                                                                function () {
                                                                    a();
                                                                }
                                                            );
                                                    },
                                                    function (a) {
                                                        k.settings &&
                                                            k.settings.ticker &&
                                                            k.settings.ticker.enable
                                                            ? (o = k.settings.ticker)
                                                            : w.groupTicker &&
                                                            w.groupTicker.enable &&
                                                            (o = w.groupTicker),
                                                            o &&
                                                            ((o.isRssFeed = o.rss && o.rss.enable),
                                                                (o.rssLink = o.rss && o.rss.link),
                                                                (o.rssEncodeAsBinary =
                                                                    o.rss && o.rss.encodeAsBinary),
                                                                (o.useDescription =
                                                                    o.rss && o.rss.useDescription),
                                                                (o.disabled = !1),
                                                                o.messages &&
                                                                ((o.messages = o.messages.replace(
                                                                    /__cpuid__/g,
                                                                    x.cpuSerialNumber.slice(0, 4) +
                                                                    "-" +
                                                                    x.cpuSerialNumber.slice(4, 8) +
                                                                    "-" +
                                                                    x.cpuSerialNumber.slice(8, 12) +
                                                                    "-" +
                                                                    x.cpuSerialNumber.slice(12, 16)
                                                                )),
                                                                    (o.messages = o.messages.replace(
                                                                        /__ipaddress__/g,
                                                                        x.myIpAddress || "NA"
                                                                    )),
                                                                    (o.messages = o.messages.replace(
                                                                        /__connectionstatus__/g,
                                                                        x.connectionStatus || "NA"
                                                                    )))),
                                                            a();
                                                    },
                                                    function (a) {
                                                        var b =
                                                            k.settings &&
                                                            ((k.settings.domination &&
                                                                k.settings.domination.enable) ||
                                                                (k.settings.event &&
                                                                    1 == k.settings.event.enable &&
                                                                    1 == k.settings.event.duration));
                                                        (b = b || g),
                                                            ca(m),
                                                            q.hideUi(),
                                                            e && x.loadPlaylistOnCompletion
                                                                ? n.startPlaySync(
                                                                    m,
                                                                    o,
                                                                    k.layout || "1",
                                                                    k.videoWindow,
                                                                    k.zoneVideoWindow,
                                                                    k.templateName,
                                                                    i,
                                                                    0,
                                                                    b,
                                                                    w.currentPlaylist
                                                                )
                                                                : n.startPlay(
                                                                    m,
                                                                    o,
                                                                    k.layout || "1",
                                                                    k.videoWindow,
                                                                    k.zoneVideoWindow,
                                                                    k.templateName,
                                                                    i,
                                                                    0,
                                                                    b,
                                                                    w.currentPlaylist
                                                                ),
                                                            a();
                                                    },
                                                ],
                                                function (a) {
                                                    a &&
                                                        (n.startPlay(
                                                            [{ filename: "_emptynotice.html", duration: 30 }],
                                                            null,
                                                            "1"
                                                        ),
                                                            i(a));
                                                }
                                            ))
                                        : ((j = "TV is OFF, skipping playlist play"),
                                            s.log("error", j),
                                            p.storeEvent("player", "error", j),
                                            d(j)))
                        : (w.playlistOn ||
                            s.log("debug", "playlist stop, already playing stopped"),
                            (w.playlistOn = !1),
                            (r = n.stopPlay()),
                            (w.playlistStarttime = null),
                            (w.duration = Math.floor(
                                (Date.now() - w.playlistStarttime) / 6e4
                            )),
                            b.writeToConfig(),
                            d(null, w));
                }),
                (ea = function (a, b) {
                    var c = function () {
                        da(
                            !0,
                            w.currentPlaylist,
                            function (b, c) {
                                Oa(), a(b, c);
                            },
                            b
                        );
                    };
                    (w.playlistOn = !1), c();
                }),
                (b.getSettingsData = function () {
                    return {
                        name: x.name || x.localName,
                        myIpAddress: x.myIpAddress.trim(),
                        cpuSerialNumber: x.cpuSerialNumber,
                        secret: x.secret,
                        disableWebUi: x.disableWebUi,
                    };
                }),
                (b.writeToSettings = function () {
                    try {
                        f.writeFileSync(l.settingsFile, JSON.stringify(x, null, 4)),
                            d("sync");
                    } catch (a) {
                        s.log("error", "*** Settings File write Error ***" + a);
                    }
                }),
                (b.writeToConfig = function (a, b) {
                    if (a) for (var c in a) w[c] = a[c];
                    if (!b)
                        try {
                            f.writeFileSync(l.poweronConfig, JSON.stringify(w, null, 4)),
                                d("sync");
                        } catch (e) {
                            s.log("error", "*** Settings File write Error ***" + e);
                        }
                }),
                (b.updateDiskStatus = function (a) {
                    d("df -h /")
                        .stdout.on("data", function (a) {
                            if (a) {
                                var b = a.replace(/\s{2,}/g, " ").split(" ");
                                (w.diskSpaceUsed = b[b.length - 2]),
                                    (w.diskSpaceAvailable = b[b.length - 3]);
                            }
                        })
                        .on("close", function () {
                            a && a();
                        });
                }),
                (b.playFile = function (a, c) {
                    switch (
                    (s.log(
                        "info",
                        "action: " + a.params.action + ", file: " + a.query.file
                    ),
                        a.params.action)
                    ) {
                        case "play":
                            a.query.file
                                ? ((Y = "playing"),
                                    n.playFile(
                                        a.query.file,
                                        function () {
                                            Y = "stopped";
                                        },
                                        a.query.duration
                                    ),
                                    r.sendSuccess(c, "Started playing file", { status: Y }))
                                : r.sendSuccess(c, "Nothing to play", { status: Y });
                            break;
                        case "stop":
                            "stopped" == Y
                                ? r.sendSuccess(c, "already stopped", { status: Y })
                                : ((Y = "stopped"),
                                    n.stopFile(),
                                    r.sendSuccess(c, "file stopped", { status: Y }));
                            break;
                        case "pause":
                            "stopped" == Y
                                ? ((a.params.action = "play"), b.playFile(a, c))
                                : ("playing" == Y
                                    ? (Y = "paused")
                                    : "paused" == Y && (Y = "playing"),
                                    n.pauseFile(),
                                    r.sendSuccess(c, "pause reply", { status: Y }));
                            break;
                        default:
                            r.sendSuccess(c, "sending current status of playFile", {
                                status: Y,
                            });
                    }
                }),
                (b.playPlaylist = function (a, b) {
                    a.body.play
                        ? ((w.playlistOn = !1),
                            (w.localControl = !0),
                            da(!0, a.params.file, function (a, c) {
                                return a
                                    ? r.sendError(b, "Already playing started")
                                    : r.sendSuccess(b, "Started playlist", c);
                            }))
                        : a.body.stop &&
                        ((w.localControl = !1),
                            da(!1, a.params.file, function (a, c) {
                                return a
                                    ? r.sendError(b, a)
                                    : r.sendSuccess(b, "Stopped playlist", c);
                            }));
                }),
                (b.getRssFeeds = function (a, b) {
                    var c = a.query.link,
                        d = a.query["encode-as-binary"],
                        e = a.query.feedlimit,
                        f = !1;
                    u.getFeeds(
                        c,
                        d,
                        function (a, c) {
                            return f
                                ? void 0
                                : ((f = !0),
                                    a
                                        ? r.sendError(b, "Feed fetch error, " + a)
                                        : r.sendSuccess(b, "Feed results", c));
                        },
                        e
                    );
                }),
                (b.getStatus = function (a, b) {
                    var c = {};
                    return (
                        w.playlistOn
                            ? (w.duration = w.playlistStarttime)
                            : (w.duration = 0),
                        (c = {
                            diskSpaceUsed: w.diskSpaceUsed,
                            diskSpaceAvailable: w.diskSpaceAvailable,
                            playlistOn: w.playlistOn,
                            duration: w.duration,
                            tvStatus: w.tvStatus,
                            cecTvStatus: w.cecTvStatus,
                            currentPlaylist: w.currentPlaylist,
                            currentPlayingFile: n.getCurrentPlayingFile(),
                            cpuSerialNumber: x.cpuSerialNumber,
                            playlistsDeployed:
                                w.deployedPlaylists &&
                                w.deployedPlaylists.map(function (a) {
                                    return a.name;
                                }),
                            currentDebugLevel: s.debugLevel,
                        }),
                        r.sendSuccess(b, "Status Check", c)
                    );
                }),
                (b.setDebugLevel = function (a, b) {
                    return (
                        fa(a.body.level), r.sendSuccess(b, "Debug level set", s.debugLevel)
                    );
                }),
                (ga = function (a) {
                    (a = a || function () { }),
                        d(
                            "screenshot 50",
                            {
                                encoding: "base64",
                                timeout: 3e4,
                                maxBuffer: 512e4,
                                killSignal: "SIGTERM",
                                cwd: null,
                                env: null,
                            },
                            a
                        );
                }),
                (b.getSnapshot = function (a, b) {
                    ga(function (a, c, d) {
                        a
                            ? r.sendError(b, "Error in connection", a)
                            : d
                                ? r.sendError(b, "Error in taking snapshot", d)
                                : r.sendSuccess(b, "snapshot", {
                                    data: c,
                                    lastTaken: Date.now(),
                                });
                    });
                }),
                (b.executeShell = function (a, b) {
                    var c = a.body.cmd;
                    d(
                        c,
                        {
                            encoding: "utf8",
                            timeout: 3e4,
                            maxBuffer: 20480,
                            killSignal: "SIGTERM",
                            cwd: null,
                            env: null,
                        },
                        function (a, d, e) {
                            var f = { cmd: c, err: a, stdout: d, stderr: e };
                            r.sendSuccess(b, "shell_ack", f);
                        }
                    );
                }),
                (b.getTestLog = function (a, b) {
                    return r.sendSuccess(b, "Test Log", s.getTestLog());
                }),
                (b.getDeviceId = function (a, b) {
                    return r.sendSuccess(b, "Device ID", {
                        deviceId: aa(x.cpuSerialNumber),
                    });
                }),
                (b.getSchedule = function (a, b) {
                    f.readFile(l.poweronConfig, function (a, c) {
                        if (a)
                            return (
                                s.log("warn", "there seems to be no _config.json file: " + a),
                                r.sendError(b, "No configuration file", a)
                            );
                        var d = JSON.parse(c);
                        return d
                            ? ((w = d), r.sendSuccess(b, "Configuration", { config: w }))
                            : (s.log("error", "Unable to JSON parse _config.json file"),
                                r.sendError(b, "Unable to parse _config.json", a));
                    });
                }),
                (b.setSchedule = function (a, c) {
                    var e,
                        d = a.body.deployedPlaylists;
                    return d && d.length > 0
                        ? ((w.deployedPlaylists = d),
                            la(),
                            s.log("debug", "Deployed playlists: " + d),
                            (e = fb()),
                            lb(e.selectedAds, !0),
                            mb(e.selectedAudioPlaylist, !0),
                            (w.currentPlaylist = e.selectedPlaylist),
                            (w.playlistIndex = e.index),
                            (N = e.otherSelectedPlaylists),
                            ea(function () { }),
                            b.writeToConfig(),
                            r.sendSuccess(c, "success", { config: w }))
                        : (s.log("error", "deployedPlaylists is empty"),
                            r.sendSuccess(c, "Recieved empty deployedPlaylists"));
                }),
                (b.getRadar = function (a, b) {
                    f.readFile(
                        g.join(l.configDir, "radar.json"),
                        "utf8",
                        function (a, c) {
                            return a
                                ? (s.log("error", "radar.json file not found"),
                                    r.sendError(b, "radar.json file not found", a))
                                : r.sendSuccess(b, "Radar data", JSON.parse(c));
                        }
                    );
                }),
                (b.setRadar = function (a, b) {
                    j.isEmpty(a.body) && s.log("warn", "Empty json object recieved"),
                        f.writeFile(
                            g.join(l.configDir, "radar.json"),
                            JSON.stringify(a.body),
                            function (c) {
                                return c
                                    ? (s.log("error", "Failed to write File"),
                                        r.sendError(b, "Failed to write file", c))
                                    : r.sendSuccess(b, "Radar file updated", a.body);
                            }
                        );
                }),
                (ha = function (a) {
                    var b, c, d;
                    f.readFile(l.ifacePath, "utf8", function (e, g) {
                        if (!e && g)
                            for (
                                b = g.split("\n"), c = 0, d = b.length;
                                d > c && !b[c].match(/^\s*iface\s*eth0\s*inet\s*[a-zA-Z]+/gi);
                                c++
                            );
                        e || c == b.length
                            ? f.readFile(l.dhcpcdFile, "utf8", function (e, f) {
                                if (!e && f)
                                    for (
                                        b = f.split("\n"), c = 0, d = b.length;
                                        d > c && !b[c].match(/^\s*interface\s*eth0/i);
                                        c++
                                    );
                                else console.log("file read error: " + e);
                                e || c == b.length
                                    ? a(null, { lines: b, pos: -1, mode: "dhcpcd" })
                                    : a(null, { lines: b, pos: c, mode: "dhcpcd" });
                            })
                            : a(null, { lines: b, pos: c, mode: "interfaces" });
                    });
                }),
                (ia = function (a) {
                    var b, c;
                    d("sudo cat " + l.bootConfigPath, function (d, e, f) {
                        if (null !== d) a(f, null);
                        else {
                            b = e.split("\n");
                            for (var g = 0; g < b.length; g++)
                                if (b[g].match(/disable_overscan/))
                                    c = "1" == b[g].split("=").pop() ? !0 : !1;
                                else if (b[g].match(/overscan_left/)) break;
                            a(null, { txtdata: b, position: g, overscan_flag: c });
                        }
                    });
                }),
                (b.getSettings = function (a, b) {
                    var e,
                        c = !1,
                        g = !1,
                        i = function () {
                            var a = t.getIp(!0),
                                b = a.filter(function (a) {
                                    return "eth0" == a.type;
                                });
                            return b;
                        };
                    h.series(
                        [
                            function (a) {
                                ha(function (b, d) {
                                    b ? a(b) : ((e = d), (c = "dhcpcd" == d.mode), a());
                                });
                            },
                            function (a) {
                                var b, d, f, h, j, k;
                                if (c)
                                    if (-1 == e.pos)
                                        (b = i()),
                                            (x.ipsettings = {
                                                type: "dhcpcd",
                                                mode: "DHCP",
                                                address: b.length ? b[0].ip : null,
                                                netmask:
                                                    "please enter in CIDR notation, e.g. 24 for 255.255.255.0",
                                                gateway: null,
                                            });
                                    else
                                        for (
                                            g = !0,
                                            x.ipsettings = {
                                                type: "dhcpcd",
                                                mode: "Static",
                                                netmask:
                                                    "please enter in CIDR notation, e.g. 24 for 255.255.255.0",
                                            },
                                            x.dns = { primary: "8.8.4.4", secondary: "8.8.8.8" },
                                            e.pos++;
                                            e.pos < e.lines.length &&
                                            e.lines[e.pos].match(/^\s*static/i);

                                        ) {
                                            switch (
                                            ((d = e.lines[e.pos]
                                                .slice(e.lines[e.pos].indexOf("static ") + 7)
                                                .split("=")),
                                                (f = d[0] ? d[0].trim() : null),
                                                (h = d[1] ? d[1].trim() : null),
                                                f)
                                            ) {
                                                case "ip_address":
                                                    (j = h.split("/")),
                                                        (x.ipsettings.address = j[0]),
                                                        (x.ipsettings.netmask = j[1]);
                                                    break;
                                                case "routers":
                                                    x.ipsettings.gateway = h;
                                                    break;
                                                case "domain_name_servers":
                                                    (k = h.split(" ")),
                                                        k[0] && (x.dns.primary = k[0]),
                                                        k[1] && (x.dns.secondary = k[1]);
                                            }
                                            e.pos++;
                                        }
                                else
                                    -1 != e.lines[e.pos].indexOf("dhcp")
                                        ? ((b = i()),
                                            (x.ipsettings = {
                                                mode: "DHCP",
                                                address: b.length ? b[0].ip : null,
                                                netmask: null,
                                                gateway: null,
                                            }))
                                        : ((g = !0),
                                            (x.ipsettings = {
                                                mode: "Static",
                                                address: e.lines[e.pos + 1].split(" ").pop(),
                                                netmask: e.lines[e.pos + 2].split(" ").pop(),
                                                gateway: e.lines[e.pos + 3].split(" ").pop(),
                                            })),
                                        (x.ipsettings.netmask =
                                            x.ipsettings.netmask || "255.255.255.0");
                                (x.ipsettings.interfaceName = "eth0"), a();
                            },
                            function (a) {
                                var b;
                                (x.wifi = { ip: null }),
                                    d("sudo cat " + l.wifiPath, function (c, d) {
                                        if (c) a();
                                        else {
                                            b = d.split("\n");
                                            for (
                                                var f = 0;
                                                f < b.length &&
                                                (b[f].match(/country=/gi) &&
                                                    ((x.wifi.countryCode = b[f].split("=")[1]),
                                                        x.wifi.countryCode &&
                                                        (x.wifi.countryCode = x.wifi.countryCode.trim())),
                                                    !b[f].match(/network\S+/gi));
                                                f++
                                            );
                                            f < b.length &&
                                                (b[f + 2].match(/key_mgmt\S+/gi)
                                                    ? ((x.wifi.ssid = b[f + 1].split('"')[1]),
                                                        (x.wifi.pass = null),
                                                        (x.wifi.open = !0))
                                                    : ((x.wifi.ssid = b[f + 1].split('"')[1]),
                                                        (x.wifi.pass = b[f + 2].split('"')[1]),
                                                        (x.wifi.open = !1)),
                                                    b[f + 3].match(/scan_ssid\S+/gi) &&
                                                    (x.wifi.hidden = "1" === b[f + 3].split("=")[1])),
                                                a();
                                        }
                                    });
                            },
                            function (a) {
                                d(
                                    'grep -q "^denyinterfaces wlan0" /etc/dhcpcd.conf',
                                    function (b) {
                                        b ? (x.wifi.apmode = "NO") : (x.wifi.apmode = "AP"), a();
                                    }
                                );
                            },
                            function (a) {
                                var b, c;
                                x.wifi.ssid &&
                                    ((b = t.getIp(!0)),
                                        (c = b.filter(function (a) {
                                            return "wlan0" == a.type;
                                        })),
                                        (x.wifi.ip = c.length ? c[0].ip : null)),
                                    a();
                            },
                            function (a) {
                                ia(function (b, c) {
                                    if (b) s.log("warn", "Error in reading config.txt"), a(b);
                                    else {
                                        var d = c.txtdata,
                                            e = c.position;
                                        (x.overscan = {
                                            horizontal: parseInt(d[e].split("=").pop(), 10),
                                            vertical: parseInt(d[e + 2].split("=").pop(), 10),
                                            disable_overscan: c.overscan_flag,
                                        }),
                                            a();
                                    }
                                });
                            },
                            function (a) {
                                y.user
                                    ? a()
                                    : f.readFile(l.root + "/htpasswd", "utf8", function (b, c) {
                                        if (!b && c) {
                                            var d = c.split(":");
                                            y.user = d[0];
                                        }
                                        a();
                                    });
                            },
                            function (a) {
                                x.wifi.ip || x.ipsettings.address
                                    ? g
                                        ? c
                                            ? a()
                                            : ((x.dns = { primary: null, secondary: null }),
                                                d(
                                                    "cat " +
                                                    l.ifacePath +
                                                    " | grep 'dns-nameservers' | tr -d '[a-z][=-=][\n][	]'",
                                                    function (b, c) {
                                                        if (!b) {
                                                            var e = c.split(" ");
                                                            (e = e.filter(function (a) {
                                                                return a;
                                                            })),
                                                                (x.dns = {
                                                                    primary: e[0] || "8.8.4.4",
                                                                    secondary: e[1] || "8.8.8.8",
                                                                }),
                                                                a();
                                                        }
                                                    }
                                                ))
                                        : d(
                                            "cat /etc/resolv.conf.head | grep 'nameserver' | tr -d '[:blank][a-z][=-=][	]'",
                                            function (b, c) {
                                                if (!b || !c) {
                                                    var e = c.split("\n");
                                                    (e = e.filter(function (a) {
                                                        return a;
                                                    })),
                                                        (x.dns = {
                                                            primary: e[0] || "8.8.4.4",
                                                            secondary: e[1] || "8.8.8.8",
                                                        }),
                                                        a();
                                                }
                                            }
                                        )
                                    : a();
                            },
                        ],
                        function () {
                            return r.sendSuccess(b, "Settings", {
                                name: x.name,
                                localName: x.localName,
                                note: x.note,
                                version: x.version,
                                platform_version: x.platform_version,
                                currentVersion: x.currentVersion,
                                ipsettings: x.ipsettings,
                                wifi: x.wifi,
                                overscan: x.overscan,
                                orientation: x.orientation,
                                resolution: x.resolution,
                                omxVolume: x.omxVolume,
                                user: { name: y.user },
                                server: { config: m.config_server, media: m.media_server },
                                sleep: x.sleep,
                                reboot: x.reboot,
                                dns: x.dns,
                            });
                        }
                    );
                }),
                (ja = function (a, b, c) {
                    var g,
                        h,
                        e = "dhcpcd" == b.mode;
                    if (e)
                        if (
                            ((!a.netmask ||
                                isNaN(parseInt(a.netmask)) ||
                                parseInt(a.netmask) > 32) &&
                                (a.netmask = 24),
                                (g = [
                                    "interface eth0",
                                    "	static ip_address=" + a.address + "/" + a.netmask,
                                    "	static routers=" + a.gateway,
                                    "	static domain_name_servers=" +
                                    x.dns.primary +
                                    " " +
                                    x.dns.secondary +
                                    "\n",
                                ]),
                                -1 == b.pos)
                        ) {
                            if ("DHCP" == a.mode) return c();
                            b.lines = b.lines.concat(g);
                        } else {
                            for (
                                b.lines.splice(b.pos, 1);
                                b.pos < b.lines.length && b.lines[b.pos].match(/\s*static/i);

                            )
                                b.lines.splice(b.pos, 1);
                            "Static" == a.mode && (b.lines = b.lines.concat(g));
                        }
                    else if (-1 != b.lines[b.pos].indexOf("dhcp")) {
                        if ("DHCP" == a.mode) return c();
                        b.lines.splice(b.pos, 1, "iface eth0 inet static"),
                            b.lines.splice(
                                b.pos + 1,
                                0,
                                "	address " + a.address,
                                "	netmask " + a.netmask,
                                "	gateway " + a.gateway,
                                "	dns-nameservers " + x.dns.primary + " " + x.dns.secondary
                            );
                    } else
                        "Static" == a.mode
                            ? (b.lines.splice(b.pos + 1, 4),
                                b.lines.splice(
                                    b.pos + 1,
                                    0,
                                    "	address " + a.address,
                                    "	netmask " + a.netmask,
                                    "	gateway " + a.gateway,
                                    "	dns-nameservers " + x.dns.primary + " " + x.dns.secondary
                                ))
                            : (b.lines.splice(b.pos + 1, 4),
                                b.lines.splice(b.pos, 1, "iface eth0 inet dhcp"));
                    (h = e ? l.dhcpcdFile : l.ifacePath),
                        f.writeFile(U, b.lines.join("\n"), function (a) {
                            a
                                ? c({ msg: "Interfaces temp file error", error: a })
                                : d("sudo mv -f " + U + " " + h, function (a) {
                                    a
                                        ? c({ msg: "mv temp to Interfaces error: ", error: a })
                                        : c();
                                });
                        });
                }),
                (b.setHostname = function (a, c) {
                    return (
                        (x.localName = a.body.localName),
                        (x.note = a.body.note),
                        b.writeToSettings(),
                        t.registerHostnameChange(x.localName),
                        r.sendSuccess(c, "Name change in progress", x)
                    );
                }),
                (b.setEthernet = function (a, b) {
                    var c = null,
                        e = !1;
                    h.series(
                        [
                            function (a) {
                                ha(function (b, d) {
                                    b ? a(b) : ((e = "dhcpcd" == d.mode), (c = d), a());
                                });
                            },
                            function (a) {
                                var b = e ? l.dhcpcdFile : l.ifacePath;
                                d("sudo cp " + b + " " + b + ".bak", function (b) {
                                    null !== b
                                        ? a({ msg: "cp interfaces to .bak error: ", error: b })
                                        : a();
                                });
                            },
                            function (b) {
                                var c = a.body.dns;
                                (x.dns.primary = c.primary || "8.8.4.4"),
                                    (x.dns.secondary = c.secondary || "8.8.8.8"),
                                    a.body &&
                                        a.body.ipsettings &&
                                        "DHCP" == a.body.ipsettings.mode &&
                                        a.body.editDns
                                        ? t.updateDnsEntry(x.dns, b)
                                        : b();
                            },
                            function (b) {
                                ja(a.body.ipsettings, c, b);
                            },
                        ],
                        function (a) {
                            return a
                                ? r.sendError(b, "Error in updating Network settings: ", a)
                                : (r.sendSuccess(b, "Network settings saved", x),
                                    s.log(
                                        "info",
                                        "Rebooting the server after network config change"
                                    ),
                                    t.reboot(),
                                    void 0);
                        }
                    );
                }),
                (b.setWifi = function (a, b) {
                    var c,
                        e = !1,
                        g = !1,
                        i = !1;
                    a.body.wifi.ssid
                        ? ((a.body.wifi.apmode = "NO"), (g = !0))
                        : "AP" == a.body.wifi.apmode && (i = !0),
                        h.series(
                            [
                                function (a) {
                                    return g
                                        ? void d(
                                            "sudo cp  /etc/wpa_supplicant/wpa_supplicant.conf  /etc/wpa_supplicant/wpa_supplicant.conf.bak",
                                            function (b) {
                                                null !== b
                                                    ? a({
                                                        msg: "cp wpa_supplicant.conf to .bak error: ",
                                                        error: b,
                                                    })
                                                    : a();
                                            }
                                        )
                                        : a();
                                },
                                function (a) {
                                    return g
                                        ? void d("sudo cat " + l.wifiPath, function (b, d) {
                                            null !== b && a(err), d && ((c = d.split("\n")), a());
                                        })
                                        : a();
                                },
                                function (b) {
                                    var e, h;
                                    if (!g) return b();
                                    if (a.body.wifi.countryCode) {
                                        for (e = 0; e < c.length; e++)
                                            if (c[e].match(/country\S+/gi)) {
                                                c.splice(e, 1, "country=" + a.body.wifi.countryCode);
                                                break;
                                            }
                                        e === c.length &&
                                            c.splice(2, 0, "country=" + a.body.wifi.countryCode);
                                    }
                                    for (h = 0; h < c.length; h++)
                                        if (c[h].match(/network\S+/gi)) {
                                            c.length = h;
                                            break;
                                        }
                                    c.push(
                                        "network={",
                                        'ssid="' + a.body.wifi.ssid + '"',
                                        a.body.wifi.open
                                            ? "key_mgmt=NONE"
                                            : 'psk="' + a.body.wifi.pass + '"',
                                        "scan_ssid=" + (a.body.wifi.hidden ? "1" : "0"),
                                        "}"
                                    ),
                                        f.writeFile(V, c.join("\n"), function (a) {
                                            return a
                                                ? a
                                                : void d(
                                                    "sudo mv -f " + V + " " + l.wifiPath,
                                                    function (a) {
                                                        a
                                                            ? b({
                                                                msg: "mv wifi temp to wpa_supplicant.conf error: ",
                                                                error: a,
                                                            })
                                                            : b();
                                                    }
                                                );
                                        });
                                },
                                function (a) {
                                    d(
                                        'grep -q "^denyinterfaces wlan0" /etc/dhcpcd.conf',
                                        function (b) {
                                            (!b || i) && (e = !0), a();
                                        }
                                    );
                                },
                                function (a) {
                                    var b = i
                                        ? "--enable-access-point"
                                        : "--disable-access-point";
                                    d(l.systemScript + b, function (b, c, d) {
                                        b || d
                                            ? s.log("error", "wifi mode change error : " + b)
                                            : s.log("info", c),
                                            a();
                                    });
                                },
                            ],
                            function (c) {
                                return c
                                    ? (s.log("error", c),
                                        r.sendError(b, "Wifi update error: ", c))
                                    : ((x.wifi = a.body.wifi),
                                        void (e
                                            ? (r.sendSuccess(b, "Wifi update successfull", x),
                                                t.reboot())
                                            : ha(function (a, c) {
                                                var e;
                                                (e =
                                                    a || "dhcpcd" == c.mode
                                                        ? "sudo ifconfig wlan0 down;sudo ifconfig wlan0 up;"
                                                        : "sudo ifdown --force wlan0; sudo ifup wlan0;"),
                                                    d(e, function (a) {
                                                        return a
                                                            ? (s.log("error", "ifdown/up error"),
                                                                r.sendError(b, "Wifi update error: ", a))
                                                            : ($(),
                                                                r.sendSuccess(
                                                                    b,
                                                                    "Wifi update successfull",
                                                                    x
                                                                ),
                                                                void _(ra));
                                                    });
                                            })));
                            }
                        );
                }),
                (b.setOverscan = function (a, b) {
                    var c = a.body.overscan;
                    r.sendSuccess(b, "new changes are being written", x),
                        s.log("info", "Rebooting the server after overscan config change"),
                        a.body.overscan.disable_overscan
                            ? d(
                                'sudo sed -i -e "s/.*disable_overscan.*/disable_overscan=1/" -e "s/.*overscan_left.*/#overscan_left="' +
                                c.horizontal +
                                '/ -e "s/.*overscan_right.*/#overscan_right="' +
                                c.horizontal +
                                '/ -e "s/.*overscan_top.*/#overscan_top="' +
                                c.vertical +
                                '/ -e "s/.*overscan_bottom.*/#overscan_bottom="' +
                                c.vertical +
                                '/ -e "s/.*overscan_scale.*/overscan_scale=0/"  ' +
                                l.bootConfigPath
                            ).on("close", function () {
                                t.reboot();
                            })
                            : d(
                                'sudo sed -i -e "s/.*disable_overscan.*/disable_overscan=0/" -e "s/.*overscan_left.*/overscan_left="' +
                                c.horizontal +
                                '/ -e "s/.*overscan_right.*/overscan_right="' +
                                c.horizontal +
                                '/ -e "s/.*overscan_top.*/overscan_top="' +
                                c.vertical +
                                '/ -e "s/.*overscan_bottom.*/overscan_bottom="' +
                                c.vertical +
                                '/  -e "s/.*overscan_scale.*/overscan_scale=1/"  ' +
                                l.bootConfigPath
                            ).on("close", function () {
                                t.reboot();
                            });
                }),
                (b.setOrientation = function (a, b) {
                    return a.body.orientation == x.orientation &&
                        a.body.resolution == x.resolution
                        ? r.sendSuccess(b, "Settings Saved", x)
                        : void kb(a.body, function (a) {
                            return a
                                ? r.sendError(b, "Settings write error", a)
                                : r.sendSuccess(b, "Settings Saved and Reboot", x);
                        });
                }),
                (b.setServerName = function (a, b) {
                    a.body.server.config != m.config_server ||
                        a.body.server.media != m.media_server
                        ? ((m.config_server = a.body.server.config),
                            (m.media_server = a.body.server.media),
                            f.writeFile(l.pkgJson, JSON.stringify(m, null, 4), function (a) {
                                return a
                                    ? r.sendError(b, "Error in changing server name", a)
                                    : (r.sendSuccess(b, "New server name saved", x),
                                        s.log(
                                            "info",
                                            "Exiting the node process after server name change"
                                        ),
                                        yb(),
                                        void 0);
                            }))
                        : r.sendSuccess(b, "New server name saved", x);
                }),
                (b.setUser = function (a, b) {
                    var d = c("apache-md5")(a.body.user.newpasswd);
                    try {
                        f.writeFileSync(l.root + "/htpasswd", a.body.user.name + ":" + d),
                            r.sendSuccess(b, "password changed successfully", x),
                            console.log("***  Username/Password changed ****"),
                            s.log(
                                "info",
                                "Exiting the node process after user name/password change"
                            ),
                            yb();
                    } catch (e) {
                        s.log("error", "*** htpasswd file write error ***"),
                            r.sendError(b, "Error in saving user settings", e);
                    }
                }),
                (b.setSleepTimer = function (a, c) {
                    return (
                        (x.sleep = a.body.sleep),
                        qb(x.sleep),
                        b.writeToSettings(),
                        r.sendSuccess(c, "time set ", x)
                    );
                }),
                (b.setOMXVolume = function (a, c) {
                    return (
                        (x.omxVolume = a.body.omxVolume),
                        n.setOMXVolume(x.omxVolume),
                        b.writeToSettings(),
                        r.sendSuccess(c, "omxplayer volume set success", x)
                    );
                }),
                (b.setMute = function (a, c) {
                    return (
                        (x.audioMute = a.body.mute),
                        n.setMute(x.audioMute),
                        b.writeToSettings(),
                        r.sendSuccess(c, "Audio mute set success", { value: x.audioMute })
                    );
                }),
                (b.getOMXVolume = function (a, b) {
                    return r.sendSuccess(b, "omxplayer volume level", n.getOMXVolume());
                }),
                (b.getLog = function (a, b) {
                    var d,
                        c = a.query.file;
                    return c && 0 == c.indexOf("forever")
                        ? ((d = g.join(__dirname, "..", c)),
                            void f.stat(d, function (a, e) {
                                return a
                                    ? r.sendError(b, "File is not present")
                                    : void f.readFile(d, "utf8", function (a, d) {
                                        return a
                                            ? r.sendError(b, "File data read error")
                                            : (b.writeHead(200, {
                                                "Content-Type": "text/plain",
                                                "Content-Length": e.size,
                                                "Content-Disposition": c,
                                            }),
                                                void b.end(d));
                                    });
                            }))
                        : r.sendError(b, "Filename is not supplied");
                }),
                (ka = [
                    "secret",
                    "installation",
                    "orientation",
                    "resolution",
                    "omxVolume",
                    "overscan",
                    "animationEnable",
                    "animationType",
                    "enableLog",
                    "disablePlayerDownloadOnModem",
                    "reportIntervalMinutes",
                    "systemMessagesHide",
                    "forceTvOn",
                    "disableCECPowerCheck",
                    "hideWelcomeNotice",
                    "signageBackgroundColor",
                    "imageLetterboxed",
                    "resizeAssets",
                    "videoKeepAspect",
                    "videoShowSubtitles",
                    "urlReloadDisable",
                    "timeToStopVideo",
                    "showClock",
                    "loadPlaylistOnCompletion",
                    "combineDefaultPlaylist",
                    "playAllEligiblePlaylists",
                    "shuffleContent",
                    "alternateContent",
                    "logo",
                    "logox",
                    "logoy",
                    "TZ",
                ]),
                (b.getSettingsFile = function (a, b) {
                    return r.sendSuccess(
                        b,
                        "Sending config and setting files",
                        j.pick(x, ka)
                    );
                }),
                (b.setSettingsFile = function (a, c) {
                    (x = j.extend(x, j.pick(a.body, ka))),
                        b.writeToSettings(),
                        r.sendSuccess(c, "settings updated and node restarted"),
                        yb();
                }),
                (b.getWifiList = function (a, b) {
                    var c = [],
                        e = [];
                    d(
                        'sudo iwlist wlan0 scan | grep "ESSID:" |cut -d ":" -f 2',
                        function (a, d, f) {
                            return a
                                ? r.sendError(b, "No Access Point Found", a)
                                : f
                                    ? r.sendError(b, "wifi read err", f)
                                    : ((c = d.split("\n")),
                                        c.forEach(function (a) {
                                            a &&
                                                ((a = a.replace(/"/g, "")),
                                                    a && -1 == e.indexOf(a) && e.push(a));
                                        }),
                                        r.sendSuccess(b, "wifi list", e));
                        }
                    );
                }),
                (b.factoryReset = function (a, b) {
                    t.factoryReset(function (a) {
                        a
                            ? r.sendError(b, "Error in factory reset")
                            : r.sendSuccess(b, "Factory reset in Progress");
                    });
                }),
                (b.systemRestart = function () {
                    t.reboot()
                }),
                (b.systemShutdown = function () {
                    t.poweroff()
                }),
                (ma = function (a, b) {
                    return a ? (b ? 1 : 2) : 0;
                }),
                (na = !0),
                (oa = null),
                (pa = !1),
                (qa = function () {
                    w.playlistOn &&
                        ((w.playlistOn = !1), da(!0, w.currentPlaylist, function () { })),
                        hb();
                }),
                n.browserEmitter.once("loaded", function () {
                    s.log("debug", "Browser loaded event at pi-main"),
                        (pa = !0),
                        oa &&
                        (clearTimeout(oa),
                            setTimeout(function () {
                                (na = !1), qa();
                            }, 1e4));
                }),
                h.series(
                    [
                        function (a) {
                            f.readFile(l.poweronConfig, "utf8", function (b, c) {
                                if (b)
                                    return (
                                        s.log(
                                            "warn",
                                            "there seems to be no _config.json file: " + b
                                        ),
                                        p.storeEvent(
                                            "player",
                                            "error",
                                            "there seems to be no _config.json file: " + b
                                        ),
                                        a()
                                    );
                                try {
                                    var d = JSON.parse(c);
                                } catch (e) {
                                    f.unlink(l.poweronConfig);
                                }
                                return d
                                    ? ((w = d),
                                        (w.playlistStarttime = null),
                                        (w.playlistIndex = 0),
                                        (w.tvStatus = !0),
                                        (w.uptime = null),
                                        (w.localControl = !1),
                                        w.deployedPlaylists && la(),
                                        a())
                                    : (s.log("error", "Unable to JSON parse _config.json file"),
                                        p.storeEvent(
                                            "player",
                                            "error",
                                            "Unable to JSON parse _config.json file"
                                        ),
                                        a());
                            });
                        },
                        b.updateDiskStatus,
                        function (a) {
                            f.readFile(l.settingsFile, "utf8", function (b, c) {
                                var e, g;
                                if (!b)
                                    try {
                                        x = JSON.parse(c);
                                    } catch (d) {
                                        s.log(
                                            "error",
                                            "Error parsing  " + l.settingsFile + ": " + d
                                        );
                                    }
                                if (
                                    f.existsSync(R) &&
                                    (s.log("info", "Found " + R), (g = f.readFileSync(R, "utf8")))
                                )
                                    try {
                                        (e = JSON.parse(g)),
                                            (S = !0),
                                            e &&
                                            "object" == typeof e &&
                                            ((X.settings = X.settings.concat(T)),
                                                e.pin && (x.sdConfigPin = e.pin),
                                                e.name && (x.sdConfigName = e.name),
                                                e.group && (x.sdConfigGroup = e.group),
                                                e.timezone && (x.sdConfigTimezone = e.timezone),
                                                e.installation &&
                                                (x.sdConfigInstallation = e.installation),
                                                s.log(
                                                    "info",
                                                    "Sending SD config details: " +
                                                    x.sdConfigName +
                                                    ", " +
                                                    x.sdConfigInstallation +
                                                    ", " +
                                                    x.sdConfigGroup +
                                                    ", " +
                                                    x.sdConfigTimezone
                                                ));
                                    } catch (h) {
                                        s.log("error", "Error parsing " + R + ": " + h);
                                    }
                                (x.hideWelcomeNotice = x.hideWelcomeNotice || !1),
                                    (x.installation = x.installation || "admin"),
                                    (x.myIpAddress = A),
                                    (x.orientation = x.orientation || "landscape"),
                                    (x.resolution = x.resolution || "auto"),
                                    (x.sleep = x.sleep || {
                                        enable: !1,
                                        ontime: null,
                                        offtime: null,
                                    }),
                                    (x.reboot = x.reboot || { enable: !1, time: null }),
                                    !w.localControl && x.secret && A && Ta(),
                                    x.hideWelcomeNotice ? a() : _(a);
                            });
                        },
                        function (a) {
                            d("cat /proc/cpuinfo |grep Serial|awk '{print $3 }'")
                                .stdout.on("data", function (a) {
                                    "1" == a.charAt("0") && (a = "9" + a.slice(1)),
                                        s.log("info", "cpu serial number: " + a),
                                        (x.cpuSerialNumber = a.slice(0, a.length - 1)),
                                        c("../others/license-utils").checkForLicense(
                                            x.installation,
                                            x.cpuSerialNumber,
                                            function (a) {
                                                ("ttk" != x.installation &&
                                                    "admin" != x.installation) ||
                                                    "pisignage.com" != W ||
                                                    (a = !0),
                                                    n.setLicense(a),
                                                    (w.licensed = a),
                                                    s.log("info", "license status: " + a);
                                            },
                                            W
                                        );
                                })
                                .on("close", function () {
                                    a();
                                });
                        },
                        function (a) {
                            var b = function (a) {
                                var b = a.split("\n");
                                b[0] ? (x.ethMac = b[0]) : delete x.ethMac,
                                    b[1] ? (x.wifiMac = b[1]) : delete x.wifiMac,
                                    s.log("info", "MAC Address : " + x.ethMac + "  " + x.wifiMac);
                            };
                            d("ifconfig | awk '/ether/{print $2}'", function (c, e) {
                                e
                                    ? (b(e), a())
                                    : d(
                                        "sudo ifconfig | awk '/HWaddr/{print $5}'",
                                        function (c, d, e) {
                                            d
                                                ? b(d)
                                                : s.log("error", "MAC Address query error: " + e),
                                                a();
                                        }
                                    );
                            });
                        },
                        function (a) {
                            t.getResolution(function (b, c) {
                                b || (x.edidResolution = c),
                                    n.setResolution(
                                        x.resolution,
                                        x.orientation,
                                        x.edidResolution
                                    ),
                                    a();
                            });
                        },
                        function (a) {
                            (x.version = m.version),
                                (x.platform_version = m.platform_version),
                                (x.animationEnable = x.animationEnable || !1),
                                (x.animationType = x.animationType || null),
                                (x.enableLog = x.enableLog || !1),
                                (x.disablePlayerDownloadOnModem =
                                    x.disablePlayerDownloadOnModem || !1),
                                (x.reportIntervalMinutes = x.reportIntervalMinutes || 5),
                                n.setAssetLogs(x.enableLog),
                                n.setYoutubeDl(x.enableYoutubeDl),
                                n.setMpv(x.enableMpv, x.mpvAudioDelay),
                                n.setAnimationStatus(x.animationEnable, x.animationType, !0),
                                (x.systemMessagesHide = x.systemMessagesHide || !1),
                                n.setSystemMessagesHide(x.systemMessagesHide, !0),
                                (x.forceTvOn = x.forceTvOn || !1),
                                (x.disableCECPowerCheck = x.disableCECPowerCheck || !1),
                                (x.signageBackgroundColor = x.signageBackgroundColor || "#000"),
                                n.setBackgroundColor(x.signageBackgroundColor, !0),
                                (x.imageLetterboxed = x.imageLetterboxed || !1),
                                (x.resizeAssets = x.resizeAssets || !1),
                                n.setImageResize(ma(x.resizeAssets, x.imageLetterboxed), !0),
                                (x.videoKeepAspect = x.videoKeepAspect || !1),
                                n.setVideoKeepAspect(x.videoKeepAspect, !0),
                                (x.videoShowSubtitles = x.videoShowSubtitles || !1),
                                n.setVideoShowSubtitles(x.videoShowSubtitles),
                                (x.sleep = x.sleep || {
                                    enable: !1,
                                    ontime: null,
                                    offtime: null,
                                }),
                                (x.reboot = x.reboot || { enable: !1, time: null }),
                                vb(x.reboot),
                                ub(),
                                qb(x.sleep),
                                (x.shuffleContent = x.shuffleContent || !1),
                                n.setShuffleContent(x.shuffleContent),
                                (x.urlReloadDisable = x.urlReloadDisable || !1),
                                n.setUrlReloadDisable(x.urlReloadDisable, !0),
                                (x.keepWeblinksInMemory = x.keepWeblinksInMemory || !1),
                                n.setWeblinkCacheEnable(x.keepWeblinksInMemory),
                                (x.enablePio = x.enablePio || !1),
                                n.enablePio(x.enablePio),
                                (x.server = m.config_server),
                                (x.connectionStatus = "Waiting"),
                                (x.omxVolume = parseInt(
                                    x.omxVolume || 0 == x.omxVolume ? x.omxVolume : 100,
                                    10
                                )),
                                n.setOMXVolume(x.omxVolume),
                                (x.timeToStopVideo = x.timeToStopVideo || 0),
                                n.setTimeToStopVideo(x.timeToStopVideo),
                                (x.kioskUi = x.kioskUi || { enable: !1 }),
                                q.setupUi(x.kioskUi),
                                (x.showClock = x.showClock || { enable: !1 }),
                                (x.emergencyMessage = x.emergencyMessage || {
                                    enable: !1,
                                    msg: "",
                                    hPos: "middle",
                                    vPos: "middle",
                                }),
                                n.setDisplayClock(x.showClock, x.emergencyMessage, !0),
                                a();
                        },
                        function (a) {
                            d("sudo kill $(pgrep -f omx.py)", function () {
                                a(),
                                    ("NTSC" == x.resolution || "PAL" == x.resolution) &&
                                    d('sudo sed -i -e "s/hdmi/local/" /home/pi/omx.py');
                            });
                        },
                        function (a) {
                            d("sudo pkill omxplayer", function () {
                                a();
                            });
                        },
                    ],
                    function () {
                        s.testLog("config_file", w),
                            s.testLog("settings_file", x),
                            b.writeToSettings(),
                            p.startLog(),
                            s.log("debug", "Initialization done"),
                            x.hideWelcomeNotice ||
                            ra(function () {
                                n.startPlay(
                                    [{ filename: "_emptynotice.html", duration: 30 }],
                                    null,
                                    "1"
                                );
                            }),
                            (oa = setTimeout(
                                function () {
                                    (na = !1), qa();
                                },
                                pa ? 1e4 : 3e4
                            )),
                            (z = !0),
                            b.startClient(),
                            jb();
                    }
                ),
                (sa = !1),
                (ta = function (a) {
                    var b, d, e, g, h;
                    return (
                        s.log("info", "**** Updating pi software ****"),
                        sa
                            ? void s.log("info", "**** Ignoring pi update second click ****")
                            : (a || (a = "pi-image.zip"),
                                (b = process.version.slice(1, process.version.indexOf("."))),
                                b > 0 && 10 > b
                                    ? (a = a.slice(0, a.lastIndexOf(".")) + "-v6.zip")
                                    : b > 10 && (a = a.slice(0, a.lastIndexOf(".")) + "-v14.zip"),
                                p.storeEvent("player", "other", "swupdate: " + a),
                                (sa = !0),
                                f.chmodSync("misc/upgrade.sh", "755"),
                                (d = c("child_process").spawn),
                                (e = f.openSync("/home/pi/forever.log", "a")),
                                (g = f.openSync("/home/pi/forever.log", "a")),
                                (h = d(
                                    "misc/upgrade.sh",
                                    [m.config_server + "/releases/" + a, a],
                                    { detached: !0, stdio: ["ignore", e, g] }
                                )),
                                s.testLog("upgrade", a),
                                void h.unref())
                    );
                }),
                (ua = null),
                (ya = !1),
                (za = !1),
                (Aa = !1),
                (Ba = !1),
                (Ca = !1),
                (Da = !1),
                (Ea = !0),
                (Fa = 4),
                (b.startClient = function (a, b) {
                    if (
                        (a && (wa = a), b ? (xa = b) : a && ((xa = a), (ya = !0)), wa && z)
                    ) {
                        if (ua)
                            try {
                                ua.removeAllListeners(), ua.disconnect();
                            } catch (c) {
                                s.log("error", "socket disconnect exception: " + c.code);
                            }
                        Ia(),
                            Aa ? (ya = !1) : za && (ya = !0),
                            (Ca = !1),
                            ya
                                ? ((ua = xa.connect(m.config_server, {
                                    "force new connection": !0,
                                })),
                                    Ja())
                                : /^(https?|wss?):\/\//.test(m.config_server)
                                    ? Ja(m.config_server)
                                    : i
                                        .get("https://" + m.config_server + "/api/labels")
                                        .then(function () {
                                            Ja("https://" + m.config_server);
                                        })
                                    ["catch"](function (a) {
                                        a.response
                                            ? Ja("https://" + m.config_server)
                                            : (s.log(
                                                "info",
                                                "*** trying with http protocol for socket.io as https to server returned status undefined"
                                            ),
                                                Ja("http://" + m.config_server));
                                    })
                                        .then(function () { });
                    }
                }),
                (La = 0),
                (Ma = function () {
                    t.wlanReboot(function () {
                        b.startClient();
                    });
                }),
                (b.uploadLog = function (a, b) {
                    Ha() &&
                        (ua.emit("upload", x.cpuSerialNumber, a, b),
                            s.testLog("upload", a));
                }),
                (b.statusLog = function () {
                    var a = { connected: Ha(), tvUptime: w.cecTvStatus };
                    return (
                        w.currentPlaylist &&
                        (a[
                            "playlist_" + w.currentPlaylist.replace(/[^a-zA-Z0-9]/g, "_")
                        ] = 1),
                        a
                    );
                }),
                (Sa = 0),
                (b.playlistMedia = function (a, b) {
                    var c = a.params.action,
                        d = Va(c, !0);
                    r.sendSuccess(b, "Playlist " + c, d);
                }),
                (b.piswupdate = function (a, b) {
                    return (
                        ta(), r.sendSuccess(b, "Player will update the software & reboot")
                    );
                }),
                (Wa = function (a, b, c, d) {
                    var e;
                    f.readFile(a, "utf8", function (a, g) {
                        a
                            ? d(a)
                            : ((e = k.compile(g)({ pageData: b })),
                                f.writeFile(c, e, function (a) {
                                    a ? d(a) : (s.log("info", "Created: " + c), d());
                                }));
                    });
                }),
                f.readdir("/dev/input/by-id", function (a, b) {
                    var c, d, e;
                    if (a || !b)
                        return (
                            s.log("error", "No USB devices for input are present"),
                            void console.log(a)
                        );
                    for (c = null, d = 0; d < b.length; d++)
                        if ("-kbd" === b[d].slice(-4)) {
                            c = "/dev/input/by-id/" + b[d];
                            break;
                        }
                    return null === c
                        ? (s.log("error", "No keyboard is present"), void console.log(b))
                        : (s.log("info", "Using device for keyboard events: " + c),
                            (e = f.createReadStream(c)),
                            e.on("data", function (a) {
                                var b, c, d;
                                if (1 !== parseInt(a[24]) || 0 !== parseInt(a[28]))
                                    return void s.log("info", "Ignoring the keypress event ");
                                for (
                                    s.log(
                                        "info",
                                        "Key pressed, event (01): " +
                                        a[24] +
                                        ", scan code: " +
                                        a[26] +
                                        ", press/release(0): " +
                                        a[28]
                                    ),
                                    b = parseInt(a[26]),
                                    c = 0;
                                    c < J.length;
                                    c++
                                )
                                    K[c] = !1;
                                for (c = 0; c < J.length; c++)
                                    if (
                                        J[c].settings.keyPress.enable &&
                                        b == parseInt(J[c].settings.keyPress.key)
                                    ) {
                                        s.log(
                                            "info",
                                            "Playing Keypress  playlist: " +
                                            J[c].name +
                                            "; key: " +
                                            J[c].settings.keyPress.key
                                        ),
                                            (K[c] = !0);
                                        break;
                                    }
                                (d = fb(!0)),
                                    w.currentPlaylist !== d.selectedPlaylist &&
                                    (s.log(
                                        "info",
                                        "Changing playlist from " +
                                        w.currentPlaylist +
                                        " to " +
                                        d.selectedPlaylist
                                    ),
                                        (w.currentPlaylist = d.selectedPlaylist),
                                        (w.playlistIndex = d.index),
                                        (N = d.otherSelectedPlaylists),
                                        c < J.length
                                            ? (w.localControl = !0)
                                            : (w.localControl = !1),
                                        ea(function () { }));
                            }),
                            e.on("error", function (a) {
                                s.log("error", c + " error event: " + a);
                            }),
                            void e.on("close", function () {
                                s.log("error", c + " abruptly closed");
                            }));
                }),
                (nb = null),
                (wb = !1),
                (xb = function () {
                    (Q = !1), (wb = !1);
                }),
                process
                    .on("SIGUSR2", function () {
                        var b = function () {
                            var a = fb();
                            (w.currentPlaylist = a.selectedPlaylist),
                                (w.playlistIndex = a.index),
                                (N = a.otherSelectedPlaylists),
                                (w.localControl = !0),
                                ea(function () {
                                    a.isEventPlaylist &&
                                        I[a.index].settings.event &&
                                        I[a.index].settings.event.duration > 1
                                        ? setTimeout(function () {
                                            xb(), b();
                                        }, 1e3 * I[a.index].settings.event.duration)
                                        : (wb = !1);
                                });
                        };
                        return wb
                            ? void s.log("info", "SIGUSR2 event, skipping due to debounce")
                            : (s.log("info", "SIGUSR2 event, scheduling event playlist"),
                                (wb = !0),
                                void (I.length > 0
                                    ? ((Q = !Q), b())
                                    : (s.log(
                                        "info",
                                        "no event playlist available, continuing to play normal playlist"
                                    ),
                                        q.showUi())));
                    })
                    .on("exit", function () {
                        s.log("debug", "Exiting node process for restart");
                    }),
                (b.uploadForeverLog = function () { });
        }),
        c.register("./app/controllers/pi-viewer.js", function (a, b, c) {
            "use strict";
            function Mb(a) {
                e(G.systemScript + "--clean-chrome-session", function (b, c, d) {
                    (b || d) &&
                        i.log(
                            "error",
                            "Error in changing restore session flag" + b + "  " + d
                        ),
                        a();
                });
            }
            function Nb() {
                (T = !0), clearTimeout(V);
            }
            function Ob() {
                var a, b, c, g;
                if (((S = !1), (T = !1), O)) {
                    if ($)
                        return void e("killall -s 9 chromium-browser", function () {
                            i.log("info", "killing previous chrome browser, " + (O && O.pid));
                        });
                    i.log("info", "killing previous uzbl:" + O.pid), O.kill();
                }
                (Na = !0),
                    (Oa = !1),
                    Ha.indexOf("custom") >= 0
                        ? ((b = f.existsSync(G.mediaPath + Ka)),
                            (a = b
                                ? G.mediaPath + Ka
                                : G.root + "/templates/custom_layout.html"))
                        : (a = G.root + "/templates/" + Ha + ".html"),
                    (c = [
                        "--allow-file-access-from-files",
                        "--disable-session-crashed-bubble",
                        "--disable-infobars",
                        "--disable-notifications",
                        "--disable-device-discovery-notifications",
                        "--disable-quic",
                        "--disable-features=Translate",
                        "--disable-features=TranslateUI",
                        "--disable-popup-blocking",
                        "--user-data-dir=/home/pi/.config/chromium/Default",
                        "--enable-fast-unload",
                        "--enable-tcp-fast-open",
                        "--noerrdialogs",
                        "--no-first-run",
                        "--proxy-auto-detect",
                        "--start-fullscreen",
                        "--start-maximized ",
                        "--disk-cache-size=30000000",
                        "--kiosk",
                        "--kiosk-printing",
                        "--disable-pinch",
                        "--overscroll-history-navigation=0",
                        "--autoplay-policy=no-user-gesture-required",
                        "--check-for-update-interval=1",
                        "--simulate-critical-update",
                        a,
                    ]),
                    (O = $
                        ? d("chromium-browser", c, { stdio: "pipe" })
                        : "v0.9.0" == Z
                            ? d("uzbl", ["--geometry=maximized", "-c", "-", a, "-p"], {
                                stdio: "pipe",
                            })
                            : d("uzbl", ["-g", "maximized", "-c", "-", "--uri", a, "-p"], {
                                stdio: "pipe",
                            })),
                    i.log("info", "Browser loading " + a + "; Running as PID " + O.pid),
                    O.on("error", function (a) {
                        i.log("error", "browser spawn error: " + a);
                    }),
                    O &&
                    (O.once("exit", function (a, b) {
                        (O = null),
                            i.log(
                                "info",
                                "browser stopped with code " + a + " and signal " + b
                            ),
                            $ &&
                            Mb(function () {
                                Ob();
                            });
                    }),
                        O.stdout.on("data", function (a) {
                            var b, c;
                            $ ||
                                ((b = a.toString("utf8")),
                                    (c = T),
                                    X &&
                                    (0 == X.indexOf("uri") &&
                                        b.indexOf("LOAD_FINISH") >= 0 &&
                                        Nb(),
                                        0 != X.indexOf("uri") &&
                                        b.indexOf("COMMAND_EXECUTED") >= 0 &&
                                        Nb()));
                        }),
                        O.stderr.on("data", function (a) {
                            i.log("info", "browser stderr: " + a.toString("utf8"));
                        }),
                        O.stdin.on("error", function (a) {
                            i.log("info", "browser stdin error: " + a);
                        }),
                        $
                            ? (La.currentTicker && dc(La.currentTicker), Pb())
                            : ((g = Y ? "/misc/uzblrc-v2" : "/misc/uzblrc"),
                                O.stdin.write(f.readFileSync(G.root + g) + "\n", function (a) {
                                    a && i.log("error", "uzbl command callback error: " + a),
                                        Nb(),
                                        j.getUzblBrowserCookies(O),
                                        La.currentTicker && dc(La.currentTicker),
                                        Pb();
                                })));
            }
            function Pb(a) {
                (U = !0),
                    (a = a || 0),
                    Rb(
                        "js window.setInitialParameters(" +
                        Ua +
                        ',"' +
                        Xa +
                        '",' +
                        Ya +
                        "," +
                        a +
                        "," +
                        Za +
                        ',"' +
                        Va +
                        '",' +
                        (_ ? !1 : gb.showClock) +
                        "," +
                        gb.clockExtendedFormat +
                        "," +
                        gb.clockPosition +
                        "," +
                        Ra +
                        "," +
                        Sa +
                        ")"
                    );
            }
            function Rb(a) {
                if ((a && W.push(a), 0 == W.length))
                    return void i.log("info", "Browser: No command to issue");
                if (!T) return clearTimeout(Qb), void (Qb = setTimeout(Rb, 500));
                if (((T = !1), O))
                    try {
                        (X = W[0]),
                            $
                                ? ((V = setTimeout(function () {
                                    i.log("error", "Chrome: no completion event: " + X),
                                        Ob(),
                                        yc();
                                }, 1e4)),
                                    ld(W[0]))
                                : ((V = setTimeout(function () {
                                    (T = !0), i.log("error", "uzbl: no completion event: " + X);
                                }, 3e3)),
                                    Y &&
                                    0 == W[0].indexOf("js") &&
                                    (W[0] = "js page string '" + W[0].slice(3) + "'"),
                                    O.stdin.write(W[0] + "\n", function (a) {
                                        a && i.log("error", "uzbl command callback error: " + a);
                                    }));
                    } catch (b) {
                        i.log("error", "browser stdin write exception: " + b.code);
                    }
                else i.log("warn", "No browser instance, restarting the browser"), Ob();
                W.shift(), 0 == W.length ? (clearTimeout(Qb), (Qb = null)) : Rb();
            }
            function Ub(a) {
                clearTimeout(Sb),
                    a &&
                    !$ &&
                    (Sb = setTimeout(function () {
                        e("ps aux |grep uzbl-core|awk '{print $4 }'")
                            .stdout.on("data", function (a) {
                                Tb = parseInt(a) > 70;
                            })
                            .on("close", function () {
                                Ub(!0);
                            });
                    }, 6e5));
            }
            function Vb(a, b, c, d) {
                var e = ["00:00:00,000 --> 00:05:00,000", b];
                i.log("debug", "writing srt file, " + b),
                    f.writeFile(G.mediaPath + a + ".srt", e.join("\n"), function (a) {
                        a && i.log("error", "error writing srt file, " + a), d && d();
                    });
            }
            function Wb() {
                var b,
                    c,
                    a = 0;
                clearTimeout(ma),
                    "landscape" == L &&
                    Ha.indexOf("p") >= 0 &&
                    (a = -1 == Ha.indexOf("270") ? 90 : 270),
                    Ha.indexOf("custom") >= 0
                        ? ((c = f.existsSync(G.mediaPath + Ka)),
                            (b = c
                                ? G.mediaPath + Ka
                                : G.root + "/templates/custom_layout.html"))
                        : (b = G.root + "/templates/" + Ha + ".html"),
                    Rb("uri " + b),
                    Pb(a);
            }
            function Xb() {
                clearTimeout(ma), Rb("js window.clearZoneAll()"), j.removeWebLinkView();
            }
            function Yb() {
                clearTimeout(ma),
                    Rb('js window.clearZone("main")'),
                    j.removeWebLinkView("main");
            }
            function Zb(a) {
                Rb('js window.clearZone("' + a + '")');
            }
            function ac(a) {
                var b = encodeURIComponent(a),
                    c = b.replace(/%25([0-9a-f]{2})/i, "%$1");
                return c;
            }
            function bc(a) {
                "1080p" == J && (a += 2),
                    "landscape" == L && Ha.indexOf("p") >= 0
                        ? ((pa = -1 == Ha.indexOf("270") ? 90 : 270), (a += 4))
                        : (pa = 0),
                    (Cb = a),
                    (Bb = Pa ? Pa : Hb(Ha, a % 2, "landscape" != L).main),
                    k.getDisplayProperties(function (a, b) {
                        b && b.indexOf("NTSC") >= 0
                            ? ((Gb = Eb), (Bb = Eb))
                            : b && b.indexOf("PAL") >= 0 && ((Gb = Fb), (Bb = Fb));
                    });
            }
            function cc() {
                M
                    ? (bc(0),
                        O && !Na && ((Na = !0), Rb("js window.clearTicker()")),
                        (gb.tickerEnable = !1),
                        Mc(),
                        aa && Oc())
                    : dc(" ");
            }
            function dc(a) {
                var b = La.behavior || "slide",
                    c = La.textSpeed || 3;
                M || ((b = "scroll"), "slide" != b && (a += N)),
                    (_ || aa) && 0 == b.indexOf("openvg")
                        ? (bc(_ ? 0 : 1),
                            (gb.tickerEnable = !0),
                            (gb.tickerX = La.tickerX),
                            (gb.tickerY = La.tickerY),
                            (gb.tickerWidth = La.tickerWidth),
                            (gb.tickerSpeed = c),
                            (gb.tickerDir = "left" == b.replace(/openvg_/, "") ? 0 : 1),
                            (gb.tickerFontSize = La.tickerFontSize),
                            (gb.tickerText = a),
                            O && !Na && ((Na = !0), Rb("js window.clearTicker()")))
                        : ("openvg_left" == b
                            ? (b = "scroll")
                            : "openvg_right" == b && (b = "scrollRight"),
                            (Na = !1),
                            (gb.tickerEnable = !1),
                            bc(1),
                            Rb(
                                'js window.setTicker("' + ac(a) + '","' + b + '","' + c + '")'
                            )),
                    Mc(),
                    aa && Oc();
            }
            function fc(a, c) {
                var d = function (b) {
                    b &&
                        (ec = setTimeout(function () {
                            b > 1 && fc(a, b - 1);
                        }, 1e3));
                };
                clearTimeout(ec),
                    (gb.eMsgCmd = v),
                    (gb.eMsg = "Playing " + (c ? "(duration: " + c + " ) " : "") + a),
                    (gb.eMsgHorizontal = p),
                    (gb.eMsgVertical = u),
                    aa
                        ? b.setEmergencyMessage(gb.eMsg, gb.eMsgHorizontal, gb.eMsgVertical)
                        : Mc(),
                    d(c);
            }
            function hc(a) {
                Rb('js window.changeTickerStyle("' + a + '")');
            }
            function ic(a) {
                Rb('js window.changeTickerHeight("' + a + '")');
            }
            function jc(a) {
                if (a) {
                    var b = a.split(" "),
                        c = b[2] - b[0],
                        d = b[3] - b[1],
                        e = b[0],
                        f = b[1];
                    return c + "x" + d + "+" + e + "+" + f;
                }
            }
            function kc(a, b) {
                function c(a) {
                    return b ? a : jc(a);
                }
                if ((Pa && !Qa) || Gb || !a) return c(Bb);
                var d = "1";
                return (
                    Ha.indexOf("p270") >= 0
                        ? (d = "2ap270")
                        : Ha.indexOf("p") >= 0 && (d = "2ap"),
                    c(Hb(d, Cb % 2, "landscape" != L).main)
                );
            }
            function lc(a, b) {
                function c(a) {
                    return a ? (b ? a : jc(a)) : void 0;
                }
                return c(Ta[a] ? Ta[a] : Hb(Ha, Cb % 2, "landscape" != L)[a]);
            }
            function mc() {
                return Gb ? "local" : hb.playing ? "hdmi" : "both";
            }
            function nc(a, b, c, e, f, g, h, j) {
                var n,
                    o,
                    p,
                    q,
                    k = Fa,
                    l = !1,
                    m = kb ? "mpv" : "omx";
                kb
                    ? ((n = [
                        "mpv",
                        "--rpi-osd=no",
                        "--video-rotate=" + pa,
                        "--geometry=" + kc(c, !1),
                        "--volume=" + tb,
                    ]),
                        Array.isArray(a) ? (n = n.concat(a)) : n.push(a))
                    : ((n = [
                        "omxplayer",
                        "--orientation",
                        pa,
                        "--win",
                        kc(c, !0),
                        "--vol",
                        sb,
                        "--no-osd",
                        "-o",
                        mc(),
                        a,
                    ]),
                        j && n.push("--avdict", "rtsp_transport:tcp")),
                    $a
                        ? kb
                            ? n.push("--keepaspect")
                            : n.push("--aspect-mode", "letterbox")
                        : kb && n.push("--no-keepaspect"),
                    f || ub
                        ? kb
                            ? n.push("--mute")
                            : n.push("-n", "-1")
                        : (sc(), (na = a), (oa = !1), (l = !0)),
                    kb && lb && n.push("--audio-delay=" + lb),
                    h && !kb && n.push("--subtitles", a + ".srt"),
                    e &&
                    ((o = parseInt(e / 3600)),
                        (p = parseInt((e - 60 * o) / 60)),
                        (q = e - 60 * (60 * o + p)),
                        10 > o && (o = "0" + o),
                        10 > p && (p = "0" + p),
                        10 > q && (q = "0" + q),
                        kb
                            ? n.push("--start=+" + o + ":" + p + ":" + q)
                            : n.push("--pos", o + ":" + p + ":" + q)),
                    pb ||
                    fb ||
                    !(
                        (1 == Aa.length &&
                            Aa[0].filename &&
                            Aa[0].filename.match(G.videoRegex)) ||
                        (kb && g)
                    ) ||
                    (kb && g && Aa.length > 1
                        ? n.push("--loop-playlist")
                        : n.push("--loop"),
                        setTimeout(function () {
                            clearTimeout(ja);
                        }, 0)),
                    (ga = d("sudo", n, { stdio: "pipe" })),
                    ga.once("exit", function (a, c) {
                        i.log("debug", "omx exit event with code " + a + "," + c),
                            l && ((oa = !0), (na = "")),
                            b && (clearTimeout(ja), b(k));
                    }),
                    ga.stdout.on("data", function () { }),
                    ga.stderr.on("data", function () { }),
                    ga.stdin.on("error", function (a) {
                        i.log(
                            "error",
                            m + " process stdin error: " + a + "*********************"
                        );
                    });
            }
            function oc(a, b) {
                if (((b = b || ga), rb[a] && b && b.stdin))
                    try {
                        b.stdin.write(rb[a], function (b) {
                            b &&
                                i.log(
                                    "error",
                                    "omxplayer command callback error: " + b + "," + a
                                );
                        });
                    } catch (c) {
                        i.log("error", "omxplayer stdin write exception: " + c);
                    }
                else
                    i.log(
                        "error",
                        "No omxplayer instance or omxplayer command not found: " + a
                    );
            }
            function pc(a, b, c, d, e, f, g, h, j) {
                return (
                    d ? Xb() : Yb(),
                    o(ga)
                        ? (i.log("error", "need to kill omxProcess to start another"),
                            c
                                ? (ga.stdin.pause(),
                                    n(ga.pid, function () {
                                        setTimeout(function () {
                                            nc(a, b, d, e, f, g, h, j);
                                        }, 250);
                                    }),
                                    !0)
                                : !1)
                        : (nc(a, b, d, e, f, g, h, j), !0)
                );
            }
            function qc() {
                return o(ga) ? (ga.stdin.pause(), n(ga.pid), !0) : !1;
            }
            function rc(a, b) {
                var c = Fa,
                    e = !1,
                    f = [
                        "omxplayer",
                        "--vol",
                        sb,
                        "--no-osd",
                        "--audio_fifo",
                        "30",
                        "--audio_queue",
                        "0.6",
                        "--threshold",
                        "2",
                        "--timeout",
                        "30",
                        "-o",
                        mc(),
                        a,
                    ];
                return oa
                    ? (sc(),
                        (na = a),
                        (oa = !1),
                        (e = !0),
                        b || f.push("--loop"),
                        o(ha) && (ha.stdin.pause(), n(ha.pid)),
                        (ha = d("sudo", f, { stdio: "pipe" })),
                        ha.once("exit", function () {
                            clearTimeout(ka), e && ((na = ""), (oa = !0)), b && b(c);
                        }),
                        void ha.stdin.on("error", function (a) {
                            i.log(
                                "error",
                                "audio omxProcess stdin error: " + a + "*********************"
                            );
                        }))
                    : void i.log("warn", "Audio channel is not free " + a);
            }
            function sc() {
                return (na = ""), o(ha) ? (ha.stdin.pause(), n(ha.pid), !0) : !1;
            }
            function tc(a, b, c, e, f, g) {
                function p(a) {
                    m || 143 == a || ((m = !0), c(h));
                }
                var l,
                    m,
                    h = Ga[a],
                    j = !1,
                    k = c ? !1 : !0;
                return (
                    (c = c || function () { }),
                    -1 == Jb.indexOf(a)
                        ? c()
                        : lc(a, !0)
                            ? (kb
                                ? (l = [
                                    "mpv",
                                    "--rpi-osd=no",
                                    "--video-rotate=" + pa,
                                    "--geometry=" + lc(a, !1),
                                    "--volume=" + tb,
                                    "--rpi-layer=5",
                                    b,
                                ])
                                : ((l = [
                                    "omxplayer",
                                    "--orientation",
                                    pa,
                                    "--win",
                                    lc(a, !0),
                                    "--vol",
                                    sb,
                                    "--no-osd",
                                    "-o",
                                    mc(),
                                    "--layer",
                                    "5",
                                    b,
                                ]),
                                    f && l.push("--avdict", "rtsp_transport:tcp")),
                                $a
                                    ? kb
                                        ? l.push("--keepaspect")
                                        : l.push("--aspect-mode", "letterbox")
                                    : kb && l.push("--no-keepaspect"),
                                e || !oa || ub
                                    ? kb
                                        ? l.push("--mute")
                                        : l.push("-n", "-1")
                                    : (sc(), (oa = !1), (j = !0), (na = b)),
                                kb && lb && l.push("--audio-delay=" + lb),
                                k && l.push("--loop"),
                                g && !kb && l.push("--subtitles", b + ".srt"),
                                o(ia[a]) && (ia[a].stdin.pause(), n(ia[a].pid)),
                                (ia[a] = d("sudo", l, { stdio: "pipe" })),
                                Zb(a),
                                ia[a].stdin.setEncoding("utf-8"),
                                ia[a].stdin.on("error", function () { }),
                                ia[a].stdout.on("data", function () { }),
                                ia[a].stderr.on("data", function () { }),
                                ia[a].on("exit", function (a) {
                                    j && ((oa = !0), (na = "")), p(a);
                                }),
                                ia[a].on("error", function (b) {
                                    i.log(
                                        "info",
                                        "error event for " + a + " with code " + b + "," + h
                                    );
                                }),
                                void (m = !1))
                            : c()
                );
            }
            function uc(a, b) {
                b = b || function () { };
                var c = !1,
                    d = function () {
                        c || ((c = !0), b());
                    };
                o(ia[a]) ? (ia[a].stdin.pause(), n(ia[a].pid, d)) : d();
            }
            function vc(a) {
                var b = c("./pi-main").getSettingsData();
                return (
                    a &&
                    ((a = a.replace(/__cpuid__/g, b.cpuSerialNumber || "NA")),
                        (a = a.replace(/__ipaddress__/g, b.myIpAddress || "NA")),
                        (a = a.replace(/__playername__/g, b.name || "NA")),
                        (a = a.replace(/__group__/g, b.secret || "NA"))),
                    a
                );
            }
            function wc(a, b) {
                f.readFile(a, "utf8", function (c, d) {
                    if (c)
                        i.log("error", "error in reading URL file " + a),
                            b("error in reading URL file");
                    else
                        try {
                            var e = JSON.parse(d);
                            (e.link = vc(e.link)), b(null, e);
                        } catch (f) {
                            i.log("error", "error in parsing URL file " + a),
                                console.log(f),
                                b("error in parsing URL file");
                        }
                });
            }
            function xc(a, b, c, e) {
                function j() {
                    ca && (l.keyTap("down"), (f = setTimeout(j, c)));
                }
                var f, g, h;
                (c = 1e3 * c),
                    (g = Fa),
                    (h = ["-s"]),
                    h.push(a),
                    yc(),
                    e ? Xb() : Yb(),
                    (ca = d("evince", h, { stdio: "pipe" })),
                    ca && i.log("info", "evince process spawned " + h),
                    ca.stdin.setEncoding("utf-8"),
                    ca.once("exit", function () {
                        clearTimeout(f), b && b(g);
                    }),
                    ca.stdin.on("error", function (a) {
                        i.log(
                            "error",
                            "evinceProcess stdin error: " + a + "*********************"
                        );
                    }),
                    c && (f = setTimeout(j, c));
            }
            function yc() {
                clearTimeout(da), ca && (ca.kill(), (ca = null));
            }
            function zc() {
                for (
                    var a = {
                        filepath: [G.mediaPath + (Aa[Ca] && Aa[Ca].filename)],
                        duration: parseInt(Aa[Ca].duration || 300),
                        loopAll: 0 == Ca,
                    },
                    b = Ca;
                    b < Aa.length - 1 &&
                    ((b = (b + 1) % Aa.length),
                        Aa[b] && Aa[b].filename && Aa[b].filename.match(G.videoRegex));

                )
                    a.filepath.push(G.mediaPath + Aa[b].filename),
                        (a.duration += parseInt(Aa[b].duration || 300)),
                        (Ca = b);
                return (
                    (a.loopAll = a.loopAll && Ca == Aa.length - 1),
                    a.filepath.length > 1 &&
                    i.log("info", "merged videos for play: " + a.filepath),
                    a
                );
            }
            function Ac(a, b, c, d, e, f, g, h, k, l) {
                var p,
                    m = Ga[a],
                    n = function (b) {
                        na == b
                            ? d && d(m)
                            : e
                                ? tc(a, b, d)
                                : (tc(a, b, null),
                                    setTimeout(function () {
                                        d && d(m);
                                    }, 1e3));
                    },
                    o = function () {
                        d &&
                            ((c = c || 10),
                                clearTimeout(qa[a]),
                                (qa[a] = setTimeout(function () {
                                    uc(a), j.removeWebLinkView(a), d(m);
                                }, 1e3 * c))),
                            h();
                    },
                    q = null,
                    r = null,
                    s = l || null,
                    t = null;
                if (
                    (b &&
                        (ib && H.storeEvent("file", "play", b + "/" + c), H.logFilePlay(b)),
                        b)
                )
                    if (b.match(G.mediaRss) || b.match(G.localFolderRegex)) {
                        if (!(eb[b] && eb[b].feeds && eb[b].feeds.length))
                            return i.log("error", "feed is empty " + b), void o();
                        (q = eb[b]),
                            eb[b].duration && (c = parseInt(eb[b].duration)),
                            (t = eb[b].style),
                            (b = q.feeds[q.subIndex].piSignageLink),
                            (p = b),
                            (r = q.feeds[q.subIndex].piSignageType),
                            (s = q.feeds[q.subIndex].piSignageBanner),
                            q.feeds[q.subIndex].piSignageDuration &&
                            ((c = parseInt(q.feeds[q.subIndex].piSignageDuration)),
                                i.log(
                                    "debug",
                                    "Duration of play changed to mrss duration: " + c
                                )),
                            (q.subIndex = (q.subIndex + 1) % q.feeds.length),
                            (c = c || 10);
                    } else
                        p =
                            b.indexOf("://") >= 0 ||
                                0 == b.indexOf("\\") ||
                                0 == b.indexOf("/")
                                ? b
                                : G.mediaPath + b;
                else (b = "smiley-face.png"), (p = G.defaultTemplateDir + b);
                if (
                    (i.log(
                        "debug",
                        "playing next file in subZone: " + a + ";" + p + ";" + m + ";" + r
                    ),
                        b.match(G.videoRegex) || "video" === r)
                )
                    k ? uc(a) : tc(a, p, d, e, !1, s), (c = c ? c + 10 : 300);
                else if (b.match(G.audioRegex))
                    oa
                        ? n(p)
                        : (d && d(m),
                            i.log("warn", "audio channel is not free to play " + b));
                else if (b.match(G.imageRegex) || "image" === r || "text" === r)
                    "text" === r
                        ? g(a, "text", s, t)
                        : s
                            ? g(a, "image-text", p, s)
                            : g(a, "image", p);
                else if (b.match(G.noticeRegex) || "weblink" === r) g(a, "iframe", p);
                else if (b.match(G.pdffileRegex) && $) g(a, "pdf", p);
                else if (b.match(G.zipfileRegex))
                    g(
                        a,
                        "iframe",
                        "http://localhost:8000/media/_" +
                        b.replace(/(.zip|.gz|.bz2)/g, ".repo") +
                        "/index.html"
                    );
                else if (b.match(G.radioFileRegex))
                    wc(p, function (a, c) {
                        a ||
                            (oa
                                ? n(c.link)
                                : (d && d(m),
                                    i.log("warn", "audio channel is not free to play " + b)));
                    });
                else if (b.match(G.omxStreamRegex))
                    wc(p, function (b, d) {
                        b || (tc(a, d.link, null, e, d.tcp), (c = c ? c + 10 : 300));
                    });
                else if (b.match(G.linkURL))
                    h(!0),
                        wc(p, function (b, c) {
                            b || g(a, "iframe", c.link), h();
                        });
                else if (b.match(G.CORSLink)) {
                    if (k) return void j.removeWebLinkView(a);
                    if (-1 == Kb.indexOf(a) || !lc(a, !1) || !$) return;
                    h(!0),
                        wc(p, function (b, c) {
                            b ||
                                j.showWebLinkView(a, c.link, d, m, {
                                    videoWindowSize: lc(a, !1),
                                    urlReloadDisable: Ya,
                                    kioskMode: !1,
                                    zoom: c.zoom,
                                    keystrokes: c.keystrokes,
                                    keyDelay: c.keyDelay,
                                    scroll: c.scroll,
                                }),
                                h();
                        });
                } else
                    b.match(G.txtFileRegex)
                        ? (h(!0),
                            wc(p, function (b, c) {
                                b ||
                                    ((c.message = vc(c.message)),
                                        g(a, "text", c.message, c.style)),
                                    h();
                            }))
                        : b.match(G.nestedPlaylist) && !f
                            ? (e &&
                                ((ra[a] = !0),
                                    i.log(
                                        "info",
                                        "running independent playlist " + b + " for zone: " + a
                                    )),
                                Cc(a, b, k))
                            : i.log("error", "File type not supported, for file " + b);
                o();
            }
            function Bc(a, b) {
                clearTimeout(qa[a]),
                    (Ga[a] = (Ga[a] + 1) % 256),
                    uc(a, b),
                    j.removeWebLinkView(a);
            }
            function Cc(a, b, d) {
                function n(b) {
                    Ac(a, null, b || 4, p, !1, !0, j, k, d);
                }
                function o(b) {
                    var c;
                    (e = {}),
                        (g = 0),
                        (h = 0),
                        b && b.filename
                            ? ((b.option = b.option || {}),
                                (c = b.duration || 10),
                                (b.filename.match(G.videoRegex) ||
                                    b.filename.match(G.audioRegex)) &&
                                (c = 5 > c ? 8 : c + 3),
                                (Ga[a] = (Ga[a] + 1) % 256),
                                Ac(
                                    a,
                                    b.filename,
                                    c,
                                    p,
                                    b.option.main,
                                    !0,
                                    j,
                                    k,
                                    d,
                                    b.option.bannerText
                                ))
                            : n();
                }
                function p(b) {
                    b == Ga[a]
                        ? (clearTimeout(qa[a]),
                            m[l] && eb[m[l].filename] && eb[m[l].filename].subIndex
                                ? i.log(
                                    "debug",
                                    "using the same index with subIndex " +
                                    eb[m[l].filename].subIndex
                                )
                                : (l = (l + 1) % m.length),
                            o(m[l]))
                        : i.log(
                            "warn",
                            "skipping nested cbIndex for " + a + "," + b + "," + Ga[a]
                        );
                }
                var e = {},
                    g = 0,
                    h = 0,
                    j = function (a, b, c, d) {
                        h++,
                            (e[a] = {
                                contentType: b,
                                contentPath: "text" === b ? c : encodeURI(c),
                            }),
                            d && (e[a].contentOption = d);
                    },
                    k = function (a) {
                        return a
                            ? g++
                            : g
                                ? g--
                                : void (
                                    h && Rb('js window.setZones("' + ac(JSON.stringify(e)) + '")')
                                );
                    },
                    l = 0,
                    m = [];
                f.readFile(G.mediaPath + b, "utf8", function (d, e) {
                    if (d || !e)
                        i.log("error", "error in reading playlist file " + b), n(), k();
                    else {
                        try {
                            m = JSON.parse(e).assets;
                        } catch (f) {
                            return (
                                i.log("error", "error parsing playlist file " + b),
                                n(),
                                void k()
                            );
                        }
                        c("./pi-main").filterValidAssets(m),
                            i.log("debug", "calling subDisplayNext from main for " + a),
                            m.forEach(function (a) {
                                a.filename.match(G.mediaRss) && ad(a.filename, !0),
                                    a.filename.match(G.localFolderRegex) && cd(a.filename, !0),
                                    a.filename.match(G.videoRegex) &&
                                    a.option.bannerText &&
                                    Vb(a.filename, a.option.bannerText, a.duration || 10);
                            }),
                            o(m[l]);
                    }
                });
            }
            function Dc(a, c, d, e, g, h, k) {
                var o,
                    t,
                    u,
                    v,
                    w,
                    x,
                    y,
                    A,
                    B,
                    l = {},
                    m = 0,
                    n = 0,
                    p = function (a, b) {
                        clearTimeout(ma),
                            (ma = setTimeout(function () {
                                b(o);
                            }, 1e3 * a));
                    },
                    q = function (b, c) {
                        if (na == b) d(o);
                        else if (h.main) {
                            cb = "audio";
                            var e = 1e3 * (c + 10);
                            (bb = e),
                                rc(b, d),
                                clearTimeout(ka),
                                (ka = setTimeout(function () {
                                    i.log(
                                        "warn",
                                        "Audio watchdog Timeout expired, killing audio process: " +
                                        a +
                                        "," +
                                        e
                                    ),
                                        sc();
                                }, e));
                        } else
                            rc(b, null),
                                setTimeout(function () {
                                    d(o);
                                }, 1e3);
                    },
                    r = function (a, b, c, d) {
                        n++,
                            (l[a] = {
                                contentType: b,
                                contentPath: "text" === b ? c : encodeURI(c),
                            }),
                            d && (l[a].contentOption = d);
                    },
                    s = function (a) {
                        return a
                            ? m++
                            : m
                                ? m--
                                : (g ? (l.fullscreen = !0) : (l.fullscreen = !1),
                                    void Rb('js window.setZones("' + ac(JSON.stringify(l)) + '")'));
                    };
                if (
                    ((d = d || function () { }),
                        (h = h || {}),
                        (oa = !0),
                        (Fa = (Fa + 1) % 256),
                        (o = Fa),
                        c || (c = 10),
                        2 > c && (c = 2),
                        k)
                ) {
                    switch (k) {
                        case "cors":
                            g ? Xb() : Yb(),
                                j.showWebLinkView("main", a, d, o, {
                                    videoWindowSize: kc(g, !1),
                                    urlReloadDisable: Ya,
                                    kioskMode: g && Cb % 2 == 0,
                                });
                            break;
                        default:
                            r("main", "iframe", a);
                    }
                    return (
                        s(),
                        clearTimeout(ma),
                        10 > c && (c = 10),
                        void (ma = setTimeout(function () {
                            "cors" == k && j.removeWebLinkView("main", a), d(o);
                        }, 1e3 * c))
                    );
                }
                if (
                    ((u = {}),
                        (v = null),
                        (w = null),
                        (x = null),
                        (y = null),
                        a.match(G.mediaRss) || a.match(G.localFolderRegex))
                ) {
                    if (!(eb[a] && eb[a].feeds && eb[a].feeds.length))
                        return i.log("error", "feed is empty " + a), d(o);
                    (v = eb[a]),
                        eb[a].duration && (c = parseInt(eb[a].duration)),
                        (y = eb[a].style),
                        (a = v.feeds[v.subIndex].piSignageLink),
                        (t = a),
                        (w = v.feeds[v.subIndex].piSignageType),
                        (x = v.feeds[v.subIndex].piSignageBanner),
                        v.feeds[v.subIndex].piSignageDuration &&
                        ((c = parseInt(v.feeds[v.subIndex].piSignageDuration)),
                            i.log(
                                "debug",
                                "Duration of play changed to mrss duration: " + c
                            )),
                        (v.subIndex = (v.subIndex + 1) % v.feeds.length);
                } else if (
                    a.indexOf("://") >= 0 ||
                    0 == a.indexOf("\\") ||
                    0 == a.indexOf("/")
                )
                    t = a;
                else {
                    t = G.mediaPath + a;
                    try {
                        if (!f.existsSync(t)) return d(o);
                    } catch (z) {
                        return (
                            i.log("error", "file check error with existsSync: " + z), d(o)
                        );
                    }
                }
                h.bannerText && La && La.bannerText
                    ? (dc(h.bannerText), (Oa = !0))
                    : Oa && ((Oa = !1), b.showNormalTicker()),
                    x && M
                        ? cc()
                        : La.currentTicker &&
                        !gb.tickerEnable &&
                        Na &&
                        dc(La.currentTicker),
                    (db = a),
                    Ba && i.log("info", "Playing " + a),
                    i.log(
                        "debug",
                        "playing next file: " +
                        a +
                        " time = " +
                        c +
                        ";" +
                        Fa +
                        ";" +
                        wb +
                        ";" +
                        w
                    ),
                    "debug" == i.debugLevel && fc(a, c),
                    ib && H.storeEvent("file", "play", a + "/" + c),
                    H.logFilePlay(a),
                    a.match(G.videoRegex) || "video" === w
                        ? ((A = 3e5),
                            (B = 0),
                            c && 10 != c && (A = 1e3 * (c + 10)),
                            vb && !qb
                                ? ((xb = c),
                                    (A = 1e3 * vb),
                                    (B = wb * vb),
                                    (wb += 1),
                                    wb * vb > xb && (wb = 0))
                                : !kb ||
                                pb ||
                                ya ||
                                v ||
                                ("1" != Ha && 0 != Ha.indexOf("2ap")) ||
                                ((u = zc()), (t = u.filepath), (A = 1e3 * (u.duration + 10))),
                            (cb = "video"),
                            pc(
                                t,
                                d,
                                !0,
                                g,
                                B,
                                h.main,
                                u.loopAll,
                                h.bannerText && (!La || !La.bannerText)
                            ),
                            clearTimeout(ja),
                            (bb = A),
                            (ja = setTimeout(function () {
                                i.log(
                                    "warn",
                                    "watchdog Timeout expired, killing video process: " +
                                    a +
                                    "," +
                                    A
                                ),
                                    qc();
                            }, A)))
                        : a.match(G.audioRegex)
                            ? q(t, c)
                            : a.match(G.imageRegex) || "image" === w || "text" === w
                                ? ((cb = "image"),
                                    "text" === w
                                        ? r("main", "text", x, y)
                                        : x || (h.bannerText && (!La || !La.bannerText))
                                            ? r("main", "image-text", t, x || h.bannerText)
                                            : r("main", "image", t),
                                    p(c, d))
                                : a.match(G.noticeRegex) || "weblink" == w
                                    ? ((cb = "notice"), r("main", "iframe", t), p(c, d))
                                    : a.match(G.pdffileRegex) && $
                                        ? ((cb = "pdf"),
                                            ea && h.main
                                                ? S
                                                    ? (xc(t, d, h.subduration, g),
                                                        (da = setTimeout(function () {
                                                            yc();
                                                        }, 1e3 * c)))
                                                    : d(o)
                                                : (r("main", "pdf", t), p(c, d)))
                                        : a.match(G.zipfileRegex)
                                            ? ((cb = "zip"),
                                                10 > c && (c = 10),
                                                r(
                                                    "main",
                                                    "iframe",
                                                    "http://localhost:8000/media/_" +
                                                    a.replace(/(.zip|.gz|.bz2)/g, ".repo") +
                                                    "/index.html"
                                                ),
                                                p(c, d))
                                            : a.match(G.radioFileRegex)
                                                ? (10 > c && (c = 10),
                                                    wc(t, function (a, b) {
                                                        a ? d(o) : ((cb = "audio"), q(b.link, c));
                                                    }))
                                                : a.match(G.liveStreamRegex) || a.match(G.omxStreamRegex)
                                                    ? wc(t, function (b, e) {
                                                        b
                                                            ? d(o)
                                                            : (0 == e.link.indexOf("rtsp://") ||
                                                                0 == e.link.indexOf("udp://") ||
                                                                a.match(G.omxStreamRegex)
                                                                ? pc(e.link, d, !0, g, 0, h.main, null, null, e.tcp)
                                                                : Ic(e.link, d, g, h.main),
                                                                (cb = "liveStream"),
                                                                clearTimeout(la),
                                                                (c = c || 60),
                                                                10 > c && (c = 10),
                                                                (bb = c),
                                                                (la = setTimeout(function () {
                                                                    i.log(
                                                                        "debug",
                                                                        "watchdog Timeout expired, killing liveStream process: " +
                                                                        a +
                                                                        "," +
                                                                        c
                                                                    ),
                                                                        Jc();
                                                                }, 1e3 * c)));
                                                    })
                                                    : a.match(G.linkURL) ||
                                                        a.match(G.CORSLink) ||
                                                        a.match(G.txtFileRegex)
                                                        ? (10 > c && (c = 10),
                                                            s(!0),
                                                            wc(t, function (b, e) {
                                                                b
                                                                    ? d(o)
                                                                    : ((e.link = vc(e.link)),
                                                                        a.match(G.linkURL)
                                                                            ? r("main", "iframe", e.link)
                                                                            : a.match(G.CORSLink)
                                                                                ? (g ? Xb() : Yb(),
                                                                                    j.showWebLinkView("main", e.link, d, o, {
                                                                                        videoWindowSize: kc(g, !1),
                                                                                        urlReloadDisable: Ya,
                                                                                        kioskMode: g && Cb % 2 == 0,
                                                                                        zoom: e.zoom,
                                                                                        keystrokes: e.keystrokes,
                                                                                        keyDelay: e.keyDelay,
                                                                                        scroll: e.scroll,
                                                                                    }))
                                                                                : a.match(G.txtFileRegex) &&
                                                                                ((e.message = vc(e.message)),
                                                                                    r("main", "text", e.message, e.style)),
                                                                        (cb = "webLink"),
                                                                        s(),
                                                                        clearTimeout(ma),
                                                                        (ma = setTimeout(function () {
                                                                            a.match(G.CORSLink) &&
                                                                                j.removeWebLinkView("main", e.link),
                                                                                d(o);
                                                                        }, 1e3 * c)));
                                                            }))
                                                        : (i.log("error", "File type not supported, for file " + a), d(o)),
                    Ib[Ha].forEach(function (a) {
                        var b = e && e[a],
                            c = function (b) {
                                var e = {},
                                    f = 0;
                                (n = 0),
                                    (r = function (a, b, c, d) {
                                        n++,
                                            (e[a] = {
                                                contentType: b,
                                                contentPath: "text" === b ? c : encodeURI(c),
                                            }),
                                            d && (e[a].contentOption = d);
                                    }),
                                    (s = function (a) {
                                        return a
                                            ? f++
                                            : f
                                                ? f--
                                                : void (
                                                    n &&
                                                    Rb(
                                                        'js window.setZones("' +
                                                        ac(JSON.stringify(e)) +
                                                        '")'
                                                    )
                                                );
                                    }),
                                    b == Ga[a]
                                        ? (clearTimeout(qa[a]), d(r, s, c))
                                        : i.log(
                                            "warn",
                                            "skipping rss cbIndex for " + a + "," + b + "," + Ga[a]
                                        );
                            },
                            d = function (c, d, e) {
                                (Ga[a] = (Ga[a] + 1) % 256), Ac(a, b, 0, e, h[a], !1, c, d, g);
                            };
                        ra[a] ||
                            ((b || g) &&
                                (s(!0),
                                    Bc(a, function () {
                                        var a = null;
                                        b
                                            ? ((b.match(G.mediaRss) || b.match(G.localFolderRegex)) &&
                                                (a = c),
                                                d(r, s, a))
                                            : s();
                                    })));
                    }),
                    s();
            }
            function Ec(a) {
                for (var c, d, b = a.length; 0 !== b;)
                    (d = Math.floor(Math.random() * b)),
                        (b -= 1),
                        (c = a[b]),
                        (a[b] = a[d]),
                        (a[d] = c);
                console.log(
                    a.map(function (a) {
                        return a.filename;
                    })
                );
            }
            function Hc() {
                switch (cb) {
                    case "video":
                        clearTimeout(ja), qc(), (ga = null);
                        break;
                    case "liveStream":
                        clearTimeout(la), Jc(), (ga = null);
                        break;
                    case "audio":
                        clearTimeout(ka), sc(), (ha = null);
                        break;
                    case "pdf":
                        ea ? (clearTimeout(da), yc()) : clearTimeout(ma);
                        break;
                    case "image":
                    case "zip":
                    case "webLink":
                        clearTimeout(ma), "webLink" == cb && j.removeWebLinkView();
                        break;
                    default:
                        i.log(
                            "error",
                            "Current playing file " + db + " of unknown type " + cb
                        );
                }
            }
            function Ic(a, b, c, d) {
                var g,
                    h,
                    j,
                    f = Fa;
                qc(),
                    sc(),
                    (na = a),
                    (g = d || ub ? -6e3 : sb),
                    (h = jb ? "youtube-dl --format best " : "yt-dlp -f b "),
                    (j = kb
                        ? "sudo mpv  --rpi-osd=no --volume=" +
                        tb +
                        (d || ub ? " --mute" : "") +
                        "  --video-rotate=" +
                        pa +
                        "  --geometry=" +
                        kc(c, !1) +
                        "  $(" +
                        h +
                        "  -ciw -g '" +
                        a +
                        "')"
                        : "sudo omxplayer  --no-osd  --vol  " +
                        g +
                        "  -o  " +
                        mc() +
                        "  --orientation " +
                        pa +
                        "  --win  '" +
                        kc(c, !0) +
                        "'  $(" +
                        h +
                        "  -g  '" +
                        a +
                        "')"),
                    (Db = e(j, { maxBuffer: 25e6 }, function (a) {
                        a && i.log("debug", "error on tvProcess exit: " + a);
                    })),
                    c ? Xb() : Yb(),
                    Db.stdout.on("data", function (a) {
                        var b = a.toString("utf8");
                        b.indexOf("Starting") >= 0 && (c ? Xb() : Yb()),
                            b.indexOf("This plugin does not support protected videos") > 0 &&
                            Jc();
                    }),
                    Db.stderr.on("data", function (a) {
                        var b = a.toString("utf8");
                        -1 == b.indexOf("Dropped:") &&
                            -1 == b.indexOf("Cache:") &&
                            i.log("info", "livestreamer/ydl error " + b);
                    }),
                    Db.once("exit", function (a, d) {
                        Fa == f && (c ? Xb() : Yb()),
                            clearTimeout(la),
                            (na = ""),
                            i.log("debug", "youtube-dl/yt-dlp exit : " + a + ";" + d),
                            b && b(f);
                    });
            }
            function Jc() {
                o(Db) && (Db.stdin.pause(), n(Db.pid)), qc();
            }
            function Lc(a, b, c) {
                var g,
                    e = parseInt((2e3 * Math.log(hb.volume / 100)) / Math.LN10),
                    f = ["omxplayer", "--vol", e, "--no-osd", "-o", c ? "both" : "local"],
                    h = Date.now();
                "radio" == hb.files[a].type
                    ? f.push(hb.files[a].filename)
                    : f.push(G.mediaPath + hb.files[a].filename),
                    (g = hb.playRandom ? Math.floor(1e4 * Math.random()) : a + 1),
                    (g %= hb.files.length),
                    (hb.process = d("sudo", f, { stdio: "pipe" })),
                    hb.process.stdin.on("error", function (a) {
                        i.log(
                            "error",
                            "lounge music omxProcess stdin error: " +
                            a +
                            "*********************"
                        );
                    }),
                    hb.process.once("exit", function () {
                        hb.playing &&
                            b == Kc &&
                            (Date.now() - h < 1e3
                                ? setTimeout(function () {
                                    hb.playing && b == Kc && Lc(g, b, c);
                                }, 2e3)
                                : Lc(g, b, c));
                    });
            }
            function Mc(a) {
                function f(a, b) {
                    if (a.length !== b.length) return !1;
                    for (var c = 0; c < a.length; c++) if (a[c] !== b[c]) return !1;
                    return !0;
                }
                function g(a) {
                    var c = "";
                    return (
                        (c += a.eMsgCmd),
                        (c += a.showClock ? " " + a.clockPosition : " " + z),
                        (c += " " + (a.tickerEnable ? y : x)),
                        a.eMsgCmd === v &&
                        (c +=
                            " " +
                            a.eMsg.trim().length +
                            " " +
                            a.eMsgHorizontal +
                            " " +
                            a.eMsgVertical),
                        a.showClock && (c += " " + a.clockFormat),
                        a.tickerEnable &&
                        (c +=
                            " " +
                            a.tickerText.trim().length +
                            " " +
                            a.tickerX +
                            " " +
                            a.tickerY +
                            " " +
                            a.tickerWidth +
                            " " +
                            a.tickerSpeed +
                            " " +
                            a.tickerDir +
                            " " +
                            a.tickerFontSize),
                        a.eMsgCmd === v && (c += " " + a.eMsg.trim()),
                        a.tickerEnable && (c += " " + a.tickerText.trim()),
                        c
                    );
                }
                var b = [],
                    c = "",
                    e = !1;
                return a
                    ? (P && P.stdin.write("" + a), void (Q = []))
                    : void (
                        !R &&
                        _ &&
                        (gb.eMsgCmd === v
                            ? (b.push(gb.eMsgCmd),
                                b.push(gb.eMsg),
                                b.push(gb.eMsgHorizontal),
                                b.push(gb.eMsgVertical))
                            : b.push(w),
                            gb.showClock
                                ? (b.push(gb.clockPosition), b.push(gb.clockFormat))
                                : b.push(z),
                            gb.tickerEnable
                                ? (b.push(y),
                                    b.push(gb.tickerX),
                                    b.push(gb.tickerY),
                                    b.push(gb.tickerWidth),
                                    b.push(gb.tickerSpeed),
                                    b.push(gb.tickerDir),
                                    b.push(gb.tickerFontSize),
                                    b.push(gb.tickerText))
                                : b.push(x),
                            P || ((e = !0), (P = d("openvg_display"))),
                            P &&
                            e &&
                            ((e = !1),
                                i.log(
                                    "info",
                                    "Spawned openvg_display process: " + P.pid + " -> " + b
                                ),
                                P.on("error", function () {
                                    i.log("error", "Failed to spawn openvg_display");
                                }),
                                P.stdout.on("data", function (a) {
                                    i.log("info", a + "");
                                }),
                                P.stderr.on("data", function (a) {
                                    i.log("error", "openvg_error: " + (a + ""));
                                }),
                                P.on("exit", function (a, b) {
                                    i.log(
                                        "error",
                                        "openvg_display process terminated due to receipt of signal " +
                                        b
                                    ),
                                        (P = null),
                                        (Q = []);
                                })),
                            P &&
                            !f(Q, b) &&
                            ((Q = b.slice(0)), (c = g(gb)), P.stdin.write(c)))
                    );
            }
            function Oc() {
                function b(a, b) {
                    (b = b || function () { }),
                        o(ua)
                            ? ua.stdin.write("q\n", function (c) {
                                c && i.log("error", "sdlTickerProcess quit error: " + c),
                                    setTimeout(function () {
                                        ua.kill(), b(a);
                                    }, 500);
                            })
                            : b(a);
                }
                var a = [];
                gb.tickerEnable
                    ? (Nc++,
                        b(Nc, function (b) {
                            return b != Nc
                                ? void i.log(
                                    "warn",
                                    "stale ticker process ignored, " +
                                    gb.tickerText.slice(0, 10)
                                )
                                : (a.push(gb.tickerSpeed),
                                    a.push(gb.tickerDir),
                                    a.push(gb.tickerFontSize),
                                    a.push(gb.tickerText),
                                    a.push(gb.showClock ? 1 : 0),
                                    (ua = d("ticker", a, { stdio: "pipe" })),
                                    ua.on("error", function (a) {
                                        i.log("error", "SDL ticker spawn error: " + a);
                                    }),
                                    ua.stderr.on("data", function (a) {
                                        i.log(
                                            "info",
                                            "sdlTickerProcess stderr: " + a.toString("utf8")
                                        );
                                    }),
                                    void ua.stdin.on("error", function (a) {
                                        i.log("info", "sdlTickerProcess stdin error: " + a);
                                    }));
                        }))
                    : b();
            }
            function Yc(a, b) {
                var c = ob[a];
                (c.currentAdCount = 0),
                    (c.timer = setTimeout(function () {
                        if (((c.adReady = !0), !wa)) {
                            var a = parseInt(c.files[c.index].duration);
                            (qb = !0),
                                Dc(
                                    c.files[c.index].filename,
                                    a,
                                    Fc,
                                    c.files[c.index],
                                    c.files[c.index].fullscreen,
                                    c.files[c.index].option
                                ),
                                (c.index = (c.index + 1) % c.files.length);
                        }
                    }, c.interval + 1e3 * b)),
                    i.testLog("advt", "" + c.files);
            }
            function $c(a) {
                return (
                    clearTimeout(La.feedGetTimer),
                    a
                        ? void I.getFeeds(a, La.rssEncodeAsBinary, function (b, c) {
                            if (b)
                                return void (
                                    Wa ||
                                    Zc.length ||
                                    dc("RSS feed currently not available")
                                );
                            if (
                                (c &&
                                    c.length &&
                                    (Zc = c.map(function (a) {
                                        return La.useDescription ? a.description : a.title;
                                    })),
                                    (Zc && 0 != Zc.length) || (Zc = ["No feed available"]),
                                    "slide" == La.behavior)
                            )
                                (La.messages = Zc), M || La.messages.push(N), gd();
                            else {
                                var d = Zc.join("   ...   ");
                                (La.currentTicker = d), Oa || dc(d);
                            }
                            La.isRssFeed &&
                                (La.feedGetTimer = setTimeout(function () {
                                    $c(a);
                                }, 6e5));
                        })
                        : void dc("RSS Link details not available")
                );
            }
            function _c(a) {
                var b = ["mp4", "mpg4", "mpeg4"],
                    c = ["jpeg", "jpg", "png"],
                    d = "";
                return (
                    -1 !== a.indexOf(".") && (d = a.split(".").pop()),
                    -1 !== b.indexOf(d) ? "video" : -1 !== c.indexOf(d) ? "image" : ""
                );
            }
            function ad(a, b) {
                wc(G.mediaPath + a, function (c, d) {
                    if (c) i.log("error", "Error reading file " + a + ";" + c);
                    else {
                        if (b && eb[a] && eb[a].enable) return;
                        (eb[a] = {}),
                            (eb[a].enable = !0),
                            (eb[a].name = a),
                            (eb[a].type = "mrss"),
                            (eb[a].style = d.style),
                            (eb[a].link = d.link),
                            (eb[a].hideTitle = d.hideTitle),
                            (eb[a].duration = d.duration),
                            (eb[a].numberOfItems = d.numberOfItems || 10),
                            (eb[a].subIndex = 0),
                            i.log("debug", "Starting mrss feeds: "),
                            i.log("debug", eb[a]),
                            bd(eb[a]);
                    }
                });
            }
            function bd(a) {
                clearTimeout(a.feedGetTimer),
                    I.getFeeds(
                        a.link,
                        !1,
                        function (b, c) {
                            var d, e, f, g;
                            if (b || !Array.isArray(c) || 0 == c.length)
                                i.log("error", "Failed to retrieve feeds from " + a.link);
                            else
                                for (
                                    i.log("debug", "Received mrss feeds: "),
                                    i.log("debug", c && c[0]),
                                    a.feeds = c,
                                    d = a.feeds.length - 1;
                                    d >= 0;
                                    d--
                                )
                                    (e = a.feeds[d]),
                                        0 == a.hideTitle.indexOf("only")
                                            ? (e.piSignageType = "text")
                                            : e.enclosures &&
                                                Array.isArray(e.enclosures) &&
                                                e.enclosures[0] &&
                                                e.enclosures[0].url
                                                ? ((f = e.enclosures[0]),
                                                    f.type
                                                        ? ((g =
                                                            -1 !== f.type.indexOf("/")
                                                                ? f.type.split("/")[0]
                                                                : f.type),
                                                            (g = g.toLowerCase()))
                                                        : (g = _c(f.url)),
                                                    (e.piSignageType = g),
                                                    (e.piSignageLink = decodeURI(f.url)))
                                                : e.image && e.image.url
                                                    ? ((e.piSignageType = "image"),
                                                        (e.piSignageLink = decodeURI(e.image.url)))
                                                    : e["rss:fullimage"]
                                                        ? ((e.piSignageType = "image"),
                                                            (e.piSignageLink = decodeURI(e["rss:fullimage"]["#"])))
                                                        : e["rss:storyimage"] &&
                                                        ((e.piSignageType = "image"),
                                                            (e.piSignageLink = decodeURI(
                                                                e["rss:storyimage"]["#"]
                                                            ))),
                                        a.hideTitle.indexOf("onlytitledescr") >= 0
                                            ? (e.piSignageBanner =
                                                (e.title || "") +
                                                "secondary-bannertext:" +
                                                (e.description || ""))
                                            : a.hideTitle.indexOf("title") >= 0
                                                ? (e.piSignageBanner = e.title || "")
                                                : a.hideTitle.indexOf("description") >= 0 &&
                                                (e.piSignageBanner = e.description || ""),
                                        e["media:content"] &&
                                        e["media:content"]["@"] &&
                                        e["media:content"]["@"].duration &&
                                        (e.piSignageDuration = e["media:content"]["@"].duration),
                                        e.piSignageBanner && !e.piSignageLink
                                            ? ((e.piSignageType = "text"),
                                                (e.piSignageLink = a.name + "_" + d + ".txt"))
                                            : e.piSignageBanner ||
                                            e.piSignageLink ||
                                            (e.link
                                                ? ((e.piSignageType = "weblink"),
                                                    (e.piSignageLink = e.link))
                                                : (i.log(
                                                    "error",
                                                    "No info available in the feed, removing " +
                                                    ("" + e).slice(0, 50)
                                                ),
                                                    a.feeds.splice(d, 1)));
                            a.enable &&
                                (a.feedGetTimer = setTimeout(function () {
                                    bd(a);
                                }, 6e5));
                        },
                        a.numberOfItems
                    );
            }
            function cd(a, b) {
                wc(G.mediaPath + a, function (c, d) {
                    if (c) i.log("error", "Error reading file " + a + ";" + c);
                    else {
                        if (b && eb[a] && eb[a].enable) return;
                        (eb[a] = {}),
                            (eb[a].enable = !0),
                            (eb[a].type = "local"),
                            (eb[a].link = d.link),
                            (eb[a].duration = d.duration),
                            (eb[a].numberOfItems = d.numberOfItems || 10),
                            (eb[a].subIndex = 0),
                            i.log("debug", "Starting local folder fetch "),
                            i.log("debug", eb[a]),
                            dd(eb[a]);
                    }
                });
            }
            function dd(a) {
                clearTimeout(a.feedGetTimer),
                    f.stat(a.link, function (b, c) {
                        b || !c
                            ? i.log(
                                "error",
                                "local folder/file read error: " + a.link + ";" + b
                            )
                            : c.isDirectory()
                                ? f.readdir(a.link, function (b, c) {
                                    var d, e;
                                    return b || !c
                                        ? void i.log(
                                            "error",
                                            "local folder read error: " + a.link + ";" + b
                                        )
                                        : ((d = c.filter(function (a) {
                                            return (
                                                a.match(G.videoRegex) ||
                                                a.match(G.audioRegex) ||
                                                a.match(G.imageRegex) ||
                                                a.match(G.noticeRegex) ||
                                                a.match(G.pdffileRegex) ||
                                                a.match(G.zipfileRegex) ||
                                                a.match(G.radioFileRegex) ||
                                                a.match(G.liveStreamRegex) ||
                                                a.match(G.omxStreamRegex) ||
                                                a.match(G.linkURL) ||
                                                a.match(G.CORSLink) ||
                                                a.match(G.txtFileRegex)
                                            );
                                        })),
                                            (e = d.sort(function (a, b) {
                                                return a.localeCompare(b, void 0, { numeric: !0 });
                                            })),
                                            (a.feeds = e.map(function (b) {
                                                return { piSignageLink: a.link + "/" + b };
                                            })),
                                            i.log("debug", "Received folder contents: "),
                                            void i.log("debug", a.feeds));
                                })
                                : ((a.feeds = [{ piSignageLink: a.link }]),
                                    i.log("debug", "Received folder contents: "),
                                    i.log("debug", a.feeds)),
                            a.enable &&
                            (a.feedGetTimer = setTimeout(function () {
                                dd(a);
                            }, 6e5));
                    });
            }
            function ed() {
                Object.keys(eb).forEach(function (a) {
                    var b = eb[a];
                    b && ((b.enable = !1), clearTimeout(b.feedGetTimer), (eb[a] = null));
                });
            }
            function fd() {
                clearTimeout(La.feedChangeTimer);
                var a = La.messages[La.msgIndex];
                (La.currentTicker = a),
                    Oa || (dc(a), (La.msgIndex = (La.msgIndex + 1) % La.messages.length)),
                    La.disabled || (La.feedChangeTimer = setTimeout(fd, La.feedDelay));
            }
            function gd() {
                (La.msgIndex = 0), (La.disabled = !1), fd();
            }
            function hd() {
                (La.isRssFeed = !1),
                    clearTimeout(La.feedGetTimer),
                    (La.disabled = !0),
                    clearTimeout(La.feedChangeTimer),
                    (La.currentTicker = null);
            }
            function ld(a) {
                id && 1 == id.readyState
                    ? id.send(a, function (c) {
                        c &&
                            i.log(
                                "error",
                                "Could not send message to chrome : " + c + ";" + a
                            );
                    })
                    : i.log("error", "Can not send message to chrome : " + a);
            }
            var O,
                P,
                V,
                X,
                Z,
                ca,
                da,
                ga,
                ha,
                ja,
                ka,
                la,
                ma,
                za,
                Ia,
                Ja,
                Ma,
                Na,
                Pa,
                Qa,
                bb,
                Bb,
                Cb,
                Db,
                Qb,
                Sb,
                Tb,
                ec,
                Fc,
                Gc,
                Kc,
                Nc,
                Pc,
                Sc,
                Uc,
                Vc,
                Wc,
                Xc,
                Zc,
                id,
                jd,
                kd,
                d = c("child_process").spawn,
                e = c("child_process").exec,
                f = c("fs"),
                h = (c("path"), c("async")),
                i = c("../others/logger"),
                j = c("./pi-weblink"),
                k = c("../others/system-info"),
                l = c("robotjs"),
                m = c("ps-tree"),
                n = function (a, b) {
                    m(a, function (c, f) {
                        f = f || [];
                        var g = f.find(function (a) {
                            return a && "omxplayer.bin" == a.COMMAND;
                        });
                        g
                            ? d("sudo", ["kill", "-9", g.PID])
                            : d(
                                "sudo",
                                ["kill", "-9"].concat(
                                    f.map(function (a) {
                                        return a.PID;
                                    }),
                                    a
                                )
                            ),
                            1 == f.length &&
                            f[0] &&
                            "omxplayer" == f[0].COMMAND &&
                            (i.log("error", "*** Zombie omxplayer.bin, killing"),
                                e("sudo pgrep -P 1 -l | grep omxplayer", function (a, b, c) {
                                    if (!c && b) {
                                        var d = b.split("\n");
                                        d.forEach(function (a) {
                                            a &&
                                                a.length > 0 &&
                                                (i.log(
                                                    "error",
                                                    "*** Zombie omxplayer.bin, pid: " + a.split(" ")[0]
                                                ),
                                                    e(
                                                        "sudo kill -9 " + a.split(" ")[0],
                                                        function (a, b, c) {
                                                            console.log(c);
                                                        }
                                                    ));
                                        });
                                    }
                                })),
                            b && b();
                    });
                },
                o = function (a) {
                    return a && null === a.exitCode && null === a.signalCode ? !0 : !1;
                },
                p = 0,
                q = 1,
                r = 2,
                s = 0,
                t = 1,
                u = 2,
                v = 0,
                w = 1,
                x = 0,
                y = 1,
                z = 0,
                A = 1,
                B = 2,
                C = 0,
                D = 1,
                E = 80,
                G = c("../../config/config"),
                H = c("./pi-events"),
                I = c("../others/rss-service"),
                J = "auto",
                K = [1920, 1080],
                L = "landscape",
                M = !0,
                N = "  *** Please add the license file ***",
                Q = [],
                R = !1,
                S = !1,
                T = !1,
                U = !1,
                W = [],
                Y = !1,
                $ = !1,
                _ = !1,
                aa = !1,
                ba = !1,
                ea = !1,
                fa = null,
                ia = {},
                na = "",
                oa = !0,
                pa = 0,
                qa = {},
                ra = {},
                sa = null,
                ta = null,
                ua = null,
                wa = !1,
                xa = !1,
                ya = !1,
                Aa = [],
                Ba = !1,
                Ca = 0,
                Da = 0,
                Ea = 0,
                Fa = 0,
                Ga = { side: 0, bottom: 0, zone4: 0, zone5: 0, zone6: 0 },
                Ha = "1",
                Ka = "custom_layout.html",
                La = {
                    currentTicker: null,
                    tickerHeight: 60,
                    behavior: "slide",
                    feedDelay: 1e4,
                    disabled: !1,
                    isRssFeed: !1,
                    rssLink: null,
                    rssEncodeAsBinary: !1,
                    feedGetTimer: null,
                    feedChangeTimer: null,
                    messages: [],
                    msgIndex: 0,
                    textSpeed: 3,
                },
                Oa = !1,
                Ra = 0,
                Sa = 0,
                Ta = {},
                Ua = !1,
                Va = "right",
                Wa = !1,
                Xa = "#000",
                Ya = !1,
                Za = 2,
                $a = !1,
                _a = !1,
                ab = !1,
                cb = null,
                db = null,
                eb = {},
                fb = !1,
                gb = { showClock: !1, eMsgCmd: w },
                hb = {
                    process: null,
                    playing: !1,
                    files: [],
                    playRandom: !1,
                    volume: 90,
                },
                ib = !1,
                jb = !0,
                kb = !1,
                lb = 0,
                mb = !1,
                nb = [],
                ob = [],
                pb = !1,
                qb = !1,
                rb = { pause: "p", quit: "q" },
                sb = 0,
                tb = 100,
                ub = !1,
                vb = 0,
                wb = 0,
                xb = 0,
                yb = [
                    "1",
                    "2a",
                    "2b",
                    "2c",
                    "2d",
                    "3a",
                    "3b",
                    "3c",
                    "3d",
                    "4a",
                    "4b",
                    "4c",
                    "4d",
                    "2ap",
                    "2bp",
                    "2ap270",
                    "2bp270",
                    "custom",
                    "customp",
                    "customp270",
                ],
                Eb = "0 0 720 480",
                Fb = "0 0 720 576",
                Gb = null,
                Hb = function (a, b, c) {
                    var l,
                        d = Ra || K[0],
                        e = Sa || K[1],
                        f = parseInt(d / 4),
                        g = parseInt(d / 2),
                        h = parseInt((3 * d) / 4),
                        i = parseInt(e / 4),
                        k = (parseInt(e / 2), parseInt((3 * e) / 4));
                    switch (((b = b ? La.tickerHeight : 0), (l = {}), a)) {
                        default:
                        case "1":
                            l.main = "0 0 " + d + " " + (e - b);
                            break;
                        case "2a":
                            (l.main = "" + f + " 0 " + d + " " + (e - b)),
                                (l.side = "0 0 " + f + " " + (e - b));
                            break;
                        case "2b":
                            (l.main = "0 0 " + h + " " + (e - b)),
                                (l.side = "" + h + " 0 " + d + " " + (e - b));
                            break;
                        case "2c":
                            (l.main = "0 0 " + g + " " + (e - b)),
                                (l.side = "" + g + " 0 " + d + " " + (e - b));
                            break;
                        case "2d":
                            (l.main = "" + g + " 0 " + d + " " + (e - b)),
                                (l.side = "0 0 " + g + " " + (e - b));
                            break;
                        case "3a":
                            (l.main = "" + f + " 0 " + d + " " + k),
                                (l.side = "0 0 " + f + " " + k),
                                (l.bottom = "0 " + k + " " + d + " " + (e - b));
                            break;
                        case "3b":
                            (l.main = "0 0 " + h + " " + k),
                                (l.side = "" + h + " 0 " + d + " " + k),
                                (l.bottom = "0 " + k + " " + d + " " + (e - b));
                            break;
                        case "3c":
                            (l.main = "" + f + " " + i + " " + d + " " + (e - b)),
                                (l.side = "0 " + i + " " + f + " " + (e - b)),
                                (l.bottom = "0 0 " + d + " " + i);
                            break;
                        case "3d":
                            (l.main = "0 " + i + " " + h + " " + (e - b)),
                                (l.side = "" + h + " " + i + " " + d + " " + (e - b)),
                                (l.bottom = "0 0 " + d + " " + i);
                            break;
                        case "4a":
                            (l.main = "" + f + " 0 " + d + " " + k),
                                (l.side = "0 0 " + f + " " + (e - b)),
                                (l.bottom = "" + f + " " + k + " " + d + " " + (e - b));
                            break;
                        case "4b":
                            (l.main = "0 0 " + h + " " + k),
                                (l.side = "" + h + " 0 " + d + " " + (e - b)),
                                (l.bottom = "0 " + k + " " + h + " " + (e - b));
                            break;
                        case "4c":
                            (l.main = "" + f + " " + i + " " + d + " " + (e - b)),
                                (l.side = "0 0 " + f + " " + (e - b)),
                                (l.bottom = "" + f + " 0 " + d + " " + i);
                            break;
                        case "4d":
                            (l.main = "0 " + i + " " + h + " " + (e - b)),
                                (l.side = "" + h + " 0 " + d + " " + (e - b)),
                                (l.bottom = "0 0 " + h + " " + i);
                            break;
                        case "custom":
                            l.main = "0 0 " + d + " " + (e - b);
                            break;
                        case "2ap":
                        case "customp":
                            c
                                ? (l.main = "0 0 " + e + " " + (d - b))
                                : (l.main = "" + b + " 0 " + d + " " + e);
                            break;
                        case "2bp":
                            c
                                ? ((l.main = "0 0 " + e + " " + k),
                                    (l.bottom = "0 " + k + " " + e + " " + (d - b)))
                                : ((l.main = "" + (d - k) + " 0 " + d + " " + e),
                                    (l.bottom = "0 0 " + (d - k) + " " + (e - b)));
                            break;
                        case "2ap270":
                        case "customp270":
                            c
                                ? (l.main = "0 0 " + e + " " + (d - b))
                                : (l.main = "0 0 " + (d - b) + " " + e);
                            break;
                        case "2bp270":
                            c
                                ? ((l.main = "0 0 " + e + " " + k),
                                    (l.bottom = "0 " + k + " " + e + " " + (d - b)))
                                : ((l.main = "0 0 " + k + " " + e),
                                    (l.bottom = "" + k + " 0 " + d + " " + (e - b)));
                    }
                    return l;
                },
                Ib = {
                    1: [],
                    "2a": ["side"],
                    "2b": ["side"],
                    "2c": ["side"],
                    "2d": ["side"],
                    "3a": ["side", "bottom"],
                    "3b": ["side", "bottom"],
                    "3c": ["side", "bottom"],
                    "3d": ["side", "bottom"],
                    "4a": ["side", "bottom"],
                    "4b": ["side", "bottom"],
                    "4c": ["side", "bottom"],
                    "4d": ["side", "bottom"],
                    "2ap": [],
                    "2bp": ["bottom"],
                    "2ap270": [],
                    "2bp270": ["bottom"],
                    custom: ["side", "bottom", "zone4", "zone5", "zone6"],
                    customp: ["side", "bottom", "zone4", "zone5", "zone6"],
                    customp270: ["side", "bottom", "zone4", "zone5", "zone6"],
                },
                Jb = ["side", "bottom", "zone4"],
                Kb = ["side", "bottom"];
            try {
                f.unlinkSync("/home/pi/.cache/uzbl/event_daemon.pid"),
                    f.unlinkSync("/home/pi/.cache/uzbl/event_daemon");
            } catch (Lb) { }
            h.series(
                [
                    function (a) {
                        e("killall -s 9 chromium-browser", function () {
                            a();
                        }),
                            e(
                                "killall -s 9 /usr/lib/chromium-browser/chromium-browser-v7",
                                function () { }
                            );
                    },
                    function (a) {
                        e("sudo pkill pngview", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("sudo pkill openvg_display", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("sudo pkill ticker", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("sudo pkill evince", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("sudo pkill mpv", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("sudo pkill uzbl", function () {
                            a();
                        });
                    },
                    function (a) {
                        e("uzbl --version")
                            .stdout.on("data", function (a) {
                                (Y = -1 == a.indexOf("228bc38") ? !0 : !1),
                                    i.log(
                                        "info",
                                        "Based on commit value uzbl is " + (Y ? "new" : "old")
                                    ),
                                    (Z =
                                        a.indexOf("228bc38") >= 0
                                            ? "228bc38"
                                            : a.indexOf("35db169") >= 0
                                                ? "35db169"
                                                : a.indexOf("v0.9.0") >= 0
                                                    ? "v0.9.0"
                                                    : "unknown"),
                                    i.log("info", "uzbl version is " + Z);
                            })
                            .on("close", function () {
                                a();
                            });
                    },
                    function (a) {
                        e("which chromium-browser", function (c, d, e) {
                            c || e
                                ? (i.log("warn", "Chromium is *not* available"), ($ = !1))
                                : (i.log("info", "Chromium is available at " + d),
                                    ($ = !0),
                                    b.startChromeSocket()),
                                a();
                        });
                    },
                    function (a) {
                        e("which openvg_display", function (b, c, d) {
                            b || d
                                ? (i.log("warn", "Openvg is *not* available"), (_ = !1), a())
                                : (i.log("info", "Openvg is available at " + c), (_ = !0), a());
                        });
                    },
                    function (a) {
                        e("cat /etc/*-release", function (b, c) {
                            c &&
                                c.indexOf("buster") >= 0 &&
                                (i.log(
                                    "info",
                                    "Openvg is *not* available as it is buster(pi 4) OS release"
                                ),
                                    (_ = !1),
                                    (aa = !0)),
                                a();
                        });
                    },
                    function (a) {
                        e("cat /proc/device-tree/model", function (b, c) {
                            c &&
                                c.indexOf("Pi 4") >= 0 &&
                                ((ba = !0),
                                    e("tvservice -l", function (a, b, c) {
                                        if (
                                            !a &&
                                            !c &&
                                            b &&
                                            (i.log("info", "Number of display units: " + parseInt(b)),
                                                parseInt(b) >= 2)
                                        ) {
                                            var e = d(
                                                "pngview",
                                                [
                                                    "-d",
                                                    7,
                                                    "-x",
                                                    0,
                                                    "-y",
                                                    0,
                                                    G.root + "/public/app/img/pi4-second-display.png",
                                                ],
                                                { stdio: "pipe" }
                                            );
                                            setTimeout(function () {
                                                e && e.kill();
                                            }, 3e4);
                                        }
                                    })),
                                a();
                        });
                    },
                    function (a) {
                        e("which evince", function (b, c, d) {
                            b || d
                                ? (i.log("warn", "evince pdf reader is *not* available"),
                                    (ea = !1))
                                : (i.log("info", "evince pdf reader is available at " + c),
                                    (ea = !0)),
                                a();
                        });
                    },
                    function (a) {
                        $ ? k.changeHostname(a) : a();
                    },
                    function (a) {
                        $ ? Mb(a) : a();
                    },
                ],
                function () {
                    Ob();
                }
            ),
                (b.setConfigServer = function (a) {
                    var b = [
                        "displayer.com.my",
                        "satavision.vpalvelin.com",
                        "signage.dsmediaplay.com",
                        "pisign.rplink.net",
                        "livesignagelite.nec.com.sg",
                        "lktsignage.com",
                        "signage-network.app",
                        "tvhub.io",
                        "imperiumberri.com",
                        "iberselex.com",
                        "billboard.signs.oneit.gov.uk",
                        "displayer.sg",
                        "signage.gvtel.com",
                        "infotafeln.mediaz-electronics.de",
                        "digisign.digitalsigns.co.nz",
                        "signs.nona.media",
                        "signage.pointscentral.com",
                        "uzaserv.ddns.net",
                        "signage.metdata.net.nz",
                        "adsonatms.com",
                        "blupepper.asia",
                        "signage.emh.cloud",
                        "digisign.hsia.co.nz",
                        "halo.nomadixmedia.co.uk",
                        "displayit.ie",
                        "signage.trucell.com.au",
                        "signage.hawk.sydney",
                        "gibonsignage.se",
                        "ds-mgmt-01.passau.ssw",
                        "signage.e2r.nl",
                        "trgsignage.eu",
                        "nemak.tv",
                    ];
                    N =
                        b.indexOf(a) >= 0
                            ? "  *** Please add the license, contact info@" + a + " ***"
                            : "  *** This player is powered by pisignage.com ***";
                }),
                (b.clearDisplayOnscreenMessage = function () {
                    clearTimeout(ec),
                        (gb.eMsgCmd = w),
                        aa ? b.removeEmergencyMessage() : Mc();
                }),
                (Fc = function (a) {
                    var e,
                        f,
                        g,
                        h,
                        j,
                        k,
                        l,
                        m,
                        c = null,
                        d = {};
                    if (Fa != a)
                        return void i.log(
                            "warn",
                            "*** skipping callback: " + +a + "," + Fa
                        );
                    if (pb && !fb)
                        for (h = 0, j = ob.length; j > h; h++)
                            if (((k = ob[h]), k.adReady)) {
                                if (k.currentAdCount >= k.adCount) {
                                    (k.adReady = !1), Yc(h, 0);
                                    continue;
                                }
                                !k.noMainPlay &&
                                    k.files[k.index] &&
                                    k.files[k.index].filename &&
                                    ((c = k.files[k.index].filename), (qb = !0)),
                                    Ib[Ha].forEach(function (a) {
                                        d[a] = k.files[k.index][a] || null;
                                    }),
                                    (e = parseInt(k.files[k.index].duration)),
                                    (f = k.files[k.index].fullscreen),
                                    (g = k.files[k.index].option),
                                    (k.index = (k.index + 1) % k.files.length),
                                    (k.currentAdCount += 1);
                                break;
                            }
                    if (
                        wa &&
                        !c &&
                        ((l = !1),
                            (qb = !1),
                            Aa[Ca] &&
                            eb[Aa[Ca].filename] &&
                            eb[Aa[Ca].filename].subIndex &&
                            (i.log(
                                "debug",
                                "using the same nextFileIndex with subIndex " +
                                eb[Aa[Ca].filename].subIndex
                            ),
                                (l = !0)),
                            Aa[Ca] &&
                            Aa[Ca].filename.match(G.videoRegex) &&
                            vb &&
                            wb &&
                            (i.log(
                                "debug",
                                "using the same nextFileIndex with videoChunk " + wb
                            ),
                                (l = !0)),
                            l ||
                            ((Ca = (Ca + 1) % Aa.length),
                                0 === Ca && Ba && Aa.length > 2 && Ec(Aa)),
                            (c = Aa[Ca] && Aa[Ca].filename),
                            (e = parseInt(Aa[Ca].duration)),
                            Ib[Ha].forEach(function (a) {
                                d[a] || (d[a] = Aa[Ca][a]);
                            }),
                            (f = Aa[Ca].fullscreen),
                            (g = Aa[Ca].option),
                            mb && 0 == Ca && nb.length)
                    )
                        return (
                            (mb = !1),
                            fb && (nb[7] = Da),
                            b.startPlay.apply(this, nb),
                            void i.log("info", "playlist change called")
                        );
                    if (c) {
                        if (
                            (Tb &&
                                (Wb(),
                                    La.currentTicker && dc(La.currentTicker),
                                    (Tb = !1),
                                    i.log("info", "reloaded url to flush memory leaks")),
                                0 == Ca && !l)
                        ) {
                            if (((m = Date.now()), 1e3 > m - Ea))
                                return (
                                    i.log(
                                        "error",
                                        "Playlist duration is less than 1 second, delaying for a second"
                                    ),
                                    void setTimeout(function () {
                                        (Ea = Date.now()), Dc(c, e, Fc, d, f, g);
                                    }, 5e3)
                                );
                            Ea = m;
                        }
                        Dc(c, e, Fc, d, f, g);
                    }
                }),
                (Gc = function (a, c) {
                    qc(),
                        sc(),
                        Jc(),
                        clearTimeout(za),
                        clearTimeout(ja),
                        clearTimeout(ka),
                        clearTimeout(la),
                        clearTimeout(ma),
                        clearTimeout(ec),
                        Jb.forEach(function (a) {
                            uc(a);
                        }),
                        Ib.custom.forEach(function (a) {
                            ra[a] = !1;
                        }),
                        Object.keys(qa).forEach(function (a) {
                            Bc(a);
                        }),
                        j.removeAllWebLinkViews(),
                        Ub(!1),
                        hd(),
                        ed(),
                        c || b.pauseAds(),
                        e("sudo pkill omx", function () {
                            e("sudo pkill livestreamer", function () {
                                a && setTimeout(a, 100);
                            });
                        });
                }),
                (b.startPlaySync = function () {
                    i.log("info", "playlist change request received"),
                        1 != Aa.length || pb
                            ? ((nb = arguments), (mb = !0))
                            : (i.log(
                                "info",
                                "calling change playlist immediate since a single video in loop being played"
                            ),
                                b.startPlay.apply(this, arguments));
                }),
                (b.startPlay = function (a, c, d, e, f, g, h, j, k, l) {
                    var m = k || fb;
                    if (
                        (k
                            ? ((mb = !0), (fb = !0), (Da = Ca))
                            : ((nb = arguments), (fb = !1)),
                            (Ma = JSON.parse(JSON.stringify(c))),
                            (h = h || function () { }),
                            -1 == yb.indexOf(d))
                    )
                        return h("Layout not supported");
                    if (L.indexOf("portrait") >= 0 && -1 == d.indexOf("custom"))
                        switch (d) {
                            case "1":
                                d = "2ap";
                                break;
                            default:
                                d = d.replace("270", "");
                        }
                    (Fa = (Fa + 1) % 256),
                        Gc(function () {
                            var k, n, o, p, q;
                            return (
                                (wa = !0),
                                (ya = !1),
                                (ab = !1),
                                d && (Ha = d),
                                (Ia = e),
                                (Ja = f),
                                g && (Ka = g),
                                (Pa = null),
                                (Ra = 0),
                                (Sa = 0),
                                e &&
                                ((k = parseInt(e.xoffset) || 0),
                                    (n = parseInt(e.yoffset) || 0),
                                    (o = parseInt(e.length)),
                                    (p = parseInt(e.width)),
                                    o && p && o >= 40 && p >= 40
                                        ? (Pa = k + " " + n + " " + (k + o) + " " + (n + p))
                                        : i.log(
                                            "warn",
                                            "*** custom video window not set due to wrong parameters, " +
                                            o +
                                            "," +
                                            p
                                        ),
                                    (Qa = e.mainzoneOnly || !1),
                                    e.fullscreenWidth && e.fullscreenHeight
                                        ? ((Ra = parseInt(e.fullscreenWidth)),
                                            (Sa = parseInt(e.fullscreenHeight)))
                                        : ((Ra = Qa ? 0 : o || 0), (Sa = Qa ? 0 : p || 0))),
                                Jb.forEach(function (a) {
                                    var c,
                                        d,
                                        e,
                                        g,
                                        b = null;
                                    f && f[a] && (b = f[a]),
                                        b
                                            ? ((c = parseInt(b.xoffset) || 0),
                                                (d = parseInt(b.yoffset) || 0),
                                                (e = parseInt(b.length)),
                                                (g = parseInt(b.width)),
                                                e &&
                                                g &&
                                                (Ta[a] = c + " " + d + " " + (c + e) + " " + (d + g)))
                                            : (Ta[a] = null);
                                }),
                                Wb(),
                                Ub(!0),
                                (Ca = j ? j : 0),
                                (wb = 0),
                                (q = a ? a.length : 0),
                                0 == q
                                    ? (Wa || dc("Playlist is empty and hence can not play"),
                                        (wa = !1),
                                        h("No files to Play"))
                                    : ((Aa = a),
                                        Aa.forEach(function (a) {
                                            var b = a.filename;
                                            b && b.match(G.mediaRss) && ad(b),
                                                b && b.match(G.localFolderRegex) && cd(b),
                                                !(
                                                    a.option &&
                                                    a.option.bannerText &&
                                                    b &&
                                                    b.match(G.videoRegex)
                                                ) ||
                                                (La && La.bannerText) ||
                                                Vb(b, a.option.bannerText, a.duration),
                                                Ib[Ha].forEach(function (c) {
                                                    (b = a[c]),
                                                        b &&
                                                        (b.match(G.mediaRss) && ad(b),
                                                            b.match(G.localFolderRegex) && cd(b));
                                                });
                                        }),
                                        (qb = !1),
                                        (Oa = !1),
                                        m || b.startAds(),
                                        c &&
                                        ((La.behavior = c.behavior || "slide"),
                                            (La.textSpeed = c.textSpeed || 3)),
                                        bc(
                                            (!c ||
                                                c.disabled ||
                                                (_ && 0 == La.behavior.indexOf("openvg"))) &&
                                                M
                                                ? 0
                                                : 1
                                        ),
                                        0 === Ca && Ba && Aa.length > 2 && Ec(Aa),
                                        Dc(
                                            Aa[Ca].filename,
                                            parseInt(Aa[Ca].duration),
                                            Fc,
                                            Aa[Ca],
                                            Aa[Ca].fullscreen,
                                            Aa[Ca].option
                                        ),
                                        c && !c.disabled
                                            ? ((La.bannerText = c.bannerText),
                                                (La.textSpeed = c.textSpeed),
                                                (c.tickerHeight = parseInt(c.tickerHeight || 60)),
                                                (c.tickerHeight < 60 || c.tickerHeight > 200) &&
                                                (c.tickerHeight = 60),
                                                ic(c.tickerHeight),
                                                (La.tickerHeight = c.tickerHeight),
                                                (La.isRssFeed = c.isRssFeed),
                                                (La.rssLink = c.rssLink),
                                                (La.rssEncodeAsBinary = c.rssEncodeAsBinary),
                                                (La.useDescription = c.useDescription),
                                                (La.feedDelay = 1e3 * (c.feedDelay || 10)),
                                                (La.tickerFontSize = c.tickerFontSize || 28),
                                                (La.tickerWidth = c.tickerWidth || 0),
                                                (La.tickerX = c.tickerX || 0),
                                                (La.tickerY = c.tickerY || 0),
                                                c.style && ((La.style = c.style), hc(La.style)),
                                                La.isRssFeed
                                                    ? $c(c.rssLink)
                                                    : ((c.messages = c.messages || ""),
                                                        "slide" == La.behavior
                                                            ? ((La.messages = c.messages.split("\n")),
                                                                M || La.messages.push(N),
                                                                gd())
                                                            : ((c.messages = c.messages.replace(
                                                                /\n/g,
                                                                "   ...   "
                                                            )),
                                                                (La.currentTicker = c.messages),
                                                                (La.messages[0] = c.messages),
                                                                dc(c.messages))))
                                            : cc(),
                                        i.testLog("start_play", d, c, "" + a),
                                        void h(null, l))
                            );
                        }, m);
                }),
                (b.stopPlay = function (a) {
                    (wa = !1), (nb = []), Xb(), cc(), i.testLog("stop_play"), Gc(a);
                }),
                (b.showKioskUi = function (a) {
                    (a = a || function () { }),
                        ya || (xa = wa),
                        (Fa = (Fa + 1) % 256),
                        (ya = !0),
                        b.stopPlay(a);
                }),
                (b.stopKioskUi = function () {
                    b.stopFile();
                }),
                (b.playFile = function (a, c, d, e) {
                    var f = {},
                        g = null;
                    ya || (xa = wa),
                        a.match(G.audioRegex) ? (f.main = !0) : (f.main = !1),
                        /(rtsp|http|https):\/\//.test(a) && (g = "cors"),
                        (Fa = (Fa + 1) % 256),
                        (ya = !0),
                        clearTimeout(za),
                        b.stopPlay(function () {
                            za = setTimeout(function () {
                                (wa = !0),
                                    (qb = !1),
                                    i.log("info", "playFile " + a),
                                    Dc(
                                        a,
                                        d || 3600,
                                        function (a) {
                                            return Fa != a
                                                ? void i.log(
                                                    "warn",
                                                    "*** skipping callback in playFile: " + a + "," + Fa
                                                )
                                                : (e || b.stopFile(), void (c && c()));
                                        },
                                        null,
                                        !0,
                                        f,
                                        g
                                    );
                            }, 1e3);
                        });
                }),
                (b.pauseFile = function () {
                    ga && oc("pause", ga), ha && oc("pause", ha);
                }),
                (b.stopFile = function () {
                    ya &&
                        ((ya = !1),
                            clearTimeout(za),
                            b.stopPlay(function () {
                                za = setTimeout(function () {
                                    (wa = xa), wa && b.startPlay(Aa, Ma, Ha, Ia, Ja, Ka, null, Ca);
                                }, 1e3);
                            }));
                }),
                (b.showProgress = function (a, b) {
                    if (T && !Wa) {
                        var c = " ";
                        a &&
                            (c = a + " Bytes Downloaded, Current Speed " + b + " Bytes/sec"),
                            dc("Download in Progress:   " + c);
                    }
                }),
                (b.showNormalTicker = function () {
                    La.currentTicker ? dc(La.currentTicker) : cc();
                }),
                (b.pausePlaylist = function () {
                    switch (((ab = !ab), cb)) {
                        case "video":
                            ab
                                ? clearTimeout(ja)
                                : (ja = setTimeout(function () {
                                    i.log(
                                        "warn",
                                        "watchdog Timeout expired, killing video process: " +
                                        db +
                                        "," +
                                        bb
                                    ),
                                        qc();
                                }, bb)),
                                ga && oc("pause", ga),
                                ha && oc("pause", ha);
                            break;
                        case "liveStream":
                            ab
                                ? clearTimeout(la)
                                : (la = setTimeout(function () {
                                    i.log(
                                        "debug",
                                        "watchdog Timeout expired, killing liveStream process: " +
                                        db +
                                        "," +
                                        bb
                                    ),
                                        Jc();
                                }, bb)),
                                ga && oc("pause", ga),
                                ha && oc("pause", ha);
                            break;
                        case "audio":
                            ab
                                ? clearTimeout(ka)
                                : (ka = setTimeout(function () {
                                    i.log(
                                        "warn",
                                        "Audio watchdog Timeout expired, killing audio process: " +
                                        db +
                                        "," +
                                        bb
                                    ),
                                        sc();
                                }, bb)),
                                ha && oc("pause", ha);
                            break;
                        case "pdf":
                            ab && (ea ? clearTimeout(da) : clearTimeout(ma));
                            break;
                        case "image":
                        case "zip":
                        case "webLink":
                            ab && clearTimeout(ma);
                            break;
                        default:
                            i.log(
                                "error",
                                "Current playing file " +
                                db +
                                " of unknown type " +
                                cb +
                                " when play " +
                                (ab ? "paused" : "resumed")
                            );
                    }
                    return (
                        ab ||
                        "video" === cb ||
                        "liveStream" === cb ||
                        "audio" === cb ||
                        Fc(Fa),
                        ab
                    );
                }),
                (b.stepBackward = function () {
                    Hc(),
                        (Ca = Aa.length > 1 ? (Ca + Aa.length - 2) % Aa.length : 0),
                        Fc(Fa);
                }),
                (b.stepForward = function () {
                    Hc(), Fc(Fa);
                }),
                (b.startAds = function (a) {
                    a &&
                        ((ob = []),
                            a.forEach(function (a) {
                                var b = a.files,
                                    c = a.interval,
                                    d = a.noMainPlay;
                                b &&
                                    ob.push({
                                        files: b,
                                        interval: c && c > 5 ? 1e3 * c : 5e3,
                                        adCount: parseInt(a.adCount || 1),
                                        noMainPlay: d,
                                    });
                            })),
                        ob.length
                            ? ((pb = !0),
                                ob.forEach(function (a, b) {
                                    (a.index = 0),
                                        (a.adReady = !1),
                                        clearTimeout(a.timer),
                                        Yc(b, 0);
                                }))
                            : ((pb = !1), b.stopAds());
                }),
                (b.pauseAds = function () {
                    (pb = !1),
                        ob.forEach(function (a) {
                            (a.adReady = !1), clearTimeout(a.timer);
                        });
                }),
                (b.stopAds = function () {
                    b.pauseAds(), (ob = []);
                }),
                (Kc = 0),
                (b.startLoungeMusic = function (a, b, c, d) {
                    (hb.files = a),
                        (hb.playRandom = b || !1),
                        (hb.volume = c || 100),
                        (hb.playing = !0),
                        (Kc += 1),
                        o(hb.process)
                            ? (hb.process.stdin.pause(),
                                n(hb.process.pid, function () {
                                    setTimeout(function () {
                                        Lc(0, Kc, d);
                                    }, 3e3);
                                }))
                            : Lc(0, Kc, d);
                }),
                (b.stopLoungeMusic = function () {
                    hb.playing &&
                        ((hb.playing = !1),
                            o(hb.process) &&
                            (hb.process.stdin.pause(), n(hb.process.pid, function () { })));
                }),
                (b.setResolution = function (a, b, c) {
                    (J = a),
                        (L = b),
                        (K = c),
                        i.log(
                            "info",
                            "resolution changed to " +
                            a +
                            ",orientation set to : " +
                            b +
                            ",edid resolution is : " +
                            c
                        );
                }),
                (b.setLicense = function (a) {
                    (a = a || !1), (M = a), i.testLog("license_status", a);
                }),
                (b.setAnimationStatus = function (a, b, c) {
                    (Ua = a),
                        (Va = b),
                        ((!$ && "fade" == Va) || !Va) && (Va = "right"),
                        (!c || U) &&
                        Rb("js window.enablePiAnimation(" + Ua + ',"' + Va + '")');
                }),
                (b.setSystemMessagesHide = function (a) {
                    Wa = a;
                }),
                (b.setDisplayClock = function (a, c, d) {
                    return (
                        (gb.showClock = a.enable),
                        a.enable &&
                        ((gb.clockPosition = "top" == a.position ? A : B),
                            (gb.clockFormat = 0 == a.format.indexOf("24") ? C : D),
                            (gb.clockExtendedFormat = a.format)),
                        (gb.eMsgCmd = c && c.enable && c.msg ? v : w),
                        gb.eMsgCmd === v &&
                        ((gb.eMsg = c.msg || ""),
                            (gb.eMsgHorizontal =
                                "left" == c.hPos ? p : "right" == c.hPos ? r : q),
                            (gb.eMsgVertical =
                                "top" == c.vPos ? s : "bottom" == c.vPos ? u : t)),
                        _
                            ? Mc()
                            : (aa &&
                                (gb.eMsgCmd === v
                                    ? b.setEmergencyMessage(
                                        gb.eMsg,
                                        gb.eMsgHorizontal,
                                        gb.eMsgVertical
                                    )
                                    : b.removeEmergencyMessage()),
                                void (
                                    (!d || U) &&
                                    Rb(
                                        "js window.setClock(" +
                                        gb.showClock +
                                        "," +
                                        gb.clockExtendedFormat +
                                        "," +
                                        gb.clockPosition
                                    )
                                ))
                    );
                }),
                (Nc = 0),
                (Pc = 0),
                (b.setEmergencyMessage = function (a, e, f) {
                    var g = 50,
                        h = 20,
                        j = 20;
                    a
                        ? (Pc++,
                            b.removeEmergencyMessage(Pc, function (b) {
                                var k, l, m;
                                return b != Pc
                                    ? void i.log("warn", "stale eMessage process ignored " + a)
                                    : ((k = c("text2png")(a, {
                                        color: "white",
                                        font: g + "px sans-serif",
                                        backgroundColor: "rgba(0, 0, 0,0.8)",
                                        lineSpacing: 10,
                                        padding: h,
                                    })),
                                        (m = []),
                                        (l =
                                            f == s
                                                ? j
                                                : f == u
                                                    ? K[1] - (g + h + j)
                                                    : (K[1] - (g + 2 * h)) / 2),
                                        (m = ["-b", "0x0000", "-y", l]),
                                        e == p && m.push("-x", 10),
                                        m.push("-"),
                                        (ta = d("pngview2", m, { stdio: "pipe" })),
                                        ta.on("error", function (a) {
                                            i.log("error", "pngview for eMessage spawn error: " + a);
                                        }),
                                        ta.stdin.write(k, function (a) {
                                            a && i.log("error", "eMessageProcess write error: " + a);
                                        }),
                                        ta.stderr.on("data", function (a) {
                                            i.log(
                                                "info",
                                                "eMessageProcess stderr: " + a.toString("utf8")
                                            );
                                        }),
                                        void ta.stdin.on("error", function (a) {
                                            i.log("info", "eMessageProcess stdin error: " + a);
                                        }));
                            }))
                        : b.removeEmergencyMessage();
                }),
                (b.removeEmergencyMessage = function (a, b) {
                    (b = b || function () { }),
                        o(ta)
                            ? ta.stdin.write(String.fromCharCode(27), function (c) {
                                c && i.log("error", "eMessageProcess quit error: " + c),
                                    setTimeout(function () {
                                        ta.kill(), b(a);
                                    }, 500);
                            })
                            : b(a);
                }),
                (Sc = 0),
                (b.setBackgroundColor = function (a, b) {
                    (Xa = a),
                        (!b || U) && Rb('js window.setBackgroundColor("' + Xa + '")');
                }),
                (b.setImageResize = function (a, b) {
                    (Za = a), (!b || U) && Rb("js window.fitImageToDiv(" + Za + ")");
                }),
                (b.setVideoKeepAspect = function (a) {
                    $a = a;
                }),
                (b.setVideoShowSubtitles = function (a) {
                    _a = a;
                }),
                (b.setOMXVolume = function (a) {
                    1 > a ? (a = 1) : a > 100 && (a = 100),
                        (sb = parseInt((2e3 * Math.log(a / 100)) / Math.LN10)),
                        (tb = a);
                }),
                (b.setMute = function (a) {
                    ub = a ? !0 : !1;
                }),
                (b.getOMXVolume = function () {
                    return { volume: tb, mute: ub };
                }),
                (b.setTimeToStopVideo = function (a) {
                    vb = a;
                }),
                (b.setLogo = function (a, c, e, f) {
                    if (a) {
                        b.removeLogo(), (f = f || !1);
                        var g = f ? a : G.mediaPath + a;
                        (sa = d("pngview", ["-x", c, "-y", e, g], { stdio: "pipe" })),
                            sa.on("error", function (a) {
                                i.log("error", "pngview spawn error: " + a);
                            });
                    } else b.removeLogo();
                }),
                (b.removeLogo = function () {
                    o(sa) && sa.kill();
                }),
                (b.setAssetLogs = function (a) {
                    ib = a;
                }),
                (b.setYoutubeDl = function (a) {
                    (jb = a),
                        jb
                            ? e("which youtube-dl", function (a, b, c) {
                                a || c
                                    ? (i.log("warn", "youtube-dl is *not* available"),
                                        (jb = !1))
                                    : (i.log("info", "youtube-dl is available at " + b),
                                        (jb = b.length > 3 ? !0 : !1));
                            })
                            : e("which yt-dlp", function (a, b, c) {
                                a || c
                                    ? (i.log("warn", "yt-dlp is *not* available"), (jb = !0))
                                    : (i.log("info", "yt-dlp is available at " + b),
                                        (jb = b.length > 3 ? !1 : !0));
                            });
                }),
                (b.setMpv = function (a, b) {
                    (kb = a),
                        kb &&
                        e("which mpv", function (a, c, d) {
                            a || d
                                ? (i.log("warn", "mpv is *not* available"), (kb = !1))
                                : (i.log("info", "mpv is available at " + c),
                                    (kb = c.length > 3 ? !0 : !1),
                                    (lb = parseFloat(b)),
                                    isNaN(lb) && (lb = 0));
                        });
                }),
                (b.setShuffleContent = function (a) {
                    Ba = a;
                }),
                (b.setUrlReloadDisable = function (a, b) {
                    (Ya = a),
                        (!b || U) && Rb("js window.setUrlReloadDisable(" + Ya + ")");
                }),
                (b.setWeblinkCacheEnable = function (a) {
                    j.setWeblinkCacheEnable(a);
                }),
                (Uc = null);
            try {
                (Uc = c("onoff").Gpio),
                    (Vc = new Uc(17, "in", "rising")),
                    (Wc = new Uc(18, "in", "rising")),
                    (Xc = new Uc(27, "in", "rising"));
            } catch (Lb) {
                i.log("error", "*** onoff npm module is not present ***");
            }
            (b.enablePio = function (a) {
                Uc &&
                    (a
                        ? (Vc.watch(function (a) {
                            a ||
                                (ca
                                    ? l.keyTap("down")
                                    : (i.log("info", "Stepped forward in playlist"),
                                        b.stepForward()));
                        }),
                            Wc.watch(function (a) {
                                a ||
                                    (ca
                                        ? l.keyTap("up")
                                        : (b.stepBackward(),
                                            i.log("info", "Stepped backward in playlist")));
                            }),
                            Xc.watch(function (a) {
                                if (!a) {
                                    var d = b.pausePlaylist();
                                    i.log("info", "Playlist is " + (d ? "paused" : "resumed"));
                                }
                            }))
                        : (Vc.unwatchAll(), Wc.unwatchAll(), Xc.unwatchAll()));
            }),
                (b.getCurrentPlayingFile = function () {
                    return db;
                }),
                (b.getDominationStatus = function () {
                    return fb;
                }),
                (Zc = []),
                (b.pauseOpenVg = function (a) {
                    a ? ((R = !0), Mc(E)) : (R = !1);
                }),
                (id = null),
                (jd = new (c("events").EventEmitter)()),
                (b.browserEmitter = jd),
                (kd = function (a) {
                    var d,
                        c = null;
                    (id = a),
                        (d = 0),
                        id.on("message", function (a) {
                            var f, g;
                            try {
                                c = JSON.parse(a);
                            } catch (e) {
                                return void i.log(
                                    "error",
                                    "unable to parse message from chrome socket, " + a
                                );
                            }
                            if (!c || !c.type)
                                return void i.log("error", "no data from chrome socket, " + a);
                            switch (c.type) {
                                case "LOAD_FINISH":
                                    i.log(
                                        "info",
                                        "Chrome loaded page " + c.data.slice(0, 50) + ";" + c.data2
                                    ),
                                        jd.emit("loaded", c.data),
                                        c.data2 && c.data2 != d && (Nb(), (d = c.data2)),
                                        c.data2 || Nb();
                                    break;
                                case "COMMAND_EXECUTED":
                                    X && 0 == X.indexOf("js") && Nb();
                                    break;
                                case "PLAYLIST_CMD":
                                    switch ((f = c.data)) {
                                        case "backward":
                                            b.stepBackward(),
                                                i.log("info", "Stepped backward in playlist");
                                            break;
                                        case "forward":
                                            b.stepForward(),
                                                i.log("info", "Stepped forward in playlist");
                                            break;
                                        case "pause":
                                            (g = b.pausePlaylist()),
                                                i.log(
                                                    "info",
                                                    "Playlist is " + (g ? "paused" : "resumed")
                                                );
                                            break;
                                        default:
                                            i.log("info", "Unknown PLAYLIST_CMD from keypress: " + f);
                                    }
                                    break;
                                case "BROWSER_PAGE_ERROR":
                                    c.data &&
                                        i.log("error", "Browser Page Error : " + c.data.message);
                                    break;
                                default:
                                    i.log("error", "unknown message from browser : " + c.type);
                            }
                        });
                }),
                (b.startChromeSocket = function (a) {
                    if ((a && (fa = a), fa && $)) {
                        var b = new (c("ws").Server)({
                            server: fa,
                            perMessageDeflate: !1,
                            verifyClient: function (a) {
                                return a.req.headers.host &&
                                    -1 !== a.req.headers.host.indexOf("127.0.0.1")
                                    ? !0
                                    : !1;
                            },
                        });
                        i.log("info", "Starting websocket"),
                            b.on("connection", function (a) {
                                (S = !0), kd(a);
                            }),
                            b.on("error", function (a) {
                                i.log("error", "socket error " + a);
                            }),
                            b.on("close", function () {
                                i.log("info", "socket closed");
                            });
                    }
                });
        }),
        c.register("./app/controllers/pi-wget.js", function (a, b, c) {
            "use strict";
            var l,
                d = c("child_process").spawn,
                e = c("fs"),
                f = c("../others/logger"),
                g = c("./pi-viewer"),
                h = c("./pi-main"),
                i = c("../others/extract-zip"),
                j = c("../../config/config"),
                k = c("./package.json"),
                m = 0;
            b.getGroupFiles = function (a, b, c) {
                var n, o, p, q, r, s, t;
                return (
                    (c = c || function () { }),
                    b
                        ? ((p = [
                            "-rNnHd",
                            "--follow-tags=a",
                            "--no-parent",
                            "--no-check-certificate",
                            "-t",
                            "20",
                            "--waitretry",
                            "60",
                            "--retry-connrefused",
                            "--no-cache",
                        ]),
                            p.push("-R"),
                            p.push(b),
                            p.push(k.media_server + "/sync_folders/" + a + "/" + b),
                            m > 0 &&
                            (f.log("info", "killing previous wget:" + l.pid), l.kill()),
                            m++,
                            (l = d("wget", p, { cwd: j.mediaDir, stdio: "pipe" })),
                            (o = l),
                            f.log("info", "Spawning wget " + p + "; Running as PID " + l.pid),
                            l.on("error", function (a) {
                                f.log("error", "wget spawn error: " + a);
                            }),
                            (q = 0),
                            (r = 0),
                            (t = function () {
                                h.writeToConfig(
                                    { syncInProgress: !0, wgetBytes: s, wgetSpeed: q },
                                    !0
                                ),
                                    g.showProgress(s, q),
                                    (n = setTimeout(t, 3e4));
                            }),
                            t(),
                            l.stdout.on("data", function (a) {
                                f.log("info", "" + a);
                            }),
                            l.stderr.on("data", function (a) {
                                var d,
                                    e,
                                    b = "" + a,
                                    c = b.match(/%/g);
                                c &&
                                    ((r += 50 * c.length),
                                        (s =
                                            r > 1e3 ? (r / 1e3).toFixed(2) + "M" : r.toFixed(2) + "K"),
                                        (d = b.indexOf("%")),
                                        (e = b
                                            .slice(d + 1)
                                            .trim()
                                            .match(/[\w.]+/)),
                                        e && e.length > 0 && (q = e[0]));
                            }),
                            l.stdin.on("error", function (a) {
                                f.log("info", "wget stdin error: " + a);
                            }),
                            void l.on("exit", function (a, b) {
                                return (
                                    f.log(
                                        "info",
                                        "wget stopped with code " +
                                        a +
                                        " and signal " +
                                        b +
                                        "; downloadInProgressCount: " +
                                        m
                                    ),
                                    clearTimeout(n),
                                    (o = null),
                                    m--,
                                    m > 0
                                        ? c(-1)
                                        : ((l = null),
                                            (q = 0),
                                            g.showNormalTicker(),
                                            h.writeToConfig({ syncInProgress: !1 }, !0),
                                            void e.unlink(j.mediaPath + "robots.txt", function () {
                                                i.extractStart(),
                                                    0 !== a
                                                        ? c("wget process exited with code " + a, a)
                                                        : c();
                                            }))
                                );
                            }))
                        : c("There is no group to fetch")
                );
            };
        }),
        c.register("./app/controllers/pi-events.js", function (a, b, c) {
            "use strict";
            var m,
                n,
                d = c("fs"),
                e = c("path"),
                f = c("async"),
                g = c("./pi-main"),
                h = c("../others/logger"),
                i = c("../../config/config"),
                j = {
                    category: "player",
                    ts: 0,
                    log: { playerUptime: 0, tvUptime: 0 },
                },
                k = 0.25,
                l = function (a) {
                    d.readdir(i.logsDir, function (b, c) {
                        return b
                            ? void h.log("error", "read error for logs directory," + b)
                            : void f.eachSeries(
                                c,
                                function (b, c) {
                                    b.slice(0, b.indexOf(".")) < a
                                        ? d.readFile(
                                            e.join(i.logsDir, b),
                                            "utf8",
                                            function (a, d) {
                                                d && g.uploadLog(b, d), c();
                                            }
                                        )
                                        : c();
                                },
                                function () {
                                    g.uploadForeverLog();
                                }
                            );
                    });
                };
            (b.deleteLog = function (a) {
                d.unlink(e.join(i.logsDir, a), function () { });
            }),
                (b.storeEvent = function (a, b, c) {
                    var f = { category: a, ts: Date.now(), type: b, description: c },
                        g = e.join(i.logsDir, new Date().setMinutes(0, 0, 0) + ".events");
                    d.appendFile(g, JSON.stringify(f) + "\n", function () { });
                }),
                (m = function () {
                    var b,
                        c,
                        a = new Date().setMinutes(0, 0, 0);
                    if ((l(a), (b = g.statusLog()), a > j.ts)) {
                        (j.ts = a), (j.log = {}), (j.log.playerUptime = k);
                        for (c in b) b[c] ? (j.log[c] = k) : (j.log[c] = 0);
                    } else {
                        j.log.playerUptime += k;
                        for (c in b) b[c] && (j.log[c] = (j.log[c] || 0) + k);
                    }
                }),
                (n = function () {
                    d.writeFile(
                        e.join(i.logsDir, j.ts + ".log"),
                        JSON.stringify(j, null, 4),
                        function () {
                            m();
                        }
                    ),
                        setTimeout(n, 36e5 * k);
                }),
                (b.logFilePlay = function (a) {
                    (a = a.replace(/[^a-zA-Z0-9]/g, "_")),
                        j.ts && (j.log[a] = (j.log[a] || 0) + 1);
                }),
                (b.startLog = function () {
                    var a = new Date(),
                        b = 3600 * k,
                        c = (a.getSeconds() + 60 * a.getMinutes()) % b;
                    300 > c && (b += 300 - c), m(), setTimeout(n, 1e3 * b);
                });
        }),
        c.register("./app/controllers/assets.js", function (a, b, c) {
            "use strict";
            var n,
                o,
                p,
                d = c("../../config/config"),
                e = c("../others/restware"),
                f = c("fs"),
                g = c("path"),
                h = c("async"),
                i = c("child_process").exec,
                j = c("ejs"),
                l = (c("lodash"), c("../others/file-util")),
                m = c("../others/logger");
            "pi" == d.env
                ? (n = c("./pi-main"))
                : ((n = c("./server-main")),
                    (o = c("mongoose")),
                    (p = o.model("Asset"))),
                (b.index = function (a, b) {
                    var j,
                        k = a.installation,
                        l = null,
                        m = {
                            sizes: { total: 0, used: 0 },
                            files: [],
                            dbdata: null,
                            systemAssets: d.systemAssets,
                            player: "pi" === d.env,
                        };
                    a.query.installation && (k = a.query.installation),
                        a.query.label && (l = a.query.label),
                        (j = g.join(d.mediaDir, k)),
                        h.series(
                            [
                                function (b) {
                                    "pi" != d.env
                                        ? i("du -ms " + j, function (e, f) {
                                            var h = parseInt(f);
                                            (m.sizes.used = h),
                                                c("mongoose")
                                                    .model("User")
                                                    .findOne(
                                                        { username: a.installation },
                                                        function (a, c) {
                                                            !a &&
                                                                c &&
                                                                ((m.sizes.total =
                                                                    c.serverLicenses * d.spacePerLicense +
                                                                    (c.storageSpace || 0)),
                                                                    (m.sizes.total =
                                                                        m.sizes.total > 300 ? m.sizes.total : 300)),
                                                                b();
                                                        }
                                                    );
                                        })
                                        : b();
                                },
                                function (a) {
                                    f.readdir(j, function (b, c) {
                                        if (b) a(b);
                                        else {
                                            var d = c.filter(function (a) {
                                                return "_" != a.charAt(0) && "." != a.charAt(0);
                                            });
                                            d.length &&
                                                (m.files = d.sort(function (a, b) {
                                                    return a.localeCompare(b, void 0, { numeric: !0 });
                                                })),
                                                a();
                                        }
                                    });
                                },
                                function (a) {
                                    "pi" != d.env
                                        ? p.find({ installation: k }, function (b, c) {
                                            !b && c && (m.dbdata = c), a();
                                        })
                                        : a();
                                },
                                function (b) {
                                    var c, e, f, g, h, i, j;
                                    if ("pi" == d.env) return b();
                                    if (
                                        ((c = !0),
                                            (e = null),
                                            (f = !1),
                                            a.collaboratorRights &&
                                            a.collaboratorRights.groupIds &&
                                            a.collaboratorRights.groupIds.length &&
                                            (a.collaboratorRights.asset.restrictAdmin
                                                ? ((c = !0), (e = a.collaboratorRights.groupIds))
                                                : a.collaboratorRights.asset.restrict &&
                                                ((e = a.collaboratorRights.groupIds), (c = !1))),
                                            (l || e) && m.dbdata)
                                    ) {
                                        for (g = 0, h = m.dbdata.length; h > g; g++) {
                                            if (m.dbdata[g].groupIds && m.dbdata[g].groupIds.length) {
                                                for (f = !1, i = 0; i < e.length; i++)
                                                    if (m.dbdata[g].groupIds.indexOf(e[i]) >= 0) {
                                                        f = !0;
                                                        break;
                                                    }
                                            } else f = c;
                                            l &&
                                                m.dbdata[g].labels &&
                                                m.dbdata[g].labels.length &&
                                                (f = m.dbdata[g].labels.indexOf(l) >= 0),
                                                f ||
                                                ((j = m.files.indexOf(m.dbdata[g].name)),
                                                    j >= 0 && m.files.splice(j, 1));
                                        }
                                        b();
                                    } else b();
                                },
                            ],
                            function (a) {
                                return a
                                    ? e.sendError(b, "Error reading media directory: " + a)
                                    : e.sendSuccess(b, "Sending media directory files: ", m);
                            }
                        );
                }),
                (b.createFiles = function (a, b) {
                    function q(b, c) {
                        var i,
                            e = a.files[b],
                            h = (e.originalname || e.name).normalize("NFC");
                        return h
                            ? ((h = h.replace(d.filenameRegex, "")),
                                (i = {
                                    ä: "ae",
                                    ö: "oe",
                                    ß: "ss",
                                    ü: "ue",
                                    æ: "ae",
                                    ø: "oe",
                                    å: "aa",
                                    é: "e",
                                    è: "e",
                                }),
                                (h = h.replace(/[äößüæøåéè]/gi, function (a) {
                                    return i[a];
                                })),
                                h.match(d.zipfileRegex) && (h = h.replace(/ /g, "")),
                                h.match(d.brandRegex) && (h = h.toLowerCase()),
                                void f.rename(e.path, g.join(j, h), function (a) {
                                    a
                                        ? (m.log("error", "file rename error:" + a), c(a))
                                        : (h.match(d.zipfileRegex) && p.push(h),
                                            h.match(/^custom_layout.*html$/i) && l.modifyHTML(j, h),
                                            o.push({
                                                name: h,
                                                size: e.size,
                                                type: e.mimetype || e.type,
                                            }),
                                            c());
                                }))
                            : (m.log("error", { error: "invalid file name ", msg: e }),
                                void c("no name"));
                    }
                    var j = g.join(d.mediaDir, a.installation),
                        k = Object.keys(a.files),
                        o = [],
                        p = [];
                    h.series(
                        [
                            function (b) {
                                return "pi" == d.env
                                    ? b()
                                    : void i("du -ms " + j, function (e, g) {
                                        var l,
                                            j = parseInt(g);
                                        return e
                                            ? b()
                                            : void c("mongoose")
                                                .model("User")
                                                .findOne(
                                                    { username: a.installation },
                                                    function (c, e) {
                                                        return c || !e
                                                            ? b()
                                                            : ((l =
                                                                e.serverLicenses * d.spacePerLicense +
                                                                (e.storageSpace || 0)),
                                                                (l = l > 300 ? l : 300),
                                                                !isNaN(j) && j > l
                                                                    ? void h.each(
                                                                        k,
                                                                        function (b, c) {
                                                                            console.log(
                                                                                "deleting " + a.files[b].path
                                                                            ),
                                                                                f.unlink(a.files[b].path, c);
                                                                        },
                                                                        function () {
                                                                            return b(
                                                                                "Exceeded Storage Limit for the installation, please purchase more storage"
                                                                            );
                                                                        }
                                                                    )
                                                                    : b());
                                                    }
                                                );
                                    });
                            },
                            function (a) {
                                h.each(k, q, function (b) {
                                    return (
                                        n.writeToConfig({ lastUpload: Date.now() }),
                                        n.updateDiskStatus(),
                                        b
                                            ? (console.log(o), a("File rename error " + b))
                                            : ("pi" == d.env &&
                                                p.length > 0 &&
                                                c("../others/extract-zip").extractStart(p),
                                                a())
                                    );
                                });
                            },
                        ],
                        function (a) {
                            a
                                ? e.sendError(b, a)
                                : e.sendSuccess(b, " Successfully uploaded files", o);
                        }
                    );
                }),
                (b.updateFileDetails = function (a, b) {
                    return "pi" == d.env
                        ? e.sendSuccess(b, "File Upload Successful")
                        : void c("./server-assets").storeDetails(a, b);
                }),
                (b.getFileDetails = function (a, b) {
                    var c = a.params.file,
                        h = g.join(d.mediaDir, a.installation);
                    f.stat(g.join(h, c), function (f, g) {
                        if (f) return e.sendError(b, "file stat error", f);
                        var h;
                        return (
                            (h = c.match(d.imageRegex)
                                ? "image"
                                : c.match(d.videoRegex)
                                    ? "video"
                                    : c.match(d.audioRegex)
                                        ? "audio"
                                        : c.match(d.noticeRegex)
                                            ? "notice"
                                            : c.match(d.pdffileRegex)
                                                ? "pdf"
                                                : c.match(d.htmlRegex)
                                                    ? "html"
                                                    : c.match(d.liveStreamRegex) || c.match(d.linkUrlRegex)
                                                        ? "link"
                                                        : c.match(d.gcalRegex)
                                                            ? "gcal"
                                                            : c.match(d.txtFileRegex)
                                                                ? "text"
                                                                : c.match(d.radioFileRegex)
                                                                    ? "radio"
                                                                    : "other"),
                            "pi" == d.env
                                ? e.sendSuccess(b, "Sending file details", {
                                    name: c,
                                    size: ~~(g.size / 1e3) + " KB",
                                    ctime: g.ctime,
                                    type: h,
                                    path: "/media/" + c,
                                })
                                : void p.findOne(
                                    { name: c, installation: a.installation },
                                    function (d, f) {
                                        return e.sendSuccess(b, "Sending file details", {
                                            name: c,
                                            size: ~~(g.size / 1e3) + " KB",
                                            ctime: g.ctime,
                                            path: "/media/" + a.installation + "/" + c,
                                            type: h,
                                            dbdata: f,
                                        });
                                    }
                                )
                        );
                    });
                }),
                (b.deleteFile = function (a, b) {
                    var c = g.join(d.mediaDir, a.installation),
                        i = a.params.file,
                        j = null,
                        k = null;
                    i.match(d.noticeRegex) &&
                        0 != i.indexOf("custom_layout") &&
                        (j = "_" + g.basename(i, ".html") + ".json"),
                        h.series(
                            [
                                function (a) {
                                    f.unlink(g.join(c, i), function (b) {
                                        return b ? a(b) : (n.updateDiskStatus(), void a());
                                    });
                                },
                                function (b) {
                                    "pi" != d.env &&
                                        (i.match(d.videoRegex) || i.match(d.imageRegex))
                                        ? p.findOne(
                                            { name: i, installation: a.installation },
                                            function (a, c) {
                                                if (c && c.thumbnail) {
                                                    var e = c.thumbnail;
                                                    (e = e.replace("/media/_thumbnails/", "")),
                                                        (k = g.join(d.thumbnailDir, e));
                                                }
                                                b();
                                            }
                                        )
                                        : b();
                                },
                                function (b) {
                                    "pi" != d.env
                                        ? p.remove(
                                            { name: i, installation: a.installation },
                                            function (a) {
                                                a &&
                                                    m.log(
                                                        "error",
                                                        "unable to delete asset from db for :" + i
                                                    ),
                                                    b();
                                            }
                                        )
                                        : b();
                                },
                                function (a) {
                                    k
                                        ? f.unlink(k, function (b) {
                                            b &&
                                                m.log(
                                                    "error",
                                                    "unable to find/delete thumbnail: " + b
                                                ),
                                                a();
                                        })
                                        : j
                                            ? f.unlink(g.join(c, j), function () {
                                                a();
                                            })
                                            : a();
                                },
                            ],
                            function (a) {
                                return a
                                    ? e.sendError(b, "Unable to delete file", a)
                                    : e.sendSuccess(b, "Deleted file", i);
                            }
                        );
                }),
                (b.updateAsset = function (a, b) {
                    var i, j, k, l, n;
                    a.body.newname
                        ? ((i = g.join(d.mediaDir, a.installation)),
                            (j = a.params.file),
                            (k = a.body.newname),
                            (l = null),
                            (n = null),
                            j.match(d.noticeRegex) &&
                            0 != j.indexOf("custom_layout") &&
                            ((l = "_" + j.slice(0, j.lastIndexOf(".")) + ".json"),
                                (n = "_" + k.slice(0, k.lastIndexOf(".")) + ".json")),
                            h.series(
                                [
                                    function (b) {
                                        f.rename(g.join(i, j), g.join(i, k), function (c) {
                                            c &&
                                                m.log(
                                                    "error",
                                                    "unable to rename " + j + " for " + a.installation
                                                ),
                                                b(c);
                                        });
                                    },
                                    function (b) {
                                        l && n
                                            ? f.rename(g.join(i, l), g.join(i, n), function (c) {
                                                c &&
                                                    m.log(
                                                        "error",
                                                        "JSON file Rename Error " +
                                                        j +
                                                        " for " +
                                                        a.installation
                                                    ),
                                                    b(c);
                                            })
                                            : b();
                                    },
                                    function (b) {
                                        "pi" != d.env &&
                                            c("./server-assets").renameObject(a.installation, j, k),
                                            b();
                                    },
                                ],
                                function (a) {
                                    return a
                                        ? e.sendError(b, "File rename error", a)
                                        : e.sendSuccess(b, " Successfully renamed file to", k);
                                }
                            ))
                        : a.body.dbdata &&
                        "pi" != d.env &&
                        c("./server-assets").updateObject(a, b);
                }),
                (b.createNotice = function (a, b) {
                    var l,
                        p,
                        q,
                        i = g.join(d.mediaDir, a.installation),
                        k = a.body.formdata,
                        o = {
                            title: k.title,
                            description: k.description,
                            image: k.image || "",
                            footer: k.footer || "",
                        };
                    h.series(
                        [
                            function (a) {
                                var b = g.join(i, "notice_template.ejs");
                                f.exists(b, function (c) {
                                    var e;
                                    (e = c ? b : d.defaultTemplate),
                                        f.readFile(e, "utf8", function (b, c) {
                                            b
                                                ? a("Error reading template file: " + b)
                                                : ((l = c), a());
                                        });
                                });
                            },
                            function (b) {
                                try {
                                    p = j.compile(l)(o);
                                } catch (c) {
                                    m.log(
                                        "error",
                                        "ejs compile error for notice template, ignoring, " +
                                        a.installation
                                    );
                                }
                                b();
                            },
                            function (b) {
                                (q = a.params.file
                                    ? g.basename(a.params.file, ".html")
                                    : (k.title || "untitled").slice(0, 20).replace(/\W/g, "") +
                                    "_" +
                                    Math.floor(1e4 * Math.random())),
                                    f.writeFile(g.join(i, q + ".html"), p, "utf8", function (a) {
                                        a
                                            ? b("Error writing html file: " + a)
                                            : f.writeFile(
                                                g.join(i, "_" + q + ".json"),
                                                JSON.stringify(o, null, 4),
                                                "utf8",
                                                function (a) {
                                                    a
                                                        ? b("Error writing json file: " + a)
                                                        : (n.writeToConfig({ lastUpload: Date.now() }),
                                                            n.updateDiskStatus(),
                                                            b());
                                                },
                                                function (a) {
                                                    console.log("Error writing html file: " + a);
                                                }
                                            );
                                    });
                            },
                            function (b) {
                                "pi" != d.env
                                    ? c("./server-assets").storeLinkDetails(
                                        q + ".html",
                                        "notice",
                                        a.installation,
                                        a.user,
                                        a.body.categories,
                                        a.collaboratorRights &&
                                            a.collaboratorRights.groupIds &&
                                            a.collaboratorRights.groupIds.length
                                            ? a.collaboratorRights.groupIds
                                            : null,
                                        b
                                    )
                                    : b();
                            },
                        ],
                        function (a) {
                            a ? e.sendError(b, a) : e.sendSuccess(b, "Notice File Saved", p);
                        }
                    );
                }),
                (b.getNotice = function (a, b) {
                    var c = g.join(d.mediaDir, a.installation),
                        i = {};
                    h.series(
                        [
                            function (b) {
                                var d = "_" + g.basename(a.params.file, ".html") + ".json";
                                f.readFile(g.join(c, d), "utf8", function (a, c) {
                                    if (((i.data = null), a || !c)) return b(a);
                                    try {
                                        i.data = JSON.parse(c);
                                    } catch (d) {
                                        m.log("error", "Parsing error for notice data: " + d);
                                    }
                                    return b();
                                });
                            },
                            function (b) {
                                "pi" != d.env
                                    ? p.findOne(
                                        { name: a.params.file, installation: a.installation },
                                        function (a, c) {
                                            (i.dbdata = c), b();
                                        }
                                    )
                                    : b();
                            },
                        ],
                        function (a) {
                            return a
                                ? e.sendError(b, "JSON file read error", a)
                                : e.sendSuccess(b, "Sending notice file details", i);
                        }
                    );
                }),
                (b.zipPreview = function (a, b) {
                    var h = g.join(d.mediaDir, a.installation, a.params.file),
                        i = a.params.file.replace(/(.zip|.gz|.bz2)/g, ""),
                        j = g.join(d.mediaDir, a.installation, "unzipped-" + i),
                        k = "unzipped-" + i;
                    f.createReadStream(h).pipe(c("unzipper").Extract({ path: j })),
                        e.sendSuccess(
                            b,
                            "Sending zip file path",
                            "/media/" + a.installation + "/" + k
                        );
                }),
                (b.createAssetFileFromContent = function (a, b, c) {
                    var e = g.resolve(d.mediaDir, a);
                    f.writeFile(e, JSON.stringify(b, null, 4), c);
                }),
                (b.createLinkFile = function (a, b) {
                    var i = g.join(d.mediaPath, a.installation),
                        j = a.body.details;
                    h.series(
                        [
                            function (a) {
                                f.writeFile(
                                    i + "/" + j.name + j.type,
                                    JSON.stringify(j, null, 4),
                                    "utf8",
                                    function (b) {
                                        a(b);
                                    }
                                );
                            },
                            function (b) {
                                "pi" != d.env
                                    ? c("./server-assets").storeLinkDetails(
                                        j.name + j.type,
                                        "link",
                                        a.installation,
                                        a.user,
                                        a.body.categories,
                                        a.collaboratorRights &&
                                            a.collaboratorRights.groupIds &&
                                            a.collaboratorRights.groupIds.length
                                            ? a.collaboratorRights.groupIds
                                            : null,
                                        b
                                    )
                                    : b();
                            },
                        ],
                        function (a) {
                            return a
                                ? e.sendError(b, "error in creating link file", a)
                                : e.sendSuccess(
                                    b,
                                    "Link file created for the link as " + j.name + j.type
                                );
                        }
                    );
                }),
                (b.getLinkFileDetails = function (a, b) {
                    var c = g.join(d.mediaPath, a.installation),
                        i = a.params.file,
                        j = {};
                    h.series(
                        [
                            function (a) {
                                f.readFile(c + "/" + i, "utf-8", function (b, c) {
                                    (j.data = c), a(b);
                                });
                            },
                            function (b) {
                                "pi" != d.env
                                    ? p.findOne(
                                        { name: i, installation: a.installation },
                                        function (a, c) {
                                            (j.dbdata = c), b();
                                        }
                                    )
                                    : b();
                            },
                        ],
                        function (a) {
                            return a
                                ? e.sendError(b, "unable to read link file, error:" + a)
                                : e.sendSuccess(b, "link file details", j);
                        }
                    );
                }),
                (b.updatePlaylist = function (a, b) {
                    return "pi" == d.env
                        ? e.sendSuccess(b, "I am pi")
                        : (c("./server-assets").updatePlaylist(
                            a.installation,
                            a.body.playlist,
                            a.body.assets
                        ),
                            e.sendSuccess(b, "asset update has been queued"));
                }),
                (b.createCustomTemplate = function (a, b) {
                    var i, j, k, l, n, o, p, q, r, s;
                    return "pi" == d.env
                        ? e.sendSuccess(b, "I am pi")
                        : ((i = ["main", "side", "bottom", "zone4", "zone5", "zone6"]),
                            (j = a.body.filename || "custom_template.html"),
                            (k = a.body.html || ""),
                            (l = a.body.css || ""),
                            (p = a.body.properties || null),
                            (q = {}),
                            (r = g.join(d.mediaPath, a.installation)),
                            j.match("^custom_layout") || (j = "custom_layout_" + j),
                            j.match(".html$") || (j += ".html"),
                            void h.series(
                                [
                                    function (a) {
                                        f.readFile(
                                            "templates/screen-layout.html",
                                            { encoding: "utf-8" },
                                            function (b, d) {
                                                if (b) return a("Error reading screen-layout: " + b);
                                                if (((s = c("cheerio").load(d)), p)) {
                                                    s("#marquee").after(
                                                        '<div id="properties" style="display:none;">&nbsp;</div>'
                                                    ),
                                                        s("#properties").attr("data-properties", p);
                                                    try {
                                                        q = JSON.parse(p);
                                                    } catch (e) {
                                                        m.log(
                                                            "error",
                                                            "Parsing error for custom template properties: " +
                                                            e
                                                        );
                                                    }
                                                    (o = ""),
                                                        (n = ""),
                                                        q.bgImage &&
                                                        (n =
                                                            n +
                                                            '#full {background-image:url("' +
                                                            q.bgImage +
                                                            '")}'),
                                                        i.forEach(function (a) {
                                                            q[a] &&
                                                                q[a].enable &&
                                                                ((n =
                                                                    n +
                                                                    "#" +
                                                                    a +
                                                                    " { position: absolute; top:" +
                                                                    q[a].y +
                                                                    "px; left: " +
                                                                    q[a].x +
                                                                    "px; width: " +
                                                                    q[a].w +
                                                                    "px; height: " +
                                                                    q[a].h +
                                                                    "px; }"),
                                                                    (o =
                                                                        o +
                                                                        '<div id="' +
                                                                        a +
                                                                        '" class="zone">&nbsp;</div>'));
                                                        }),
                                                        n &&
                                                        s("head").append(
                                                            '<style id="customcss" type="text/css">' +
                                                            n +
                                                            "</style>"
                                                        ),
                                                        o && s("#full").append(o);
                                                } else k && s("#full").append(k);
                                                l &&
                                                    s("head").append(
                                                        '<style id="customcss2" type="text/css">' +
                                                        l +
                                                        "</style>"
                                                    ),
                                                    a();
                                            }
                                        );
                                    },
                                    function (a) {
                                        f.writeFile(r + "/" + j, s.html(), "utf8", function (b) {
                                            a(b);
                                        });
                                    },
                                    function (b) {
                                        "pi" != d.env
                                            ? c("./server-assets").storeLinkDetails(
                                                j,
                                                "html",
                                                a.installation,
                                                a.user,
                                                a.body.categories,
                                                a.collaboratorRights &&
                                                    a.collaboratorRights.groupIds &&
                                                    a.collaboratorRights.groupIds.length
                                                    ? a.collaboratorRights.groupIds
                                                    : null,
                                                b
                                            )
                                            : b();
                                    },
                                ],
                                function (a) {
                                    return a
                                        ? e.sendError(
                                            b,
                                            "Error in creating custom template file",
                                            a
                                        )
                                        : e.sendSuccess(b, "Custom template file saved as " + j, {
                                            filename: j,
                                        });
                                }
                            ));
                }),
                (b.getCustomTemplate = function (a, b) {
                    var h, i, j, k;
                    return "pi" == d.env
                        ? e.sendSuccess(b, "I am pi")
                        : ((h = g.join(d.mediaPath, a.installation)),
                            (i = a.params.file),
                            i.match("^custom_layout.*.html$")
                                ? void f.readFile(h + "/" + i, "utf-8", function (a, d) {
                                    return a
                                        ? e.sendError(b, "Error reading file: " + a)
                                        : ((j = c("cheerio").load(d)),
                                            j("script").remove(),
                                            (k = j("#properties").data()),
                                            e.sendSuccess(b, "Custom template details", {
                                                properties: k ? k.properties : null,
                                                css: j("#customcss2").html(),
                                                html: j("#full").html(),
                                                srcDoc: j.html(),
                                            }));
                                })
                                : e.sendError(b, "Not a custom template file: " + i));
                });
        }),
        c.register("./app/controllers/playlists.js", function (a, b, c) {
            "use strict";
            var j,
                k,
                l,
                m,
                d = c("../../config/config"),
                e = c("../others/restware"),
                f = c("fs"),
                g = c("path"),
                h = c("async"),
                i = c("../others/logger");
            "pi" != d.env && ((j = c("mongoose")), (k = j.model("Group"))),
                (l = [
                    {
                        name: "TV_OFF",
                        settings: {},
                        assets: [],
                        layout: "1",
                        schedule: {},
                    },
                ]),
                (m = function (a) {
                    return (
                        "_" == a.charAt(0) && "_" == a.charAt(1) && ".json" == a.slice(-5)
                    );
                }),
                (b.newPlaylist = function (a, b, c, e) {
                    var h = g.join(d.mediaDir, a, "__" + b + ".json"),
                        i = {
                            name: b,
                            settings: {
                                ticker: {
                                    enable: !1,
                                    behavior: "scroll",
                                    textSpeed: 3,
                                    rss: { enable: !1, link: null, feedDelay: 10 },
                                },
                                ads: { adPlaylist: !1, adCount: 1, adInterval: 60 },
                                audio: { enable: !1, random: !1, volume: 50 },
                            },
                            assets: [],
                            layout: "1",
                            templateName: "custom_layout.html",
                            schedule: {},
                        };
                    e && (i.groupIds = e),
                        f.writeFile(h, JSON.stringify(i, null, 4), function (a) {
                            c(a, i);
                        });
                }),
                (b.getPlaylists = function (a, b, c, e) {
                    var j = g.join(d.mediaDir, a),
                        n = !1,
                        o = !1;
                    (b = b || !1),
                        (c = c || null),
                        (e = e || function () { }),
                        f.readdir(j, function (p, q) {
                            var r, s, t;
                            return p
                                ? e("directory read error: " + p)
                                : ((r = q.filter(m)),
                                    (s = []),
                                    (r = r.sort(function (a, b) {
                                        return a.localeCompare(b, void 0, { numeric: !0 });
                                    })),
                                    (t = function (e, l) {
                                        h.waterfall(
                                            [
                                                function (d) {
                                                    var h = {
                                                        settings: {},
                                                        assets: [],
                                                        name: g.basename(e, ".json").slice(2),
                                                    };
                                                    "__TV_OFF.json" == e && (o = !0),
                                                        f.readFile(g.join(j, e), "utf8", function (e, f) {
                                                            var g, k;
                                                            if (e || !f)
                                                                s.push(h),
                                                                    i.log(
                                                                        "error",
                                                                        "playlist file reading error for " +
                                                                        a +
                                                                        ";" +
                                                                        e
                                                                    );
                                                            else {
                                                                g = {};
                                                                try {
                                                                    g = JSON.parse(f);
                                                                } catch (j) {
                                                                    i.log(
                                                                        "error",
                                                                        "playlist index parsing error for " + a
                                                                    );
                                                                }
                                                                if (
                                                                    ((h.settings = g.settings || {}),
                                                                        (h.assets = g.assets || []),
                                                                        (h.layout = g.layout || "1"),
                                                                        (h.templateName =
                                                                            g.templateName || "custom_layout.html"),
                                                                        (h.videoWindow = g.videoWindow || null),
                                                                        (h.zoneVideoWindow = g.zoneVideoWindow || {}),
                                                                        (h.schedule = g.schedule || {}),
                                                                        (h.labels = g.labels || []),
                                                                        (h.groupIds = g.groupIds),
                                                                        c)
                                                                )
                                                                    if (g.groupIds && g.groupIds.length) {
                                                                        for (n = !1, k = 0; k < c.length; k++)
                                                                            if (g.groupIds.indexOf(c[k]) >= 0) {
                                                                                n = !0;
                                                                                break;
                                                                            }
                                                                    } else n = b;
                                                                else n = !0;
                                                                n || (h = null);
                                                            }
                                                            d(null, h);
                                                        });
                                                },
                                                function (c, e) {
                                                    return "pi" == d.env
                                                        ? e(null, c)
                                                        : void (b && c
                                                            ? k.find(
                                                                {
                                                                    installation: a,
                                                                    "deployedPlaylists.name": c.name,
                                                                },
                                                                { name: 1, _id: 0 },
                                                                { lean: !0 },
                                                                function (a, b) {
                                                                    !a &&
                                                                        Array.isArray(b) &&
                                                                        (c.belongsTo = b.map(function (a) {
                                                                            return a.name;
                                                                        })),
                                                                        e(a, c);
                                                                }
                                                            )
                                                            : e(null, c));
                                                },
                                            ],
                                            function (a, b) {
                                                b && s.push(b), l();
                                            }
                                        );
                                    }),
                                    h.eachSeries(r, t, function (a) {
                                        return a
                                            ? e("playlist read error: " + a)
                                            : (o || (s = s.concat(l)), e(null, s));
                                    }),
                                    void 0);
                        });
                }),
                (b.index = function (a, c) {
                    var d = !0,
                        f = null;
                    a.collaboratorRights &&
                        a.collaboratorRights.groupIds &&
                        a.collaboratorRights.groupIds.length &&
                        (a.collaboratorRights.asset.restrictAdmin
                            ? ((d = !0), (f = a.collaboratorRights.groupIds))
                            : a.collaboratorRights.asset.restrict &&
                            ((d = !1), (f = a.collaboratorRights.groupIds))),
                        b.getPlaylists(a.installation, d, f, function (a, b) {
                            return a
                                ? e.sendError(c, a)
                                : e.sendSuccess(c, " Sending playlist list", b);
                        });
                }),
                (b.getPlaylist = function (a, b) {
                    var k,
                        c = !0,
                        h = null,
                        j = !1;
                    return (
                        a.collaboratorRights &&
                        a.collaboratorRights.groupIds &&
                        a.collaboratorRights.groupIds.length &&
                        (a.collaboratorRights.asset.restrictAdmin
                            ? ((c = !0), (h = a.collaboratorRights.groupIds))
                            : a.collaboratorRights.asset.restrict &&
                            ((c = !1), (h = a.collaboratorRights.groupIds))),
                        "TV_OFF" == a.params.file
                            ? e.sendError(b, "System Playlist, can not be edited")
                            : ((k = g.join(
                                d.mediaDir,
                                a.installation,
                                "__" + a.params.file + ".json"
                            )),
                                void f.readFile(k, "utf8", function (d, f) {
                                    var g, k, m;
                                    if (d) return e.sendError(b, "playlist file read error", d);
                                    if (
                                        ((g = {
                                            settings: {},
                                            layout: "1",
                                            assets: [],
                                            videoWindow: null,
                                            zoneVideoWindow: {},
                                            templateName: "custom_layout.html",
                                        }),
                                            f)
                                    ) {
                                        k = {};
                                        try {
                                            k = JSON.parse(f);
                                        } catch (l) {
                                            i.log(
                                                "error",
                                                "getPlaylist parsing error for " + a.installation
                                            );
                                        }
                                        if (
                                            ((g.settings = k.settings || {}),
                                                (g.assets = k.assets || []),
                                                (g.layout = k.layout || "1"),
                                                (g.templateName = k.templateName || "custom_layout.html"),
                                                (g.videoWindow = k.videoWindow ? k.videoWindow : null),
                                                (g.zoneVideoWindow = k.zoneVideoWindow
                                                    ? k.zoneVideoWindow
                                                    : {}),
                                                (g.schedule = k.schedule || {}),
                                                (g.groupIds = k.groupIds),
                                                (g.labels = k.labels || []),
                                                h)
                                        )
                                            if (k.groupIds && k.groupIds.length) {
                                                for (j = !1, m = 0; m < h.length; m++)
                                                    if (k.groupIds.indexOf(h[m]) >= 0) {
                                                        j = !0;
                                                        break;
                                                    }
                                            } else j = c;
                                        else j = !0;
                                        if (!j)
                                            return e.sendError(b, "playlist file access denied");
                                    }
                                    return e.sendSuccess(b, " Sending playlist content", g);
                                }))
                    );
                }),
                (b.createPlaylist = function (a, c) {
                    var g,
                        f = a.body.file;
                    (f = f.replace(d.filenameRegex, "")),
                        (g = {
                            ä: "ae",
                            ö: "oe",
                            ß: "ss",
                            ü: "ue",
                            æ: "ae",
                            ø: "oe",
                            å: "aa",
                            é: "e",
                            è: "e",
                        }),
                        (f = f.replace(/[äößüæøåéè]/gi, function (a) {
                            return g[a];
                        })),
                        b.newPlaylist(
                            a.installation,
                            f,
                            function (a) {
                                a
                                    ? e.sendError(c, "Playlist write error", a)
                                    : e.sendSuccess(c, "Playlist Created: ", f);
                            },
                            a.collaboratorRights &&
                                a.collaboratorRights.groupIds &&
                                a.collaboratorRights.groupIds.length
                                ? a.collaboratorRights.groupIds
                                : null
                        );
                }),
                (b.savePlaylist = function (a, b) {
                    var c = g.join(
                        d.mediaDir,
                        a.installation,
                        "__" + a.params.file + ".json"
                    );
                    f.readFile(c, "utf8", function (d, g) {
                        var h, j, m;
                        if (
                            (d &&
                                "ENOENT" == d.code &&
                                "TV_OFF" == a.params.file &&
                                ((g = JSON.stringify(l[0])), (d = null)),
                                d)
                        )
                            e.sendError(b, "Playlist file read error", d);
                        else {
                            if (((h = {}), (j = !1), (h.version = 0), (h.layout = "1"), g)) {
                                try {
                                    h = JSON.parse(g);
                                } catch (k) {
                                    i.log(
                                        "error",
                                        "savePlaylist parsing error for " + a.installation
                                    );
                                }
                                h.version = h.version || 0;
                            }
                            a.body.name && ((h.name = a.body.name), (j = !0)),
                                a.body.settings && ((h.settings = a.body.settings), (j = !0)),
                                a.body.assets && ((h.assets = a.body.assets), (j = !0)),
                                a.body.schedule && ((h.schedule = a.body.schedule), (j = !0)),
                                a.body.layout &&
                                ((h.layout = a.body.layout),
                                    (h.templateName = a.body.templateName),
                                    (h.videoWindow = a.body.videoWindow),
                                    (h.zoneVideoWindow = a.body.zoneVideoWindow),
                                    (j = !0)),
                                a.body.labels && ((h.labels = a.body.labels), (j = !0)),
                                (m = a.body.groupIds ? a.body.groupIds : h.groupIds),
                                (h.groupIds =
                                    a.collaboratorRights &&
                                        a.collaboratorRights.groupIds &&
                                        a.collaboratorRights.groupIds.length
                                        ? a.collaboratorRights.groupIds
                                        : null),
                                m &&
                                ((h.groupIds = h.groupIds || []),
                                    m.forEach(function (a) {
                                        -1 === h.groupIds.indexOf(a) && h.groupIds.push(a);
                                    }),
                                    a.body.groupIds && (j = !0)),
                                j
                                    ? ((h.version += 1),
                                        f.writeFile(c, JSON.stringify(h, null, 4), function (a) {
                                            a
                                                ? e.sendError(b, "Playlist save error", a)
                                                : e.sendSuccess(b, "Playlist Saved: ", h);
                                        }))
                                    : e.sendSuccess(b, "Nothing to Update: ", h);
                        }
                    });
                });
        }),
        c.register("./app/controllers/token.js", function (a, b, c) {
            "use strict";
            function h() {
                (e.tokens = []),
                    (e.currentTokenIndex = 0),
                    (e.rollOverTime = null),
                    (e.lifeTime = null),
                    clearTimeout(g),
                    clearTimeout(f);
            }
            function i() {
                setTimeout(function () {
                    (e.currentTokenIndex = (e.currentTokenIndex + 1) % e.tokens.length),
                        i();
                }, 1e3 * e.rollOverTime);
            }
            function j() {
                e.lifeTime && setTimeout(h, 1e3 * e.lifeTime), e.rollOverTime && i();
            }
            var f,
                g,
                d = c("../others/restware"),
                e = {
                    tokens: [],
                    currentTokenIndex: 0,
                    rollOverTime: null,
                    lifeTime: null,
                    deleteOnShow: !1,
                };
            (b.updateTokens = function (a, b) {
                return (
                    h(),
                    (e.tokens = a.body.tokens),
                    (e.rollOverTime = a.body.rollOverTime),
                    (e.lifeTime = a.body.lifeTime),
                    j(),
                    d.sendSuccess(b, "Tokens Saved", e)
                );
            }),
                (b.getTokens = function (a, b) {
                    return d.sendSuccess(b, "Tokens", e);
                }),
                (b.currentToken = function (a, b) {
                    return d.sendSuccess(
                        b,
                        "Current Token",
                        e.tokens[e.currentTokenIndex]
                    );
                });
        }),
        c.register("./app/controllers/kiosk-ui.js", function (a, b, c) {
            function q(a, e) {
                var k,
                    g = [
                        "--allow-file-access-from-files",
                        "--disable-session-crashed-bubble",
                        "--disable-infobars",
                        "--disable-notifications",
                        "--disable-device-discovery-notifications",
                        "--disable-quic",
                        "--disable-features=Translate",
                        "--disable-features=TranslateUI",
                        "--disable-popup-blocking",
                        "--noerrdialogs",
                        "--no-first-run",
                        "--start-fullscreen",
                        "--start-maximized ",
                        "--disable-pinch",
                        "--overscroll-history-navigation=0",
                        "--autoplay-policy=no-user-gesture-required",
                        "--check-for-update-interval=1",
                        "--simulate-critical-update",
                        "--kiosk",
                        "--kiosk-printing",
                        "--user-data-dir=/home/pi/.config/chromium/kiosk",
                        "--no-startup-window",
                    ];
                t(),
                    e && (l = 1e3 * e),
                    a
                        ? g.push("--app=" + a)
                        : g.push("--app=http://localhost:8000/kiosk-ui/build/index.html"),
                    h.log("info", "Starting kiosk UI"),
                    (j = d("chromium-browser", g)),
                    j.on("error", function (a) {
                        h.log("error", "kiosk ui error: " + a);
                    }),
                    j.once("exit", function (b, c) {
                        h.log("info", "kiosk ui exited with " + b + ";" + c),
                            i &&
                            ((j = null),
                                o && (o.removeAllListeners(), (o = null)),
                                n && f.stopKioskUi(),
                                q(a, e));
                    }),
                    (k = c("node-mouse")),
                    (o = new k()),
                    o.on("click", function () {
                        (p = !0),
                            setTimeout(function () {
                                p
                                    ? b.showUi()
                                    : h.log("info", "ignoring kiosk click as hideUI is called "),
                                    (p = !1);
                            }, 1e3);
                    }),
                    (n = !0),
                    setImmediate(r);
            }
            function r() {
                j && j.pid
                    ? e("xdotool search --onlyvisible --pid " + j.pid, function (a, b) {
                        b
                            ? (h.log("info", "kiosk UI id, " + b), (m = b), s())
                            : setTimeout(r, 500);
                    })
                    : h.log("error", "kioskChrome pid is not present, fatal error");
            }
            function s(a) {
                return (
                    (a = a || function () { }),
                    p && h.log("info", "hideUI is called "),
                    (p = !1),
                    j
                        ? void (m
                            ? (clearTimeout(k),
                                e("xdotool windowminimize " + m, function () {
                                    (n = !1), a();
                                }))
                            : a(!0))
                        : a(!0)
                );
            }
            function t() {
                j && (j.kill(), (j = null)), o && (o = null), clearTimeout(k);
            }
            var k,
                m,
                n,
                o,
                u,
                d = c("child_process").spawn,
                e = c("child_process").exec,
                f = c("./pi-viewer"),
                g = c("../others/restware"),
                h = c("../others/logger"),
                i = !1,
                j = null,
                l = 3e4,
                p = !1;
            (b.showUi = function (a) {
                return (
                    (a = a || function () { }),
                    j
                        ? (clearTimeout(k),
                            (k = setTimeout(function () {
                                n && f.stopKioskUi(), t();
                            }, l)),
                            void (m && !n
                                ? ((n = !0),
                                    f.showKioskUi(function () {
                                        e("xdotool windowactivate " + m, function () {
                                            a();
                                        });
                                    }))
                                : a(!0)))
                        : a(!0)
                );
            }),
                (b.hideUi = s),
                (b.setupUi = function (a) {
                    var b = process.version.slice(1, process.version.indexOf("."));
                    return 0 == b
                        ? void h.log(
                            "error",
                            "Kiosk UI can not be supported in older images"
                        )
                        : void (a.enable
                            ? ((i = !0),
                                e("which xdotool", function (b, c, d) {
                                    b || d || !c || c.length <= 3
                                        ? h.log(
                                            "warn",
                                            "xdotool is *not* available, kiosk ui is not started"
                                        )
                                        : q(a.url, a.timeout);
                                }))
                            : ((i = !1), t()));
                }),
                (u = "stopped"),
                (b.takeAction = function (a, c) {
                    if (!j) return g.sendError(c, "Kiosk ui not enabled");
                    switch (a.params.action) {
                        case "play":
                            a.query.file
                                ? ((u = "playing"),
                                    s(function () {
                                        f.playFile(
                                            a.query.file,
                                            function () {
                                                (u = "stopped"), b.showUi();
                                            },
                                            300,
                                            !0
                                        );
                                    }),
                                    g.sendSuccess(c, "Started playing file", { status: u }))
                                : g.sendSuccess(c, "Nothing to play", { status: u });
                            break;
                        case "show":
                            b.showUi(function () {
                                g.sendSuccess(c, "Kiosk ui shown", {});
                            });
                            break;
                        case "hide":
                            n && f.stopKioskUi(),
                                s(function () {
                                    g.sendSuccess(c, "Kiosk ui hidden", {});
                                });
                            break;
                        default:
                            g.sendSuccess(c, "No action specified for kiosk ui", {
                                status: u,
                            });
                    }
                });
        }),
        c.register("./app/controllers/pi-weblink.js", function (a, b, c) {
            "use strict";
            function x(a) {
                clearTimeout(s[a].timer),
                    o[a] && o[a].pid
                        ? e(
                            "xdotool search --onlyvisible --pid " + o[a].pid,
                            function (b, c) {
                                c
                                    ? (i.log(
                                        "debug",
                                        "weblink window id, for " + r[a] + ":" + c
                                    ),
                                        (p[a] = c),
                                        (s[a].retryCount = 0),
                                        (s[a].invalidateTimer = setTimeout(function () {
                                            i.log(
                                                "info",
                                                "making weblink cache invalid for index: " + a
                                            ),
                                                (p[a] = null);
                                        }, 36e5)))
                                    : s[a].retryCount < 20
                                        ? (s[a].retryCount++,
                                            (s[a].timer = setTimeout(function () {
                                                x(a);
                                            }, 500)))
                                        : (s[a].retryCount = 0);
                            }
                        )
                        : i.log("error", "webLinkUzbl pid is not present, fatal error");
            }
            function y(a, b, c, g, h) {
                var v,
                    y,
                    z,
                    A,
                    C,
                    D,
                    E,
                    F,
                    G,
                    H,
                    u = null;
                if ((a || (a = "main"), "main" == a)) {
                    for (y = 0; n > y; y++)
                        if (null === r[y]) {
                            u = y;
                            break;
                        }
                    null === u && (u = n), (v = r.indexOf(b)), v >= k && (v = -1);
                } else {
                    if (!t) return "error";
                    switch (a) {
                        case "side":
                            (u = l), (v = r[l] == b ? l : -1);
                            break;
                        case "bottom":
                            (u = m), (v = r[m] == b ? m : -1);
                            break;
                        default:
                            return "error";
                    }
                }
                return w && v >= 0 && p[v]
                    ? (q[v] ||
                        ((q[v] = !0),
                            e("xdotool windowactivate " + p[v], function () { })),
                        void i.log("debug", "activating window for " + b))
                    : (w &&
                        "main" == a &&
                        (k - 1 > n && n++,
                            i.log("debug", "unable to find  window for " + b + ";index" + u)),
                        o[u] &&
                        (o[u].kill(),
                            (o[u] = null),
                            i.log("debug", "killing weblink  for " + r[u] + ";index" + u),
                            (r[u] = null)),
                        void (t
                            ? ((z = h.videoWindowSize.split("+")),
                                (A = z[0].split("x")),
                                (C = A[0]),
                                (D = A[1]),
                                (E = z[1]),
                                (F = z[2]),
                                h.zoom &&
                                ((C = Math.round(C / h.zoom)),
                                    (D = Math.round(D / h.zoom)),
                                    (E = Math.round(E / h.zoom)),
                                    (F = Math.round(F / h.zoom))),
                                (G = [
                                    "--allow-file-access-from-files",
                                    "--disable-session-crashed-bubble",
                                    "--disable-infobars",
                                    "--disable-notifications",
                                    "--disable-device-discovery-notifications",
                                    "--disable-quic",
                                    "--disable-features=Translate",
                                    "--disable-features=TranslateUI",
                                    "--disable-popup-blocking",
                                    "--noerrdialogs",
                                    "--no-first-run",
                                    "--disable-pinch",
                                    "--overscroll-history-navigation=0",
                                    "--kiosk-printing",
                                    "--ignore-certificate-errors",
                                    "--autoplay-policy=no-user-gesture-required",
                                    "--check-for-update-interval=1",
                                    "--simulate-critical-update",
                                    "--user-data-dir=/home/pi/.config/chromium/weblink" +
                                    (u > 0 ? u : ""),
                                    "--no-startup-window",
                                    "--window-size=" + C + "," + D,
                                    "--window-position=" + E + "," + F,
                                ]),
                                h.urlReloadDisable || G.push("--incognito"),
                                h.kioskMode && G.push("--kiosk"),
                                h.zoom && G.push("--force-device-scale-factor=" + h.zoom),
                                G.push("--app=" + b),
                                (p[u] = null),
                                clearTimeout(s[u].invalidateTimer),
                                (q[u] = !0),
                                (r[u] = b),
                                (o[u] = d("chromium-browser", G)),
                                (h.keystrokes || h.scroll) &&
                                (h.keyDelay && !isNaN(parseInt(h.keyDelay))
                                    ? (h.keyDelay = 1e3 * parseInt(h.keyDelay))
                                    : (h.keyDelay = 1e4),
                                    setTimeout(function () {
                                        var a, b, c, d, e, f, g, l, m;
                                        if (h.keystrokes) {
                                            for (
                                                a = h.keystrokes.split(","),
                                                b = 0,
                                                c = a.length,
                                                d = null,
                                                e = null,
                                                f = 10;
                                                c > b;

                                            ) {
                                                if (
                                                    ((g = a[b].split("+")), 0 == a[b].indexOf("repeat"))
                                                ) {
                                                    (e = a[b - 1]), (f = a[b].split("=")[1] || 10);
                                                    break;
                                                }
                                                c > b + 1 &&
                                                    a[b + 1].endsWith("ms") &&
                                                    ((d = parseInt(a[b + 1])),
                                                        i.log(
                                                            "info",
                                                            "delaying keysend by " + d + " milliseconds"
                                                        ),
                                                        j.setKeyboardDelay(d));
                                                try {
                                                    g.length > 1
                                                        ? j.keyTap(g[g.length - 1], g.slice(0, -1))
                                                        : 1 == g.length && j.keyTap(g[0]);
                                                } catch (k) {
                                                    i.log("error", "invalid key for weblink send" + k);
                                                }
                                                d
                                                    ? ((d = null), j.setKeyboardDelay(10), (b += 2))
                                                    : (b += 1);
                                            }
                                            e &&
                                                ((g = e.split("+")),
                                                    (s[u].repeatKeyTimer = setInterval(function () {
                                                        try {
                                                            g.length > 1
                                                                ? j.keyTap(g[g.length - 1], g.slice(0, -1))
                                                                : 1 == g.length && j.keyTap(g[0]);
                                                        } catch (a) {
                                                            i.log("error", "invalid key for weblink send" + a);
                                                        }
                                                    }, 1e3 * f)));
                                        }
                                        h.scroll &&
                                            ((l = 0),
                                                (m = function () {
                                                    j.keyTap("down"),
                                                        l++,
                                                        100 > l && (s[u].scrollTimer = setTimeout(m, 2e3));
                                                })());
                                    }, h.keyDelay)),
                                o[u].on("error", function (a) {
                                    console.log("error: " + a);
                                }),
                                o[u].once("exit", function () { }),
                                w &&
                                setImmediate(function () {
                                    (s[u].retryCount = 0), x(u);
                                }))
                            : ((r[0] = b),
                                "v0.9.0" == uzblVersion
                                    ? (o[0] = d(
                                        "uzbl",
                                        ["--geometry=" + h.videoWindowSize, b, "-c", "-", "-p"],
                                        { stdio: "pipe" }
                                    ))
                                    : (o[0] = d(
                                        "uzbl",
                                        ["-g", h.videoWindowSize, "--uri", b, "-c", "-", "-p"],
                                        { stdio: "pipe" }
                                    )),
                                (H = uzblIsNew ? "/misc/uzblrc-v2" : "/misc/uzblrc"),
                                o[0].stdin.write(
                                    f.readFileSync(config.root + H) + "\n",
                                    function (a) {
                                        a && i.log("error", "uzbl command callback error: " + a),
                                            B(o[0]);
                                    }
                                ),
                                o[0].once("exit", function () { }))));
            }
            function z(a, b) {
                function d(a) {
                    clearTimeout(s[a].timer),
                        clearTimeout(s[a].scrollTimer),
                        clearTimeout(s[a].repeatKeyTimer),
                        p[a]
                            ? q[a] &&
                            (e("xdotool windowminimize " + p[a], function () { }),
                                (q[a] = !1),
                                i.log("debug", "minimize window for " + r[a] + ";index" + a))
                            : o[a] &&
                            (o[a].kill(),
                                (o[a] = null),
                                i.log("info", "killing weblink for " + r[a] + ";index" + a),
                                (r[a] = null));
                }
                var c;
                if (b) (c = r.indexOf(b)), c >= 0 && d(c);
                else if (a) {
                    if ("side" == a) d(l);
                    else if ("bottom" == a) d(m);
                    else if ("main" == a) for (c = 0; k > c; c++) d(c);
                } else for (c = 0; k + 2 > c; c++) d(c);
            }
            function A() {
                for (var a = 0; k + 2 > a; a++)
                    o[a] && (o[a].kill(), (o[a] = null)),
                        (p[a] = null),
                        clearTimeout(s[a].invalidateTimer),
                        (q[a] = !1),
                        (r[a] = null),
                        clearTimeout(s[a].timer),
                        (s[a].retryCount = 0);
                n = 0;
            }
            function B(a, b) {
                b || (b = function () { });
                var c = [],
                    d = [];
                h.series(
                    [
                        function (a) {
                            f.readFile(
                                "/home/pi/.local/share/uzbl/cookies.txt",
                                "utf8",
                                function (b, d) {
                                    b || !d || (c = c.concat(d.split("\n"))), a();
                                }
                            );
                        },
                        function (a) {
                            f.readFile(
                                "/home/pi/.local/share/uzbl/session-cookies.txt",
                                "utf8",
                                function (b, d) {
                                    b || !d || (c = c.concat(d.split("\n"))), a();
                                }
                            );
                        },
                        function (a) {
                            var b, e, f, g, h, i, j;
                            c.forEach(function (a) {
                                a &&
                                    ((b = a.split("	")),
                                        b[0] &&
                                        b[6] &&
                                        ((e = b[0].replace(/^\#HttpOnly_/i, "")),
                                            (f = b[2]),
                                            (i = b[3].match(/TRUE/i) ? "https" : "http"),
                                            (j = b[4]),
                                            (g = b[5]),
                                            (h = b[6]),
                                            d.push(
                                                "cookie add " +
                                                e +
                                                " " +
                                                f +
                                                " " +
                                                g +
                                                " " +
                                                h +
                                                " " +
                                                i +
                                                " " +
                                                j
                                            )));
                            }),
                                console.log(d),
                                a();
                        },
                    ],
                    function () {
                        if (a && d.length) {
                            var c = d.join("\n") + "\n";
                            a.stdin.write(c, function (a) {
                                a
                                    ? i.log(
                                        "error",
                                        "error in writing session cookie data: '" + a
                                    )
                                    : (i.log("info", "**** browser cookie  added ****"),
                                        i.log("info", c)),
                                    b();
                            });
                        } else b();
                    }
                );
            }
            var d = c("child_process").spawn,
                e = c("child_process").exec,
                f = c("fs"),
                h = (c("path"), c("async")),
                i = c("../others/logger"),
                j = c("robotjs"),
                k = 3,
                l = k,
                m = k + 1,
                n = 0,
                o = [null, null, null, null, null],
                p = [null, null, null, null, null],
                q = [!1, !1, !1, !1, !1],
                r = [null, null, null, null, null],
                s = [
                    { timer: null, retryCount: 0 },
                    { timer: null, retryCount: 0 },
                    { timer: null, retryCount: 0 },
                    { timer: null, retryCount: 0 },
                    { timer: null, retryCount: 0 },
                ],
                t = !0,
                u = !1,
                v = !1,
                w = !1;
            e("which chromium-browser", function (a, b, c) {
                (t = !(a || c)),
                    t && 0 != process.version.slice(1, process.version.indexOf("."))
                        ? e("which xdotool", function (a, b, c) {
                            a || c || !b || b.length <= 3
                                ? i.log(
                                    "warn",
                                    "xdotool is *not* available, weblink is not cached"
                                )
                                : ((u = !0), (w = u && v));
                        })
                        : i.log("error", "old node version, weblink is not cached");
            }),
                (b.getUzblBrowserCookies = B),
                (b.removeWebLinkView = z),
                (b.removeAllWebLinkViews = A),
                (b.showWebLinkView = y),
                (b.setWeblinkCacheEnable = function (a) {
                    a != v && u && A(), (v = a), (w = u && v);
                });
        }),
        c.register("./config/env/all.js", function (a, b, c) {
            "use strict";
            var d = c("path"),
                e = process.cwd(),
                f = d.join(e, "/data"),
                g = d.join(e, "/../media"),
                h = d.join(e, "/misc");
            a.exports = {
                root: e,
                dataDir: f,
                uploadDir: g,
                licensesDirPath: d.join(f, "/licenses/"),
                scriptDir: h,
                scriptDirPath: h + "/",
                systemScript: "/bin/bash " + h + "/system.sh ",
                syncDir: d.join(f, "/sync_folders"),
                syncDirPath: d.join(f, "/sync_folders/"),
                viewDir: d.join(e, "/app/views"),
                workerDir: d.join(e, "/app/workers"),
                mediaDir: g,
                mediaPath: g + "/",
                thumbnailDir: g + "/_thumbnails",
                defaultPlaylist: "default",
                defaultTemplateDir: e + "/templates/",
                defaultTemplate: e + "/templates/t1_template.ejs",
                logFile: e + "/../forever_out.log",
                logStoreDir: g + "/_logs",
                mongo_options: {
                    useNewUrlParser: !0,
                    useCreateIndex: !0,
                    useFindAndModify: !1,
                    useUnifiedTopology: !0,
                    poolSize: 100,
                    keepAlive: !0,
                    keepAliveInitialDelay: 3e4,
                    autoIndex: !1,
                    connectTimeoutMS: 1e4,
                    socketTimeoutMS: 36e4,
                    family: 4,
                },
                session: { secret: "piSignage" },
                pisignageDomain: "pisignage.com",
                appPaths: [
                    "players",
                    "groups",
                    "assets",
                    "playlists",
                    "reports",
                    "subscriptions",
                    "settings",
                    "login",
                    "manage",
                    "signup",
                    "reseller-signup",
                    "kb",
                    "templates",
                    "reseller",
                ],
                filenameRegex: /[&\/\\#,+()$~%'":*?<>{}]/g,
                groupNameRegEx: /[&\/\\#,+()$~%'":*?<>{}\^]/g,
                videoRegex: /(mp4|mov|m4v|avi|webm|wmv|flv|mkv|mpg|mpeg|3gp)$/i,
                audioRegex: /(mp3|m4a|mp4a|aac)$/i,
                imageRegex: /(jpg|jpeg|png|gif|bmp)$/i,
                noticeRegex: /\.html$/,
                zipfileRegex: /(.zip|.gz|.bz2)$/i,
                repofileRegex: /\.repo$/i,
                liveStreamRegex: /\.tv$/i,
                omxStreamRegex: /\.stream$/i,
                pdffileRegex: /\.pdf$/i,
                txtFileRegex: /\.txt$/i,
                linkURL: /\.link$/i,
                CORSLink: /\.weblink$/i,
                localFolderRegex: /\.local$/i,
                mediaRss: /\.mrss$/i,
                radioFileRegex: /\.radio$/i,
                brandRegex: /^(brand_intro|brand_intro_portrait)\./i,
                nestedPlaylist: /^__/i,
                systemAssets: ["_system_notice.html"],
                spacePerLicense: 1024,
                productNames: {
                    pimanaged:
                        "piSignage Player License with 1 Year Subscription at pisignage.com",
                    pirenewal:
                        "Single Player Annual Subscription at pisignage.com server",
                    pilicense: "piSignage Player License Only",
                },
            };
        }),
        c.register("./config/env/pi.js", function (a, b, c) {
            "use strict";
            var d = c("path"),
                e = process.cwd(),
                g = (d.join(e, "/../media"), d.join(e, "/../logs"));
            a.exports = {
                env: "pi",
                https: !1,
                port: process.env.PORT || 8e3,
                configDir: e + "/config/",
                poweronConfig: e + "/config/_config.json",
                settingsFile: e + "/config/_settings.json",
                logsDir: g,
                scriptDir: e + "/misc",
                ifacePath: "/etc/network/interfaces",
                dhcpcdFile: "/etc/dhcpcd.conf",
                wifiPath: "/etc/wpa_supplicant/wpa_supplicant.conf",
                bootConfigPath: "/boot/config.txt",
                pkgJson: e + "/package.json",
            };
        }),
        c.register("./config/config.js", function (a, b, c) {
            "use strict";
            var d = c("lodash");
            a.exports = d.extend(
                c("./env/all.js"),
                c("./env/" + process.env.NODE_ENV + ".js") || {}
            );
        }),
        c.register("./app/others/restware.js", function (a) {
            "use strict";
            var d = function (a, b, c) {
                if (a) {
                    var d = {};
                    return (
                        (d.stat_message = b),
                        (d.data = c),
                        (d.success = !0),
                        a.contentType("json"),
                        a.json(d)
                    );
                }
            },
                e = function (a, b, c) {
                    if (a) {
                        var d = {},
                            e = c ? "" + c : "";
                        return (
                            (d.stat_message = b + e),
                            (d.success = !1),
                            a.contentType("json"),
                            a.json(d)
                        );
                    }
                };
            a.exports = { sendSuccess: d, sendError: e };
        }),
        c.register("./app/others/extract-zip.js", function (a, b, c) {
            function j(a, b, c) {
                var d = function (a) {
                    var c, d, e;
                    if (a && -1 == a.indexOf("index.html")) {
                        for (c = !1, d = 0, e = a.length; e > d; d++)
                            if (a[d].match(/\.html$/i)) {
                                c = !0;
                                break;
                            }
                        c && f.symlink(b + "/" + a[d], b + "/index.html", function () { });
                    }
                };
                g("unzip " + a + " -d " + b).on("exit", function () {
                    f.readdir(b, function (a, e) {
                        a
                            ? (i.log("error", "extract File read dir error, " + a), c())
                            : ((e = e.filter(function (a) {
                                return 0 != a.indexOf("__");
                            })),
                                1 == e.length
                                    ? g("mv " + b + "/" + e[0] + "/* " + b + "/").on(
                                        "exit",
                                        function () {
                                            c(),
                                                f.readdir(b, function (a, b) {
                                                    a || d(b);
                                                });
                                        }
                                    )
                                    : (d(e), c()));
                    });
                });
            }
            var d = c("async"),
                e = c("path"),
                f = c("fs"),
                g = c("child_process").exec,
                h = c("../../config/config"),
                i = c("./logger");
            b.extractStart = function (a, b, c) {
                var k = function (a) {
                    var k,
                        l,
                        m,
                        n = h.mediaPath;
                    b && (n = b + "/"),
                        d.eachSeries(
                            a,
                            function (a, b) {
                                a.match(h.zipfileRegex)
                                    ? ((m = e.basename(a, e.extname(a))),
                                        (k = n + a),
                                        (l = n + "_" + m + ".repo"),
                                        f.exists(l, function (a) {
                                            a
                                                ? g("sudo rm -rf " + l).on("exit", function () {
                                                    j(k, l, b);
                                                })
                                                : j(k, l, b);
                                        }))
                                    : b();
                            },
                            function (a) {
                                a && i.log("error", "Error in extracting files : " + a),
                                    c && c();
                            }
                        );
                };
                a
                    ? k(a)
                    : f.readdir(h.mediaDir, function (a, b) {
                        k(b);
                    });
            };
        }),
        c.register("./app/others/license-utils.js", function (a, b, c) {
            var k,
                l,
                m,
                d = c("child_process").exec,
                e = c("crypto"),
                f = "aes-192-cbc",
                g = c("fs"),
                h = c("./package.json"),
                i = "pisignageLangford",
                j = c("./logger"),
                n = {},
                o = !1,
                p = 1,
                q = "wget -T 120 -t 2 --no-check-certificate ";
            b.checkForLicense = function (a, b, c, r) {
                var s, t;
                return (
                    (p = 1),
                    a && b
                        ? (r && 0 === r.indexOf(a + ".") && (r = r.slice(a.length + 1)),
                            (k = e.createHmac("sha1", i).update(b).digest("hex")),
                            (s = function (c) {
                                d(
                                    q +
                                    h.config_server +
                                    "/licenses/" +
                                    a +
                                    "/license_" +
                                    b +
                                    ".txt  -O ../license_" +
                                    b +
                                    ".txt",
                                    function (a, e, f) {
                                        j.log("error", "license file wget result: " + f),
                                            a
                                                ? d(
                                                    q +
                                                    h.config_server +
                                                    "/licenses/" +
                                                    r +
                                                    "/license_" +
                                                    b +
                                                    ".txt  -O ../license_" +
                                                    b +
                                                    ".txt",
                                                    function (a, b, d) {
                                                        j.log("warn", "license file wget result: " + d),
                                                            c();
                                                    }
                                                )
                                                : c();
                                    }
                                );
                            }),
                            (t = function () {
                                g.readFile(
                                    "/home/pi/license_" + b + ".txt",
                                    "utf8",
                                    function (d, g) {
                                        if (d)
                                            j.log("warn", "license file not found: " + d),
                                                p
                                                    ? s(function () {
                                                        p--, t();
                                                    })
                                                    : c(!1);
                                        else
                                            try {
                                                (l = e.createDecipher(f, k)),
                                                    (m = l.update(g, "hex", "utf8")),
                                                    (m += l["final"]("utf8")),
                                                    (n = JSON.parse(m)),
                                                    n.installation &&
                                                    a &&
                                                    a != n.installation &&
                                                    ((n.enabled = !1),
                                                        j.log(
                                                            "warn",
                                                            "installation not matching, " +
                                                            a +
                                                            "&" +
                                                            n.installation
                                                        )),
                                                    n.domain &&
                                                    r &&
                                                    r != n.domain &&
                                                    ((n.enabled = !1),
                                                        j.log("warn", "domain not matching, " + r)),
                                                    n.validity &&
                                                    n.validity < Date.now() &&
                                                    ((n.enabled = !1),
                                                        j.log(
                                                            "warn",
                                                            "license has expired  " +
                                                            new Date(n.validity).toDateString()
                                                        )),
                                                    n.enabled
                                                        ? (n.installation && n.domain && (o = !0),
                                                            c(n.enabled, o))
                                                        : p
                                                            ? s(function () {
                                                                p--, t();
                                                            })
                                                            : c(!1);
                                            } catch (h) {
                                                j.log("error", "JSON Parse error license : " + b),
                                                    p
                                                        ? s(function () {
                                                            p--, t();
                                                        })
                                                        : c(!1);
                                            }
                                    }
                                );
                            }),
                            void t())
                        : c(!1)
                );
            };
        }),
        c.register("./app/others/rss-service.js", function (a, b, c) {
            var d = c("feedparser"),
                e = c("axios"),
                f = c("./logger");
            b.getFeeds = function (a, b, c, g) {
                function m() {
                    var d,
                        e,
                        f,
                        l,
                        a = [],
                        b = g * h.length;
                    if (
                        !j &&
                        (j = i.every(function (a) {
                            return a.completed || a.error;
                        }))
                    ) {
                        (d = i
                            .map(function (a) {
                                return a.completed ? a.items : [];
                            })
                            .filter(function (a) {
                                return a.length > 0;
                            })),
                            (e = 0);
                        do
                            for (e = 0, f = 0; f < d.length; f++)
                                (l = d[f]),
                                    l.length && ((a = a.concat(l.splice(0, k))), (e += l.length));
                        while (a.length < b && e > 0);
                        c(null, a.slice(0, b));
                    }
                }
                var h = [],
                    i = [],
                    j = !1,
                    k = 5,
                    l = 4;
                return (
                    (g = g || 100),
                    (a = a.trim()),
                    a.match(/;$/) && (a = a.slice(0, -1)),
                    a
                        ? ((h = a.split(";")),
                            (h = h.map(function (a) {
                                return (
                                    (a = a.trim()),
                                    -1 === a.indexOf("://") && (a = "http://" + a),
                                    a
                                );
                            })),
                            void h.forEach(function (a, c) {
                                (i[c] = {
                                    req: e({ method: "get", url: a, responseType: "stream" }),
                                    feedparser: new d({ feedUrl: a }),
                                    items: [],
                                    completed: !1,
                                    error: !1,
                                }),
                                    (b = b || !1),
                                    i[c].req
                                        .then(function (d) {
                                            var e = d.data;
                                            e.setEncoding(b ? "binary" : "utf8"),
                                                200 !== d.status
                                                    ? e.emit(
                                                        "error",
                                                        Error(
                                                            "Bad status code " +
                                                            d.status +
                                                            ", can't fetch feeds from URL " +
                                                            a
                                                        )
                                                    )
                                                    : e.pipe(i[c].feedparser);
                                        })
                                    ["catch"](function () {
                                        f.log(
                                            "error",
                                            "**** request error, please check RSS feed URL " + a
                                        ),
                                            (i[c].error = !0),
                                            m();
                                    })
                                        .then(function () { }),
                                    i[c].feedparser.on("readable", function () {
                                        var a = this,
                                            b = this.meta,
                                            d = "",
                                            e = a.read();
                                        for (
                                            b.title &&
                                            h.length > 1 &&
                                            (d = b.title
                                                .replace(/\s/g, "")
                                                .substr(0, l)
                                                .concat(": "));
                                            e &&
                                            (e.title &&
                                                (e.title = d.concat(e.title.replace(/'/g, "`"))),
                                                e.description &&
                                                (e.description = d.concat(
                                                    e.description.replace(/'/g, "`")
                                                )),
                                                i[c].items.length < g);

                                        )
                                            i[c].items.push(e), (e = a.read());
                                    }),
                                    i[c].feedparser.on("end", function () {
                                        (i[c].completed = !0), m();
                                    });
                            }))
                        : c("link is empty")
                );
            };
        }),
        c.register("./app/others/logger.js", function (a, b, c) {
            function r() {
                var a = 0,
                    b = 0,
                    c = "",
                    d = "";
                Object.keys(k).forEach(function (e) {
                    var f = k[e];
                    (f.connection > 20 || f.disconnect > 20) &&
                        q(
                            process.pid +
                            ": socket.io events too high from ip: " +
                            e +
                            ";" +
                            f.connection +
                            ";" +
                            f.disconnect
                        ),
                        (a += f.connection || 0),
                        (b += f.disconnect || 0),
                        f.connection && (c += e + ":" + f.connection + ";"),
                        f.disconnect && (d += e + ":" + f.disconnect + ";");
                }),
                    (a > 20 || b > 20) &&
                    q(
                        process.pid +
                        ": total connection/disconnect in last 1 minute: " +
                        a +
                        ";" +
                        b
                    ),
                    c &&
                    q(process.pid + ": IPs for the connection in last 1 minute: " + c),
                    d &&
                    q(process.pid + ": IPs for the disconnect in last 1 minute: " + d),
                    n > 0 &&
                    q(process.pid + ": total droppedPackets in last 1 minute: " + n),
                    (k = {}),
                    Object.keys(l).forEach(function (a) {
                        q(process.pid + ": total " + a + ": " + l[a]);
                    }),
                    (l = {}),
                    (n = 0),
                    setTimeout(r, 6e4);
            }
            var k,
                l,
                m,
                n,
                o,
                p,
                q,
                d = b,
                e = c("fs"),
                f = [],
                g = 1e3,
                h = !1,
                i = !0,
                j = c("../../config/config");
            (d.debugLevel = "info"),
                (d.log = function (a, b) {
                    var c = ["error", "warn", "info", "debug"];
                    c.indexOf(a) <= c.indexOf(d.debugLevel) &&
                        ("string" != typeof b && (b = JSON.stringify(b, null, 4)),
                            console.log(
                                new Date().toLocaleString() + " - " + j.port + ": " + a + ": " + b
                            ));
                }),
                (d.testLog = function (a, b, c, d) {
                    i &&
                        (h && ((h = !1), (f = [])),
                            f.push([a, b, c, d]),
                            f.length > g && f.splice(0, 1));
                }),
                (d.getTestLog = function () {
                    return (h = !0), f;
                }),
                (k = {}),
                (l = {}),
                (m = { connection: 20 }),
                (n = 0),
                "pi" != j.env &&
                ((o = "/var/log/pisignage-stats.txt"),
                    (p = e.createWriteStream(o, { flags: "a" })),
                    (q = function (a) {
                        "object" == typeof a && (a = JSON.stringify(a)),
                            p.write(new Date().toLocaleString() + " - " + a + "\n");
                    })(
                        process.pid +
                        ": opening stats file, " +
                        o +
                        " for logging per-minute ststs/debug messages"
                    )),
                (d.logAndThrottle = function (a, b, c) {
                    if (
                        ((k[a] = k[a] || { disconnect: 0, connection: 0 }),
                            (k[a][b] = k[a][b] || 0),
                            k[a][b]++,
                            c)
                    ) {
                        c = c.slice(0, 25);
                        var d = b + c;
                        (l[d] = l[d] || 0), l[d]++;
                    }
                    return !1;
                }),
                "pi" != j.env && r();
        }),
        c.register("./app/others/system-info.js", function (a, b, c) {
            function p(a) {
                if (!a) return void i.log("error", "Script file name missing");
                var b = "/home/pi/" + a;
                g.stat(b, function (a, c) {
                    !a &&
                        c &&
                        (!c || c.isFile()) &&
                        e("python " + b, function (a, b, c) {
                            (a || c) &&
                                i.log("error", "Script error: " + a + " stderr: " + c),
                                i.log("info", "Script output: " + b);
                        });
                });
            }
            var m,
                n,
                o,
                d = c("os"),
                e = c("child_process").exec,
                f = c("async"),
                g = c("fs"),
                h = c("../../config/config"),
                i = c("./logger"),
                j = !1,
                k = null,
                l = function (a) {
                    e(
                        "echo scan | cec-client -s -d 1",
                        { timeout: 4e4 },
                        function (b, c, d) {
                            a && i.log("info", "ces support: " + c + ";" + d + ";" + b),
                                b || d || (c && (c.match(/device\ \#/g) || []).length <= 1)
                                    ? ((j || a) && i.log("info", "cec is NOT supported"),
                                        (j = !1))
                                    : ((!j || a) && i.log("info", "cec IS supported"), (j = !0));
                        }
                    );
                };
            l(!0),
                (b.reboot = function (a) {
                    e("sync;sudo reboot -p", function (b, c, d) {
                        null !== b && i.log("error", "Reboot error: " + b), a && a(b, c, d);
                    });
                }),
                (b.poweroff = function () {
                    e("sudo poweroff");
                }),
                (b.shutdown = function () {
                    e("sudo shutdown -h now");
                }),
                (b.getIp = function (a) {
                    var e,
                        c = [],
                        b = d.networkInterfaces();
                    a || console.log(b);
                    for (e in b)
                        b[e].forEach(function (a) {
                            a &&
                                !a.internal &&
                                "IPv4" == a.family &&
                                c.push({ type: e, ip: a.address });
                        });
                    return c;
                }),
                (b.wlanReboot = function (a) {
                    var b = "sudo ifup wlan0",
                        c = "sudo ifdown --force wlan0";
                    f.series(
                        [
                            function (a) {
                                e(
                                    'grep -q "^iface eth0 inet" /etc/network/interfaces',
                                    function (d) {
                                        d &&
                                            ((b = "sudo ifconfig wlan0 up"),
                                                (c = "sudo ifconfig wlan0 down")),
                                            a();
                                    }
                                );
                            },
                            function (a) {
                                e("ifconfig wlan0", function (b, c) {
                                    b || !c
                                        ? a("no wlan")
                                        : c.indexOf("inet addr:") >= 0
                                            ? a("no need")
                                            : a();
                                });
                            },
                            function (a) {
                                e(c, function () {
                                    a();
                                });
                            },
                            function (a) {
                                setTimeout(function () {
                                    a();
                                }, 15e3);
                            },
                            function (a) {
                                e(b, function () {
                                    i.log("warn", "Restarting wlan interface"), a();
                                });
                            },
                            function (a) {
                                setTimeout(function () {
                                    a();
                                }, 3e4);
                            },
                        ],
                        function () {
                            a();
                        }
                    );
                }),
                (m = !1),
                (b.tvOff = function () {
                    return m
                        ? (clearTimeout(n), void (n = setTimeout(b.tvOff, 5e3)))
                        : ((m = !0),
                            void b.getDisplayProperties(function () {
                                i.log("info", " **** turning tv off *****"),
                                    e(
                                        'echo "standby 0" | cec-client -s -d 1',
                                        { timeout: 2e4 },
                                        function (a) {
                                            a && i.log("error", "CEC TV off : " + a);
                                        }
                                    ),
                                    setTimeout(function () {
                                        i.log("info", " **** tvservice off *****"),
                                            e("tvservice --off", function (a) {
                                                a && console.log(a);
                                            }),
                                            (m = !1);
                                    }, 3e4),
                                    p("TVoff.py");
                            }));
                }),
                (b.tvOn = function (a) {
                    return m
                        ? (clearTimeout(n),
                            void (n = setTimeout(function () {
                                b.tvOn(a);
                            }, 5e3)))
                        : ((m = !0),
                            void b.getDisplayProperties(function () {
                                i.log("info", " **** turning tv on *****"),
                                    e(
                                        "tvservice --preferred; sudo chvt 6; sudo chvt 7",
                                        function (b) {
                                            b && console.log(b),
                                                setTimeout(function () {
                                                    i.log("info", " **** cec-client on *****"),
                                                        e(
                                                            'echo "on 0" | cec-client -s -d 1',
                                                            { timeout: 2e4 },
                                                            function () {
                                                                e('echo "as" | cec-client -s -d 1', {
                                                                    timeout: 2e4,
                                                                });
                                                            }
                                                        ),
                                                        setTimeout(function () {
                                                            a && a(), (m = !1);
                                                        }, 1e4),
                                                        p("TVon.py"),
                                                        setTimeout(function () {
                                                            j || l();
                                                        }, 1e4);
                                                }, 3e4);
                                        }
                                    );
                            }));
                }),
                (b.getDisplayProperties = function (a) {
                    if (k) return a(null, k);
                    var b = e("tvservice -s"),
                        c = !1;
                    b.stdout.on("data", function (b) {
                        return (k = b), (c = !0), a(null, b);
                    }),
                        b.stderr.on("data", function (b) {
                            return console.log(b), (c = !0), a(b, null);
                        }),
                        b.on("close", function () {
                            return c ? void 0 : a("No stdout or stderr", k);
                        });
                }),
                (b.getCecStatus = function (a, c, d, f) {
                    var h,
                        k,
                        l,
                        g = function (a) {
                            e(
                                "/opt/vc/bin/vcgencmd measure_temp",
                                { timeout: 2e4 },
                                function (b, c) {
                                    d(a, c.slice(5));
                                }
                            );
                        };
                    return (
                        (f = f || !1),
                        j
                            ? ((h = e('echo "pow 0" | cec-client -s -d 1', { timeout: 2e4 })),
                                h.stdout.on("data", function (a) {
                                    k = a;
                                }),
                                h.stderr.on("data", function (a) {
                                    l = a;
                                }),
                                void h.on("close", function (h) {
                                    var j, m;
                                    return h || l || !k
                                        ? (i.log("error", "getCecStatus error: " + k + ";" + l),
                                            void g(!1))
                                        : ((j =
                                            -1 == k.indexOf("unknown") &&
                                            -1 == k.indexOf("standby")),
                                            void (c == j || f || !a || k.indexOf("unknown") >= 0
                                                ? (c !== j &&
                                                    -1 == k.indexOf("unknown") &&
                                                    i.log(
                                                        "warn",
                                                        "CEC status different than desired state, " +
                                                        c +
                                                        ";" +
                                                        j +
                                                        ";" +
                                                        k +
                                                        ";" +
                                                        l
                                                    ),
                                                    g(j))
                                                : (i.log(
                                                    "warn",
                                                    "Sending CEC command to TV for correcting the TV state, " +
                                                    c +
                                                    ";" +
                                                    j +
                                                    ";" +
                                                    k +
                                                    ";" +
                                                    l
                                                ),
                                                    c
                                                        ? ((m = 'echo "on 0" | cec-client -s -d 1'),
                                                            p("TVon.py"))
                                                        : ((m = 'echo "standby 0" | cec-client -s -d 1'),
                                                            p("TVoff.py")),
                                                    e(m, { timeout: 2e4 }, function () {
                                                        setTimeout(function () {
                                                            b.getCecStatus(a, c, d, !0);
                                                        }, 3e3);
                                                    }))));
                                }))
                            : g(!0)
                    );
                }),
                (b.changeDisplaySetting = function (a, b, c) {
                    e(h.systemScript + "--resolution " + b + " " + a, function (a, b, d) {
                        a || d
                            ? i.log("error", "Error in Orientation Change , " + a + "  " + d)
                            : i.log("info", b),
                            c && c();
                    });
                }),
                (b.getResolution = function (a) {
                    e("tvservice -s", function (b, c, d) {
                        var f,
                            e = [1920, 1080];
                        if (b || d || !c)
                            i.log(
                                "error",
                                "Unable to get resolution, using default " + b + "  " + d
                            );
                        else
                            try {
                                (f = c.split(",")[1].trim()),
                                    (e = f.split(" ")[0].split("x")),
                                    (e[0] = parseInt(e[0] || 1920)),
                                    (e[1] = parseInt(e[1] || 1080)),
                                    i.log("info", "Screen resolution from tvservice -s: " + e);
                            } catch (g) {
                                i.log(
                                    "error",
                                    "Could not get screen resolution from tvservice -s, using default: " +
                                    e
                                );
                            }
                        a && a(b || d, e);
                    });
                }),
                (o = "/home/pi/hostname.link"),
                (b.changeHostname = function (a) {
                    (a = a || function () { }),
                        g.readlink(o, function (b, c) {
                            return b || !c || d.hostname() == c
                                ? a()
                                : (e(
                                    h.systemScript + '--change-hostname="' + c + '"',
                                    function (b, d, e) {
                                        b || e
                                            ? i.log(
                                                "error",
                                                "Error in changing hostname, " + b + "  " + e
                                            )
                                            : i.log("info", "Changed hostname to " + c),
                                            a();
                                    }
                                ),
                                    void g.unlink(o, function (a) {
                                        a &&
                                            i.log(
                                                "warn",
                                                "Error deleting sym link of hostname use, " + a
                                            );
                                    }));
                        });
                }),
                (b.registerHostnameChange = function (a, b) {
                    return (
                        (b = b || function () { }),
                        a
                            ? ((a = a.replace(/\s+/g, "-")),
                                (a = a.replace(/[^-0-9A-Za-z]/g, "")),
                                (a = a.replace(/^-/, "")),
                                void g.unlink(o, function () {
                                    g.symlink(a, o, function (a) {
                                        a &&
                                            i.log(
                                                "error",
                                                "Error creating sym link for hostname use, " + a
                                            ),
                                            b();
                                    });
                                }))
                            : b()
                    );
                }),
                (b.factoryReset = function (a) {
                    var c = e(h.systemScript + "--factory-reset");
                    c.stdout.on("data", function (a) {
                        i.log("info", a);
                    }),
                        c.stderr.on("data", function (a) {
                            i.log("error", "Error in Factory Reset " + a);
                        }),
                        c.stdout.on("data", function () {
                            i.log("info", "Rebooting the player after factory reset");
                        }),
                        c.on("exit", function (c) {
                            a && a(c), c || setTimeout(b.reboot, 1e3);
                        });
                }),
                (b.updateDnsEntry = function (a, b) {
                    e(
                        h.systemScript + "--change-dns " + a.primary + " " + a.secondary,
                        function (a, c, d) {
                            (a || d) &&
                                i.log(
                                    "error",
                                    "Error in changing DNS entry : " + a + " Stderr : " + d
                                ),
                                b && b();
                        }
                    );
                }),
                (b.changeSshPassword = function (a) {
                    e(
                        h.systemScript + '--change-ssh-password "' + a + '"',
                        function (a, b, c) {
                            a || c
                                ? i.log(
                                    "info",
                                    "Change SSH password - err: " + a + ",stderr: " + c
                                )
                                : i.log("info", "Ssh password is changed");
                        }
                    );
                });
        }),
        c.register("./app/others/file-util.js", function (a, b, c) {
            var d = c("fs"),
                e = c("sanitize-html"),
                f = c("./logger"),
                g = c("path"),
                h =
                    '\n<script src="../piSignagePro/templates/screen.min.js"></script>\n';
            b.modifyHTML = function (a, b) {
                var c, i, j, k;
                b &&
                    ((k = g.join(a, b)),
                        d.readFile(k, "utf8", function (a, b) {
                            return a
                                ? f.log("error", "custom_layout File Read Error", a)
                                : ((j = e(b, {
                                    allowedTags: [
                                        "!DOCTYPE",
                                        "html",
                                        "head",
                                        "meta",
                                        "title",
                                        "body",
                                        "h1",
                                        "h2",
                                        "h3",
                                        "h4",
                                        "h5",
                                        "h6",
                                        "blockquote",
                                        "p",
                                        "a",
                                        "ul",
                                        "ol",
                                        "nl",
                                        "li",
                                        "b",
                                        "i",
                                        "strong",
                                        "em",
                                        "strike",
                                        "code",
                                        "hr",
                                        "br",
                                        "div",
                                        "table",
                                        "thead",
                                        "caption",
                                        "tbody",
                                        "tr",
                                        "th",
                                        "td",
                                        "pre",
                                        "marquee",
                                        "style",
                                        "iframe",
                                        "link",
                                        "script",
                                        "img",
                                    ],
                                    allowedAttributes: !1,
                                })),
                                    (j = b),
                                    (c = j.lastIndexOf("</body>")),
                                    (i = j.slice(0, c) + h + j.slice(c)),
                                    void d.writeFile(k, i, function () { }));
                        }));
            };
        }),
        (b.exports = c("./pi-server.js"));
})(require, module);

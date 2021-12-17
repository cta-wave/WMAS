(function() {

    function setKeyset(mask) {
        try {
            var app = document.getElementById('appmgr').getOwnerApplication(document);
            app.privateData.keyset.setValue(mask);
        } catch (e) { }
    }

    function initApp() {
        try {
            var app = document.getElementById('appmgr').getOwnerApplication(document);
            app.show();
        } catch (e) { }
        setKeyset(0x1 + 0x2 + 0x4 + 0x8 + 0x10);
    }

    function activate() {
        // active only on hbbtv terminals
        if (navigator.userAgent.toLowerCase().indexOf('hbbtv') === -1) {
            return;
        }
        // create hbbtv objects and add to body
        var appmgroipfcfg = '<object id="appmgr" type="application/oipfApplicationManager" style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;">';

        var elem = document.createElement("div");
        elem.innerHTML = appmgroipfcfg;
        document.body.appendChild(elem);

        setTimeout(initApp, 1000);
    }

    setTimeout(activate, 1000);
})();
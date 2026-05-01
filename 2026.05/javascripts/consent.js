function isMatomoDebugEnabled() {
  var params = new URLSearchParams(window.location.search);
  var param = params.get("matomoDebug");

  if (param === "1") {
    localStorage.setItem("matomoDebug", "1");
    return true;
  }
  if (param === "0") {
    localStorage.removeItem("matomoDebug");
    return false;
  }

  return localStorage.getItem("matomoDebug") === "1";
}

function debugLog(message, data) {
  if (!isMatomoDebugEnabled()) return;
  if (typeof data === "undefined") {
    console.log("[matomo] " + message);
    return;
  }
  console.log("[matomo] " + message, data);
}

document$.subscribe(function() {
  var consent = __md_get("__consent");
  debugLog("consent state", consent || null);

  if (consent && consent.matomo) {
    var _paq = (window._paq = window._paq || []);
    var u = "https://matomo.sib.swiss/";
    var currentUrl = location.pathname + location.search + location.hash;

    // Configure tracker first, then record the page view for this navigation.
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "220"]);
    _paq.push(["setCustomUrl", currentUrl]);
    _paq.push(["setDocumentTitle", document.title]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    debugLog("queued page view", { title: document.title, url: currentUrl });

    if (!document.querySelector("script[data-matomo-loader]")) {
      var d = document;
      var g = d.createElement("script");
      var s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matomo.js";
      g.setAttribute("data-matomo-loader", "true");
      s.parentNode.insertBefore(g, s);
      debugLog("matomo loader injected", g.src);
    } else {
      debugLog("matomo loader already present");
    }
  } else {
    debugLog("matomo consent not granted; skipping tracking");
  }
});

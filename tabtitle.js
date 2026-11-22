/* =====================================================================
   TAB TITLE — changes the browser-tab text while someone is on another tab.
   The text itself is edited in content.js (look for "tabTitles").
   This file only runs the blinking; you should not need to touch it.
   ===================================================================== */
(function () {
  var T = (window.CONTENT && window.CONTENT.tabTitles) || {};
  var away = (T.away || []).filter(function (s) { return s && String(s).trim(); });
  if (!away.length) return;

  var home = document.title;                 // each page keeps its own normal title
  var every = Math.max(500, T.intervalMs || 1500);
  var backFor = Math.max(500, T.backMs || 2000);
  var blink = null, backTimer = null, i = 0;

  function stop() { clearInterval(blink); blink = null; clearTimeout(backTimer); }

  document.addEventListener("visibilitychange", function () {
    stop();
    if (document.hidden) {
      i = 0;
      document.title = away[0];
      if (away.length > 1) {
        blink = setInterval(function () { i = (i + 1) % away.length; document.title = away[i]; }, every);
      }
    } else if (T.back && String(T.back).trim()) {
      document.title = T.back;
      backTimer = setTimeout(function () { document.title = home; }, backFor);
    } else {
      document.title = home;
    }
  });
})();

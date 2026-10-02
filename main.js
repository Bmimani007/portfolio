/* Site engine — you should not need to edit this file. Edit content.js instead. */
(function () {
  "use strict";
  var C = window.CONTENT || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var isPh = function (v) { return typeof v === "string" && /^\s*\[.*\]\s*$/.test(v); };
  // text or dashed placeholder
  var txt = function (v) { if (v == null || v === "") return ""; return isPh(v) ? '<span class="ph">' + esc(v.replace(/^\s*\[|\]\s*$/g, "")) + "</span>" : esc(v); };
  var set = function (id, v) { var n = document.getElementById(id); if (n) n.innerHTML = txt(v); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- PROFILE / HERO ---------- */
  var P = C.profile || {};
  if (P.firstName) $("#firstName").textContent = P.firstName.toUpperCase();
  if (P.lastName) $("#lastName").textContent = P.lastName.toUpperCase();
  set("tagline", P.tagline);
  document.querySelectorAll("[data-cv]").forEach(function (a) { if (P.cv) a.href = P.cv; });
  var wa = "https://wa.me/" + (P.whatsapp || "") + "?text=" + encodeURIComponent(P.whatsappMessage || "Hi Bharat!");
  var social = [["Email", "mailto:" + P.email], ["LinkedIn", P.linkedin], ["WhatsApp", wa]];
  var hs = $("#heroSocial");
  social.forEach(function (s) { var li = el("li"); li.innerHTML = '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + " ↗</a>"; hs.appendChild(li); });

  var mq = $("#marquee"), tools = (C.tools || []);
  var run = tools.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
  mq.innerHTML = run + run + run + run; // repeated so the loop is seamless

  /* ---------- MBA ---------- */
  var M = C.mba || {};
  set("mbaSummary", M.summary);
  var facts = [["Institute", M.institute], ["Programme", M.programme], ["Specialisation", M.specialisation], ["CGPA", M.cgpa], ["Batch", M.batch]].filter(function (f) { return f[1]; });
  $("#mbaFacts").innerHTML = facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + txt(f[1]) + "</dd></div>"; }).join("");

  /* ---------- DECK helpers ---------- */
  var slidesOf = function (folder, count, ext) { var a = []; for (var i = 1; i <= count; i++) a.push(folder + "/" + i + "." + (ext || "webp")); return a; };

  /* ---------- INTERNSHIP ---------- */
  var I = C.internship || {};
  set("internCompany", I.company); set("internRole", I.role); set("internDuration", I.duration);
  set("internProject", I.project); set("internSummary", I.summary);
  $("#internHighlights").innerHTML = (I.highlights || []).map(function (h) { return "<li>" + txt(h) + "</li>"; }).join("");
  if (I.deck && I.deck.pdf) {
    $("#internCover").src = I.deck.cover || "assets/decks/tata-steel/1.webp";
    $("#internCount").textContent = "Brief + deck";
    $("#internDeck").addEventListener("click", function () {
      openProject({ id: "internship", title: I.project, org: [I.company, I.role].filter(function (x) { return x && !isPh(x); }).join(" · "), result: "", brief: I.brief, pdf: I.deck.pdf });
    });
  } else { $("#internDeck").hidden = true; }
  if (I.dashboard) $("#internDash").href = I.dashboard; else $(".dash-row").hidden = true;

  /* ---------- WORK ---------- */
  var W = C.workex || {};
  set("workCompany", W.company); set("workIndustry", W.industry); set("workDuration", W.duration);
  set("workRole", W.role); set("workSummary", W.summary);
  $("#workHighlights").innerHTML = (W.highlights || []).map(function (h) { return "<li>" + txt(h) + "</li>"; }).join("");
  if (W.gallery && W.gallery.length) {
    var g = $("#workGallery"); g.hidden = false;
    W.gallery.forEach(function (src, i) {
      var b = el("button", "gal-item"); b.type = "button"; b.setAttribute("aria-label", "Open work sample " + (i + 1));
      b.innerHTML = '<img src="' + esc(src) + '" alt="Work sample ' + (i + 1) + '" loading="lazy">';
      b.addEventListener("click", function () { openViewer("Work samples", W.gallery, i); });
      g.appendChild(b);
    });
  }

  /* ---------- PROJECTS (cards open the brief + PDF popup) ---------- */
  var cg = $("#caseGrid"), PROJECTS = C.projects || C.caseComps || [];
  PROJECTS.forEach(function (c, i) {
    var b = el("button", "deck-card case pre-able"); b.type = "button";
    var cover = c.cover || (c.folder ? c.folder + "/cover." + (c.ext || "webp") : "");
    b.innerHTML =
      '<span class="deck-img"><img src="' + esc(cover) + '" alt="Cover: ' + esc(c.title) + '" loading="lazy"></span>' +
      '<span class="case-info">' +
        '<span class="case-title">' + txt(c.title) + "</span>" +
        '<span class="case-org">' + txt(c.org) + "</span>" +
        '<span class="case-foot">' + (c.result ? '<span class="result">' + esc(c.result) + "</span>" : "") +
          "<span>View project</span><span class=\"arrow\" aria-hidden=\"true\">↗</span></span>" +
      "</span>";
    b.addEventListener("click", function () { openProject(c); });
    cg.appendChild(b);
  });

  /* ---------- CLUBS ---------- */
  var stack = $("#clubStack"), labels = $("#clubLabels");
  var clubName = function (c) {
    var n = String(c.club || "");
    if (/^tedx/i.test(n)) return '<p class="club-name tedx"><span class="ted">TED</span><sup>x</sup><wbr><span class="rest">' + esc(n.slice(4)) + "</span></p>";
    return '<p class="club-name" style="color:' + esc(c.accent || "#F1EBE1") + '">' + esc(n) + "</p>";
  };
  (C.clubs || []).forEach(function (c) {
    var h = el("div", "hoodie"); h.innerHTML = '<img src="' + esc(c.image) + '" alt="' + esc(c.club) + ' hoodie design" loading="lazy">'; stack.appendChild(h);
    var l = el("div", "club-label pre-able");
    l.innerHTML = clubName(c) + '<p class="club-role">' + txt(c.role) + "</p>" + (c.note ? '<p class="club-note">' + txt(c.note) + "</p>" : "");
    labels.appendChild(l);
  });

  /* ---------- CERTS ---------- */
  var ce = $("#certGrid"), certs = C.certifications || [];
  certs.forEach(function (c, i) {
    var b = el("button", "cert pre-able"); b.type = "button";
    b.innerHTML = '<span class="cert-img"><img src="' + esc(c.image) + '" alt="Certificate: ' + esc(c.title) + '" loading="lazy"></span>' +
      '<span class="cert-info"><span class="cert-title">' + txt(c.title) + "</span>" +
      '<span class="cert-meta"><span>' + esc(c.issuer) + (c.date ? " · " + esc(c.date) : "") + "</span>" + "</span></span>";
    b.addEventListener("click", function () { openViewer("Certifications", certs.map(function (x) { return x.image; }), i, certs.map(function (x) { return x.verify; })); });
    ce.appendChild(b);
  });

  /* ---------- LINKEDIN ---------- */
  var track = $("#liTrack");
  var toEmbed = function (raw) {
    raw = String(raw || "").trim(); if (!raw) return null;
    var h = (raw.match(/height="(\d+)"/) || [])[1];
    var src = (raw.match(/src="([^"]+)"/) || [])[1];
    if (!src) {
      var urn = raw.match(/urn:li:(share|ugcPost|activity):(\d+)/);
      var act = raw.match(/activity[-:](\d{15,})/);
      if (urn) src = "https://www.linkedin.com/embed/feed/update/urn:li:" + urn[1] + ":" + urn[2];
      else if (act) src = "https://www.linkedin.com/embed/feed/update/urn:li:activity:" + act[1];
      else if (/^https:\/\/www\.linkedin\.com\/embed\//.test(raw)) src = raw;
    }
    if (!src || !/^https:\/\/www\.linkedin\.com\//.test(src)) return null;
    return { src: src, h: Math.min(Math.max(parseInt(h || "620", 10), 380), 900) };
  };
  (C.linkedinPosts || []).forEach(function (p, i) {
    var e = toEmbed(p); if (!e) return;
    var card = el("div", "li-card");
    var postUrl = e.src.replace("/embed/feed/update/", "/feed/update/").replace(/\?.*$/, "");
    card.innerHTML = '<div class="li-scale"><iframe src="' + esc(e.src) + '" height="' + e.h + '" title="LinkedIn post ' + (i + 1) + '" loading="lazy" allowfullscreen></iframe></div>' +
      '<a class="li-open" href="' + esc(postUrl) + '" target="_blank" rel="noopener">Read full post ↗</a>';
    track.appendChild(card);
  });
  // shrink each 504px-wide LinkedIn embed to fit the smaller card
  var fitPosts = function () {
    track.querySelectorAll(".li-card").forEach(function (c) { c.style.setProperty("--s", (c.clientWidth / 504).toFixed(4)); });
  };
  fitPosts(); window.addEventListener("resize", fitPosts);
  var follow = el("div", "li-follow");
  follow.innerHTML = '<span class="li-in" aria-hidden="true">in</span><h3>Follow my <em>journey</em></h3>' +
    "<p>Case wins, internship learnings and what I'm building next — posted on LinkedIn.</p>" +
    '<a class="btn btn-red" href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">Follow on LinkedIn ↗</a>';
  track.appendChild(follow);
  var liPrev = $("#liPrev"), liNext = $("#liNext");
  var step = function () { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 24 : 400; };
  liPrev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }); });
  liNext.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }); });
  var liState = function () {
    var max = track.scrollWidth - track.clientWidth - 2;
    liPrev.disabled = track.scrollLeft <= 2; liNext.disabled = track.scrollLeft >= max;
    $(".slider-btns").hidden = max <= 2;
  };
  track.addEventListener("scroll", liState, { passive: true }); window.addEventListener("resize", liState); liState();

  /* ---------- CONTACT ---------- */
  var cards = [
    { k: "Email", v: P.email, href: "mailto:" + P.email, label: "Send email", copy: P.email },
    { k: "LinkedIn", v: (P.linkedin || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: P.linkedin, label: "Open profile" },
    { k: "WhatsApp", v: "+" + String(P.whatsapp || "").replace(/^(\d{2})(\d{5})(\d+)$/, "$1 $2 $3"), href: wa, label: "Start chat", copy: "+" + P.whatsapp },
  ];
  var cgd = $("#contactGrid");
  cards.forEach(function (c) {
    var d = el("div", "ccard pre-able");
    d.innerHTML = '<span class="k">' + c.k + '</span><span class="v">' + esc(c.v) + '</span><span class="row"><a class="btn btn-red btn-sm" href="' + esc(c.href) + '" target="_blank" rel="noopener">' + c.label + " ↗</a>" +
      (c.copy ? '<button class="copy" type="button" data-copy="' + esc(c.copy) + '">Copy</button>' : "") + "</span>";
    cgd.appendChild(d);
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]"); if (!b) return;
    var done = function () { var t = b.textContent; b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = t; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, function () { selectText(b.parentNode.previousElementSibling); });
    else selectText(b.parentNode.previousElementSibling);
  });
  function selectText(n) { try { var r = document.createRange(); r.selectNodeContents(n); var s = getSelection(); s.removeAllRanges(); s.addRange(r); } catch (_) {} }
  $("#year").textContent = new Date().getFullYear();

  /* ---------- VIEWER (decks + certificates) ---------- */
  var V = $("#viewer"), vImg = $("#vImg"), vCount = $("#vCount"), vTitle = $("#vTitle"), vDots = $("#vDots"), vVerify = $("#vVerify");
  var vList = [], vIdx = 0, vLinks = null, lastFocus = null;
  function openViewer(title, list, idx, links) {
    vList = list; vLinks = links || null; lastFocus = document.activeElement;
    vTitle.textContent = title; vDots.innerHTML = "";
    if (list.length <= 20) list.forEach(function (_, i) { var d = el("button"); d.type = "button"; d.setAttribute("aria-label", "Go to " + (i + 1)); d.addEventListener("click", function () { show(i); }); vDots.appendChild(d); });
    V.hidden = false; document.body.classList.add("lock"); show(idx || 0); $("#vClose").focus();
  }
  function show(i) {
    vIdx = Math.max(0, Math.min(vList.length - 1, i));
    vImg.classList.add("fade");
    var src = vList[vIdx], im = new Image();
    im.onload = im.onerror = function () { vImg.src = src; vImg.alt = vTitle.textContent + " — " + (vIdx + 1) + " of " + vList.length; vImg.classList.remove("fade"); };
    im.src = src;
    [vIdx + 1, vIdx - 1].forEach(function (n) { if (vList[n]) (new Image()).src = vList[n]; });
    vCount.textContent = String(vIdx + 1).padStart(2, "0") + " / " + String(vList.length).padStart(2, "0");
    $("#vPrev").disabled = vIdx === 0; $("#vNext").disabled = vIdx === vList.length - 1;
    Array.prototype.forEach.call(vDots.children, function (d, n) { d.className = n === vIdx ? "on" : ""; });
    var link = vLinks && vLinks[vIdx]; vVerify.hidden = !link; if (link) vVerify.href = link;
  }
  function closeViewer() { V.hidden = true; document.body.classList.remove("lock"); vImg.src = ""; if (lastFocus) lastFocus.focus(); }
  $("#vClose").addEventListener("click", closeViewer);
  $("#vPrev").addEventListener("click", function () { show(vIdx - 1); });
  $("#vNext").addEventListener("click", function () { show(vIdx + 1); });
  $("#vStage").addEventListener("click", function (e) { if (e.target === e.currentTarget) closeViewer(); });
  document.addEventListener("keydown", function (e) {
    if (V.hidden) return;
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowRight") show(vIdx + 1);
    else if (e.key === "ArrowLeft") show(vIdx - 1);
    else if (e.key === "Tab") { // keep focus inside
      var f = V.querySelectorAll("button:not([disabled]),a:not([hidden])"); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  var tx = null;
  $("#vStage").addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  $("#vStage").addEventListener("touchend", function (e) { if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 45) show(vIdx + (dx < 0 ? 1 : -1)); tx = null; });

  /* ---------- PROJECT POPUP: brief on the left, PDF deck on the right (scrolling pages + zoom) ---------- */
  var PM = $("#pm"), pmPanel = PM.querySelector(".pm-panel"), pmStage = $("#pmStage"), pmPages = $("#pmPages"), pmMsg = $("#pmMsg"), pmCount = $("#pmCount");
  var pdfDoc = null, pdfUrl = "", pmLast = null, pdfCache = {}, pdfLibPromise = null, pages = [], zoom = 1, pageObs = null, layoutW = 0;
  var PDFJS = "assets/vendor/pdfjs/", ZMIN = 1, ZMAX = 4;
  function loadPdfLib() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfLibPromise) return pdfLibPromise;
    pdfLibPromise = new Promise(function (res, rej) {
      var sc = document.createElement("script"); sc.src = PDFJS + "pdf.min.js";
      sc.onload = function () { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; res(window.pdfjsLib); };
      sc.onerror = rej; document.head.appendChild(sc);
    });
    return pdfLibPromise;
  }
  function briefHTML(list) {
    if (!list || !list.length) return "";
    return list.map(function (b) {
      var body = Array.isArray(b.text) ? "<ul>" + b.text.map(function (t) { return "<li>" + txt(t) + "</li>"; }).join("") + "</ul>" : "<p>" + txt(b.text) + "</p>";
      return '<section class="pm-sec"><h4 class="pm-h mono">' + esc(b.heading) + "</h4>" + body + "</section>";
    }).join("");
  }
  function setTab(t) {
    pmPanel.setAttribute("data-tab", t);
    $("#pmTabBrief").classList.toggle("on", t === "brief"); $("#pmTabDeck").classList.toggle("on", t === "deck");
    if (t === "deck") requestAnimationFrame(layout);
  }
  function openProject(p) {
    pmLast = document.activeElement;
    $("#pmTitle").textContent = p.title || "";
    $("#pmOrg").innerHTML = txt(p.org) + (p.result ? ' <span class="result">' + esc(p.result) + "</span>" : "");
    $("#pmBrief").innerHTML = briefHTML(p.brief);
    PM.hidden = false; document.body.classList.add("lock");
    setTab("brief");
    if (p.id && history.replaceState) history.replaceState(null, "", "#p-" + p.id);
    $("#pmClose").focus();
    pdfDoc = null; pages = []; zoom = 1; layoutW = 0; pmPages.innerHTML = ""; pmStage.scrollTop = 0; pmStage.scrollLeft = 0;
    updZoomLabel(); pmCount.textContent = "— / —"; pmMsg.hidden = false;
    pdfUrl = p.pdf || "";
    if (!pdfUrl) { pmMsg.textContent = "Deck coming soon."; return; }
    if (location.protocol === "file:") { pmMsg.textContent = "The deck shows on the live site (browsers block PDFs opened straight from a file on your computer)."; return; }
    pmMsg.textContent = "Loading deck…";
    var want = pdfUrl;
    loadPdfLib().then(function (lib) {
      return pdfCache[want] || (pdfCache[want] = lib.getDocument({ url: want }).promise);
    }).then(function (doc) {
      if (want !== pdfUrl || PM.hidden) return;
      pdfDoc = doc; return buildPages(doc, want);
    }).catch(function () { delete pdfCache[want]; pmMsg.textContent = "Couldn't load the deck. Please refresh and try again."; });
  }
  function buildPages(doc, want) {
    var jobs = []; for (var i = 1; i <= doc.numPages; i++) jobs.push(doc.getPage(i));
    return Promise.all(jobs).then(function (list) {
      if (want !== pdfUrl) return;
      pages = list.map(function (pg, i) {
        var vp = pg.getViewport({ scale: 1 });
        var box = el("div", "pm-page"); box.setAttribute("data-n", i + 1);
        var cv = document.createElement("canvas"); box.appendChild(cv); pmPages.appendChild(box);
        return { pg: pg, w: vp.width, h: vp.height, box: box, cv: cv, done: 0, task: null };
      });
      pmMsg.hidden = true;
      if (pageObs) pageObs.disconnect();
      pageObs = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) draw(pages[+en.target.getAttribute("data-n") - 1]); }); }, { root: pmStage, rootMargin: "700px 0px" });
      pages.forEach(function (o) { pageObs.observe(o.box); });
      layout(); updCount();
    });
  }
  function fitW() { return Math.max(120, pmStage.clientWidth - 32); }
  function layout() {
    if (!pages.length || PM.hidden || pmStage.clientWidth < 40) return;
    layoutW = fitW();
    pages.forEach(function (o) {
      var w = Math.round(layoutW * zoom), h = Math.round(w * o.h / o.w);
      o.box.style.width = w + "px"; o.box.style.height = h + "px"; o.done = 0;
    });
    pages.forEach(function (o) { var r = o.box.getBoundingClientRect(), s = pmStage.getBoundingClientRect(); if (r.bottom > s.top - 700 && r.top < s.bottom + 700) draw(o); });
    updCount();
  }
  function draw(o) {
    if (!o || !layoutW) return;
    var cssW = Math.round(layoutW * zoom), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var target = Math.min(cssW * dpr, 4096); // pixel width, capped for memory
    if (o.done === target) return;
    o.done = target;
    var vp = o.pg.getViewport({ scale: target / o.w });
    if (o.task) { try { o.task.cancel(); } catch (_) {} }
    var off = document.createElement("canvas"); off.width = Math.floor(vp.width); off.height = Math.floor(vp.height);
    o.task = o.pg.render({ canvasContext: off.getContext("2d"), viewport: vp });
    o.task.promise.then(function () {
      if (o.done !== target) return;
      o.cv.width = off.width; o.cv.height = off.height; o.cv.getContext("2d").drawImage(off, 0, 0);
    }).catch(function () {});
  }
  function updCount() {
    if (!pages.length || !layoutW) return;
    var s = pmStage.getBoundingClientRect(), mark = s.top + s.height * 0.35, cur = 1;
    pages.forEach(function (o, i) { if (o.box.getBoundingClientRect().top <= mark) cur = i + 1; });
    if (pmStage.scrollTop + pmStage.clientHeight >= pmStage.scrollHeight - 2) cur = pages.length;
    pmCount.textContent = String(cur).padStart(2, "0") + " / " + String(pages.length).padStart(2, "0");
  }
  pmStage.addEventListener("scroll", updCount, { passive: true });
  function updZoomLabel() { $("#pmZoomReset").textContent = Math.round(zoom * 100) + "%"; $("#pmZoomOut").disabled = zoom <= ZMIN; $("#pmZoomIn").disabled = zoom >= ZMAX; }
  // change zoom while keeping the point under (cx, cy) in place
  function setZoom(z, cx, cy) {
    z = Math.max(ZMIN, Math.min(ZMAX, z)); if (!pages.length || Math.abs(z - zoom) < 0.001) { updZoomLabel(); return; }
    var r = pmStage.getBoundingClientRect();
    if (cx == null) { cx = r.width / 2; cy = r.height / 2; }
    var px = pmStage.scrollLeft + cx, py = pmStage.scrollTop + cy, k = z / zoom;
    zoom = z; layout();
    pmStage.scrollLeft = px * k - cx; pmStage.scrollTop = py * k - cy;
    updZoomLabel(); updCount();
  }
  $("#pmZoomIn").addEventListener("click", function () { setZoom(zoom + 0.5); });
  $("#pmZoomOut").addEventListener("click", function () { setZoom(zoom - 0.5); });
  $("#pmZoomReset").addEventListener("click", function () { setZoom(1); });
  // trackpad pinch / Ctrl + scroll on laptops
  pmStage.addEventListener("wheel", function (e) {
    if (!e.ctrlKey) return; e.preventDefault();
    var r = pmStage.getBoundingClientRect(); setZoom(zoom * Math.exp(-e.deltaY / 200), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  // two-finger pinch on phones
  var pinch = null;
  function tdist(t) { var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
  pmStage.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 2 || !pages.length) return;
    var r = pmStage.getBoundingClientRect();
    pinch = { d0: tdist(e.touches), z0: zoom, s: 1, cx: (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left, cy: (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top };
    pmPages.style.transformOrigin = (pmStage.scrollLeft + pinch.cx) + "px " + (pmStage.scrollTop + pinch.cy) + "px";
  }, { passive: true });
  pmStage.addEventListener("touchmove", function (e) {
    if (!pinch || e.touches.length !== 2) return; e.preventDefault();
    var s = tdist(e.touches) / pinch.d0, z = Math.max(ZMIN, Math.min(ZMAX, pinch.z0 * s));
    pinch.s = z / pinch.z0; pmPages.style.transform = "scale(" + pinch.s + ")";
  }, { passive: false });
  function endPinch() {
    if (!pinch) return; var p = pinch; pinch = null;
    pmPages.style.transform = ""; setZoom(p.z0 * p.s, p.cx, p.cy);
  }
  pmStage.addEventListener("touchend", function (e) { if (e.touches.length < 2) endPinch(); });
  pmStage.addEventListener("touchcancel", endPinch);
  // double-tap / double-click to zoom in and out
  pmStage.addEventListener("dblclick", function (e) { var r = pmStage.getBoundingClientRect(); setZoom(zoom > 1 ? 1 : 2, e.clientX - r.left, e.clientY - r.top); });
  function closeProject() {
    if (PM.classList.contains("pm-max")) setMax(false);
    PM.hidden = true; document.body.classList.remove("lock");
    if (/^#p-/.test(location.hash) && history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (pmLast) pmLast.focus();
  }
  $("#pmClose").addEventListener("click", closeProject);
  PM.addEventListener("click", function (e) { if (e.target === PM) closeProject(); });
  $("#pmTabBrief").addEventListener("click", function () { setTab("brief"); });
  $("#pmTabDeck").addEventListener("click", function () { setTab("deck"); });
  // Full screen: deck fills the whole screen (true browser fullscreen where supported, e.g. laptops/Android;
  // on iPhone, where browsers don't allow it, the deck still expands to cover the whole page)
  function setMax(on) {
    PM.classList.toggle("pm-max", on);
    var b = $("#pmFull"); b.innerHTML = on ? "⤡ <span>Exit</span>" : "⛶ <span>Full screen</span>"; b.setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
    var deck = pmPanel.querySelector(".pm-deck");
    if (on && !document.fullscreenElement) {
      var rq = deck.requestFullscreen || deck.webkitRequestFullscreen;
      if (rq) { try { var r = rq.call(deck); if (r && r.catch) r.catch(function () {}); } catch (_) {} }
    }
    if (!on && (document.fullscreenElement || document.webkitFullscreenElement)) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (_) {} }
    setTimeout(layout, 80);
  }
  $("#pmFull").addEventListener("click", function () { setMax(!PM.classList.contains("pm-max")); });
  function fsChange() { if (!(document.fullscreenElement || document.webkitFullscreenElement) && PM.classList.contains("pm-max")) setMax(false); else setTimeout(layout, 80); }
  document.addEventListener("fullscreenchange", fsChange); document.addEventListener("webkitfullscreenchange", fsChange);
  var rz = null; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (fitW() !== layoutW) layout(); }, 150); });
  // view-only: no right-click / save on the slides
  pmStage.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  pmStage.addEventListener("dragstart", function (e) { e.preventDefault(); });
  function pageJump(d) {
    if (!pages.length) return; var s = pmStage.getBoundingClientRect(), mid = s.top + 10, cur = 0;
    pages.forEach(function (o, i) { if (o.box.getBoundingClientRect().top <= mid) cur = i; });
    var t = pages[Math.max(0, Math.min(pages.length - 1, cur + d))];
    pmStage.scrollTo({ top: t.box.offsetTop - 16, behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("keydown", function (e) {
    if (PM.hidden) return;
    if (e.key === "Escape") { if (PM.classList.contains("pm-max")) setMax(false); else closeProject(); }
    else if (e.key === "f" || e.key === "F") setMax(!PM.classList.contains("pm-max"));
    else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); pageJump(1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); pageJump(-1); }
    else if ((e.key === "+" || e.key === "=") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setZoom(zoom + 0.5); }
    else if (e.key === "-" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setZoom(zoom - 0.5); }
    else if (e.key === "Tab") {
      var f = Array.prototype.filter.call(PM.querySelectorAll("button:not([disabled]),a[href]"), function (x) { return x.offsetParent !== null; }); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  // direct links: yoursite/#p-chings opens that project
  (function () {
    var m = location.hash.match(/^#p-(.+)$/); if (!m) return;
    if (m[1] === "internship" && I.deck && I.deck.pdf) { $("#internDeck").click(); return; }
    PROJECTS.forEach(function (p) { if (p.id === m[1]) openProject(p); });
  })();

  /* ---------- NAV ---------- */
  var tog = $("#navToggle"), links = $("#navLinks");
  tog.addEventListener("click", function () { var o = tog.getAttribute("aria-expanded") === "true"; tog.setAttribute("aria-expanded", String(!o)); links.classList.toggle("open", !o); document.body.classList.toggle("lock", !o); });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A" && links.classList.contains("open")) tog.click(); });
  if ("IntersectionObserver" in window) {
    var navMap = {}; links.querySelectorAll("a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (es) { es.forEach(function (en) { if (!en.isIntersecting) return; links.querySelectorAll("a").forEach(function (a) { a.classList.remove("active"); }); if (navMap[en.target.id]) navMap[en.target.id].classList.add("active"); }); }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { so.observe(s); });
  }

  /* ---------- SCRAMBLE headings (techy text decode) ---------- */
  var glyphs = "!<>-_\\/[]{}=+*^?#01ABCDEFX";
  function scramble(h) {
    var nodes = [];
    (function walk(n) { n.childNodes.forEach(function (c) { if (c.nodeType === 3 && c.textContent.trim()) nodes.push({ n: c, t: c.textContent }); else if (c.nodeType === 1) walk(c); }); })(h);
    var frame = 0, total = 22;
    (function tick() {
      nodes.forEach(function (o) {
        var p = frame / total, keep = Math.floor(o.t.length * p);
        o.n.textContent = o.t.slice(0, keep) + o.t.slice(keep).replace(/\S/g, function () { return glyphs[(Math.random() * glyphs.length) | 0]; });
      });
      if (frame++ < total) requestAnimationFrame(tick); else nodes.forEach(function (o) { o.n.textContent = o.t; });
    })();
  }

  /* ---------- REVEAL on scroll (only for things below the first screen) ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".sec .h2, .sec .lede, .facts, .intern-meta, .h3, .ticks, .deck-card.wide, .dash-row, .avatar, .pre-able, .thanks, .club-stack");
    var vh = window.innerHeight;
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target; ro.unobserve(t);
        var sib = t.parentNode ? Array.prototype.indexOf.call(t.parentNode.children, t) : 0;
        t.style.transitionDelay = (t.classList.contains("pre-able") ? Math.min(sib, 5) * 80 : 0) + "ms";
        t.classList.add("in"); t.classList.remove("pre");
        if (t.classList.contains("scramble")) scramble(t);
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { if (t.getBoundingClientRect().top > vh * 0.9) { t.classList.add("pre"); ro.observe(t); } });
  }

  /* ---------- CURSOR ---------- */
  if (!reduce && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.body.classList.add("has-cursor");
    var cur = $(".cursor"), dot = $(".cursor-dot"), ring = $(".cursor-ring");
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = "translate(" + mx + "px," + my + "px)"; }, { passive: true });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = "translate(" + rx + "px," + ry + "px)"; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", function (e) { cur.classList.toggle("big", !!e.target.closest("a,button")); });
  }
})();

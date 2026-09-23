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
  if (I.deck) {
    $("#internCover").src = I.deck.folder + "/1.webp";
    $("#internCount").textContent = I.deck.count + " slides";
    $("#internDeck").addEventListener("click", function () { openViewer((I.project || "Deck") + " — " + (I.company || ""), slidesOf(I.deck.folder, I.deck.count), 0); });
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

  /* ---------- CASE COMPS ---------- */
  var cg = $("#caseGrid");
  (C.caseComps || []).forEach(function (c, i) {
    var b = el("button", "deck-card case pre-able"); b.type = "button";
    b.innerHTML =
      '<span class="deck-img"><img src="' + esc(c.folder) + '/cover.' + esc(c.ext || "webp") + '" alt="Cover: ' + esc(c.title) + '" loading="lazy"></span>' +
      '<span class="case-info">' +
        '<span class="case-idx">CASE_' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="case-title">' + txt(c.title) + "</span>" +
        '<span class="case-org">' + txt(c.org) + "</span>" +
        '<span class="case-foot">' + (c.result ? '<span class="result">' + esc(c.result) + "</span>" : "") +
          "<span>View deck · " + c.count + " slides</span><span class=\"arrow\" aria-hidden=\"true\">↗</span></span>" +
      "</span>";
    b.addEventListener("click", function () { openViewer(c.title + " — " + c.org, slidesOf(c.folder, c.count, c.ext), 0); });
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
      '<span class="cert-meta"><span>' + esc(c.issuer) + (c.date ? " · " + esc(c.date) : "") + "</span>" + (c.verify ? '<span class="ok">✓ Verified</span>' : "") + "</span></span>";
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
    card.innerHTML = '<iframe src="' + esc(e.src) + '" height="' + e.h + '" title="LinkedIn post ' + (i + 1) + '" loading="lazy" allowfullscreen></iframe>';
    track.appendChild(card);
  });
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

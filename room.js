/* =====================================================================
   ROOM PAGE: interactive room. You do NOT need to edit this file.
   All text lives in content.js → room: { ... }
   Positions below are % of each image (left, top, right, bottom).
   ===================================================================== */
(() => {
  "use strict";
  const C = window.CONTENT || {};
  const R = C.room || {};
  const DIR = "assets/Room/";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isPh = (s) => typeof s === "string" && /^\s*\[.*\]\s*$/s.test(s);
  // text from content.js: an empty line starts a new paragraph, a single line break starts a new line
  const lines = (s) => esc(String(s).trim()).replace(/\n[ \t]*\n\s*/g, '<span class="pgap"></span>').replace(/\n/g, "<br>");
  const t = (s) => (isPh(s) ? `<span class="ph">${esc(String(s).trim().slice(1, -1))}</span>` : lines(s ?? ""));
  const has = (s) => s && !isPh(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scenes ---------- */
  const VIEWS = {
    room: {
      img: "room.webp", w: 1671, h: 941, label: "Overview",
      hint: "Tap a marker to step closer.",
      spots: [
        { id: "desk",  label: "Study table", marker: [18, 60],   box: [1.2, 41.4, 33.5, 98.8], go: "desk",  focus: [17.4, 66] },
        { id: "side",  label: "Side table",  marker: [66.7, 31], box: [61.3, 23.9, 72.1, 48.9], go: "side",  focus: [66.7, 36] },
        { id: "door",  label: "Door",        marker: [86, 41],   box: [73.9, 0, 98.1, 55.3],   act: "hoodies" },
        { id: "shoes", label: "Shoes",       marker: [88.3, 70], box: [83.2, 56.9, 93.7, 83.4], go: "shoes", focus: [88.4, 70] },
      ],
    },
    desk: {
      img: "desk.webp", w: 1448, h: 1086, label: "Study table", from: [-3.2, 24.9, 40.4, 74.4],
      hint: "Psst, more things on this desk are clickable. Look for the sparkles ✦",
      spots: [
        { id: "laptop",  label: "Laptop",        marker: [46.3, 25], box: [34.9, 16.6, 59.1, 47], act: "laptop", zoom: [34.9, 16.8, 57.7, 33.6] },
        { id: "phones",  label: "Headphones",    box: [64.6, 37, 79.1, 51.6], act: "song", hidden: true },
        { id: "lamp",    label: "Lamp",          box: [69.1, 3.2, 81.8, 35.9], act: "lamp", hidden: true },
        { id: "krishna", label: "Radha Krishna", box: [15.5, 15.2, 28.3, 30.2], act: "krishna", hidden: true },
        { id: "bin",     label: "Dustbin",       box: [0.3, 57.8, 11.4, 81], act: "bin", hidden: true },
      ],
      live: true,
    },
    side: {
      img: "side-table.webp", w: 1448, h: 1086, label: "Side table", from: [54, 18, 25.4], soft: 0.5,
      hint: "Psst, the photo frame is clickable too ✦",
      spots: [
        { id: "books",   label: "Books",       marker: [43.2, 26], box: [34.9, 21.4, 51.7, 38.5], act: "books" },
        { id: "friends", label: "Photo frame", box: [52.8, 16.2, 69.3, 41], act: "friends", hidden: true, zoom: [54.6, 18.1, 67.3, 39.1] },
      ],
    },
    shoes: {
      img: "shoes.webp", w: 1448, h: 1086, label: "Shoes", from: [80, 49.3, 19.7, 43.6],
      hint: "One of these pairs has stories.",
      spots: [
        { id: "court", label: "Basketball shoes", marker: [69, 62], box: [47, 45.6, 91.2, 87], act: "court" },
      ],
    },
  };

  const START = { room: 24, desk: 48, side: 50, shoes: 62 };   // where phones start when swiping
  const stage = $("#stage"), hint = $("#hint"), where = $("#where"), backBtn = $("#backBtn");
  let cur = "room", busy = false, lastSpot = null, overlay = null;

  /* ---------- build ---------- */
  for (const [key, v] of Object.entries(VIEWS)) {
    const el = document.createElement("div");
    el.className = "view";
    el.dataset.view = key;
    el.hidden = key !== "room";
    el.innerHTML = `<div class="cv"><img src="${DIR + v.img}" alt="${esc(v.label)}" draggable="false" ${key === "room" ? 'fetchpriority="high"' : 'loading="eager"'}></div>`;
    const cv = el.firstElementChild;
    if (v.live) {
      cv.insertAdjacentHTML("beforeend",
        `<div class="cal" aria-hidden="true"><div class="cal-in"><b class="cal-m"></b><span class="cal-d"></span><i class="cal-w"></i></div></div>`);
    }
    cv.insertAdjacentHTML("beforeend", `<div class="dim" aria-hidden="true"></div>`);
    if (v.live) cv.insertAdjacentHTML("beforeend", `<div class="clock" aria-hidden="true"><span class="clk"></span></div>`);
    for (const s of v.spots) {
      const [x1, y1, x2, y2] = s.box;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "spot" + (s.hidden ? " is-hidden" : "");
      b.style.cssText = `left:${x1}%;top:${y1}%;width:${x2 - x1}%;height:${y2 - y1}%`;
      b.dataset.label = s.label;
      b.setAttribute("aria-label", s.label);
      if (s.hidden) b.innerHTML = `<span class="spark" aria-hidden="true">✦</span>`;
      b.addEventListener("click", () => trigger(s));
      cv.appendChild(b);
      if (s.marker) {
        const m = document.createElement("button");
        m.type = "button";
        m.className = "marker" + (s.marker[0] > 72 ? " flip" : "");
        m.style.cssText = `left:${s.marker[0]}%;top:${s.marker[1]}%`;
        m.innerHTML = `<span class="m-dot"></span><span class="m-lbl mono">${esc(s.label)}</span>`;
        m.setAttribute("aria-label", s.label);
        m.addEventListener("click", () => trigger(s));
        cv.appendChild(m);
      }
    }
    stage.appendChild(el);
    v.el = el;
    v.cv = cv;
    el.addEventListener("scroll", () => { if (key === "room" && !progScroll) hideSwipe(); }, { passive: true });
  }

  /* ---------- sizing ---------- */
  let swipeShown = false, progScroll = false;
  function size(key) {
    const v = VIEWS[key];
    const W = stage.clientWidth, H = stage.clientHeight, ar = v.w / v.h;
    let w, h;
    if (W / H < 1) { h = H; w = H * ar; if (w < W) { w = W; h = W / ar; } }
    else { w = Math.min(W, H * ar); h = w / ar; }
    w = Math.round(w); h = Math.round(h);
    v.cv.style.width = w + "px";
    v.cv.style.height = h + "px";
    v.cv.style.setProperty("--cw", w + "px");
    if (v.live) placeCal(v, w, h);
    const pan = w > W + 1;
    v.el.classList.toggle("pan", pan);
    v.pan = pan;
    return pan;
  }
  /* live calendar: stretched onto the blank desk calendar page with a perspective transform */
  const CAL = [[11.53, 32.34], [20.72, 29.81], [22.01, 39.71], [13.03, 42.47]];   // page corners in desk.webp, %
  function quad(W, H, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1;
    const g = (dx3 * dy2 - dx2 * dy3) / den, k = (dx1 * dy3 - dx3 * dy1) / den;
    const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
    return `matrix3d(${[a / W, d / W, 0, g / W, b / H, e / H, 0, k / H, 0, 0, 1, 0, x0, y0, 0, 1].join(",")})`;
  }
  const CLK = [[60.48, 28.62], [68.77, 28.24], [68.83, 33.15], [60.31, 33.61]];   // clock display corners in desk.webp, %
  function placeQuad(el, pts, inset, w, h) {
    if (!el) return;
    const cx = pts.reduce((n, p) => n + p[0], 0) / 4, cy = pts.reduce((n, p) => n + p[1], 0) / 4;
    const P = pts.map(([x, y]) => [((x + (cx - x) * inset) / 100) * w, ((y + (cy - y) * inset) / 100) * h]);
    el.style.transform = quad(el.offsetWidth, el.offsetHeight, P);
    el.style.visibility = "visible";
  }
  function placeCal(v, w, h) {
    placeQuad(v.cv.querySelector(".cal"), CAL, 0.015, w, h);
    placeQuad(v.cv.querySelector(".clock"), CLK, 0.06, w, h);
  }
  function center(key, fx = 50) {
    const v = VIEWS[key];
    if (!v.pan) return;
    const w = v.cv.offsetWidth, W = v.el.clientWidth;
    progScroll = true;
    v.el.scrollLeft = Math.max(0, Math.min(w - W, (w * fx) / 100 - W / 2));
    requestAnimationFrame(() => requestAnimationFrame(() => (progScroll = false)));
  }
  function layoutAll() {
    for (const k of Object.keys(VIEWS)) if (!VIEWS[k].el.hidden || k === cur) size(k);
    if (VIEWS.room.pan && cur === "room" && !swipeShown) showSwipe();
  }
  addEventListener("resize", () => { layoutAll(); for (const k in VIEWS) center(k, START[k]); });

  const swipe = $("#swipe");
  function showSwipe() {
    swipeShown = true;
    swipe.hidden = false;
    setTimeout(hideSwipe, 4500);
  }
  function hideSwipe() { swipe.classList.add("out"); setTimeout(() => (swipe.hidden = true), 400); }

  /* ---------- navigation ---------- */
  const EASE = "cubic-bezier(.6,0,.25,1)";
  const dur = (ms) => (reduce ? 1 : ms);
  const TF = (x, y, s) => `translate(${x}px,${y}px) scale(${s})`;
  const ID = TF(0, 0, 1);
  const allDone = (anims) => Promise.all(anims.map((x) => x.finished));
  const clearAnims = (...els) => els.forEach((e) => e.getAnimations().forEach((x) => x.cancel()));
  function setChrome() {
    const v = VIEWS[cur];
    where.textContent = v.label;
    backBtn.hidden = cur === "room";
    $("#toSite").hidden = cur !== "room";
    hint.textContent = v.hint;
    hint.classList.remove("show");
    void hint.offsetWidth;
    hint.classList.add("show");
  }

  /* The room zooms so the close-up's area lands exactly where the close-up picture sits,
     while the close-up starts small, sitting on that same area, and grows with it. */
  function match(key) {
    const b = VIEWS[key];
    const ra = VIEWS.room.cv.getBoundingClientRect(), rb = b.cv.getBoundingClientRect();
    // from = [left, top, width, (height)] of the close-up's area inside room.webp, in %
    const [fx, fy, fw, fh] = b.from;
    const x = (fx / 100) * ra.width, y = (fy / 100) * ra.height, w = (fw / 100) * ra.width;
    const h = fh ? (fh / 100) * ra.height : (w * rb.height) / rb.width;
    const s = Math.sqrt((rb.width / w) * (rb.height / h));
    const cx = rb.left + rb.width / 2, cy = rb.top + rb.height / 2;
    return {
      zoomed: TF(cx - ra.left - s * (x + w / 2), cy - ra.top - s * (y + h / 2), s),
      shrunk: `translate(${ra.left + x - rb.left}px,${ra.top + y - rb.top}px) scale(${w / rb.width},${h / rb.height})`,
    };
  }

  function go(to, spot) {
    if (busy || to === cur) return;
    busy = true;
    const a = VIEWS[cur], b = VIEWS[to];
    lastSpot = spot;
    a.cv.classList.add("zoomed");
    b.cv.classList.add("zoomed", "blend");
    b.el.style.opacity = "0";
    b.el.hidden = false;
    size(to);
    center(to, START[to]);
    const m = match(to), k = b.soft ?? 1;
    const D = dur(1150), o = { duration: D, easing: EASE, fill: "both" }, lin = { duration: D, fill: "both" };
    const anims = [
      a.cv.animate([{ transform: ID }, { transform: m.zoomed }], o),
      b.cv.animate([{ transform: m.shrunk }, { transform: ID }], o),
      // both pictures are soft-focus while they overlap, so you never see two sharp images at once
      a.cv.animate([{ filter: "blur(0px)" }, { filter: "blur(0px)", offset: 0.2, easing: "ease-in" }, { filter: `blur(${3 * k}px)`, offset: 0.5 }, { filter: `blur(${3 * k}px)` }], lin),
      b.cv.animate([{ filter: `blur(${14 * k}px)` }, { filter: `blur(${14 * k}px)`, offset: 0.35, easing: "ease-out" }, { filter: "blur(0px)", offset: 0.82 }, { filter: "blur(0px)" }], lin),
      b.el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.22, easing: "ease-in-out" }, { opacity: 1, offset: 0.56 }, { opacity: 1 }], lin),
      a.el.animate([{ opacity: 1 }, { opacity: 1, offset: 0.56, easing: "ease-out" }, { opacity: 0, offset: 0.85 }, { opacity: 0 }], lin),
    ];
    b.el.style.opacity = "";
    cur = to;
    setChrome();
    allDone(anims).then(() => {
      a.el.hidden = true;
      clearAnims(a.el, a.cv, b.el, b.cv);
      a.cv.classList.remove("zoomed");
      b.cv.classList.remove("zoomed", "blend");
      sparkle(b);
      busy = false;
    });
  }

  function back() {
    if (busy || cur === "room") return;
    busy = true;
    const key = cur, b = VIEWS[key], a = VIEWS.room;
    a.cv.classList.add("zoomed");
    b.cv.classList.add("zoomed", "blend");
    a.el.style.opacity = "0";
    a.el.hidden = false;
    size("room");
    if (a.pan) center("room", b.from[0] + b.from[2] / 2);
    const m = match(key), k = b.soft ?? 1;
    const D = dur(1050), o = { duration: D, easing: EASE, fill: "both" }, lin = { duration: D, fill: "both" };
    const anims = [
      a.cv.animate([{ transform: m.zoomed }, { transform: ID }], o),
      b.cv.animate([{ transform: ID }, { transform: m.shrunk }], o),
      b.cv.animate([{ filter: "blur(0px)", easing: "ease-in" }, { filter: `blur(${14 * k}px)`, offset: 0.5 }, { filter: `blur(${14 * k}px)` }], lin),
      a.cv.animate([{ filter: `blur(${3 * k}px)` }, { filter: `blur(${3 * k}px)`, offset: 0.45, easing: "ease-out" }, { filter: "blur(0px)", offset: 0.85 }, { filter: "blur(0px)" }], lin),
      b.el.animate([{ opacity: 1 }, { opacity: 1, offset: 0.38, easing: "ease-in-out" }, { opacity: 0, offset: 0.72 }, { opacity: 0 }], lin),
      a.el.animate([{ opacity: 0, easing: "ease-in" }, { opacity: 1, offset: 0.4 }, { opacity: 1 }], lin),
    ];
    a.el.style.opacity = "";
    cur = "room";
    setChrome();
    allDone(anims).then(() => {
      b.el.hidden = true;
      clearAnims(a.el, a.cv, b.el, b.cv);
      a.cv.classList.remove("zoomed");
      b.cv.classList.remove("zoomed", "blend");
      busy = false;
    });
  }
  backBtn.addEventListener("click", back);

  function sparkle(v) {
    v.cv.classList.remove("sparkling");
    void v.cv.offsetWidth;
    v.cv.classList.add("sparkling");
  }

  /* ---------- actions ---------- */
  function trigger(s) {
    if (busy) return;
    if (s.go) return go(s.go, s);
    const fn = ACTIONS[s.act];
    if (fn) fn(s);
  }

  const ACTIONS = {
    hoodies: () => openModal(hoodiesHTML(), "m-hoodies"),
    krishna: () => openModal(quoteHTML(R.krishnaQuote || {}), "m-quote"),
    bin: () => openModal(paperHTML(), "m-paper"),
    books: () => { openModal(booksHTML(), "m-books"); bindTabs($("#modalPanel")); },
    court: () => openModal(courtHTML(), "m-court"),
    lamp: () => {
      const off = document.body.classList.toggle("lights-off");
      toast(off ? "Lights off. Click the lamp again to switch them back on." : "Lights on.");
    },
    song: () => toggleSong(),
    laptop: (s) => zoomInto(s, $("#laptop"), ".lp-win", openLaptop),
    friends: (s) => zoomInto(s, $("#fview"), ".fv-frame", openFriends),
  };

  /* zoom deeper into an object; its window grows out of the object itself */
  function zoomInto(s, layer, target, fill) {
    busy = true;
    const v = VIEWS[cur];
    fill();
    layer.style.opacity = "0";
    layer.hidden = false;
    const el = $(target, layer);
    const T = el.getBoundingClientRect(), rv = v.cv.getBoundingClientRect();
    const [x1, y1, x2, y2] = s.zoom || s.box;
    const ox = (x1 / 100) * rv.width, oy = (y1 / 100) * rv.height;
    const ow = ((x2 - x1) / 100) * rv.width, oh = ((y2 - y1) / 100) * rv.height;
    const k = Math.sqrt((T.width / ow) * (T.height / oh));
    const tcx = T.left + T.width / 2, tcy = T.top + T.height / 2;
    const zoomed = TF(tcx - rv.left - k * (ox + ow / 2), tcy - rv.top - k * (oy + oh / 2), k);
    const fin = getComputedStyle(el).transform;
    const end = fin && fin !== "none" ? fin : "none";
    const start = `translate(${rv.left + ox + ow / 2 - tcx}px,${rv.top + oy + oh / 2 - tcy}px) scale(${ow / T.width},${oh / T.height})` + (end === "none" ? "" : " " + end);
    v.cv.classList.add("zoomed");
    const D = dur(1000), o = { duration: D, easing: EASE, fill: "both" };
    const anims = [
      v.cv.animate([{ transform: ID }, { transform: zoomed }], o),
      el.animate([{ transform: start }, { transform: end }], o),
      layer.animate([{ opacity: 0 }, { opacity: 0, offset: 0.08, easing: "ease-in-out" }, { opacity: 1, offset: 0.5 }, { opacity: 1 }], { duration: D, fill: "both" }),
    ];
    layer.style.opacity = "";
    overlay = { layer, anims, v };
    allDone(anims).then(() => { busy = false; const fbtn = layer.querySelector("button"); fbtn && fbtn.focus({ preventScroll: true }); });
  }
  function closeOverlay() {
    if (!overlay || busy) return;
    busy = true;
    const { layer, anims, v } = overlay;
    overlay = null;
    anims.forEach((x) => x.reverse());
    allDone(anims).then(() => {
      layer.hidden = true;
      anims.forEach((x) => x.cancel());
      v.cv.classList.remove("zoomed");
      busy = false;
    });
  }

  /* ---------- laptop ---------- */
  const lp = R.laptop || {};
  function openLaptop() { showTab("projects"); }
  function showTab(tab) {
    document.querySelectorAll(".lp-tab").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
    $("#lpPath").textContent = tab;
    const body = $("#lpBody");
    if (tab === "projects") {
      const list = lp.projects || [];
      body.innerHTML = list.length
        ? `<ul class="lp-list">${list.map((p, i) => `
            <li class="lp-card"><span class="mono lp-n">${String(i + 1).padStart(2, "0")}</span>
              <div><h4>${t(p.title)}</h4>${p.note ? `<p>${t(p.note)}</p>` : ""}</div>
              ${p.status ? `<span class="mono lp-chip">${t(p.status)}</span>` : ""}</li>`).join("")}</ul>`
        : `<p class="lp-empty mono">Nothing here yet.</p>`;
    } else {
      const list = lp.courses || [];
      body.innerHTML = list.length
        ? `<ul class="lp-list">${list.map((c) => {
            const pct = Math.max(0, Math.min(100, Number(c.progress) || 0));
            return `<li class="lp-card course"><div><h4>${t(c.title)}</h4>${c.provider ? `<p class="mono">${t(c.provider)}</p>` : ""}
              <div class="lp-bar"><span style="width:${pct}%"></span></div></div>
              <span class="mono lp-pct">${pct}%</span></li>`; }).join("")}</ul>`
        : `<p class="lp-empty mono">Nothing here yet.</p>`;
    }
  }
  document.querySelectorAll(".lp-tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
  $("#lpClose").addEventListener("click", closeOverlay);

  /* ---------- friends frame ---------- */
  function openFriends() {
    const fr = R.friends || {};
    $("#fvImg").src = fr.photo || DIR + "friends.webp";
    const q = fr.quote || "[Quote]";
    $("#fvQuote").innerHTML = t(q);
    $("#fvQuote").parentElement.classList.toggle("long", String(q).length > 140);
    $("#fvQuote").parentElement.classList.toggle("xlong", String(q).length > 320);
    $("#fvBy").innerHTML = has(fr.by) ? "— " + esc(fr.by) : "";
  }
  $("#fvClose").addEventListener("click", closeOverlay);

  /* ---------- popups ---------- */
  const modal = $("#modal"), panel = $("#modalPanel");
  let lastFocus = null;
  function openModal(html, cls) {
    lastFocus = document.activeElement;
    panel.className = "modal-panel " + cls;
    panel.innerHTML = `<button class="m-close" type="button" data-close aria-label="Close">✕</button>` + html;
    modal.hidden = false;
    modal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur(220) });
    panel.animate([{ transform: "translateY(18px) scale(.97)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: dur(380), easing: "cubic-bezier(.2,.8,.2,1)" });
    panel.querySelector(".m-close").focus({ preventScroll: true });
  }
  function closeModal() {
    if (modal.hidden) return;
    const a = modal.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur(180), fill: "forwards" });
    a.finished.then(() => { modal.hidden = true; a.cancel(); panel.innerHTML = ""; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); });
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });

  function hoodiesHTML() {
    const clubs = C.clubs || [];
    const name = (c) => /^tedx/i.test(c.club)
      ? `<span class="ted">TED</span><sup>x</sup><wbr>${esc(c.club.replace(/^tedx/i, ""))}`
      : esc(c.club);
    return `<p class="m-kicker mono">On the door</p><h3 class="m-h">Hung up with <em>pride</em></h3>
      <div class="hd-row">${clubs.map((c) => `
        <figure class="hd"><div class="hd-img"><img src="${esc(c.image)}" alt="${esc(c.club)} hoodie" loading="lazy"></div>
          <figcaption><b>${name(c)}</b><span class="mono" style="--acc:${esc(c.accent || "#D7362A")}">${t(c.role)}</span></figcaption></figure>`).join("")}</div>
      ${R.hoodiesLine ? `<p class="hd-line">${t(R.hoodiesLine)}</p>` : ""}`;
  }
  function quoteHTML(q) {
    return `<span class="q-mark" aria-hidden="true">“</span><p class="q-text">${t(q.text || "[Quote]")}</p>${has(q.by) ? `<p class="q-by mono">— ${esc(q.by)}</p>` : ""}`;
  }
  function paperHTML() {
    const plans = R.failedPlans || [];
    return `<div class="paper"><p class="pp-title">${t(R.failedTitle || "Plans that didn't make it")}</p>
      <ul>${plans.map((p) => `<li><s>${t(p)}</s></li>`).join("")}</ul>
      ${R.failedNote ? `<p class="pp-note">${t(R.failedNote)}</p>` : ""}</div>`;
  }
  function courtHTML() {
    const b = R.basketball || {};
    const list = b.achievements || [];
    const avatar = has(b.avatar) ? b.avatar : DIR + "avatar.webp";
    return `<div class="ct-wrap">
      <div class="ct-stage" aria-hidden="true">
        <span class="ct-live mono"><i></i>Player cam</span>
        <div class="ct-court"></div>
        <div class="ct-spot"></div>
        <div class="ct-floor"><span></span></div>
        <img class="ct-avatar" src="${esc(avatar)}" alt="" decoding="async">
        <div class="ct-tag"><b>${esc(b.name || "Bharat")}</b>${b.number ? `<span class="mono">#${esc(b.number)}</span>` : ""}</div>
      </div>
      <div class="ct-info">
        <p class="m-kicker mono">Off the desk</p><h3 class="m-h">On the <em>Court</em></h3>
        ${b.intro ? `<p class="m-lede">${t(b.intro)}</p>` : ""}
        <ol class="ct-list">${list.map((a) => `<li><span class="mono ct-yr">${t(a.year || "")}</span><div><h4>${t(a.title)}</h4>${a.note ? `<p>${t(a.note)}</p>` : ""}</div></li>`).join("")}</ol>
      </div>
    </div>`;
  }
  function bookCard(bk, withReview) {
    const cover = has(bk.cover)
      ? `<img src="${esc(bk.cover)}" alt="" loading="lazy">`
      : `<span class="bk-blank">${esc((bk.title || "?").replace(/[\[\]]/g, "").trim().charAt(0) || "?")}</span>`;
    const fav = bk.favourite ? `<span class="mono bk-fav">★ All-time favourite</span>` : "";
    const rev = withReview && bk.review
      ? `<details class="bk-rev"><summary class="mono">Read my review</summary>${String(bk.review).split(/\n\s*\n/).map((p) => `<p>${t(p)}</p>`).join("")}</details>`
      : "";
    return `<li class="bk${bk.favourite ? " is-fav" : ""}"><div class="bk-cover">${cover}</div><div class="bk-info"><h4>${t(bk.title)}</h4><p class="mono">${t(bk.author || "")}</p>${fav}${rev}</div></li>`;
  }
  function booksHTML() {
    const b = R.books || {};
    const read = [...(b.read || [])].sort((x, y) => (y.favourite ? 1 : 0) - (x.favourite ? 1 : 0));
    const tabs = [
      ["reading", "Currently reading", b.reading || [], false],
      ["read", "Have read", read, true],
      ["wish", "Wish list", b.wishlist || [], false],
    ];
    return `<p class="m-kicker mono">Side table</p><h3 class="m-h">My <em>Books</em></h3>
      <div class="tabs" role="tablist">${tabs.map(([id, lbl, l], i) => `<button type="button" class="tab${i ? "" : " on"}" data-tab="${id}" role="tab">${lbl} <span class="mono">${l.length}</span></button>`).join("")}</div>
      ${tabs.map(([id, , l, rv], i) => `<ul class="bk-list" data-pane="${id}" ${i ? "hidden" : ""}>${l.length ? l.map((x) => bookCard(x, rv)).join("") : `<li class="bk-empty mono">Nothing here yet.</li>`}</ul>`).join("")}`;
  }
  function bindTabs(root) {
    root.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => {
      root.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x === b));
      root.querySelectorAll("[data-pane]").forEach((p) => (p.hidden = p.dataset.pane !== b.dataset.tab));
    }));
  }

  /* ---------- song ---------- */
  const player = $("#player");
  function ytId(u) {
    if (!u) return "";
    u = String(u).trim();
    if (/^[\w-]{11}$/.test(u)) return u;
    const m = u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  function toggleSong() {
    if (!player.hidden) return closeSong();
    const s = R.song || {};
    const id = ytId(s.youtube);
    if (!id) return toast("🎧 The song is coming soon.");
    const start = parseInt(s.start, 10) || 0;
    $("#plTitle").innerHTML = t(s.title || "");
    $("#plFrame").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${start}&rel=0&modestbranding=1&playsinline=1" title="Song player" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    player.hidden = false;
    player.animate([{ transform: "translateY(20px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: dur(320), easing: "cubic-bezier(.2,.8,.2,1)" });
  }
  function closeSong() {
    $("#plFrame").innerHTML = "";
    player.hidden = true;
  }
  $("#plClose").addEventListener("click", closeSong);

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg) {
    let el = $(".toast");
    if (!el) { el = document.createElement("p"); el.className = "toast mono"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("show"), 3200);
  }

  /* ---------- live clock + calendar ---------- */
  const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function tick() {
    const d = new Date();
    let h = d.getHours() % 12 || 12;
    const m = String(d.getMinutes()).padStart(2, "0");
    const clk = $(".clk");
    if (clk) clk.innerHTML = `${h}<span class="colon">:</span>${m}<small>${d.getHours() < 12 ? "AM" : "PM"}</small>`;
    const cm = $(".cal-m");
    if (cm) { cm.textContent = MON[d.getMonth()]; $(".cal-d").textContent = d.getDate(); $(".cal-w").textContent = DAY[d.getDay()]; }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- keyboard ---------- */
  addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hidden) return closeModal();
    if (overlay) return closeOverlay();
    if (cur !== "room") return back();
  });

  /* ---------- loading ---------- */
  const loader = $("#loader"), bar = $("#loaderBar");
  function preload(src) {
    return new Promise((res) => { const i = new Image(); i.onload = i.onerror = () => res(); i.src = src; });
  }
  const others = ["desk.webp", "side-table.webp", "shoes.webp"];
  let done = 0;
  const step = () => { done++; bar.style.width = Math.round((done / 4) * 100) + "%"; };
  const first = preload(DIR + VIEWS.room.img).then(step);
  others.forEach((f) => preload(DIR + f).then(step));
  const minWait = new Promise((r) => setTimeout(r, reduce ? 0 : 700));
  Promise.all([first, minWait]).then(() => {
    layoutAll();
    center("room", START.room);
    setChrome();
    loader.classList.add("gone");
    setTimeout(() => loader.remove(), 700);
    setTimeout(() => preload(has((R.basketball || {}).avatar) ? R.basketball.avatar : DIR + "avatar.webp"), 2500);
    VIEWS.room.cv.animate([{ transform: "scale(1.06)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], { duration: dur(1100), easing: "cubic-bezier(.2,.8,.2,1)" });
  });
  layoutAll();
})();

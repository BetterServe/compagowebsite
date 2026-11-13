/* Compago: homepage hero graphic.
   Three step boxes over a "screen". Each step plays its own scene: an application
   filled in and approved, a box delivered to the door, a report checked off and
   ready for review. A marigold dot travels between the boxes, the drop line slides
   under the active step, and the cycle repeats.

   The scenes are drawn in index.html and animated in styles.css (classes a-grow,
   a-tick, a-drive, stamp, and so on). Everything rests in its finished state, so
   the graphic reads correctly with no JavaScript or with reduced motion. This file
   only decides which scene is showing. To change the captions, edit STOPS. */
(function () {
  "use strict";

  var STOPS = [
    { k: "01 / Enrollment",  title: "01 / enrollment",  t: "Screened, applied, and approved." },
    { k: "02 / Fulfillment", title: "02 / fulfillment", t: "Ordered, tracked, and delivered to the door." },
    { k: "03 / Reporting",   title: "03 / reporting",   t: "Every step documented, ready for review." }
  ];
  var DWELL = 4200;   // ms each scene stays up (its animation runs about 2.8s)
  var TRAVEL = 750;   // ms for the dot to cross a connector (matches the CSS)

  var fig = document.getElementById("flow");
  if (!fig) return;
  var steps = fig.querySelectorAll(".fstep");
  var lines = fig.querySelectorAll(".fline");
  var scenes = fig.querySelectorAll(".scene");
  var link = fig.querySelector(".stage-link");
  var wrap = fig.querySelector(".stage-wrap");
  var title = fig.querySelector(".stage-title");
  var status = fig.querySelector(".flow-status");
  var btn = fig.querySelector(".loop-pause");

  var i = 0;

  // keep the drop line under the active step box
  function aim() {
    var box = steps[i].querySelector(".fbox").getBoundingClientRect();
    var w = wrap.getBoundingClientRect();
    link.style.setProperty("--x", (box.left + box.width / 2 - w.left).toFixed(1) + "px");
  }
  aim();
  window.addEventListener("resize", aim);

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { if (btn) btn.hidden = true; return; }

  function show(n) {
    i = n;
    steps.forEach(function (s, j) { s.classList.toggle("on", j === n); });
    scenes.forEach(function (s, j) { s.classList.toggle("on", j === n); });
    aim();
    var s = STOPS[n];
    title.textContent = s.title;
    status.classList.add("swap");
    setTimeout(function () {
      status.innerHTML = "<b>" + s.k + "</b>" + s.t;
      status.classList.remove("swap");
    }, 220);
  }

  var timer = null, paused = false, visible = true;
  function advance() {
    timer = null;
    if (paused || !visible) return;
    var next = (i + 1) % STOPS.length;
    if (next > 0) {
      var l = lines[i];
      l.classList.remove("go"); void l.offsetWidth; l.classList.add("go");
      timer = setTimeout(function () { timer = null; l.classList.remove("go"); show(next); schedule(); }, TRAVEL);
    } else {
      show(0); schedule();
    }
  }
  function schedule() { if (!timer && !paused && visible) timer = setTimeout(advance, DWELL); }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }

  if (btn) btn.addEventListener("click", function () {
    paused = !paused;
    btn.setAttribute("aria-pressed", paused ? "true" : "false");
    btn.textContent = paused ? "Play" : "Pause";
    paused ? stop() : schedule();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; visible ? schedule() : stop(); }).observe(fig);
  }

  schedule();
})();

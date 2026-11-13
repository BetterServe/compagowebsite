/* Compago: shared site behavior. Dependency-free. */
(function () {
  "use strict";

  /* Entrance on scroll, skipped for reduced motion */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add("in"); obs.unobserve(x.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  /* Mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  /* Contact form.
     Until the Jotform embed replaces it, the placeholder action "#" is
     intercepted and confirmed on the page. */
  var form = document.querySelector("form[data-contact]");
  if (form) {
    var status = form.querySelector(".form-status");
    var show = function (kind, msg) {
      status.hidden = false;
      status.className = "form-status " + kind;
      status.textContent = msg;
    };
    form.addEventListener("submit", function (e) {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var v = f.value.trim();
        var valid = v !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        f.closest(".form-field").classList.toggle("invalid", !valid);
        f.setAttribute("aria-invalid", valid ? "false" : "true");
        if (!valid && ok) f.focus();
        ok = ok && valid;
      });
      if (!ok) {
        e.preventDefault();
        show("bad", "A few fields still need to be filled in before this can be sent.");
        return;
      }
      if ((form.getAttribute("action") || "#") === "#") {
        e.preventDefault();
        show("ok", "Thank you. Someone from our team will reply by email within two business days.");
        form.reset();
      }
    });
    form.querySelectorAll("input,textarea").forEach(function (f) {
      f.addEventListener("input", function () { f.closest(".form-field").classList.remove("invalid"); });
    });
  }
})();

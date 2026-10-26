/* ==========================================================================
   Valmadre Homes — CRO sections (drop-in)
   cro-sections.js  ·  vanilla JS, no dependencies
   Behaviours: stat counters · reveal-on-scroll · testimonial slider ·
   FAQ accordion · sticky mobile call bar
   ========================================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1 · Reveal-on-scroll
     Adds .vh-in to every .vh-reveal element as it enters the viewport.
  ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll(".vh-reveal");
    if (!items.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("vh-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("vh-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     2 · Stat counters
     Animates [data-vh-count] from 0 to its value when visible.
  ------------------------------------------------------------------ */
  function initCounters() {
    var nums = document.querySelectorAll("[data-vh-count]");
    if (!nums.length) return;

    function animate(el) {
      var target = parseInt(el.getAttribute("data-vh-count"), 10) || 0;
      var suffix = el.getAttribute("data-vh-suffix") || "";
      if (reducedMotion) { el.textContent = target + suffix; return; }
      var duration = 1400;
      var start = null;
      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(easeOutCubic(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     3 · Testimonial slider (single slide, transform-based, swipe-ready)
  ------------------------------------------------------------------ */
  function initTestimonials() {
    var root = document.querySelector("[data-vh-testimonials]");
    if (!root) return;
    var track = root.querySelector(".vh-testi-track");
    var slides = track ? track.children : [];
    var prevBtn = root.querySelector("[data-vh-prev]");
    var nextBtn = root.querySelector("[data-vh-next]");
    var counter = root.querySelector(".vh-testi-count");
    var index = 0;

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function update() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      if (counter) counter.textContent = pad(index + 1) + " / " + pad(slides.length);
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    }
    function go(dir) {
      index = Math.max(0, Math.min(slides.length - 1, index + dir));
      update();
    }
    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

    // basic touch swipe
    var startX = null;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    update();
  }

  /* ------------------------------------------------------------------
     4 · FAQ accordion (single-open, matches the site's plus/minus style)
  ------------------------------------------------------------------ */
  function initFaq() {
    var items = document.querySelectorAll(".vh-faq-item");
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector(".vh-faq-q");
      var panel = item.querySelector(".vh-faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        // close all
        items.forEach(function (other) {
          other.classList.remove("open");
          var b = other.querySelector(".vh-faq-q");
          var p = other.querySelector(".vh-faq-a");
          if (b) b.setAttribute("aria-expanded", "false");
          if (p) p.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     5 · Sticky mobile call bar
     Appears once the visitor scrolls past the first ~70% of viewport.
  ------------------------------------------------------------------ */
  function initCallbar() {
    var bar = document.querySelector(".vh-callbar");
    if (!bar) return;
    document.body.classList.add("vh-has-callbar");
    var shown = false;
    function onScroll() {
      var shouldShow = window.scrollY > window.innerHeight * 0.6;
      if (shouldShow !== shown) {
        shown = shouldShow;
        bar.classList.toggle("vh-show", shown);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function boot() {
    initReveal();
    initCounters();
    initTestimonials();
    initFaq();
    initCallbar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

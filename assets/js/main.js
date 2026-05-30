/* =============================================================
   SAGUARO CABINETRY & DESIGN — Site JS
   ============================================================= */
(function () {
  "use strict";

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open && window.innerWidth <= 1180 ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  document.documentElement.classList.add("js-anim");
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var ans = item.querySelector(".faq__a");
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      ans.style.maxHeight = open ? ans.scrollHeight + "px" : null;
    });
  });

  /* ---- Gallery filter ---- */
  var filterBtns = document.querySelectorAll(".gallery-filters button");
  var items = document.querySelectorAll(".gallery-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      items.forEach(function (it) {
        var show = cat === "all" || it.getAttribute("data-cat") === cat;
        it.classList.toggle("hide", !show);
      });
    });
  });

  /* ---- Lightbox ---- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var stage = lb.querySelector(".lightbox__stage");
    var cap = lb.querySelector(".lightbox__cap");
    var visible = [];
    var idx = 0;

    var build = function () {
      visible = Array.prototype.filter.call(items, function (it) {
        return !it.classList.contains("hide");
      });
    };

    var render = function () {
      var it = visible[idx];
      if (!it) return;
      var img = it.querySelector("img");
      var title = it.getAttribute("data-title") || "";
      var sub = it.getAttribute("data-sub") || "";
      if (img) {
        stage.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || "") + '">';
      } else {
        var ph = it.querySelector(".imgph");
        stage.innerHTML = ph ? ph.outerHTML : "";
      }
      cap.innerHTML = title + (sub ? "<small>" + sub + "</small>" : "");
    };

    var open = function (it) {
      build();
      idx = visible.indexOf(it);
      render();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    var step = function (d) {
      idx = (idx + d + visible.length) % visible.length;
      render();
    };

    items.forEach(function (it) {
      it.addEventListener("click", function () { open(it); });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---- Lead form handling ----
     THIS SITE IS WIRED FOR NETLIFY FORMS.
     When deployed to Netlify, submissions are captured automatically and appear
     under Forms > "contact" in the Netlify dashboard (turn on email/Slack
     notifications there). No third-party service or API key needed.
     If you ever host somewhere other than Netlify, set FALLBACK_EMAIL below and
     the form will open the visitor's email app as a backup.                    */
  var FALLBACK_EMAIL = "hello@saguarocabinets.com"; // backup inbox if not on Netlify

  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    var success = form.parentElement.querySelector(".form-success");

    var setErr = function (field, on) {
      field.classList.toggle("invalid", on);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot — silently drop bots
      var hp = form.querySelector(".honey input");
      if (hp && hp.value) return;

      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var val = (input.value || "").trim();
        var bad = !val;
        if (input.type === "email" && val) {
          bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        if (input.type === "tel" && val) {
          bad = (val.replace(/\D/g, "").length < 7);
        }
        if (field) setErr(field, bad);
        if (bad) ok = false;
      });
      if (!ok) {
        var first = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (first) first.focus();
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      var data = {};
      new FormData(form).forEach(function (v, k) {
        if (k !== "company_website" && k !== "form-name") data[k] = v;
      });
      // URL-encoded body for Netlify (includes form-name + honeypot)
      var encoded = new URLSearchParams(new FormData(form)).toString();

      var done = function () {
        form.style.display = "none";
        if (success) success.classList.add("show");
        if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      var fail = function () {
        // graceful fallback: open email client with the details
        var body = Object.keys(data).map(function (k) {
          return k.replace(/_/g, " ").toUpperCase() + ": " + data[k];
        }).join("%0D%0A");
        window.location.href =
          "mailto:" + FALLBACK_EMAIL +
          "?subject=" + encodeURIComponent("New website inquiry — " + (data.name || "")) +
          "&body=" + body;
        done();
      };

      // Netlify Forms AJAX submission
      fetch(window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded
      })
        .then(function (r) { if (r.ok) { done(); } else { fail(); } })
        .catch(fail)
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });

    // clear error on input
    form.querySelectorAll("input,select,textarea").forEach(function (el) {
      el.addEventListener("input", function () {
        var f = el.closest(".field");
        if (f) f.classList.remove("invalid");
      });
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();

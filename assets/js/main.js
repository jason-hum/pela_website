/* PELA Products — minimal vanilla JS
   1) Mobile nav toggle
   2) Email assembly (light anti-scraping; address is never in the raw HTML) */
(function () {
  "use strict";

  /* ---- Mobile navigation toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after following a link (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Email assembly ----
     Parts are kept separate so the full address never appears as plaintext
     in the served HTML, cutting down on naive scrapers. */
  var user = "inquiries";
  var domain = "pelaproducts.com";
  var address = user + "@" + domain;

  document.querySelectorAll("[data-email]").forEach(function (el) {
    var subject = el.getAttribute("data-subject");
    var href = "mailto:" + address + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    el.setAttribute("href", href);
    // Only replace text if the element asked to display the address
    if (el.hasAttribute("data-email-text")) {
      el.textContent = address;
    }
  });

  /* ---- Video lightbox ----
     Any [data-video-open] trigger opens #video-modal; [data-video-close]
     elements (backdrop, close button) or Escape close it. The video is
     paused and rewound on close so audio never keeps playing in the dark. */
  var modal = document.getElementById("video-modal");
  if (modal) {
    var video = modal.querySelector("video");
    var lastTrigger = null;

    function openModal(trigger) {
      lastTrigger = trigger || null;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      var closeBtn = modal.querySelector(".video-modal__close");
      if (closeBtn) closeBtn.focus();
      if (video && typeof video.play === "function") {
        var p = video.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
      }
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
      if (video) {
        video.pause();
        try { video.currentTime = 0; } catch (e) {}
      }
      if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus();
    }

    document.querySelectorAll("[data-video-open]").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(btn); });
    });

    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-video-close]")) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }
})();

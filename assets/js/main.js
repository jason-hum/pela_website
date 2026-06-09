/* PELA Products — minimal vanilla JS
   0) Shared layout components: <site-header> / <site-footer>
   1) Mobile nav toggle
   2) Email assembly (light anti-scraping; address is never in the raw HTML)
   3) Video lightbox */
(function () {
  "use strict";

  /* ---- Shared layout components --------------------------------------------
     The header and footer are identical on every page, so they live here once
     as custom elements. Each page drops in <site-header current="…"> and
     <site-footer>. Defining the elements upgrades any already-parsed tags
     synchronously, so the markup exists before the wiring further down runs. */
  var NAV = [
    ["index.html",           "Home",            "home"],
    ["applications.html",    "Applications",    "applications"],
    ["description.html",     "Products",        "products"],
    ["how-to-use.html",      "How To Use",      "how-to-use"],
    ["product-reviews.html", "Product Reviews", "product-reviews"],
    ["contact.html",         "Where To Buy",    "contact"]
  ];

  function navList(current) {
    return NAV.map(function (n) {
      var cur = n[2] === current ? ' aria-current="page"' : "";
      return '<li><a href="' + n[0] + '"' + cur + ">" + n[1] + "</a></li>";
    }).join("");
  }

  if ("customElements" in window) {
    customElements.define("site-header", class extends HTMLElement {
      connectedCallback() {
        var current = this.getAttribute("current") || "";
        this.innerHTML =
          '<header class="site-header">' +
          '  <div class="container">' +
          '    <div class="header-inner">' +
          '      <a class="brand" href="index.html" aria-label="PELA Products &mdash; home">' +
          '        <svg class="brand__mark" width="31" height="58" viewBox="0 0 42 78" aria-hidden="true" focusable="false">' +
          '          <path d="M21 0 L42 31 L0 31 Z" fill="#c64544"/>' +
          '          <rect x="0" y="34" width="12" height="44" fill="#dc91b4"/>' +
          '          <rect x="15" y="34" width="12" height="44" fill="#c64544"/>' +
          '          <rect x="30" y="34" width="12" height="44" fill="#dc91b4"/>' +
          "        </svg>" +
          '        <span class="brand__text">' +
          '          <span class="brand__name">PELA</span>' +
          '          <span class="brand__tag">Oil Extractors</span>' +
          "        </span>" +
          "      </a>" +
          '      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">' +
          '        <span class="sr-only">Menu</span>' +
          '        <span class="nav-toggle__bar" aria-hidden="true"></span>' +
          "      </button>" +
          '      <nav id="primary-nav" class="site-nav" aria-label="Primary">' +
          "        <ul>" + navList(current) + "</ul>" +
          "      </nav>" +
          "    </div>" +
          "  </div>" +
          "</header>";
      }
    });

    customElements.define("site-footer", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML =
          '<footer class="site-footer">' +
          '  <div class="container">' +
          '    <div class="footer-card">' +
          '      <div class="footer-inner">' +
          '        <div class="footer-brand">' +
          '          <span class="brand__name">PELA Products</span>' +
          "          <p>Manually operated vacuum pumps for fluid removal &mdash; the quick, easy, clean and environmentally friendly way to change oil.</p>" +
          "        </div>" +
          "        <div>" +
          "          <h4>Pages</h4>" +
          "          <ul>" + navList("") + "</ul>" +
          "        </div>" +
          "        <div>" +
          "          <h4>Contact</h4>" +
          "          <ul>" +
          '            <li><a href="contact.html" data-email data-subject="PELA Products enquiry">Email us</a></li>' +
          '            <li><a href="contact.html">Where to buy</a></li>' +
          "          </ul>" +
          "        </div>" +
          "      </div>" +
          '      <div class="footer-bottom">' +
          '        <span>&copy; <span id="year"></span> PELA Products. All rights reserved.</span>' +
          "        <span>The new way to change oil.</span>" +
          "      </div>" +
          "    </div>" +
          "  </div>" +
          "</footer>";
        var year = this.querySelector("#year");
        if (year) year.textContent = new Date().getFullYear();
      }
    });
  }

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

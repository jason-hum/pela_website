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
})();

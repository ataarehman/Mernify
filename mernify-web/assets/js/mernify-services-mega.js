/**
 * Services mega menu — hover/focus swaps capability panels (desktop + cloned mobile).
 */
(function () {
  function activate(mega, key) {
    if (!mega || !key) return;
    mega.querySelectorAll("[data-svc]").forEach(function (el) {
      var on = el.getAttribute("data-svc") === key;
      el.classList.toggle("is-active", on);
      if (el.classList.contains("mernify-svc-mega__cat")) {
        el.setAttribute("aria-selected", on ? "true" : "false");
      }
    });
  }

  function bindMega(mega) {
    if (!mega || mega.dataset.mernifySvcBound === "1") return;
    mega.dataset.mernifySvcBound = "1";

    mega.querySelectorAll(".mernify-svc-mega__cat").forEach(function (cat) {
      var key = cat.getAttribute("data-svc");
      if (!key) return;

      cat.addEventListener("mouseenter", function () {
        activate(mega, key);
      });
      cat.addEventListener("focus", function () {
        activate(mega, key);
      });
      cat.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 1199px)").matches) {
          if (!cat.classList.contains("is-active")) {
            e.preventDefault();
            activate(mega, key);
          }
        }
      });
    });
  }

  function init() {
    document.querySelectorAll(".mernify-svc-mega").forEach(bindMega);
  }

  function boot() {
    // Wait until main.js has cloned the desktop nav into the offcanvas
    window.setTimeout(init, 0);
  }

  if (window.jQuery) {
    window.jQuery(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

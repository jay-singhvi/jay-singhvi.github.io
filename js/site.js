/* Progressive enhancement for the portfolio. Two independent jobs:
     1. Persist each case-study panel's open/closed state across visits.
     2. Turn the contact form into a prefilled draft in the visitor's mail client.

   The expand/collapse itself is native <details>/<summary> and needs no JS —
   this only remembers the choice. Restoring happens in an inline script in
   index.html (it must run before first paint to avoid a flash); this file owns
   the saving side. */
(function () {
  'use strict';

  /* --- Panel state ------------------------------------------------------ */

  // Must match the key set by the inline restore script in index.html.
  var PANEL_KEY = window.PANEL_STATE_KEY || 'jsp.panels.v1';

  /* Store only states that differ from the markup default (captured by the
     inline script in index.html). A panel returned to its default drops out of
     storage entirely, which means: changing the defaults later still reaches
     returning visitors, and the `toggle` events Chrome fires for parser-set
     `open` attributes on every load are no-ops rather than writes. */
  function savePanel(panel) {
    try {
      var saved = JSON.parse(localStorage.getItem(PANEL_KEY) || '{}');
      var id = panel.getAttribute('data-panel');
      var isDefault = panel.open === (panel.getAttribute('data-default-open') === 'true');

      if (isDefault) delete saved[id];
      else saved[id] = panel.open;

      if (Object.keys(saved).length) localStorage.setItem(PANEL_KEY, JSON.stringify(saved));
      else localStorage.removeItem(PANEL_KEY);
    } catch (e) {
      /* Storage full, disabled, or private mode: the panel still works,
         it just will not be remembered. Not worth surfacing. */
    }
  }

  var panels = document.querySelectorAll('details[data-panel]');
  for (var i = 0; i < panels.length; i++) {
    // <details> fires `toggle` after the state has already changed.
    panels[i].addEventListener('toggle', function (e) {
      savePanel(e.currentTarget);
    });
  }

  /* Links inside a <summary> (the research entry's "View on GitHub") would
     otherwise do two things at once: follow the link AND toggle the panel,
     because toggling is the summary's default activation behaviour. Stopping
     propagation keeps the click from reaching the summary. */
  var summaryLinks = document.querySelectorAll('summary a[href]');
  for (var j = 0; j < summaryLinks.length; j++) {
    summaryLinks[j].addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  /* --- Contact form ----------------------------------------------------- */

  var EMAIL = 'jay.singhvi@outlook.com';
  var form = document.getElementById('contact-form');
  if (!form) return;

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? el.value.trim() : '';
  }

  // The form carries a mailto: action as a no-JS fallback; this supersedes it
  // so the subject line and body can be built properly.
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = val('cf-name');
    var role = val('cf-role');
    var msg = val('cf-msg');

    var subject = role ? 'Portfolio enquiry — ' + role : 'Portfolio enquiry';
    var body = [msg, '', name ? '— ' + name : ''].join('\n').trim();

    window.location.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
})();

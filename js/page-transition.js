document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.body.classList.add('page-loaded');
  }, 100);

  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (!link.href.includes(window.location.hostname) ||
      link.getAttribute('target') === '_blank' ||
      link.getAttribute('rel') === 'noopener noreferrer') {
      return;
    }

    link.addEventListener('click', function (e) {
      if (link.getAttribute('onclick') || link.href.includes('#')) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('page-transitioning');

      setTimeout(function () {
        window.location.href = link.href;
      }, 300);
    });
  });
});
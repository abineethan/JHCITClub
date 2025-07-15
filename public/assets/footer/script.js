document.addEventListener('DOMContentLoaded', function() {
  const footerPath = '/assets/footer/index.html';

  fetch(footerPath)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.text();
    })
    .then(html => {
      const footerDiv = document.getElementById('footer');
      if (footerDiv) {
        footerDiv.innerHTML = html;
        const yearSpan = footerDiv.querySelector('#current-year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      }
    });
});

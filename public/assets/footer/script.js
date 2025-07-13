document.addEventListener('DOMContentLoaded', function() {
  const footerPath = '/assets/footer/index.html';
  console.log('Attempting to fetch footer from:', footerPath);
  
  fetch(footerPath)
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      console.log('Successfully loaded footer HTML');
      const footerDiv = document.getElementById('footer');
      
      if (footerDiv) {
        footerDiv.innerHTML = html;
        const yearSpan = footerDiv.querySelector('#current-year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      } else {
        console.warn('Footer container element not found');
      }
    })
    .catch(error => {
      console.log('Footer load attempt:', error.message);
      const fallbackHTML = `
        <footer style="
          background: #1e293b;
          color: white;
          padding: 2rem;
          text-align: center;
          margin-top: 2rem;
        ">
          <p>© ${new Date().getFullYear()} JHC IT Club</p>
          ${error.message.includes('404') ? 
            '<small>Footer resource missing</small>' : 
            '<small>Temporary footer display</small>'}
        </footer>
      `;
      document.body.insertAdjacentHTML('beforeend', fallbackHTML);
    });
});
  const filterButtons = document.querySelectorAll('.filter-btn');
  const mobileFilterSelect = document.getElementById('mobile-filter-select');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filterValue = button.getAttribute('data-filter');
      filterProjects(filterValue);
      mobileFilterSelect.value = filterValue;
    });
  });
  

  mobileFilterSelect.addEventListener('change', () => {
    const filterValue = mobileFilterSelect.value;
    filterProjects(filterValue);
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
    });
  });
  
  function filterProjects(filterValue) {
    projectItems.forEach(item => {
      item.classList.toggle('hide', 
        filterValue !== 'all' && item.getAttribute('data-category') !== filterValue
      );
    });
  }
  

  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
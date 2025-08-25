(() => {
  'use strict';

  // Fetch all forms marked with .needs-validation
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();  // stop form submission
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

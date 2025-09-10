document.addEventListener('DOMContentLoaded', function () {
  const selectWrapper = document.querySelector('.select-wrapper');
  if (!selectWrapper) return;

  const nativeSelect = selectWrapper.querySelector('.cmb');
  const customSelect = document.createElement('div');
  customSelect.className = 'custom-select';
  selectWrapper.appendChild(customSelect);

  const customTrigger = document.createElement('div');
  customTrigger.className = 'custom-select-trigger';
  customSelect.appendChild(customTrigger);

  const customOptions = document.createElement('div');
  customOptions.className = 'custom-options';
  customSelect.appendChild(customOptions);

  // --- 1. Create Search Input ---
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'custom-select-search';
  searchInput.placeholder = 'Search chapters...';
  customOptions.appendChild(searchInput);

  // --- 2. Populate Custom Options & Set Current ---
  let currentOptionDiv = null;
  // Use the full href for a reliable comparison
  const currentPageUrl = window.location.href;

  Array.from(nativeSelect.options).forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'custom-option';
    optionDiv.textContent = option.textContent;
    optionDiv.dataset.value = option.value;

    // Set the current page as selected by comparing full URLs
    if (option.value === currentPageUrl) {
      customTrigger.textContent = option.textContent;
      optionDiv.classList.add('is-selected');
      currentOptionDiv = optionDiv;
    }

    optionDiv.addEventListener('click', () => {
      // Navigate using the full URL from the data attribute
      window.location.href = optionDiv.dataset.value;
    });

    customOptions.appendChild(optionDiv);
  });

  // --- 3. Event Listeners ---
  customTrigger.addEventListener('click', (e) => {
    // Stop the window click listener from firing immediately
    e.stopPropagation();
    customSelect.classList.toggle('is-open');
    selectWrapper.classList.toggle('is-open'); // For arrow rotation
    if (customSelect.classList.contains('is-open')) {
      searchInput.focus(); // Focus search bar on open
      if (currentOptionDiv) {
        // Scroll the selected option into view
        currentOptionDiv.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();
    const options = customOptions.querySelectorAll('.custom-option');
    options.forEach(opt => {
      const text = opt.textContent.toLowerCase();
      opt.style.display = text.includes(filter) ? '' : 'none';
    });
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove('is-open');
      selectWrapper.classList.remove('is-open');
    }
  });

  // Hide the original select box
  nativeSelect.style.display = 'none';
});
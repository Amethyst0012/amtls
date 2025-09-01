document.addEventListener('DOMContentLoaded', function() {
  const newBtn = document.getElementById('newBtn');
  const oldBtn = document.getElementById('oldBtn');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const chaptersList = document.getElementById('chaptersList');

  let isExpanded = false;

  // --- Sorting function ---
  function sortChapters(order) {
    const allLinks = Array.from(chaptersList.querySelectorAll('a')); // keep <a> wrappers intact

    // Sort by title text
    allLinks.sort((a, b) => {
      const titleA = a.querySelector('.chapters-title').textContent.trim().toLowerCase();
      const titleB = b.querySelector('.chapters-title').textContent.trim().toLowerCase();
      if (order === 'new') {
        return titleB.localeCompare(titleA); // Z → A
      } else {
        return titleA.localeCompare(titleB); // A → Z
      }
    });

    // Clear list
    chaptersList.innerHTML = '';

    // Visible container
    const newVisibleContainer = document.createElement('div');
    // Hidden container
    const newHiddenContainer = document.createElement('div');
    newHiddenContainer.className = 'hidden-chapters';
    if (isExpanded) newHiddenContainer.classList.add('show');

    // First 9 visible
    for (let i = 0; i < Math.min(9, allLinks.length); i++) {
      const link = allLinks[i];
      link.querySelector('.chapters-item').classList.remove('hidden');
      newVisibleContainer.appendChild(link);
    }

    // Remaining hidden
    for (let i = 9; i < allLinks.length; i++) {
      const link = allLinks[i];
      link.querySelector('.chapters-item').classList.add('hidden');
      newHiddenContainer.appendChild(link);
    }

    chaptersList.appendChild(newVisibleContainer);
    if (newHiddenContainer.children.length > 0) {
      chaptersList.appendChild(newHiddenContainer);
    }

    // Update button state
    if (showMoreBtn) {
      if (isExpanded) {
        showMoreBtn.classList.add('expanded');
      } else {
        showMoreBtn.classList.remove('expanded');
      }
    }

    // Save sort order
    localStorage.setItem('chapterSortOrder', order);
  }

  // --- Button bindings ---
  if (newBtn) {
    newBtn.addEventListener('click', function() {
      newBtn.classList.add('active');
      oldBtn.classList.remove('active');
      sortChapters('new');
    });
  }

  if (oldBtn) {
    oldBtn.addEventListener('click', function() {
      oldBtn.classList.add('active');
      newBtn.classList.remove('active');
      sortChapters('old');
    });
  }

  // --- Show more button ---
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      const hiddenChaptersContainer = document.querySelector('.hidden-chapters');
      if (hiddenChaptersContainer) {
        if (isExpanded) {
          hiddenChaptersContainer.classList.remove('show');
          showMoreBtn.classList.remove('expanded');
          isExpanded = false;
        } else {
          hiddenChaptersContainer.classList.add('show');
          showMoreBtn.classList.add('expanded');
          isExpanded = true;
        }
      }
    });
  }

  // --- Initialize sort from localStorage ---
  const savedOrder = localStorage.getItem('chapterSortOrder') || 'new';
  if (savedOrder === 'new') {
    newBtn.classList.add('active');
    oldBtn.classList.remove('active');
  } else {
    oldBtn.classList.add('active');
    newBtn.classList.remove('active');
  }
  sortChapters(savedOrder);
});

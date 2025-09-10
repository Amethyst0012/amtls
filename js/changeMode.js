// Apply saved settings when the page loads
document.addEventListener('DOMContentLoaded', function () {
	applySavedTheme();
	applySavedFontSize();
});

function applySavedTheme() {
	const savedTheme = localStorage.getItem('theme') || 'night'; // Default to night mode
	const contentArea = document.getElementById('content');
	const btn = document.getElementsByName("btn4")[0];

	if (!contentArea) return;

	if (savedTheme === 'day') {
		contentArea.classList.add('day-mode');
		contentArea.classList.remove('night-mode');
		if (btn) btn.textContent = "☀️"; // Minimalist sun
	} else {
		contentArea.classList.add('night-mode');
		contentArea.classList.remove('day-mode');
		if (btn) btn.textContent = "🌙"; // Minimalist moon
	}
}

function applySavedFontSize() {
	const savedSize = localStorage.getItem('fontSize');
	const contentArea = document.getElementById('content');

	if (savedSize && contentArea) {
		contentArea.style.fontSize = savedSize;
	}
}

// Change Font Size
function changeFontSize(change) {
	const contentArea = document.getElementById("content");
	if (!contentArea) return;

	let newSize;
	if (change === 0) {
		newSize = '16px'; // Reset to default
	} else {
		const currentSize = parseFloat(window.getComputedStyle(contentArea).fontSize);
		newSize = (currentSize + change) + 'px';
	}
	contentArea.style.fontSize = newSize;
	localStorage.setItem('fontSize', newSize); // Save the new size
}

// Change Day/Night Mode
function changeWrapColor() {
	const contentArea = document.getElementById('content');
	if (!contentArea) return;

	// Toggle classes
	contentArea.classList.toggle("night-mode");
	contentArea.classList.toggle("day-mode");

	// Check the new mode and save it
	const isDayMode = contentArea.classList.contains('day-mode');
	localStorage.setItem('theme', isDayMode ? 'day' : 'night');

	// Update button icon
	const btn = document.getElementsByName("btn4")[0];
	if (btn) {
		btn.textContent = isDayMode ? "☀️" : "🌙";
	}
}
// =================================
// NAVBAR DROPDOWN
// =================================
function navbarDropdown() {
	document.getElementById("novelDropdown").classList.toggle("show");
}

window.onclick = function (e) {
	if (!e.target.matches('.dropbtn')) {
		var novelDropdown = document.getElementById("novelDropdown");
		if (novelDropdown && novelDropdown.classList.contains('show')) {
			novelDropdown.classList.remove('show');
		}
	}
}
// Select necessary elements
const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggles = body.querySelectorAll(".toggle"), // Select all toggle buttons
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Function to toggle sidebar
const toggleSidebar = (event) => {
    event.preventDefault(); // Prevent default action for <a> tags
    sidebar.classList.toggle("close");
};

// Attach event listeners to all toggle buttons
toggles.forEach(toggle => {
    toggle.addEventListener("click", toggleSidebar);
});

// Event listener for the search button to ensure the sidebar opens
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        sidebar.classList.remove("close");
    });
}

// Event listener for the mode switch
if (modeSwitch && modeText) {
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light Mode"; // Update text as needed
        } else {
            modeText.innerText = "Dark Mode"; // Update text as needed
        }
    });
}

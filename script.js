document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.getElementById('exploreBtn');
    const exploreDropdown = document.getElementById('exploreDropdown');

    // Verification check: ensure both elements physically exist on current page loading instance
    if (exploreBtn && exploreDropdown) {
        
        // Listen for a direct user click event trigger
        exploreBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Stops click event bubble from closing menu immediately
            
            // Toggle the visibility state class inside classList array sequence
            exploreDropdown.classList.toggle('show');
            
            // Manage accessibility attributes dynamically
            const isMenuOpen = exploreDropdown.classList.contains('show');
            exploreBtn.setAttribute('aria-expanded', isMenuOpen);
        });

        // Close the active drop container window instantly if clicking elsewhere on screen background
        document.addEventListener('click', (event) => {
            if (!exploreBtn.contains(event.target) && !exploreDropdown.contains(event.target)) {
                exploreDropdown.classList.remove('show');
                exploreBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
// Append this code directly inside your main DOMContentLoaded event loop in script.js
const searchInput = document.getElementById('navbarSearchInput');
const suggestionsBox = document.getElementById('searchSuggestionsBox');
const searchForm = document.getElementById('navbarSearchForm');

if (searchInput && suggestionsBox) {
    
    // 1. LISTEN FOR REAL-TIME INPUT EVENTS AS THE USER TYPES
    searchInput.addEventListener('input', () => {
        const queryText = searchInput.value.toLowerCase().trim();
        
        // Hide box instantly if query value field text remains empty or small
        if (queryText.length < 1) {
            suggestionsBox.classList.remove('active');
            suggestionsBox.innerHTML = "";
            return;
        }

        suggestionsBox.innerHTML = ""; // Clear out previous searches matches 
        let matchingResultsFound = false;

        // 2. SCAN THE GLOBAL CONTENT MODULE OBJECT (polSciDatabase from data.js)
        for (const topicKey in polSciDatabase) {
            const topic = polSciDatabase[topicKey];
            
            // Check if title or document keywords match query input values text
            if (topic.title.toLowerCase().includes(queryText)) {
                matchingResultsFound = true;

                // Create clickable dynamic layout link element block
                const itemNode = document.createElement('div');
                itemNode.classList.add('suggestion-item');
                
                itemNode.innerHTML = `
                    <span class="suggestion-title">${topic.title}</span>
                    <span class="suggestion-type">${topic.documentType || 'Study Notes'}</span>
                `;

                // Handle routing action clicks to send student directly to topic
                itemNode.addEventListener('click', () => {
                    window.location.href = `reading.html?topic=${topicKey}`;
                });

                suggestionsBox.appendChild(itemNode);
            }
        }

        // Toggle visibility modifier rule based on query findings matrices
        if (matchingResultsFound) {
            suggestionsBox.classList.add('active');
        } else {
            suggestionsBox.classList.remove('active');
        }
    });

    // 3. SECURE CLOSURE BOUNDARY: Hide menu if student clicks anywhere else on background screen canvas
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.classList.remove('active');
        }
    });

    // 4. PREVENT RELOAD DISRUPTIONS UPON HITTING ENTER KEYBOARD TRIGGERS
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
}


    // 1. DETAILED LEGAL CONTENT REPOSITORY
    
   // Keep the overlay functionality ONLY for your Terms & Conditions button
const termsBtn = document.getElementById("termsBtn");
const closeLegalBtn = document.getElementById("closeLegalBtn");
const legalOverlay = document.getElementById("legalOverlay");
const legalTitle = document.getElementById("legalTitle");
const legalContent = document.getElementById("legalContent");

if (termsBtn) {
    termsBtn.addEventListener("click", function() {
        legalOverlay.style.display = "flex";
        legalTitle.innerText = "Terms & Conditions";
        legalContent.innerHTML = "<p>Your terms and conditions text layout goes right here...</p>";
    });
}

if (closeLegalBtn) {
    closeLegalBtn.addEventListener("click", function() {
        legalOverlay.style.display = "none";
    });
}

    // 2. TOGGLE ACTION EVENT LISTENERS
    if (privacyBtn && legalOverlay) {
        privacyBtn.addEventListener('click', () => {
            legalTitle.innerText = "Privacy Policy";
            legalContent.innerHTML = privacyDetails;
            legalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    }

    if (termsBtn && legalOverlay) {
        termsBtn.addEventListener('click', () => {
            legalTitle.innerText = "Terms & Conditions";
            legalContent.innerHTML = termsDetails;
            legalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // 3. CLOSURE MECHANICS
    if (closeLegalBtn && legalOverlay) {
        closeLegalBtn.addEventListener('click', () => {
            legalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scroll frame
        });

        // Close if click lands anywhere outside the white text card boundaries
        legalOverlay.addEventListener('click', (e) => {
            if (e.target === legalOverlay) {
                legalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

// ========================================================
// NAVBAR OVERLAY SLIDEOUT SIDEBAR ENGINE
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('navbarSidebarToggle');
    const closeBtn = document.getElementById('navSidebarClose');
    const sidebarMenu = document.getElementById('navStudySidebar');
    const dimOverlay = document.getElementById('sidebarOverlay');

    if (triggerBtn && sidebarMenu && dimOverlay) {
        
        // Open Sidebar Layout Event Function
        function openSidebar() {
            sidebarMenu.classList.remove('collapsed');
            dimOverlay.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Lock homepage body background frames from scrolling
        }

        // Close Sidebar Layout Event Function
        function closeSidebar() {
            sidebarMenu.classList.add('collapsed');
            dimOverlay.classList.remove('visible');
            document.body.style.overflow = ''; // Unlock home layout window frames scroll boundaries
        }

        // Connect Interactive Listeners
        triggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeSidebar);
        }

        // Close instantly if student clicks anywhere on the dark background overlay tint canvas
        dimOverlay.addEventListener('click', closeSidebar);

        // Close menu immediately if user hits the physical keyboard ESC trigger
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
    }
});

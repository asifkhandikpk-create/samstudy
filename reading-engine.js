// ==========================================
// 1. SETUP & URL READING (Declared ONLY ONCE)
// ==========================================
const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

// ==========================================
// 2. DATA CHECK & RENDERING INTERFACE
// ==========================================
if (!topic || !polSciDatabase[topic]) {
    document.getElementById("documentTitle").textContent = "Document Not Found";
    document.getElementById("documentContentBody").innerHTML = "<p>This topic doesn't exist.</p>";
    document.getElementById("prevPageBtn").style.display = "none";
    document.getElementById("nextPageBtn").style.display = "none";
} else {
    // Fetch target topic details from your database
    const note = polSciDatabase[topic];
    
    // Set page header
    document.getElementById("documentTitle").textContent = note.title;

    const body = document.getElementById("documentContentBody");
    body.innerHTML = ""; // Clear existing templates

    // Loop through elements and generate output layout dynamically
    note.sections.forEach(section => {
        if (section.type === "textBlock") {
            body.innerHTML += `
                <h2 class="mcq-question">${section.subHeading}</h2>
                <p class="mcq-option">${section.pText}</p>
            `;
        }
        if (section.type === "listBlock") {
            let list = `<h2 class="mcq-question">${section.subHeading}</h2><ul>`;
            section.bulletPoints.forEach(point => {
                list += `<li class="mcq-option">${point}</li>`;
            });
            list += "</ul>";
            body.innerHTML += list;
        }
    });

    // ==========================================
    // 3. SEQUENTIAL NAVIGATION LOGIC
    // ==========================================
    const topicKeys = Object.keys(polSciDatabase); 
    const currentTopicIndex = topicKeys.indexOf(topic); 

    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");

    // Previous Button Action
    if (currentTopicIndex > 0) {
        const prevTopicName = topicKeys[currentTopicIndex - 1];
        prevBtn.style.display = "inline-block";
        prevBtn.onclick = function() {
            window.location.search = `?topic=${prevTopicName}`;
        };
    } else {
        prevBtn.style.display = "none";
    }

    // Next Button Action
    if (currentTopicIndex >= 0 && currentTopicIndex < topicKeys.length - 1) {
        const nextTopicName = topicKeys[currentTopicIndex + 1];
        nextBtn.style.display = "inline-block"; 
        nextBtn.onclick = function() {
            window.location.search = `?topic=${nextTopicName}`;
        };
    } else {
        nextBtn.style.display = "none";
    }
}
// ==========================================
// AUTOMATED PDF EXPORT ENGINE LOGIC
// ==========================================
const downloadButton = document.getElementById("downloadPdfBtn");

if (downloadButton) {
    downloadButton.addEventListener("click", function() {
        // Target the main reading text wrapper container boundary element
        const elementToPrint = document.getElementById("pdfPrintArea");
        
        // Grab the active page heading text name safely to title our saved file
        const currentTitle = document.getElementById("documentTitle").textContent || "Political_Science_Notes";
        const cleanFileName = currentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();

        // Configure the structural output parameter profiles for the PDF builder
        const configurationOptions = {
            margin: 15, // Top, Left, Bottom, Right layout canvas spacing 
            filename:     `${cleanFileName}_notes.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false }, // High resolution export scaling 
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } // Standard portrait configuration
        };

        // Temporarily disable any visual focus properties while saving file structure layout
        downloadButton.innerText = "Downloading...";
        downloadButton.style.opacity = "0.7";
        downloadButton.disabled = true;

        // Run the conversion promise routine loop instantly
        html2pdf().set(configurationOptions).from(elementToPrint).save().then(() => {
            // Restore button properties immediately back to functional state once saved
            downloadButton.innerHTML = " <span>Download PDF</span>";
            downloadButton.style.opacity = "1";
            downloadButton.disabled = false;
        }).catch(err => {
            console.error("PDF generation failed completely:", err);
            alert("Error downloading notes as a PDF sheet. Check developer console diagnostics.");
            downloadButton.innerHTML = " <span>Download PDF</span>";
            downloadButton.disabled = false;
        });
    });
}


// ==========================================
// INTEGRATED READING-ENGINE SEARCH LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('navbarSearchInput');
    const suggestionsBox = document.getElementById('suggestions_listbox');

    // Verify search components exist on the current page view layout
    if (!searchInput || !suggestionsBox) {
        console.log("Search elements not found on this page layout view.");
        return;
    }

    // 1. LISTEN FOR REAL-TIME INPUT EVENTS AS THE USER TYPES
    searchInput.addEventListener('input', () => {
        const queryText = searchInput.value.toLowerCase().trim();
        
        // Hide box instantly if query value field text remains empty or small
        if (queryText.length < 1) {
            hideSuggestions();
            return;
        }

        suggestionsBox.innerHTML = ""; // Clear out previous searches matches 
        let matchingResultsFound = false;

        // Double check database object availability within the engine scope
        if (typeof polSciDatabase === 'undefined') {
            console.error("Critical Error: polSciDatabase is missing from data.js context.");
            return;
        }

        // 2. SCAN THE GLOBAL CONTENT MODULE OBJECT (polSciDatabase from data.js)
        for (const topicKey in polSciDatabase) {
            const topic = polSciDatabase[topicKey];
            
            // Check if title or document keywords match query input values text
            if (topic.title && topic.title.toLowerCase().includes(queryText)) {
                matchingResultsFound = true;

                // Create clickable dynamic layout link element block (li tag for ul box container)
                const itemNode = document.createElement('li');
                itemNode.classList.add('suggestion-item');
                itemNode.setAttribute('role', 'option');
                
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
            showSuggestions();
        } else {
            hideSuggestions();
        }
    });

    // 3. SECURE CLOSURE BOUNDARY: Hide menu if student clicks anywhere else on background screen canvas
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            hideSuggestions();
        }
    });

    // Helper functions to override the inline style="display: none;" on reading.html
    function showSuggestions() {
        suggestionsBox.style.display = 'block'; 
        suggestionsBox.classList.add('active');
        searchInput.setAttribute('aria-expanded', 'true');
    }

    function hideSuggestions() {
        suggestionsBox.style.display = 'none';
        suggestionsBox.classList.remove('active');
        suggestionsBox.innerHTML = "";
        searchInput.setAttribute('aria-expanded', 'false');
    }
});

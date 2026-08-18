// ==========================================
// 1. MOBILE VIEWS & FLUID VIEWPORTS
// ==========================================
function fixMobileLayout() {
  if (window.innerWidth <= 768) {
    const container = document.getElementById('documentContentBody');
    if (container) {
      container.style.width = '100%';
      container.style.maxWidth = '100%';
      container.style.padding = '0px'; 
    }
  }
}

window.addEventListener('DOMContentLoaded', fixMobileLayout);
window.addEventListener('resize', fixMobileLayout);

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

// ==========================================
// 2. DATA CHECK & CONTINUOUS
// ==========================================
if (!topic || !polSciDatabase[topic]) {
    document.getElementById("documentTitle").textContent = "Document Not Found";
    document.getElementById("documentContentBody").innerHTML = "<p>This topic doesn't exist.</p>";
} else {
    const note = polSciDatabase[topic];
    document.getElementById("documentTitle").textContent = note.title;

    const body = document.getElementById("documentContentBody");
    body.innerHTML = ""; 

    const visualStyles = document.createElement("style");
    visualStyles.innerHTML = `
        .scribd-page-sheet {
            background: #ffffff;
            max-width: 820px;
            margin: 0 auto 24px auto; /* Margin between the pages */
            padding: 50px 50px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.04);
            border: 1px solid #eef0f2;
            box-sizing: border-box;
        }
        @media (max-width: 768px) {
            .scribd-page-sheet {
                margin: 0 0 12px 0;
                padding: 25px 20px;
                box-shadow: none;
                border-left: none;
                border-right: none;
                border-radius: 0;
            }
        }
    `;
    document.head.appendChild(visualStyles);

    note.sections.forEach((section, index) => {
        const sheetElement = document.createElement("div");
        sheetElement.className = "page-sheet";

        let sheetHTML = "";

        if (index === 0) {
            sheetHTML += `<h1 style="font-family: Arial, sans-serif; font-size: 28px; color: #111; margin-bottom: 30px; border-bottom: 2px solid #eaeaea; padding-bottom: 15px;">${note.title}</h1>`;
        }

        if (section.type === "textBlock") {
            sheetHTML += `
                <h2 class="mcq-question" style="font-size: 20px; color: #222; margin-bottom: 12px; font-family: sans-serif;">${section.subHeading}</h2>
                <p class="mcq-option" style="font-size: 16px; line-height: 1.6; color: #444; font-family: 'Georgia', serif;">${section.pText}</p>
            `;
        }
        
        if (section.type === "listBlock") {
            sheetHTML += `
                <h2 class="mcq-question" style="font-size: 20px; color: #222; margin-bottom: 12px; font-family: sans-serif;">${section.subHeading}</h2>
                <ul style="padding-left: 20px; margin: 0;">`;
            section.bulletPoints.forEach(point => {
                sheetHTML += `<li class="mcq-option" style="font-size: 16px; line-height: 1.6; color: #444; font-family: 'Georgia', serif; margin-bottom: 8px;">${point}</li>`;
            });
            sheetHTML += "</ul>";
        }

        sheetElement.innerHTML = sheetHTML;
        body.appendChild(sheetElement);
    });

    const topicKeys = Object.keys(polSciDatabase); 
    const currentTopicIndex = topicKeys.indexOf(topic); 

    if (currentTopicIndex >= 0 && currentTopicIndex < topicKeys.length - 1) {
        const nextTopicName = topicKeys[currentTopicIndex + 1];
        const topicsGate = document.createElement("div");
        topicsGate.style.cssText = "text-align: center; padding: 50px 20px;";
        topicsGate.innerHTML = `
            <button id="gateNextTopicBtn" style="background: #0056b3; color: white; border: none; padding: 12px 35px; font-size: 15px; font-weight: bold; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                Continue to Next Topic →
            </button>
        `;
        body.appendChild(topicsGate);

        document.getElementById("gateNextTopicBtn").onclick = function() {
            window.location.search = `?topic=${nextTopicName}`;
        };
    } else {
        const finishedLabel = document.createElement("p");
        finishedLabel.style.cssText = "text-align: center; font-weight: bold; padding: 40px; color: #28a745; font-family: sans-serif;";
        finishedLabel.textContent = "🏆 You have scrolled through and completed all reading materials!";
        body.appendChild(finishedLabel);
    }

    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
}

// ==========================================
// 3. COMPLETE WEB DOCUMENT DOWNLOADER (.HTML)
// ==========================================
const navbarWordDownloadButton = document.getElementById("navbarDownloadDocBtn");

function triggerHTMLDocumentDownload() {
    if (!topic || !polSciDatabase[topic]) return;

    const note = polSciDatabase[topic];
    const cleanFileName = note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    let fullNotesContentHtml = `<h1>${note.title}</h1>`;
    note.sections.forEach(section => {
        if (section.type === "textBlock") {
            fullNotesContentHtml += `
                <h2>${section.subHeading}</h2>
                <p>${section.pText}</p>
            `;
        }
        if (section.type === "listBlock") {
            fullNotesContentHtml += `<h2>${section.subHeading}</h2><ul>`;
            section.bulletPoints.forEach(point => {
                fullNotesContentHtml += `<li>${point}</li>`;
            });
            fullNotesContentHtml += "</ul>";
        }
    });

    const standAloneHtmlDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${note.title}</title>
            <style>
                body { max-width: 760px; margin: 40px auto; padding: 0 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f8f9fa; }
                .offline-card { background: white; padding: 40px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
                h1 { border-bottom: 2px solid #0056b3; padding-bottom: 10px; color: #0056b3; font-size: 26px; }
                h2 { color: #222; margin-top: 30px; font-size: 19px; }
                p, li { font-size: 16px; color: #444; font-family: Georgia, serif; }
                li { margin-bottom: 8px; }
                @media (max-width: 600px) { body { margin: 10px auto; padding: 0 10px; } .offline-card { padding: 20px; } }
            </style>
        </head>
        <body>
            <div class="offline-card">
                ${fullNotesContentHtml}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', standAloneHtmlDoc], { type: 'text/html' });
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${cleanFileName}_complete_document.html`;
    
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

if (navbarWordDownloadButton) {
    navbarWordDownloadButton.addEventListener("click", triggerHTMLDocumentDownload);
}

// ==========================================
// 4. INTEGRATED READING-ENGINE SEARCH LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('navbarSearchInput');
    const suggestionsBox = document.getElementById('suggestions_listbox');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', () => {
        const queryText = searchInput.value.toLowerCase().trim();
        if (queryText.length < 1) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.style.display = "none";
            return;
        }

        suggestionsBox.innerHTML = ""; 
        if (typeof polSciDatabase === 'undefined') return;

        let matchingResultsFound = false;

        for (const topicKey in polSciDatabase) {
            const topicData = polSciDatabase[topicKey];
            if (topicData.title && topicData.title.toLowerCase().includes(queryText)) {
                matchingResultsFound = true;
                const itemNode = document.createElement('li');
                itemNode.classList.add('suggestion-item');
                itemNode.innerHTML = `
                    <span class="suggestion-title">${topicData.title}</span>
                    <span class="suggestion-type">${topicData.documentType || 'Study Notes'}</span>
                `;
                itemNode.addEventListener('click', () => {
                    window.location.href = `reading.html?topic=${topicKey}`;
                });
                suggestionsBox.appendChild(itemNode);
            }
        }
        
        // Dynamic visibility logic toggle
        if (matchingResultsFound) {
            suggestionsBox.style.display = "block";
        } else {
            suggestionsBox.style.display = "none";
        }
    });
});

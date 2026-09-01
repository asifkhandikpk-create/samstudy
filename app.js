/**
 * app.js
 * Controls multi-type block node rendering loops and interactive keywords search queries.
 */

document.addEventListener('DOMContentLoaded', () => {
    const sheetsContainer = document.getElementById('sheetsContainer');
    const searchInput = document.getElementById('navbarSearchInput');
    const mainNotebookTitle = document.getElementById('mainNotebookTitle');
    const exportBtn = document.getElementById('exportBtn');

    function renderWorkspace() {
        sheetsContainer.innerHTML = ''; 

        // Fetch data record payload mapped inside state.js
        const databaseRecord = NoteState.getNotes();

        if (!databaseRecord || !databaseRecord.sections) {
            sheetsContainer.innerHTML = `
                <div class="scribd-page-sheet" style="text-align:center;">
                    <h3>Topic Not Found</h3>
                    <p>The requested study module notes could not be fetched from the reference matrix database.</p>
                </div>`;
            return;
        }

        // Apply metadata header title properties smoothly
        mainNotebookTitle.innerText = databaseRecord.title;

        // Process sections arrays into designated HTML structures
        databaseRecord.sections.forEach(section => {
            appendSectionCard(section);
        });
    }

    function appendSectionCard(section) {
        const sheet = document.createElement('div');
        sheet.className = 'scribd-page-sheet';

        // 1. Build Sub-Heading Block Element markup
        let cardContent = `<h3>${section.subHeading}</h3>`;

        // 2. Conditionally append elements according to validation block type criteria
        if (section.type === "textBlock") {
            cardContent += `<p>${section.pText}</p>`;
        } 
        else if (section.type === "listBlock" && section.bulletPoints) {
            cardContent += `<ul>`;
            section.bulletPoints.forEach(point => {
                cardContent += `<li>${point}</li>`;
            });
            cardContent += `</ul>`;
        }

        sheet.innerHTML = cardContent;
        sheetsContainer.appendChild(sheet);
    }

    // Keyword interactive filter search listener
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const sheets = document.querySelectorAll('.scribd-page-sheet');

        sheets.forEach(sheet => {
            const textMatch = sheet.innerText.toLowerCase();
            sheet.style.display = textMatch.includes(query) ? 'block' : 'none';
        });
    });

    // Plaintext structured text backup transmission file stream generator
    if (exportBtn) {
        exportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const databaseRecord = NoteState.getNotes();
            if (!databaseRecord) return;

            let fileBuffer = `=== ${databaseRecord.title.toUpperCase()} ===\n`;
            fileBuffer += `Document Type: ${databaseRecord.documentType}\n`;
            fileBuffer += `Institution: ${databaseRecord.institution}\n`;
            fileBuffer += `Academic Year: ${databaseRecord.academicYear}\n`;
            fileBuffer += `--------------------------------------------------\n\n`;

            databaseRecord.sections.forEach(section => {
                fileBuffer += `${section.subHeading.toUpperCase()}\n\n`;
                
                if (section.type === "textBlock") {
                    const cleanText = section.pText.replace(/<br\s*\/?>/gi, '\n');
                    fileBuffer += `${cleanText}\n`;
                } else if (section.type === "listBlock" && section.bulletPoints) {
                    section.bulletPoints.forEach(point => {
                        const cleanPoint = point.replace(/<[^>]*>/g, '');
                        fileBuffer += `• ${cleanPoint}\n`;
                    });
                }
                fileBuffer += `\n==================================================\n\n`;
            });

            const blob = new Blob([fileBuffer], { type: 'text/plain;charset=utf-8' });
            const triggerLink = document.createElement('a');
            triggerLink.href = URL.createObjectURL(blob);
            triggerLink.download = `notes-export-${databaseRecord.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
            
            document.body.appendChild(triggerLink);
            triggerLink.click();
            document.body.removeChild(triggerLink);
        });
    }

    renderWorkspace();
});

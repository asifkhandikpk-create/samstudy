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
function setRealHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setRealHeight);
window.addEventListener('load', setRealHeight);
const quizData = [
    {
        question: "Which political philosopher famously described life in the state of nature as 'solitary, poor, nasty, brutish, and short'?",
        options: [{ text: "John Locke", isCorrect: false }, { text: "Thomas Hobbes", isCorrect: true }, { text: "Jean-Jacques Rousseau", isCorrect: false }, { text: "Niccolò Machiavelli", isCorrect: false }],
        explanation: "Thomas Hobbes argued this in Leviathan (1651). He believed a strong government is vital to prevent chaotic civil war."
    },
    {
        question: "What term describes a modern political system managed completely by digital code and machine algorithms?",
        options: [{ text: "Oligarchy", isCorrect: false }, { text: "Algocracy", isCorrect: true }, { text: "Technocracy", isCorrect: false }, { text: "Plutocracy", isCorrect: false }],
        explanation: "Algocracy is governance where machine algorithms structure public administrative decisions and regulations."
    },
    {
        question: "Who authored 'The Prince', a foundational text on political realism and strategic statecraft?",
        options: [{ text: "Aristotle", isCorrect: false }, { text: "Karl Marx", isCorrect: false }, { text: "Niccolò Machiavelli", isCorrect: true }, { text: "Plato", isCorrect: false }],
        explanation: "Niccolò Machiavelli wrote The Prince, separating traditional ethics from real-world political power strategies."
    },
    {
        question: "Max Weber's concept of 'Rational-Legal Authority' is most closely associated with which structural concept?",
        options: [{ text: "Feudal Monarchy", isCorrect: false }, { text: "Modern Bureaucracy", isCorrect: true }, { text: "Charismatic Dictatorship", isCorrect: false }, { text: "Tribal Chiefdoms", isCorrect: false }],
        explanation: "Max Weber identified modern bureaucracy as the ultimate example of rational-legal authority ruling through written laws."
    },
    {
        question: "Which subfield of political science primarily compares different national constitutional frameworks and party systems?",
        options: [{ text: "International Relations", isCorrect: false }, { text: "Comparative Politics", isCorrect: true }, { text: "Public Policy", isCorrect: false }, { text: "Political Philosophy", isCorrect: false }],
        explanation: "Comparative Politics focuses on evaluating internal country mechanics, party elections, and constitutional behaviors across state boundaries."
    }
];

let questionsAnsweredCount = 0;
let currentActiveQuestion = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initQuiz() {
    questionsAnsweredCount = 0;
    document.getElementById('question-counter').innerText = `Completed: ${questionsAnsweredCount}`;
    shuffleArray(quizData);
    getNewRandomQuestion();
}

function getNewRandomQuestion() {
    if (questionsAnsweredCount >= 500) {
        alert("Evaluation complete. You have reached the maximum safe session limit of 500 questions!");
        initQuiz();
        return;
    }

    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentActiveQuestion = quizData[randomIndex];
    
    document.getElementById('trivia-question').innerText = currentActiveQuestion.question;
    
    const optionsContainer = document.getElementById('trivia-options');
    optionsContainer.innerHTML = '';
    
    document.getElementById('trivia-explanation').className = "appendix-box hidden";
    document.getElementById('next-btn').classList.add('hidden');

    const optionsCopy = [...currentActiveQuestion.options];
    shuffleArray(optionsCopy);

    optionsCopy.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('paper-choice-row');
        button.onclick = () => evaluateChoice(button, option.isCorrect, currentActiveQuestion.explanation);
        optionsContainer.appendChild(button);
    });
}

function evaluateChoice(selectedButton, isCorrect, descriptionText) {
    const buttons = document.querySelectorAll('.paper-choice-row');
    const feedbackBox = document.getElementById('trivia-explanation');
    const statusHeader = document.getElementById('result-status');
    const descParagraph = document.getElementById('explanation-text');
    const iconSpan = document.getElementById('feedback-icon');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === currentActiveQuestion.options.find(o => o.isCorrect).text) {
            btn.classList.add('correct');
        }
    });

    feedbackBox.classList.remove('hidden');
    descParagraph.innerText = descriptionText;
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        statusHeader.innerText = "PASSED: Verified Fact";
        iconSpan.innerText = "✓";
        feedbackBox.className = "appendix-box correct-pane";
    } else {
        selectedButton.classList.add('wrong');
        statusHeader.innerText = "DISPROVED: Counter Theory";
        iconSpan.innerText = "✗";
        feedbackBox.className = "appendix-box wrong-pane";
    }

    questionsAnsweredCount++;
    document.getElementById('question-counter').innerText = `Completed: ${questionsAnsweredCount}`;
    document.getElementById('next-btn').classList.remove('hidden');
}

function loadNextQuestion() {
    getNewRandomQuestion();
}

document.addEventListener("DOMContentLoaded", initQuiz);

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
    document.getElementById('question-counter').innerText = `Questions Answered: ${questionsAnsweredCount}`;
    updateProgressBar();
    shuffleArray(quizData);
    getNewRandomQuestion();
}

function updateProgressBar() {
    const progressBar = document.getElementById('quiz-progress-bar');
    if (progressBar) {
        // Linear scale that loops visually every 5 questions to keep the bar animating
        const cycleProgress = (questionsAnsweredCount % 5) * 20; 
        progressBar.style.width = `${cycleProgress === 0 && questionsAnsweredCount > 0 ? 100 : cycleProgress}%`;
    }
}

function getNewRandomQuestion() {
    if (questionsAnsweredCount >= 500) {
        alert("Incredible! You have reached the maximum safe session limit of 500 questions.");
        initQuiz();
        return;
    }

    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentActiveQuestion = quizData[randomIndex];
    
    document.getElementById('trivia-question').innerText = currentActiveQuestion.question;
    
    const optionsContainer = document.getElementById('trivia-options');
    optionsContainer.innerHTML = '';
    
    document.getElementById('trivia-explanation').className = "quiz-feedback-box hidden";
    document.getElementById('next-btn').classList.add('hidden');

    const optionsCopy = [...currentActiveQuestion.options];
    shuffleArray(optionsCopy);

    optionsCopy.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('quiz-opt-btn');
        button.onclick = () => processUserSelection(button, option.isCorrect, currentActiveQuestion.explanation);
        optionsContainer.appendChild(button);
    });
}

function processUserSelection(selectedButton, isCorrect, descriptionText) {
    const buttons = document.querySelectorAll('.quiz-opt-btn');
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
        statusHeader.innerText = "Correct Answer!";
        iconSpan.innerText = "🎉";
        feedbackBox.className = "quiz-feedback-box correct-panel";
    } else {
        selectedButton.classList.add('wrong');
        statusHeader.innerText = "Incorrect";
        iconSpan.innerText = "❌";
        feedbackBox.className = "quiz-feedback-box wrong-panel";
    }

    questionsAnsweredCount++;
    document.getElementById('question-counter').innerText = `Questions Answered: ${questionsAnsweredCount}`;
    updateProgressBar();
    document.getElementById('next-btn').classList.remove('hidden');
}

function loadNextQuestion() {
    getNewRandomQuestion();
}

document.addEventListener("DOMContentLoaded", initQuiz);

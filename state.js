// state.js
const NoteState = {
    // This is the method your app.js calls to fetch the payload
    getNotes: function () {
        return {
            title: "Political Science: State Notes Archive",
            documentType: "Reference Guide",
            institution: "Zabalix Academy",
            academicYear: "2026",
            sections: [
                {
                    subHeading: "1. Definition of the State",
                    type: "textBlock",
                    pText: "A state is a centralized political organization that imposes and enforces rules over a population within a defined territory. According to classical political theory, it maintains a monopoly on the legitimate use of physical force."
                },
                {
                    subHeading: "2. Essential Elements of a State",
                    type: "listBlock",
                    bulletPoints: [
                        "<strong>Population:</strong> The collective body of people residing within the territory.",
                        "<strong>Territory:</strong> Clearly defined geographical boundaries.",
                        "<strong>Government:</strong> The agency or machinery through which the collective will of the state is formulated.",
                        "<strong>Sovereignty:</strong> Supreme and absolute power within its territorial boundaries, free from external control."
                    ]
                },
                {
                    subHeading: "3. Major Theories of Origin",
                    type: "textBlock",
                    pText: "Key historical perspectives include the Divine Right Theory, Social Contract Theory (Hobbes, Locke, Rousseau), and the Evolutionary Theory of state development."
                }
            ]
        };
    }
};

// Explicitly bind it to the window object so app.js can access it globally
window.NoteState = NoteState;

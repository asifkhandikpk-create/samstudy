document.addEventListener('DOMContentLoaded', () => {
    const starButtons = document.querySelectorAll('.star-btn');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackText = document.getElementById('feedbackText');
    const submitBtn = document.getElementById('submitFeedbackBtn');
    const successState = document.getElementById('successState');

    let selectedRatingValue = 0;

    // 1. STAR INTERACTIVE EVENT HOOKS
    starButtons.forEach(button => {
        const value = parseInt(button.getAttribute('data-value'));

        // Highlight stars on hover
        button.addEventListener('mouseenter', () => highlightStars(value, 'hovered'));
        
        // Remove highlight when mouse leaves
        button.addEventListener('mouseleave', () => clearHighlights('hovered'));

        // Record selection value lock on click
        button.addEventListener('click', () => {
            selectedRatingValue = value;
            highlightStars(value, 'selected');
            submitBtn.disabled = false; // Unlock submission button safety rule
        });
    });

    // 2. HELPER UTILITIES TO MUTATE ACTIVE CLASS LISTS
    function highlightStars(count, className) {
        starButtons.forEach(btn => {
            const btnValue = parseInt(btn.getAttribute('data-value'));
            if (btnValue <= count) {
                btn.classList.add(className);
            } else {
                btn.classList.remove(className);
            }
        });
    }

    function clearHighlights(className) {
        starButtons.forEach(btn => btn.classList.remove(className));
    }

    // 3. SECURE PIPELINE CAPTURE ON SUBMIT
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Structure data payload package
            const submissionPayload = {
                rating: selectedRatingValue,
                comment: feedbackText.value.trim(),
                timestamp: new Date().toISOString()
            };

            // Save inside database-less browser local memory cache strings
            localStorage.setItem('userFeedbackProfile', JSON.stringify(submissionPayload));
            console.log("Locally cached feedback:", submissionPayload);

            // Toggle interface elements to render the success state view layout
            feedbackForm.style.display = 'none';
            document.querySelector('.star-rating').style.display = 'none';
            document.querySelector('.subtitle').style.display = 'none';
            successState.style.display = 'block';
        });
    }
});

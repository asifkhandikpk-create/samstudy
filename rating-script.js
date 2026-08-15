document.addEventListener('DOMContentLoaded', () => {
    const starButtons = document.querySelectorAll('.star-btn');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackText = document.getElementById('feedbackText');
    const submitBtn = document.getElementById('submitFeedbackBtn');
    const successState = document.getElementById('successState');
    const reviewsContainer = document.getElementById('reviewsContainer');

    let selectedRatingValue = 0;

    // 1. FETCH & DISPLAY PREVIOUS REVIEWS UPON INITIAL CONTENT LOAD
    // Pulls array out of memory, or starts a fresh empty layout system array list
    let globalFeedbacksArray = JSON.parse(localStorage.getItem('publicFeedbackLogs')) || [];
    renderReviewWall();

    // 2. STAR MOUSE HOVER AND CLICK HIGHLIGHT TUNERS
    starButtons.forEach(button => {
        const value = parseInt(button.getAttribute('data-value'));

        button.addEventListener('mouseenter', () => highlightStars(value, 'hovered'));
        button.addEventListener('mouseleave', () => clearHighlights('hovered'));

        button.addEventListener('click', () => {
            selectedRatingValue = value;
            highlightStars(value, 'selected');
            if (submitBtn) submitBtn.disabled = false; // Unlock submit button safety rule
        });
    });

    function highlightStars(count, className) {
        starButtons.forEach(btn => {
            const btnValue = parseInt(btn.getAttribute('data-value'));
            if (btnValue <= count) btn.classList.add(className);
            else btn.classList.remove(className);
        });
    }

    function clearHighlights(className) {
        starButtons.forEach(btn => btn.classList.remove(className));
    }

        // 3. CAPTURE & APPEND NEW FEEDBACK SUBMISSIONS
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Structure our new comment payload object
            const currentSubmission = {
                rating: selectedRatingValue,
                comment: feedbackText.value.trim(),
                dateLabel: new Date().toLocaleDateString('en-PK', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            };

            // Push payload item straight to the top of the local tracker list
            globalFeedbacksArray.unshift(currentSubmission);

            // Re-save the entire updated list back into the local storage registry
            localStorage.setItem('publicFeedbackLogs', JSON.stringify(globalFeedbacksArray));

            // Instantly refresh the screen lists to print the new card at the top
            renderReviewWall();

            // FIX: Hide the input fields but KEEP the community feedback list wall visible!
            feedbackForm.style.display = 'none';
            document.querySelector('.star-rating').style.display = 'none';
            document.querySelector('.subtitle').style.display = 'none';
            
            // Render the confirmation text alert at the top of the card block
            if (successState) successState.style.display = 'block';

            // Ensure the main list container wrapper stays active and forced into view
            const feedbackWall = document.querySelector('.feedback-wall-container');
            if (feedbackWall) {
                feedbackWall.style.display = 'block';
            }
        });
    }


    // 4. CORE ENGINE FUNCTION TO DRAW CARDS ONTO HTML SCREEN
    function renderReviewWall() {
        if (!reviewsContainer) return;
        
        // Clear previous runs
        reviewsContainer.innerHTML = "";

        if (globalFeedbacksArray.length === 0) {
            reviewsContainer.innerHTML = `<p class="no-reviews-fallback">No reviews submitted yet. Be the first to share your thoughts!</p>`;
            return;
        }

        // Loop through array rows and append a clean card for each feedback element block
        globalFeedbacksArray.forEach(item => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-item-node');

            // Generate clean star strings based on numeric value integers (e.g. 4 -> ★★★★☆)
            const goldStarsStr = "★".repeat(item.rating);
            const emptyStarsStr = "☆".repeat(5 - item.rating);

            reviewCard.innerHTML = `
                <div class="review-card-meta">
                    <span class="review-card-stars" aria-label="${item.rating} Stars">${goldStarsStr}${emptyStarsStr}</span>
                    <span class="review-card-date">${item.dateLabel}</span>
                </div>
                <p class="review-card-comment">${item.comment}</p>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    }
});

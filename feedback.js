document.addEventListener('DOMContentLoaded', () => {
    const starsContainers = document.getElementsByClassName("stars");
    const ratingTexts = document.querySelectorAll('[id$="-rating-text"]');
    let currentRating = 0;

    function colourStar(ind, container) {
        let s = container.querySelectorAll("span");
        s = Array.from(s);
        for (let i = 0; i < s.length; i++) {
            s[i].style.color = "white";
        }
        for (let i = 0; i < ind; i++) {
            s[i].style.color = "#FFA500";
        }
    }

    Array.from(starsContainers).forEach((starsContainer, index) => {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '★';
            star.setAttribute('data-rating', i);
            starsContainer.appendChild(star);

            star.addEventListener('click', () => {
                currentRating = i;
                updateRating(index);
                colourStar(i, starsContainer);
            });
        }
    });

    const updateRating = (index) => {
        ratingTexts[index].textContent = `Rating: ${currentRating}`;
    };
});

function submitFeedback() {
    if (!isLoggedIn()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please log in to submit feedback.',
        });
        return;
    }

    if (hasSubmittedFeedback()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have already submitted feedback.',
        });
        return;
    }

    var feedbackInput = document.getElementById("feedback-input");
    var feedback = feedbackInput.value.trim();

    if (feedback === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter your feedback before submitting.',
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your response has been recorded.',
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            feedbackInput.value = "";
            setFeedbackSubmitted();
        }
    });
}

function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

function hasSubmittedFeedback() {
    return localStorage.getItem('feedbackSubmitted') === 'true';
}

function setFeedbackSubmitted() {
    localStorage.setItem('feedbackSubmitted', 'true');
}



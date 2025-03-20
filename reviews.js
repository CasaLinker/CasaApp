let reviews = [];

export function init() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
        reviews.push({ name, rating, comment });
        displayReviews();
        form.reset();
    });
    displayReviews();
}

function displayReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = '';
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
            <h5>${review.name} - ${review.rating}/5</h5>
            <p>${review.comment}</p>
        `;
        list.appendChild(reviewDiv);
    });
}
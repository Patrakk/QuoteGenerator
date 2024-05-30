const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// GSAP Animations
const actionsBtn = document.querySelectorAll('.action-btn');

actionsBtn.forEach(function (actionBtn) {
    actionBtn.addEventListener("mouseenter", () => {
        gsap.to(actionBtn, {
            scale: 1.1,
            rotate: -15,
            duration: 0.2,
        });
    });
    // Revert animation when user leave button
    actionBtn.addEventListener("mouseleave", () => {
        gsap.to(actionBtn, {
            scale: 1,
            rotate: 0,
            duration: 0.2,
        });
    });
});

gsap.from(actionsBtn, {
    opacity: 0,
    scale: 0,
    ease: "elastic.out",
    duration: 1.5,
    stagger: 0.1
});

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quotes from API
let apiQuotes = [];

// Show New Quote
function newQuote() {
    loading();
    // Pick a random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author field is blank and replace it with "Unknow"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check the Quote length to determine stylling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error
        alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();


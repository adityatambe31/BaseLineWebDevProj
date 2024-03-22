// JavaScript code for fetching and displaying news articles

// API key for accessing news data
const apikey = '7a703e3e0cc648b19ab1eedb516498b2';

// Selecting the blog container element
const blogContainer = document.getElementById('blog-container');

// Selecting search input field and search button
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch random news articles
async function fetchRandomNews() {
    try {
        const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

// Event listener for search button click
searchButton.addEventListener("click", async() => { 
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch(error) {
            console.error("Error fetching news by queries", error);
        }
    }
});

// Function to fetch news articles based on search queries
async function fetchNewsQuery(query) {
    try {
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching news by queries", error);
        return [];
    }
}

// Function to display blog cards with news articles
function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear the container before adding new content
    articles.forEach(article => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement('h2');
        const truncatedTitle = article.title.length > 20 ? article.title.slice(0, 20) + '...' : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement('p');
        const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + '...' : article.description;
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description); 
        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        blogContainer.appendChild(blogCard);
    });
}

// Immediately-invoked function expression (IIFE) to fetch and display news articles
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error fetching random news", error);
    }
})();

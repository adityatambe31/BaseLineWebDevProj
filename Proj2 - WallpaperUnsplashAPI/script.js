// JavaScript Functionality

// Define Unsplash API access key
const accessKey ='iZ4fLZk2z2LJgGWWBr2RMRB_Qp6T4MQ8yY6ms4UuC2Y';

// Select form, input field, search results container, and load more button
const formE1 = document.querySelector('form');
const inputE1 = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const loadMore = document.getElementById('load-more-button');

// Initialize variables for input data and page number
let inputData = "";
let page = 1;

// Function to fetch and display images based on search query
async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // Clear search results container on first page
    if (page === 1) {
        searchResults.innerHTML = '';
    }

    // Iterate through results and create HTML elements for each image
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    // Increment page number and display load more button if needed
    page++;
    if (page > 1) {
        loadMore.style.display = 'block';
    }
}

// Event listener for form submission
formE1.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Event listener for load more button click
loadMore.addEventListener('click', () => {
    searchImages();
});

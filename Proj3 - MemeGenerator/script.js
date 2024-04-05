const generteMemeButton = document.querySelector(".generate-meme-button"); // Selecting the generate meme button
const memeImg = document.querySelector(".memeGenerator img"); // Selecting the image element inside the meme generator container
const memeTitle = document.querySelector(".memeGenerator .meme-title"); // Selecting the meme title element inside the meme generator container
const memeOwner = document.querySelector(".memeGenerator .meme-owner"); // Selecting the meme owner element inside the meme generator container

// Function to update meme details
const updateDetails = (url, title, owner) => {
    memeImg.setAttribute("src", url); // Setting the source attribute of the image element to the provided URL
    memeTitle.textContent = title; // Setting the text content of the meme title element to the provided title
    memeOwner.textContent = owner; // Setting the text content of the meme owner element to the provided owner
};

// Function to generate meme
const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes") // Fetching meme data from the API
    .then(response => response.json()) // Parsing the JSON response
    .then(data => {
        updateDetails(data.url, data.title, data.owner); // Updating meme details with fetched data
    })
    .catch(error => console.error("Error: Fetching the memes", error)); // Handling errors during fetching
}

generteMemeButton.addEventListener("click", generateMeme); // Adding event listener to the generate meme button to trigger meme generation

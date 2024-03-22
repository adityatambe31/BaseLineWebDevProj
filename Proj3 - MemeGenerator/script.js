const generteMemeButton = document.querySelector(".generate-meme-button");
const memeImg = document.querySelector(".memeGenerator img");
const memeTitle = document.querySelector(".memeGenerator .meme-title");
const memeOwner = document.querySelector(".memeGenerator .meme-owner");


const updateDetails = (url, title, owner) => 
{
    memeImg.setAttribute("src", url);
    memeTitle.textContent = title;
    memeOwner.textContent = owner;
};

const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")
    .then(response => response.json())
    .then(data => {
    
    updateDetails(data.url, data.title, data.owner);
    })

    .catch(error => console.error("Error: Fetching the memes", error));
}

generteMemeButton.addEventListener("click", generateMeme);
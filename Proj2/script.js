const accessKey ='iZ4fLZk2z2LJgGWWBr2RMRB_Qp6T4MQ8yY6ms4UuC2Y'


const formE1 = document.querySelector('form');

const inputE1 = document.getElementById('input');

const searchResults= document.querySelector('.search-results');

const loadMore = document.getElementById('load-more-button');


let inputData = "";
let page = 1;

async function searcImages(){

    inputData = inputE1.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);

    const data = await response.json();

    const results = data.results;

    if (page ===1)
    {
        searchResults.innerHTML = '';
    }

    results.map((result) => {

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++;
    if (page>1)
    {
        loadMore.style.display='block';
    }
}

formE1.addEventListener('submit', (event) => {
    event.preventDefault();
    page=1;
    getImages();
        
})

loadMoreBtn.addEventListener('click', () => {
    getImages();

})





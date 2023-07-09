const API_KEY = "15e342c40efa4a328c8485714467b320"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',() => fetchNews("India"))





async function fetchNews( query ) {
    
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
   bindData(data.articles);
} 

function bindData( articles ) { 
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    // after every binding bar bar data add hota jayega to usse bachne k lye hum pehle empty kr denge 
    cardsContainer.innerHTML = '' ;

    articles.forEach((article) => {
        // agar image nahi hai card me to hum wo show hi nahi krege ui par 
        if(!article.urlToImage) return ;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone)
    });
}


function reload () {
    window.location.reload();
}

function fillDataInCard(cardClone, article) { 
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');



    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    console.log(article.description)
// api me timezone ke sath me date di hui hai to hum human readable format me convert krr rehe hai 
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta"
    });

    newsSource.innerHTML = `${article.source.name}•${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
window.open(article.url,"_blank");
    })
}

let curSelectedNav = null ;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem ;
    curSelectedNav?.classList.add('active');
}


const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');


searchButton.addEventListener('click' ,()=>{
    const query = searchText.value ;
    if(!query) return ;

    fetchNews(query) ;
    curSelectedNav?.classList.remove('active');
    curSelectedNav  = null ;
})

searchText.addEventListener('keypress' , (event) => {
   if( event.key === 'Enter') {
    const query = searchText.value ;
    if(!query) return ;

    fetchNews(query) ;
    curSelectedNav?.classList.remove('active');
    curSelectedNav  = null ;
   }
})
//fetch movie info and Wikipedia summary

document.querySelector('button').addEventListener('click', getMovie);
function getMovie(){
    const title = document.querySelector('input').value;
    const url= `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(title)}`;//learned the encode part from Karim
//movie result
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('h2').innerText = data.description[0]["#TITLE"];
        //getting the image poster in the DOM
        document.querySelector('img').src = data.description[0]["#IMG_POSTER"];
        //getting the release year in the DOM
        document.querySelector('.releaseYear').innerText = data.description[0]["#YEAR"];

        //fetch from Wikipedia the title of the movie and get the summary of that movie in the DOM
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data.description[0]["#TITLE"])}`;

        fetch(wikiUrl)
        .then(res => res.json())
        .then(wikiData =>{
            console.log(wikiData);
            document.querySelector('.summary').innerText = wikiData.extract;
            document.querySelector('.results').innerHTML = `<a href="${wikiData.content_urls.desktop.page}">Read more on Wikipedia</a>`;


        })

        .catch(err=>{
            console.log(`error ${err}`);
        })

    })
}



















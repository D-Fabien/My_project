const formElement = document.querySelector("form");
const errorElement = document.querySelector(".error");
const animesElement = document.querySelector("#animes");
const mangaElelment = document.querySelector(".manga");
const authorElelment = document.querySelector(".author");
const persoElelment = document.querySelector(".perso");



formElement.addEventListener("submit", async function (e) {
    e.preventDefault();

    animesElement.innerHTML = "";
    const search = formElement.search.value.trim();
 
    if (search) {
        let response;
        if(!mangaElelment.checked){
            response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
        } else {
            response = await fetch(`https://api.jikan.moe/v4/manga?q=${search}`);
        }
 
        if(persoElelment.checked){
            response = await fetch(`https://api.jikan.moe/v4/characters?q=${search}`);
        }

        
        const animes = await response.json();
        
        console.log(animes);
        
        for (const id in animes.data) {
            const titles = (animes.data[id].title);
            const episodes = (animes.data[id].episodes);
            const synopsis = (animes.data[id].synopsis);
            const image = (animes.data[id].images.jpg.image_url)
            const name = (animes.data[id].name);
            const about = (animes.data[id].about);


            console.log(titles);
            console.log(episodes);
            if(persoElelment.checked){
                animesElement.innerHTML += `<p><h2><strong>${name}</strong></p><p>+${about}</p><img src="${image}"></img></h2><p></p>`;

            } else {
            animesElement.innerHTML += `<p><h2>${titles}</h2></p><p>Nombres d'épisodes : ${episodes}</p><p><h3>${synopsis}</h3></p><img src="${image}"></img><p></p>`;
            }
        }

    } else {
        errorElement.textContent = "Veuillez entrer un nom valide";
        errorElement.style.display = "block";
    }

    formElement.search.value = "";
    
})
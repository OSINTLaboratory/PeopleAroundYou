'use strict';

const reqID = document.location.search;
const params = new URLSearchParams(reqID);
const id = parseInt(params.get("id"));


async function getFilm(id) {
    console.log(id);
    let desc;
    await makeRequest(JSON.stringify({id}), "POST", "/getFilm").then( (res) => {
        desc = JSON.parse(res);

        const video = document.getElementById('filmPoster');
        const source = document.createElement('source');
        video.setAttribute('poster', `posters/${desc.poster}`);
        source.setAttribute('src', `films/${desc.title}.mp4`);
        video.appendChild(source);
        video.load();

    }).catch((err) => {
        console.log(err.message);
    });
    return desc;
}

document.addEventListener('DOMContentLoaded', () => {
    getFilm(id);
});

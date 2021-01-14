'use strict';

const reqID = document.location.search;
const params = new URLSearchParams(reqID);
const id = parseInt(params.get('id'));


async function getFilm(id) {
  await makeRequest(JSON.stringify({ id }), 'POST', '/getFilm').then(res => {
    const data = JSON.parse(res);

    const video = document.getElementById('filmPoster');
    const source = document.createElement('source');
    video.setAttribute('poster', `posters/${data[0].poster}`);
    source.setAttribute('src', `films/${data[0].title}.mp4`);
    video.appendChild(source);
  }).catch(err => {
    console.log(err.message);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getFilm(id);
});

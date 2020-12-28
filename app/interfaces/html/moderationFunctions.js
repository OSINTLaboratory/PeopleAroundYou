'use strict';

const modal = document.querySelector('modal');
const overlay = document.querySelector('overlay');

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('table').remove();
});

async function removeFilm(id) {
    await makeRequest(JSON.stringify({ id }), "POST", "/removeFilm").then(() => {
        document.querySelector(`#film_${id}`).remove();
    });
}

async function showFilms() {
    await makeRequest('', "POST", "/showFilms").then(res => {
        const data = JSON.parse(res);
        const tableHead = `
                <thead>
                    <tr>
                        <th>ID фильма</th>
                        <th>Название</th>
                        <th>Год</th>
                        <th>Рейтинг</th>
                        <th>Просмотры</th>
                        <th>Постер</th>
                        <th>Жанр</th>
                        <th>Премиум</th>
                        <th>Ссылка</th>
                        <th></th>
                    </tr>
                </thead>`;

        let tableBody = '';
        for (let i = 0; i < data.length; i++) {
            const id = data[i].filmid;
            tableBody += `
                <tr id="film_${id}">
                    <td>${id}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].year}</td>
                    <td>${data[i].rating}</td>
                    <td>${data[i].views}</td>
                    <td>${data[i].poster}</td>
                    <td>${data[i].genre}</td>
                    <td>${data[i].free}</td>
                    <td>${data[i].url}</td>
                    <td class="removeBtn" onclick="removeFilm(${id})">X</td>
                </tr>`;
        }

        const table = document.createElement('table');
        table.innerHTML += tableHead + tableBody;

        modal.appendChild(table);
        modal.classList.add('active');
        overlay.classList.add('active');
    });
};

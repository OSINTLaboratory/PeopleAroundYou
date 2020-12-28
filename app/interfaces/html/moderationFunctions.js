'use strict';

const modal = document.querySelector('modal');
const overlay = document.querySelector('overlay');

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('table') ? document.querySelector('table').remove() : 0;
    document.querySelector('.filmForm') ? document.querySelector('.filmForm').remove() : 0;
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

async function addFilm() {
    const filmForm = document.createElement('div');
    filmForm.className = 'filmForm';
    filmForm.innerHTML = `
        <form action="/addFilm" method="post" enctype="multipart/form-data" target="dummy">
            <div class="container">
                <h1>Добавить фильм</h1>
                <hr>
                <label for="title"><b>Название</b></label>
                <input type="text" placeholder="" name="title" class="ins" required>
    
                <label for="year"><b>Год выпуска</b></label>
                <input type="number" placeholder="" name="year" class="ins" required>
                
                <label for="poster"><b>Постер</b></label>
                <input type="file"  name="poster" class="ins" required>
                
                <label for="genre"><b>Жанр</b></label>
                <input type="text"  name="genre" class="ins" required>
                
                <label for="free"><b>Бесплатный просмотр?</b></label>
                <input type="checkbox"  name="free" class="ins">
                
                <label for="url"><b>Фильм</b></label>
                <input type="file"  name="url" class="ins" required>
               
 
                <button type="submit" class="addBtn">Добавить фильм</button>
            </div>
        </form>`;

    modal.appendChild(filmForm);
    modal.classList.add('active');
    overlay.classList.add('active');
}


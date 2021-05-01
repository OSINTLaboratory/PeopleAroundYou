class Page {
  constructor(arrayOfFilms) {
    this.data = arrayOfFilms;
  }
}

let filmCatalog = new Array();

export const ShowPage = (page) => {
  if (filmCatalog[page] === undefined) {
    return;
  }

  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";
  for (const film of filmCatalog[page].data) {
    catalog.appendChild(film);
  }

  // Set up pages pagination
  const pages = document.getElementById("pagination");
  pages.innerHTML = "";
  const activeLi = document.createElement("li");
  activeLi.className = "active";
  let i = 0;
  const len = filmCatalog.length;

  while (i < len) {
    const li = document.createElement("li");
    if (i === page) {
      activeLi.innerHTML = `<span>${i + 1}</span>`;
      pages.appendChild(activeLi);
    } else {
      li.innerHTML = `<a onclick="ShowPage(${i})" style="cursor:pointer;">${
        i + 1
      }</a>`;
      pages.appendChild(li);
    }
    i++;
  }
};

const FilmHtml = (film) => `
            <a class="image-block" onclick="player(${film.filmid})">
				<span class="year-block">${film.year}</span>
				<img src="/posters/${film.poster}" alt="${film.title}">
			</a>
			<div class="anime-column-info">
				<div class="anime-title">${film.title}</a>
				<div class="icons-row">
					<div title="Количество просмотров"><i class="fa fa-eye"></i>${film.views}</div>
				</div>
			</div>
			<div class="rating-info" title=".хак//Вернувшийся">
				<span class="fa fa-star rating-star" data-id="4124" data-modal="rating-modal"></span>
				<span class="main-rating-block">
					<span class="main-rating">${film.rating}</span>
				</span>
			</div>`;

const Paginate = (res) => {
  console.log(res);
  let i = 0;
  let page = new Page(new Array());
  filmCatalog = new Array();
  for (const film of res.data) {
    if (i === 12) {
      filmCatalog.push(page);
      page = new Page(new Array());
      i = 0;
    }
    const htmlFilm = document.createElement("div");
    htmlFilm.className = "anime-column";
    htmlFilm.innerHTML = FilmHtml(film);
    page.data.push(htmlFilm);
    i++;
  }
  if (page.data.length > 0) {
    filmCatalog.push(page);
  }
};

export const Filter = async (event) => {
  const data = await window.metacom.api.catalog.filter({
    genre: event.target[0].value,
    yearFrom: event.target[1].value,
    yearTo: event.target[2].value,
    sort: event.target[3].value,
  });

  Paginate(data);

  // Show first page
  ShowPage(0);
};

export const GetTop = async () => {
  const data = await window.metacom.api.catalog.top();

  Paginate(data);

  // Show first page
  ShowPage(0);
};

export const Search = async (event) => {
  const data = await window.metacom.api.catalog.search({
    title: event.target[0].value,
  });

  Paginate(data);

  // Show first page
  ShowPage(0);
};

const LoadRecomendations = async () => {
  const data = await window.metacom.api.catalog.recomendations();

  const recomendations = document.getElementById("recomendations");
  recomendations.innerHTML = "";
  for (const film of data) {
    const htmlFilm = document.createElement("div");
    htmlFilm.className = "anime-column";
    htmlFilm.innerHTML = FilmHtml(film);
    recomendations.appendChild(htmlFilm);
  }
};

export const LoadCatalog = async () => {
  const data = await window.metacom.api.catalog.list();

  Paginate(data);

  // Show first page
  ShowPage(0);

  const genres = await window.metacom.api.catalog.genres();
  const selecttag = document.getElementById("selected_category");
  selecttag.innerHTML = "";
  let i = 1;
  for (const genre of genres.data) {
    const option = document.createElement("option");
    option.value = `${i}`;
    option.innerHTML = genre.lable;
    selecttag.appendChild(option);
    i++;
  }
};

export const LoadRecoms = async (loggedin) => {
  if (loggedin) {
    LoadRecomendations();
  }
};

export const redirectToFilm = async (id) => {
  localStorage.viewedFilm = id;
  window.location.href = "/player.html";
};

export const rand = async () => {
  const data = await window.metacom.api.catalog.random();
  redirectToFilm(data.data[0].filmid);
};

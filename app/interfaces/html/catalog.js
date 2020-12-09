
class Page{
	constructor(arrayOfFilms){
		this.data = arrayOfFilms;
	}
};

let filmCatalog = new Array;

const LoadCatalog = () => {
	const promise = makeRequest("{}", "POST", "/catalog");
	promise.then( (res) => {
		if(res === undefined){
			return;
		}
		res = JSON.parse(res);
		
		// Paginate
		let i = 0;
		let page = new Page(new Array);
		for(let film of res){
			if(i === 12){
				filmCatalog.push(page);
				page = new Page(new Array);
				i = 0;
			}
			const html_film = document.createElement("div");
			html_film.className = "anime-column";
			html_film.innerHTML = `<a class="image-block" href="/player?id=${film.filmid}">
					<span class="year-block">${film.year}</span>
					<img src="/posters/${film.poster}" alt="${film.title}">
				</a>
				<div class="anime-column-info">
					<a class="anime-title" href="/player?id=${film.filmid}">${film.title}</a>
					<div class="icons-row">
						<div title="Количество просмотров"><i class="fa fa-eye"></i>${film.views}
					</div>
				</div>
				<div class="rating-info" title=".хак//Вернувшийся">
				<span class="fa fa-star rating-star" data-id="4124" data-modal="rating-modal"></span>
						<span class="main-rating-block">
							<span class="main-rating">${film.rating}</span>
						</span>
					</div>
				</div>`;
			page.push(html_film);
			i++;
		}
		console.log(filmCatalog)
		if(filmCatalog[0] === undefined){
			return;
		}
		
		// Show first page
		const catalog = document.getElementById("catalog");
		for(let film of filmCatalog[0].data){
			catalog.appendChild(film);
		}
		
		// Set up pages
		const pages = document.getElementById("pagination");
		console.log(pages)
		const li = document.createElement("li");
		pages.innerHTML = '<li class="active"><span>1</span></li>';
		i = 2;
		console.log(filmCatalog)
		for(let film of filmCatalog){
			li.innerHTML = `<a href="/catalog?page=${i}">${i}</a>`;
			catalog.appendChild(li);
			i++;
		}
	}).catch((err)=>{});
}

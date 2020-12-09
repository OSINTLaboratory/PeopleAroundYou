const LoadCatalog = () => {
	const promise = makeRequest("{}", "POST", "/catalog");
	promise.then( (res) => {
		if(res === undefined){
			return;
		}
		const catalog = document.getElementById("catalog");
		res = JSON.parse(res);
		for(let film of res){
			console.log(film);
			const html_film = document.createElement("div");
			html_film.className = "anime-column";
			html_film.innerHTML = `<a class="image-block" href="/player?id=${film.filmid}">
					<span class="year-block">2007</span>
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
			catalog.appendChild(html_film);
		}
	}).catch((err)=>{});
}

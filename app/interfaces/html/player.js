
let loginBtn1Showed = false;
let registerBtnShowed = false;
document.addEventListener("DOMContentLoaded", () => {

	const commentField = document.getElementsByClassName('comment-field')[0];
	const commentButton = document.getElementsByClassName('comment-button')[0];

	const urlParams = new URLSearchParams(window.location.search);
	const filmid = urlParams.get('id');
	document.getElementById("film-id").value = filmid;

	commentButton.addEventListener('click', () => {
		const commentValue = commentField.value;

		makeRequest(JSON.stringify({"textdata":commentValue, "filmid": filmid}), "POST", "/addComment").catch((err) => {
			console.log(err.message);
		});

	});

	document.getElementById("login-btn-1").addEventListener("click", () => {
		loginBtn1Showed = !loginBtn1Showed;
		registerBtnShowed = false;
		HideRegisterBtn();
		if(loginBtn1Showed) {
			ShowLoginBtn1();
		} else{
			HideLoginBtn1();
		}
	});

	document.getElementById("register-btn").addEventListener("click", () => {
		registerBtnShowed = !registerBtnShowed;
		loginBtn1Showed = false;
		HideLoginBtn1();
		if(registerBtnShowed) {
			ShowRegisterBtn();
		} else{
			HideRegisterBtn();
		}
	});

	document.getElementById("add-rating-form").addEventListener("submit", (event) => {
		event.preventDefault();
		const promise = makeRequest(`{"id":"${document.getElementById("film-id").value}","rating":"${event.target[2].value}"}`, "POST", '/addScore');
		promise.then( (res) => {
			if(res === undefined){
				return;
			}
			res = JSON.parse(res);
			document.getElementById("film-rating").innerHTML = `${res.rating} (${res.rating_count} оценок)`;

		}).catch((err)=>{});
	});

	DisableAuth();

	const promise = makeRequest(`{"id":${filmid}}`, "POST", '/getFilmById');
	promise.then( (res) => {
		if (res === undefined){
			return;
		}
		res = JSON.parse(res);
		document.getElementById("film-rating").innerHTML = `${res.rating} (${res.rating_count} оценок)`;
		document.querySelector(".left-data").innerHTML = `${res.title}`;
		document.querySelector(".genre").innerHTML = res.genre;
		document.querySelector(".date").innerHTML = `(${res.year})`;

	}).catch((err)=>{});

	const comments = makeRequest(`{"id":${filmid}}`, "POST", '/getCommentsForFilm');
	comments.then( (res) => {
		if(res === undefined){
			return;
		}
		res = JSON.parse(res);

		const commentsList = document.querySelector('.comment-list');

		for (let i = 0; i < res.length; i++) {
			makeRequest(`{"id":${res[i].userid}}`, "POST", '/getUsername').then(username => {
				username = JSON.parse(username)[0].login;

				const comment = document.createElement('div');
				comment.innerHTML = `
					<div class="comment">
						<h5>${username}</h5>
						<p>${res[i].textdata}</p>
					</div>`;
				commentsList.appendChild(comment);
			});
		}

	}).catch((err) => {});

}, true);

import { Metacom } from "./metacom.js";
import Buttons from "./buttons.js";

const getFilm = async (film) => {
  const video = document.getElementById("filmPoster");
  const source = document.createElement("source");
  video.setAttribute("poster", `posters/${film.poster}`);
  source.setAttribute("src", `films/${film.title}.mp4`);
  video.appendChild(source);
};

const setUpHooks = (filmid) => {
  const commentField = document.getElementsByClassName("comment-field")[0];
  const commentButton = document.getElementsByClassName("comment-button")[0];

  document.getElementById("film-id").value = filmid;

  commentButton.addEventListener("click", async () => {
    await window.metacom.api.player.addComment({
      textdata: commentField.value,
      filmid,
    });
  });

  document
    .getElementById("add-rating-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = {
        filmid: document.getElementById("film-id").value,
        rating: event.target[2].value,
      };

      await window.metacom.api.player.addScore(data);
      window.location.href = window.location.href; // Reload page
    });
};

const loadComments = async (film) => {
  document.getElementById(
    "film-rating"
  ).innerHTML = `${film.rating} (${film.rating_count} оценок)`;
  document.querySelector(".left-data").innerHTML = `${film.title}`;
  document.querySelector(".genre").innerHTML = film.genre;
  document.querySelector(".date").innerHTML = `(${film.year})`;

  const comments = await window.metacom.api.player.getCommentsForFilm({
    filmid: film.filmid,
  });

  const commentsList = document.querySelector(".comment-list");

  for (let i = 0; i < comments.length; i++) {
    const user = await window.metacom.api.auth.getUsername({
      userid: comments[i].userid,
    });

    const login = user[0].login;

    const comment = document.createElement("div");
    comment.innerHTML = `
					<div class="comment">
						<h5>${login}</h5>
						<p>${comments[i].textdata}</p>
					</div>`;
    commentsList.appendChild(comment);
  }
};

window.addEventListener("load", async () => {
  const protocol = location.protocol === "http:" ? "ws" : "wss";
  window.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  window.api = window.metacom.api;
  await window.metacom.load("auth", "player");
  const token = localStorage.getItem("metarhia.session.token");
  let logged = false;
  if (token) {
    const res = await api.auth.restore({ token });
    logged = res.status === "logged";
    document.querySelectorAll(".auth-block").forEach((el) => el.remove());
  }

  const filmdat = await window.metacom.api.player.getFilm({
    filmid: localStorage.viewedFilm,
  });
  const film = filmdat.data[0];

  getFilm(film);
  setUpHooks(film.filmid);
  loadComments(film);
  Buttons.setUpHooks();
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/script/worker.js");
}

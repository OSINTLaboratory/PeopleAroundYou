import { Metacom } from "./metacom.js";
import * as Catalog from "./catalog.js";
import Buttons from "./buttons.js";

window.addEventListener("load", async () => {
  const protocol = location.protocol === "http:" ? "ws" : "wss";
  window.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  window.api = window.metacom.api;
  await window.metacom.load("auth", "catalog");
  const token = localStorage.getItem("metarhia.session.token");
  let logged = false;
  if (token) {
    const res = await api.auth.restore({ token });
    logged = res.status === "logged";
    document.querySelectorAll(".auth-block").forEach((el) => el.remove());
  }

  Catalog.LoadCatalog();
  window.ShowPage = Catalog.ShowPage;
  window.GetTop = Catalog.GetTop;
  window.rand = Catalog.rand;
  window.player = Catalog.redirectToFilm;
  window.Filter = Catalog.Filter;
  window.Search = Catalog.Search;

  Catalog.LoadRecoms(logged);

  Buttons.setUpHooks();
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/script/worker.js");
}

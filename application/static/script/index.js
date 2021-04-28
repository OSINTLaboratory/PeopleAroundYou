import { Metacom } from "./metacom.js";
import * as Catalog from "./catalog.js";
import * as Buttons from "./buttons.js";

let loginBtn1Showed = false;
let loginBtn2Showed = false;
let registerBtnShowed = false;

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

  document.getElementById("login-btn-1").addEventListener("click", () => {
    loginBtn1Showed = !loginBtn1Showed;
    loginBtn2Showed = false;
    registerBtnShowed = false;
    Buttons.HideLoginBtn2();
    Buttons.HideRegisterBtn();
    if (loginBtn1Showed) {
      Buttons.ShowLoginBtn1();
    } else {
      Buttons.HideLoginBtn1();
    }
  });

  document.getElementById("register-btn").addEventListener("click", () => {
    registerBtnShowed = !registerBtnShowed;
    loginBtn1Showed = false;
    loginBtn2Showed = false;
    Buttons.HideLoginBtn1();
    Buttons.HideLoginBtn2();
    if (registerBtnShowed) {
      Buttons.ShowRegisterBtn();
    } else {
      Buttons.HideRegisterBtn();
    }
  });

  document.getElementById("login-btn-2").addEventListener("click", () => {
    loginBtn2Showed = !loginBtn2Showed;
    loginBtn1Showed = false;
    registerBtnShowed = false;
    Buttons.HideLoginBtn1();
    Buttons.HideRegisterBtn();
    if (loginBtn2Showed) {
      Buttons.ShowLoginBtn2();
    } else {
      Buttons.HideLoginBtn2();
    }
  });

  document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    Catalog.Filter(event);
  });

  document.getElementById("search").addEventListener("submit", (event) => {
    event.preventDefault();
    Catalog.Search(event);
  });

  Catalog.LoadRecoms(logged);
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/script/worker.js");
}

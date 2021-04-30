import { Metacom } from "./metacom.js";

window.addEventListener("load", async () => {
  const protocol = location.protocol === "http:" ? "ws" : "wss";
  window.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  window.api = window.metacom.api;
  await window.metacom.load("auth", "adminpanel");
  const token = localStorage.getItem("metarhia.session.token");
  let logged = false;
  if (token) {
    const res = await api.auth.restore({ token });
    logged = res.status === "logged";
  }

  document.getElementById('add-admin').addEventListener('submit', async event => {
    event.preventDefault();
    const login = event.target[0].value;
    const password = event.target[1].value;
    if (event.target[2].value === 'Администратор') {
      await window.metacom.api.adminpanel.addAdmin({
        login, password
      });
    } else {
      await window.metacom.api.adminpanel.addModer({
	login, password
      });
    }
  });
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/script/worker.js");
}

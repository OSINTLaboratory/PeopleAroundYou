let loginBtn1Showed = false;
let loginBtn2Showed = false;
let registerBtnShowed = false;

export default class Buttons {
  static ShowLoginBtn1() {
    document.getElementById("login-form-1").style.display = "inherit";
  }

  static HideLoginBtn1() {
    document.getElementById("login-form-1").style.display = "none";
  }

  static ShowLoginBtn2() {
    document.getElementById("login-form-2").style.display = "inherit";
  }

  static HideLoginBtn2() {
    document.getElementById("login-form-2").style.display = "none";
  }

  static ShowRegisterBtn() {
    document.getElementById("register-form").style.display = "inherit";
  }

  static HideRegisterBtn() {
    document.getElementById("register-form").style.display = "none";
  }
  static setUpHooks() {
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

    if (document.getElementById("login-btn-2") !== null) {
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
      document
        .getElementById("filter-form")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          Catalog.Filter(event);
        });

      document.getElementById("search").addEventListener("submit", (event) => {
        event.preventDefault();
        Catalog.Search(event);
      });
      document
        .getElementById("login-form-2")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          await window.metacom.api.auth.signin({
            login: event.target[0].value,
            password: event.target[1].value,
          });
        });
    }

    document
      .getElementById("login-form-1")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        await window.metacom.api.auth.signin({
          login: event.target[0].value,
          password: event.target[1].value,
        });
      });

    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        await window.metacom.api.auth.register({
          login: event.target[0].value,
          password: event.target[1].value,
        });
      });
  }
}

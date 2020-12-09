
let loginBtn1Showed = false;
let loginBtn2Showed = false;
let registerBtnShowed = false;
document.addEventListener("DOMContentLoaded", () => {
	LoadCatalog();
	document.getElementById("login-btn-1").addEventListener("click", () => {
		loginBtn1Showed = !loginBtn1Showed;
		loginBtn2Showed = false;
		registerBtnShowed = false;
		HideLoginBtn2();
		HideRegisterBtn();
		if(loginBtn1Showed) {
			ShowLoginBtn1();
		} else{
			HideLoginBtn1();
		}
	});
	document.getElementById("login-btn-2").addEventListener("click", () => {
		loginBtn2Showed = !loginBtn2Showed;
		loginBtn1Showed = false;
		registerBtnShowed = false;
		HideLoginBtn1();
		HideRegisterBtn();
		if(loginBtn2Showed) {
			ShowLoginBtn2();
		} else{
			HideLoginBtn2();
		}
	});
	document.getElementById("register-btn").addEventListener("click", () => {
		registerBtnShowed = !registerBtnShowed;
		loginBtn1Showed = false;
		loginBtn2Showed = false;
		HideLoginBtn1();
		HideLoginBtn2();
		if(registerBtnShowed) {
			ShowRegisterBtn();
		} else{
			HideRegisterBtn();
		}
	});
	IsLogin();
}, false);
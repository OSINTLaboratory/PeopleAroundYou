
let loginBtn1Showed = false;
let registerBtnShowed = false;
document.addEventListener("DOMContentLoaded", () => {
	
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
	DisableAuth();
}, false);
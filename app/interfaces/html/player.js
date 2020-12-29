
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
		
	const urlParams = new URLSearchParams(window.location.search);
	const filmid = urlParams.get('id');
	document.getElementById("film-id").value = filmid;
	
	const promise = makeRequest(`{"id":${filmid}}`, "POST", '/getFilmById');
	promise.then( (res) => {
		if(res === undefined){
			return;
		}
		res = JSON.parse(res);
		document.getElementById("film-rating").innerHTML = `${res.rating} (${res.rating_count} оценок)`;
		
	}).catch((err)=>{});
	
}, false);
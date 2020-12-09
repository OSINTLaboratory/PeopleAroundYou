'use strict';

const IsLogin = async () => {
	const promise = makeRequest("{}", "POST", "/islogin");
	promise.then( (res) => {
		console.dir(res);
		if(res.bool){
			console.log("ololololo")
			document.querySelectorAll(".auth-block").forEach(el => el.remove());
		}
	}).catch((err)=>{});
}
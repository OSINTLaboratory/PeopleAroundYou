'use strict';

const IsLogin = async () => {
	const promise = await makeRequest("{}", "POST", "/islogin");
	promise.then( (res) => {
		if(boolean(res.bool)){
			document.querySelectorAll(".auth-block").forEach(el => el.remove());
		}
	});
}
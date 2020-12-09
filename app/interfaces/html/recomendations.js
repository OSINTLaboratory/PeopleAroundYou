'use strict';

const LoadRecomendations = async () => {
	const promise = await makeRequest("{}", "POST", "/recomendations");
	promise.then( (res) => {
		if(res === undefined)
			return;
			
		const block = document.getElementById("recomendations");
		
	});
}
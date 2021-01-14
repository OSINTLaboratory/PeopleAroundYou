'use strict';
const DisableAuth = async () => {
  const promise = makeRequest('{}', 'POST', '/islogin');
  promise.then(res => {
    if (res === 'true') {
      document.querySelectorAll('.auth-block').forEach(el => el.remove());
    }
  }).catch(err => console.log(err));
};

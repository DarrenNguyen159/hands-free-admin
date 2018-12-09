function storeAuthentication(user, token, tokenExpire, issuedAt) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpire', tokenExpire);
  localStorage.setItem('issuedAt', issuedAt);
}

function clearAuthentication() {
  ['user', 'token', 'tokenExpire', 'issuedAt'].forEach((i) => {
    localStorage.removeItem(i);
  });
}

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function updateUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function isLogined(cb) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const tokenExpire = localStorage.getItem('tokenExpire');
  if (!user || !user.email || !token || !tokenExpire || tokenExpire * 1000 < Date.now()) {
    clearAuthentication();
    return cb();
  }
  cb({ user, token });
}

function isLoginedSync() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const tokenExpire = localStorage.getItem('tokenExpire');
  if (!user || !token || !tokenExpire || tokenExpire * 1000 < Date.now()) {
    clearAuthentication();
    return false;
  }
}

function handleError(err) {
  console.log(err.responseJSON);
}
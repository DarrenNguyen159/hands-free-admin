window.handsFreeConfig = {
    baseUrl: 'http://localhost/hands-free',
    // baseUrl: 'http://localhost:8080/hands-free',
    // baseUrl: 'http://api.hands-free.epizy.com',
    // baseUrl: 'http://hands-free.epizy.com/endpoint',
    // baseUrl: 'http://192.168.64.2/hands-free'
    // baseUrl: 'http://hands-free.000webhostapp.com',
    // baseUrl: 'http://hands-free.orgfree.com',
    // baseUrl: 'http://api.hands-free.tk/handsfree'
}



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
    return true;
}

function handleError(err) {
    hideLoading();
    setTimeout(() => alert(err.responseJSON), 100);
}

function handleSuccess(msg) {
    hideLoading();
    setTimeout(() => alert(msg), 100);
}

function showLoading(exc = () => { }) {
    $('#loading').css('display', 'block');
    setTimeout(() => exc(), 400);
}

function hideLoading() {
    $('#loading').css('display', 'none');
}
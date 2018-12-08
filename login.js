if (isLoginedSync() == false) {
            
}
else {
    window.location.href = "index.php";
}
function AdminLogin() {
    const username = $("#username").val();
    const password = $("#password").val();
    const loginData = "username="+ username + "&password=" + password;
    const url = "http://localhost/hands-free/api/admin/login.php";

    $.post(url, loginData, (data) => {
        console.log(data);
        const { issuedAt, token, tokenExpire, user } = data;
        storeAuthentication(user, token, tokenExpire, issuedAt);
        window.location.reload();
    }).fail(err => handleError(err.responseJSON));
}
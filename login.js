if (isLoginedSync() == true) {
    window.location.href = "index.html";
}

const config = window.handsFreeConfig;

function AdminLogin() {
    const username = $("#username").val();
    const password = $("#password").val();
    const loginData = "username=" + username + "&password=" + password;
    const url = config.baseUrl + "/api/admin/login.php";

    showLoading(() => {
        $.post(url, loginData, (data) => {
            hideLoading();
            // console.log(data);
            const { issuedAt, token, tokenExpire, user } = data;
            storeAuthentication(user, token, tokenExpire, issuedAt);
            window.location.reload();
        }).fail(err => handleError(err));
    })
}
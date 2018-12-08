if (isLoginedSync() == false) {
    window.location.href = "login.html";
}
else {
    let user = $.parseJSON(JSON.stringify(getUser()));
    $(".usernameDisplay").html(user.username);
}

$('a').click(function (e) { e.preventDefault() });

$(document).ready(function () {
    $(".product-table").hide();
    $(".order-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    $("#addBtn").hide();
    $("#editBtn").show();
});



function getProductTable() {
    $(".product-table").show();
    $(".order-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    let productTable = $(".product-table tbody");

    productTable.html(''); // clear table

    $.ajax({
        url: "http://localhost/hands-free/api/product/get.php",
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            // console.log(JSON.stringify(data));
            $.each(
                data,
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    productTable.append(
                        "<tr><td>" + rowData.id + "</td><td>" + rowData.modelId + "</td><td>" + rowData.name + "</td><td>" + rowData.price + '<td><button type="button" class="btn btn-primary" onclick="detailProduct(' + rowData.id + ')">detail</button></td>' + "</tr>"
                    );
                }
            );
        }
    });
}

function getBrandTable() {
    $(".product-table").hide();
    $(".order-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").show();
    $(".model-table").hide();
    let brandTable = $(".brand-table tbody");

    brandTable.html(''); // clear table

    $.ajax({
        url: "http://localhost/hands-free/api/brand/get.php",
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            $.each(
                data,
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    brandTable.append(
                        "<tr><td>" + rowData.id + "</td><td>" + rowData.name + "</td><td>" + rowData.totalModels + "</td></tr>"
                    );
                }
            );
        }
    });
}

function getModelTable() {
    $(".product-table").hide();
    $(".order-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").show();
    let modelTable = $(".model-table tbody");

    modelTable.html(''); // clear table

    $.ajax({
        url: "http://localhost/hands-free/api/model/get.php",
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            $.each(
                data,
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    modelTable.append(
                        "<tr><td>" + rowData.id + "</td><td>" + rowData.brandId + "</td><td>" + rowData.name + "</td><td>" + rowData.totalProducts + "</td></tr>"
                    );
                }
            );
        }
    });
}

function searchProduct() {
    $(".order-table").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    let input = $(".product-table input");

    let productTable = $(".product-table tbody");

    productTable.html(''); // clear table

    $.ajax({
        url: "http://localhost/hands-free/api/product/search.php?" + "keywords=" + input.val(),
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            var productTable = $(".product-table tbody");
            // console.log(JSON.stringify(data));
            $.each(
                data['data'],
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    productTable.append(
                        "<tr><td>" + rowData.id + "</td><td>" + rowData.modelId + "</td><td>" + rowData.name + "</td><td>" + rowData.price + '<td><button type="button" class="btn btn-primary" onclick="detailProduct(' + rowData.id + ')">detail</button></td>' + "</tr>"
                    );
                }
            );
        }
    });
}

function searchOrder() {
    $(".product-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".order-table").show();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    let input = $(".order-table input");

    let orderTable = $(".order-table tbody");

    orderTable.html(''); // clear table

    let query = "keywords=" + input.val();

    $.ajax({
        url: "http://localhost/hands-free/api/admin/order/search.php?" + query,
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data['data']));
            $.each(
                data['data'],
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    let ele = "<tr><td>" + rowData.id + "</td><td>" + rowData.userId + "</td><td>" + rowData.orderTime + "</td><td>" + rowData.approveTime + "</td><td>" + rowData.completeTime;
                    ele += '</td><td><select class="form-control status-dropdown" id="status' + rowData.id + '"><option value="Order">Order</option><option value="Approved">Approved</option><option Completed>Completed</option></select></td><td>';
                    ele += rowData.paymentAddress + "</td><td>" + rowData.paymentMethod + "</td><td>" + rowData.totalPrice + '<td><button type="button" class="btn btn-primary" onclick="saveOrder(' + rowData.id + ')">Save</button></td>' + "</tr>";
                    orderTable.append(ele);
                    //render status
                    $('#status' + rowData.id).val(rowData.status);
                }
            );
        }
    });
}

function searchUser() {
    $(".product-table").hide();
    $(".product-detail").hide();
    $(".order-table").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").show();
    $(".brand-table").hide();
    $(".model-table").hide();
    let input = $(".user-table input");

    let userTable = $(".user-table tbody");

    userTable.html(''); // clear table

    let query = "keywords=" + input.val();

    $.ajax({
        url: "http://localhost/hands-free/api/admin/user/search.php?" + query,
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data['data']));
            $.each(
                data['data'],
                function (index, row) {
                    let rowData = $.parseJSON(JSON.stringify(row));
                    let ele = "<tr><td>" + rowData.id + "</td><td>" + rowData.email + "</td><td>" + rowData.firstName + "</td><td>" + rowData.lastName + "</td><td>" + rowData.tel + "</td><td>" + rowData.address + "</td><td>" + rowData.createdAt + "</td></tr>";
                    userTable.append(ele);
                }
            );
        }
    });
}

function detailProduct(productID) {
    $(".order-table").hide();
    $(".product-detail").show();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    $("#addBtn").hide();
    $("#editBtn").show();
    $.ajax({
        url: "http://localhost/hands-free/api/product/getOne.php?" + "id=" + productID,
        type: "GET",
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            $("#productID").val(data['id']);
            $("#modelID").val(data['modelId']);
            $("#productName").val(data['name']);
            $("#productPrice").val(data['price']);
            $("#ceilPrice").val(data['ceilPrice']);
            $("#bestSell").prop('checked', data['bestSell'] == '1');
            $("#bestGift").prop('checked', data['bestGift'] == '1');
            $("#bestPrice").prop('checked', data['bestPrice'] == '1');
            $("#hotNew").prop('checked', data['hotNew'] == '1');
            $("#hotDeal").prop('checked', data['hotDeal'] == '1');
            $("#recentlyViewed").prop('checked', data['recentlyViewed'] == '1');
            $("#productQuantity").val(data['quantity']);
            $("#productStatus").val(data['status']);
            $("#productWaranty").val(data['warranty']);
        }
    });
}


function updateProductDetail() {
    const id = $("#productID").val();
    const modelID = $("#modelID").val();
    const productName = $("#productName").val();
    const productPrice = $("#productPrice").val();
    const ceilPrice = $("#ceilPrice").val();
    const bestSell = $("#bestSell").prop('checked');
    const bestGift = $("#bestGift").prop('checked');
    const bestPrice = $("#bestPrice").prop('checked');
    const hotNew = $("#hotNew").prop('checked');
    const hotDeal = $("#hotDeal").prop('checked');
    const recentlyViewed = $("#recentlyViewed").prop('checked');
    const productQuantity = $("#productQuantity").val();
    const productStatus = $("#productStatus").val();
    const productWaranty = $("#productWaranty").val();
    let query = "id=" + id + "&";
    query += "name=" + productName + "&";
    query += "price=" + productPrice + "&";
    query += "ceilPrice=" + ceilPrice + "&";
    query += "bestSell=" + bestSell + "&";
    query += "bestGift=" + bestGift + "&";
    query += "bestPrice=" + bestPrice + "&";
    query += "hotNew=" + hotNew + "&";
    query += "hotDeal=" + hotDeal + "&";
    query += "recentlyViewed=" + recentlyViewed + "&";
    query += "status=" + productStatus + "&";
    query += "warranty=" + productWaranty;


    console.log(query);
    $.ajax({
        url: "http://localhost/hands-free/api/admin/product/update.php",
        type: "POST",
        data: query,
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            alert(data['message']);
        }
    });
}

function saveOrder(orderID) {
    let st = $('#status' + orderID).val();
    if (st == "Approved") {

        let query = "orderId=" + orderID;

        $.ajax({
            url: "http://localhost/hands-free/api/admin/order/approve.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err);
            },
            success: function (data) {
                console.log(JSON.stringify(data));
                alert(data['message']);
            }
        });
    }
    else if (st == "Completed") {
        let query = "orderId=" + orderID;

        $.ajax({
            url: "http://localhost/hands-free/api/admin/order/complete.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err);
            },
            success: function (data) {
                console.log(JSON.stringify(data));
                alert(data['message']);
            }
        });
    }
    else {
        alert("Không thể đổi thành trạng thái đang đặt hàng!");
    }
}

//Open/CLose
function closeProductDetail() {
    $(".product-detail").hide();
}

function openProductForm() {
    $(".order-table").hide();
    $(".product-table").hide();
    $(".product-detail").show();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    $("#addBtn").show();
    $("#editBtn").hide();

    $("#productID").val("");
    $("#modelID").val("");
    $("#productName").val("");
    $("#productPrice").val("");
    $("#ceilPrice").val("");
    $("#bestSell").prop('checked', false);
    $("#bestGift").prop('checked', false);
    $("#bestPrice").prop('checked', false);
    $("#hotNew").prop('checked', false);
    $("#hotDeal").prop('checked', false);
    $("#recentlyViewed").prop('checked', false);
    $("#productQuantity").val("");
    $("#productStatus").val("");
    $("#productWaranty").val("");
}

function openModelForm() {
    $(".order-table").hide();
    $(".product-table").hide();
    $(".product-detail").hide();
    $(".model-form").show();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
}

function openBrandForm() {
    $(".order-table").hide();
    $(".product-table").hide();
    $(".product-detail").hide();
    $(".model-form").hide();
    $(".brand-form").show();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
}

function closeModelForm() {
    $(".model-form").hide();
}

function closeBrandForm() {
    $(".brand-form").hide();
}



//Create
function creatNewProduct() {
    // const id = $("#productID").val();
    const modelID = $("#modelID").val();
    const productName = $("#productName").val();
    const productPrice = $("#productPrice").val();
    const ceilPrice = $("#ceilPrice").val();
    // const bestSell = $("#bestSell").prop('checked');
    // const bestGift = $("#bestGift").prop('checked');
    // const bestPrice = $("#bestPrice").prop('checked');
    // const hotNew = $("#hotNew").prop('checked');
    // const hotDeal = $("#hotDeal").prop('checked');
    // const recentlyViewed = $("#recentlyViewed").prop('checked');
    const productQuantity = $("#productQuantity").val();
    const productStatus = $("#productStatus").val();
    const productWaranty = $("#productWaranty").val();
    let query = "modelId=" + modelID + "&";
    query += "name=" + productName + "&";
    query += "price=" + productPrice + "&";
    query += "ceilPrice=" + ceilPrice + "&";
    // query += "bestSell=" + bestSell + "&";
    // query += "bestGift=" + bestGift + "&";
    // query += "bestPrice=" + bestPrice + "&";
    // query += "hotNew=" + hotNew + "&";
    // query += "hotDeal=" + hotDeal + "&";
    // query += "recentlyViewed=" + recentlyViewed + "&";
    query += "quantity=" + productQuantity + "&";
    query += "status=" + productStatus + "&";
    query += "warranty=" + productWaranty;

    console.log(query);
    $.ajax({
        url: "http://localhost/hands-free/api/admin/product/create.php",
        type: "POST",
        data: query,
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            alert(data['message']);
        }
    });
}

function CreateModel() {
    const brandId = $("#createModelId").val();
    const createModelName = $("#createModelName").val();
    let query = "brandId=" + brandId + "&";
    query += "name=" + createModelName;

    console.log(query);
    $.ajax({
        url: "http://localhost/hands-free/api/admin/model/create.php",
        type: "POST",
        data: query,
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            alert(data['message']);
        }
    });
}

function CreateBrand() {
    const brandName = $("#createBrandName").val();
    let query = "name=" + brandName;

    console.log(query);
    $.ajax({
        url: "http://localhost/hands-free/api/admin/brand/create.php",
        type: "POST",
        data: query,
        dataType: "json",
        headers: {
            'Authorization': getToken()
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err);
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            alert(data['message']);
        }
    });
}

//log out
function logOut() {
    clearAuthentication();
    location.reload();
}
if (isLoginedSync() == false) {
    window.location.href = "login.html";
}
else {
    let user = $.parseJSON(JSON.stringify(getUser()));
    $(".usernameDisplay").html(user.username);
}

const config = window.handsFreeConfig;

function convertPriceToText(price) {
    return `${window.numeral(price).format('0,0')} đ`;
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

    $('#menu-order').click();
});


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

    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/brand/get.php",
            type: "GET",
            success: function (data) {
                hideLoading();
                brandTable.html(''); // clear table

                // console.log(JSON.stringify(data));
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
        }).fail(err => handleError(err));
    })

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

    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/model/get.php",
            type: "GET",
            success: function (data) {
                hideLoading()
                modelTable.html(''); // clear table

                // console.log(JSON.stringify(data));
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
        }).fail(err => handleError(err));;
    })

}

const queryPage = {
    user: 1,
    product: 1
}

const funcQuery = {
    user: searchUser,
    product: searchProduct
}

function paginateTable($tb, page, total, totalPage, number, pageTable) {
    $tb.find('.number').text(number);
    $tb.find('.total').text(total);
    $tb.find('.pagination').html('');
    $tb.find('.pagination').append(`
        <li class="page-item">
            <a class="page-link page-prev" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span>      </a>
        </li>
    `)
    $tb.find('.pagination a.page-prev').click(() => {
        if (page > 1) {
            queryPage[pageTable] = page - 1;
            funcQuery[pageTable]();
        }
    })
    for (let i = 1; i <= totalPage; i++) {
        $tb.find('.pagination').append(`
            <li class="page-item ${i == page ? 'active' : ''}"><a class="page-link page-${i}" href="#">${i}</a></li>
        `)
        $tb.find(`.pagination a.page-${i}`).click(() => { 
            queryPage[pageTable] = i; 
            funcQuery[pageTable]();
        })
    }
    $tb.find('.pagination').append(`
        <li class="page-item">
            <a class="page-link page-next" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span></a>
        </li>
    `)
    $tb.find('.pagination a.page-next').click(() => {
        if (page < totalPage) {
            queryPage[pageTable] = page + 1;
            funcQuery[pageTable]();
        }
    })
}

function searchProduct(isResetPage) {
    if (isResetPage) queryPage.product = 1;
    $(".order-table").hide();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    $(".product-table").show();
    let input = $(".product-table input");

    let productTable = $(".product-table tbody");

    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/product/search.php?" + "keywords=" + input.val() + `&page=${queryPage.product}`,
            type: "GET",
            success: function (data) {
                hideLoading();
                productTable.html(''); // clear table

                let { total, page, onePage, totalPage, offset } = data;
                page = parseInt(page, 10);
                onePage = parseInt(onePage, 10);
                totalPage = parseInt(totalPage, 10);
                console.log(data);
                paginateTable($('.product-table'), page, total, totalPage, data['data'].length, 'product');
                // console.log(JSON.stringify(data));
                $.each(
                    data['data'],
                    function (index, row) {
                        let rowData = $.parseJSON(JSON.stringify(row));
                        productTable.append(
                            "<tr><td>" + rowData.id + "</td><td>" + rowData.modelId + "</td><td>" + rowData.name + "</td><td class=\"text-right\">" + convertPriceToText(rowData.price) + '<td class="text-center"><button type="button" class="btn btn-primary btn-xs btn-rounded" onclick="detailProduct(' + rowData.id + ')">Detail</button></td>' + "</tr>"
                        );
                    }
                );
            }
        }).fail(err => handleError(err));;
    })

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

    let query = "keywords=" + input.val();

    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/order/search.php?" + query,
            type: "GET",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                hideLoading();
                orderTable.html(''); // clear table

                // console.log(JSON.stringify(data['data']));
                $.each(
                    data['data'],
                    function (index, row) {
                        let rowData = $.parseJSON(JSON.stringify(row));
                        let ele = "<tr><td class=\"text-center\">" + rowData.id + "</td><td class=\"text-center\">" + rowData.userId + "</td><td>" + rowData.orderTime;
                        // "</td><td>" + rowData.approveTime + "</td><td>" + rowData.completeTime;
                        ele += '</td><td><select class="form-control status-dropdown" id="status' + rowData.id + '"><option value="Order">Order</option><option value="Approved">Approved</option><option Completed>Completed</option></select></td><td class=\"text-center\">';
                        ele += rowData.paymentAddress + "</td><td class=\"text-center\">" + rowData.paymentMethod + "</td><td class=\"text-right\">" + convertPriceToText(rowData.totalPrice) + '<td class="text-center"><button type="button" class="btn btn-primary btn-xs btn-rounded" onclick="saveOrder(' + rowData.id + ')"><i class="fas fa-check fa-xs"></i> OK</button></td>' + "</tr>";
                        orderTable.append(ele);
                        //render status
                        $('#status' + rowData.id).val(rowData.status);
                    }
                );
            }
        }).fail(err => handleError(err));;
    })

}

function searchUser(isResetPage) {
    if (isResetPage) queryPage.user = 1;
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


    let query = "keywords=" + input.val() + `&page=${queryPage.user}`;
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/user/search.php?" + query,
            type: "GET",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                hideLoading();
                userTable.html(''); // clear table
                let { total, page, onePage, totalPage, offset } = data;
                page = parseInt(page, 10);
                onePage = parseInt(onePage, 10);
                totalPage = parseInt(totalPage, 10);
                console.log(data);
                paginateTable($('.user-table'), page, total, totalPage, data['data'].length, 'user');
                // console.log(JSON.stringify(data['data']));
                $.each(
                    data['data'],
                    function (index, row) {
                        let rowData = $.parseJSON(JSON.stringify(row));
                        let ele = "<tr><td>" + rowData.id + "</td><td>" + rowData.email + "</td><td>" + rowData.firstName + "</td><td>" + rowData.lastName + "</td><td>" + rowData.tel + "</td><td>" + rowData.address + "</td><td>" + rowData.createdAt + "</td></tr>";
                        userTable.append(ele);
                    }
                );
            }
        }).fail(err => handleError(err));;
    })

}

function detailProduct(productID) {
    $(".order-table").hide();
    $(".product-detail").show();
    $(".model-form").hide();
    $(".brand-form").hide();
    $(".user-table").hide();
    $(".brand-table").hide();
    $(".model-table").hide();
    $(".product-table").hide();
    $("#addBtn").hide();
    $("#editBtn").show();
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/product/getOne.php?" + "id=" + productID,
            type: "GET",
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                hideLoading();
                // console.log(JSON.stringify(data));
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
        }).fail(err => handleError(err));;
    })

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
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/product/update.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                // console.log(JSON.stringify(data));
                handleSuccess(data['message']);
            }
        }).fail(err => handleError(err));;
    })

}

function saveOrder(orderID) {
    let st = $('#status' + orderID).val();
    if (st == "Approved") {

        let query = "orderId=" + orderID;
        showLoading(() => {
            $.ajax({
                url: config.baseUrl + "/api/admin/order/approve.php",
                type: "POST",
                data: query,
                dataType: "json",
                headers: {
                    'Authorization': getToken()
                },
                success: function (data) {
                    // console.log(JSON.stringify(data));
                    handleSuccess(data['message']);
                }
            }).fail(err => handleError(err));;;
        })

    }
    else if (st == "Completed") {
        let query = "orderId=" + orderID;
        showLoading(() => {
            $.ajax({
                url: config.baseUrl + "/api/admin/order/complete.php",
                type: "POST",
                data: query,
                dataType: "json",
                headers: {
                    'Authorization': getToken()
                },
                success: function (data) {
                    // console.log(JSON.stringify(data));
                    handleSuccess(data['message']);
                }
            }).fail(err => handleError(err));;
        })

    }
    else {
        alert("Không thể đổi thành trạng thái đang đặt hàng!");
    }
}

//Open/CLose
function closeProductDetail() {
    $(".product-detail").hide();
    $('#menu-product').click();
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
    $('#menu-model').click();
}

function closeBrandForm() {
    $(".brand-form").hide();
    $('#menu-brand').click();
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
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/product/create.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                // console.log(JSON.stringify(data));
                handleSuccess(data['message']);
                $('#menu-product').click();
            }
        }).fail(err => handleError(err));;
    })

}

function CreateModel() {
    const brandId = $("#createModelId").val();
    const createModelName = $("#createModelName").val();
    let query = "brandId=" + brandId + "&";
    query += "name=" + createModelName;

    console.log(query);
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/model/create.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                // console.log(JSON.stringify(data));
                handleSuccess(data['message']);
                $('#menu-model').click();
            }
        }).fail(err => handleError(err));;
    })
}

function CreateBrand() {
    const brandName = $("#createBrandName").val();
    let query = "name=" + brandName;

    console.log(query);
    showLoading(() => {
        $.ajax({
            url: config.baseUrl + "/api/admin/brand/create.php",
            type: "POST",
            data: query,
            dataType: "json",
            headers: {
                'Authorization': getToken()
            },
            success: function (data) {
                // console.log(JSON.stringify(data));
                handleSuccess(data['message']);
                $('#menu-brand').click();
            }
        }).fail(err => handleError(err));;
    })
}

//log out
function logOut() {
    clearAuthentication();
    location.reload();
}
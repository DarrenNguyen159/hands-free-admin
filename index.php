<!doctype html>
<html lang="en">
 
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/libs/css/style.css">
    <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
    <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
    <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
    <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
    <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">
    <title>Hands Free Mobile Admin</title>
</head>

<body>
    <!-- ============================================================== -->
    <!-- main wrapper -->
    <!-- ============================================================== -->
    <div class="dashboard-main-wrapper">
        <!-- ============================================================== -->
        <!-- navbar -->
        <!-- ============================================================== -->
        <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bg-white fixed-top">
                <a class="navbar-brand" href="index.html">Hands Free Admin</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/avatar-1.jpg" alt="" class="user-avatar-md rounded-circle"></a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <h5 class="mb-0 text-white nav-user-name usernameDisplay"></h5>
                                    <span class="status"></span><span class="ml-2">Available</span>
                                </div>
                                <a class="dropdown-item" href="#" onclick="logOut()"><i class="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <!-- ============================================================== -->
        <!-- end navbar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- left sidebar -->
        <!-- ============================================================== -->
        <div class="nav-left-sidebar sidebar-dark">
            <div class="menu-list">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav flex-column">
                            <li class="nav-divider">
                                Menu
                            </li>
                            

                            <li class="nav-item">
                                <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-5" aria-controls="submenu-5"><i class="fas fa-fw fa-table"></i>Bảng </a>
                                <div id="submenu-5" class="collapse submenu" style="">
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="getProductTable()">Sản phẩm</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="searchOrder()">Đơn hàng</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="searchUser()">User</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="getBrandTable()">Brand</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="getModelTable()">Model</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-6" aria-controls="submenu-6"><i class="fas fa-fw fa-table"></i>Thêm </a>
                                <div id="submenu-6" class="collapse submenu" style="">
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="openProductForm()">Sản phẩm</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="openModelForm()">Model</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" onclick="openBrandForm()">Brand</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            
                        </ul>
                        
                    </div>
                </nav>
                
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- end left sidebar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- wrapper  -->
        <!-- ============================================================== -->
        <div class="dashboard-wrapper">
            <!-- ============================================================== -->
            <!-- Main Dashborad -->
            <!-- ============================================================== -->
            
            <!-- Detail Product -->

            <div class="container-fluid dashboard-content product-detail">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Product Detail</h5>
                                <form>
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Mã sản phẩm</label>
                                            <input id="productID" type="text" class="form-control"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Model ID</label>
                                            <input id="modelID" type="text" class="form-control"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Model Name</label>
                                            <input id="modelName" type="text" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <lable class="col-form-table">Tên sản phẩm</label>
                                            <input id="productName" type="text" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Giá bán</label>
                                            <input id="productPrice" type="number" class="form-control"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Ciel Price</label>
                                            <input id="ceilPrice" type="number" class="form-control"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Số lượng</label>
                                            <input id="productQuantity" type="number" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="bestSell"><span class="custom-control-label">Best Sell</span>
                                            </label>
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="bestGift"><span class="custom-control-label">Best Gift</span>
                                            </label>
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="bestPrice"><span class="custom-control-label">Best Price</span>
                                            </label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="hotNew"><span class="custom-control-label">Hot New</span>
                                            </label>
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="hotDeal"><span class="custom-control-label">Hot Deal</span>
                                            </label>
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="recentlyViewed"><span class="custom-control-label">Recently Viewed</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <lable class="col-form-table">Tình trạng sản phẩm</label>
                                            <input id="productStatus" type="text" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <lable class="col-form-table">Thông tin bảo hành</label>
                                            <textarea id="productWaranty" type="text" class="form-control" row="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <button type="button" class="btn btn-success" id="addBtn" onclick="creatNewProduct()">Thêm</button>
                                            <button type="button" class="btn btn-success" id="editBtn" onclick="updateProductDetail()">Cập nhật</button>
                                            <button type="button" class="btn btn-danger" onclick="closeProductDetail()">Thoát</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Detail Product -->
            
                 
            <!-- Model Form -->
            <div class="container-fluid dashboard-content model-form">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Model</h5>
                                <form>
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Brand Id</label>
                                            <input id="createModelId" type="text" class="form-control"/>
                                        </div>    
                                                                             
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Tên Model</label>
                                            <input id="createModelName" type="text" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <button type="button" class="btn btn-success" onclick="CreateModel()">Thêm</button>
                                            <button type="button" class="btn btn-danger" onclick="closeModelForm()">Thoát</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <!-- End Model Form -->

            <!-- Brand Form -->
            <div class="container-fluid dashboard-content brand-form">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Model</h5>
                                <form>
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <lable class="col-form-table">Brand Name</label>
                                            <input id="createBrandName" type="text" class="form-control"/>
                                        </div>    
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-12">
                                            <button type="button" class="btn btn-success" onclick="CreateBrand()">Thêm</button>
                                            <button type="button" class="btn btn-danger" onclick="closeBrandForm()">Thoát</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <!-- End Brand Form -->

            <!-- Product Table -->
            <div class="container-fluid dashboard-content product-table">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Product Table</h5>
                                <div class="input-group mb-3">
                                    <input class="form-control" type="text" placeholder="Search" />
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary" onclick="searchProduct()">Search</button>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Model ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <!-- Data goes here -->
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Product Table -->
            
            <!-- order table -->
            <div class="container-fluid dashboard-content order-table">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Order Table</h5>
                                <div class="input-group mb-3">
                                    <input class="form-control" type="text" placeholder="Search"/>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary" onclick="searchOrder()">Search</button>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>User ID</th>
                                                <th>Order Time</th>
                                                <th>Approve Time</th>
                                                <th>Complete Time</th>
                                                <th>Status</th>
                                                <th>Payment Address</th>
                                                <th>Payment Method</th>
                                                <th>Total Price</th>
                                                <th>Change Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <!-- Data goes here -->
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End order detail -->

            <!-- User Table -->
            <div class="container-fluid dashboard-content user-table">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>User Table</h5>
                                <div class="input-group mb-3">
                                    <input class="form-control" type="text" placeholder="Search" />
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary" onclick="searchUser()">Search</button>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Email</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Phone #</th>
                                                <th>Address</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <!-- Data goes here -->
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End User Table -->

            <!-- Brand Table -->
            <div class="container-fluid dashboard-content brand-table">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Brand Table</h5>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Total Models</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <!-- Data goes here -->
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Brand Table -->

            <!-- Model Table -->
            <div class="container-fluid dashboard-content model-table">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5>Model Table</h5>
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Brand Id</th>
                                                <th>Name</th>
                                                <th>Total Products</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <!-- Data goes here -->
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Model Table -->

            <!-- ============================================================== -->
            <!-- end Main Dashborad -->
            <!-- ============================================================== -->

            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <div class="footer">
                <div class="container-fluid">
                    
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- end wrapper  -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- end main wrapper  -->
    <!-- ============================================================== -->
    <!-- Optional JavaScript -->
    <!-- jquery 3.3.1 -->
    <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
    <!-- bootstap bundle js -->
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
    <!-- slimscroll js -->
    <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
    
    <!-- auth.js -->
    <script src="auth.js"></script>

    <!-- My Script -->
    <script src="index.js"></script>

</body>
 
</html>
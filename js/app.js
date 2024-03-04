
var myCart = {};
var myProducts = {};


$(document).foundation();




function get_departments() {

    // alert("get_departments");

    var getDepartments = $.ajax({
        url: "services/get_departments.php",
        type: "POST",
        dataType: "json"
    });

    getDepartments.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDepartments)" +
            textStatus);
    });

    getDepartments.done(function (data) {
        // alert(data);
        var content = "";
        if (data.error.id == "0") {
            $.each(data.departments, function (i, item) {
                content += `<li class="getProductsByDepartment" data-id="${item.id}">${item.name}</li>`;
            });
        } else {
            alert("Oh no! something went wrong.");
        }
        $(".department_list").html(content);


    });

}

function getProductView(item) {
    var content = `<div class="large-3 medium-4 small-12 cell">
        <div class="card productCard">
            
            <div><img src="${item.image_path}" alt="${item.product_name}" class="productImg"></div>
            <h3>${item.product_name}</h3>
            
            <div>
                <span class="plus" data-id="${item.id}">+</span>
                <span class=" quantity quantity_${item.id}" data-id="${item.id}">1</span>
                <span class="minus" data-id="${item.id}">-</span>
            </div>
            <div>
                <input type="button" class="add_to_cart" data-id="${item.id}" value="Add to Cart">
            </div>
        </div>
        </div>`;

    return content;
}

function getProductsBySearch(search) {
    //alert(department_id);

    var getProducts = $.ajax({
        url: "services/get_products_by_search.php",
        type: "POST",
        data: {
            search: search
        },
        dataType: "json"
    });

    getProducts.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProducts-Search)" +
            textStatus);
    });

    getProducts.done(function (data) {
        //alert(data);
        var content = "";

        if (data.error.id == "0") {
            $.each(data.products, function (i, item) {
                content += getProductView(item);
            });
        }

        $(".productList").html(content);
    });
}


function getProductsByDepartment(department_id) {
    //alert(department_id);

    var getProducts = $.ajax({
        url: "services/get_products_by_department.php",
        type: "POST",
        data: {
            department_id: department_id
        },
        dataType: "json"
    });

    getProducts.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProducts)" +
            textStatus);
    });

    getProducts.done(function (data) {
        //alert(data);
        var content = "";
        if (data.error.id == "0") {
            $.each(data.products, function (i, item) {
                content += getProductView(item);
            });
        } else {
            alert("Oh no! something went wrong.");
        }

        $(".productList").html(content);


    });
}

function buildCart() {

    var content = `<div class="grid-x grid-padding-x">
                    
                    <div class="large-6 cell">
                    </div>
                    <div class="large-2 cell"><h3>Price</h3>
                    </div>
                    <div class="large-4 cell"><h3>Extended Price</h3>
                    </div>
                </div>`;


    var sub_total = 0.00;

    // loop through cart
    $.each(myProducts, function (i, item) {
        var item_number = i + 1;

        var quantity = myCart[item.id];
        var extended_price = parseInt(quantity) * parseFloat(item.avg_price);
        var extendPrice = extended_price.toFixed(2);
        var avg_price = parseFloat(item.avg_price);
        var avgPrice = avg_price.toFixed(2);

        
        content += `<div class="grid-x grid-padding-x">
        
                    <div class="large-6 productSection"> 
                        <div class="large-6 small-6 cell item cartImg"> 
                            <img src="${item.image_path}" alt="${item.product_name}" class="productImg">
                        </div>
                        <div class="large-6 small-6 cell">
                            <h2>${item.product_name}</h2>
                            $${avgPrice}
                            <h6 class="large-1 cell cart_delete" data-id="${item.id}"> remove</h6>
                            <div class="large-1 cell quantityCart">
                                <span class="cart_plus quantitySpan" data-id="${item.id}">+</span>
                                <span class="cart_quantity_${item.id} quantity quantitySpan" data-id="${item.id}">${quantity}</span>
                                <span class="cart_minus quantitySpan" data-id="${item.id}">-</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="large-2 cell">
                        $${avgPrice}
                    </div>
                    <div class="large-4 cell">
                        $${extendPrice}
                    </div>
                </div>`;
        
        sub_total = sub_total + extended_price;

    });

    var subTotal = sub_total.toFixed(2);
    var hst = subTotal * 0.13;
    var HST = hst.toFixed(2);
    var total = hst + sub_total;
    var TOTAL = total.toFixed(2);


    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                        
                    </div>
                    <div class="large-2 cell">Subtotal
                    </div>
                    <div class="large-2 cell">$${subTotal}
                    </div>
                </div>`;
    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                        
                    </div>
                    <div class="large-2 cell">HST
                    </div>
                    <div class="large-2 cell">$${HST}
                    </div>
                </div>`;

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                        
                    </div>
                    <div class="large-2 cell">Total
                    </div>
                    <div class="large-2 cell">$${TOTAL}
                    </div>
                </div>`;

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                        
                    </div>
                    <div class="large-2 cell">
                    </div>
                    <div class="large-2 cell">
                        <input id="checkout" value="Checkout" type="button">
                    </div>
                </div>`;







    // end cart


    $(".cart_data").html(content);

    $(".cart_wrapper").show();
}

function getProductsByCart() {

    var json = JSON.stringify(myCart);

    var getProducts = $.ajax({
        url: "services/get_products_by_cart.php",
        type: "POST",
        data: {
            json: json
        },
        dataType: "json"
    });

    getProducts.fail(function (jqXHR, textStatus) {
        alert("There is nothing in the cart" +
            textStatus);
    });

    getProducts.done(function (data) {
        //alert(data);

        myProducts = data.products;

        buildCart();

        /*
        var content = "";
        if (data.error.id == "0") {
            $.each(data.products, function (i, item) {
                content += getProductView(item);
            });
        } else {
            alert("Oh no! something went wrong.");
        }

        $(".productList").html(content);
        */

    });
}


Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


$(document).ready(
    function () {

        get_departments();

        $(document).on("click", "body #ca_loginOK", function () {
            $("#createAccountForm").submit();
        });

        $("#createAccountForm").on('submit', function (e) {
            e.preventDefault();
            let validate = false;

            /*
            let message = "";

            if ($("#genre").val() == "") {
                validate = true;
                message = `Please select a Genre
                `;
                $("#genre").focus();
            }

            if ($("#name").val() == "") {
                validate = true;
                message += `Please Enter a Name.
                `;
                $("#name").focus();
            }
            */
            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/create_account.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#ca_loginOK').attr("disabled", "disabled");
                        $('#createAccountForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);

                        alert(data.error.message);
                        alert("USER ID: " + data.user_id);

                        $('#createAccountForm').css("opacity", "");
                        $("#ca_loginOK").removeAttr("disabled");
                    }
                });

            }
        });

        $(document).on("click", "body #loginOK", function () {
            //alert("Please Please More sir!");
            $("#loginForm").submit();
        });


        $("#loginForm").on('submit', function (e) {

            e.preventDefault();
            let validate = false;

            /*
            let message = "";

            if ($("#genre").val() == "") {
                validate = true;
                message = `Please select a Genre
                `;
                $("#genre").focus();
            }

            if ($("#name").val() == "") {
                validate = true;
                message += `Please Enter a Name.
                `;
                $("#name").focus();
            }
            */

            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/login_account.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#oginOK').attr("disabled", "disabled");
                        $('#loginForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);


                        alert("USER ID: " + data.ea_user_id);

                        if (data.error.id == "0" && data.ea_user_id != "-1") {
                            // success
                            $('.login').hide();
                            $("#billing_name_first").val(data.billing_name_first);
                            $("#billing_name_last").val(data.billing_name_last);
                            $('.shippingAndBilling').show();
                        } else {
                            alert(data.error.message);
                        }

                        $('#loginForm').css("opacity", "");
                        $("#loginOK").removeAttr("disabled");
                    }
                });

            }
        });


        // signout as guest
        $(document).on("click", "body #guest", function () {
            $(".hideAll").hide();
            $(".shippingAndBilling").show();
        });


        // create account

        $(document).on("click", "body #createAccount", function () {
            $(".hideAll").hide();
            $(".createAccount").show();
        });


        // checkout
        $(document).on("click", "body #checkout", function () {
            $(".cart_data").hide();
            $(".checkout").show();

        });

        // login

        $(document).on("click", "body #login", function () {
            $(".hideAll").hide();
            $(".login").show();
        });


        $(document).on("click", "body .cart_plus", function () {
            var product_id = $(this).attr("data-id");
            var quantity = parseInt(myCart[product_id] + 1);
            myCart[product_id] = quantity;
            buildCart();
        });

        $(document).on("click", "body .cart_minus", function () {
            var product_id = $(this).attr("data-id");
            var quantity = parseInt(myCart[product_id] - 1);
            if (quantity < 1) {
                quantity = 1;
            }
            myCart[product_id] = quantity;
            buildCart();
        });

        $(document).on("click", "body .cart_delete", function () {
            var product_id = $(this).attr("data-id");
            delete myCart[product_id];
            var size = Object.size(myCart);
            console.log(myCart);
            $(".cartCircle").html(size);

            var deleteItem;

            $.each(myProducts, function (i, item) {
                if (item.id == product_id) {
                    deleteItem = i;

                }
            });

            if (deleteItem != undefined) {
                myProducts.splice(deleteItem, 1);
            }

            buildCart();
        });


        $(".cartCircle").click(
            function () {

                getProductsByCart();

                //$(".cart_wrapper").show();
            }
        );

        // $(".close-button").click(
        //     function () {
        //         console.log("close")
        //     $(".cart_wrapper").hide();
        // }
        // );

        $("#search").keyup(function () {
            var search = $(this).val();
            getProductsBySearch(search);
        });

        $(document).on("click", "body .getProductsByDepartment", function () {
            var department_id = $(this).attr("data-id");
            getProductsByDepartment(department_id);
            $(".department_container").hide();
        });

        $(document).on("click", "body .plus", function () {
            var product_id = $(this).attr("data-id");
            var quantity = parseInt($(".quantity_" + product_id).html());
            ++quantity;
            $(".quantity_" + product_id).html(quantity);
        });



        $(document).on("click", "body .minus", function () {
            var product_id = $(this).attr("data-id");
            var quantity = parseInt($(".quantity_" + product_id).html());
            --quantity;
            if (quantity < 1) {
                quantity = 1;
            }
            $(".quantity_" + product_id).html(quantity);
        });


        $(document).on("click", "body .add_to_cart", function () {
            var product_id = $(this).attr("data-id");
            var quantity = parseInt($(".quantity_" + product_id).html());

            if (myCart[product_id] != undefined) {
                var currentValue = myCart[product_id];
                myCart[product_id] = parseInt(quantity) + parseInt(currentValue);
            } else {
                myCart[product_id] = quantity;
            }

            var size = Object.size(myCart);
            $(".cartCircle").html(size);

        });

        // MOVE TO STEP THREE, SCREEN BUTTON CALLED CONTINUE AFTER USER SUBMITS THEIR DATA

        $(document).on("click", "body #go_to_three", function () {
            $(".hideAll").hide();
            $(".payment").show();
        });


        // STEP FOUR IN THE CART (GET THE PAYMENT INFO)

        // SUBMIT THE PAYMENT FORM AFTER CLICKING THE COMPLETE BUTTON 

        $(document).on("click", "body #go_to_four", function () {
            //alert("Please Please More sir!");
            $("#paymentForm").submit();
        });


        $("#paymentForm").on('submit', function (e) {

            e.preventDefault();

            let validate = false;

            /*
            let message = "";

            if ($("#genre").val() == "") {
                validate = true;
                message = `Please select a Genre
                `;
                $("#genre").focus();
            }

            if ($("#name").val() == "") {
                validate = true;
                message += `Please Enter a Name.
                `;
                $("#name").focus();
            }
            */

            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/make_payment.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#go_to_three').attr("disabled", "disabled");
                        $('#paymentForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);


                        //alert("USER ID: " + data.ea_user_id);

                        if (data.error.id == "0") {
                            // save to hidden field transaction code
                            alert(data.transaction_code);

                            $("#transaction_code").val(data.transaction_code);

                            // save items to hidden fields
                            var content = "";
                            $.each(myCart, function (i, item) {
                                content += `<input name="myCart[${i}]" type="hidden" value="${item}">`;

                            });

                            $(".products_to_purchase").html(content);

                            // SUBMIT THE SHIPPIN AND BILLING ALREADY FILLED OUT.
                            $("#shippingAndBillingForm").submit();

                        } else {
                            alert(data.error.message);
                        }

                        $('#paymentForm').css("opacity", "");
                        $("#go_to_three").removeAttr("disabled");
                    }
                });

            }
        });


        // SECOND FORM SUBMITTED WHEN ON THE THIRD SCREEN AND GOING TO THE LAST FOURTH SCREEN.

        $("#shippingAndBillingForm").on('submit', function (e) {

            //alert("LINE 702");

            e.preventDefault();

            let validate = false;

            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/make_invoice.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        //$('#go_to_three').attr("disabled", "disabled");
                        //$('#paymentForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);

                        if (data.error.id == "0") {
                            // submitInvoice();
                            // hide this screen
                            // show last screen and invoice number , 
                            // sent email or even list of items purchased

                        } else {
                            alert(data.error.message);
                        }

                        $(".hideAll").hide();
                        // create invoice from myCart
                        $(".invoice").show();
                        //$('#paymentForm').css("opacity", "");
                        //$("#go_to_three").removeAttr("disabled");
                    }

                });
            }
        });


    }
    

);



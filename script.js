let count = 0;
alert("JavaScript اجرا شد");
let totalPrice = 0;

let cart = document.querySelector("#cart-count");
let cartItems = document.querySelector("#cart-items");
let cartTotal = document.querySelector("#cart-total");
let clearCart = document.querySelector("#clear-cart");

let buttons = document.querySelectorAll(".buy-btn");


// ===============================
// افزودن محصول به سبد خرید
// ===============================

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        let productName = button.dataset.name;
        let productPrice = Number(button.dataset.price);

        let existingItem = Array.from(cartItems.children).find(function(item){
            return item.dataset.name === productName;
        });

        if(existingItem){

            let itemCount = Number(existingItem.dataset.count);

            itemCount = itemCount + 1;

            existingItem.dataset.count = itemCount;

            count = count + 1;
            totalPrice = totalPrice + productPrice;

            cart.innerHTML = count;

            cartTotal.innerHTML =
                "جمع کل: " +
                totalPrice.toLocaleString() +
                " تومان";

            existingItem.innerHTML =
                existingItem.innerHTML.replace(
                    /تعداد: \d+/,
                    "تعداد: " + itemCount
                );

            alert(productName + " به سبد خرید اضافه شد 🛒");

            return;
        }

        count = count + 1;
        totalPrice = totalPrice + productPrice;

        cart.innerHTML = count;

        cartTotal.innerHTML =
            "جمع کل: " +
            totalPrice.toLocaleString() +
            " تومان";

        cartItems.innerHTML +=
            "<p data-name=\"" + productName +
            "\" data-price=\"" + productPrice +
            "\" data-count=\"1\">" +

            productName +
            " - " +
            productPrice.toLocaleString() +
            " تومان | تعداد: 1 " +

            "<button class=\"decrease-btn\">➖</button>" +
            "<button class=\"increase-btn\">➕</button>" +
            "<button class=\"remove-btn\">حذف</button>" +

            "</p>";

        // پیام اضافه شدن محصول
        alert(productName + " به سبد خرید اضافه شد ");

    });

});


// ===============================
// دکمه های افزایش، کاهش و حذف
// ===============================

cartItems.addEventListener("click", function(event){

    let item = event.target.parentElement;

    if(event.target.classList.contains("increase-btn")){

        let itemCount = Number(item.dataset.count);
        let itemPrice = Number(item.dataset.price);

        itemCount = itemCount + 1;

        item.dataset.count = itemCount;

        count = count + 1;
        totalPrice = totalPrice + itemPrice;

        cart.innerHTML = count;
        cartTotal.innerHTML =
            "جمع کل: " + totalPrice.toLocaleString() + " تومان";

        item.innerHTML =
            item.innerHTML.replace(
                /تعداد: \d+/,
                "تعداد: " + itemCount
            );
    }


    if(event.target.classList.contains("decrease-btn")){

        let itemCount = Number(item.dataset.count);
        let itemPrice = Number(item.dataset.price);

        if(itemCount > 1){

            itemCount = itemCount - 1;

            item.dataset.count = itemCount;

            count = count - 1;
            totalPrice = totalPrice - itemPrice;

            cart.innerHTML = count;
            cartTotal.innerHTML =
                "جمع کل: " + totalPrice.toLocaleString() + " تومان";

            item.innerHTML =
                item.innerHTML.replace(
                    /تعداد: \d+/,
                    "تعداد: " + itemCount
                );
        }
    }


    if(event.target.classList.contains("remove-btn")){

        let itemCount = Number(item.dataset.count);
        let itemPrice = Number(item.dataset.price);

        count = count - itemCount;
        totalPrice = totalPrice - (itemPrice * itemCount);

        cart.innerHTML = count;

        cartTotal.innerHTML =
            "جمع کل: " + totalPrice.toLocaleString() + " تومان";

        item.remove();
    }

});


// ===============================
// پاک کردن کامل سبد خرید
// ===============================

clearCart.addEventListener("click", function(){count = 0;
    totalPrice = 0;

    cart.innerHTML = "0";

    cartItems.innerHTML = "";

    cartTotal.innerHTML = "جمع کل: 0 تومان";

});


// ===============================
// ثبت اطلاعات مشتری
// ===============================

let orderForm = document.querySelector("#order-form");

orderForm.addEventListener("submit", function(event){

    event.preventDefault();

    if(count === 0){

        alert("لطفاً ابتدا حداقل یک محصول به سبد خرید اضافه کنید.");

        return;
    }


    let customerName =
        document.querySelector("#customer-name").value;

    let customerPhone =
        document.querySelector("#customer-phone").value;

    let customerAddress =
        document.querySelector("#customer-address").value;


    // ===============================
    // ساخت خلاصه سفارش
    // ===============================

    let orderSummary = document.querySelector("#order-summary");


    if(!orderSummary){

        orderSummary = document.createElement("div");

        orderSummary.id = "order-summary";

        orderSummary.style.width = "90%";
        orderSummary.style.maxWidth = "600px";
        orderSummary.style.margin = "30px auto";
        orderSummary.style.padding = "25px";
        orderSummary.style.background = "#f1f8e9";
        orderSummary.style.border = "2px solid #2e7d32";
        orderSummary.style.borderRadius = "15px";
        orderSummary.style.boxSizing = "border-box";
        orderSummary.style.textAlign = "right";

        document.querySelector("#order").appendChild(orderSummary);
    }


    let productsText = "";

    Array.from(cartItems.children).forEach(function(item){

        let name = item.dataset.name;
        let price = Number(item.dataset.price);
        let itemCount = Number(item.dataset.count);

        productsText +=
            "<p>" +
            "🛍️ " + name +
            "<br>" +
            "تعداد: " + itemCount +
            "<br>" +
            "قیمت: " + price.toLocaleString() + " تومان" +
            "</p>";
    });


    orderSummary.innerHTML =

        "<h2 style='color:#1c7d31; text-align:center;'>" +
        "خلاصه سفارش" +
        "</h2>" +

        "<p><strong>👤 نام:</strong> " +
        customerName +
        "</p>" +

        "<p><strong>📱 شماره تماس:</strong> " +
        customerPhone +
        "</p>" +

        "<p><strong>📍 آدرس:</strong> " +
        customerAddress +
        "</p>" +

        "<hr>" +

        "<h3>🛒 محصولات:</h3>" +

        productsText +

        "<hr>" +

        "<h3 style='color:#1c7d31;'>" +
        "💰 جمع کل: " +
        totalPrice.toLocaleString() +
        " تومان" +
        "</h3>" +

        "<button id='final-confirm' type='button' " +
        "style='width:100%; padding:12px; background:#2e7d32; color:white; border:none; border-radius:8px; font-size:16px; font-weight:bold; cursor:pointer;'>" +

        "تأیید نهایی سفارش" +

        "</button>";

});

// ===============================
// تأیید نهایی سفارش
// ذخیره در Google Sheets + ارسال به واتساپ
// ===============================

document.addEventListener("click", function(event){

    if(event.target.id === "final-confirm"){

        // اطلاعات مشتری
        let customerName =
            document.querySelector("#customer-name").value;

        let customerPhone =
            document.querySelector("#customer-phone").value;

        let customerAddress =
            document.querySelector("#customer-address").value;


        // ===============================
        // ساخت لیست محصولات
        // ===============================

        let productsMessage = "";

        Array.from(cartItems.children).forEach(function(item){

            let name = item.dataset.name;
            let price = Number(item.dataset.price);
            let itemCount = Number(item.dataset.count);

            productsMessage +=
                "• " + name +
                " | تعداد: " + itemCount +
                " | قیمت هر عدد: " +
                price.toLocaleString() +
                " تومان\n";
        });


        // ===============================
        // ساخت متن سفارش
        // ===============================

        let message =
            "🌿 سفارش جدید Forever Hoda\n\n" +

            "👤 نام مشتری: " +
            customerName +
            "\n\n" +

            "📱 شماره تماس: " +
            customerPhone +
            "\n\n" +

            "📍 آدرس:\n" +
            customerAddress +
            "\n\n" +

            "🛒 محصولات:\n" +
            productsMessage +

            "\n💰 جمع کل: " +
            totalPrice.toLocaleString() +
            " تومان";


        // ===============================
        // اطلاعات برای Google Sheets
        // ===============================

        let orderData = {

            customerName: customerName,

            customerPhone: customerPhone,

            customerAddress: customerAddress,

            products: productsMessage,

            totalPrice: totalPrice

        };


        // ===============================
        // ارسال سفارش به Google Sheets
        // ===============================

        fetch(
            "https://script.google.com/macros/s/AKfycbwencZlHydAANwTFmhp7atJNeTCy0L7Txfpb51Npr2Ozgl3eiV4N3FCs2gefzirOtbi/exec",
            {
                method: "POST",
                body: JSON.stringify(orderData)
            }
        )

        .then(function(response){

            return response.json();

        })

        .then(function(data){

            if(data.status === "success"){

                // ===============================
                // ارسال سفارش به واتساپ
                // ===============================

                let whatsappNumber =
                    "989169796744";

                let whatsappUrl =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappUrl,
                    "_blank"
                );


                // ===============================
                // پیام موفقیت
                // ===============================

                alert(
                    "سفارش با موفقیت ثبت شد و برای ارسال در واتساپ آماده است 🌿"
                );


                // ===============================
                // پاک کردن سبد خرید
                // ===============================

                count = 0;

                totalPrice = 0;

                cart.innerHTML = "0";

                cartItems.innerHTML = "";

                cartTotal.innerHTML =
                    "جمع کل: 0 تومان";


                // ===============================
                // پاک کردن اطلاعات مشتری
                // ===============================

                document.querySelector(
                    "#customer-name"
                ).value = "";
				document.querySelector(
                    "#customer-phone"
                ).value = "";

                document.querySelector(
                    "#customer-address"
                ).value = "";


                // ===============================
                // حذف خلاصه سفارش
                // ===============================

                let orderSummary =
                    document.querySelector(
                        "#order-summary"
                    );

                if(orderSummary){

                    orderSummary.remove();

                }

            }

        })

        .catch(function(error){

            console.log(error);

            alert(
                "در ثبت سفارش مشکلی پیش آمد. لطفاً دوباره تلاش کنید."
            );

        });

    }

});
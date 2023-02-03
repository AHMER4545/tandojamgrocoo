//OPEN AND CLOSE OPTION //

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");



cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active");
});


closeCart.addEventListener("click", ()=>{
    cart.classList.remove("active");
});



//start when documentation ready for submition according to our final destination //

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

//===================================START===========================================//
function start() {
    addEvents();
}




//===================UPDATE AND REMINDER================
function update(){
    addEvents();
    updateTotal();     
}



//========================ADD EVENTS ===================================//

function addEvents(){
  //remove items from carts //
  let cartRemove_btns =document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click" , handle_removeCartItem);
});

//change items quantity//
let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach(input =>{
    input.addEventListener("change",handle_changeItemQuantity);
});

//add items from cart //
let addCart_btns = document.querySelectorAll(".add-cart");
addCart_btns.forEach((btn) =>{
 btn.addEventListener("click", handle_addCartItem);
});
    //Buy Order//
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);

}

//===================HANDLE===================//
let itemsAdded = []

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgsrc = product.querySelector(".product-img").src;
    console.log(title, price, imgsrc);

    let newToAdd = {
        title,
        price,
        imgsrc,   
    };
    //handle item is already exists//
    if(itemsAdded.find(el => el.title ==newToAdd.title)){
        alert("This item Is Already Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }


    //Add product to cart //
    let cartBoxElement = CartBoxComponent(title,price,imgsrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    
    
    update();

}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el=> el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}


function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1; 
    }
    this.value = Math.floor(this.value); // to keep it integers 

    update();

}


function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is no Order to place Yet! \n please Make an Order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your order is placed Sucessfull Only Please add your info");
    itemsAdded = [];

    update();
}


//=====================UPDATE&REMINEDER=================//

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("RS",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    //keep 2 digits after decimal points//
    total = total.toFixed(2);
    //or you can use also//
    //total = Math.round(total * 100) / 100;


    totalElement.innerHTML = "RS" + total;
}



//===========================HTML COMPONETS========================/

function CartBoxComponent(title,price,imgsrc){
    return`
    <div class="cart-box">
    <img src=${imgsrc} alt="" class="cart-img">
    <div class="detail-box">
       <div class="cart-product-title">${title}</div>
       <div class="cart-price">${price}</div>
       <input type="number"  value="1" class="cart-quantity" >
    </div>
    <!---REMOVY GO AHMER BILLIONAIRE CART-->
    <i class='bx bxs-trash-alt cart-remove'></i>
     </div>`;
}


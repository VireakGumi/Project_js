
// variables_____________________________________
let span_price = document.querySelector('#price');
let span_availablity = document.querySelector('#availablity');
let span_screen = document.querySelector('#screen');
let span_color = document.querySelector('#color');
let span_cpu = document.querySelector('#cpu');
let span_ram = document.querySelector('#ram');
let span_store = document.querySelector('#store');
let span_description = document.querySelector('#description');
let brand = document.querySelector('#brand');
let dom_title = document.querySelector(".title");
let dom_image = document.querySelector("#image");
let dom_cart = document.querySelector(".box-dialog-chart");
let dom_buy = document.querySelector(".box-dialog-buy");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
// localStorage.setItem("cart", JSON.stringify(cart));
let index = Number(localStorage.getItem("index"));
// Function_____________________________________


// show elements
function show(elements) {
    elements.style.display = "block";
}
// hide elements
function hide(elements) {
    elements.style.display = "none";
}


function saveProduct() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadProduct() {
    let productStorage = JSON.parse(localStorage.getItem("products"));
    if (productStorage !== null) {
        products = productStorage;
    }
}
function generateDetails() {
    brand.textContent = product.title
    span_price.textContent = product.price;
    span_availablity.textContent = product.availablity;
    span_screen.textContent = product.screen;
    span_color.textContent = product.color;
    span_cpu.textContent = product.cpu;
    span_ram.textContent = product.ram;
    span_store.textContent = product.store;
    span_description.textContent = product.description;

    let img = document.createElement("img");
    img.src = product.img;
    img.style.width = '600px';
    dom_image.appendChild(img);
}

function renderCard() {
    loadProduct()
    document.querySelector(".list-1").remove();
    let list = document.createElement('div');
    list.className = "list-1";
    let limit = 0;
    for (let n in products) {
        let num = Math.floor(Math.random() * products.length) + 1;
        if (num != index && limit < 3) {
            let a = document.createElement('a');
            a.href = '../detailPage/detail.html'
            a.dataset.index = n
            a.addEventListener("click", setData);
            let card = document.createElement('div');
            card.className = "card";
            let sub = document.createElement('div');
            sub.className = "sub-card";
            let image = document.createElement('img');
            image.src = products[n].img;
            image.style.width = '300px'
            sub.appendChild(image);
            let text = document.createElement('div');
            text.className = "text-card";
            let toptext = document.createElement('div');
            toptext.className = "top-text";
            let title = document.createElement('p');
            title.id = "title";
            title.textContent = products[n].title;
            toptext.appendChild(title);
            let subTewxt = document.createElement('div');
            subTewxt.className = "sub-text";
            let img = document.createElement('img');
            img.src = "../../../img/star.png";
            img.style.width = "100px";
            subTewxt.appendChild(img);
            let price = document.createElement('p');
            price.id = "price";
            price.textContent = products[n].price;
            subTewxt.appendChild(price);
            toptext.appendChild(subTewxt);
            text.appendChild(toptext);

            card.appendChild(sub);
            card.appendChild(text);
            a.appendChild(card)
            list.appendChild(a);
            limit++;
        }
    }
    document.querySelector("main").appendChild(list);
}

function addCart() {
    let chart = {
        title: product.title,
        img_chart: product.img,
        price: product.price,
        id: product.id
    }
    let check = true;
    for (let i in cart) {
        if (cart[i].id == product.id) {
            check = false;
        }
    }
    if (check) {
        cart.push(chart);
        localStorage.setItem("cart", JSON.stringify(cart));
        showonWeb();
    }
}

function showonWeb() {
    cart = JSON.parse(localStorage.getItem("cart"));
    
    if (cart.length) {
        show(dom_cart);
        dom_cart.querySelector(".list-cart").remove();
        let list = document.createElement('div');
        list.className = "list-cart";
        for (let n in cart) {
            let item = document.createElement("div");
            item.className = "item";
            item.dataset.index = n;
            let img_chart = document.createElement("img");
            img_chart.src = cart[n].img_chart;
            img_chart.style.width = "100px";
            let h4 = document.createElement("h4");
            h4.textContent = cart[n].title;
            let price = document.createElement("p");
            price.textContent = cart[n].price;
            let menu = document.createElement("menu");
            let btnRemove = document.createElement("button");
            btnRemove.textContent = "Remove";
            btnRemove.addEventListener("click", remove);
            let btnBuy = document.createElement("button");
            btnBuy.textContent = "Buy";
            btnBuy.addEventListener("click", showBuydialog);
            menu.appendChild(btnRemove);
            menu.appendChild(btnBuy);
            item.appendChild(img_chart);
            item.appendChild(h4);
            item.appendChild(price);
            item.appendChild(menu);
            list.appendChild(item);
        }
        dom_cart.querySelector('dialog').appendChild(list);
    } else {
        hide(dom_cart);
    }
}
function hideBuy(){
    hide(dom_buy);
}

function showBuydialog() {
    show(dom_buy);
}

function remove(event) {
    let i = event.target.parentElement.parentElement.dataset.index;
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showonWeb();
}


function setData(event) {
    let index = event.currentTarget.dataset.index;;
    localStorage.setItem("index", Number(index));


}

// main________________________________
renderCard();
let product = products[index];
dom_title.style.backgroundImage = 'url(' + product.img + ')'
let h1 = dom_title.querySelector('h1');
h1.textContent = product.title;
if (cart.length) {
    show(dom_cart);
}else{
    hide(dom_cart);

}
generateDetails()
showonWeb()
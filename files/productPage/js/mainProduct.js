
// variables_____________________________________
const dom_slides = document.querySelectorAll(".mySlides");
let dom_search = document.querySelector(".search-input");
let dom_cart = document.querySelector('.box-dialog-chart')
let dom_buy = document.querySelector('.box-dialog-buy')

// variables_____________________________________
let slideIndex = 0;
let products = []
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
localStorage.setItem("index", JSON.stringify(null));




// Function_____________________________________

// show elements
function show(elements) {
  elements.style.display = "block";
}
// hide elements
function hide(elements) {
  elements.style.display = "none";
}


function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slides.length < slideIndex) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
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

function renderCard() {
  loadProduct()
  document.querySelector("main").remove();
  let main = document.createElement("main");
  let list = document.createElement('div');
  list.className = "list-1";
  for (let n in products) {
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
  }
  main.appendChild(list);
  document.querySelector(".right-side").appendChild(main);
}
function setData(event) {
  let index = event.currentTarget.dataset.index;;
  localStorage.setItem("index", Number(index));
}

// search for products
function searchBook(event) {
  let Textsearch = dom_search.value.toUpperCase();
  let dom_main = document.querySelector("main .list-1");

  // 2- Loop on all LI
  for (let value of dom_main.children) {
    let title = value.querySelector('#title').textContent.toUpperCase();
    value.style.display = "none"
    if (title == Textsearch || title.includes(Textsearch)) {
      value.style.display = "block"
    }

  }


};

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


// main________________________________



dom_search.addEventListener('keyup', function (e) {
  searchBook(e);
})



showonWeb()
renderCard();
showSlides()
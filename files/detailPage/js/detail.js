
// variables_____________________________________
let  span_price = document.querySelector('#price');
let  span_availablity = document.querySelector('#availablity');
let  span_screen = document.querySelector('#screen');
let  span_color = document.querySelector('#color');
let  span_cpu = document.querySelector('#cpu');
let  span_ram = document.querySelector('#ram');
let  span_store = document.querySelector('#store');
let  span_description = document.querySelector('#description');
let  brand = document.querySelector('#brand');
let  dom_title = document.querySelector(".title");
let dom_image = document.querySelector("#image");
let dom_chart = document.querySelector(".box-dialog-chart");

let products = [];
let charts = []
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
function generateDetails(){
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
            console.log('pro')
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

function addCart(){
    let chart = {
        title: product.title,
        img_chart: product.img
    }
    charts.push(chart);
    showonWeb();
}

function showonWeb(){
    if(charts.length){
        show(dom_chart);
        dom_chart.querySelector(".list-chart").remove();
        let list = document.createElement('div');
        list.className = "list-chart";
        for (let n in charts) {
            let item = document.createElement("div");
            item.className = "item";
            let img_chart = document.createElement("img");
            img_chart.src = charts[n].img_chart;
            img_chart.style.width = "100px";
            let h4 = document.createElement("h4");
            h4.textContent = charts[n].title;
            let menu = document.createElement("menu");
            let btnRemove = document.createElement("button");
            btnRemove.textContent = "Remove";
            // btnRemove.addEventListener("click", remove);
            let btnBuy  = document.createElement("button");
            btnBuy.textContent = "Buy";
            // btnBuy.addEventListener("click", buy);
            menu.appendChild(btnRemove);
            menu.appendChild(btnBuy);
            item.appendChild(img_chart);
            item.appendChild(h4);
            item.appendChild(menu);
            list.appendChild(item);
            console.log(list)
        }
        dom_chart.appendChild(list);



        
    }else{
        hide(dom_chart);
    }
}

function setData(event) {
    let index = event.currentTarget.dataset.index;;
    localStorage.setItem("index", Number(index));
  
  
  }

// main________________________________
renderCard();
// console.log(products[index].img)
let product = products[index];
dom_title.style.backgroundImage = 'url('+product.img+')'
let h1 = dom_title.querySelector('h1');
h1.textContent = product.title;
generateDetails()
let ss = dom_chart.querySelector('.list-chart');
console.log(ss)

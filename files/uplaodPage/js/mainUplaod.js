// Constants variables_____________________________________
const dom_dialog = document.querySelector(".content-dialog");
const dom_table = document.querySelector("table");

// Constants DOM elements_____________________________________
const dom_title = dom_dialog.querySelector("#title");
const dom_price = dom_dialog.querySelector("#price");
const dom_availablity = dom_dialog.querySelector("#availablity");
const dom_screen = dom_dialog.querySelector("#screen");
const dom_cpu = dom_dialog.querySelector("#cpu");
const dom_ram = dom_dialog.querySelector("#ram");
const dom_storage = dom_dialog.querySelector("#storage");
const dom_color = dom_dialog.querySelector("#color");
const dom_inputImg = dom_dialog.querySelector("#inputImg");
const dom_description = dom_dialog.querySelector("#description");

// variables_____________________________________
let getData = ""
let products = [
    // {
    //     img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
    //     title: "Zephyrus DuO",
    //     price: "$1000",
    //     availablity: "in stock",
    //     cpu: "intel core i9",
    //     screen: "13inch",
    //     ram: "16GB",
    //     storage: "512GB SSD",
    //     color: "red",
    //     description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this Products may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    // },
    // {
    //     img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
    //     title: "Zephyrus DuO",
    //     price: "$1000",
    //     availablity: "in stock",
    //     cpu: "intel core i9",
    //     screen: "13inch",
    //     ram: "16GB",
    //     storage: "512GB SSD",
    //     color: "red",
    //     description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this Products may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    // },
    // {
    //     img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
    //     title: "Zephyrus DuO",
    //     price: "$1000",
    //     availablity: "in stock",
    //     cpu: "intel core i9",
    //     screen: "13inch",
    //     ram: "16GB",
    //     storage: "512GB SSD",
    //     color: "red",
    //     description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this Products may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    // },
    
    
]

// Function_____________________________________

// show elements
function show(elements) {
    elements.style.display = "block";
}
// hide elements
function hide(elements) {
    elements.style.display = "none";
}

//  LOCAL STORAGE ---------------------------------------------------------
function saveProduct() {
    localStorage.setItem("products", JSON.stringify(products));
  }
  
  function loadProduct() {
    let productStorage = JSON.parse(localStorage.getItem("products"));
    if (productStorage !== null) {
        products = productStorage;
    }
  }

// renderProduct function
function renderProduct(){
    loadProduct()
    // remove table 
    dom_table.querySelector("tbody").remove();
    let tbody = document.createElement("tbody");
    for (let i in products){
        spot_product = products[i];
        let tr = document.createElement("tr");
        tr.dataset.index = i;

        // add ID
        let td_id = document.createElement("td");
        td_id.textContent = Number(i) + 1;
        tr.appendChild(td_id);

        // add textContent title to td
        let td_title = document.createElement("td");
        td_title.textContent = spot_product.title;
        tr.appendChild(td_title);

        // add price to td
        let td_price = document.createElement("td");
        td_price.textContent = spot_product.price;
        tr.appendChild(td_price);

        // add textContent description
        let td_description = document.createElement("td");
        td_description.textContent = spot_product.description;
        tr.appendChild(td_description);

        // add image to td eidt and delete
        let td_Edit_delete = document.createElement("td");
         // image eidt
        let img_edit = document.createElement("img");
        img_edit.src = "../../../img/edit.svg"
        img_edit.style.cursor = "pointer";
        img_edit.addEventListener("click", edit)
         // image delete
        let img_delete = document.createElement("img");
        img_delete.src = "../../../img/trash.png"
        img_delete.style.cursor = "pointer";
        img_delete.addEventListener("click", takeAway)
         // appendChild into td
        td_Edit_delete.appendChild(img_edit);
        td_Edit_delete.appendChild(img_delete);
        tr.appendChild(td_Edit_delete);
        // appendChild tr into tbody
        tbody.appendChild(tr);
    }
    dom_table.appendChild(tbody);
    // console.log(tbody);

}



function onUpload(){
    //  display dialog
    show(dom_dialog)
    // show bottun create
    show(btn_create)
    // hide bottun edit
    hide(btn_edit)
    // clear text from input
    dom_inputImg.value = "";
    dom_title.value = "";
    dom_availablity.value = "";
    dom_price.value = "";
    dom_screen.value = "";
    dom_cpu.value = "";
    dom_ram.value = "";
    dom_storage.value = "";
    dom_color.value = "";
    dom_description.value = "";
    // call function onCrate



}

function onCreateOrUpdate(index , isCreate = true){
    // hide dialog
    hide(dom_dialog)
    // create object
    let product = {}
    // take value from input
    product.img = getData;
    product.title = dom_title.value;
    product.price = formatDollar(Number(dom_price.value));
    product.availablity = dom_availablity.value;
    product.screen = dom_screen.value;
    product.cpu = dom_cpu.value;
    product.ram = dom_ram.value;
    product.storage = dom_storage.value;
    product.color = dom_color.value;
    product.description = dom_description.value;   


    // push to Products list
    if (isCreate){
        products.push(product);
    } else {
        products[index] = product;
    }
    // save Products
    saveProduct();
    // Update table
    renderProduct();
    
}


function edit(event){
    //  Get index parent
    let index = event.target.parentElement.parentElement.dataset.index;
    // display dom_dialog
    show(dom_dialog);
    // show Button edit
    show(btn_edit);
    // hide Button create
    hide(btn_create);
    // get value Products by index into input field
    let pre = products[index];
    console.log(pre.price);
    // update value
    if (pre.img) {
        getData = pre.img
    }

    // dom_inputImg.value = pre.img;
    dom_title.value = pre.title;
    // dom_price.value = ;
    dom_availablity.value = pre.availablity;
    dom_screen.value = pre.screen;
    dom_cpu.value = pre.cpu;
    dom_ram.value = pre.ram;
    dom_storage.value = pre.storage;
    dom_color.value = pre.color;
    dom_description.value = pre.description;
    


    // call function onCrate


    // make Button edit call to onEdit
    btn_edit.addEventListener("click", function(){

        onCreateOrUpdate(index, false);
        index = null;

    })

}
function takeAway(event){
    //  Get index parent
    let index = event.target.parentElement.parentElement.dataset.index;

    // remove the Products
    products.splice(index, 1);

    //  update the local storage
    saveProduct()
    // Update Products table
    renderProduct();
}

function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return '$'+p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      getData =  reader.result;
    //   console.log(getData);
    }
    reader.readAsDataURL(file);
}


// Main_____________________________________ 
let btn = dom_dialog.querySelectorAll("button");
let btn_cancle =btn[0];
let btn_create = btn[1];
let btn_edit = btn[2];

btn_cancle.addEventListener("click", function(){
    hide(dom_dialog)
})

dom_inputImg.addEventListener("change", function(event){
    encodeImageFileAsURL(this)
    
});

btn_create.addEventListener("click", function(){
    onCreateOrUpdate(null);
})


// saveProduct()
// loadProduct()


renderProduct()


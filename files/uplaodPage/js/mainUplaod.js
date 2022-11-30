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
let product = [
    {
        img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
        title: "Zephyrus DuO",
        price: "$1000",
        availablity: "in stock",
        screen: "13inch",
        ram: "16GB",
        storage: "512GB SSD",
        color: "red",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    },
    {
        img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
        title: "Zephyrus DuO",
        price: "$1000",
        availablity: "in stock",
        screen: "13inch",
        ram: "16GB",
        storage: "512GB SSD",
        color: "red",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    },
    {
        img: "../../../img/asus_laptops_2022_asus_zephyrus_duo_16-1024x538.jpg",
        title: "Zephyrus DuO",
        price: "$1000",
        availablity: "in stock",
        screen: "13inch",
        ram: "16GB",
        storage: "512GB SSD",
        color: "red",
        description: "Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing."
    },
    
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
    localStorage.setItem("product", JSON.stringify(product));
  }
  
  function loadProduct() {
    let productStorage = JSON.parse(localStorage.getItem("product"));
    if (productStorage !== null) {
        product = productStorage;
    }
  }

// renderProduct function
function renderProduct(){
    loadProduct()
    // rmove table 
    dom_table.querySelector("tbody").remove();
    let tbody = document.createElement("tbody");
    for (let i in product){
        spot_product = product[i];
        let tr = document.createElement("tr");
        tr.dataset.index = i;

        // add ID
        let td_id = document.createElement("td");
        td_id.textContent = i
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


}

function onCreate(){
    // hide dialog
    hide(dom_dialog)
    // create object
    let new_product = {}
    // take value from input
    new_product.img = dom_inputImg.value;
    new_product.title = dom_title.value;
    new_product.price = dom_price.value;
    new_product.availablity = dom_availablity.value;
    new_product.screen = dom_screen.value;
    new_product.cpu = dom_cpu.value;
    new_product.ram = dom_ram.value;
    new_product.storage = dom_storage.value;
    new_product.color = dom_color.value;
    new_product.description = dom_description.value;   
    // push to product list
    product.push(new_product);
    // save product
    saveProduct();
    // Update table
    renderProduct();




    
}


function edit(){
    console.log('hello');
}
function takeAway(event){
    //  Get index parent
    let index = event.target.parentElement.parentElement.dataset.index;

    // remove the product
    product.splice(index, 1);
    console.log('remove product');

    //  update the local storage
    saveProduct()
    // Update product table
    renderProduct();
}


// Main_____________________________________ 
let btn = dom_dialog.querySelectorAll("button");
let btn_cancle =btn[0]

btn_cancle.addEventListener("click", function(){
    hide(dom_dialog)
})
// saveProduct()
// loadProduct()


renderProduct()


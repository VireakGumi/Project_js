// Constants variables_____________________________________
const dom_dialog = document.querySelector(".content-dialog");
const dom_table = document.querySelector("table");

// Constants DOM elements_____________________________________
let dom_title = dom_dialog.querySelector("#title");
let dom_price = dom_dialog.querySelector("#price");
let dom_availablity = dom_dialog.querySelector("#availablity");
let dom_screen = dom_dialog.querySelector("#screen");
let dom_cpu = dom_dialog.querySelector("#cpu");
let dom_ram = dom_dialog.querySelector("#ram");
let dom_storage = dom_dialog.querySelector("#storage");
let dom_color = dom_dialog.querySelector("#color");
let dom_inputImg = dom_dialog.querySelector("#inputImg");
let dom_description = dom_dialog.querySelector("#description");

// variables_____________________________________
let check_input = [dom_title, dom_price, dom_availablity, dom_screen, dom_cpu, dom_ram, dom_storage, dom_color, dom_inputImg, dom_description]
let getData = ""
let products = []
let id = 0;
// localStorage.setItem("id", id)
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
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    let productStorage = JSON.parse(localStorage.getItem("products"));
    if (productStorage !== null) {
        products = productStorage;
    }
}

// renderProduct function
function renderProduct() {
    loadProducts()
    // remove table 
    dom_table.querySelector("tbody").remove();
    let tbody = document.createElement("tbody");
    for (let i in products) {
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



function onUpload() {
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
    id = Number(localStorage.getItem("id")) + 1;
}


function validateInput(element) {
    let isEmpty = true;
    if (!(element.value)) {
        element.style.border = "2px solid red";
        isEmpty = false;
    } else {
        element.style.border = "2px solid green";
    }
    return isEmpty;
};


function onCreateOrUpdate(index, isCreate = true) {

    // create object
    let checkInput = true
    for (let value of check_input) {
        console.log(value)
        checkInput = validateInput(value);
        console.log(checkInput)
    };
    if (!(validateInput(dom_inputImg))) {
        dom_inputImg.parentElement.parentElement.style.border = '2px solid red';
    }
    if (checkInput) {
        // hide dialog
        hide(dom_dialog)
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
        product.id = id



        // push to Products list
        if (isCreate) {
            products.push(product);
        } else {
            products[index] = product;
        }
        localStorage.setItem("id", id);
        // save Products
        saveProducts();
        // Update table
        renderProduct();
        for (let value of check_input) {
            value.style.border = "1px solid gray";
        };
        dom_inputImg.parentElement.parentElement.style.border = '1px solid gray';

    }

}


function edit(event) {
    //  Get index parent
    let index = event.target.parentElement.parentElement.dataset.index;
    // display dom_dialog
    for (let i of check_input) {
        i.style.border = "1px solid grey";
    }
    show(dom_dialog);
    // show Button edit
    show(btn_edit);
    // hide Button create
    hide(btn_create);
    // get value Products by index into input field
    let pre = products[index];
    // console.log(typeof(Number(pre.price)));
    // update value
    if (pre.img) {
        getData = pre.img
    }

    // dom_inputImg.value = pre.img;
    dom_title.value = pre.title;
    dom_price.value = pre.price.replace('$', '');
    dom_availablity.value = pre.availablity;
    dom_screen.value = pre.screen;
    dom_cpu.value = pre.cpu;
    dom_ram.value = pre.ram;
    dom_storage.value = pre.storage;
    dom_color.value = pre.color;
    dom_description.value = pre.description;

    if (products[index].id == id) {
        id = products[index].id;
    }

    // call function onCrate


    // make Button edit call to onEdit
    btn_edit.addEventListener("click", function () {

        onCreateOrUpdate(index, false);
        index = null;

    })

}
function takeAway(event) {
    //  Get index parent
    let index = event.target.parentElement.parentElement.dataset.index;

    // remove the Products
    products.splice(index, 1);

    //  update the local storage
    saveProducts()
    // Update Products table
    renderProduct();
}

function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return '$' + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "" : "") + acc;
    }, "") + "." + p[1];
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        getData = reader.result;
        //   console.log(getData);
    }
    reader.readAsDataURL(file);
}


// Main_____________________________________ 
let btn = dom_dialog.querySelectorAll("button");
let btn_cancle = btn[0];
let btn_create = btn[1];
let btn_edit = btn[2];

btn_cancle.addEventListener("click", function () {
    hide(dom_dialog)
})

dom_inputImg.addEventListener("change", function (event) {
    encodeImageFileAsURL(this)

});

btn_create.addEventListener("click", function () {
    onCreateOrUpdate(null);
})


// saveProducts()
// loadProducts()


renderProduct()


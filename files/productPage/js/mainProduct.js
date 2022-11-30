// variables_____________________________________
let slideIndex = 0;
let product = []

// Function_____________________________________
function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slides.length < slideIndex) {slideIndex=1}
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


function saveProduct() {
    localStorage.setItem("Products", JSON.stringify(Products));
  }
  
function loadProduct() {
    let productStorage = JSON.parse(localStorage.getItem("Products"));
    if (productStorage !== null) {
        Products = productStorage;
    }
}

function renderCard(){
    loadProduct()
    document.querySelector("main").remove();
    for (let i = 0; i < 3; i++) {
        let list = document.createElement('div');
        list.className = "list-1";
        for(let n in product){
            let a = document.createElement('a');
            a.href = '../../detailPage/detail.html'        
            let card = document.createElement('div');
            crad.className = "card";    
            
        } 
    }
}

// main________________________________
showSlides(); 
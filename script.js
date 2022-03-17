console.log("Desplegado");

const traerInfo = new Promise((resolve)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () =>{
        data = xhr.response;
        resolve(data);
    }
})

let cart = [];
let burguers = [];
let tacos = [];
let salads = [];
let desserts = [];
let drinks = [];


traerInfo.then((response) => {
    response.forEach(item => {
        if (item.name==='Burguers')
            burguers = item.products;
        if (item.name==='Tacos')
            tacos = item.products;
        if (item.name==='Salads')
            salads = item.products;
        if (item.name==='Desserts')
            desserts = item.products;
        if (item.name==='Drinks and Sides')
            drinks = item.products;
    });
})

/**
fetch('datos.json').then( response => response.json() ).then( response => {
    response.forEach( element => {
        if (element.name==='Burguers')
            burguers = element.products;
        if (element.name==='Tacos')
            tacos = element.products;
        if (element.name==='Salads')
            salads = element.products;
        if (element.name==='Desserts')
            desserts = element.products;
        if (element.name==='Drinks and Sides')
            drinks = element.products;
    });
});
*/

function showTitle(pName) {
    document.getElementById("tituloItems").innerHTML ='';
    if(pName==='Burguers'){
        document.getElementById("tituloItems").innerHTML += 'Burguers' ;
    }
    if(pName==='Tacos'){
        document.getElementById("tituloItems").innerHTML += 'Tacos' ;
    }
    if(pName==='Salads'){
        document.getElementById("tituloItems").innerHTML += 'Salads' ;
    }
    if(pName==='Desserts'){
        document.getElementById("tituloItems").innerHTML += 'Desserts' ;
    }
    if(pName==='Drinks and Sides'){
        document.getElementById("tituloItems").innerHTML += 'Drinks & Sides' ;
    }

    let lista = [];
    if (pName=='Burguers')
        lista = burguers;
    else if (pName=='Tacos')
        lista = tacos;
    else if (pName=='Salads')
        lista = salads;
    else if (pName=='Desserts')
        lista = desserts;
    else
        lista = drinks;
    let menu = document.querySelector('#menucentral');

    document.getElementById("menucentral").innerHTML ='';
    lista.forEach( item => {
        item.category = pName;
        menu.innerHTML +=`
        <div class="col-md-3 col-xs-6 d-flex align-item-md-stretch pb-3">
            <div class="card">
                <div class="d-flex justify-content-center pt-3">
                    <img src="${item.image}" class="card-img-top card-image">
                </div>
                <div class="card-body d-flex flex-column flex-xs-shrink-1">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-text">${item.description}</p>
                    <p><strong>$${item.price}</strong></p>
                    <div class="d-flex justify-content-center mt-auto">
                        <a class="btn" onclick="anadirCarro('${item.name}','${pName}')">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}


var inc=0;
function anadirCarro(pNombre,pName){
    inc=inc+1;
    document.getElementById("numeroItems").innerHTML = inc;

    let lista = [];
    if (pName=='Burguers')
        lista = burguers;
    else if (pName=='Tacos')
        lista = tacos;
    else if (pName=='Salads')
        lista = salads;
    else if (pName=='Desserts')
        lista = desserts;
    else
        lista = drinks;

    let menu = document.querySelector('#tabla');

    var row = 0;
    let items = lista.filter(element => element.name==pNombre)[0];
    let cantidad = cart.filter(element => element.item.name==pNombre)

    if (cantidad.length==0) {
        cart.push({item:items,qty:1});
    } else {
        cantidad[0].qty += 1;
    }
   

    cart.forEach( item => {
        row=row+1;
        item.category = pNombre;
        menu.innerHTML +=`
        <tr>
            <th scope="row">${row}</th>
            <td>${item.qty}</td>
            <td>${item.item.name}</td>
            <td>${item.item.price}</td>
            <td>${item.qty*item.item.price}</td>
            <td>
                <div class="row">
                    <button type="button" class="btn btn-dark" id="add  " onclick="anadirCarrito('${item.item.name}','${item.item.pName}')">
                        +
                    </button>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-dark" id="substract" onclick="borrarCarro(${item.item.pNombre})">
                        -
                    </button>
                </div>
            </td>
        </tr>
        `;
    });
}


function desplegarCarrito(target , source){
    document.getElementById(target).innerHTML = document.getElementById(source).innerHTML;
    document.getElementById("tituloItems").innerHTML ='Order Detail';
    document.getElementById().innerHTML.style.display = "block";
}


let itemCart = JSON.parse(localStorage.getItem("itemCart"));
// console.log(itemCart);

let teddyCardHTML = ""; // variable conteneur de l html
let unitePrice = 0;
let totalLine = 0;
let totalLineFormate = "";
let totalPanier = 0;
let totalPanierFormate = "";

 // FORMULAIRE
 let myInputName = document.getElementById("nom");
 let myInputFirstName = document.getElementById("prenom");
 let myInputAddress = document.getElementById("adresse");
 let myInputPostal = document.getElementById("postal");
 let myInputTown = document.getElementById("ville");
 let myInputMail = document.getElementById("email");

 let nameRegEx =  /^[a-z -]+$/i;
 let addressRegEx = /^[A-Z-a-z-0-9\s]{5,80}$/;
 let zipRegEx = /^\d{5}$/;
 let cityRegEx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
 let mailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*$/;


main();

function main() {

    if (itemCart && itemCart.length >= 1) {
        // window.alert("panier existant");

        displayArticles(itemCart);
        supprimerItem();
        viderPanier();
        displayTotal();
        events();
    }
    else {
        window.alert("panier vide");
        window.location.href = "index.html";
    };
    
}

function displayArticles(itemCart) {
    itemCart.forEach( (itemCart) => { //boucle qui affiche chaque element html par produit
        // itemCart.name;
        // itemCart.description;
        // itemCart.price;
        // itemCart.color;
        // itemCart.quantity;
        // itemCart.imageUrl;
        // itemCart.id;

        unitePrice =  formatPrice(itemCart.price);
        totalLine = itemCart.price * itemCart.quantity;
        // console.log(totalLine);
        totalLineFormate = formatPrice(totalLine);

        totalPanier += totalLine;

        teddyCardHTML += `
        <div class="items">
            <p>Article(s) :</p>
            <div><img src="${itemCart.imageUrl}" width="100"></div>
            <p class="norb">${itemCart.name} (${itemCart.color})</p>
            <div>${itemCart.quantity}</div>
            <div><button id="supprimer" type="button">Supprimer</button></div>
        </div>
        <div class="total">
            <div class="prix-unite">
                <p> prix unitaire :</p>
                <p>${unitePrice}</p>
            </div>
        </div>
        <div class="total">
            <div class="prix-unite">
                <p> prix:</p>
                <p>${totalLineFormate}</p>
            </div>
        </div>
        `;

        document.getElementById("itemSelected").innerHTML = teddyCardHTML;
    });
}

function supprimerItem() {

    let supprimer = document.querySelectorAll("#supprimer"); // reccuperation du tableau du ou des boutons "supprimer"
    // console.log(supprimer);
    for(let a = 0; a < supprimer.length; a++){
        supprimer[a].addEventListener("click", (event) => {


            let idSelectSupr = itemCart[a].id;
            // console.log(idSelectSupr);
            let idselectColorSupr = itemCart[a].color;
            // console.log(idselectColorSupr);

            let itemCartSuppr = itemCart.filter(  (item) => item.id !== idSelectSupr || item.color !== idselectColorSupr);
            console.log(itemCartSuppr);

            localStorage.setItem("itemCart", JSON.stringify(itemCartSuppr));
            window.location.reload();
            // event.preventDefault();
        });

    };

}

function viderPanier() {

    let vider = document.querySelector("#vider"); //renvoi qu'une seule information
    vider.addEventListener("click", (event) => {

        localStorage.clear();
        window.location.reload();
        // event.preventdefault();
    });

}

function displayTotal() {

    // console.log(totalPanier);
    totalPanierFormate = formatPrice(totalPanier);
    document.getElementById("totalShopping").innerHTML = `<p class="somme">Total = ${totalPanierFormate}</p>`;

}

 // fonction pour la validation des champs du formulaire aves les Regex
 function validRegexForm(field, regex) {
    if (regex.test(field.value) === true) {
        field.nextElementSibling.setAttribute('hidden', 'hidden');
        return true;
    } else {
        field.nextElementSibling.removeAttribute('hidden');
        return false;
    }
}

function events() {

    let submitForm = document.getElementById("submit");
    submitForm.addEventListener('click', function formValidation() {

        let testMyInputName = validRegexForm(myInputName, nameRegEx);
        let testMyInputFirstName = validRegexForm(myInputFirstName, nameRegEx);
        let testMyInputAddress = validRegexForm(myInputAddress, addressRegEx);
        let testMyInputPostal = validRegexForm(myInputPostal, zipRegEx);
        let testMyInputTown = validRegexForm(myInputTown, cityRegEx);
        let testMyInputMail = validRegexForm(myInputMail, mailRegEx);
       

        if (testMyInputName && testMyInputFirstName && testMyInputAddress && testMyInputPostal && testMyInputTown && testMyInputMail) {

            let contact = {
                lastName: myInputName.value,
                firstName: myInputFirstName.value,
                address: myInputAddress.value,
                city: myInputTown.value,
                email: myInputMail.value
            };
            console.log(contact);

            let prix = {
                prixTotal: totalPanierFormate
            };
            console.log(prix);

            // On creer un tableau vide appelé products
            let products = [];
            // On recupere tous les éléments du localStorage
            itemCart = JSON.parse(localStorage.getItem("itemCart"));
            // Pour chaque elements du localStorage on recupere les ID que lon ajoute dans le tableau products
            itemCart.forEach(product => {
                products.push(product.id);
            });
            console.log(products);

            let contProd = {
                contact,
                products
            };
            // console.log(contProd);

            postOrder(contProd, prix);

        }
    });

}

async function postOrder(contProd, prix) {
    try {
        let responseOrder = await fetch(apiUrl + "order", {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            method: "POST",
            body: JSON.stringify(contProd)
        });

        if (responseOrder.ok){
            console.log(responseOrder);
            let ArrayOrderId = await responseOrder.json();
            localStorage.setItem('ArrayOrderId', JSON.stringify(ArrayOrderId) );
            localStorage.setItem('ArrayPrixTotal', JSON.stringify(prix) );

            window.location.href = "msg-web-service.html";
        }
        
        else {
            console.error("Une erreur " + responseOrder.status + " à été retourné par le serveur.");
        }

    }
    catch (e){
        console.log("message d'erreur : ", e);
    }
};
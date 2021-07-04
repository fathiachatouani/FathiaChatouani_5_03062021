const itemCart = JSON.parse(localStorage.getItem("itemCart"));
// console.log(itemCart);

let productHTML = ""; // variable conteneur de l html
let totalLine = 0;
let totalLineFormate = "";
let totalPanier = 0;
let totalPanierFormate = "";
let sommeHTML = ""; // variable conteneur de l html contenant le prix formaté

if (itemCart && itemCart.length >= 1) {
    // window.alert("panier existant");

    itemCart.forEach( (itemCart) => { //boucle qui affiche chaque element html par produit
        itemCart.name;
        itemCart.description;
        itemCart.price;
        itemCart.color;
        itemCart.quantity;
        itemCart.imageUrl;
        itemCart.id;

        totalLine = parseFloat(itemCart.price) * itemCart.quantity;
        totalLineFormate = formatPrice(totalLine * 100);

        totalPanier += totalLine;

        productHTML += `
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
                <p>${itemCart.price}</p>
            </div>
        </div>
        <div class="total">
            <div class="prix-unite">
                <p> prix:</p>
                <p>${totalLineFormate}</p>
            </div>
        </div>
        `;

        document.getElementById("itemSelected").innerHTML = productHTML;
    });


    let supprimer = document.querySelectorAll("#supprimer"); // reccuperation du tableau du ou des boutons "supprimer"
    console.log(supprimer);
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
            event.preventDefault();
        });

    };


    let vider = document.querySelector("#vider"); //renvoi qu'une seule information
    vider.addEventListener("click", (event) => {

        localStorage.clear();
        window.location.reload();
        event.preventdefault();
    });


    totalPanierFormate = formatPrice(totalPanier * 100)
    sommeHTML = `<p class="somme">Total = ${totalPanierFormate}</p>`;
    document.getElementById("totalShopping").innerHTML = sommeHTML;


    // FORMULAIRE
    let myInputName = document.getElementById("nom");

    let submitForm = document.getElementById("submit");
    submitForm.addEventListener('click', function formValidation() {

        if (myInputName.value.trim() == "") {
            myInputName.nextElementSibling.removeAttribute('hidden');
            // e.preventDefault();
        }
        
    });

    let myInputFirstName = document.getElementById("prenom");

    let 

}
else {
    window.alert("panier vide");
};

// Fonction pour formater le prix et avoir le chiffre après la virgule et ajout du symbole euro
function formatPrice(itemPrice){
    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2,}).format(itemPrice / 100);
}


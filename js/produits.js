// Récupération de l'url complète de la page produit
const url = document.location.search;

// verification si l'id apparaît dans l'url
let idProduct = new URLSearchParams(url).get("id");
console.log(idProduct);

// Création de l'url de l'api et on la stock dans la variable apiUrl
let apiUrlId = `http://localhost:3000/api/teddies/${idProduct}`;
console.log(apiUrlId);

// Récupération via la methode fetch du contenu du produit correspondant a l'id selectionner
const getProduct = async function() {
    try {
        let response = await fetch(apiUrlId);

        if (response.ok) {
            let teddy = await response.json();
            console.log(teddy);

            // teddy._id;
            // teddy.name;
            // teddy.description;
            // teddy.price;
            let teddyNewPrice = formatPrice(teddy.price);
            // teddy.imageUrl;
            // teddy.colors;
            // console.log(teddy._id, teddy.name, teddy.description, teddy.price, teddyNewPrice, teddy.imageUrl, teddy.colors);

            let teddyCard ="";

            let listColorsValue ="";
            const listColors = teddy.colors;

            listColors.forEach((colorValue) => {
                listColorsValue += `<option value="${colorValue}">${colorValue}</option>`;
            });

            // Insertion du html via js
            teddyCard = 
                `<div>
                    <img class="nounours_img doudou_img" src="${teddy.imageUrl}" alt="visuel ours peluche | Orinoco">
                </div>
                <div class="bloc-description bloc-descriptions">  
                    <div class="description-produit description-produits">
                        <h2>${teddy.name}</h2>
                        <span class="prix">${teddyNewPrice}</span>
                    </div>
                    <div class="descr">
                        <p>${teddy.description}.</p>
                    </div>

                    <div class="choix">
                        <select id="mySelectColor" class="color">
                            <option value="0">Couleur</option>
                            ${listColorsValue}
                        </select>

                        <select id="mySelectQte" class="quantite">
                            <option value="0">Quantité</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
            
                    <div class="panierp">
                        <a id="btnCard" href="#"> <button type="button" class="color colore">Ajouter au panier</button></a>
                    </div>
                
                </div>`;

                document.getElementById("js_produit").innerHTML = teddyCard;

                // MISE AU PANIER DE L ARTICLE
                //1 - ajout d'évènement pour savoir si le bouton à été cliquer
                document.getElementById("btnCard").addEventListener('click', function addItemCart(event) {
                    let colorSelected = document.getElementById("mySelectColor").value;
                    console.log(colorSelected);

                    let qteSelected = document.getElementById("mySelectQte").value;
                    console.log(qteSelected);

                    if ( (colorSelected == 0) || (qteSelected == 0) ) {
                        if (colorSelected == 0) {
                            window.alert("Veuillez choisir une couleur");
                            event.preventDefault();
                        }
                        
                        if(qteSelected == 0) {
                            window.alert("Veullez choisir une quantité");
                            event.preventDefault();
                        }
                        event.preventDefault();
                    }
                    else {
                        window.alert("Votre article a bien été ajouté au panier");
                        let item = {
                            id: teddy._id,
                            name: teddy.name,
                            imageUrl: teddy.imageUrl,
                            price: teddyNewPrice,
                            description: teddy.description,
                            color: colorSelected,
                            quantity: qteSelected
                        };

                        // Création d'une variable qui contiendra soit un item déjà ajouté soit un tableau vide
                        // itemCart = panier localStorage
                        const itemCart = JSON.parse(localStorage.getItem('itemCart')) || [];

                        // AJOUT DE L OBJET DANS LE TABLEA DU PANIER
                        itemCart.push(item);

                        localStorage.setItem('itemCart', JSON.stringify(itemCart));
                    }
                });
        }
        
        // SI REPONSE AVEC UNE ERREUR SUITE AU FETCH
        else {
            console.error("une erreur " + response.status + " à été retourné par le serveur.");
        }
    }
    // En cas d'erreur on affiche le message d'erreur qui a été retourné
    catch (e) {
        console.log("message d'erreur : ", e);
    }
}

// Fonction pour formater le prix et avoir le chiffre après la virgule et ajout du symbole euro
function formatPrice(itemPrice){
    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2,}).format(itemPrice / 100);

}

// Appel de la fonction principal getProduct
getProduct();
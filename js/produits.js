// lancement de la fonction main 
main()

// Fonction main qui recupere et affiche les differents produits
async function main(){

    const articleId = getArticleId();
    console.log(articleId);
	const teddy = await getArticleContent(articleId);
    console.log(teddy);
    displayArticle(teddy);
    eventArticle(teddy);
}

// Fonction qui retourne la valeur de l'ID contenu dans l'url
function getArticleId() {
    return new URLSearchParams(document.location.search).get("id");
}


// Fonction d'interrogation de l'API POUR RECHERCHER LES PRODUITS PAR ID
function getArticleContent(articleId) {
	return fetch(apiUrl + articleId)
	.then(function(httpBodyResponse) {
		return httpBodyResponse.json();
	})
	.then(function(article) {
        // console.log(article);
		return article;
	})
	.catch(function(error) {
		alert(error);
	})
}


// Fonction ES6 de templatisation d'un produit
function displayArticle(teddy) {
    let price = formatPrice(teddy.price);
    let listColorsValue = "";

    teddy.colors.forEach((colorValue) => {
        listColorsValue += `<option value="${colorValue}">${colorValue}</option>`;
    });

    // Insertion du html via js
    let teddyCardHTML = 
    `<div>
        <img class="nounours_img doudou_img" src="${teddy.imageUrl}" alt="visuel ours peluche | Orinoco">
    </div>
    <div class="bloc-description bloc-descriptions">  
        <div class="description-produit description-produits">
            <h2>${teddy.name}</h2>
            <span class="prix">${price}</span>
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
                <option value="5">5</option>
            </select>
        </div>

        <div class="panierp">
            <a id="btnCard" href="#"> <button type="button" class="color colore">Ajouter au panier</button></a>
        </div>
    
    </div>`;

    document.getElementById("js_produit").innerHTML = teddyCardHTML;

}


function eventArticle(teddy){
    // MISE AU PANIER DE L ARTICLE
    //1 - ajout d'évènement pour savoir si le bouton à été cliquer
    document.getElementById("btnCard").addEventListener('click', function addItemCart(event) {
        let colorSelected = document.getElementById("mySelectColor").value;
        console.log(colorSelected);

        let qteSelected = Number(document.getElementById("mySelectQte").value);
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

            // Création d'une variable qui contiendra soit un item déjà ajouté soit un tableau vide
            // itemCart = panier localStorage
            let itemCart = JSON.parse(localStorage.getItem('itemCart')) || [];
            let teddyNewPrice = formatPrice(teddy.price);

            // Contenu de la variable item
            let item = {
                id: teddy._id,
                name: teddy.name,
                imageUrl: teddy.imageUrl,
                price: teddyNewPrice,
                description: teddy.description,
                color: colorSelected,
                quantity: qteSelected
            };


            // verifier si un produit à déja été selectionner dans le panier
            let isinCart = false;

            if (itemCart && itemCart.length >= 1){
                    itemCart = JSON.parse(localStorage.getItem('itemCart'));

                    itemCart.forEach(items => {
                        if(items.id === item.id && items.color === colorSelected){
                            items.quantity = items.quantity + qteSelected;
                            quantity = items.quantity;
                            isinCart = true;
                        };
                    });

            };


            // AJOUT DE L OBJET DANS LE TABLEAU DU PANIER
            if (isinCart == false){
                itemCart.push(item);
            }
            

            localStorage.setItem('itemCart', JSON.stringify(itemCart));
        }
    });
}
                
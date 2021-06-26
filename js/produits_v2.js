// lancement de la fonction main 
main()

// Fonction main qui recupere et affiche les differents produits
async function main(){

    // On recupere le contenu de la fonction getArticle et on le stock dans la variable articleId
    const articleId = getArticleId()
    // On recupere les donnees de l'API ayant comme identifiant l'id placer dans l'URL et on les stocks dans la varaible articleContent
	const articleContent = await getArticleContent(articleId)

    displayArticle(articleContent)
}

// Fonction qui retourne la valeur de ID contenu dans l'url
function getArticleId() {
    return new URL(location.href).searchParams.get("id") 
}


// Fonction d'interrogation de l'API
function getArticleContent(articleId) {
	return fetch(`http://localhost:3000/api/teddies/${articleId}`)
	.then(function(httpBodyResponse) {
		return httpBodyResponse.json()
	})
	.then(function(article) {
		return article
		//console.log(article)
	})
	.catch(function(error) {
		alert(error)
	})
}


// Fonction ES6 de templatisation d'un produit
displayArticle = articleContent => {

    document.getElementById("js_img").src = articleContent.imageUrl

    document.getElementById("js_nom").textContent = articleContent.name

    let price = Number(articleContent.price / 100).toFixed(2);
    document.getElementById("js_prix").textContent = price + " €"

    document.getElementById("js_descr").textContent = articleContent.description

    for ( let i = 0; i < articleContent.colors.length; i++){
        let couleurs  = `<option value="${articleContent.colors[i]}">${articleContent.colors[i]}</option>`
        document.getElementById("js_couleurs").innerHTML += couleurs
    }

}




let myForm = document.getElementById("myForm")

myForm.addEventListener('submit', function(e) {

    let selectColor = document.getElementById("js_couleurs");
    let colorSelect = selectColor.options[selectColor.selectedIndex].value;

    let selectQuantite = document.getElementById("js_quantite");
    let quantiteSelect = selectQuantite.options[selectQuantite.selectedIndex].value;

    console.log(colorSelect)
    console.log(quantiteSelect)

    if (colorSelect == 0) {
        window.alert("Pas de couleur");
        e.preventDefault();
    }

    if (quantiteSelect == 0) {
        window.alert("Pas de quantité");
        e.preventDefault();
    }

    let produit = {
        //idProduit: articleId,
        //nameProduit: articleContent.name,
        prixProduit: price,
        couleurProduit: colorSelect,
        quantiteProduit: quantiteSelect
    };

    console.log(produit)


    e.preventDefault();
    
})

// Fonction ancienne de templatisation d'un produit
// function displayArticle(articleContent) {

//     document.getElementById("js_img").src = articleContent.imageUrl

//     document.getElementById("js_nom").textContent = articleContent.name

//     let price = Number(articleContent.price / 100).toFixed(2);
//     document.getElementById("js_prix").textContent = price + " €"

//     document.getElementById("js_descr").textContent = articleContent.description

//     for ( let i = 0; i < articleContent.colors.length; i++){
//         let couleurs  = `<option value="${articleContent.colors[i]}">${articleContent.colors[i]}</option>`
//         console.log(couleurs)
//         document.getElementById("js_couleurs").innerHTML += couleurs
//     }

// }
                
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


// Fonction de templatisation d'un produit
function displayArticle(articleContent) {
	document.getElementById("js_produit").innerHTML += `<div><img class="nounours_img doudou_img" src="${articleContent.imageUrl}" alt="visuel ours peluche | Orinoco"></div>
    <div class="bloc-description bloc-descriptions">  
        <div class="description-produit description-produits">
            <h2>${articleContent.name}</h2>
            <span class="prix">${articleContent.price} €</span>
        </div>
        <div class="descr">
            <p>${articleContent.description}</p>
        </div>

        <div class="choix">
            <select class="color">
                <option value="0">Couleur</option>
                <option value="1">Tan</option>
                <option value="2">Chocolate</option>
                <option value="3">Black</option>
                <option value="4">White</option>
            </select>

            <select class="color">
                <option value="0">Quantité</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
    
        <div class="panierp">
          <a href="panier.html"> <button class="color colore">Ajouter au panier</button></a>
        </div>
        
    </div>`
}
                
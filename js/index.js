// lancement de la fonction main 
main();

// Fonction main qui recupere et affiche les differents produits
async function main(){
	const articles = await getArticles();
	
	// Boucle pour afficher les differents produits
	for (article of articles) {
		displayArticle(article);
	}
}


// Fonction d'interrogation de l'API
function getArticles() {
	return fetch(apiUrl)
	.then(function(httpBodyResponse) {
		return httpBodyResponse.json();
	})
	.then(function(articles) {
		console.log(articles);
		return articles;
	})
	.catch(function(error) {
		alert(error);
	})
}


// Fonction de templatisation d'un produit
function displayArticle(article) {
	let price = formatPrice(article.price);
	
	document.getElementById("js_ul").innerHTML +=
	 `<li class="item">
		<a href="produit.html?id=${article._id}">
			<div>
				<div><img class="nounours_img" src="${article.imageUrl}" alt="visuel ours peluche | Orinoco"></div>
				<div class="bloc-description">  
						<div class="description-produit">
							<h2>${article.name}</h2>
							<span class="prix">${price}</span>
						</div>
				</div>
			</div>
		</a>
	</li>`	
}


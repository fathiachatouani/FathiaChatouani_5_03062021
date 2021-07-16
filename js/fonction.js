// variable qui rappel l'URL de l'api
const apiUrl = 'http://localhost:3000/api/teddies/';

// Fonction pour formater le prix et avoir le chiffre après la virgule et ajout du symbole euro
function formatPrice(itemPrice){
    return Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR", minimumFractionDigits: 2,}).format(itemPrice / 100);
}
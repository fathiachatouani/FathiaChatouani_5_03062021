let orderNumber = document.getElementById("orderNumber");
let ArrayOrderId = JSON.parse(localStorage.getItem('ArrayOrderId'));
orderNumber.innerHTML = ArrayOrderId.orderId;

let confirmTotal = document.getElementById("montant");
let ArrayPrixTotal = JSON.parse(localStorage.getItem('ArrayPrixTotal'));
confirmTotal.innerHTML = ArrayPrixTotal.prixTotal;


setTimeout( function OrderValided() {
    localStorage.clear();
    window.location.href = "index.html";
}, 5000);



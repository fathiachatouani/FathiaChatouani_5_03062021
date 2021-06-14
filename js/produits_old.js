const teddies = [
    {
      "colors": ["Tan", "Chocolate", "Black", "White"],
      "_id": "5be9c8541c9d440000665243",
      "name": "Norbert",
      "price": 2900,
      "imageUrl": "teddy_1.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Pale brown",
        "Dark brown",
        "White"
      ],
      "_id": "5beaa8bf1c9d440000a57d94",
      "name": "Arnold",
      "price": 3900,
      "imageUrl": "teddy_2.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Brown"
      ],
      "_id": "5beaaa8f1c9d440000a57d95",
      "name": "Lenny and Carl",
      "price": 5900,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "imageUrl": "teddy_3.jpg"
    },
    {
      "colors": [
        "Brown",
        "Blue",
        "Pink"
      ],
      "_id": "5beaabe91c9d440000a57d96",
      "name": "Gustav",
      "price": 4500,
      "imageUrl": "teddy_4.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Beige",
        "Tan",
        "Chocolate"
      ],
      "_id": "5beaacd41c9d440000a57d97",
      "name": "Garfunkel",
      "price": 5500,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "imageUrl": "teddy_5.jpg"
    }
  ];

  

for ( var i = 0; i < teddies.length; i++){

  let nounours = ` <li class="item">
                        <a href="produit.html?id=` + teddies[i]._id + `">
                            <div>
                                <div><img class="nounours_img" src="../JWDP5/images/` + teddies[i].imageUrl + `" alt="visuel ours peluche ` + teddies[i].name + ` | Orinoco"></div>
                                <div class="bloc-description">
                                    <div class="description-produit">
                                        <h2>` + teddies[i].name + `</h2>
                                        <span>` + teddies[i].colors + `</span>
                                        <span class="prix">` + teddies[i].price + ` €</span>
                                    </div>
                                </div>
                            </div>
                          </a>
                    </li>`;
  
  console.log(nounours)
  
  document.getElementById("js_ul").innerHTML += nounours;

}


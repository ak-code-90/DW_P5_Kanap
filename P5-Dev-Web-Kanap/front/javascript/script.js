 // Etape 4 - Inserer les produits dans la page d'accueil 

// Je récupère les produits en utilisant la methode FETCH, J'utilise .THEN pour attendre et recupérer une reponse en JSON, et je vais ensuite afficher la réponse dans la console pour m'assurer que ça fonctionne.
fetch('http://localhost:3000/api/products')

    .then(function (response) { return response.json(); })
    .then(function (array) {

        console.log(array); // on obtient un tableau avec les différents produits.

        //Je crée une variable qui va stocker les produits sous forme de liste.
        let displayProducts = '<ul style=\'display:flex; font-size:20px; margin:50px 0 0 0; padding:0px; display:flex;\' >';

        //Je crée ensuite une boucle pour ajouter chaque produits du tableau dans ma liste, tout en ajustant le style.
        for (let products of array) {

            displayProducts += `
                                    <style> #items {list-style-type: none;} ul {display: flex; gap: 10px; list-style-type: none; margin:0; padding:0;} </style>

                                    <li style=\' display:flex ; gap:20px; margin:30px 30px; \'>
                                       <img width=300 height= 300  src='${products.imageUrl}'</img>
                                       <div>
                                          <h3 style=\" font-size:25px; margin:0px; \"> ${products.name} </h3>
                                          <p style=\"font-size:20px\"> ${products.description} </p> 
                                       </div>
                                    </li>
                                    
                                `;                                                                 

            displayProducts += '</ul>'
        };

        //j'injecte dans la section #items du HTML la variable displayProducts qui permet d'afficher les produits.
        let items = document.getElementById('items')
        items.innerHTML = displayProducts;
        items.style.justifyContent = 'unset'


    })

    .catch(function (erreur) { console.log('erreur'); })

 // Etape 4 - Faire le lien entre un produit de la page d'accuiel et la page produit.   


let test = test;


// - Inserer les produits dans la page d'accueil 

// Récupération des produits en utilisant la méthode FETCH, on utilise .THEN pour attendre et recupérer une reponse en JSON, 
// 
fetch('http://localhost:3000/api/products')

        .then(function (response) { return response.json(); })
        .then(function (array) {

                // on obtient un tableau avec les différents produits.        


                //Création d'une variable qui va stocker la façon dont chaque élément doit s'afficher

                let displayProducts = '';

                //Création d'une boucle pour ajouter chaque produits.
                //On utilise des liens dans lesquels on rajoute l'identifiant de chaque produit en paramètre de l'url 

                for (let products of array) {

                        displayProducts += `

                                    <a href="product.html?id=${products._id}"> 
                                    <div style=\'list-style-type:none \'>
                                       <img lazy=loading width=300 alt='${products.altTxt}' height= 300  src='${products.imageUrl}'</img>
                                       <div>
                                          <h3> ${products.name} </h3>
                                          <p>  ${products.description} </p> 
                                       </div>
                                    </div>
                                    </a>
                                `;
                };

                //On modifie le DOM pour afficher tous les produits

                let items = document.getElementById('items')
                items.innerHTML = displayProducts;

        })

        .catch(function (erreur) { console.log(` Erreur : ${erreur}`); })















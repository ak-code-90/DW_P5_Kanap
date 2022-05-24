
// Récupération du Panier depuis le localStorage

var cartSTring = localStorage.getItem('cart');     // récupération du panier au format string
cart = JSON.parse(cartSTring);                      // reconstruction du panier en objet

// Envoi du panier depuis le localStorage
function sendCart(array) {                                         
    cartString = JSON.stringify(array);
    localStorage.setItem('cart', cartString);
}


//-------------------------------------------------------------------Gestion de l'affichage des produits du panier'------------------------------------------------------------------------------------------

let displayProduct = '';

for (var element of cart) {



    const sectionHTML = document.getElementById('cart__items');
    let articleHTML = document.createElement('article');
    sectionHTML.appendChild(articleHTML);
    articleHTML.setAttribute('class', 'cart__item');
    articleHTML.setAttribute('id', 'article');
    articleHTML.setAttribute('data-id', `${element.id}`);
    articleHTML.setAttribute('data-color', `${element.colour}`);
    articleHTML.innerHTML = `
    <div class="cart__item__img">
                        <img src='${element.img}' alt="${element.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                                <h2>${element.name}</h2>
                                <p>Couleur : ${element.colour}</p>
                                <p id="price">Prix : ${element.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.qty}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
    `
    //-------------------------------------------------------------------Gestion de la suppresion d'un produit------------------------------------------------------------------------------------------



    let deleteHTML = document.getElementsByClassName('deleteItem');              // on accède au bouton supprimer
    let search = '';


    for (const e of deleteHTML) {                                          // pour chaque élément de la collection de boutons "supprimer" 
        e.addEventListener('click', function () {                           // et à chaque clique sur "supprimer"..

            let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> du bouton "supprimer" cliqué 
            let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> du bouton "supprimer" cliqué 
            let closestArticle = e.closest('#article');                         // closestArticle fait réfécence au parent <article>
            

            search = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor); // Si on trouve un objet dans le panier qui a le même id et la même couleur
            if (search != undefined) {                                                                                // que le parent <article> du bouton "supprimer" qui a été cliqué

                closestArticle.remove();                                                // on supprime dans le HTML le parent <article> du bouton "supprimer" qui a été cliqué

                function removeArrayEl(arr,el) {                                        // on crée une fonction pour supprimer l'élément du panier 
                    return arr.filter(item => item !== el)
                }
            }

            newCart = removeArrayEl(cart,search);                                       // newCart correspond à un nouveau panier sans l'élément qui à été supprimé                             

            
            sendCart(newCart);                                                          // On envoit le nouveau panier qui remplacera le précédent sur le localStorage
            
            
        })
    }
     

    //-----------------------------------------------------------------Gestion de la modification des quantités------------------------------------------------------------------------------------------


    let inputQtyHTML = document.querySelectorAll('.itemQuantity') ;           // On accède à l'input de la quantité 



    for (let e of inputQtyHTML) {                                              // Pour chaque élément de la nodeList d'input "itemQuantity"
        
        e.addEventListener('change', function () {                             // On écoute un changement de quantité sur les input

            let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> de l'input modifié
            let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> de l'input modifié
            
            let searchResult = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor); // On trouve un objet dans le panier qui a le même id et la même 
                                                                                                                               // couleur que l'input modifié
            if (search != undefined && e.value > 0 ) {
                
                
                searchResult.qty = e.value ;                                                  // On modifie la quantité de l'objet trouvé précédemment avec le nouveau prix
                searchResult.price = e.value * searchResult.defaultPrice ;                    // On modifie le prix de l'objet trouvé précédemment avec le nouveau prix
                
                
                 function changeArrayElValue(arr,el) {                                        // On modifie la quantité et le prix de l'élément du panier avec les nouvelles valeures,
                    return arr.filter(item => item === el)                                    // ce qui à pour effet de changer l'affichage dans le DOM
                }

                    changeArrayElValue(cart,searchResult.qty)
                    changeArrayElValue(cart,searchResult.price) 

                sendCart(cart);                                                               // On envoit le nouveau panier qui remplacera le précédent sur le localStorage, et on recharge la page
                location.reload();                                                            // pour afficher le résultat.
            }
            
        })
    }
}













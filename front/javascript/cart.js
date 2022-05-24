// Récupération du Panier depuis le localStorage

let cartSTring = localStorage.getItem('cart');     // récupération du panier au format string
cart = JSON.parse(cartSTring);                      // reconstruction du panier en objet




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



    for (const e of deleteHTML) {                                          // pour chaque élément de la collection de boutons "supprimer" 
        e.addEventListener('click', function () {                           // et à chaque clique sur "supprimer"..

            let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> du bouton "supprimer" cliqué 
            let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> du bouton "supprimer" cliqué 
            let closestArticle = e.closest('#article');                         // closestArticle fait réfécence au parent <article>
            console.log(closestArticleID);

            let search = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor); // Si on trouve un objet dans le panier qui a le même id et la même couleur
            if (search != undefined) {                                                                                     // que le parent <article> du bouton "supprimer" qui a été cliqué


                closestArticle.remove();                                                                                   // on supprime le parent <article> du bouton "supprimer" qui a été cliqué
            }
        })
    }


    //-----------------------------------------------------------------Gestion de la modification des quantités------------------------------------------------------------------------------------------



    let priceHTML = document.querySelectorAll('#price')   ;                  // On accède au prix HTML
    let inputQtyHTML = document.querySelectorAll('.itemQuantity') ;           // On accède à l'input de la quantité 

    for (let e of inputQtyHTML) {                                              // Pour chaque élément de la nodeList d'input "itemQuantity"
        e.addEventListener('change', function () {                             // On écoute un changement de quantité sur les input

            let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> de l'input qui à été changé
            let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> de l'input qui à été changé

            let search = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor);   // Si on trouve un objet dans le panier qui a le même id et la même couleur
            if (search != undefined ) {                                                                                     // que le parent <article> de l'input qui à été changé
                
                if (e++) {
                    e += element.defaultprice;
                }
                                                                                                   // on supprime le parent <article> du bouton "supprimer" qui a été cliqué
            }

        })
    }

}













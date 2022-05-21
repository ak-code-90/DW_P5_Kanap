// Récupération du Panier depuis le localStorage

let cartSTring = localStorage.getItem('cart') ;     // récupération du panier au format string
cart = JSON.parse(cartSTring);                      // reconstruction du panier en objet

// On itère sur le panier pour afficher les différents produits

let displayProduct= '';
for (let element of cart) {
    

                displayProduct += 

                `
                <article class="cart__item" data-id="{${element.id}}" data-color="{${element.colour}}">
                    <div class="cart__item__img">
                        <img src='${element.img}' alt="${element.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                                <h2>${element.name}</h2>
                                <p>Couleur : ${element.colour}</p>
                                <p>Prix : ${element.price} €</p>
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
                </article>
                ` 


    
    const sectionHTML = document.getElementById('cart__items');    // récupération de la section HTML
    sectionHTML.innerHTML = displayProduct;            
}

// Modification ou suppression d'un produit depuis la page panier



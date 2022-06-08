let cartString;
let cart;

function getCart() {
    cartString = localStorage.getItem('cart');
    cart = JSON.parse(cartString);  
}

function sendCart(array) {
    cartString = JSON.stringify(array);
    localStorage.setItem('cart', cartString);
}

// Récupération du tableau de l'API

fetch('http://localhost:3000/api/products')
    .then(function (response) { return response.json(); })
    .then(function (array) {
        let apiArray = array


        // Récupération du Panier depuis le localStorage

        getCart();

        //-------------------------------------------------------------------Gestion de l'affichage des produits du panier'------------------------------------------------------------------------------------------


        let object = '';
        let totalP = 0;
        let totalQ = 0;

        for (let element of cart) {


            object = apiArray.find(obj => obj._id === element.id);

            // récupération dans l'API d'un objet dont l'ID matche avec l'ID de l'élément du panier, 
            // le but est de pouvoir calculer le prix de chq élément grâce aux prix par default dans l'API (ligne 57).

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
                                        <p id="price">Prix : ${(object.price * element.qty)} €</p>                        
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

            totalP += object.price * element.qty;               
            totalQ += element.qty;
        }

        totalQuantity.innerHTML = `${totalQ}`;                            // affichage des totaux dans le DOM
        totalPrice.innerHTML = `${totalP}`;

        //-------------------------------------------------------------------Gestion de la suppresion d'un produit------------------------------------------------------------------------------------------


        let deleteHTML = document.getElementsByClassName('deleteItem');
        let search = '';

        for (const input of deleteHTML) {                                                     // pour chaque élément de la collection de boutons "supprimer" 
            input.addEventListener('click', function () {                                     // et à chaque clique sur "supprimer"..

                let closestArticleID = input.closest('#article').dataset.id                   // closestArticleID fait réfécence à l'id du parent <article> du bouton "supprimer" cliqué 
                let closestArticleColor = input.closest('#article').dataset.color;            // closestArticleColor fait réfécence à la couleur du parent <article> du bouton "supprimer" cliqué 
                let closestArticle = input.closest('#article');                               // closestArticle fait réfécence au parent <article>


                search = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor);           // Si on trouve un objet dans le panier qui a le même id et la même couleur
                if (search != undefined) {                                                                                          // que le parent <article> du bouton "supprimer" qui a été cliqué

                    closestArticle.remove();                      // on supprime dans le HTML le parent <article> du bouton "supprimer" qui a été cliqué

                    function removeArrayEl(arr, el) {             // on crée une fonction pour supprimer le produit du panier 
                        return arr.filter(array => array !== el)
                    }
                }

                newCart = removeArrayEl(cart, search);           // newCart correspond à un nouveau panier sans l'élément qui à été supprimé                             


                sendCart(newCart);                                             // On envoit le nouveau panier qui remplacera le précédent sur le localStorage
                location.reload();                                             // et on recharge la page pour actualiser les totaux.

            })
        }


        //-----------------------------------------------------------------Gestion de la modification des quantités------------------------------------------------------------------------------------------


        let inputQtyHTML = document.querySelectorAll('.itemQuantity');                                                              // On accède à l'input de la quantité 

        for (let input of inputQtyHTML) {                                                                                           // Pour chaque élément de la nodeList d'input "itemQuantity"

            input.addEventListener('change', function () {                                                                          // On écoute un changement de quantité sur les input

                let closestArticleID = input.closest('#article').dataset.id;                                                        // closestArticleID fait réfécence à la data id du parent <article> de l'input modifié
                let closestArticleColor = input.closest('#article').dataset.color;                                                  // closestArticleColor fait réfécence à la data couleur du parent <article> de l'input modifié

                let searchResult = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor);
                                                                                                                                    // On réccupère un objet dans le panier qui a le même id et la même couleur que le produit sur lequel l'input a été modifié

                if (searchResult != undefined && input.value > 0) {

                    let eValue = parseInt(input.value);                                                                             // changement de la quantité en type 'number'    

                    searchResult.qty = eValue;                                                                                      // modification des quantités

                    function changeArrayElValue(arr, el) {                                                                          // On modifie la quantité et le prix de l'élément du panier avec les nouvelles valeures,
                        return arr.filter(array => array === el)                                                                    // ce qui à pour effet de changer l'affichage dans le DOM
                    }

                    changeArrayElValue(cart, searchResult.qty);


                    sendCart(cart);                                                                                                  // On envoit le nouveau panier qui remplacera le précédent sur le localStorage
                    location.reload();                                                                                                 // et on recharge la page pour afficher le résultat.

                }

            })
        }

      
        
    }
    )






//------------------------------------------------------------Validation des données utilisateur---------------------------------------------------------------------------------------------


function displayErrorMsg(regex, inputEntered, idErrorMsg, errorMsg,) {             // fonction qui affiche un message d'erreur si le test RegExpr retourne 'False'
    if (regex.test(inputEntered) !== true) {                                          // si le test regex retourne 'False', afficher le message d'erreur
        document.getElementById(`${idErrorMsg}`).innerHTML = `${errorMsg}`;           // si le test retourne 'True', ne rien afficher

    } else { document.getElementById(`${idErrorMsg}`).innerHTML = ``; }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// LE PRENOM

let fNameEntered = '';
let resultFname = '';

firstName.addEventListener('change', function () {                                                                  // écoute d'un changement sur l'input
    fNameEntered = firstName.value;
    resultFname = /^(?=.{2,13}$)[a-z àâäéèêëïîôöùûüç '-]*$/i.test(fNameEntered) ;
    displayErrorMsg(/^(?=.{2,13}$)[a-z àâäéèêëïîôöùûüç '-]*$/i, fNameEntered, 'firstNameErrorMsg', 'Prénom invalide !');    // affichage du mssg d'erreur
})


// LE NOM

let lastNameEntered = '';
let resultLname = '';

lastName.addEventListener('change', function () {

    lastNameEntered = lastName.value;
    resultLname = /^(?=.{2,13}$)[a-z àâäéèêëïîôöùûüç '-]*$/i.test(lastNameEntered);
    displayErrorMsg(/^(?=.{2,13}$)[a-z àâäéèêëïîôöùûüç '-]*$/i, lastNameEntered, 'lastNameErrorMsg', 'Nom invalide !');
})


// L'ADRESSE

let addressEntered = '';
let resultAddress = '';

address.addEventListener('change', function () {
    addressEntered = address.value;
    resultAddress = /^(?=.{5,300})[a-z 0-9 àâäéèêëïîôöùûüç , ° '-]*$/i.test(addressEntered);
    displayErrorMsg(/^(?=.{5,300}$)[a-z 0-9 àâäéèêëïîôöùûüç , ° '-]*$/i, addressEntered, 'addressErrorMsg', 'Adresse invalide !');
})

// LA VILLE

let cityEntered = '';
let resultCity = '';

city.addEventListener('change', function () {
    cityEntered = city.value;
    resultCity = /^(?=.{1,46})[a-z àâäéèêëïîôöùûüç ° '-]*$/i.test(cityEntered);
    displayErrorMsg(/^(?=.{1,46}$)[a-z â àâäéèêëïîôöùûüç ° '-]*$/i, cityEntered, 'cityErrorMsg', 'Ville invalide !');
})

// L'EMAIL

let emailEntered = '';
let resultEmail = '';

email.addEventListener('change', function () {
    emailEntered = email.value;
    resultEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/ig.test(emailEntered) ;  
    
    displayErrorMsg(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/ig, emailEntered, 'emailErrorMsg', 'Email invalide !');
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

getCart();

const products = [];                                                                            // création d'un tableau avec les id de chaque produit du panier

for (const e of cart) {
    products.push(e.id);
}

let form = document.querySelector('.cart__order__form');

form.addEventListener('submit', function (event) {                                       // lors du clique sur 'commander' si le test est validé, on crée l'objet contact et on l'envoi


    event.preventDefault();                                                            // empêche le comportement par défault du bouton soi l'envoi du formulaire lors du click

    if (resultFname && resultLname && resultAddress && resultCity && resultEmail) {

        const contact = {};
        contact.firstName = fNameEntered;
        contact.lastName = lastNameEntered;
        contact.address = addressEntered;
        contact.city = cityEntered;
        contact.email = emailEntered;
        
        const order = {contact , products}                                                    // création d'un objet order, ayant les propriétés contact et products 

        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order),
            
        })
            .then(function (response) { return response.json(); })
            .then(function (value) {
                
                document.location.href= `confirmation.html?order=${value.orderId}`
            })
            .catch(function (error) {
                console.log(error);
            })

    }
})




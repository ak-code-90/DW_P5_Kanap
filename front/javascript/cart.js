// Récupération du tableau de l'API

fetch('http://localhost:3000/api/products')
    .then(function (response) { return response.json(); })
    .then(function (array) {
        let apiArray = array




        // Récupération du Panier depuis le localStorage

        let cartSTring = localStorage.getItem('cart');
        cart = JSON.parse(cartSTring);

        // function qui sauvegarde le panier ds localStorage
        function sendCart(array) {
            cartString = JSON.stringify(array);
            localStorage.setItem('cart', cartString);
        }


        //-------------------------------------------------------------------Gestion de l'affichage des produits du panier'------------------------------------------------------------------------------------------


        let object = '';
        let totalP = 0;
        let totalQ = 0;

        for (let element of cart) {


            object = apiArray.find(obj => obj._id === element.id);
            // récupération dans l'API d'un objet dont l'ID matche avec l'ID de l'élément du panier, 
            // le but est de pouvoir calculer le prix de chq élément grâce aux prix par default ds l'API (ligne 57).




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



            totalP += object.price * element.qty;               // Calcul des totaux à afficher
            totalQ += element.qty;



        }
        //-------------------------------------------------------------------Gestion de la suppresion d'un produit------------------------------------------------------------------------------------------



        let deleteHTML = document.getElementsByClassName('deleteItem');
        let search = '';


        for (const e of deleteHTML) {                                          // pour chaque élément de la collection de boutons "supprimer" 
            e.addEventListener('click', function () {                           // et à chaque clique sur "supprimer"..

                let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> du bouton "supprimer" cliqué 
                let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> du bouton "supprimer" cliqué 
                let closestArticle = e.closest('#article');                         // closestArticle fait réfécence au parent <article>


                search = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor); // Si on trouve un objet dans le panier qui a le même id et la même couleur
                if (search != undefined) {                                                                                // que le parent <article> du bouton "supprimer" qui a été cliqué

                    closestArticle.remove();                                                // on supprime dans le HTML le parent <article> du bouton "supprimer" qui a été cliqué

                    function removeArrayEl(arr, el) {                                        // on crée une fonction pour supprimer l'élément du panier 
                        return arr.filter(item => item !== el)
                    }
                }

                newCart = removeArrayEl(cart, search);                                       // newCart correspond à un nouveau panier sans l'élément qui à été supprimé                             


                sendCart(newCart);                                                          // On envoit le nouveau panier qui remplacera le précédent sur le localStorage
                location.reload();                                                          // // et on recharge la page pour actualiser les totaux.

            })
        }


        //-----------------------------------------------------------------Gestion de la modification des quantités------------------------------------------------------------------------------------------


        let inputQtyHTML = document.querySelectorAll('.itemQuantity');           // On accède à l'input de la quantité 



        for (let e of inputQtyHTML) {                                // Pour chaque élément de la nodeList d'input "itemQuantity"

            e.addEventListener('change', function () {               // On écoute un changement de quantité sur les input

                let closestArticleID = e.closest('#article').dataset.id;           // closestArticleID fait réfécence à l'id du parent <article> de l'input modifié
                let closestArticleColor = e.closest('#article').dataset.color;      // closestArticleColor fait réfécence à la couleur du parent <article> de l'input modifié



                let searchResult = cart.find(element => element.id === closestArticleID && element.colour === closestArticleColor);
                // On réccupère un objet dans le panier qui a le même id et la même couleur que le produit sur lequel l'input a été modifié

                if (searchResult != undefined && e.value > 0) {

                    let eValue = parseInt(e.value);      // changement de la quantité en type 'number'    

                    searchResult.qty = eValue;           // modification des quantités

                    function changeArrayElValue(arr, el) {               // On modifie la quantité et le prix de l'élément du panier avec les nouvelles valeures,
                        return arr.filter(item => item === el)           // ce qui à pour effet de changer l'affichage dans le DOM
                    }

                    changeArrayElValue(cart, searchResult.qty);


                    sendCart(cart);                                                               // On envoit le nouveau panier qui remplacera le précédent sur le localStorage
                    // location.reload();                                                            // et on recharge la page pour afficher le résultat.


                }

            })
        }


        //-----------------------------------------------------------------Affichage de la quantité et du prix total------------------------------------------------------------------------------------------


        totalQuantity.innerHTML = `${totalQ}`;                            // on modifie l'affichage des totaux dans le DOM
        totalPrice.innerHTML = `${totalP}`;
    }
    )






//-------------------------------------------------------------------------Validation des données utilisateur---------------------------------------------------------------------------------------------


// LE PRENOM

let fNameEntered = '';

function validation(regex,inputEntered,idErrorMsg,errorMsg) {                         // création de la fonction de validation des donnée
    if (regex.test(inputEntered) !== true) {                                          // si le test regex retourne 'False', afficher le message d'erreur
        document.getElementById(`${idErrorMsg}`).innerHTML = `${errorMsg}`; 
    }
}

firstName.addEventListener('change', function () {                                    // écoute d'un changement sur l'input
                                        
    fNameEntered = firstName.value;
  
    validation(/rosaire|kevin/i,fNameEntered,'firstNameErrorMsg','Prénom invalide !');
})


// LE NOM

let lastNameEntered = '';

lastName.addEventListener('change', function () {  

    lastNameEntered = lastName.value;

    validation(/le|adda/i,lastNameEntered,'lastNameErrorMsg','Nom invalide !');
})


// L'ADRESSE


let addressEntered = '';

address.addEventListener('change', function () {                     
    addressEntered = address.value;

    validation(/rue|bd/i,addressEntered,'addressErrorMsg','Adresse invalide !');
})

// LA VILLE

let cityEntered = '';

city.addEventListener('change', function () {                     
    cityEntered = city.value;

    validation(/paris|courbevoie/i,cityEntered,'cityErrorMsg','Ville invalide !');
})

// L'EMAIL

let emailEntered = '';

email.addEventListener('change', function () {                     
    emailEntered = email.value;

    validation(/gmail|hotmail/i,emailEntered,'emailErrorMsg','Email invalide !');
})

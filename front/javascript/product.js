
//***********************************************************************************Récupération de l’id du produit à afficher**************************************************************************************************


//On crée une fonction qui va utiliser urlSearchParams pour obtenir l'ID du produit qu'on a stocké dans l'url
function getIdFromUrl() {

    //on crée un objet 'params' qui va récupérer en quelque sorte les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
    // on utilise la méthode get sur l'objet params pour récuperer la valeur du paramètre 'id'
    return params.get('id');
}

let productId = getIdFromUrl();

// ici on utilise un console.log avec timeout pour verifier que ma variable globale crée plus haut contient bien la réponse voulue, 
// si on utilise directement un console.log on a des chances de ne rien pouvoir afficher

// setTimeout(() => {
//     console.log(productId);         
// }, 1500);


//********************************************************************************** Insertion du produit et de ses détails *************************************************************************************************

let productName = '';
let productImg = '';
let productAltText = '';
let productPrice = '';

//On utilise fetch avec l'id en paramètre pour récupérer
fetch(`https://dw-p5-kanap.vercel.app/api/products/${productId}`)


    .then(function (reponse) { return reponse.json(); })
    .then(function (value) {

        //affichage de l'image
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src='${value.imageUrl}' alt="">`;

        //affichage du nom du produit            
        document.getElementById("title").innerText = value.name;


        //affichage du prix            
        document.getElementById("price").innerText = value.price;

        //affichage de la description            
        document.getElementById("description").innerText = value.description;

        //récupération des éléments à afficher sur la page panier




        //Ajout des options de couleur et attributs dans l'élément HTML <select>    


        let select = document.getElementById("colors");

        let newColour1 = document.createElement("option");
        select.appendChild(newColour1);
        newColour1.setAttribute('value', value.colors[0]);
        newColour1.innerText = value.colors[0];

        let newColour2 = document.createElement("option");
        select.appendChild(newColour2);
        newColour2.setAttribute('value', value.colors[1]);
        newColour2.innerText = value.colors[1];


        //Algoritme qui permet d'afficher autant de choix de couleurs qu'il y a de couleurs dans le tableau de l'objet
        switch (Object.values(value)[0].length) {
            case 3:

                let newColour3 = document.createElement("option");
                select.appendChild(newColour3);
                newColour3.setAttribute('value', value.colors[2]);
                newColour3.innerText = value.colors[2];

                break;

            case 4:

                let newColour3bis = document.createElement("option");
                select.appendChild(newColour3bis);
                newColour3bis.setAttribute('value', value.colors[2]);
                newColour3bis.innerText = value.colors[2];

                let newColour4 = document.createElement("option");
                select.appendChild(newColour4);
                newColour4.setAttribute(`value`, value.colors[3]);
                newColour4.innerText = value.colors[3];

            default:
                break;
        }
    }
    )
    .catch(function (erreur) { console.log(` Erreur : ${erreur}`); })




//******************************************************************** Récupération des choix de l'utilisateur **************************************************************************************************

// création d'un objet 'product' à envoyer sur le localStorage

let product = {};
let addToCart = document.getElementById('addToCart');




addToCart.onclick = () => {                                                                // Lors du clique sur "Ajouter au panier"
    console.log(2);

    let colors = document.getElementById('colors');



    product.colour = colors.options[colors.selectedIndex].value;                             // Ajout des informations nécessaires pour la page panier à l'objet product
    product.qty = Number(quantity.value); console.log(typeof product.qty);
    product.id = productId;

    if (quantity.value > 100 || quantity.value < 1) {             // gestion des exceptions
        alert('Quantité invalide !');
    }
    else if (product.colour == '') {
        alert('Veuillez choisir une couleur');
    }
    else {




        if (product.qty > 1) {
            alert('Vos articles ont bien été ajoutés au panier')    // Affichage d'un message de confirmation d'ajout au panier pertinent selon la qté
        }
        else { alert('Votre article a bien été ajouté au panier') }


        // Création d'une fonction pour récupérer le panier depuis localStorage
        function getCart() {

            if (localStorage.getItem("cart") === null) {            // Si le localStorage est vide
                let cart = [];                                      // --> création d'un tableau 
                cart.push(product);                                 // --> ajout du produit au tableau
                let cartString = JSON.stringify(cart);              // --> sérialisation du tableau en chaîne de caractères 
                localStorage.setItem('cart', cartString);           // --> renvoi du tableau sur le localStorage
            }
            else {                                                  // Sinon
                cartString = localStorage.getItem('cart');          // récupération du tableau depuis le localStorage
                cart = JSON.parse(cartString);                      // reconstruction de tableau en objet(array)  
            }
        }

        // Création d'une fonction pour envoyer le panier sur le localStorage
        function sendCart(array) {
            cartString = JSON.stringify(array);
            localStorage.setItem('cart', cartString);
        }


        getCart();

        // Création d'une fonction pour envoyer les produits du panier sur le local Storage

        let x;
        let y;
        function addToCart() {
            let search = cart.find(element => element.id === product.id && element.colour === product.colour)
            if (search != undefined) {            // Si on trouve un objet dans le panier qui a le même id et la même couleur

                x = parseInt(search.qty);
                y = parseInt(product.qty);

                search.qty = x + y;                                        // --> On actualise sa quantité               
                sendCart(cart);

            }
            else {                              // Sinon
                cart.push(product);             // --> On envoit une nouveau produit dans le panier
                sendCart(cart);
            }
        }

        addToCart();

    }

}


//***********************************************************************************Récupération de l’id du produit à afficher**************************************************************************************************


//On crée une fonction qui va utiliser urlSearchParams pour obtenir l'ID du produit sur lequel l'utilisateur à cliqué.
function getIdFromUrl() {

    const urlString = window.location.href;  //on recupère ici l'url de la page actuelle
    const searchParams = new URLSearchParams(urlString);

    // on itère sur les paramètres de recherche et on retourne la valeur de l'id en index 1.
    for (let id of searchParams) {
        let idFromURL = id;
        return idFromURL[1];
    }

}

let productId = getIdFromUrl()

// ici on utilise un console.log avec timeout pour verifier que ma variable globale crée plus haut contient bien la réponse voulue, 
// si on utilise directement un console.log on a des chances de ne rien pouvoir afficher

// setTimeout(() => {
//     console.log(productId);         
// }, 1500);


//***********************************************************************************Insertion du produit et de ses détails**************************************************************************************************

let productName = '';
let productImg = '';
let productAltText = '';
let productPrice = '';

//Ajout de l'Id récupéré
fetch(`http://localhost:3000/api/products/${productId}`)


    .then(function (reponse) { return reponse.json(); })
    .then(function (reponseValue) {

        //ajout de l'image
        document.getElementsByClassName("item__img")[0].innerHTML += `<img src='${reponseValue.imageUrl}' alt="">`;

        //ajout du nom du produit            
        document.getElementById("title").innerHTML += `${reponseValue.name}`;


        //ajout du prix            
        document.getElementById("price").innerHTML += `${reponseValue.price}`;

        //ajout de la description            
        document.getElementById("description").innerHTML += `${reponseValue.description}`;

        //récupération des éléments à afficher sur la page panier
        productName = `${reponseValue.name}`;
        productImg = `${reponseValue.imageUrl}`;
        productAltText = `${reponseValue.altTxt}`;
        productPrice = `${reponseValue.price}`;


        //Ajout des options et attributs dans l'élément HTML <select>    


        let select = document.getElementById("colors");

        let newColour1 = document.createElement("option");
        select.appendChild(newColour1);
        newColour1.setAttribute('value', `${reponseValue.colors[0]}`);
        newColour1.innerHTML = `${reponseValue.colors[0]}`;

        let newColour2 = document.createElement("option");
        select.appendChild(newColour2);
        newColour2.setAttribute('value', `${reponseValue.colors[1]}`);
        newColour2.innerHTML = `${reponseValue.colors[1]}`;


        //Algoritme qui permet d'afficher autant de choix de couleurs qu'il y a de couleurs dans le tableau de l'objet
        switch (Object.values(reponseValue)[0].length) {
            case 3:

                let newColour3 = document.createElement("option");
                select.appendChild(newColour3);
                newColour3.setAttribute('value', `${reponseValue.colors[2]}`);
                newColour3.innerHTML = `${reponseValue.colors[2]}`;

                break;

            case 4:

                let newColour3bis = document.createElement("option");
                select.appendChild(newColour3bis);
                newColour3bis.setAttribute('value', `${reponseValue.colors[2]}`);
                newColour3bis.innerHTML = `${reponseValue.colors[2]}`;

                let newColour4 = document.createElement("option");
                select.appendChild(newColour4);
                newColour4.setAttribute(`value`, `${reponseValue.colors[3]}`);
                newColour4.innerHTML = `${reponseValue.colors[3]}`;

            default:
                break;
        }
    }
    )
    .catch(function (erreur) { console.log(` Erreur : ${erreur}`); })




//***********************************************************************************Récupération des choix de l'utilisateur **************************************************************************************************




// création d'un objet 'product'
let product = {};



// Lors du clique sur "Ajouter au panier"
// --> Ajout des informations à envoyer sur le localStorage
addToCart.onclick = () => {
    
    let colors = document.getElementById('colors');
    product.colour = colors.options[colors.selectedIndex].value;
    
    if (quantity.value > 100 || quantity.value < 1) {             // gestion des exceptions
        alert('Quantité invalide !');
    }
    else if (product.colour == '') {
        alert('Veuillez choisir une couleur');
    }
    else {
        
        product.qty = Number(quantity.value);                     // Remplissage de l'objet product avec les informations nécessaires pour la page panier
        product.id = productId;
        product.name = productName;
        product.img = productImg;
        product.altTxt = productAltText;
        product.price = Number(productPrice) * product.qty;
        product.defaultPrice = Number(productPrice);

        if (product.qty>1) {
            alert('Vos articles ont bien été ajoutés au panier')    // Affichage d'un message de confirmation d'ajout au panier
        }
        else { alert('Votre article a bien été ajouté au panier')}


        // Création d'une fonction pour récupérer le panier depuis localStorage
        function getCart() {

            if (localStorage.getItem("cart") === null) {            // Si le localStorage est vide
                let cart = [];                                      // --> création d'un tableau 
                cart.push(product);                                 // --> ajout du produit au tableau
                let cartString = JSON.stringify(cart);              // --> sérialisation du tableau en chaîne de caractères 
                localStorage.setItem('cart', cartString);           // --> renvoi du tableau sur le localStorage
                console.log(cart);
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

                x = parseInt(search.qty);        // --> On actualise sa quantité 
                y = parseInt(product.qty);

                search.qty = x + y ;
                search.price = search.defaultPrice * search.qty ;
                sendCart(cart);
                

            }
            else {                              // Sinon
                cart.push(product);             // --> On envoit une nouveau produit dans le panier
                sendCart(cart);
                
            }
        }

        addToCart() ;
        
    }
    
}

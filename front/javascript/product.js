
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

// ici j'utilise un console.log avec timeout pour verifier que ma variable globale crée plus haut contient bien la réponse voulu, 
// si j'utilise directement un console.log j'ai des chances de ne rien pouvoir afficher
// setTimeout(() => {
//     console.log(productId);         
// }, 1500);


//***********************************************************************************Insertion du produit et de ses détails**************************************************************************************************



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



// lors du clique sur "Ajouter au panier"
addToCart.onclick = () => {

    //ajout de l'id du produit à l'objet product
    product.id = productId;

    //Récupération de la couleur choisie qu'on ajoute à l'objet product

    let colors = document.getElementById('colors');
    product.colour = colors.options[colors.selectedIndex].value;

    //Récupération de la quantité sélectionnée qu'on ajoute à l'objet oroduct

    if (quantity.value > 100 || quantity.value < 1) {
        alert('Quantité invalide !');
    }
    else {
        product.qty = quantity.value;

    }

    // fonction du panier depuis localStorage
    function getCart() {
        if (localStorage.getItem("cart") === null) {            //
            let cart = [];                                      // --> création du tableau 
            cart.push(product);                                 // --> ajout du produit au tableau
            let cartString = JSON.stringify(cart);              // --> sérialisation(stringify) + renvoi du tableau sur le localStorage
            localStorage.setItem('cart', cartString);
        }
        else {
            cartString = localStorage.getItem('cart');
            cart = JSON.parse(cartString);



        }
    }
    
    // fonction pour envoyer le panier sur le localStorage
    function sendCart() {
        cartString = JSON.stringify(cart);
        localStorage.setItem('cart', cartString); 
       }




    getCart()
    let x;
    let y;

    function addToCart() {
        let search = cart.find( element => element.id === product.id && element.colour === product.colour )
        if (search != undefined) {

           function turnQtyToNumber() {
                x = parseInt(search.qty) ;
                y = parseInt(product.qty) ;
           }
            turnQtyToNumber()
            
           search.qty = x + y 
           sendCart();

        } else  {
            cart.push(product);
            sendCart();  
        }
    }
    addToCart()


}



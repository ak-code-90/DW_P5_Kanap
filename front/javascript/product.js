// Récupération de l’id du produit à afficher

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

let chosenProductId = getIdFromUrl() 

// ici j'utilise un console.log avec timeout pour verifier que ma variable globale crée plus haut contient bien la réponse voulu, 
// si j'utilise directement un console.log j'ai des chances de ne rien pouvoir afficher
setTimeout(() => {
    console.log(chosenProductId);         
}, 1500);


//Récupération du tableau du produit
// difficultés rencontrées : portée des variables, tentatives de console.log avant les réponses de l'API
let productArray;

fetch('http://localhost:3000/api/products')
    .then(function (reponse) { return reponse.json(); })
    .then(function (array) {
        for (let element of array) {
            if (element._id === chosenProductId) {
                productArray = element;
            }



        }
    })

setTimeout(() => {
    console.log(productArray);         
}, 2000);






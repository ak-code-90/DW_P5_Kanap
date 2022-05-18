
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

//Récupération de la couleur dans la liste déroulante

let color;

let selectHTML = document.getElementById('colors');

//On écoute les modifications sur Select, et lors d'un changement on ajoute la valeur sélectionnée à la variable "color" 
selectHTML.addEventListener( 'change' , function () {
   return color =  selectHTML.options[selectHTML.selectedIndex].value 
} )

//Attention ici pour pour afficher le contenenu de la variable
// il faut attendre la résolution de la promesse et il faut utiliser la console ds les devtools pour simuler un changement de couleur.

// setTimeout(() => {
//     console.log(color);
// }, 2000);

   
//Récupération de la quantité sélectionnée

let qty;

let input = document.getElementById('quantity') ;

input.addEventListener('change', function (event) {
    
    if (event.target.value > 100 || event.target.value < 1) {
         qty = '' ;
        
    }
    else
    {
       
         qty = event.target.value ;
        
    }
    
}) ;


//Envoi les variables 'qty' et 'color' sur le localStorage

let cart = [productId];
cart.push(qty,color);



addToCart.onclick = function () {
    localStorage.setItem('produit', JSON.stringify(cart))
}


let cartFromLocalStorage = JSON.parse(localStorage.getItem('produit'))








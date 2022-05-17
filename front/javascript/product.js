
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

let chosenProductId = getIdFromUrl()

// ici j'utilise un console.log avec timeout pour verifier que ma variable globale crée plus haut contient bien la réponse voulu, 
// si j'utilise directement un console.log j'ai des chances de ne rien pouvoir afficher
// setTimeout(() => {
//     console.log(chosenProductId);         
// }, 1500);


//***********************************************************************************Insertion du produit et de ses détails**************************************************************************************************



//Ajout de l'Id récupéré
fetch(`http://localhost:3000/api/products/${chosenProductId}`)     


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
        document.getElementsByTagName("option")[0].setAttribute('value', `${reponseValue.colors[0]}`);
        document.getElementsByTagName("option")[0].innerHTML = `${reponseValue.colors[0]}`;

        let select = document.getElementById("colors");

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



















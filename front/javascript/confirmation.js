function getIdFromUrl() {

    const urlString = window.location.href;  
    
    const searchParams = new URLSearchParams(urlString); console.log(searchParams);

    // on itère sur les paramètres de recherche et on retourne la valeur de l'id en index 1.
    for (let element of searchParams) {
        
        return element[1];
        
    }

}

let orderID = getIdFromUrl(); 

orderId.innerHTML = `${orderID}`
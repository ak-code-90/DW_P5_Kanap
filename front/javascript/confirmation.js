

getIdFromUrl = () => {

    const params = new URLSearchParams(window.location.search);

    return params.get('order');
}


let orderID = getIdFromUrl();

orderId.innerText = orderID;
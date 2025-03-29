
// L'URL de base de l'API
const baseUrl = 'https://authapi.alwaysdata.net/';
const ressource = 'authapi.php'

const jwt = localStorage.getItem('jwt');

//Récupérer le jeton en fonction du login, mot de passe
function verifJWT() {

    //Permet de créer tout le corps de le requête
    const requestOptions = {
        method: 'GET', // Méthode HTTP
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };

    //Envoie la requête à l'URL spécifié
    fetch(`${baseUrl}${ressource}`,requestOptions)
        .then(response => response.json())
        .then(data=> {
            checkJWT(data);
        })
        .catch(error => console.error('Erreur fetch',error));
}

function checkJWT(info){
    if(info.status_code!="200"){
        window.location.href = '../pages/error.html';
    }
}

if(jwt){
    verifJWT();
} else {
    window.location.href = '../pages/error.html';
}
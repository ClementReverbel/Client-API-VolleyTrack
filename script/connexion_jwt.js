// L'URL de base de l'API
const baseUrl = 'https://authapi.alwaysdata.net/';
const ressource = 'authapi.php'

//Récupérer le jeton en fonction du login, mot de passe
function getJwt() {

    //Créer le body de la requête JSON
    const body = {
        login: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    //Permet de créer tout le corps de le requête
    const requestOptions = {
        method: 'POST', // Méthode HTTP
        headers: { 'Content-Type': 'application/json' }, // Type de contenu
        body: JSON.stringify(body) // Corps de la requête
    };

    //Envoie la requête à l'URL spécifié
    fetch(`${baseUrl}${ressource}`,requestOptions)
        .then(response => response.json())
        .then(data=> {
            displayInfoResponse(document.getElementById('loginResponse'),data);
            if(data.data){
                localStorage.setItem('jwt', data.data);
                alert("Vous êtes bien connecté ! Votre session est ouverte pour 30 minutes")
                window.location.href = './pages/dashboard.html';
            }
        })
        .catch(error => console.error('Erreur fetch',error));
}

// Mise à jour de la fonction pour afficher les informations de réponse
function displayInfoResponse(baliseInfo,info) {
    if(info) {
        baliseInfo.textContent = `Code: ${info.status_code}, Message: ${info.status_message}`;
        baliseInfo.style.display = 'block';
    } else {
        baliseInfo.style.display = 'none';
    }
}

// Attacher les événements aux boutons
document.getElementById('envoyer').addEventListener('click', getJwt);

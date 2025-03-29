// L'URL de base de l'API
const baseUrl = 'https://volleyapi.alwaysdata.net/ressources';
const ressource = '/matchs_endpoint.php'

const jwt = localStorage.getItem('jwt');

// Méthode pour effectuer un appel API GET pour récupérer tous les objets
function getAll() {

    const requestOptions = {
        headers: { 'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };
    
    fetch(`${baseUrl}${ressource}`,requestOptions)
        .then(response => response.json())
        .then(data=> {
            displayInfoResponse(document.getElementById('infoGetAll'),data);
            displayData(data.data);
        })
        .catch(error => console.error('Erreur fetch',error)
    );
    

}

// Méthode pour effectuer un appel API GET pour récupérer un seul objet
function get() {
    var valeurDeLaBalise = document.getElementById('getID').value;
    
    const requestOptions = {
        method: 'GET', // Méthode HTTP
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };
        
    fetch(`${baseUrl}${ressource}/?id=${valeurDeLaBalise}`,requestOptions)
        .then(response => response.json())
        .then(data=> {
            displayInfoResponse(document.getElementById('infoGet'),data);
            displayData(data.data);
        })
        .catch(error => console.error('Erreur fetch',error)
    );

}

// Méthode pour créer un nouvel objet
function add() {

    const body = {
        phrase: document.getElementById("new").value,
    };

    const requestOptions = {
        method: 'POST', // Méthode HTTP
        headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${jwt}`}, // Type de contenu
        body: JSON.stringify(body) // Corps de la requête
    };

    fetch(`${baseUrl}${ressource}`,requestOptions)
    .then(response => response.json())
    .then(data=> {
        displayInfoResponse(document.getElementById('infoAdd'),data);
        displayData(data.data);
    })
    .catch(error => console.error('Erreur fetch',error)
);

}

// Méthode pour mettre à jour un objet
function update() {

    var id = document.getElementById("updateID").value;
    var phraseUpdate = document.getElementById("updateContent").value;
    var voteUpdate = document.getElementById("updateVote").value;
    var fauteUpdate = document.getElementById("updateFaute").checked;
    var signalementUpdate = document.getElementById("updateSignalement").checked;

    //METHODE PUT
    const changementData = {
        phrase: phraseUpdate,
        vote: voteUpdate,
        faute: fauteUpdate,
        signalement: signalementUpdate
    };
    const requestUpdate = {
        method: 'PUT', // Méthode HTTP
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
        body: JSON.stringify(changementData) // Corps de la requête
    };

    fetch(`${baseUrl}${ressource}/${id}`,requestUpdate)
        .then(response => response.json())
        .then(data=> {
            displayInfoResponse(document.getElementById('infoUpdate'),data);
            displayData(data.data);
        })
        .catch(error => console.error('Erreur fetch',error)
    );

}

// Méthode pour supprimer un objet
function deleteOne() {

    var id = document.getElementById("deleteID").value;

    const requestDelete = {
        method: 'DELETE', // Méthode HTTP
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };

    fetch(`${baseUrl}${ressource}/${id}`,requestDelete)
            .then(response => response.json())
            .then(data=> {
                displayInfoResponse(document.getElementById('infoDelete'),data);
            })
            .catch(error => console.error('Erreur fetch',error)
        );
}

// Méthode pour afficher les données dans le tableau HTML
function displayData(phrases) {
    const tableBody = document.getElementById('responseTableBody');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponse');
    apiResponse.style.display = phrases.length > 0 ? 'block' : 'none';

    phrases.forEach(phrase => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = phrase.id;
        row.insertCell(1).textContent = phrase.phrase;
        row.insertCell(2).textContent = phrase.date_ajout;
        row.insertCell(3).textContent = phrase.date_modif;
        row.insertCell(4).textContent = phrase.vote;
        row.insertCell(5).textContent = phrase.faute;
        row.insertCell(6).textContent = phrase.signalement;
    });
}

// Mise à jour de la fonction pour afficher les informations de réponse
function displayInfoResponse(baliseInfo,info) {
    if(info) {
        baliseInfo.textContent = `Statut: ${info.status}, Code: ${info.status_code}, Message: ${info.status_message}`;
        baliseInfo.style.display = 'block';
    } else {
        baliseInfo.style.display = 'none';
    }
}

// Attacher les événements aux boutons
document.getElementById('getAll').addEventListener('click', getAll);
document.getElementById('get').addEventListener('click', get);
document.getElementById('add').addEventListener('click', add);
document.getElementById('delete').addEventListener('click', deleteOne);
document.getElementById('update').addEventListener('click', update);


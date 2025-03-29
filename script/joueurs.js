// L'URL de base de l'API
const baseUrl = 'https://volleyapi.alwaysdata.net/ressources';
const ressource = '/matchs_endpoint.php'

const jwt = localStorage.getItem('jwt');

// Méthode pour effectuer un appel API GET pour récupérer tous les objets
function getAll() {

    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
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
    var valeurDeLaBalise = document.getElementById('ID').value;
    
    const requestOptions = {
        method: 'GET', // Méthode HTTP
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };
        
    fetch(`${baseUrl}${ressource}?id=${valeurDeLaBalise}`,requestOptions)
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
        date: document.getElementById("newdate").value,
        heure:document.getElementById("newheure").value,
        equipeadv:document.getElementById("newequipeadv").value,
        domicile:document.getElementById("newdomicile").value
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

    //METHODE PUT
    const changementData = {
        id:document.getElementById("updateID").value,
        date: document.getElementById("updatedate").value,
        heure:document.getElementById("updateheure").value,
        equipeadv:document.getElementById("updateequipeadv").value,
        domicile:document.getElementById("updatedomicile").value,
        score:document.getElementById("updatescore").value
    };
    const requestUpdate = {
        method: 'PUT', // Méthode HTTP
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
        body: JSON.stringify(changementData) // Corps de la requête
    };

    fetch(`${baseUrl}${ressource}`,requestUpdate)
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

    const body = {
        id: document.getElementById('deleteID').value,
    };

    const requestDelete = {
        method: 'DELETE', // Méthode HTTP
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
        body: JSON.stringify(body)
    };

    fetch(`${baseUrl}${ressource}`,requestDelete)
            .then(response => response.json())
            .then(data=> {
                displayInfoResponse(document.getElementById('infoDelete'),data );
            })
            .catch(error => console.error('Erreur fetch',error)
        );
}

// Méthode pour afficher les données dans le tableau HTML
function displayData(matchs) {
    const tableBody = document.getElementById('responseTableBody');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponse');

    matchs = Array.isArray(matchs) ? matchs : [matchs];

    apiResponse.style.display = matchs.length > 0 ? 'block' : 'none';

    matchs.forEach(match => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = match.id;
        row.insertCell(1).textContent = match.date_heure;
        row.insertCell(2).textContent = match.equipeadv;
        row.insertCell(3).textContent = match.domicile;
        row.insertCell(4).textContent = match.score;
        row.insertCell(5).textContent = match.gagne;
    });
}

// Mise à jour de la fonction pour afficher les informations de réponse
function displayInfoResponse(baliseInfo,info) {
    if(info) {
        baliseInfo.textContent = `Code HTTP: ${info.status_code}, Message: ${info.status_message}`;
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


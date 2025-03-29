// L'URL de base de l'API
const baseUrl = 'https://volleyapi.alwaysdata.net/ressources';
const ressource = '/joueurs_endpoint.php'

// Méthode pour effectuer un appel API GET pour récupérer tous les objets
function getAll() {

    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };

    var actif = document.getElementById("actif").checked;
    
    fetch(`${baseUrl}${ressource}?actif=${actif}`,requestOptions)
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
        
    fetch(`${baseUrl}${ressource}?numLic=${valeurDeLaBalise}`,requestOptions)
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
        numLic: document.getElementById("newnumLic").value,
        nom:document.getElementById("newnom").value,
        prenom:document.getElementById("newprenom").value,
        date_de_naissance:document.getElementById("newdatenaissance").value,
        taille:document.getElementById("newtaille").value,
        poids:document.getElementById("newpoids").value,
        commentaire:document.getElementById("newcommentaire").value
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
        numLic: document.getElementById("updatenumLic").value,
        nom:document.getElementById("updatenom").value,
        prenom:document.getElementById("updateprenom").value,
        date_de_naissance:document.getElementById("updatedatenaissance").value,
        taille:document.getElementById("updatetaille").value,
        poids:document.getElementById("updatepoids").value,
        commentaire:document.getElementById("updatecommentaire").value,
        statut:document.getElementById("updatestatut").value
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
        numLic: document.getElementById('deleteID').value,
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
function displayData(joueurs) {
    const tableBody = document.getElementById('responseTableBody');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponse');

    joueurs = Array.isArray(joueurs) ? joueurs : [joueurs];

    apiResponse.style.display = joueurs.length > 0 ? 'block' : 'none';

    joueurs.forEach(joueur => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = joueur.idJoueur;
        row.insertCell(1).textContent = joueur.Numéro_de_licence;
        row.insertCell(2).textContent = joueur.NomComplet;
        row.insertCell(3).textContent = joueur.Taille+" m";
        row.insertCell(4).textContent = joueur.Poids+" kg";
        row.insertCell(5).textContent = joueur.Moyenne_note+" /5";
        row.insertCell(6).textContent = joueur.Commentaire;
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


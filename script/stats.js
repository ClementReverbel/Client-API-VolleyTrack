// L'URL de base de l'API
const baseUrl = 'https://volleyapi.alwaysdata.net/ressources';
const ressource = '/stats_endpoint.php'

// Méthode pour effectuer un appel API GET pour récupérer tous les objets
function getAll() {

    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }, // Type de contenu
    };
    
    if(document.getElementById('joueur').checked){
        fetch(`${baseUrl}${ressource}?stats_joueur=1`,requestOptions)
            .then(response => response.json())
            .then(data=> {
                displayInfoResponse(document.getElementById('infoGetAll'),data);
                displayData(data.data);
            })
            .catch(error => console.error('Erreur fetch',error)
        );
    }else{
        fetch(`${baseUrl}${ressource}?stats_match=1`,requestOptions)
        .then(response => response.json())
        .then(data=> {
            displayInfoResponse(document.getElementById('infoGetAll'),data);
            displayDataMatch(data.data);
        })
        .catch(error => console.error('Erreur fetch',error)
    );    
    }
    

}

// Méthode pour afficher les données dans le tableau HTML
function displayData(joueurs) {
    document.getElementById('responseTableBodyMatch').innerHTML='';
    const tableBody = document.getElementById('responseTableBody');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponse');

    joueurs = Array.isArray(joueurs) ? joueurs : [joueurs];

    apiResponse.style.display = joueurs.length > 0 ? 'block' : 'none';

    joueurs.forEach(joueur => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = joueur.idJoueur;
        row.insertCell(1).textContent = joueur.Nom;
        row.insertCell(2).textContent = joueur.Prenom;
        row.insertCell(3).textContent = joueur.Statut;
        row.insertCell(4).textContent = joueur.Poste_prefere;
        row.insertCell(5).textContent = joueur.Total_titulaire;
        row.insertCell(6).textContent = joueur.Total_remplacant;
        row.insertCell(7).textContent = (joueur.Moyenne_note  ?? 0.0) +" /5" ;
        row.insertCell(8).textContent = (joueur.Pourcentage_gagne  ?? 0) +"%";
        row.insertCell(9).textContent = joueur.selections_consecutives;
    });
}

// Méthode pour afficher les données dans le tableau HTML pour un autre type
function displayDataMatch(match) {
    document.getElementById('responseTableBody').innerHTML='';
    const tableBody = document.getElementById('responseTableBodyMatch');
    tableBody.innerHTML = ''; // nettoie le tableau avant de le remplir
    const apiResponse = document.getElementById('apiResponseMatch');

    match = Array.isArray(match) ? match : [match];

    apiResponse.style.display = match.length > 0 ? 'block' : 'none';

    match.forEach(match => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = match.nbgagne;
        row.insertCell(1).textContent = match.nbperdu;
        row.insertCell(2).textContent = match.pourcentgagne;
        row.insertCell(3).textContent = match.pourcentperdu;

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

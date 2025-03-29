// L'URL de base de l'API
const baseUrl = 'https://volleyapi.alwaysdata.net/ressources';
const ressource = '/feuillematch_endpoint.php'

const jwt = localStorage.getItem('jwt');


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
        id: document.getElementById("newid").value,
        liste_joueurs: Array.from(document.querySelectorAll("#players-container input"))
                        .map(input => input.value),
        liste_roles: Array.from(document.querySelectorAll("#roles-container input"))
                      .map(input => input.value)
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
        id: document.getElementById("updateid").value,
        liste_joueurs: Array.from(document.querySelectorAll("#update-players-container input"))
        .map(input => input.value),
        liste_roles: Array.from(document.querySelectorAll("#update-roles-container input"))
            .map(input => input.value),
        liste_notes: Array.from(document.querySelectorAll("#update-notes-container input"))
            .map(input => parseFloat(input.value) || 0) // Convertir en float, 0 si vide
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
        row.insertCell(7).textContent = joueur.Role_titulaire ? "Oui" : "Non";
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
document.getElementById('get').addEventListener('click', get);
document.getElementById('add').addEventListener('click', add);
document.getElementById('update').addEventListener('click', update);



//##################################################################
// Rajout dynamique de joueur et role

// POST - Ajout de joueurs et rôles
const conteneurJoueurs = document.getElementById('players-container');
const conteneurRoles = document.getElementById('roles-container');
const boutonAjouterJoueur = document.getElementById('addPlayer');
const boutonSupprimerJoueur = document.getElementById('removePlayer');
let nombreJoueurs = 0;

boutonAjouterJoueur.addEventListener('click', () => {
    if (nombreJoueurs < 12) {
        nombreJoueurs++;

        // Champ ID joueur
        const divJoueur = document.createElement('div');
        divJoueur.classList.add('champ-joueur');
        divJoueur.id = `joueur-${nombreJoueurs}`;
        const champJoueur = document.createElement('input');
        champJoueur.type = 'text';
        champJoueur.placeholder = `ID du joueur ${nombreJoueurs}`;
        champJoueur.name = `joueur-${nombreJoueurs}`;
        divJoueur.appendChild(champJoueur);
        conteneurJoueurs.appendChild(divJoueur);

        // Champ rôle joueur
        const divRole = document.createElement('div');
        divRole.classList.add('champ-role');
        divRole.id = `role-${nombreJoueurs}`;
        const champRole = document.createElement('input');
        champRole.type = 'text';
        champRole.placeholder = `Rôle du joueur ${nombreJoueurs}`;
        champRole.name = `role-${nombreJoueurs}`;
        divRole.appendChild(champRole);
        conteneurRoles.appendChild(divRole);
    } else {
        alert("Tu ne peux pas ajouter plus de 12 joueurs.");
    }
});

boutonSupprimerJoueur.addEventListener('click', () => {
    if (nombreJoueurs > 0) {
        document.getElementById(`joueur-${nombreJoueurs}`).remove();
        document.getElementById(`role-${nombreJoueurs}`).remove();
        nombreJoueurs--;
    } else {
        alert("Aucun joueur à supprimer.");
    }
});

// PUT - Ajout de joueurs et rôles
// PUT - Ajout de joueurs, rôles et notes
const conteneurJoueursMaj = document.getElementById('update-players-container');
const conteneurRolesMaj = document.getElementById('update-roles-container');
const conteneurNotesMaj = document.getElementById('update-notes-container'); // Ajout du conteneur pour les notes
const boutonAjouterJoueurMaj = document.getElementById('addUpdatePlayer');
const boutonSupprimerJoueurMaj = document.getElementById('removeUpdatePlayer');
let nombreJoueursMaj = 0;

boutonAjouterJoueurMaj.addEventListener('click', () => {
    if (nombreJoueursMaj < 12) {
        nombreJoueursMaj++;

        // Champ ID joueur
        const divJoueurMaj = document.createElement('div');
        divJoueurMaj.classList.add('champ-joueur');
        divJoueurMaj.id = `maj-joueur-${nombreJoueursMaj}`;
        const champJoueurMaj = document.createElement('input');
        champJoueurMaj.type = 'text';
        champJoueurMaj.placeholder = `ID du joueur ${nombreJoueursMaj}`;
        champJoueurMaj.name = `maj-joueur-${nombreJoueursMaj}`;
        divJoueurMaj.appendChild(champJoueurMaj);
        conteneurJoueursMaj.appendChild(divJoueurMaj);

        // Champ rôle joueur
        const divRoleMaj = document.createElement('div');
        divRoleMaj.classList.add('champ-role');
        divRoleMaj.id = `maj-role-${nombreJoueursMaj}`;
        const champRoleMaj = document.createElement('input');
        champRoleMaj.type = 'text';
        champRoleMaj.placeholder = `Rôle du joueur ${nombreJoueursMaj}`;
        champRoleMaj.name = `maj-role-${nombreJoueursMaj}`;
        divRoleMaj.appendChild(champRoleMaj);
        conteneurRolesMaj.appendChild(divRoleMaj);

        // Champ note joueur
        const divNoteMaj = document.createElement('div');
        divNoteMaj.classList.add('champ-note');
        divNoteMaj.id = `maj-note-${nombreJoueursMaj}`;
        const champNoteMaj = document.createElement('input');
        champNoteMaj.type = 'number';
        champNoteMaj.step = '0.1'; // Permet les notes décimales
        champNoteMaj.min = '0';
        champNoteMaj.max = '10'; // Adapte la plage selon le besoin
        champNoteMaj.placeholder = `Note du joueur ${nombreJoueursMaj}`;
        champNoteMaj.name = `maj-note-${nombreJoueursMaj}`;
        divNoteMaj.appendChild(champNoteMaj);
        conteneurNotesMaj.appendChild(divNoteMaj);
    } else {
        alert("Tu ne peux pas ajouter plus de 12 joueurs.");
    }
});

boutonSupprimerJoueurMaj.addEventListener('click', () => {
    if (nombreJoueursMaj > 0) {
        document.getElementById(`maj-joueur-${nombreJoueursMaj}`).remove();
        document.getElementById(`maj-role-${nombreJoueursMaj}`).remove();
        document.getElementById(`maj-note-${nombreJoueursMaj}`).remove();
        nombreJoueursMaj--;
    } else {
        alert("Aucun joueur à supprimer.");
    }
});


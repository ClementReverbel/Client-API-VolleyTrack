
# Client API VolleyTrack
Interface web permettant d’interagir avec les API VolleyTrack et Authentification pour la gestion d’une équipe de volley-ball.

## Présentation
Ce client web facilite la gestion des joueurs, des matchs et des statistiques d’une équipe de volley-ball. Il repose sur deux API :

- L’API d’authentification, qui assure une connexion sécurisée via JWT.

- L’API VolleyTrack, qui permet de gérer les joueurs, les matchs et les statistiques.

## Fonctionnalités principales
Authentification
Connexion sécurisée avec JWT.

- Vérification automatique du token avant chaque requête.

- Redirection en cas d’expiration ou d’échec d’authentification.

Gestion des joueurs
- Ajout, modification et suppression de joueurs.

- Consultation des informations détaillées des joueurs.

Gestion des matchs
- Programmation des matchs avec lieu, adversaire et date.

- Mise à jour des scores en respectant les règles officielles.

Statistiques et performances
- Consultation des statistiques des joueurs et des matchs.

- Calculs automatiques des performances (victoires, défaites, notes moyennes).

Structure du projet
- css/ : fichiers CSS pour le style de l’interface.

- js/ : scripts JavaScript pour l’interaction avec les API.

- pages/ : pages HTML du projet (Accueil, Joueurs, Matchs…).

- index.html : page principale du client.

## API utilisées
API	URL	Fonctionnalité
- Auth API :	authapi.alwaysdata.net
- VolleyTrack API	: volleyapi.alwaysdata.net

# Accéder au client : volleytrackclient.alwaysdata.net

Se connecter avec un identifiant et un mot de passe valides.

Naviguer entre les pages pour gérer les joueurs et les matchs.

# Développeurs
- Clément Reverbel

- Zyad Reynier

Projet universitaire réalisé en mars 2025.

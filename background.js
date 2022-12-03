// URL de l'API Twitch pour vérifier si le streamer est en direct
const TWITCH_API_URL = "https://api.twitch.tv/kraken/streams/kamet0";

// Intervalle en minutes entre chaque vérification
const CHECK_INTERVAL = 5;

// Fonction pour envoyer une notification
function sendNotification() {
// Titre et contenu de la notification
var title = "Kamet0 est en direct !";
var body = "Cliquez ici pour accéder au stream.";

// Options de la notification
var options = {
type: "basic",
iconUrl: "kamet0.png",
title: title,
message: body
};

// Envoi de la notification
chrome.notifications.create(options, function(notificationId) {
// Gestion du clic sur la notification
chrome.notifications.onClicked.addListener(function(notificationId) {
// Ouverture du stream dans un nouvel onglet
chrome.tabs.create({ url: "https://www.twitch.tv/kamet0" });
});
});
}

// Fonction principale pour vérifier si le streamer est en direct
function checkLive() {
// Options de la requête vers l'API Twitch
var options = {
    headers: new Headers()
    };
    options.headers.append("Access-Control-Allow-Origin", "*"); // <-- ajout de l'en-tête 
// Récupération des données du streamer à partir de l'API Twitch
fetch(TWITCH_API_URL, options)
.then(response => response.json())
.then(data => {
// Vérification si le streamer est en direct
if (data.stream) {
sendNotification();
}
});
}

// Exécution de la fonction principale toutes les CHECK_INTERVAL minutes
setInterval(checkLive, CHECK_INTERVAL * 60 * 1000);




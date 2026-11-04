# CHARLINE.exe — site anniversaire sans backend

Site statique en HTML, CSS et JavaScript. Aucun PHP, base de données ou compte n'est requis.

## Lancer le site
Ouvre `index.html` dans Firefox ou Chrome. Tu peux aussi utiliser l'extension Live Server de VS Code.

## Ajouter les médias
Remplace les fichiers dans les dossiers ci-dessous en gardant exactement ces noms :
- Photos : `assets/images/photo-01.jpg` à `photo-20.jpg`
- Audios : `assets/audio/audio-01.mp3` à `audio-10.mp3`
- Vidéos : `assets/videos/video-01.mp4` à `video-10.mp4`

Les 40 emplacements sont prévus dans la page. Formats conseillés : JPG/WebP pour les photos, MP3 pour les audios et MP4 H.264 pour les vidéos. Optimise les médias pour téléphone.

## Personnaliser
- Modifie le texte de la lettre dans `index.html`.
- Modifie les questions et réponses dans `assets/js/script.js` (fonctions `openGame`).
- Modifie les couleurs dans `assets/css/style.css`.
- La date affichée est le 4 novembre 2026.

## Limite importante du mode sans backend
La progression des jeux reste uniquement en mémoire dans le navigateur et se réinitialise au rechargement. Le verrouillage de la galerie est ludique, pas une protection de confidentialité : les médias publiés sur un site statique peuvent être consultés par toute personne qui connaît leurs adresses. Évite d'y placer des fichiers réellement confidentiels.

## Mise en ligne gratuite
Le dossier peut être publié sur GitHub Pages, Netlify ou Cloudflare Pages, sans backend.

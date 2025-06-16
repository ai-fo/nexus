# Nexus - Hand Tracking Virtual Object Manipulation

Application web permettant de tracker les mains via la caméra et de manipuler des objets virtuels 2D.

## Fonctionnalités

- 📹 Capture vidéo en temps réel
- 🤚 Détection et tracking des mains avec MediaPipe
- 🎯 Interaction avec des objets virtuels 2D
- 👌 Geste de pincement pour saisir et déplacer les objets
- 🎨 Objets avec différentes formes (cercle, carré, triangle)

## Technologies utilisées

- React 18
- Vite
- MediaPipe Hands
- CSS Modules

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

## Utilisation

1. Autoriser l'accès à la caméra
2. Bouger votre main devant la caméra
3. Les objets réagiront à la proximité de votre index
4. Faire un geste de pincement (pouce + index) pour saisir un objet
5. Maintenir le pincement et bouger la main pour déplacer l'objet
6. Relâcher le pincement pour libérer l'objet

## Architecture

```
src/
├── components/      # Composants réutilisables
├── features/        # Modules de fonctionnalités
│   ├── handTracking/   # Tracking des mains
│   └── virtualObjects/ # Objets virtuels
├── hooks/          # Custom hooks
└── App.jsx         # Composant principal
```

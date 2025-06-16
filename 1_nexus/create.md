# Instructions de Création - Nexus

## Objectif
Créer une application web React avec une architecture modulaire, flexible et optimisée pour la collaboration.

## Architecture Requise

### Principes Fondamentaux
- **Modularité** : Chaque fonctionnalité doit être encapsulée dans son propre module
- **Flexibilité** : L'architecture doit permettre des modifications faciles sans impacter l'ensemble du système
- **Collaboration** : Structure claire permettant à plusieurs développeurs de travailler simultanément

### Stack Technique
- **Frontend** : React 18+
- **Build Tool** : Vite (pour des performances optimales)
- **State Management** : Context API / Zustand (léger et moderne)
- **Styling** : CSS Modules / Tailwind CSS
- **Routing** : React Router v6
- **Tests** : Vitest + React Testing Library
- **Linting** : ESLint + Prettier

### Structure de Dossiers Recommandée
```
nexus/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── features/        # Modules de fonctionnalités
│   ├── layouts/         # Layouts de pages
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Fonctions utilitaires
│   ├── services/        # API et services externes
│   ├── store/           # État global
│   └── styles/          # Styles globaux
├── public/
├── tests/
└── docs/
```

### Patterns à Implémenter
1. **Feature-Based Architecture** : Organiser par fonctionnalité plutôt que par type de fichier
2. **Composition Pattern** : Favoriser la composition plutôt que l'héritage
3. **Custom Hooks** : Encapsuler la logique réutilisable
4. **Lazy Loading** : Charger les modules à la demande
5. **Error Boundaries** : Gestion robuste des erreurs

### Bonnes Pratiques pour la Collaboration
- Utiliser des conventions de nommage cohérentes
- Documenter les interfaces des modules
- Créer des composants atomiques et réutilisables
- Implémenter des tests unitaires pour chaque module
- Utiliser TypeScript pour une meilleure maintenabilité

### Configuration Initiale
1. Initialiser le projet avec Vite
2. Configurer ESLint et Prettier
3. Mettre en place la structure de dossiers
4. Créer les composants de base
5. Configurer le routing
6. Implémenter un module exemple

Cette architecture garantira une base solide, évolutive et collaborative pour le projet Nexus.
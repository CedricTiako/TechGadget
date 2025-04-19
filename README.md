# TechGadget – Manuel d’utilisation

[![Production](https://img.shields.io/badge/Accéder%20au%20site-tech--gadget.vercel.app-brightgreen)](https://tech-gadget.vercel.app/)

Bienvenue dans le manuel d’utilisation de **TechGadget**, votre boutique e-commerce spécialisée dans les produits high-tech au Cameroun.

Ce guide vous accompagne pour :
- Découvrir le catalogue et ses fonctionnalités
- Administrer facilement vos produits et catégories
- Personnaliser l’apparence et les contenus
- Gérer les commandes et le site en toute autonomie

---

## 🗂️ Table des matières
1. [Fonctionnalités principales](#fonctionnalités-principales)
2. [Accès rapide](#accès-rapide)
3. [Installation & Démarrage](#installation--démarrage)
4. [Structure du projet](#structure-du-projet)
5. [Gestion des images de catégories](#gestion-des-images-de-catégories)
6. [Personnalisation](#personnalisation)
7. [Déploiement](#déploiement)
8. [Sécurité](#sécurité)
9. [FAQ](#faq)
10. [Support & Contact](#support--contact)

---

## 1. Fonctionnalités principales

- **Catalogue produits** : Navigation, recherche, filtrage par catégorie
- **Catégories** : Ajout, modification, suppression, image personnalisée (upload/URL), image par défaut si vide
- **Produits** : Gestion complète via l’admin (ajout, édition, suppression)
- **Panier** : Ajout/retrait, total automatique
- **Commande WhatsApp** : Génération du message de commande pré-rempli
- **Admin sécurisé** : Accès protégé par authentification
- **Responsive** : Utilisation optimale sur mobile, tablette, ordinateur

## 2. Accès rapide

- **Production** : [https://tech-gadget.vercel.app/](https://tech-gadget.vercel.app/)
- **Front-office local** : [http://localhost:5173](http://localhost:5173)
- **Admin local** : [http://localhost:5173/admin](http://localhost:5173/admin)

## 3. Installation & Démarrage

### Prérequis
- Node.js ≥ 18
- Compte Supabase (pour la base de données)

### Étapes
1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd TechGadget
   ```
2. **Configurer les variables d’environnement**
   - Crée un fichier `.env` à la racine :
     ```env
     VITE_SUPABASE_URL=...
     VITE_SUPABASE_ANON_KEY=...
     ```
3. **Installer les dépendances**
   ```bash
   npm install
   ```
4. **Lancer le projet**
   ```bash
   npm run dev
   ```

## 4. Structure du projet

```
TechGadget/
├── src/
│   ├── components/         # Composants UI réutilisables
│   ├── pages/              # Pages principales (catalogue, admin, etc.)
│   ├── hooks/              # Hooks personnalisés (useProducts, useCategories)
│   ├── assets/             # Images (dont default-category.png)
│   └── ...
├── .env                   # Variables d’environnement (à créer)
├── package.json           # Dépendances et scripts
└── README.md              # Ce fichier
```

## 5. Gestion des images de catégories
- Chaque catégorie peut avoir une image (URL ou upload).
- Si aucune image n’est définie, `src/assets/default-category.png` est utilisée partout (admin, catalogue, accueil, etc.).
- Les images sont toujours cadrées, centrées et affichées en carré pour un rendu professionnel.

## 6. Personnalisation
- Remplace `src/assets/default-category.png` par l’image de ton choix.
- Modifie les couleurs, logos, textes dans les composants correspondants.
- Adapte le contenu des pages via l’admin ou directement dans le code source.

## 7. Déploiement
- Compatible Vercel, Netlify, ou tout hébergeur supportant React Vite.
- Pour générer un build de production :
  ```bash
  npm run build
  ```

## 8. Sécurité
- Les routes admin sont protégées par login.
- Ne partage jamais tes clés Supabase publiquement.

## 9. FAQ

**Q : Comment modifier le logo ou l’image par défaut ?**  
R : Remplace le fichier dans `src/assets/` (garde le même nom pour éviter de modifier le code).

**Q : Puis-je ajouter d’autres catégories ou produits ?**  
R : Oui, tout se fait depuis l’interface admin, sans aucune compétence technique.

**Q : Comment changer le numéro WhatsApp de commande ?**  
R : Va dans les paramètres de l’admin et modifie le champ WhatsApp.

**Q : Le site est-il sécurisé ?**  
R : Oui, l’accès admin est protégé et les données sont stockées sur Supabase.

## 10. Support & Contact

Pour toute question, problème ou demande de personnalisation :
- Contacte l’administrateur via le formulaire de contact du site
- Ou par email (voir le footer du site ou la section admin)

---

**TechGadget** © 2025 – Tous droits réservés.
- **UI** : TailwindCSS, Lucide Icons

## Installation et lancement

1. **Cloner le projet**

```bash
git clone <url-du-repo>
cd TechGadget
```

2. **Configurer les variables d’environnement**

Crée un fichier `.env` à la racine avec :

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

3. **Installer les dépendances**

```bash
npm install
```

4. **Lancer le projet en développement**

```bash
npm run dev
```

5. **Accéder à l’application**

- Front-office : [http://localhost:5173](http://localhost:5173)
- Admin : [http://localhost:5173/admin](http://localhost:5173/admin)

**Version en production :** [https://tech-gadget.vercel.app/](https://tech-gadget.vercel.app/)

## Structure des dossiers

```
TechGadget/
├── src/
│   ├── components/         # Composants UI réutilisables
│   ├── pages/              # Pages principales (catalogue, admin, etc.)
│   ├── hooks/              # Hooks personnalisés (useProducts, useCategories)
│   ├── assets/             # Images (dont default-category.png)
│   └── ...
├── .env                   # Variables d’environnement (à créer)
├── package.json           # Dépendances et scripts
└── README.md              # Ce fichier
```

## Gestion des images de catégories

- Les catégories peuvent avoir une image (URL ou upload).
- Si aucune image n’est définie, une image par défaut (`src/assets/default-category.png`) est affichée partout.
- Les images sont toujours cadrées, centrées et affichées en carré.

## Personnalisation

- Remplace `src/assets/default-category.png` par l’image par défaut de ton choix.
- Modifie les couleurs, logos, textes dans les composants correspondants.

## Déploiement

- Compatible avec Vercel, Netlify, ou tout hébergeur supportant les apps React Vite.
- Pour le build :

```bash
npm run build
```

## Sécurité

- Les routes admin sont protégées par authentification.
- Les clés Supabase doivent rester privées et sécurisées.

## Contribution

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements
4. Ouvre une Pull Request

## Auteur

- Paulo (contact via l’admin ou le footer du site)

---

**TechGadget** © 2025 – Tous droits réservés.

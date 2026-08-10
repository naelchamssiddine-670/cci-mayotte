-- Créer la base de données
CREATE DATABASE IF NOT EXISTS cci_mayotte;

-- Selectionne cette base pour les instructions de creation suivantes.
USE cci_mayotte;

-- Table admin
CREATE TABLE IF NOT EXISTS admin (
  -- Identifiant technique attribue automatiquement.
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Adresse de connexion unique de l'administrateur.
  email VARCHAR(255) NOT NULL UNIQUE,
  -- Mot de passe stocke sous forme de hash par l'application.
  password VARCHAR(255) NOT NULL,
  -- Date de creation du compte.
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table contenu
CREATE TABLE IF NOT EXISTS contenu (
  -- Identifiant unique du contenu.
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Titre affiche dans les listes et la page de detail.
  titre VARCHAR(255) NOT NULL,
  -- Corps complet de l'article.
  corps TEXT NOT NULL,
  categorie VARCHAR(100) DEFAULT 'Actualité',
  vues INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table message
CREATE TABLE IF NOT EXISTS message (
  -- Identifiant unique du message.
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Coordonnees de l'expediteur.
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  -- Contenu envoye depuis le formulaire.
  contenu TEXT NOT NULL,
  -- Reponse eventuelle de l'administration et etat de lecture.
  reponse TEXT DEFAULT NULL,
  lu BOOLEAN DEFAULT FALSE,
  -- Date de reception du message.
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

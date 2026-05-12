-- Création de la table des produits
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category ENUM('smartphone', 'laptop', 'audio', 'accessory') NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  original_price DECIMAL(15, 2),
  image_url TEXT,
  in_stock TINYINT(1) DEFAULT 1,
  featured TINYINT(1) DEFAULT 0,
  specs JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des administrateurs
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion d'un compte admin de test (Email: admin@wockytech.com / MP: admin123)
-- NOTE: En production, utilisez des mots de passe hachés !
INSERT INTO admin_users (email, password) VALUES ('admin@wockytech.com', 'admin123');

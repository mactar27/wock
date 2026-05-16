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

-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  items JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE SET NULL
);

-- Insertion d'un compte admin de test (Email: admin@revotex.com / MP: admin123)
-- NOTE: En production, utilisez des mots de passe hachés !
INSERT IGNORE INTO admin_users (email, password) VALUES ('admin@revotex.com', 'admin123');

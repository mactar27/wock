const mysql = require('mysql2/promise');

async function seedProduct() {
  const connection = await mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3RWMBVYcPuZSTxT.root',
    password: 'ScfP2eBWvQ49M83A',
    database: 'edusmart',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  });

  console.log('Connexion à TiDB Cloud réussie...');

  const s24Ultra = {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Le summum de l\'innovation avec Galaxy AI. Cadre en titane, écran plat de 6,8 pouces et stylet S Pen intégré. Appareil photo 200 Mpx pour des détails époustouflants.',
    price: 899000,
    category: 'smartphone',
    image_url: '/samsung s24.jpeg',
    in_stock: 1,
    featured: 1,
    specs: JSON.stringify({
      ecran: '6.8" Dynamic AMOLED 2X',
      processeur: 'Snapdragon 8 Gen 3 for Galaxy',
      batterie: '5000 mAh',
      stockage: '256Go / 512Go / 1To',
      photo: '200 Mpx + 50 Mpx + 12 Mpx + 10 Mpx'
    })
  };

  try {
    // Check if exists
    const [rows] = await connection.execute('SELECT id FROM products WHERE slug = ?', [s24Ultra.slug]);
    
    if (rows.length > 0) {
      console.log('Le produit existe déjà. Mise à jour...');
      await connection.execute(
        'UPDATE products SET name=?, description=?, price=?, category=?, image_url=?, in_stock=?, featured=?, specs=? WHERE slug=?',
        [s24Ultra.name, s24Ultra.description, s24Ultra.price, s24Ultra.category, s24Ultra.image_url, s24Ultra.in_stock, s24Ultra.featured, s24Ultra.specs, s24Ultra.slug]
      );
    } else {
      console.log('Insertion du produit...');
      await connection.execute(
        'INSERT INTO products (name, slug, description, price, category, image_url, in_stock, featured, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [s24Ultra.name, s24Ultra.slug, s24Ultra.description, s24Ultra.price, s24Ultra.category, s24Ultra.image_url, s24Ultra.in_stock, s24Ultra.featured, s24Ultra.specs]
      );
    }
    console.log('Opération réussie !');
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
  } finally {
    await connection.end();
  }
}

seedProduct();

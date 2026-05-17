const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3RWMBVYcPuZSTxT.root',
    password: 'ScfP2eBWvQ49M83A',
    database: 'edusmart',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    }
  });
  
  try {
    console.log("Modification de la colonne category...");
    await connection.execute(`
      ALTER TABLE products 
      MODIFY COLUMN category VARCHAR(50) NOT NULL;
    `);
    console.log("Colonne category modifiée avec succès.");

    console.log("Modification de la colonne image_url en LONGTEXT...");
    await connection.execute(`
      ALTER TABLE products 
      MODIFY COLUMN image_url LONGTEXT;
    `);
    console.log("Colonne image_url modifiée avec succès.");
    
  } catch (err) {
    console.error("Erreur:", err);
  } finally {
    await connection.end();
  }
}

main();

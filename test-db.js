const mysql = require('mysql2/promise');

async function testConnection() {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'M@tzo2705',
    database: 'wockytech_db'
  };

  console.log('Tentative de connexion à MySQL...');
  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connexion réussie !');
    
    const [rows] = await connection.execute('SELECT count(*) as count FROM admin_users');
    console.log(`✅ Table admin_users trouvée. Nombre d'admins : ${rows[0].count}`);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Erreur de connexion :', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('👉 La base de données "wockytech_db" n\'existe pas. Créez-la dans PHPMyAdmin.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('👉 Le mot de passe ou l\'utilisateur est incorrect.');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('👉 Votre serveur MySQL (WAMP/XAMPP) n\'est pas lancé.');
    }
  }
}

testConnection();

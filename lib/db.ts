import mysql from 'mysql2/promise';

// Configuration du pool de connexion MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  port: Number(process.env.MYSQL_PORT) || 4000,
  user: process.env.MYSQL_USER || '3RWMBVYcPuZSTxT.root',
  password: process.env.MYSQL_PASSWORD || 'ScfP2eBWvQ49M83A',
  database: process.env.MYSQL_DATABASE || 'edusmart',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('MySQL Query Error:', error);
    throw error;
  }
}

export default pool;

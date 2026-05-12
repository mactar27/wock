const mysql = require('mysql2/promise');

async function test() {
  const pool = mysql.createPool({
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

  try {
    const [tables] = await pool.execute("SHOW TABLES");
    console.log("Tables in database:", tables);

    const [admins] = await pool.execute("SELECT * FROM admin_users");
    console.log("Admins:", admins);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

test();

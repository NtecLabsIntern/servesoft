// test-db-connection.js
const pool = require('./config/database');

(async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful!');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    } finally {
        pool.end();
    }
})();

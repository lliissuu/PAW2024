const mysql = require('mysql2/promise');






async function getAllMessages() {
    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'messages'
        });


        console.log('Connected to MySQL Database!');

        // Execute a query using promise
        const [rows, fields] = await connection.execute('SELECT * FROM messages');
        console.log('Query Result:', rows);

        // Close the connection
        connection.end()

        return rows;
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
}

async function getMessageById(id) {
    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'messages'
        });


        console.log('Connected to MySQL Database!');


        const [rows, fields] = await connection.execute('SELECT * FROM messages where id = ' + id);
        console.log('Query Result:', rows);


        connection.end()

        return rows[0];
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
}


module.exports = { getAllMessages, getMessageById };


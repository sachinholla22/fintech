const mysql = require('mysql2');

// Function to create the database connection with retry logic
function createDbConnection() {
    const db = mysql.createConnection({
        host: "db",  // Docker service name
        user: "root",
        password: "sachinholla2001",
        database: "db_fintech"
    });

    db.connect((err) => {
        if (err) {
            console.log("Error connecting to the database, retrying in 5 seconds...", err);
            // Retry connection after 5 seconds
            setTimeout(createDbConnection, 5000);
        } else {
            console.log("Connected to the database successfully!");
        }
    });

    return db;
}

// Create initial connection
let dbConnection = createDbConnection();

// Export the connection object
module.exports = dbConnection;

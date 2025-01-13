const mysql = require('mysql2');

// Function to create the database connection with retry logic
function connectToDatabase() {
    const db = mysql.createConnection({
        user: "root",
        host: "db", // Docker Compose service name for MySQL
        password: "sachinholla2001",
        database: "db_fintech"
    });

    db.connect((err) => {
        if (err) {
            console.log("Cannot connect to the database:", err);
            setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
        } else {
            console.log("Database connected successfully");
        }
    });

    return db;
}

// Initialize database connection
const db = connectToDatabase();

// Export the connection object
module.exports = db;

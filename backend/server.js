const mysql = require('mysql2');

const dbConfig = {
    host: "database",
    user: "root",
    password: "sachinholla2001",
    database: "db_fintech"
};

let db;

const connectWithRetry = () => {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error("Error connecting to the database:", err.message);
            console.log("Retrying in 5 seconds...");
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log("Connected to the database successfully!");
        }
    });

    // Handle connection loss
    db.on("error", err => {
        console.error("Database connection error:", err.message);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Reconnecting to the database...");
            connectWithRetry();
        }
    });
};

// Initial connection attempt
connectWithRetry();

module.exports = db;

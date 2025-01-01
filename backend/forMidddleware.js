const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const mysql=require('mysql2');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    key: 'user_id',
    secret: 'MysecretKey',
    resave: false,
    saveUninitialized: false,

    cookie: {
        expires: 8400000,

    }
}));


app.use(cookieParser()); 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true  // Allow cookies
}));
// Create session store using MySQL


// Session middleware setup with MySQL store
// Session middleware should be loaded before any route handler






// Import and use your routers
const router = require('./forQueries');
const router1 = require('./storenewusers');
const router2 = require('./bankOperation.js');
const router3 = require('./addCarddetails.js');
const router4 = require('./paybills.js');
const router5 = require('./debitcardoperations.js');
const router6 = require('./morebankoperations.js');
const router7 = require('./forLoans.js');
const router8 = require('./forAdminOperations.js');
const router9 = require('./PayMoreBills.js');

// Use your routers
app.use(router);
app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);
app.use(router5);
app.use(router6);
app.use(router7);
app.use(router8);
app.use(router9);

// Example route in router1 (or any route) that sets session


// Start server
app.listen(3003, () => {
    console.log('Server is running on port 3003');
});

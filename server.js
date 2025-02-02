const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection (via XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default XAMPP username
    password: 'arya', // Default XAMPP password (empty by default)
    database: 'portfolio' // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { full_name, email, mobile_number, email_subject, message } = req.body;

    const query = `
        INSERT INTO contact_form (full_name, email, mobile_number, email_subject, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [full_name, email, mobile_number, email_subject, message], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Form submitted successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

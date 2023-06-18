const express = require('express');
const authenticationRoutes = require('./routes/authenticationRoutes2');
const journalRoutes = require('./routes/routes');



const app = express();
const PORT = 3000; // You can change the port number if desired

// Middleware for parsing JSON in request bodies
app.use(express.json());


// Add more middleware and routes later
app.use('/', authenticationRoutes);
app.use('/journal', journalRoutes);
app.get('/api', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/13224907/2s93si1Vc9');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


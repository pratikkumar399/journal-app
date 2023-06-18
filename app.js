const express = require('express');
const authenticationRoutes = require('./routes/authenticationRoutes2');
const journalRoutes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
const PORT = 3000; // You can change the port number if desired

// Middleware for parsing JSON in request bodies
app.use(express.json());


// Add more middleware and routes later
app.use('/', authenticationRoutes);
app.use('/journal', journalRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


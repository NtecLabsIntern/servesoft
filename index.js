// index.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const adminRoutes = require('./routes/adminSetup');
const itemsRouter = require('./routes/items'); 
const rolesRouter = require('./routes/roles'); 
const usersRouter = require('./routes/users'); 
const userRoleLinkRouter = require('./routes/userRoleLink'); 
const swaggerDocs = require('./config/swagger');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use('/api/adminSetup', adminRoutes);
app.use('/api/items', itemsRouter); // Prefix all routes with /api
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);
app.use('/api/users', userRoleLinkRouter);






// Initialize Swagger documentation
swaggerDocs(app);

(async () => {
  try {
    // Sync database models
    await sequelize.sync();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();







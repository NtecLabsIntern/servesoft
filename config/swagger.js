//config/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ServeSoft API',
      version: '1.0.0',
      description: 'API documentation for ServeSoft application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, but useful for documentation
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/adminSetup.js','./routes/items.js','./routes/roles.js','./routes/users.js','./routes/userRoleLink.js'], // Path to the API files
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(swaggerOptions);

// Setup swagger-ui
const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;

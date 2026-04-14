const express = require('express');
const cors = require('cors');
require('dotenv').config();

const validationRoutes = require('./routes/validation-routes');
const kratosManager = require('./services/kratos-manager');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar endpoints
app.use('/api', validationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', api: 'microbackend-ffe1' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Microbackend ffe1 running on port ${PORT}`);
    // Start automatic token refresh
    kratosManager.startAutoRefresh();
  });
}

module.exports = app;

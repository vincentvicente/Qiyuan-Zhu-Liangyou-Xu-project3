const express = require('express');
const userRoutes = require('./routes/user.routes');
const statusRoutes = require('./routes/status.routes');
require('./db');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/statuses', statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

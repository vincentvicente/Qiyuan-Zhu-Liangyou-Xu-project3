const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const statusRoutes = require('./routes/status.routes');
const cors = require('cors');
require('./db');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
     'https://qiyuan-zhu-liangyou-xu-project3.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.use('/api/users', userRoutes);
app.use('/api/statuses', statusRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors({
  origin: (origin, cb) => cb(null, true),
}));
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API Server Running', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

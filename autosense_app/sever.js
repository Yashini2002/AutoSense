const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send({ message: 'API is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

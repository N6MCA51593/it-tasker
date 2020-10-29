const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api/update', require('./routes/update'));
app.use('/api/load', require('./routes/load'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

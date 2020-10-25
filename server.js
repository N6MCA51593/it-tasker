const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

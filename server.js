const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());
app.use('/api/update', require('./routes/update'));
app.use('/api/load', require('./routes/load'));

// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const app = express();
const router = require('./src/routers/');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');


app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.send('I am working');
});

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

if (process.env.NODE_ENV !== "production" ) {
  require('dotenv').config()
};

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const { run } = require('./config/mongodb');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

run()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Currently listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err)
  })

app.use(errorHandler);
require('dotenv').config();
require('express-async-errors');
const express = require('express');
// const connectDB = require('./db/connect')
const app = express();
const router = require('./routes/payment');


app.use(express.json());


// routes
app.use('/split-payments/compute', router);

app.get('/', (req, res) => {
  res.send('LannisterPay(TPSS)');
});


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

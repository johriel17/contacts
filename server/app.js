const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const PORT = 4000;

const app = express();

const contactsRoute = require('./routes/contactsRoute')

app.use(express.json());
app.use(cors());

//routes
app.use('/api/contacts', contactsRoute)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

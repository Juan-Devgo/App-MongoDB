const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get('/', (req, res) => {
  res.send("Hello from Node API.");
});

// Conección a la base de datos MongoDB

mongoose.connect(
  "mongodb+srv://juandgarcian_db_user:J0vtWWg76EZOxzoS@node-app.buwhsxz.mongodb"+
  ".net/?retryWrites=true&w=majority&appName=Node-App"
)
.then(() => {
  console.log('Connected to the database.')

  // Si la conexión es exitosa, la aplicación corre en el puerto 3000

  app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });

})
.catch(() => {
  console.log('Connection to the database failed.');
})
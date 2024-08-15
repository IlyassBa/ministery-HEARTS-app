const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//var jwt = require('jsonwebtoken');

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify JWT
/*function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
      return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.sendStatus(403); // Forbidden
      }

      req.user = user; // Attach user info to the request
      next();
  });
}*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to patient management application." });
});

require("./routes/patient.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 

const db = require("./models");
db.sequelize.sync();

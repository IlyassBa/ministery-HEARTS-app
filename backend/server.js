const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
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

const secrets = new Map(); 

app.post('/auth-qr', (req, res) => {
  const user = req.body.name;

  console.log(req.body);
  console.log(`name ${user}`);

  // Generate a secret for the user
  const secret = speakeasy.generateSecret({
    name: user,
  });

  secrets.set(user, secret.base32);

  // Convert the secret to a QR code data URL
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }

    // Send the QR code data URL back to the client
    res.send(JSON.stringify({ qrCode: data, secret: secret.base32 }));
  });
});



app.post('/verify-token', (req, res) => {
  
  const { code, name } = req.body;
  const storedSecret = secrets.get(name);

  // Verify the user-provided token against the stored secret
  const verified = speakeasy.totp.verify({
    secret: storedSecret,
    encoding: 'base32',
    token: token,
  });

  if (verified) {
    res.send('Authentication successful');
  } else {
    res.status(401).send('Authentication failed');
  }
  
});

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

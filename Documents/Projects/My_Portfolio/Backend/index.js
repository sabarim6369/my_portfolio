const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
console.log(req.body)
var sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sabarim6369@gmail.com",
      pass: "gsdn ofbj bvqp bwxt",
    },
  });
  var composeMail = {
    from: email,
    to: "sabarim6369@gmail.com",
    subject: `New Message from ${name}: ${subject} whose email is ${email}`,
text:message 
 };
  
  sender.sendMail(composeMail, (error, info) => {
    if (error) {
      return res.status(500).send('Something went wrong.');
    }
    res.status(200).send('Message sent successfully!');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

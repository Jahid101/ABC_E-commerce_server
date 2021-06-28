const express = require('express')
const nodemailer = require("nodemailer");
const Email = require('email-templates');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome (^.^)');
})


app.listen(PORT)



var transport = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "357327f20a9771",
        pass: "8f6acd2f14142c"
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('All works fine, congratz!');
    }
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9v095.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

    const eventCollection = client.db("mosque").collection("events");


    app.post('/sendEmail', (req, res) => {
        const admin = 'jahidhasananik.official@gmail.com'
        const email = req.body.email
        const message = 'Received'
    console.log(email);
    
        var mail = {
          from: admin,
          to: email,
          subject: 'Received',
    
          html: message
        }
    
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log(err);
            res.json({
              msg: 'fail'
            })
          } else {
            res.json({
              msg: 'success'
            })
          }
        })
      })
    


});

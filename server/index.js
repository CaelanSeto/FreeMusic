const express = require("express");
const app1 = express();
const app2 = express();
const app3 = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);
const cors = require('cors');


app1.use(express.json());
app1.use(cors());
app2.use(cors());
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));

//Stripe

app2.listen(5000, () => {
  console.log("Started server on 5000");   
});

app2.post('/donation', async (req, res) => {
    let status, error;
    const { token, amount } = req.body;
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        });
        status = 'success';
    } catch (error) {
        console.log(error);
        status = 'Failure';
    }
    res.json({ error, status });
});

//Stripe Endpoint

// 3) Run the server on http://18.217.161.38:4242

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_899cdb4179c61d33b658d78ac3df1903cd312663e2cb9d5914f0b8f4f37ea776";

app3.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  app3.post('/hooks',bodyParser.raw({type:'application/json'}),async(req, res) => {
    const payload = req.body
    const sig = req.headers['stripe-signature']
    const endpointsecret = "whsec_899cdb4179c61d33b658d78ac3df1903cd312663e2cb9d5914f0b8f4f37ea776";
    let event;
  
    try {
 
        event = Stripe.webhooks.constructEvent(payload,sig,endpointsecret)
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false })
        return;
    }
    console.log(event.type)
    console.log(event.data.object)
    console.log(event.data.object.id)
    res.json({
     success:true
    })
})

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app3.listen(4242, () => console.log('Running on port 4242'));


//For Routers

const db = require('./models');

const userRouter = require('./routes/Users');
app1.use("/users", userRouter);

const pieceRouter = require('./routes/Pieces');
app1.use("/pieces", pieceRouter);

const fileRouter = require('./routes/Files');
app1.use("/files", fileRouter);

const downloadRouter = require('./routes/Downloads');
app1.use("/downloads", downloadRouter);

const donationRouter = require('./routes/Donations');
app1.use("/donations", donationRouter);

const composerRouter = require('./routes/Composers');
const { sequelize } = require("./models");
app1.use("/composers", composerRouter);


db.sequelize.sync().then(() => {
    app1.listen(3001, () => {
        console.log("server running on port 3001");
    });
});

db.Users.hasMany(db.Downloads);
db.Downloads.belongsTo(db.Users);



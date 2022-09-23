const express = require("express");
const app1 = express();
const app2 = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);
const cors = require('cors');



app2.listen(5000, () => {
  console.log("Started server on 5000");   
});

app1.use(express.json());
app1.use(cors());
app2.use(cors());
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));

app2.post('/payment', async (req, res) => {
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

const db = require('./models');


//For Routers
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
app1.use("/composers", composerRouter);


db.sequelize.sync().then(() => {
    app1.listen(3001, () => {
        console.log("server running on port 3001");
    });
});

db.Users.hasMany(db.Downloads);
db.Downloads.belongsTo(db.Users);



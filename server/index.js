const express = require("express");
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');


//For Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);

const pieceRouter = require('./routes/Pieces');
app.use("/pieces", pieceRouter);

const fileRouter = require('./routes/Files');
app.use("/files", fileRouter);

const downloadRouter = require('./routes/Downloads');
app.use("/downloads", downloadRouter);

const donationRouter = require('./routes/Donations');
app.use("/donations", donationRouter);

const composerRouter = require('./routes/Composers');
app.use("/composers", composerRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});

db.Users.hasMany(db.Downloads);
db.Downloads.belongsTo(db.Users);



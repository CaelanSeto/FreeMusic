const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validateToken} = require('../middlewares/AuthMiddlewares');

//get the list of all users
router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

//get user by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    res.json(user);
});

//user registration
router.post("/register", async (req, res) => {  
    const {email, name, password} = req.body;
    const user = await Users.findOne(email);
    if(user){
        res.json({ error: "The user exists, can not register again!" });
    }
    else{
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                email: email,
                password: hash,
                name: name
            });
            res.json("User Created!");
        }); 
    }
});

//user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user =  await Users.findOne({ where: { email: email } });

    if (!user) res.json({ error: "Bad Credentials!" });

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Bad Credentials!" });

      const accessToken = sign(
        {
          email: user.email, 
          id: user.id,
          role: user.role
        }, 
          "noSecretAtAll"
      );

      res.json(accessToken);
      
    });
});

//update user
router.patch("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if(!user){
        res.json({ error: "Smth went wrong!" });
    }
    else{
        const name = req.body.name;
        const role = req.body.role;
        const status = req.body.status;
        await Users.update({ name: name, role: role, status: status }, { 
            where: {
                id: id
            }
        });
    }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Users.destroy({
        where: {
          id: id
        }
    });
});

//authentification 
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
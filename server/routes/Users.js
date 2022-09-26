const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validateToken} = require('../middlewares/AuthMiddleware');
const {adminRoleCheck} = require('../middlewares/AdminRoleCheck');

//email format validation
function isEmail(email) {
    var emailCorrect = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailCorrect)) { return true; }
    
    return false;
}

//get the list of all users
router.get("/", adminRoleCheck, async (req, res) => {
    const listOfUsers = await Users.findAll();
    if(!listOfUsers){
        res.status(200).json({error: "There are no users yet!"});
    }
    else{
        res.status(200).json(listOfUsers);
    }
});

//get user by id
router.get("/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if(!user){
        res.status(404).json({error: "The user is not found!"});
    }
    else{
        res.status(200).json(user);
    } 
});

//user registration
router.post("/register", async (req, res) => {  
    const {email, name, password} = req.body;
    const user =  await Users.findOne({ where: { email: email } });

    if (user) {
        res.json({ error: "User with this email exists, can not register again!" });
    }
    else{
        if(isEmail(email)){
            bcrypt.hash(password, 10).then((hash) => {
                Users.create({
                    email: email,
                    password: hash,
                    name: name
                });
            }); 
            res.status(201).json("User Created!");
        }
        else{
            res.status(400).json({ error: "Email is not in the correct format!" });
        }
        
    }   
});

//user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user =  await Users.findOne({ where: { email: email } });
    if (!user){
        res.json({ error: "Bad Credentials!" });
    } 
    else{
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match){
                res.json({ error: "Bad Credentials!" });
            }
            else{
                if(user.status===1){
                    res.json({ error: "Your account is blocked, contact admin!" });
                }
                else{
                    const accessToken = sign(
                        {
                          email: user.email,
                          name: user.name,
                          id: user.id,
                          role: user.role
                        }, 
                          "noSecretAtAll"
                      );
                      res.json({ token: accessToken, email: email, id: user.id, name: user.name, role: user.role });
                }
            }   
        });
    }
});

//update user
router.patch("/edit/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const role = req.body.role;
    const status = req.body.status;
    const password = req.body.password;

    bcrypt.hash(password, 10).then((hash) => {
         Users.update({ name: name, role: role, status: status, password: hash }, { 
            where: {
                id: id
            }
        });
    }); 

    res.json("updated!!!");
});

//update profile
router.patch("/edit/profile/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password, 10).then((hash) => {
         Users.update({ name: name, password: hash }, { 
            where: {
                id: id
            }
        });
    }); 

    res.json("updated!!!");
});

//delete user
router.delete("/delete/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    await Users.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted!!!");
});

//authentication 
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
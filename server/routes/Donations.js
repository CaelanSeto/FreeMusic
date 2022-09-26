const express = require("express");
const router = express.Router();
const { Donations } = require("../models");
const {adminRoleCheck} = require('../middlewares/AdminRoleCheck');

//get all Donations
router.get("/", adminRoleCheck, async (req, res) => {
    const listOfDonations = await Donations.findAll();
    if(!listOfDonations){
        res.json({error: "There are no donations yet!"});
    }
    else{
        res.json(listOfDonations);
    }
});

//get all Donations by UserId
router.get("/:UserId([0-9]+)", async (req, res) => {
    const UserId = req.params.UserId;
    const listOfDonations = await Donations.findAll({
        where: {
            UserId: UserId
        }
    });
    if(!listOfDonations){
        res.json({error: "no donations yet with this user!"});
    }
    else{
        res.json(listOfDonations);
    }
});

//get one Donation by Id
router.get("/byId/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const donation = await Donations.findByPk(id);
    if(!donation){
        res.json({error: "no such donation found!"});
    }
    else{
        res.json(donation);
    }
});

//create Donation
router.post("/add", async (req, res) => {
    const donation = req.body;
    await Donations.create(donation);
    res.json(donation);
});

//update Donation
router.patch("/edit/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    const donation = await Donations.findByPk(id);
    if(!donation){
        res.json({ error: "No Donation is found!" });
    }
    else{
        const amount = req.body.amount;
        const operationId = req.body.operationId;
        const UserId = req.body.UserId;
        await Donations.update({ amount: amount, operationId: operationId, UserId: UserId }, { 
            where: {
                id: id
            }
        });
        res.json( "updated" );
    }
});

//delete Donation
router.delete("/delete/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    await Donations.destroy({
        where: {
          id: id
        }
    });
    res.json( "deleted" );
});

module.exports = router;
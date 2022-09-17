const express = require("express");
const router = express.Router();
const { Donations } = require("../models");

//get all Donations
router.get("/", async (req, res) => {
    const listOfDonations = await Donations.findAll();
    res.json(listOfDonations);
});

//get all Donations by UserId
router.get("/:UserId", async (req, res) => {
    const UserId = req.params.UserId;
    const listOfDonations = await Donations.findAll({
        where: {
            UserId: UserId
        }
    });
    res.json(listOfDonations);
});

//get one Donation by Id
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const donation = await Donations.findByPk(id);
    res.json(donation);
});

//create Donation
router.post("/add", async (req, res) => {
    const donation = req.body;
    await Donations.create(donation);
    res.json(donation);
});

//update Donation
router.patch("/edit/:id", async (req, res) => {
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
    }
});

//delete Donation
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Donations.destroy({
        where: {
          id: id
        }
    });
});

module.exports = router;
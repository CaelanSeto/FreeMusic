const express = require("express");
const router = express.Router();
const { Composers } = require("../models");
const {adminRoleCheck} = require('../middlewares/AdminRoleCheck');

//get all Composers
router.get("/", async (req, res) => {
    const listOfComposers = await Composers.findAll({order: ["name"]});
    if(!listOfComposers){
        res.json({error: "There are no composers yet!"});
    }
    else{
        res.json(listOfComposers);
    }
});

//get Composer by Id
router.get("/byId/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const composer = await Composers.findByPk(id);
    if(!composer){
        res.json({error: "composer is not found!"});
    }
    else{
        res.json(composer);
    }
});

//create Composer
router.post("/add", adminRoleCheck, async (req, res) => {
    const composer = req.body;
    await Composers.create(composer);
    if(!composer){
        res.json({error: "no composer was created!"});
    }
    else{
        res.json("composer is created!");
    }
});

//update Composer
router.patch("/edit/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    const composer = await Composers.findByPk(id);
    if(!composer){
        res.json({ error: "No Composer is found!" });
    }
    else{
        const name = req.body.name;
        const biography = req.body.biography;
        await Composers.update({ name: name, biography: biography }, { 
            where: {
                id: id
            }
        });
        res.json("updated");
    }
});

//delete Composer
router.delete("/delete/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    await Composers.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted");
});

module.exports = router;
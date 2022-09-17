const express = require("express");
const router = express.Router();
const { Composers } = require("../models");

//get all Composers
router.get("/", async (req, res) => {
    const listOfComposers = await Composers.findAll();
    res.json(listOfComposers);
});

//get Composer by Id
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const composer = await Composers.findByPk(id);
    res.json(composer);
});

//create Composer
router.post("/add", async (req, res) => {
    const composer = req.body;
    await Composers.create(composer);
    res.json(composer);
});

//update Composer
router.patch("/edit/:id", async (req, res) => {
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
    }
});

//delete Composer
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await biography.destroy({
        where: {
          id: id
        }
    });
});

module.exports = router;
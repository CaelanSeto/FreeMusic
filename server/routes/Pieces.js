const express = require("express");
const router = express.Router();
const { Pieces } = require("../models");
const {adminRoleCheck} = require('../middlewares/AdminRoleCheck');

//get all Pieces
router.get("/", async (req, res) => {
    const listOfPieces = await Pieces.findAll({order: ["title"]});
    if(!listOfPieces){
        res.json({error: "No Pieces yet!"});
    }
    else{
        res.json(listOfPieces);
    }
});

//get all Pieces by Composer
router.get("/:ComposerId([0-9]+)", async (req, res) => {
    const ComposerId = req.params.ComposerId;
    const listOfPieces = await Pieces.findAll({
        where: {
            ComposerId: ComposerId
        },
        order: ["title"]
    });
    if(!listOfPieces){
        res.json({error: "No Pieces!"})
    }
    else{
        res.json(listOfPieces);
    } 
});

//get one Piece by Id
router.get("/byId/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const piece = await Pieces.findByPk(id);
    if(!piece){
        res.json({error: "No such pieces found!"})
    }
    else{
        res.json(piece);
    } 
});

//create Piece
router.post("/add", adminRoleCheck, async (req, res) => {
    const piece = req.body;
    await Pieces.create(piece);
    res.json("The piece is created!");
});

//update Piece
router.patch("/edit/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    const piece = await Pieces.findByPk(id);
    if(!piece){
        res.json({ error: "No Piece is found!" });
    }
    else{
        const title = req.body.title;
        const ComposerId = req.body.ComposerId;
        await Pieces.update({ title: title, ComposerId: ComposerId }, { 
            where: {
                id: id
            }
        });
        res.json("updated");
    }
});

//delete Piece
router.delete("/delete/:id([0-9]+)", adminRoleCheck, async (req, res) => {
    const id = req.params.id;
    await Pieces.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted");
});

module.exports = router;
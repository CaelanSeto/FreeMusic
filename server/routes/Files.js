const express = require("express");
const router = express.Router();
const { Files } = require("../models");

//get all Files
router.get("/", async (req, res) => {
    const listOfFiles = await Files.findAll({order: ["file"]});
    if(!listOfFiles){
        res.json({error: "no files found!"})
    }
    else{
        res.json(listOfFiles);
    }
});

//get all Files (recordings, sheet music) by PieceId
router.get("/:PieceId([0-9]+)", async (req, res) => {
    const PieceId = req.params.PieceId;
    const listOfFiles = await Files.findAll({
        where: {
            PieceId: PieceId
        },
        order: ["type"]
    });
    if(!listOfFiles){
        res.json({error: "no files found!"});
    }
    else{
        res.json(listOfFiles);
    }
});

//get one File by Id
router.get("/byId/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const file = await Files.findByPk(id);
    if(!file){
        res.json({error: "No file found!"});
    }
    else{
        res.json(file);
    }
    
});

//create File
router.post("/add", async (req, res) => {
    const file = req.body;
    await Files.create(file);
    res.json("The file is created!");
});

//update File
router.patch("/edit/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const file = await Files.findByPk(id);
    if(!file){
        res.json({ error: "No File is found!" });
    }
    else{
        const title = req.body.title;
        const file = req.body.file;
        const type = req.body.type;
        const description = req.body.description;
        const instruments = req.body.instruments;
        const PieceId = req.body.PieceId;
        await Files.update({ 
            title: title, 
            file: file,
            type: type,
            description: description,
            instruments: instruments,
            PieceId: PieceId
         }, { 
            where: {
                id: id
            }
        });
        res.json("updated");
    }
});

//delete File
router.delete("/delete/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    await Files.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted");
});

module.exports = router;
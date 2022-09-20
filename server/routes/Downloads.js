const express = require("express");
const router = express.Router();
const { Downloads } = require("../models");

//get all Downloads
router.get("/", async (req, res) => {
    const listOfDownloads = await Downloads.findAll();
    if(!listOfDownloads){
        res.json({error: "No downloads yet!"});
    }
    else{
        res.json(listOfDownloads);
    }
});

//get all Downloads by UserId
router.get("/userId/:UserId([0-9]+)", async (req, res) => {
    const UserId = req.params.UserId;
    const listOfDownloads = await Downloads.findAll({
        where: {
            UserId: UserId
        }
    });
    if(!listOfDownloads){
        res.json({error: "No downloads yet with this user!"});
    }
    else{
        res.json(listOfDownloads);
    }
});

//get all Downloads by FileId
router.get("/fileId/:FileId([0-9]+)", async (req, res) => {
    const FileId = req.params.FileId;
    const listOfDownloads = await Downloads.findAll({
        where: {
            FileId: FileId
        }
    });
    if(!listOfDownloads){
        res.json({error: "No downloads yet on this file!"});
    }
    else{
        res.json(listOfDownloads);
    }
});

//get one Download by Id
router.get("/byId/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    const download = await Downloads.findByPk(id);
    if(!download){
        res.json({error: "No such transaction found!"});
    }
    else{
        res.json(download);
    }
});

//create Download
router.post("/add", async (req, res) => {
    const download = req.body;
    await Downloads.create(download);
    res.json(download);
});

//delete Download
router.delete("/delete/:id([0-9]+)", async (req, res) => {
    const id = req.params.id;
    await Downloads.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted");
});

module.exports = router;
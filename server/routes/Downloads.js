const express = require("express");
const router = express.Router();
const { Downloads } = require("../models");

//get all Downloads
router.get("/", async (req, res) => {
    const listOfDownloads = await Downloads.findAll();
    res.json(listOfDownloads);
});

//get all Downloads by UserId
router.get("/userId/:UserId", async (req, res) => {
    const UserId = req.params.UserId;
    const listOfDownloads = await Downloads.findAll({
        where: {
            UserId: UserId
        }
    });
    res.json(listOfDownloads);
});

//get all Downloads by FileId
router.get("/fileId/:FileId", async (req, res) => {
    const FileId = req.params.FileId;
    const listOfDownloads = await Downloads.findAll({
        where: {
            FileId: FileId
        }
    });
    res.json(listOfDownloads);
});

//get one Download by Id
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const download = await Downloads.findByPk(id);
    res.json(download);
});

//create Download
router.post("/add", async (req, res) => {
    const download = req.body;
    await Downloads.create(download);
    res.json(download);
});

//delete Download
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Downloads.destroy({
        where: {
          id: id
        }
    });
    res.json("deleted");
});

module.exports = router;
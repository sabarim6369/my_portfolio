const express = require("express");
const { createPoll, votePoll,getallpollofuser,getallpoll} = require("../controller/Poll");

const router = express.Router();

router.post("/create", createPoll);
router.post("/vote", votePoll);
router.get("/getPolls/:userId",getallpollofuser)
router.get("/getallPolls/:userId",getallpoll)

module.exports = router;

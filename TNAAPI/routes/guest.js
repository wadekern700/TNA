const express = require("express");

const GuestController = require("../controllers/guest");



const router = express.Router();

router.post("", GuestController.createGuest);
router.get("", GuestController.getGuests);
module.exports = router;

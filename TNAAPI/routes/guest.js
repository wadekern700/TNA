const express = require("express");

const GuestController = require("../controllers/guest");



const router = express.Router();

router.post("", GuestController.createGuest);
router.get("", GuestController.getGuests);
router.delete("/:id", GuestController.deleteGuest);
router.put("/:id", GuestController.updateGuest);
router.delete("", GuestController.deleteAll);
module.exports = router;

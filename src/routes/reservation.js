const { Router } = require("express");
const {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservation,
} = require("../controllers/reservationController");
const authenticateToken = require("../middlewares/auth");
const router = Router();

router.post("/", authenticateToken, createReservation);
router.put("/:id", authenticateToken, updateReservation);
router.delete("/:id", authenticateToken, deleteReservation);
router.get("/:id", authenticateToken, getReservation);

module.exports = router;

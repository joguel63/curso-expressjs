const { Router } = require("express");
const AuthRouter = require("./auth");
const AdminRouter = require("./admin");
const ReservationRouter = require("./reservation");
const router = Router();

router.use("/auth", AuthRouter);
router.use("/admin", AdminRouter);
router.use("/reservation", ReservationRouter);

module.exports = router;

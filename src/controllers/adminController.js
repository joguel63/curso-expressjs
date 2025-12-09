const { createTimeBlockService, listReservationsService } = require("../services/adminService");

const createTimeBlock = async (req, res, next) => {
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Access denied" });
  try {
    const timeBlocks = req.body;
    const createdBlocks = await createTimeBlockService(timeBlocks);
    res.status(201).json({ message: "Time blocks created", timeBlocks: createdBlocks });
  } catch (error) {
    next(error);
  }
};

const listReservations = async (req, res, next) => {
  console.log(req.user);
  
  if (req.user.role !== "ADMIN") return res.status(403).json({ error: "Access denied" });
  try {
    const reservations = await listReservationsService();
    res.status(200).json({ reservations });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTimeBlock, listReservations };

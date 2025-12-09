const {
  createReservationService,
  updateReservationService,
  deleteReservationService,
  getReservationService,
} = require("../services/reservationService");

const createReservation = async (req, res, next) => {
  try {
    const reservationData = req.body;
    const newReservation = await createReservationService(reservationData);
    res.status(201).json({ success: true, data: newReservation });
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const reservationData = req.body;
    const updatedReservation = await updateReservationService(reservationId, reservationData);
    res.status(200).json({ success: true, data: updatedReservation });
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    await deleteReservationService(reservationId);
    res.status(200).json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const reservation = await getReservationService(reservationId);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservation,
};

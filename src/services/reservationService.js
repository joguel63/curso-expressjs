const { prisma } = require("../utils/prisma");

const createReservationService = async (reservationData) => {
  // validar que el timeBlock no esté reservado
  const existingReservation = await prisma.appointment.findFirst({
    where: {
      timeBlockId: reservationData.timeBlockId,
    },
  });
  if (existingReservation) {
    throw new Error("Time block is already reserved");
  }
  const newReservation = await prisma.appointment.create({
    data: reservationData,
  });
  return newReservation;
};

const updateReservationService = async (reservationId, reservationData) => {
  // validar que el elemento exista
  const existingReservation = await prisma.appointment.findUnique({
    where: { id: parseInt(reservationId) },
  });
  if (!existingReservation) throw new Error("Reservation not found");
  const updatedReservation = await prisma.appointment.update({
    where: { id: parseInt(reservationId) },
    data: reservationData,
  });
  return updatedReservation;
};

const deleteReservationService = async (reservationId) => {
  // validar que el elemento exista
  const existingReservation = await prisma.appointment.findUnique({
    where: { id: parseInt(reservationId) },
  });
  if (!existingReservation) throw new Error("Reservation not found");
  await prisma.appointment.delete({
    where: { id: parseInt(reservationId) },
  });
};

const getReservationService = async (reservationId) => {
  const reservation = await prisma.appointment.findUnique({
    where: { id: parseInt(reservationId) },
    include: { user: true, timeBlock: true },
  });

  if (!reservation) throw new Error("Reservation not found");

  return reservation;
};

module.exports = {
  createReservationService,
  updateReservationService,
  deleteReservationService,
  getReservationService,
};

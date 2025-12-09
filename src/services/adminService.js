const { prisma } = require("../utils/prisma");

const createTimeBlockService = async ({ startTime, endTime }) => {
  const createdBlock = await prisma.timeBlock.create({
    data: { startTime: new Date(startTime), endTime: new Date(endTime) },
  });
  return createdBlock;
};

const listReservationsService = async () => {
  return await prisma.appointment.findMany({ include: { user: true, timeBlock: true } });
};

module.exports = { createTimeBlockService, listReservationsService };

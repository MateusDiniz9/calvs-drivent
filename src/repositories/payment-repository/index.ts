import { savedData } from "@/protocols";
import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function getPaymentsByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(savedData: savedData) {
  await prisma.ticket.update({
    where: {
      id: savedData.ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
  return await prisma.payment.create({
    data: savedData,
  });
}

const paymentRepository = { getPaymentsByTicketId, createPayment };
export default paymentRepository;

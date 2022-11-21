import { prisma } from "@/config";
import { Enrollment, TicketStatus } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function insertTicket(hasEnrolment: Enrollment, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId,
      enrollmentId: hasEnrolment.id,
    },
  });
}

const ticketsRepository = { findTicketTypes, findTicketByEnrollmentId, insertTicket };
export default ticketsRepository;

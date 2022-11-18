import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/ticket-repository";

async function getTicketsTypes(): Promise<TicketType[]> {
  return ticketsRepository.findTicketTypes();
}

async function getTicketByUser(userId: number) {
  const hasEnrolment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!hasEnrolment.id) {
    throw notFoundError();
  }
  const hasTicket = await ticketsRepository.findTicketByEnrollmentId(hasEnrolment.id);
  if (!hasTicket.id) {
    throw notFoundError();
  }
  return hasTicket;
}

const ticketService = { getTicketsTypes, getTicketByUser };

export default ticketService;

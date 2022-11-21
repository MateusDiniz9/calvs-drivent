import ticketService from "../tickets-service";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { cardData, savedData } from "@/protocols";

async function getPaymentsByTicketId(ticketId: number, userId: number) {
  const hasTicket = await ticketService.getTicketById(ticketId);
  if (!hasTicket) {
    throw notFoundError();
  }
  const ticketUser = await ticketService.getTicketByUser(userId);

  if (hasTicket.enrollmentId !== ticketUser.enrollmentId) {
    throw unauthorizedError();
  }
  const payment = await paymentRepository.getPaymentsByTicketId(ticketId);

  return payment;
}

async function postPayment(ticketId: number, cardData: cardData, userId: number) {
  const hasTicket = await ticketService.getTicketById(ticketId);
  if (!hasTicket) {
    throw notFoundError();
  }
  const ticketUser = await ticketService.getTicketByUser(userId);

  if (hasTicket.enrollmentId !== ticketUser.enrollmentId) {
    throw unauthorizedError();
  }
  const savedData: savedData = {
    ticketId,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
    value: ticketUser.TicketType.price,
  };
  await paymentRepository.createPayment(savedData);

  const payment = await paymentRepository.getPaymentsByTicketId(ticketId);
  return payment;
}

const paymentService = { getPaymentsByTicketId, postPayment };

export default paymentService;

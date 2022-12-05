import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, requestError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function listBooking(userId: number) {
  const reserve = await bookingRepository.findBooking(userId);
  if (!reserve) {
    throw notFoundError();
  }
  return reserve;
}

async function postNewBooking(userId: number, roomId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw requestError(403, "Forbidden");
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw requestError(403, "Forbidden");
  }
  const roomExists = await bookingRepository.getRoomById(roomId);
  if (!roomExists) {
    throw notFoundError();
  }
  const roomIsAvaible = await bookingRepository.getBookingsByRoomId(roomId);
  if (roomExists.capacity <= roomIsAvaible.length) {
    throw requestError(403, "Forbidden");
  }
  const newBooking = await bookingRepository.insertNewBooking(userId, roomId);
  return newBooking;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const hasBooking = await bookingRepository.findBooking(userId);
  if (!hasBooking) {
    throw requestError(403, "Forbidden");
  }
  const roomExists = await bookingRepository.getRoomById(roomId);
  if (!roomExists) {
    throw notFoundError();
  }
  const roomIsAvaible = await bookingRepository.getBookingsByRoomId(roomId);
  if (roomExists.capacity <= roomIsAvaible.length) {
    throw requestError(403, "Forbidden");
  }
  const newBooking = await bookingRepository.updateBookingById(bookingId, roomId);
  return newBooking;
}

const bookingService = {
  listBooking,
  postNewBooking,
  updateBooking,
};

export default bookingService;

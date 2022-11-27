import { unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { TicketStatus } from "@prisma/client";
import ticketService from "../tickets-service";

async function listHotels(userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  if (ticket.status !== TicketStatus.PAID) {
    throw unauthorizedError();
  }
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }
  const hotels = await hotelsRepository.listAllHotels();

  return hotels;
}

async function listRoomsByHotelId(hotelId: number) {
  const hotelWithRooms = await hotelsRepository.listRoomsByHotel(hotelId);
  return hotelWithRooms;
}

const hotelService = { listHotels, listRoomsByHotelId };

export default hotelService;

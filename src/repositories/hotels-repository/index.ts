import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function listAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function listRoomsByHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  listAllHotels,
  listRoomsByHotel,
};

export default hotelsRepository;

import { prisma } from "@/config";

//Sabe criar objetos - booking do banco
export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

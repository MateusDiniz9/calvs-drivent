import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.listHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelsRoom(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  try {
    const hotelRooms = await hotelService.listRoomsByHotelId(Number(hotelId));
    if (!hotelRooms) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

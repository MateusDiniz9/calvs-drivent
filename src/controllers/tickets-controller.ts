import { postTicket } from "./../protocols";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketByUser(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === "TypeError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as postTicket;
  const { userId } = req;
  try {
    const ticket = await ticketService.insertNewTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "TypeError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

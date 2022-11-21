import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  try {
    const payment = await paymentService.getPaymentsByTicketId(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "TypeError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPaymentProcess(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;
  try {
    const payment = await paymentService.postPayment(ticketId, cardData, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "TypeError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

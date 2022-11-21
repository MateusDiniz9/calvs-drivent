import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentsByTicketId, postPaymentProcess } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPaymentsByTicketId).post("/process", postPaymentProcess);

export { paymentsRouter };

import { postTicket } from "@/protocols";
import Joi from "joi";

export const ticketSchema = Joi.object<postTicket>({
  ticketTypeId: Joi.number().required(),
});

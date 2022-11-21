import { postPayment } from "./../protocols";
import Joi from "joi";

export const ticketSchema = Joi.object<postPayment>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required(),
  },
});

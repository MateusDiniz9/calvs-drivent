import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsRoom } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken).get("/", getHotels).get("/:hotelId", getHotelsRoom);

export { hotelsRouter };

import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentService } from '@/services';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const payment = await paymentService.getPaymentByTicketId(userId, ticketId);
  if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

  return res.status(httpStatus.OK).send(payment);
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  const payment = await paymentService.paymentProcess(ticketId, userId, cardData);
  if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

  return res.status(httpStatus.OK).send(payment);
}

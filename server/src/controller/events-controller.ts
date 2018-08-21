import {
  JsonController,
  Authorized,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch,
  Params
} from 'routing-controllers'
import Event from '../entity/events-entity'
import { Ticket } from '../entity/tickets-entity'

@JsonController()
export default class EventController {
  // @Authorized()
  @Get('/events')
  async getEvents() {
    const events = await Event.find()
    return { events }
  }

  //   @Authorized()
  @Get('/events/:eventId([0-9]+)')
  async getEvent(@Param('eventId') eventId) {
    const event = await Event.findOne(eventId)
    return { event }
  }

  @Get('/events/:eventId/tickets')
  getTicketsForEvent(@Param('eventId') eventId) {
    return Ticket.find({ where: { eventId: eventId } })
  }

  @Get('/events/:eventId/tickets/:ticketId')
  getTicketDetails(@Param('ticketId') ticketId) {
    return Ticket.findOne(ticketId)
  }
}

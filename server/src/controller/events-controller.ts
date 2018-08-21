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

  @Get('/events/:eventID/tickets')
  // get tickets where tickets-eventId === :eventId
  getTicketsForEvent(@Param('eventID') eventID) {
    return Ticket.find({ where: { eventId: eventID } })
  }

  @Get('/events/:eventID/tickets/:ticketID')
  async getTicketDetails(
    @Param('eventID') eventID: number,
    @Param('ticketID') ticketID: number
  ) {
    const ticketsForEvent = await Ticket.find({ where: { eventId: eventID } })
    return ticketsForEvent.find(ticket => ticket.id === ticketID)
  }
}

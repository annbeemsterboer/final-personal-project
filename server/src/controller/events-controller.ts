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
  Params,
  CurrentUser,
  Put
} from 'routing-controllers'
import Event from '../entity/events-entity'
import { Ticket, Comment } from '../entity/tickets-entity'
import User from '../entity/users-entity'

const avgPriceForEvent = (ticketsForEvent, ticket) => {
  let avgPriceForEvent

  if (ticketsForEvent.length <= 1) {
    return (avgPriceForEvent = ticket.price)
  } else {
    const avgPrice = ticketsForEvent
      .map(ticket => ticket.price)
      .reduce(function(total, price) {
        return total + price / ticketsForEvent.length
      }, 0)
    return (avgPriceForEvent = avgPrice)
  }
}

@JsonController()
export default class EventController {
  // @Authorized()
  @Get('/events')
  async getEvents() {
    const events = await Event.find()
    return { events }
  }

  //   @Authorized()
  @Get('/events/:eventID([0-9]+)')
  async getEvent(@Param('eventID') eventID) {
    const event = await Event.findOne(eventID)
    if (!event) throw new NotFoundError('Event not found!')
    return { event }
  }

  @Get('/events/:eventID/tickets')
  // get tickets where tickets-eventId === :eventId
  getTicketsForEvent(@Param('eventID') eventID) {
    const ticket = Ticket.find({ where: { eventId: eventID } })
    if (!ticket) throw new NotFoundError('Ticket not found!')
    return ticket
  }

  @Get('/events/:eventID/tickets/:ticketID')
  async getTicketDetails(
    @Param('eventID') eventID: number,
    @Param('ticketID') ticketID: number
  ) {
    const ticketsForEvent = await Ticket.find({ where: { eventId: eventID } })
    if (!ticketsForEvent) throw new NotFoundError('Tickets not found!')
    const ticket = await ticketsForEvent.find(ticket => ticket.id === ticketID)
    const comments = await Comment.find({ where: { ticketId: ticketID } })
    if (!comments) throw new NotFoundError('No comments found!')
    const ticketUserId = await Number(ticket.userId)
    const ticketPoster = await User.findOne(ticketUserId)

    const ticketsForTicketPoster = await Ticket.find({
      where: { userId: ticketUserId }
    })
    const numberOfTicketsForTicketPoster = ticketsForTicketPoster.length

    const avgTicketPrice = await avgPriceForEvent(ticketsForEvent, ticket)
    console.log(avgTicketPrice)

    return {
      ticket,
      comments,
      ticketPoster,
      numberOfTicketsForTicketPoster,
      avgTicketPrice
    }
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  createEvent(@Body() event: Event) {
    return event.save()
  }

  @Authorized()
  @Post('/events/:eventID')
  @HttpCode(201)
  async createTicket(
    // @CurrentUser() user: User,
    @Param('eventID') eventID: number,
    @Body() ticket: Ticket
  ) {
    const entity = await Ticket.create(ticket)
    if (entity) {
      entity.eventId = eventID
    }

    return ticket.save()
  }

  @Authorized()
  @Put('/events/:eventID/tickets/:ticketID')
  async updateTicket(
    @CurrentUser() user: User,
    @Param('eventID') eventID: number,
    @Param('ticketID') ticketID: number,
    @Body() update: Partial<Ticket>
  ) {
    const ticket = await Ticket.findOne(ticketID)
    if (!ticket) throw new NotFoundError('Ticket not found!')

    if (user.id !== ticket.userId) throw new ForbiddenError('Unauthorized!')

    return Ticket.merge(ticket, update).save()
  }

  ////// ??????????
  @Post('/events/:eventID/tickets/:ticketID')
  @HttpCode(201)
  async addComment(
    @Param('eventID') eventID: number,
    @Param('ticketID') ticketID: number,
    @Body() data: Comment
  ) {
    const { comment, ...rest } = data
    const entity = Comment.create(rest)
    // await entity.getComment(comment)

    const newComment = await entity.save()
    return newComment
  }
}

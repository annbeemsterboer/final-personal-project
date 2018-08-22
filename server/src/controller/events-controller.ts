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
    const ticket = await ticketsForEvent.find(ticket => ticket.id === ticketID)
    const comments = await Comment.find({ where: { ticketId: ticketID } })
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

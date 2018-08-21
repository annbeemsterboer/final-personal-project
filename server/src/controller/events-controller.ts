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
  Patch
} from 'routing-controllers'
import Event from '../entity/events-entity'

@JsonController()
export default class EventController {
  // @Authorized()
  @Get('/events')
  async getEvents() {
    const events = await Event.find()
    return { events }
  }

  //   @Authorized()
  @Get('/events/:id([0-9]+)')
  async getEvent(@Param('id') id) {
    const event = await Event.findOne(id)

    return event
  }
}

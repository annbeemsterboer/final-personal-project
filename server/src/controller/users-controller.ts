import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized
} from 'routing-controllers'
import User from '../entity/users-entity'

@JsonController()
export default class UserController {
  @Post('/users')
  async createUser(@Body() user: User) {
    console.log('post executing')
    const { password, ...rest } = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }

  // @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(@Param('id') id: number) {
    return User.findOneById(id)
  }
}

import { createConnection } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import User from './entity/users-entity'
import Event from './entity/events-entity'
import { Ticket, Comment } from './entity/tickets-entity'

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's'
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_')
    )
  }

  columnNameCustomized(customName: string): string {
    return customName
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }
}

export default () =>
  createConnection({
    type: 'postgres',
    url: `postgres://postgres:secret@localhost:5432/postgres`,
    entities: [User, Event, Ticket, Comment],
    synchronize: false, // careful with this in production!
    logging: true,
    namingStrategy: new CustomNamingStrategy()
  }).then(_ => console.log('Connected to Postgres with TypeORM'))

import { GET_TICKETS, ADD_TICKET, UPDATE_TICKET } from '../actions/events'

export default function(state = [], action) {
  console.log(state, action)
  switch (action.type) {
    case GET_TICKETS:
      return action.payload
    case ADD_TICKET:
      return [...state, action.payload]
    case UPDATE_TICKET:
      if (state.length > 1)
        return [state, action.payload].reduce((tickets, ticket) => {
          tickets[ticket.id] = ticket

          // tickets.find(ticket => ticket[ticket.id] === action.payload.id)
          return tickets
        }, {})
      else return action.payload
    default:
      return state
  }
}

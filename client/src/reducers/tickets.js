import { GET_TICKETS, ADD_TICKET } from '../actions/events'

export default function(state = [], action) {
  console.log(state, action)
  switch (action.type) {
    case GET_TICKETS:
      return action.payload
    case ADD_TICKET:
      return [...state, action.payload]

    default:
      return state
  }
}

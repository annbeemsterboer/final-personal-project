import { GET_TICKET_DETAILS } from '../actions/events'

export default function(state = null, action) {
  switch (action.type) {
    case GET_TICKET_DETAILS:
      return action.payload
    default:
      return state
  }
}

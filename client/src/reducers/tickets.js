import { GET_TICKETS } from '../actions/events'

export default function(state = null, action) {
  switch (action.type) {
    case GET_TICKETS:
      return action.payload

    default:
      return state
  }
}
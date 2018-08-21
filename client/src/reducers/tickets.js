import { GET_EVENT_DETAILS } from '../actions/events'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_EVENT_DETAILS:
      return action.payload
    default:
      return state
  }
}

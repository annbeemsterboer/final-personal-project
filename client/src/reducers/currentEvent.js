import { GET_EVENT_DETAILS } from '../actions/events'

export default function(state = null, action) {
  switch (action.type) {
    case GET_EVENT_DETAILS:
      return action.payload
    default:
      return state
  }
}

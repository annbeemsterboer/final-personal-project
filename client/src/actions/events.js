import request from 'superagent'
import { baseUrl } from '../constants.js'

export const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
export const GET_EVENT_DETAILS = 'GET_EVENT_DETAILS'
export const GET_TICKETS = 'GET_TICKETS'

export const getAllEvents = () => dispatch => {
  request
    .get(`${baseUrl}/events`)
    .then(response =>
      dispatch({
        type: GET_ALL_EVENTS,
        payload: response.body.events
      })
    )
    .catch(err => alert(err))
}

export const getEvent = eventId => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response =>
      dispatch({
        type: GET_EVENT_DETAILS,
        payload: response.body
      })
    )
    .catch(err => alert(err))
}

export const getTickets = eventId => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets`)
    .then(response =>
      dispatch({
        type: GET_TICKETS,
        payload: response.body
      })
    )
    .catch(err => alert(err))
}

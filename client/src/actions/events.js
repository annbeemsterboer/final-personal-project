import request from 'superagent'
import { baseUrl } from '../constants.js'
import { logout } from './users'
import { isExpired } from '../jwt'

export const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
export const GET_EVENT_DETAILS = 'GET_EVENT_DETAILS'
export const GET_TICKETS = 'GET_TICKETS'
export const GET_TICKET_DETAILS = 'GET_TICKET_DETAILS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const GET_FRAUD_PARAMS = 'GET_FRAUD_PARAMS'
export const ADD_EVENT = 'ADD_EVENT'

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

export const getTicketDetails = (eventId, ticketId) => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response =>
      dispatch(
        {
          type: GET_COMMENTS,
          payload: response.body.comments
        },
        dispatch({
          type: GET_TICKET_DETAILS,
          payload: response.body.ticket
        })
      )
    )
    .catch(err => alert(err))
}

export const updateComments = (eventId, ticketId) => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response =>
      dispatch({
        type: UPDATE_COMMENTS,
        payload: response.body.comments
      })
    )
    .catch(err => alert(err))
}

export const getFraudParams = (eventId, ticketId) => dispatch => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response =>
      dispatch({
        type: GET_FRAUD_PARAMS,
        payload: response.body
      })
    )
    .catch(err => alert(err))
}

export const createEvent = eventDetails => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(eventDetails)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}

export const addEvent = event => (
  console.log('here'),
  {
    type: ADD_EVENT,
    payload: event
  }
)

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { userId } from '../../jwt'
import { createTicket } from '../../actions/events'
import { Redirect } from 'react-router-dom'

class TicketForm extends PureComponent {
  state = {
    userId: this.props.userId,
    eventId: this.props.currentEvent.event.id
  }

  onSubmit = ticket => {
    this.props.createTicket(ticket, this.props.currentEvent.event.id)
    this.props.history.push(`/events/${this.props.currentEvent.event.id}`)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      price: '',
      description: '',
      imgUrl: ''
    })
    this.onSubmit(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.authenticated === false) {
      return <Redirect to="/login" />
    }
    const initialValues = this.props.initialValues || {}
    if (!this.props.currentEvent) return 'loading..'
    return (
      <div>
        <div>Add a ticket for {this.props.currentEvent.event.eventName}</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              input
              type="number"
              id="price"
              value={
                this.state.price !== undefined
                  ? this.state.price
                  : initialValues.price
              }
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              value={
                this.state.description !== undefined
                  ? this.state.description
                  : initialValues.description
              }
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="imgUrl">Add picture URL</label>
            <input
              name="imgUrl"
              id="imgUrl"
              value={
                this.state.imgUrl !== undefined
                  ? this.state.imgUrl
                  : initialValues.imgUrl
              }
              onChange={this.handleChange}
            />
          </div>

          <Button variant="contained" color="primary" type="submit">
            Add ticket
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser,
    userId: state.currentUser && userId(state.currentUser.jwt),
    currentEvent: state.currentEvent
  }
}

export default connect(
  mapStateToProps,
  { createTicket }
)(TicketForm)

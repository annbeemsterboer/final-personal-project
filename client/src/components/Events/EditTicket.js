import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { userId } from '../../jwt'
import { editTicket } from '../../actions/events'
import { Redirect } from 'react-router-dom'

class EditTicket extends PureComponent {
  state = {}

  onSubmit = update => {
    this.props.editTicket(
      update,
      this.props.currentEvent.event.id,
      this.props.currentTicket.id
    )
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
    console.log(this.state)
    if (this.props.authenticated === false) {
      return <Redirect to="/login" />
    }
    const initialValues = this.props.initialValues || {}
    if (!this.props.currentEvent) return 'loading..'
    return (
      <div>
        <div>
          Edit your ticket for {this.props.currentEvent.event.eventName}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="price">New price</label>
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
            <label htmlFor="description">New description</label>
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
            <label htmlFor="imgUrl">Change picture URL</label>
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
            Change ticket
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
    currentEvent: state.currentEvent,
    currentTicket: state.currentTicket
  }
}

export default connect(
  mapStateToProps,
  { editTicket }
)(EditTicket)

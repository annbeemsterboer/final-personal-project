import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getTickets } from '../../actions/events'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'

class EventDetails extends PureComponent {
  componentWillMount() {
    this.props.getTickets(this.props.eventId)
  }

  render() {
    const { tickets } = this.props

    if (!tickets) return 'loading..'
    return (
      <div>
        {tickets.map(ticket => {
          return (
            <Card
              style={{
                paddingBottom: '10px',
                paddingTop: '10px',
                margin: 12
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.currentEvent.event.eventName}
                </Typography>
                <Typography component="p">
                  Price: &euro;
                  {ticket.price}
                </Typography>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link
                      to={`/events/${
                        this.props.currentEvent.event.id
                      }/tickets/${ticket.id}`}
                    >
                      See tickets details
                    </Link>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent,
    tickets: state.tickets
  }
}

export default connect(
  mapStateToProps,
  { getTickets }
)(EventDetails)

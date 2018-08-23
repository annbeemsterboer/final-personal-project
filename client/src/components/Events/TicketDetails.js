import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  getTicketDetails,
  updateComments,
  getFraudParams
} from '../../actions/events'
import { getPosterById } from '../../actions/users'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

// const commentPoster = poster.find(poster => poster.id === comment.userId)

class TicketDetails extends PureComponent {
  componentDidMount() {
    this.props.getTicketDetails(
      this.props.match.params.eventId,
      this.props.match.params.ticketId
    )
    this.props.getFraudParams(
      this.props.match.params.eventId,
      this.props.match.params.ticketId
    )
  }

  componentDidUpdate(prevProps) {
    // if (this.props.currentTicket !== prevProps.currentTicket) {
    //   this.props.getPosterById(this.props.currentTicket.userId)
    // }
    // if (this.props.comments.length > prevProps.comments.length) {
    //   this.props.updateComments(
    //     this.props.match.params.eventId,
    //     this.props.match.params.ticketId
    //   )
    // }
  }

  //   handleCommentSubmit = () => {
  //     this.props.addComment()
  //   }

  calculateFraudRisk = () => {
    let fraudFactor = 0.02
    const postTime = new Date(this.props.currentTicket.createdAt)
    const postHours = postTime.getHours()

    if (this.props.fraudParams.numberOfTicketsForTicketPoster === 1) {
      fraudFactor = fraudFactor + 0.04
    }
    if (
      this.props.currentTicket.price <= this.props.fraudParams.avgTicketPrice
    ) {
      const priceDiffLess =
        (this.props.fraudParams.avgTicketPrice -
          this.props.currentTicket.price) /
        this.props.fraudParams.avgTicketPrice
      fraudFactor = fraudFactor + priceDiffLess
    }
    if (
      this.props.currentTicket.price > this.props.fraudParams.avgTicketPrice
    ) {
      const priceDiffMore =
        (this.props.currentTicket.price -
          this.props.fraudParams.avgTicketPrice) /
        this.props.fraudParams.avgTicketPrice
      if (priceDiffMore < 0.15) {
        fraudFactor = fraudFactor - priceDiffMore
      } else {
        fraudFactor = fraudFactor - 0.15
      }
    }
    if (postHours > 9 && postHours < 17) {
      fraudFactor = fraudFactor - 0.13
    } else {
      fraudFactor = fraudFactor + 0.13
    }
    if (this.props.comments.length > 3) {
      fraudFactor = fraudFactor + 0.06
    }

    if (fraudFactor < 0.02) {
      return (fraudFactor = 0.02)
    } else if (fraudFactor > 0.98) {
      return (fraudFactor = 0.98)
    } else return fraudFactor
  }

  render() {
    const {
      currentTicket,
      currentEvent,
      comments,
      poster,
      fraudParams
    } = this.props
    if (!currentTicket || !fraudParams.ticketPoster || !currentEvent)
      return 'loading ..'

    return (
      <div>
        <Button size="small" color="primary">
          <Link to={`/events/${currentEvent.event.id}`}> Back to tickets</Link>
        </Button>
        <Grid>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h1">
              Ticket from: {fraudParams.ticketPoster.firstName}{' '}
              {fraudParams.ticketPoster.lastName}
              <Typography>Price: EUR {currentTicket.price}</Typography>
              <Typography>Description: {currentTicket.description}</Typography>
              <Typography>
                The calculated fraud-risk for this ticket is:{' '}
                {parseInt(this.calculateFraudRisk() * 100)} %
              </Typography>
            </Typography>

            <Grid>
              {comments.map(comment => {
                this.props.getPosterById(Number(comment.userId))

                return (
                  <Card
                    style={{
                      paddingBottom: '10px',
                      paddingTop: '10px',
                      margin: 12
                    }}
                  >
                    At {new Date(comment.createdAt).toUTCString()},
                    {/* {commentPoster.firstName} */}a user posted:{' '}
                    {comment.comment}
                  </Card>
                )
              })}
            </Grid>
            <CardActions>
              <Button
                size="small"
                color="primary"
                // onclick={}
              >
                Add comment
              </Button>
            </CardActions>
          </CardContent>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentEvent: state.currentEvent,
    events: state.events,
    tickets: state.tickets,
    currentTicket: state.currentTicket,
    comments: state.comments,
    fraudParams: state.fraudParams
  }
}

export default connect(
  mapStateToProps,
  { getTicketDetails, getPosterById, updateComments, getFraudParams }
)(TicketDetails)

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getAllEvents } from '../../actions/events'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class EventList extends PureComponent {
  state = {
    edit: false
  }

  //   toggleEdit = () => {
  //       this.setState({
  //           edit: !this.state.edit
  //       })
  //   }

  componentWillMount() {
    this.props.getAllEvents()
  }

  // createEvent = event => {
  //   this.props.createAdd(add)
  // }

  render() {
    const { events } = this.props
    if (!events) return 'fetching events..'
    return (
      <Grid container spacing={8} direction={'column'}>
        {events.map(event => {
          return (
            <Grid
              item
              style={{
                paddingBottom: '10px',
                paddingTop: '10px'
              }}
            >
              <Card>
                <CardContent>
                  <Typography>{event.eventName}</Typography>
                  <Typography>{event.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/events/${event.id}`}>See tickets </Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    events: state.events
  }
}
export default connect(
  mapStateToProps,
  { getAllEvents }
)(EventList)

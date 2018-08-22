import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import EventList from './components/Events/EventList'
import EventDetails from './components/Events/EventDetails'
import './App.css'
import TopBar from './components/layout/TopBar'
import TicketDetails from './components/Events/TicketDetails'
import EventForm from './components/Events/EventForm'

// <Route exact path="/signup" component={SignupPage} />
// <Route exact path="/games" component={GamesList} />
// <Route exact path="/games/:id" component={GameDetails} />

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{ marginTop: 75 }}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/createEvent" component={EventForm} />
            <Route
              exact
              path="/events/:eventId/tickets/:ticketId"
              component={TicketDetails}
            />
            <Route exact path="/" render={() => <Redirect to="/events" />} />
          </main>
        </div>
      </Router>
    )
  }
}
export default App

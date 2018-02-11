import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import TypingTutor from './TypingTutor'

const MainTab = () => (
  <div>
    <nav>
      <Link to="/"> Practise </Link>
    </nav>
    <div>
      <Route path="/" component={TypingTutor} />
    </div>
  </div>
)


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MainTab />
        </BrowserRouter>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import TypingTutor from './TypingTutor'
import Login from './Login'
import SignUp from './SignUp'

const Account = function () {  
  if (localStorage.getItem('JWT')){
    return ( <div> <h5> User Logged in </h5></div>)
  }
  else {
    return (
      <div>
        <nav>
                <Link to="/account/login"> Login </Link>
                <Link to="/account/signup"> Sign-up </Link>
        </nav>
        <div>
                <Route path="/account/login" component={Login}/>
                <Route path="/account/signup" component={SignUp}/>
        </div>
      </div>
    )
  }
}

const MainTab = () => (
  <div> 
    <nav>
      <Link to="/"> Practise </Link>
    </nav>
    <div>
      <Route path="/" component={TypingTutor}/> 
    </div>
  </div>
  )


class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <MainTab/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

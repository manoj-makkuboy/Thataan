import React, { Component } from 'react'

async function signUpUser (bindedSetState, username, password) {
  let init = {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({'username': username, 'password': password})
  }
  try {
    let response = await fetch('http://localhost:5000/signup', init)
    let responseJson = await response.json()
    if (response.ok) {
      let jwtToken = responseJson['token']
      localStorage.setItem('JWT', jwtToken)
      bindedSetState({ jwt: jwtToken })
    } else {
      console.log('User Authentication Failed')
    }
  } catch (error) {
    console.error(error)
  }
}

class SignUp extends Component {
  constructor () {
    super()
    this.state = {username: '', password: '', confirmPassword: '', jwt: null}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.password !== this.state.confirmPassword) {
      console.log('password and confirm password doesn\'t match') 
    }
    else {
      signUpUser(this.setState.bind(this), this.state.username, this.state.password)
    }
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  logoutUser () {
    localStorage.removeItem('JWT')

    console.log(this,'user logout succesful')
    this.setState({ jwt: null })
  }

  render () {
/*    if (this.state.jwt) {
      return (<ArticleGrid logoutFunction={this.logoutUser.bind(this)} />)
    }
*/
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username :
          <input type='text' onChange={this.handleInputChange} value={this.state.username} name='username' />
        </label>
        <br />
        <br />
        <label>
          password :
          <input type='password' name='password' onChange={this.handleInputChange} value={this.state.password} />
        </label>
        <br />
        <label>
          confirm password :
          <input type='password' name='confirmPassword' onChange={this.handleInputChange} value={this.state.confirmPassword} />
        </label>
	<br />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default SignUp 

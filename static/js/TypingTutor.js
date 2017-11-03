import React, { Component } from 'react'
import KeyBoardv2 from './KeyBoardv2'
import './TypingTutor.css'

class TypingTutor extends Component {
  constructor () {
    super()
    this.handleInputChangeUserTypedText = this.handleInputChangeUserTypedText.bind(this)
    this.handleOnKeyUp = this.handleOnKeyDown.bind(this)
    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.state = { practiseText: '', userTypedText: '', level: '', practiseTextHighlighted : [] }
    this.compareIndex = -1
    this.practiseData = [] 
    this.currentPractiseLine = 0
  }

  setUpKeymanInUserText () {
    var kmw = require('./static/js/keyman/keymanweb')
 
    window.addEventListener('load', function () {
            kmw.init({attachType:'manual'});
	    kmw.attachToControl(document.getElementById('userText'))

    kmw.osk.hide()
    kmw.addKeyboards({
    id:'ekwtamil99uni',                  // The keyboard's unique identification code.
    name: 'Tamil99',           // The keyboard's user-readable name.
    language:{
      id:'tam',               // A three-letter code uniquely identifying the language.
      name:'Tamil'          // The language's name.
    },
    filename:require('./tamil99.js')}); // A valid path to the compiled *.js file representing the keyboard. 
    });
  }

  handleInputChangeUserTypedText (e) {
    let userTypedTextInput = e.target.value
    this.setState({ userTypedText: userTypedTextInput })
  }

  handleLevelChange (e) {
    this.compareIndex = -1

    let userInput = e.target.value
    this.setState({ level: userInput})
    let fetchUrl = '/practise_data/' + e.target.value + '/'
    fetch(fetchUrl, {headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }})
	  .then((response) => response.json())
	  .then((responseJson) => {
	    this.practiseData = responseJson.split('\n')
	    return this.practiseData	  
	    })
	  .then((practiseData) => this.setState({practiseText:practiseData[0] , userTypedText: '', practiseTextHighlighted : this.greyOutString(practiseData[0])}))
	  .catch((error) => console.log(error))
  }

  handleOnKeyUp (e) {
    let userTypedTextInput = e.target.value
    this.setState({ userTypedText: userTypedTextInput })
    let practiseText = this.state.practiseText
    this.compareIndex = userTypedTextInput.length - 1
    this.highlightTypedLetters(this.compareIndex, userTypedTextInput, this.state.practiseText)
	
    if (this.isEndOfPractiseText (userTypedTextInput, this.state.practiseText)) {
      this.currentPractiseLine += 1 
      this.setState({practiseText:this.practiseData[this.currentPractiseLine],
      userTypedText: '',
      practiseTextHighlighted: this.greyOutString(this.practiseData[this.currentPractiseLine]) } ) 
      this.compareIndex = -1
    }
  }
  
  isEndOfPractiseText (userTypedText, practiseText) {
    if (userTypedText.length === practiseText.length) {
      return true
    } else {
      return false 
    } 
     
  }

  greyOutString (stringToBeGreyed) {
	  let arrayOfGreyedCharacters = stringToBeGreyed.split('').map((character) => {return <span style={{color: "grey"}}> {character} </span> })
	  return arrayOfGreyedCharacters
   
  }

  highlightTypedLetters (compareIndex, userTypedText, practiseText) {
    let practiseCharactersArray = this.state.practiseTextHighlighted 
    practiseCharactersArray[compareIndex + 2] = <span style={{color: "grey"}}> {this.state.practiseText[compareIndex + 2]} </span>
    practiseCharactersArray[compareIndex + 1] = <span style={{backgroundColor: "yellow"}}> {this.state.practiseText[compareIndex + 1]} </span>
    if (this.state.practiseText[compareIndex] !== userTypedText[compareIndex]) {
    practiseCharactersArray[compareIndex] = <span style={{color: "red"}}> {this.state.practiseText[compareIndex]} </span>
    } else {
    practiseCharactersArray[compareIndex] = <span style={{color: "black"}}> {this.state.practiseText[compareIndex]} </span>
    }  
		  
    if (this.state.practiseText[compareIndex - 1] !== userTypedText[compareIndex - 1]) {
    practiseCharactersArray[compareIndex - 1] = <span style={{color: "red"}}> {this.state.practiseText[compareIndex - 1]} </span>
    } else {
    practiseCharactersArray[compareIndex - 1] = <span style={{color: "black"}}> {this.state.practiseText[compareIndex - 1]} </span>
    }  
    this.setState({practiseTextHighlighted: practiseCharactersArray})
  }

  componentWillMount() { 
	  //	this.setUpKeymanInUserText ()
  }

  render () {
    return (
      <div id='typingTutor'>
	<label> Level </label>
	    <select value={this.state.level} onChange={this.handleLevelChange}>
		   
		    <option value='' disabled defaultValue> select a level to begin </option>
		    <option value='1'> level 1</option>
		    <option value='2'> level 2</option>
		    <option value='3'> level 3</option>
	    </select>
	<br />
	
        <label> Practise Text:  </label>
        <br />

        <div id='practiseTextUnrendered'>
		{this.state.practiseTextHighlighted} 
	</div>
	<br />
	<hr />

        <div>
          <div id='practiseTextRendered'>
            {this.state.practiseText}
          </div>
	</div>

	<div id='userTextDiv'>
        <input placeholder='Type Here' id='userText'  type='text' name='userTypedText' value={this.state.userTypedText} onChange={this.handleInputChangeUserTypedText} onKeyUp={this.handleOnKeyUp} />
	<br />
	</div>

        <br />
        <br />
      <div>
        <KeyBoardv2  pressedKey={this.state.practiseText[this.state.userTypedText.length]} />
      </div>
      </div>
    )
  }
}

export default TypingTutor 

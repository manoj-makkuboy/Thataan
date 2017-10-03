import React, { Component } from 'react'
import KeyBoard from './KeyBoard'
import KeyBoardv2 from './KeyBoardv2'
import './TypingTutor.css'

class TypingTutor extends Component {
  constructor () {
    super()
    this.handleInputChangeUserTypedText = this.handleInputChangeUserTypedText.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.state = { practiseText: '', userTypedText: '', level: '' }
    this.mismatchIndex = []
    this.compareIndex = -1
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
                              // Please refer to the ISO-639 standard as necessary.
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
    this.mismatchIndex = []
    this.compareIndex = -1

    let userInput = e.target.value
    this.setState({ level: userInput})
    let fetchUrl = 'http://localhost:5000/practise_data/' + e.target.value + '/'
    fetch(fetchUrl, {mode: 'cors', headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }})
	  .then((response) => response.json())
	  .then((responseJson) => this.setState({practiseText:responseJson, userTypedText: ''}))
	  .catch((error) => console.log(error))
  }

  handleOnKeyDown (e) {
    let userTypedTextInput = e.target.value
    let practiseText = this.state.practiseText
    this.compareIndex = userTypedTextInput.length - 1
    if (userTypedTextInput[this.compareIndex] !== practiseText[this.compareIndex] && this.mismatchIndex.includes(this.compareIndex) === false) {
      this.mismatchIndex.push(this.compareIndex)
    }

    if (this.mismatchIndex[this.mismatchIndex.length - 1] > this.compareIndex) {
      this.mismatchIndex.pop()
    }

    this.setState({ userTypedText: userTypedTextInput })
  }

  highlightTypedLetters (practiseText, mismatchIndex, compareIndex) {
    let practiseCharactersArray = practiseText.split('')
    practiseCharactersArray = practiseCharactersArray.map((v, i, a) => {
      if (mismatchIndex.includes(i)) {
        return <span style={{color: "red"}}>{v}</span>
      }
      else if (i <= compareIndex) {
        return <span style={{color: "black"}}>{a[i]}</span>
      }
      else if (i === compareIndex+1) {
	return <span style={{backgroundColor: "yellow"}}> {a[i]} </span>
      }
      else {
	return <span style={{color: "grey"}}> {a[i]} </span>
      }
    })
    return (practiseCharactersArray)
  }

  componentWillMount() { 
   console.log('componentWillMount') 
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
          {this.highlightTypedLetters(this.state.practiseText, this.mismatchIndex, this.compareIndex)}
        </div>
	<br />
	<hr />

        <div>
          <div id='practiseTextRendered'>
            {this.state.practiseText}
          </div>
	</div>

	<div id='userTextDiv'>
        <input placeholder='Type Here' id='userText'  type='text' name='userTypedText' value={this.state.userTypedText} onChange={this.handleInputChangeUserTypedText} onKeyUp={this.handleOnKeyDown} />
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

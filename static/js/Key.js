import React, { Component } from 'react'
let keyCss = {
      width: '30px',
      height: '30px',
	    //      background: `${(this.state.isPressed ? 'blue' : 'grey')}`,
      textAlign: 'center'
    }

Object.defineProperty( keyCss, 'background', {value: 'grey', writable: true} ) 
Object.defineProperty( keyCss, 'textDecoration', {value: 'none', writable: true} ) 

class Key extends Component {
  constructor () {
    super()
    this.state = {isPressed: false}
    this.aliasMap = { 'ஆ': 'ா', 'ஔ': 'ௌ', 'ஈ':'ீ', 'இ': 'ி' , 'ஓ': 'ோ', 'ஊ': 'ூ', 'உ': 'ு', 'ஒ': 'ொ', 'ஐ': 'ை', 'எ': 'ெ', 'ஏ': 'ே'}
  }

  render () {
    keyCss['background'] = `${(this.state.isPressed ? 'blue' : 'grey')}`
    if (this.props.doesContainPressedKey) {
      keyCss['textDecoration'] = 'underline'
    } else { keyCss['textDecoration'] = 'none' }
    return (
      <div id='key' name={this.props.keyName} style={this.keyCss} > {this.props.keyName} </div>
    )
  }

  componentDidMount () {
    if (this.props.pressedKey === this.props.keyName) {
      this.setState({ isPressed: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pressedKey !== this.props.pressedKey) {
      console.log('nextProps pressedKey :', nextProps.pressedKey, 'alias', this.aliasMap[this.props.keyName])
      if (nextProps.pressedKey === this.props.keyName || nextProps.pressedKey === this.aliasMap[this.props.keyName]) {
        this.setState({ isPressed: true })
      } else { this.setState({isPressed: false}) }
    }
  }
}

export default Key

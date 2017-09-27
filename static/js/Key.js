import React, { Component } from 'react'

class Key extends Component {
  constructor () {
    super()
    this.state = {isPressed: false}
    this.keyCss = {
      width: '30px',
      height: '30px',
      background: `${(this.state.isPressed ? 'blue' : 'grey')}`,
      textAlign: 'center',
      textDecoration: 'none'
    }
    this.aliasMap = { 'ஆ': 'ா', 'ஔ': 'ௌ', 'ஈ':'ீ', 'இ': 'ி' , 'ஓ': 'ோ', 'ஊ': 'ூ', 'உ': 'ு', 'ஒ': 'ொ', 'ஐ': 'ை', 'எ': 'ெ', 'ஏ': 'ே'}
  }

  render () {
    this.keyCss['background'] = `${(this.state.isPressed ? 'blue' : 'grey')}`
    if (this.props.doesContainPressedKey) {
      this.keyCss['textDecoration'] = 'underline'
    } else { this.keyCss['textDecoration'] = 'none' }
    return (
      <div id='key' name={this.props.keyName} style={this.keyCss} > {this.props.keyName} </ div>
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

import React, { Component } from 'react'
import Key from './Key'

class KeyGroup extends Component {
  constructor () {
    super()
    this.state = {doesContainPressedKey: false}
  }
  render () {
  // Alert at renderedKeys
    let renderedKeys = this.props.keysInGroup.map((keyName) => { return (<Key key={keyName} keyName={keyName} doesContainPressedKey={this.state.doesContainPressedKey} pressedKey={this.props.pressedKey} />) })

    return (
      <div id='keyGroup'>
        {renderedKeys}
      </div>)
  }

  componentDidMount () {
    if (this.props.keysInGroup.includes(this.props.pressedKey)) {
      this.setState({doesContainPressedKey: true})
    } else {
      this.setState({doesContainPressedKey: false})
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.pressedKey !== this.props.pressedKey) {
      if (this.props.keysInGroup.includes(nextProps.pressedKey)) {
        this.setState({doesContainPressedKey: true})
      } else {
        this.setState({doesContainPressedKey: false})
      }
    }
  }
}

export default KeyGroup

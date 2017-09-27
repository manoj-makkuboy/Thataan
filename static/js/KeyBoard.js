import React, { Component } from 'react'
import KeyGroup from './KeyGroup.js'
import GuideHand from './GuideHand'

class KeyBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {currentLayer: 'layer1'}
    this.aliasMap = ['ா', 'ௌ', 'ீ',  'ி' ,  'ோ',  'ூ',  'ு',  'ொ',  'ை',  'ெ', 'ே']
    this.layer1 = [
	 ['Shift'],
         ['ஆ', 'அ', 'ஔ'], // leftLittleFingerGroup,
         ['ஈ', 'இ', 'ஓ'],  // leftRingFingerGroup,
         ['ஊ', 'உ', 'ஒ'], // leftMiddleFingerGroup,
         ['ஐ', '்', 'வ'],  // leftIndexFingerGroup1,
         ['ஏ', 'எ', 'ங'], // leftIndexFingerGroup2,
     // Right finger groups
         ['ள', 'க', 'ல'],    // rightIndexFingerGroup2,
         ['ற', 'ப', 'ர'], // rightIndexFingerGroup1,
         ['ன', 'ம', ','],   // rightMiddleFingerGroup,
         ['ட', 'த', '.'], // rightRingFingerGroup,
         ['ண', 'ந', 'ழ'], // rightLittleFingerGroup1,
         ['ச', 'ய'], // rightLittleFingerGroup2
	       ['ஞ'],       // rightLittleFingerGroup3
	       ['Shift']
    ]
    this.layer2 = [
	        ['Shift'],
          ['ஸ',  '௹',  '௳'], // Left little finger group
          ['ஷ', '௺', '௴'],
          ['ஜ', '௸', '௵'],
          ['ஹ' , 'ஃ', '௶'],
          ['க்ஷ', '🌕', '௷'],
    
          ['ஶ்ரீ', '', 'ௐ'], // Right index finger group 1
          ['*', '"', '<'],
          ['[',  '௱',  '>'],
          [']', ';', '?'],
          ['{', '\''],
          ['Shift']
    ]
  }

  isItemPresentInArrayOfArray (arrayOfArray = [], elementToFind) { // Return outer array index if element found else returns null
    for (let i = 0; i < arrayOfArray.length; i++) {
      for (let j = 0; j < arrayOfArray[i].length; j++) {
        if (elementToFind === arrayOfArray[i][j]) {
          return i
        }
      }
    }
    return null
  }

  componentDidMount () {
    this.setState({currentLayer: 'layer1'})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pressedKey !== this.props.pressedKey) {
      if ((this.isItemPresentInArrayOfArray(this.layer1, nextProps.pressedKey) !== null) || (this.aliasMap.includes(nextProps.pressedKey))) {
        this.setState({currentLayer: 'layer1'})
      } else {
        this.setState({currentLayer: 'layer2'})
      }
    }
  }

  render () {
  // Left finger groups
    let renderedKeyGroups = null
    if (this.state.currentLayer === 'layer1') {
      renderedKeyGroups = this.layer1.map((keyGroup, index) => {
        return (
          <td>
            <KeyGroup key={index} pressedKey={this.props.pressedKey} keysInGroup={keyGroup} />
          </td>
        )
      }
        )
    } else {
      renderedKeyGroups = this.layer2.map((keyGroup, index) => {
        if (keyGroup.includes('Shift')) {
          return (
            <td>
              <KeyGroup key={index} pressedKey={'Shift'} keysInGroup={keyGroup} />
            </td>
          )
        }
        return (
          <td>
            <KeyGroup key={index} pressedKey={this.props.pressedKey} keysInGroup={keyGroup} />
          </td>
        )
      }
      )
    }
    let groupWhichContainPressedKey = this.state.currentLayer === 'layer1' ? this.isItemPresentInArrayOfArray(this.layer1, this.props.pressedKey) : this.isItemPresentInArrayOfArray(this.layer2, this.props.pressedKey)
    return (
      <div>
        <div id='keyboard-div' style={{ width: '500px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto' }} >
          <table>
            <tbody>
              {renderedKeyGroups}
            </ tbody>
          </table>
        </ div>
        <div id='guidehand-div'>
          <GuideHand groupIdOfPressedKey={groupWhichContainPressedKey} />
        </ div>
      </ div>
    )
  }
}

export default KeyBoard

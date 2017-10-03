import React, { Component } from 'react'
import './KeyBoardv2.css'

const currentKeyboard = 'tamil'

const keyMap = {
	  'c32':{[currentKeyboard]: [[' '],['']]},
	  'c13':{[currentKeyboard]: [['\n'],[]]},
// qwerty row
'c81':{english: ['q'], tamil: [['ஆ', 'ா'],['ஸ']]},
'c87':{english: ['w'],tamil: [['ஈ', 'ீ'],['ஷ']]},
'c69':{english: ['e'],tamil: [['ஊ', ' ூ'],['ஜ']]},
'c82':{english: ['r'],tamil: [['ஐ','ை'],['ஹ']]},
'c84':{english: ['t'],tamil: [['ஏ',' ே'],['க்ஷ']]},
'c89':{english: ['y'],tamil: [['ள','', ''],['ஶ்ரீ']]},
'c85':{english: ['u'],tamil: [['ற','', ''],['ஶ']]},
'c73':{english: ['i'],tamil: [['ன', ''],[':']]},
'c79':{english: ['o'],tamil: [['ட', ''],['[']]},
'c80':{english: ['p'],tamil: [['ண', ''],[']']]},
'c219':{english: ['['],tamil: [['ச', ''],['{']]},
'c221':{english: [']'],tamil: [['ஞ', ''],['}']]},
	  // asdfg row 
'c65':{english: ['a'],tamil: [['அ','',''],['௹']]},
'c83':{english: ['s'],tamil: [['இ','ி',''],['௺']]},
'c68':{english: ['d'],tamil: [['உ','ு',''],['௸']]},
'c70':{english: ['f'],tamil: [['்',''],['ஃ']]},
'c71':{english: ['g'],tamil: [['எ','ெ',''],['']]},
'c72':{english: ['h'],tamil: [['க'],['']]},
'c74':{english: ['j'],tamil: [['ப','',''],['']]},
'c75':{english: ['k'],tamil: [['ம','',''],['']]},
'c76':{english: ['l'],tamil: [['த','',''],['']]},
'c186':{english: [';'],tamil: [['ந','',''],['']]},
'c222':{english: ['\''],tamil: [['ய','',''],['']]},
	  // zxcvb row
         'c90':{english: ['z'],tamil: [['ஔ','ௌ',''],['௳']]},
         'c88':{english: ['x'],tamil: [['ஓ','ோ',''],['௴']]},
         'c67':{english: ['c'],tamil: [['ஒ','ொ',''],['௵']]},
         'c86':{english: ['v'],tamil: [['வ','',''],['௶']]},
         'c66':{english: ['b'],tamil: [['ங','',''],['௷']]},
         'c78':{english: ['n'],tamil: [['ல','',''],['ௐ']]},
         'c77':{english: ['m'],tamil: [['ர','',''],['/']]},
         'c188':{english: [','],tamil: [[',','',''],['']]},
         'c190':{english: ['.'],tamil: [['.','',''],['']]},
	  'c191':{english: ['/'],tamil: [['ழ','',''],['?']]}
	  //   'c16' :[['','',''],['']]

}

function getKeyId (inputLetter, language) {
  for (let key in keyMap) {
    if (keyMap[key][language][0].includes(inputLetter)) { // check layer 0 of language
      return key  
    }
    if (keyMap[key][language][1].includes(inputLetter)) {
      return key  
    }
  }
  return keyMap[inputLetter]
}

class KeyBoardv2 extends Component {
  constructor() {
    super()
    this.state = {keyIdToPress: ''}
  }
  

  componentWillReceiveProps (nextProps) {
    if (nextProps.pressedKey !== this.props.pressedKey) {
      console.log(nextProps.pressedKey)
	    // reset old pressed key 
      try {
        let keyToReset = window.document.getElementsByClassName(getKeyId(this.props.pressedKey, currentKeyboard))
        keyToReset[0].removeAttribute('style'); 
      } catch (e) {
       console.log('no keys pressed to revert highlight') 
      }
	    // mark new pressed key 
      
      let keyIdToPress = window.document.getElementsByClassName(getKeyId(nextProps.pressedKey, currentKeyboard))
	  console.log('keyTopress')
	  console.log(keyIdToPress)
      keyIdToPress[0].setAttribute('style','background: #34f3cf;'); 
      this.setState = {keyIdToPress: getKeyId(nextProps.pressedKey, currentKeyboard)}
    }
  }

  render() {
	 let qwertyKeyIds = ['c81','c87','c69','c82','c84','c89','c85','c73','c79','c80', 'c219','c221']
	let renderedQwertyKeys = qwertyKeyIds.map((keyId, index) => {
	    return  (<li><a   className={"key "+ keyId}><span>{keyMap[keyId]['english'][0][0]}</span><span>{keyMap[keyId][currentKeyboard][0][0]}</span></a></li>  )
	  })

	 let asdfgKeyIds = ["c65", "c83", "c68", "c70", "c71", "c72", "c74", "c75", "c76", "c186", "c222"]
	let renderedAsdfgKeys = asdfgKeyIds.map((keyId, index) => {
	    return  (<li><a   className={"key "+ keyId}><span>{keyMap[keyId]['english'][0][0]}</span><span>{keyMap[keyId][currentKeyboard][0][0]}</span></a></li>  )
	  })


	 let zxcvbKeyIds = ['c90', 'c88', 'c67', 'c86', 'c66', 'c78', 'c77', 'c188', 'c190', 'c191'] 

	let renderedZxcvbKeys = zxcvbKeyIds.map((keyId, index) => {
	    return  (<li><a   className={"key "+ keyId}><span>{keyMap[keyId]['english'][0][0]}</span><span>{keyMap[keyId][currentKeyboard][0][0]}</span></a></li>  )
	  })

	  return(
<div id="keyboard">
    	<ul className="cf">
        	<li><a   className="key c27 fn"><span id="esc">esc</span></a></li>
        	<li><a   className="key c112 fn"><span>F1</span></a></li>
        	<li><a   className="key c113 fn"><span>F2</span></a></li>
        	<li><a   className="key c114 fn"><span>F3</span></a></li>
        	<li><a   className="key c115 fn"><span>F4</span></a></li>
        	<li><a   className="key c116 fn"><span>F5</span></a></li>
        	<li><a   className="key c117 fn"><span>F6</span></a></li>
        	<li><a   className="key c118 fn"><span>F7</span></a></li>
        	<li><a   className="key c119 fn"><span>F8</span></a></li>
        	<li><a   className="key c120 fn"><span>F9</span></a></li>
        	<li><a   className="key c121 fn"><span>F10</span></a></li>
        	<li><a   className="key c122 fn"><span>F11</span></a></li>
        	<li><a   className="key c123 fn"><span>F12</span></a></li>
        	<li><a   className="key fn"><span>Eject</span></a></li>
        </ul>
    	<ul className="cf" id="numbers">
	    	<li><a   className="key c192"><b>~</b><span>`</span></a></li>
	    	<li><a   className="key c49"><b>!</b><span>1</span></a></li>
	    	<li><a   className="key c50"><b>@</b><span>2</span></a></li>
	    	<li><a   className="key c51"><b>#</b><span>3</span></a></li>
	    	<li><a   className="key c52"><b>$</b><span>4</span></a></li>
	    	<li><a   className="key c53"><b>%</b><span>5</span></a></li>
	    	<li><a   className="key c54"><b>^</b><span>6</span></a></li>
	    	<li><a   className="key c55"><b>&amp;</b><span>7</span></a></li>
	    	<li><a   className="key c56"><b>*</b><span>8</span></a></li>
	    	<li><a   className="key c57"><b>(</b><span>9</span></a></li>
	    	<li><a   className="key c48"><b>)</b><span>0</span></a></li>
	    	<li><a   className="key c189 alt"><b>_</b><span>-</span></a></li>
	    	<li><a   className="key c187"><b>+</b><span>=</span></a></li>
	    	<li><a   className="key c46" id="delete"><span>Delete</span></a></li>
        </ul>
    	<ul className="cf" id="qwerty">
	    	<li><a   className="key c9" id="tab"><span>tab</span></a></li>
		{renderedQwertyKeys}
	    	<li><a   className="key c220"><b>|</b><span>\</span></a></li>
        </ul>
        <ul className="cf" id="asdfg">
	    	<li><a   className="key c20 alt" id="caps"><b></b><span>caps lock</span></a></li>
		{renderedAsdfgKeys}
	    	<li><a   className="key c13 alt" id="enter"><span>return</span></a></li>
        </ul>
        <ul className="cf" id="zxcvb">
	    	<li><a   className="key c16 shiftleft"><span>Shift</span></a></li>
		  {renderedZxcvbKeys}
	    	<li><a   className="key c16 shiftright"><span>Shift</span></a></li>
        </ul>
<ul className="cf" id="bottomrow">
            <li><a   className="key c17 ctrl" id="Ctrl"><span>Ctrl</span></a></li>
            <li><a   className="key mjt" id="mjtleft"><span>mjt</span></a></li>
            <li><a   className="key AltKey" id="AltKeyleft"><span>Alt</span></a></li>
            <li className=""><a   className="key spacebar c32" id="spacebar">space</a></li>
            <li><a   className="key AltKey" id="AltKeyright"><span>Alt</span></a></li>
            <li><a   className="key ctrl" id="CtrlKeyright"><span>Ctrl</span></a></li>
            <ol className="cf">
                <li><a   className="key c37" id="left"><span></span></a></li>
                <li>
                    <a   className="key c38" id="up"><span></span></a>
                    <a   className="key c40" id="down"><span></span></a>
                </li>
                <li><a   className="key c39" id="right"><span></span></a></li>
            </ol>
</ul>
    </div>
	  )

  }
} 

export default KeyBoardv2

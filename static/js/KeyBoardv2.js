import React, { Component } from 'react'
import './KeyBoardv2.css'

const currentKeyboard = 'tamil'

const keyMap = {
	  'c32':{[currentKeyboard]: [[' '],['']]},
	  'c13':{[currentKeyboard]: [['\n'],[]]},
// qwerty row
'c81':{english: ['q'], tamil: [['ஆ', 'ா'],['ஸ']]},
'c87':{tamil: [['ஈ', 'ீ'],['ஷ']]},
'c69':{tamil: [['ஊ', ' ூ'],['ஜ']]},
'c82':{tamil: [['ஐ','ை'],['ஹ']]},
'c84':{tamil: [['ஏ',' ே'],['க்ஷ']]},
'c89':{tamil: [['ள','', ''],['ஶ்ரீ']]},
'c85':{tamil: [['ற','', ''],['ஶ']]},
'c73':{tamil: [['ன', ''],[':']]},
'c79':{tamil: [['ட', ''],['[']]},
'c80':{tamil: [['ண', ''],[']']]},
'c219':{tamil: [['ச', ''],['{']]},
'c221':{tamil: [['ஞ', ''],['}']]},
	  // asdfg row 
'c65':{tamil: [['அ','',''],['௹']]},
'c83':{tamil: [['இ','ி',''],['௺']]},
'c68':{tamil: [['உ','ு',''],['௸']]},
'c70':{tamil: [['்',''],['ஃ']]},
'c71':{tamil: [['எ','ெ',''],['']]},
'c72':{tamil: [['க'],['']]},
'c74':{tamil: [['ப','',''],['']]},
'c75':{tamil: [['ம','',''],['']]},
'c76':{tamil: [['த','',''],['']]},
'c186':{tamil: [['ந','',''],['']]},
'c222':{tamil: [['ய','',''],['']]},
	  // zxcvb row
         'c90':{tamil: [['ஔ','ௌ',''],['௳']]},
         'c88':{tamil: [['ஓ','ோ',''],['௴']]},
         'c67':{tamil: [['ஒ','ொ',''],['௵']]},
         'c86':{tamil: [['வ','',''],['௶']]},
         'c66':{tamil: [['ங','',''],['௷']]},
         'c78':{tamil: [['ல','',''],['ௐ']]},
         'c77':{tamil: [['ர','',''],['/']]},
         'c188':{tamil: [[',','',''],['']]},
         'c190':{tamil: [['.','',''],['']]},
	  'c191':{tamil: [['ழ','',''],['?']]}
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
  
  componentDidMount () {
      
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
		<li><a   className="key c81"><span>q</span><span>{keyMap.c81[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c87"><span>w</span><span>{keyMap.c87[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c69"><span>e</span><span>{keyMap.c69[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c82"><span>r</span><span>{keyMap.c82[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c84"><span>t</span><span>{keyMap.c84[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c89"><span>y</span><span>{keyMap.c89[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c85"><span>u</span><span>{keyMap.c81[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c73"><span>i</span><span>{keyMap.c85[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c79"><span>o</span><span>{keyMap.c79[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c80"><span>p</span><span>{keyMap.c80[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c219 alt"><b>{'{'}</b><span>{keyMap.c80[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c221 alt"><b>{'}'}</b><span>{keyMap.c80[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c220 alt"><b>|</b><span>\</span></a></li>
        </ul>
        <ul className="cf" id="asdfg">
	    	<li><a   className="key c20 alt" id="caps"><b></b><span>caps lock</span></a></li>
	    	<li><a   className="key c65"><span>a</span><span>{keyMap.c65[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c83" ><span>s</span><span>{keyMap.c83[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c68" ><span>d</span><span>{keyMap.c68[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c70"><span>f</span><span>{keyMap.c70[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c71"><span>g</span><span>{keyMap.c71[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c72"><span>h</span><span>{keyMap.c72[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c74"><span>j</span><span>{keyMap.c74[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c75"><span>k</span><span>{keyMap.c75[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c76"><span>l</span><span>{keyMap.c76[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c186 alt"><span>;</span><span>{keyMap.c186[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c222 alt"><span>'</span><span>{keyMap.c222[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c13 alt" id="enter"><span>return</span></a></li>
        </ul>
        <ul className="cf" id="zxcvb">
	    	<li><a   className="key c16 shiftleft"><span>Shift</span></a></li>
	    	<li><a   className="key c90"><span>z</span><span>{keyMap.c90[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c88"><span>x</span><span>{keyMap.c88[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c67"><span>c</span><span>{keyMap.c67[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c86"><span>v</span><span>{keyMap.c86[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c66"><span>b</span><span>{keyMap.c66[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c78"><span>n</span><span>{keyMap.c78[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c77"><span>m</span><span>{keyMap.c77[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c188 alt"><span>{keyMap.c188[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c190 alt"><span>{keyMap.c190[currentKeyboard][0][0]}</span></a></li>
	    	<li><a   className="key c191 alt"><span>{keyMap.c191[currentKeyboard][0][0]}</span></a></li>
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

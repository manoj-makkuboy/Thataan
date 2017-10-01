import React, { Component } from 'react'
import './KeyBoardv2.css'

const keyMap = {
  'a': 'c65',
  's': 'c83',
  'd': 'c68'
}
class KeyBoardv2 extends Component {
  constructor() {
    super()
    this.state = {keyToPress: ''}
  }
  
  componentDidMount () {
  
	  //	this.setState({keyToPress: 'c81'})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pressedKey !== this.props.pressedKey) {
      console.log(nextProps.pressedKey)
	    // reset old pressed key 
      try {
        let keyToReset = window.document.getElementsByClassName(keyMap[this.props.pressedKey])
        keyToReset[0].removeAttribute('style'); 
      } catch (e) {
       console.log(e) 
      }
	    // mark new pressed key 
      let keyToPress = window.document.getElementsByClassName(keyMap[nextProps.pressedKey])
	  console.log('keyTopress')
	  console.log(keyToPress)
      keyToPress[0].setAttribute('style','background: #34f3cf;'); 
      this.setState = {keyToPress: keyMap[nextProps.pressedKey]}
    }
  }

  render() {
	  return(
<div id="keyboard">
    	<ul className="cf">
        	<li><a href="#" className="key c27 fn"><span id="esc">esc</span></a></li>
        	<li><a href="#" className="key c112 fn"><span>F1</span></a></li>
        	<li><a href="#" className="key c113 fn"><span>F2</span></a></li>
        	<li><a href="#" className="key c114 fn"><span>F3</span></a></li>
        	<li><a href="#" className="key c115 fn"><span>F4</span></a></li>
        	<li><a href="#" className="key c116 fn"><span>F5</span></a></li>
        	<li><a href="#" className="key c117 fn"><span>F6</span></a></li>
        	<li><a href="#" className="key c118 fn"><span>F7</span></a></li>
        	<li><a href="#" className="key c119 fn"><span>F8</span></a></li>
        	<li><a href="#" className="key c120 fn"><span>F9</span></a></li>
        	<li><a href="#" className="key c121 fn"><span>F10</span></a></li>
        	<li><a href="#" className="key c122 fn"><span>F11</span></a></li>
        	<li><a href="#" className="key c123 fn"><span>F12</span></a></li>
        	<li><a href="#" className="key fn"><span>Eject</span></a></li>
        </ul>
    	<ul className="cf" id="numbers">
	    	<li><a href="#" className="key c192"><b>~</b><span>`</span></a></li>
	    	<li><a href="#" className="key c49"><b>!</b><span>1</span></a></li>
	    	<li><a href="#" className="key c50"><b>@</b><span>2</span></a></li>
	    	<li><a href="#" className="key c51"><b>#</b><span>3</span></a></li>
	    	<li><a href="#" className="key c52"><b>$</b><span>4</span></a></li>
	    	<li><a href="#" className="key c53"><b>%</b><span>5</span></a></li>
	    	<li><a href="#" className="key c54"><b>^</b><span>6</span></a></li>
	    	<li><a href="#" className="key c55"><b>&amp;</b><span>7</span></a></li>
	    	<li><a href="#" className="key c56"><b>*</b><span>8</span></a></li>
	    	<li><a href="#" className="key c57"><b>(</b><span>9</span></a></li>
	    	<li><a href="#" className="key c48"><b>)</b><span>0</span></a></li>
	    	<li><a href="#" className="key c189 alt"><b>_</b><span>-</span></a></li>
	    	<li><a href="#" className="key c187"><b>+</b><span>=</span></a></li>
	    	<li><a href="#" className="key c46" id="delete"><span>Delete</span></a></li>
        </ul>
    	<ul className="cf" id="qwerty">
	    	<li><a href="#" className="key c9" id="tab"><span>tab</span></a></li>
	    	<li><a href="#" className="key c81"><span>q</span></a></li>
	    	<li><a href="#" className="key c87"><span>w</span></a></li>
	    	<li><a href="#" className="key c69"><span>e</span></a></li>
	    	<li><a href="#" className="key c82"><span>r</span></a></li>
	    	<li><a href="#" className="key c84"><span>t</span></a></li>
	    	<li><a href="#" className="key c89"><span>y</span></a></li>
	    	<li><a href="#" className="key c85"><span>u</span></a></li>
	    	<li><a href="#" className="key c73"><span>i</span></a></li>
	    	<li><a href="#" className="key c79"><span>o</span></a></li>
	    	<li><a href="#" className="key c80"><span>p</span></a></li>
	    	<li><a href="#" className="key c219 alt"><b>{'{'}</b><span>[</span></a></li>
	    	<li><a href="#" className="key c221 alt"><b>{'}'}</b><span>]</span></a></li>
	    	<li><a href="#" className="key c220 alt"><b>|</b><span>\</span></a></li>
        </ul>
        <ul className="cf" id="asdfg">
	    	<li><a href="#" className="key c20 alt" id="caps"><b></b><span>caps lock</span></a></li>
	    	<li><a href="#" className="key c65"><span>a</span></a></li>
	    	<li><a href="#" className="key c83" ><span>s</span></a></li>
	    	<li><a href="#" className="key c68" ><span>d</span></a></li>
	    	<li><a href="#" className="key c70"><span>f</span></a></li>
	    	<li><a href="#" className="key c71"><span>g</span></a></li>
	    	<li><a href="#" className="key c72"><span>h</span></a></li>
	    	<li><a href="#" className="key c74"><span>j</span></a></li>
	    	<li><a href="#" className="key c75"><span>k</span></a></li>
	    	<li><a href="#" className="key c76"><span>l</span></a></li>
	    	<li><a href="#" className="key c186 alt"><b>:</b><span>;</span></a></li>
	    	<li><a href="#" className="key c222 alt"><b>"</b><span>'</span></a></li>
	    	<li><a href="#" className="key c13 alt" id="enter"><span>return</span></a></li>
        </ul>
        <ul className="cf" id="zxcvb">
	    	<li><a href="#" className="key c16 shiftleft"><span>Shift</span></a></li>
	    	<li><a href="#" className="key c90"><span>z</span></a></li>
	    	<li><a href="#" className="key c88"><span>x</span></a></li>
	    	<li><a href="#" className="key c67"><span>c</span></a></li>
	    	<li><a href="#" className="key c86"><span>v</span></a></li>
	    	<li><a href="#" className="key c66"><span>b</span></a></li>
	    	<li><a href="#" className="key c78"><span>n</span></a></li>
	    	<li><a href="#" className="key c77"><span>m</span></a></li>
	    	<li><a href="#" className="key c188 alt"><b>&lt;</b><span>,</span></a></li>
	    	<li><a href="#" className="key c190 alt"><b>&gt;</b><span>.</span></a></li>
	    	<li><a href="#" className="key c191 alt"><b>?</b><span>/</span></a></li>
	    	<li><a href="#" className="key c16 shiftright"><span>Shift</span></a></li>
        </ul>
<ul className="cf" id="bottomrow">
            <li><a href="#" className="key c17 ctrl" id="Ctrl"><span>Ctrl</span></a></li>
            <li><a href="#" className="key mjt" id="mjtleft"><span>mjt</span></a></li>
            <li><a href="#" className="key AltKey" id="AltKeyleft"><span>Alt</span></a></li>
            <li className=""><a href="#" className="key spacebar c32" id="spacebar">space</a></li>
            <li><a href="#" className="key AltKey" id="AltKeyright"><span>Alt</span></a></li>
            <li><a href="#" className="key ctrl" id="CtrlKeyright"><span>Ctrl</span></a></li>
            <ol className="cf">
                <li><a href="#" className="key c37" id="left"><span></span></a></li>
                <li>
                    <a href="#" className="key c38" id="up"><span></span></a>
                    <a href="#" className="key c40" id="down"><span></span></a>
                </li>
                <li><a href="#" className="key c39" id="right"><span></span></a></li>
            </ol>
</ul>
    </div>
	  )

  }
} 

export default KeyBoardv2

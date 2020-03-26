import React from 'react'
import Tilt from 'react-tilt'
import './logo.css'
import brainLogo from './brain2.png'


const logo = (props) => {

	return (
		
		<div className="ph5">

			<Tilt className="Tilt shadow-1" options={{ max : 55, reverse: true }} style={{ height: 150, width: 150 }}>
			 <div className="Tilt-inner"> <img className="App-logo" src={brainLogo} alt="brain" /> </div>
			</Tilt>
		</div>
	)
}


export default logo
import React from 'react'
import './faceRecognition.css'

const faceRecognition = ({imageUrl, box}) => {

	return (
		
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputImage" alt="" src={imageUrl} width='500' heigth='auto' />

				{box.map( box => <div className="boundingBox" style={{left: box.leftcol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>)}
				
			</div>	
		</div>
	)
}


export default faceRecognition
import React from 'react'
import './imageLinkForm.css'


const imageLinkForm = (props) => {

	return (
		
		<div>	
			<p className="f3 b">
				{' This Magic Brain will detect faces in your pictures. Get it try! '}
			</p>

			<div className="center">
				<div className="pa4 br3 shadow-5 form">
					<input type="text" className="f4 pa2 w-70" onChange={props.onInputChange} />
					<button className="f4 grow ph3 pv2 link dib link white bg-light-purple w-30" onClick={props.onSubmitButton}>Detect</button>
				</div>
			</div>
			
		</div>
	)
}


export default imageLinkForm
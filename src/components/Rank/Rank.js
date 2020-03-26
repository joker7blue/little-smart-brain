import React from 'react'


const rank = (props) => {

	const {name, entries} = props

	return (
		
		<div>	
		
			<div className='white f3 b'>
				{name + ', your current rank is...'}
			</div>
			<div className='white f2 b'>
				{'#'+entries}
			</div>
		</div>
	)
}


export default rank
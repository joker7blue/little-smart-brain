import React from 'react'


const navigation = ({changeRoute,isSignIn,onSignOutHandler}) => {

	return (
		
		<nav className="dt w-100 border-box pa3 ph5-ns">

		  <div className="dtc v-mid w-75 tr">
		  {
		  	isSignIn === false ? (
		  		[
			  		<span className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns pointer" title="Store" onClick={() => changeRoute('signin')} key={1}>Sign in</span>,
			  		<span className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns pointer" title="About" onClick={() => changeRoute('register')} key={2}>Register</span>
		  		]
		  	)
		  	:(
		  		<span className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns pointer" href="#" title="About" onClick={onSignOutHandler}>Sign out</span>
		  	)
		  }
		    
		    
		  </div>
		</nav>
	)
}


export default navigation
import React, {Component} from 'react'


class signIn extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	onEmailChangeHandler = ($event) => {

		this.setState({email: $event.target.value});
	}

	onPasswordChangeHandler = ($event) => {

		this.setState({password: $event.target.value});
	}

	onSubmitSignInForm = () => {

		fetch('https://afternoon-fortress-82563.herokuapp.com/signin', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json().then(data => { 
			console.log('+++++++++',data)
			if (data.id) {
				this.props.loadUser(data)
				this.props.changeRoute('home')
				window.responsiveVoice.speak(
					`Hi, welcome to the smart brain app. Use smart brain is very simple!
					Go to google,
					and search for an image that have one or mutiple faces of peoples, 
					then, copy the image adress,
					and put it in the input that you see here. 
					Smart brain will detect face automatically. 
					I'll see you on the next one.     
					bye bye.
				`)
			}
			
		}).catch(error => console.log(error))
		).catch(error => console.log(error))
	}
	
	render() {

		const {changeRoute} = this.props

		return (

			<article className="mw6 center br1 pa3 pa4-ns mt4 shadow-3 w-70">
		
				<main className="pa4 black-80">
				  <div className="measure w-100">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" 
				        onChange={this.onEmailChangeHandler}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange={this.onPasswordChangeHandler}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignInForm}>Sign in</button>
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f6 link dim black db pointer" onClick={() => changeRoute('register')}>Register</p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}



export default signIn


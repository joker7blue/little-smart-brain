import React,  {Component} from 'react'


class Register extends Component {

	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onNameChangeHandler = ($event) => {

		this.setState({name: $event.target.value});
	}

	onEmailChangeHandler = ($event) => {

		this.setState({email: $event.target.value});
	}

	onPasswordChangeHandler = ($event) => {

		this.setState({password: $event.target.value});
	}

	onSubmitRegistrationForm = () => {

		fetch('https://afternoon-fortress-82563.herokuapp.com/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json().then(data => { 
			console.log('+++++++++',data)
			if (data.id) {
				this.props.loadUser(data)
				this.props.changeRoute('home')
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
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name"
				        onChange={this.onNameChangeHandler}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        onChange={this.onEmailChangeHandler} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange={this.onPasswordChangeHandler} />
				      </div>
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit"
				      value="Register"
				      onClick={this.onSubmitRegistrationForm} />
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f6 link dim black db pointer" onClick={() => changeRoute('signin')}>Sign in</p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}

}

export default Register


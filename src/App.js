import React,{Component} from 'react'
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register"


import './App.css'
import Particles from 'react-particles-js'


const particlesParams = {
  particles: {
    number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }

    },
  }
}


const initialState = {

      input: '',
      imageUrl: '',
      route: 'signin',
      isSignIn: false,
      box: [],
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: '',
        joined: ''
  }
}

class App extends Component{


  constructor(){

    super()
    this.state = initialState
  }


  changeRoute = (route) => {

    this.setState({route: route})
  }


  loadUser = (data) => {

    this.setState({'user': Object.assign('user', data), isSignIn: true})
  }


  onSignOutHandler = (event) => {
    this.setState(initialState)
  }


  onInputChangeHandler = (event) => {

    this.setState({input: event.target.value})
  }


  onSubmitButtonHandler = (event) => {
    this.setState({imageUrl: this.state.input})

    fetch('https://afternoon-fortress-82563.herokuapp.com/imageURL', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
            input: this.state.input
        })
    })
    .then(response => response.json()).then(data => {
          //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

          //---START FETCH
          fetch('https://afternoon-fortress-82563.herokuapp.com/image', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
          .then(response => response.json()).then(data => { 
              console.log('+++++++++',data)
              if (data.new_entries) {
                this.setState(Object.assign(this.state.user, {entries: data.new_entries}))
              }
          }).catch(error => console.log(error))
          //---END FETCH

          this.displayFaceBox(this.calculateFaceLocation(data))
     })
    .catch(err => console.log(err));
  }


  calculateFaceLocation = (data) => {

    //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    const facelocations = []

    /*return {
      leftcol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }*/

    data.outputs[0].data.regions.forEach( region => {

      const clarifaiFace = region.region_info.bounding_box

      facelocations.push({
        leftcol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      })
    })

    return [...facelocations]
  }


  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
    window.responsiveVoice.speak(
      `Amazing! The smart brain has dectected ${box.length} face.  
       Smart brain is very smart! isin't it ?
     `);
  }

  render() {


    return (

      <div className="App">
      <Particles
      className='particles' 
                params={particlesParams} />
        <Navigation changeRoute={this.changeRoute} isSignIn={this.state.isSignIn} onSignOutHandler={this.onSignOutHandler}/>
        {
          this.state.route === 'home' ?
          [
            <Logo key={1}/>,
            <Rank name={this.state.user.name} entries={this.state.user.entries} key={2}/>,
            <ImageLinkForm onInputChange={this.onInputChangeHandler} 
            onSubmitButton={this.onSubmitButtonHandler} 
            key={3}
            />,
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} key={4}/>
           ]
          :(
              this.state.route === 'register' ? 
                <Register changeRoute={this.changeRoute} loadUser={this.loadUser}/>
              :
                <SignIn changeRoute={this.changeRoute} loadUser={this.loadUser} />
            )
          
        }
        

        <footer className="tc mv4 white f4">
          &copy; 2020 All rights reserved <br/>
          <span className="f5">Powered by <a target="blank" href="https://github.com/joker7blue" style={{color: "orange"}}>Joker7Blue</a></span>
        </footer>
      </div>
    )

  }

}

export default App

import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
import UserSelect from './components/userSelect'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, 
      value: "",
      isLoading: false,
      error: null};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   this.setState({isLoading: true})
  //   axios.get(`http://penguin.linux.test:3001/v1/users?id=${this.state.value}`)
  //   // .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       this.setState({user: res.data, error: null, isLoading: false})
  //     }).catch(error => {
  //       console.error(error)
  //       this.setState({error, isLoading: false, user: null})
  //     })
  //   event.preventDefault();
  // }

  // componentDidMount() {
  //   fetch(`http://penguin.linux.test:3001/v1/users?user=${this.state.value}`)
  //   .then(res => res.json())
  //   .then(user => this.setState({...user}))
  // }

  render() {
    // console.log(this.state.user)
    return (
      <div className="App">
        <header className="App-header">
        <UserSelect></UserSelect>
        </header>
      </div>
    );
  }
}

export default App;

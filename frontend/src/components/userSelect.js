import React, { Component } from 'react';
import axios from 'axios'

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
      user: null, 
      value: "",
      isLoading: false,
      error: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({isLoading: true})
    axios.get(`http://penguin.linux.test:3001/v1/users?id=${this.state.value}`)
      .then(res => {
        // console.log(res);
        this.setState({user: res.data, error: null, isLoading: false})
      }).catch(error => {
        console.error(error)
        this.setState({error, isLoading: false, user: null})
      })
    event.preventDefault();
  }

  componentDidMount() {
    axios.get(`http://penguin.linux.test:3001/v1/users/all`)
    .then(res => this.setState({users: res.data}))
    .catch(error => {
        console.error(error)
        this.setState({error})
      })
  }

  render() {
    // console.log(this.state.user)
    return (
      <div className="App">
        <header className="App-header">
        <form onSubmit={this.handleSubmit}>
        <label>Select user:

        <select value={this.state.value} onChange={this.handleChange}>
            {this.state.users.map(user => {
                return <option value={user.id}>{user.name}</option>
            })}
        </select>
        </label>

        <input type='submit' value='Submit'></input>
        </form>

        {!!this.state.isLoading && <p>Loading...</p> }
        {!!this.state.user && <p>{this.state.user.name}</p> }
        {!!this.state.error && <p>{this.state.error.message}</p>}
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            User ID: 
            <input type='text' value={this.state.value} onChange={this.handleChange}></input>
          </label>
          <input type='submit' value='Submit'></input>
        </form> */}
        </header>
      </div>
    );
  }
}

export default UserSelect;

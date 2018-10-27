import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import UserSelect from './components/userSelect'
import Notes from './components/notesList'
import NoteInput from './components/noteInput'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, 
      users: [],
      notes: [],
      value: "",
      isLoading: false,
      error: null
    };

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onNewNote = this.onNewNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  getNotes(userID) {
    this.setState({isLoading: true});
    // console.log(this.props)
    axios.get(`http://penguin.linux.test:3001/v1/users/${userID}/notes`)
    .then(notes => this.setState({notes: notes.data, isLoading: false}))
    .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
    })
}

  onUserSelect(user) {
    this.setState({user})
    this.getNotes(user);
  }

  onNewNote(note) {
    // const notes = this.state.notes.push(note)
    const userID = this.state.user
    // this.setState({notes})
    this.setState({isLoading: true})
    axios.post(`http://penguin.linux.test:3001/v1/users/${userID}/notes/`,
        { userID , note }
    )
      .then(res => {
        console.log(res);
        this.setState({notes: [...this.state.notes, res.data], error: null, isLoading: false})
      }).catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }

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

  componentDidMount() {
    axios.get(`http://penguin.linux.test:3001/v1/users/`)
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
        <UserSelect onUserSelect={this.onUserSelect} users={this.state.users} />
        {!!this.state.isLoading && <p>Loading...</p> }
        {!!this.state.user && <div>
          <p>{this.state.user.name}</p> 
          <NoteInput userID={this.state.user.id} onNewNote={this.onNewNote}/>
          <Notes notes={this.state.notes} />
        </div>}
        {!!this.state.error && <p>{this.state.error.message}</p>}
        </header>
      </div>
    );
  }
}

export default App;

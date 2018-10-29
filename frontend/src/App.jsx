import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import UserSelect from './components/userSelect';
import Notes from './components/notesList';
import NoteInput from './components/noteInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      users: [],
      notes: [],
      isLoading: false,
      error: null,
    };

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onNewNote = this.onNewNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://penguin.linux.test:3001/v1/users/')
      .then((res) => {
        const firstUser = res.data[0].id;
        this.setState({ user: firstUser, users: res.data });
        return firstUser;
      })
      .then(userID => this.getNotes(userID))
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  onUserSelect(user) {
    this.setState({ user });
    this.getNotes(user);
  }

  onNewNote(note) {
    const { user } = this.state;
    this.setState({ isLoading: true });
    axios
      .post(`http://penguin.linux.test:3001/v1/users/${user}/notes/`, {
        userID: user,
        note,
      })
      .then((res) => {
        console.log(res);
        this.setState(prevState => ({
          notes: [res.data, ...prevState.notes],
          error: null,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
  }

  getNotes(userID) {
    this.setState({ isLoading: true });
    // console.log(this.props)
    axios
      .get(`http://penguin.linux.test:3001/v1/users/${userID}/notes`)
      .then(notes => this.setState({ notes: notes.data, isLoading: false }))
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
  }

  removeNote(id) {
    // const notes = []
    this.setState(prevState => ({ notes: prevState.notes.filter(note => note._id !== id) }));
  }

  render() {
    // console.log(this.state.user)
    const {
      users, user, notes, error,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <UserSelect onUserSelect={this.onUserSelect} users={users} />
          {!!user && (
            <div>
              <p>{user.name}</p>
              <NoteInput userID={user} onNewNote={this.onNewNote} />
              <Notes notes={notes} removeNote={this.removeNote} />
            </div>
          )}
          {!!error && <p>{error.message}</p>}
        </header>
      </div>
    );
  }
}

export default App;

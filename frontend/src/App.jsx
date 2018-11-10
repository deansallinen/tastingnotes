import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Helmet from 'react-helmet';
import Header from './components/header';
import Notes from './components/notesList';
import NoteInput from './components/noteInput';
import Toast from './components/toast';
import Footer from './components/footer'

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
      <div className="">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tastingnotes</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header onUserSelect={this.onUserSelect} users={users} />
        <section className="section">
          <div className="container">
            <h1 className="title">Tastingnotes</h1>
            <h2 className="subtitle">
              Transcribe the symphony on your palette <span role="img">🎉</span>
            </h2>
          </div>
        </section>

        {
          !!user && (
            <div>
              <section className="section">
                <div className="container">
                  <NoteInput userID={user} onNewNote={this.onNewNote} />
                </div>
              </section>
              <section className="section">
                <div className="container">
                  <Notes notes={notes} removeNote={this.removeNote} />
                </div>
              </section>
            </div>
          )
        }


        {!!error && <Toast message={error.message} />}

        <Footer />
      </div>
    );
  }
}

export default App;

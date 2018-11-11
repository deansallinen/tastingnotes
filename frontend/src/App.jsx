import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Helmet from 'react-helmet';
import { request } from 'graphql-request';
import Header from './components/header';
import Notes from './components/notesList';
import NoteInput from './components/noteInput';
import Toast from './components/toast';
import Footer from './components/footer';

const API = process.env.REACT_APP_APIURL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      users: [],
      notes: [],
      isLoading: false,
      error: null,
      hello: '',
      data: [],
    };

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onNewNote = this.onNewNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://${API}/v1/users/`)
      .then((res) => {
        const firstUser = res.data[0];
        // console.log('first user', firstUser);
        this.setState({ user: firstUser, users: res.data });
        return firstUser;
      })
      .then(user => this.getNotes(user._id))
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });

    // const gqlrequest = `
    //   query Query {
    //     users {
    //       id
    //       name
    //     }
    //   }
    // `;

    // request('/.netlify/functions/graphql', gqlrequest)
    //   .then((res) => {
    //     console.log(res);
    //     const { users } = res;
    //     const [firstUser] = users;
    //     this.setState({ user: firstUser, users });
    //     return firstUser;
    //   })
    //   .then(user => this.getNotes(user.id))
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error });
    //   });
  }

  onUserSelect(userID) {
    this.setState({ userID });
    this.getNotes(userID);
  }

  onNewNote(note) {
    const userID = this.state.user._id;
    console.log(userID);
    this.setState({ isLoading: true });
    axios
      .post(`http://${API}/v1/users/${userID}/notes/`, {
        userID,
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
    axios
      .get(`http://${API}/v1/users/${userID}/notes`)
      .then(notes => this.setState({ notes: notes.data, isLoading: false }))
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });

    const query = `
      query Query {
        hello
      }
    `;

    //   const query = `
    //   query Query {
    //     notes {
    //       note
    //       userID
    //       createdAt
    //       updatedAt
    //     }
    //   }
    // `;

    request('/.netlify/functions/graphql', query)
      .then((res) => {
        console.log(res);
        const { hello } = res;
        this.setState({ hello, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  removeNote(id) {
    // const notes = []
    this.setState(prevState => ({ notes: prevState.notes.filter(note => note._id !== id) }));
  }

  render() {
    // console.log(this.state.user)
    const {
      users, user, notes, error, msg, hello,
    } = this.state;
    return (
      <div className="">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tastingnotes</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header onUserSelect={this.onUserSelect} users={users} user={user} />
        <p>{hello}</p>

        {!!error && <Toast message={error.message} />}
        <section className="section">
          <div className="container">
            <h1 className="title">Tastingnotes</h1>
            <h2 className="subtitle">
              Transcribe the symphony on your palette
              {' '}
              <span role="img" aria-label="Party popper">
                🎉
              </span>
            </h2>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <NoteInput userID={user.id} onNewNote={this.onNewNote} />
          </div>
        </section>
        {!!user && (
          <div>
            <section className="section">
              <div className="container">
                <Notes notes={notes} removeNote={this.removeNote} isLoading />
              </div>
            </section>
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default App;

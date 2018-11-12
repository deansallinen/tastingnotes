import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import Helmet from 'react-helmet';
import { request } from 'graphql-request';
import Header from './components/header';
import Notes from './components/notesList';
import NoteInput from './components/noteInput';
import Toast from './components/toast';
import Footer from './components/footer';

// const API = process.env.REACT_APP_APIURL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      notes: [],
      isLoading: false,
      error: null,
    };

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onNewNote = this.onNewNote.bind(this);
    // this.getNotes = this.getNotes.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    // axios
    //   .get(`http://${API}/v1/users/`)
    //   .then((res) => {
    //     const firstUser = res.data[0];
    //     // console.log('first user', firstUser);
    //     this.setState({ user: firstUser, users: res.data });
    //     return firstUser;
    //   })
    //   .then(user => this.getNotes(user._id))
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error });
    //   });

    const query = `
      query Query {
        users {
          id
          name
          notes {
            id
            userID
            note
            createdAt
            updatedAt
          }
        }
      }
    `;
    request('/.netlify/functions/graphql', query)
      .then((res) => {
        const { users } = res;
        const [user] = users;
        this.setState({ users, user });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  onUserSelect(userID) {
    const { users } = this.state;
    const [user] = users.filter(each => each.id === userID);
    this.setState({ user });
  }

  onNewNote(note) {
    const { user } = this.state;
    const { id } = user;
    // console.log(id, note);
    this.setState({ isLoading: true });

    const query = `
    mutation createNote($note: String, $userID: String) {
      createNote(
        userID: $userID, 
        note: $note
      ) {
        id
        userID
        note
        createdAt
        updatedAt
      }
    }
    `;

    request('/.netlify/functions/graphql', query, { userID: id, note })
      .then((res) => {
        const newnote = res.createNote;
        // console.log('mutation res', newnote);
        this.setState(state => ({
          isLoading: false,
          user: {
            ...state.user,
            notes: [newnote, ...state.user.notes],
          },
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });

    // axios
    //   .post(`http://${API}/v1/users/${userID}/notes/`, {
    //     userID,
    //     note,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.setState(prevState => ({
    //       notes: [res.data, ...prevState.notes],
    //       error: null,
    //       isLoading: false,
    //     }));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error, isLoading: false });
    //   });
  }

  // getNotes(userID) {
  //   this.setState({ isLoading: true });
  //   axios
  //     .get(`http://${API}/v1/users/${userID}/notes`)
  //     .then(notes => this.setState({ notes: notes.data, isLoading: false }))
  //     .catch((error) => {
  //       console.error(error);
  //       this.setState({ error, isLoading: false });
  //     });

  //   //   const query = `
  //   //   query Query {
  //   //     notes {
  //   //       note
  //   //       userID
  //   //       createdAt
  //   //       updatedAt
  //   //     }
  //   //   }
  //   // `;

  //   // request('/.netlify/functions/graphql', query)
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     const { hello } = res;
  //   //     this.setState({ hello, isLoading: false });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //     this.setState({ error });
  //   //   });
  // }

  removeNote(id) {
    // const notes = []
    this.setState(prevState => ({ notes: prevState.notes.filter(note => note.id !== id) }));
  }

  deleteNote(noteID) {
    // this.setState({ isLoading: true });

    const query = `
    mutation deleteNote($noteID: ID) {
      deleteNote(id: $noteID) {
        note
      }
    }
    `;

    request('/.netlify/functions/graphql', query, { noteID }).catch((error) => {
      console.error(error);
      this.setState({ error });
    });

    this.setState(prevState => ({
      // isLoading: false,
      user: {
        notes: prevState.user.notes.filter(note => note.id !== noteID),
      },
    }));
    // const { id, userID, removeNote } = this.props;
    // this.setState({ isLoading: true });
    // axios
    //   .delete(`http://${API}/v1/users/${userID}/notes/${id}`)
    //   .then((res) => {
    //     console.log('Note deleted', res);
    //     removeNote(id);
    //     this.setState(state => ({
    //       //   // notes: [res.data, ...state.notes],
    //       error: null,
    //       isLoading: false,
    //     }));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     this.setState({ error, isLoading: false });
    //   });
  }

  render() {
    // console.log(this.state.user)
    const { users, user, error } = this.state;
    const { notes } = user;
    return (
      <div className="">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tastingnotes</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header onUserSelect={this.onUserSelect} users={users} user={user} />

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
                <Notes
                  notes={notes}
                  removeNote={this.removeNote}
                  deleteNote={this.deleteNote}
                  isLoading
                />
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

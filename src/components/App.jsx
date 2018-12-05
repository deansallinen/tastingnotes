import React, { Component } from 'react';
import './App.css';
import '../sass/mystyles.scss'
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby'
import { request } from 'graphql-request';
import Header from './header';
import Notes from './notesList';
import NoteInput from './noteInput';
import Toast from './toast';
import Footer from './footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      // notes: [],
      isLoading: false,
      error: null,
    };

    this.onUserSelect = this.onUserSelect.bind(this);
    this.onNewNote = this.onNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {
    const query = `
      query Query {
        users {
          id
          name
          notes {
            id
            userID
            noteText
            rating
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
    const { noteText, rating } = note;
    this.setState({ isLoading: true });

    const query = `
    mutation createNote($noteText: String, $userID: String, $rating: Int) {
      createNote(
        userID: $userID,
        noteText: $noteText,
        rating: $rating,
      ) {
        id
        userID
        noteText
        rating
        createdAt
        updatedAt
      }
    }
    `;

    request('/.netlify/functions/graphql', query, { userID: id, noteText, rating: parseInt(rating) })
      .then((res) => {
        const newnote = res.createNote;
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
  }

  updateNote(args) {
    const { id, edits } = args;
    const { user } = this.state;
    const uid = user.id;
    console.log(id, edits, uid);
    this.setState({ isLoading: true });

    const query = `
    mutation updateNote($nid: ID, $input: NoteInput) {
      updateNote(id: $nid, input: $input) {
        id
        userID
        noteText
        rating
        createdAt
        updatedAt
      }
    }
    `;

    request('/.netlify/functions/graphql', query, { nid: id, input: { noteText: edits, userID: uid } })
      .then((res) => {
        const updatedNote = res.updateNote;
        console.log(updatedNote);
        this.setState(state => ({
          isLoading: false,
          // user: {
          //   ...state.user,
          //   notes: [updatedNote, ...state.user.notes],
          // },
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  deleteNote(noteID) {
    const query = `
    mutation deleteNote($noteID: ID) {
      deleteNote(id: $noteID) {
        noteText
      }
    }
    `;

    request('/.netlify/functions/graphql', query, { noteID })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });

    this.setState(prevState => ({
      user: {
        notes: prevState.user.notes.filter(note => note.id !== noteID),
      },
    }));
  }

  render() {
    const { users, user, error } = this.state;
    const { notes } = user;
    return (
      <div className="">
          
        <Helmet meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}>
          <meta charSet="utf-8" />
          <title>Tastingnotes</title>
          <html lang="en" />
          <link rel="canonical" href="http://tastingnotes.club" />
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
                  updateNote={this.updateNote}
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

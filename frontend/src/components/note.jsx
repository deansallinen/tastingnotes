import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { format } from 'date-fns';

const API = process.env.REACT_APP_APIURL;

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      editing: false,
      error: null,
      edits: null,
      note: null,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState((state, props) => ({ note: props.note }));
  }

  handleChange(event) {
    this.setState({ edits: event.target.value });
  }

  toggleEdit() {
    this.setState(state => ({
      edits: state.note,
      editing: !state.editing,
    }));
  }

  submitEdit(event) {
    const { id, userID } = this.props;
    const { edits } = this.state;
    this.setState({ isLoading: true, note: edits });
    axios
      .put(`http://${API}/v1/users/${userID}/notes/${id}`, { note: edits })
      .then((res) => {
        console.log('Edit submitted: ', res);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
    this.toggleEdit();
    event.preventDefault();
  }

  cancelEdit(event) {
    console.log('Edit cancelled!');
    this.setState((state, props) => ({ note: state.note }));
    this.toggleEdit();
    event.preventDefault();
  }

  deleteNote() {
    const { id, userID, removeNote } = this.props;
    this.setState({ isLoading: true });
    axios
      .delete(`http://${API}/v1/users/${userID}/notes/${id}`)
      .then((res) => {
        console.log('Note deleted', res);
        removeNote(id);
        this.setState(state => ({
          //   // notes: [res.data, ...state.notes],
          error: null,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { createdAt } = this.props;
    const {
      isLoading, editing, note, edits,
    } = this.state;
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    if (editing) {
      return (
        <div className="tile is-child">
          <div className="is-size-7">{format(createdAt, 'MMM Do HH:mm')}</div>

          <div className={`control is-large ${isLoading ? 'is-loading' : ''}`}>
            <form onSubmit={this.submitEdit}>
              <input
                className="input is-large"
                type="text"
                value={edits}
                onChange={this.handleChange}
              />
            </form>

            <nav className="level" style={{ 'flex-direction': 'row-reverse' }}>
              <div className="level-right" style={{ 'flex-direction': 'row-reverse' }}>
                <button
                  className="button is-success"
                  type="submit"
                  value="Save"
                  onClick={this.submitEdit}
                >
                  Save
                </button>
                <button className="button" onClick={this.cancelEdit}>
                  Cancel
                </button>
              </div>
              <div className="level-left">
                <button className="button is-danger" onClick={this.deleteNote}>
                  Delete
                </button>
              </div>
            </nav>
          </div>
        </div>
      );
    }

    return (
      <div className="tile is-child">
        <div className="is-size-7">{format(createdAt, 'MMM Do HH:mm')}</div>
        <div className="level">
          <p className="is-size-4">{note}</p>
          <div className="level-right">
            <button className="button" onClick={this.toggleEdit}>
              Edit
            </button>
            <button className="button is-danger" onClick={this.deleteNote}>
                  Delete
                </button>
          </div>
        </div>
      </div>
    );
  }
}

Note.defaultProps = {
  note: '',
};

Note.propTypes = {
  note: PropTypes.string,
  userID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default Note;

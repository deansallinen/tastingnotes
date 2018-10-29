import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      editing: false,
      error: null,
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
    this.setState({ note: event.target.value });
  }

  toggleEdit() {
    this.setState(state => ({
      editing: !state.editing,
    }));
  }

  submitEdit(event) {
    const { _id, userID } = this.props;
    const { note } = this.state;
    this.setState({ isLoading: true });
    axios
      .put(`http://penguin.linux.test:3001/v1/users/${userID}/notes/${_id}`, { note })
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
    this.setState((state, props) => ({ note: props.note }));
    this.toggleEdit();
    event.preventDefault();
  }

  deleteNote() {
    const { _id, userID, removeNote } = this.props;
    this.setState({ isLoading: true });
    axios
      .delete(`http://penguin.linux.test:3001/v1/users/${userID}/notes/${_id}`)
      .then((res) => {
        console.log('Note deleted', res);
        removeNote(_id);
        // this.setState(state => ({
        //   // notes: [res.data, ...state.notes],
        //   error: null,
        //   isLoading: false,
        // }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    // const { _id } = this.props;
    const { isLoading, editing, note } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (editing) {
      return (
        <div>
          <form onSubmit={this.submitEdit}>
            <input type="text" value={note} onChange={this.handleChange} />
            <input type="submit" value="Save" />
            <button onClick={this.cancelEdit}>Cancel</button>

          </form>
        </div>
      );
    }

    return (
      <div>
        <p>
          {note}
          <button onClick={this.toggleEdit}>Edit</button>
          <button onClick={this.deleteNote}>Delete</button>
        </p>
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
  _id: PropTypes.string.isRequired,
  removeNote: PropTypes.func.isRequired,
};

export default Note;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { format } from 'date-fns';

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
    const { _id, userID } = this.props;
    const { note, edits } = this.state;
    this.setState({ isLoading: true, note: edits });
    axios
      .put(`http://penguin.linux.test:3001/v1/users/${userID}/notes/${_id}`, { note: edits })
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
    const { createdAt } = this.props;
    const {
 isLoading, editing, note, edits 
} = this.state;
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    if (editing) {
      return (
        <div className={`control is-large ${isLoading ? 'is-loading' : ''}`}>
          <form onSubmit={this.submitEdit}>
            <input className="input is-large" type="text" value={edits} onChange={this.handleChange} />
            <button className="button is-success" type="submit" value="Save">Save</button>
            <button className="button" onClick={this.cancelEdit}>Cancel</button>
            <button className="button is-danger" onClick={this.deleteNote}>Delete</button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <div className="is-size-7">{format(createdAt, 'MMM Do HH:mm')}</div>
        <div className="level">
          <p className="is-size-4">{note}</p>
          <div className="level-right">
            <button className="button" onClick={this.toggleEdit}>Edit</button>
          </div>
        </div>
      </div>
      // <div className="card">
      //   <header className="card-header">
      //     <p className="card-header-title">

    //     </p>
    //     <a href="#" className="card-header-icon" aria-label="more options">
    //       <span className="icon">
    //         <i className="fas fa-angle-down" aria-hidden="true" />
    //       </span>
    //     </a>
    //   </header>
    //   <div className="card-content">
    //     <div className="content">
    //       {note}
    //     </div>
    //   </div>
    //   <footer className="card-footer">
    //     <span className=" card-footer-item" onClick={this.toggleEdit}>Edit</span>
    //     <span className=" card-footer-item is-danger" onClick={this.deleteNote}>Delete</span>
    //   </footer>
    // </div>
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

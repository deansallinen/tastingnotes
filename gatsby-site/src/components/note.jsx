import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const stars = [
  '🌟🌟🌟🌟🌟',
  '⭐⭐⭐⭐',
  '⭐⭐⭐',
  '⭐⭐',
  '⭐',
];

class Note extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      editing: false,
      error: null,
      edits: null,
      note: null,
      rating: null,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState((state, props) => ({ noteText: props.noteText, rating: props.rating }));
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
    const { id, updateNote } = this.props;
    const { edits } = this.state;
    this.setState(prevState => ({ note: prevState.edits }));
    updateNote({ id, edits });
    this.toggleEdit();
    event.preventDefault();
  }

  cancelEdit(event) {
    console.log('Edit cancelled!');
    this.setState(prevState => ({ note: prevState.note }));
    this.toggleEdit();
    event.preventDefault();
  }

  deleteNote() {
    const { deleteNote, id } = this.props;
    deleteNote(id);
  }

  render() {
    const { createdAt, id } = this.props;
    const {
      isLoading, editing, noteText, edits, rating,
    } = this.state;

    return (
      <div className="tile is-child">
        <div className="is-size-7">{moment(parseInt(createdAt, 10)).format('MMM MM HH:mm')}</div>
        <div className="is-size-7">{id}</div>
        {editing ? (
          <div className={`control is-large ${isLoading ? 'is-loading' : ''}`}>
            <form onSubmit={this.submitEdit}>
              <input
                className="input is-large"
                type="text"
                value={edits}
                onChange={this.handleChange}
              />
            </form>

            <nav className="level" style={{ flexDirection: 'row-reverse' }}>
              <div className="level-right" style={{ flexDirection: 'row-reverse' }}>
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
        ) : (
          <div className="level">
            <p className="is-size-4">{noteText}</p>
            <p className="is-size-4">{stars[stars.length - rating]}</p>
            <div className="level-right">
              <button className="button" onClick={this.toggleEdit}>
                Edit
              </button>
              <button className="button is-danger" onClick={this.deleteNote}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Note.defaultProps = {
  note: '',
};

Note.propTypes = {
  noteText: PropTypes.string,
  userID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Note;

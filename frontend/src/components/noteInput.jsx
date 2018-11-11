import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Button, Textarea } from 'reactbulma';

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: false,
      // error: null,
      noteText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ noteText: event.target.value });
  }

  handleSubmit(event) {
    const { onNewNote } = this.props;
    const { noteText } = this.state;
    onNewNote(noteText);
    this.setState({ noteText: '' });
    event.preventDefault();
  }

  render() {
    const { noteText } = this.state;
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} className="columns is-8">
            <div className="column is-three-quarters">
              <input
                className="input is-large"
                id="note"
                type="text"
                placeholder="Type a new note"
                value={noteText}
                onChange={this.handleChange}
              />
            </div>
            <div className="column level">
              <button
                className="button level-item is-large is-success"
                type="submit"
                value="Submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NoteInput.defaultProps = {};

NoteInput.propTypes = {
  onNewNote: PropTypes.func.isRequired,
};

export default NoteInput;

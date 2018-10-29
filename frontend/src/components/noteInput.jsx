import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="note">
            Note:
            <input id="note" type="text" value={noteText} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

NoteInput.defaultProps = {};

NoteInput.propTypes = {
  onNewNote: PropTypes.func.isRequired,
};

export default NoteInput;

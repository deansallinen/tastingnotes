import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './note';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // error: null,
      // notes: [],
    };
  }

  render() {
    const { notes, removeNote } = this.props;
    const { isLoading } = this.state;
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
          {notes.length
            ? notes.map(note => <Note key={note._id} {...note} removeNote={removeNote} />)
            : <p>No notes</p>}
        </div>
    );
  }
}

NotesList.defaultProps = {
  notes: [],
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default NotesList;

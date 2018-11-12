import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './note';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: false,
      // error: null,
      // notes: [],
    };
  }

  render() {
    const { notes, removeNote, isLoading } = this.props;
    if (notes.length) {
      return (
        <div className="tile is-ancestor ">
          <p>{isLoading}</p>
          <div className="tile is-parent is-vertical">
            {notes.map(note => (
              <Note key={note.id} {...note} removeNote={removeNote} />
            ))}
          </div>
        </div>
      );
    }
    if (isLoading) {
      return <p>Is Loading</p>;
    }
    return <p className="is-size-1">No notes yet!</p>;
  }
}

NotesList.defaultProps = {
  notes: [],
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default NotesList;

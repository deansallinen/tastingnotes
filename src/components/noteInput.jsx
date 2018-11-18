import React, { Component } from 'react';
import PropTypes from 'prop-types';

const stars = [
  '🌟🌟🌟🌟🌟',
  '⭐⭐⭐⭐',
  '⭐⭐⭐',
  '⭐⭐',
  '⭐',
];

const Radio = props => (
  <input
    type="radio"
    name="rating"
    className="radio"
    onChange={props.handleChange}
    id={props.value}
    value={props.value}
  />

);


class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: false,
      // error: null,
      noteText: '',
      rating: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    const { onNewNote } = this.props;
    const { noteText, rating } = this.state;
    onNewNote({ noteText, rating });
    this.setState({ noteText: '', rating: 0 });
    event.preventDefault();
  }

  render() {
    const { noteText, rating } = this.state;
    const radios = [1, 2, 3, 4, 5].map(i => <Radio handleChange={this.handleChange} value={i} />);

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} className="columns is-8">
            <p>
              <input
                className="input is-large"
                id="note"
                type="text"
                name="noteText"
                placeholder="What do you taste?"
                value={noteText}
                onChange={this.handleChange}
              />

              <label className="is-size-4">Rating: </label>
              <div className="control">
                <div className="select is-large">
                  <select id="rating-select" name="rating" value={rating} onChange={this.handleChange}>
                    {stars.map((each, index) => (
                      <option value={stars.length - index} key={stars.length - index}>{stars[index]}</option>
	    ))}
                  </select>
                </div>
              </div>

            </p>
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

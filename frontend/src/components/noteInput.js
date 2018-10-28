import React, { Component } from 'react';
// import axios from 'axios'

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      noteText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ noteText: event.target.value });
  }

  handleSubmit(event) {
    // const userID = this.props.userID;
    // const noteText = this.state.noteText;
    // console.log(noteText)
    // this.setState({isLoading: true})
    // axios.post(`http://penguin.linux.test:3001/v1/users/${userID}/notes/`,
    //     { userID , noteText }
    // )
    //   .then(res => {
    //     // console.log(res);
    //     this.setState({user: res.data, error: null, isLoading: false})
    //   }).catch(error => {
    //     console.error(error)
    //     this.setState({error, isLoading: false, user: null})
    //   })
    this.props.onNewNote(this.state.noteText);
    this.setState({ noteText: '' });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Note:
            <input type="text" value={this.state.noteText} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NoteInput;

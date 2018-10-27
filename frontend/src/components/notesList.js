import React, { Component } from 'react';
// import axios from 'axios'

class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            notes: []
        }
    }

    // getNotes(userID) {
    //     this.setState({isLoading: true});
    //     // console.log(this.props)
    //     axios.get(`http://penguin.linux.test:3001/v1/users/${userID}/notes`)
    //     .then(notes => this.setState({notes: notes.data, isLoading: false}))
    //     .catch(error => {
    //         console.error(error)
    //         this.setState({error, isLoading: false})
    //     })
    // }

    // componentDidMount() {
    //     this.getNotes(this.props.userID)
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.notes !== prevProps.notes) {
    //         this.setState(this.props.notes);
    //       }
    // }

    render() {
        return this.state.isLoading ? <div>Loading...</div> :
        (<div>
            {this.props.notes.length ? 
            this.props.notes.map(note => <p key={note._id}>{note.note}</p>) :
            <p>No notes</p>
        }
        </div>)
    }
}

export default NotesList
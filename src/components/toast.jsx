import React, { Component } from 'react';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  render() {
    return (
      <article
        className="notification is-warning"
        style={this.state.hidden ? { display: 'none' } : {}}
      >
        <button
          className="delete"
          aria-label="delete"
          onClick={() => this.setState({ hidden: true })}
        />
        {this.props.message}
      </article>
    );
  }
}

export default Toast;

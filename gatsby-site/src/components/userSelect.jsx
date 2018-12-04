import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onUserSelect } = this.props;
    this.setState({ value: event.target.value });
    onUserSelect(event.target.value);
  }

  render() {
    const { users } = this.props;
    // const userID = user.id;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="level">
          <label htmlFor="user-select" className="level-item">
            Select Test User
            {' '}
          </label>
          <div className="select level-item">
            <select id="user-select" value={this.state.value} onChange={this.handleChange}>
              {users.map(each => (
                <option value={each.id} key={each.id}>
                  {each.name}
                </option>
              ))}
            </select>
          </div>

          {/* <input type='submit' value='Submit'></input> */}
        </form>
      </div>
    );
  }
}

UserSelect.defaultProps = {
  users: [],
};

UserSelect.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired,
};

export default UserSelect;

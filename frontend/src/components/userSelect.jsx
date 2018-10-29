import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onUserSelect } = this.props;
    onUserSelect(event.target.value);
  }

  render() {
    const { users, user } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select user:
            <select value={user} onChange={this.handleChange}>
              {users.map(each => (
                <option value={each.id} key={each.id}>
                  {each.name}
                </option>
              ))}
            </select>
          </label>

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
  user: PropTypes.string.isRequired,
};

export default UserSelect;

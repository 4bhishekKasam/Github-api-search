import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
    this.searchUser = this.searchUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  searchUser(e) {
    e.preventDefault();
    this.props.searchUser(this.state.userName);
    this.setState({ userName: "" });
  }

  onChange(e) {
    this.setState(
      { [e.target.id]: e.target.value }
      //   () =>   console.log(this.state.userName)
    );
  }

  render() {
    const { onSorting } = this.props;

    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-primary">
        <div className="container" style={{ textAlign: "center" }}>

          <form className="navbar-form pull-left">
            <select
              className="form-control"
              style={{ width: "200px" }}
              onChange={onSorting}
            >
              <option value="ascName">Sort by Name (A - Z) </option>
              <option value="descName">Sort by Name (Z - A) </option>
              <option value="ascRank">Sort by Rank (ascending) </option>
              <option value="descRank">Sort by Rank (descending) </option>
            </select>
          </form>

          <form className="form-inline my-1 my-lg-0" onSubmit={this.searchUser}>
            <div className="input-group add-on">
              <input
                type="search"
                className="form-control mr-sm-2 border-right-0 border"
                id="userName"
                placeholder="Search User..."
                aria-label="Search"
                onChange={this.onChange}
                value={this.state.userName}
              />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

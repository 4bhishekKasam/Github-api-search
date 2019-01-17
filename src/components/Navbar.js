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
    this.setState({ [e.target.id]: e.target.value }, () =>
      console.log(this.state.userName)
    );
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-primary">
        <div className="container" style={{ textAlign: "center" }}>
          <ul className="navbar-nav bg-light mr-auto">
            <li className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle auto"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a href="/" className="dropdown-item">
                  Sort by Name (ascending){" "}
                </a>
                <a href="/" className="dropdown-item">
                  Sort by Name (descending){" "}
                </a>
                <a href="/" className="dropdown-item">
                  Sort by Rank (ascending){" "}
                </a>
                <a href="/" className="dropdown-item">
                  Sort by Rank (ascending){" "}
                </a>
              </div>
            </li>
          </ul>

          <form
            action=""
            className="form-inline my-1 my-lg-0"
            onSubmit={this.searchUser}
          >
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

import React, { Component } from "react";
import _ from "lodash";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoList: [],
      isOpen: false,
      currentUser: "",
      buttonClick: false
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton(userName) {
    console.log(userName);
    const currentUser = this.state.currentUser === userName ? "" : userName;
    this.setState({
      isOpen: !this.state.isOpen,
      buttonClick: !this.state.buttonClick,
      currentUser: userName
    });

    fetch("https://api.github.com/users/" + userName + "/repos")
      .then(res => res.json())
      .then(userRepos => {
        this.setState({ repoList: userRepos }, () =>
          console.log(this.state.repoList)
        );
      });
  }

  render() {
    const { userList, userCount } = this.props;
    console.log(userList);
    const { repoList, isOpen, currentUser, buttonClick } = this.state;

    if (userList) {
      var list = _.map(userList, (row, key) => {
        return (
          <div className="d-flex justify-content-center" key={row.id}>
            <div className="card shadow-sm rounded">
              <div className="card-body ">
                <div className="row ">
                  <div className="col-sm-2">
                    <img
                      src={row.avatar_url}
                      alt="profile"
                      className="rounded-circle"
                      style={{ widht: "80px", height: "80px" }}
                    />
                  </div>
                  <div className="col-sm-10">
                    <h5 className="card-title">{row.login}</h5>
                    <p className="display-6 text-muted"> {row.html_url} </p>
                    <button
                      className="btn btn-outline-primary btn-md float-right"
                      onClick={() => this.toggleButton(row.login)}
                    >
                      {buttonClick ? "Collapse" : "Details"}
                    </button>
                  </div>
                </div>
              </div>
              {isOpen && currentUser === row.login && (
                <table className="table table-striped">
                  <tbody className="text-left">
                    {repoList.map(repo => (
                      <tr key={repo.name}>
                        <td> {repo.name} </td>
                        <td> {repo.language} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      });
    } else {
      var list = (
        <div className="d-flex justify-content-center">
          <div className="card shadow-sm rounded">
            <div className="card-body">
              <div className="row"> No results to show</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="user-list">
        {userList ? (
          <div className="d-flex justify-content-center">
            <div className="count">
              <h6 className="display-6">Total Results : {userCount}</h6>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="count">
              <h6 className="display-6">Total Results : {userCount}</h6>
            </div>
          </div>
        )}
        {list}
      </div>
    );
  }
}

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
        this.setState(
          { repoList: userRepos }
          //     () =>  console.log(this.state.repoList)
        );
      });
  }

  render() {
    const { userList, userCount, pageSize, currentPage } = this.props;
    //    console.log(userList);
    const { repoList, isOpen, currentUser, buttonClick } = this.state;

    const pageStartIndex = pageSize * (currentPage - 1);
    const pageEndIndex = Math.min(pageStartIndex + pageSize, userList.length);

    var pageList = userList.slice(pageStartIndex, pageEndIndex);

    var List = _.map(pageList, (row, key) => {
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
                  <p className="display-6 text-muted">Type : {row.type} </p>
                  <p className="display-6 text-muted">Score : {row.score} </p>
                  <button
                    className="btn btn-outline-primary btn-md float-right"
                    onClick={() => this.toggleButton(row.login)}
                  >
                    {buttonClick && currentUser === row.login
                      ? "Collapse"
                      : "Details"}
                  </button>
                </div>
              </div>
            </div>
            {isOpen && currentUser === row.login && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Repository Name</th>
                    <th>Language</th>
                    <th>Forks</th>
                    <th>Stars</th>
                    <th>Open Issues Count</th>
                    <th>Watchers</th>
                  </tr>
                </thead>
                <tbody className="text-left">
                  {repoList.map(repo => (
                    <tr key={repo.name}>
                      <td> {repo.name} </td>
                      <td> {repo.language} </td>
                      <td> {repo.forks_count} </td>
                      <td> {repo.stargazers_count} </td>
                      <td> {repo.open_issues_count} </td>
                      <td> {repo.watchers} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    });

    var emptyList = (
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <div className="row"> No results to show</div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="user-list">
        {userList ? (
          <TotalCount userCount={userCount} />
        ) : (
          <TotalCount userCount={userCount} />
        )}
        {userList.length > 0 ? List : emptyList}
      </div>
    );
  }
}

export class TotalCount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userCount } = this.props;
    return (
      <div className="d-flex justify-content-center">
        <div className="count">
          <h6 className="display-6">Total Results : {userCount}</h6>
        </div>
      </div>
    );
  }
}



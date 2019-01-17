import React, { Component } from "react";
import Navbar from "./components/Navbar";
import SearchResult from './components/SearchResult';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      errorMessage: "",
      userCount: ""
    };
    this.searchUser = this.searchUser.bind(this);
  }

  searchUser(user) {
    if (user) {
      fetch("https://api.github.com/search/users?q=" + user)
        .then(res => res.json())
        .then(userData => {
          this.setState(
            { userList: userData.items, userCount: userData.total_count },
            () => console.log(this.state.userList)
          );
        });
    } else {
      this.setState({ userList: null });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar searchUser={this.searchUser} />
        <SearchResult
          userList={this.state.userList}
          userCount={this.state.userCount}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import PaginationComponent from "./components/PaginationComponent";
import "./App.css";

const pageSize = 3;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      errorMessage: "",
      userCount: "",
      sortTerm: "",
      pageFromCallback: 1
    };
    this.searchUser = this.searchUser.bind(this);
    this.onSorting = this.onSorting.bind(this);
    this.getPageNo = this.getPageNo.bind(this);
  }

  searchUser(user) {
    if (user) {
      fetch("https://api.github.com/search/users?q=" + user)
        .then(res => res.json())
        .then(userData => {
          this.setState(
            { userList: userData.items, userCount: userData.total_count }
            //    () => console.log(this.state.userList)
          );
        });
    } else {
      this.setState({ userList: null });
    }
  }

  onSorting(e) {
    let option = e.target.value;
    console.log(option);

    if (option === "ascName" || option === "descName") {
      let term = "login";
      let sortedList = [...this.state.userList].sort((a, b) => {
        return option === "ascName"
          ? a[term] >= b[term]
            ? 1
            : -1
          : a[term] <= b[term]
          ? 1
          : -1;
      });
      this.setState({ userList: sortedList });
    }

    if (option === "ascRank" || option === "descRank") {
      let term = "score";
      let sortedList = [...this.state.userList].sort((a, b) => {
        return option === "ascRank"
          ? a[term] >= b[term]
            ? 1
            : -1
          : a[term] <= b[term]
          ? 1
          : -1;
      });
      this.setState({ userList: sortedList });
    }
  }

  getPageNo(selectedPage) {
    this.setState({ pageFromCallback: selectedPage },
      ()=> console.log(this.state.pageFromCallback)
      );
  }

  render() {
    const { userList } = this.state;

    function noOfPage() {
      return Math.ceil(userList.length / pageSize);
    }

    return (
      <div className="container-fluid">
        <Navbar searchUser={this.searchUser} onSorting={this.onSorting} />
        <SearchResult
          userList={this.state.userList}
          userCount={this.state.userCount}
          pageSize={pageSize}
          currentPage={this.state.pageFromCallback}
        />
        <PaginationComponent
          pages={noOfPage()}
          callbackFromApp={this.getPageNo}
        />
      </div>
    );
  }
}

export default App;

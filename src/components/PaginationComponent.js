import React, { Component } from "react";

var pagesMap = [];

export default class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.populatePageMap = this.populatePageMap.bind(this);
    this.funCallback = this.funCallback.bind(this);
  }

  populatePageMap() {
    pagesMap = [];
    for (var i = 0; i < this.props.pages; i++) {
      pagesMap.push(i + 1);
    }
  }

  funCallback(e) {
    this.props.callbackFromApp(e.target.id);
  }

  render() {
  //  console.log("no. of pages: " + this.state.pages);
    this.populatePageMap();

    var pagesNumbar = pagesMap.map(num => (
      <li key={num} onClick={this.funCallback} className="page-item">
        <a id={num} className="page-link">
          {num}
        </a>
      </li>
    ));

    return (
      <div className="container " style={{ width: "46rem" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-sm justify-content-end">
            {pagesNumbar}
          </ul>
        </nav>
      </div>
    );
  }
}
